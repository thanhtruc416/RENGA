import { Router } from 'express';
import { generateChatbotReply } from '../services/chatbot.service';

const router = Router();

router.post('/', async (req, res) => {
  const { message } = req.body as { message?: string };
  if (!message || !message.trim()) {
    res.status(400).json({ success: false, message: 'Thiếu nội dung câu hỏi' });
    return;
  }
  try {
    const reply = await generateChatbotReply(message.trim());
    res.json({ success: true, data: { reply } });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message ?? 'Chatbot đang gặp sự cố, vui lòng thử lại sau.' });
  }
});

export default router;
