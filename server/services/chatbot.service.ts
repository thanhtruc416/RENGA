import fs from 'fs';
import path from 'path';
import OpenAI from 'openai';

// Port từ script Python CLI gốc (main.py) — RAG kiểu "nhét toàn bộ knowledge base
// vào system prompt" dựa trên Data/chatbot/chatbot_training.json, gọi qua Groq
// (hoặc bất kỳ API nào tương thích chuẩn OpenAI).
//
// Dùng process.cwd() thay vì import.meta.url/__dirname vì tsconfig.server.json
// build cho CommonJS trong khi package.json khai "type":"module" — process.cwd()
// né được xung đột ESM/CJS đó (server luôn chạy từ thư mục gốc dự án qua npm run server).
const KNOWLEDGE_PATH = path.join(process.cwd(), 'Data', 'chatbot', 'chatbot_training.json');

let client: OpenAI | null = null;
let knowledgeBase: string | null = null;

function initAiClient(): OpenAI {
  if (client) return client;

  const apiKey = process.env.API_KEY;
  const baseURL = process.env.BASE_URL || 'https://api.groq.com/openai/v1';

  if (!apiKey) {
    throw new Error('Thiếu API_KEY trong .env — chưa cấu hình được chatbot AI.');
  }

  client = new OpenAI({ apiKey, baseURL });
  return client;
}

interface Intent {
  tag: string;
  topic: string;
  patterns: string[];
  responses: string[];
}

function loadRengaKnowledge(): string {
  if (knowledgeBase) return knowledgeBase;

  if (!fs.existsSync(KNOWLEDGE_PATH)) {
    throw new Error(`Không tìm thấy file dữ liệu chatbot tại ${KNOWLEDGE_PATH}`);
  }

  const raw = fs.readFileSync(KNOWLEDGE_PATH, 'utf-8');
  const data = JSON.parse(raw);
  const storeName = data.store ?? 'RENGA Jewelry';

  let text = `DANH SÁCH QUY ĐỊNH & THÔNG TIN CHÍNH THỨC CỦA CỬA HÀNG ${String(storeName).toUpperCase()}:\n\n`;
  for (const intent of (data.intents ?? []) as Intent[]) {
    text += `📌 [Ý ĐỊNH/MỤC TIÊU: ${intent.tag.toUpperCase()}] (Thuộc chủ đề: ${intent.topic})\n`;
    text += `   - Các mẫu câu khách hay hỏi: ${intent.patterns.join(', ')}\n`;
    text += `   - Câu trả lời chuẩn duyệt: ${intent.responses.join(' | ')}\n\n`;
  }

  knowledgeBase = text;
  return text;
}

function buildSystemInstruction(knowledge: string): string {
  return `
Bạn là Trợ lý ảo AI thông minh, đại diện cho thương hiệu trang sức cao cấp RENGA Jewelry (năm 2026).
Nhiệm vụ duy nhất của bạn là tư vấn và giải đáp thắc mắc của khách hàng dựa trên TÀI LIỆU CHÍNH THỨC được cung cấp dưới đây.

⚠️ QUY TẮC BẮT BUỘC:
1. ĐỐI CHIẾU Ý ĐỊNH: Hãy nhìn vào danh sách câu khách hay hỏi (patterns) để nhận diện đúng ý khách muốn gì.
2. TUÂN THỦ DỮ LIỆU: Phải dùng thông tin trong mục 'Câu trả lời chuẩn duyệt' để phản hồi. Bạn được phép viết lại câu từ cho mượt mà, lễ phép, tinh tế hơn nhưng TUYỆT ĐỐI KHÔNG ĐƯỢC thay đổi thông số, chính sách cốt lõi.
3. PHONG CÁCH PHỤC VỤ: Lịch sự, sang trọng, đẳng cấp như một nhân viên tiệm vàng bạc đá quý cao cấp. Xưng là "RENGA" hoặc "Mình" và gọi khách là "Bạn" hoặc "Quý khách". Thêm các emoji lấp lánh như ✨, 💎, ❤️ một cách tinh tế.
4. GIỚI HẠN TRI THỨC: Nếu câu hỏi của khách KHÔNG HỀ CÓ trong tài liệu bên dưới, hãy từ chối khéo léo và hướng dẫn khách gọi trực tiếp hotline hoặc gửi mail support để được nhân viên hỗ trợ trực tiếp. Không tự bịa chính sách!
5. ĐỊNH DẠNG: Khung chat chỉ hiện được văn bản thuần (không render Markdown). TUYỆT ĐỐI KHÔNG dùng ký hiệu **in đậm**, tiêu đề #, hay gạch đầu dòng bằng "-"/"*". Muốn liệt kê thì xuống dòng bình thường và đánh số (1., 2., 3.) hoặc dùng emoji (✨, 💎) làm dấu đầu dòng.

📖 TÀI LIỆU CHÍNH THỨC CỦA RENGA JEWELRY:
${knowledge}
`;
}

export async function generateChatbotReply(userQuestion: string): Promise<string> {
  const ai = initAiClient();
  const knowledge = loadRengaKnowledge();
  const modelName = process.env.MODEL_NAME || 'llama-3.3-70b-versatile';

  const response = await ai.chat.completions.create({
    model: modelName,
    messages: [
      { role: 'system', content: buildSystemInstruction(knowledge) },
      { role: 'user', content: userQuestion },
    ],
    temperature: 0.2,
  });

  return response.choices[0]?.message?.content ?? '';
}
