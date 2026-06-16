import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal } from '@angular/core';

interface ActionBtn {
  label: string;
  style: 'primary' | 'secondary';
  icon?: 'mail' | 'arrow';
}

interface BotCard {
  type: 'rich' | 'special';
  headerLabel: string;
  text: string;
  italic?: boolean;
  bullets?: string[];
  actions?: ActionBtn[];
  ctaButtons?: ActionBtn[];
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  card?: BotCard;
  timestamp: string;
}

const FAQ_DB: { keywords: string[]; card: BotCard }[] = [
  {
    keywords: ['bảo hành', 'warranty', 'chính sách'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'RENGA cam kết sự hoàn mỹ trọn đời cho mỗi tuyệt tác. Chính sách bảo hành của chúng tôi bao gồm:',
      bullets: [
        'Dịch vụ làm sạch và đánh bóng trọn đời miễn phí.',
        'Bảo hành lỗi kỹ thuật chế tác trong vòng <strong>12 tháng</strong>.',
      ],
      actions: [
        { label: 'Xem chi tiết chính sách', style: 'primary' },
        { label: 'Hỏi về sản phẩm cụ thể', style: 'secondary' },
      ],
    },
  },
  {
    keywords: ['bộ sưu tập', 'collection', 'collections'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'RENGA hiện có các bộ sưu tập trang sức cao cấp:',
      bullets: [
        'Bộ trang sức đồng bộ — nhẫn, dây chuyền, hoa tai.',
        'Bộ trang sức cặp đôi — thiết kế tinh tế, kết đôi hoàn hảo.',
        'Bộ sưu tập Hoàng Gia — xa hoa, đẳng cấp.',
      ],
      actions: [
        { label: 'Xem bộ sưu tập', style: 'primary' },
        { label: 'Tư vấn thêm', style: 'secondary' },
      ],
    },
  },
  {
    keywords: ['đơn hàng', 'order status', 'order', 'trạng thái'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'Để kiểm tra trạng thái đơn hàng, vui lòng cung cấp:',
      bullets: [
        'Mã đơn hàng (bắt đầu bằng <strong>ORD-</strong>).',
        'Số điện thoại đã đặt hàng.',
      ],
      actions: [
        { label: 'Kiểm tra đơn hàng', style: 'primary' },
        { label: 'Liên hệ CSKH', style: 'secondary' },
      ],
    },
  },
  {
    keywords: ['giá', 'price', 'bao nhiêu', 'chi phí'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'Giá trang sức tại RENGA phụ thuộc vào:',
      bullets: [
        'Chất liệu: Vàng 14K, 18K hoặc Bạch kim Platinum.',
        'Đá chủ: Moissanite hoặc Kim cương thiên nhiên GIA.',
        'Mức độ phức tạp của thiết kế.',
      ],
      actions: [
        { label: 'Xem bảng giá', style: 'primary' },
        { label: 'Tư vấn thiết kế', style: 'secondary' },
      ],
    },
  },
  {
    keywords: ['giao hàng', 'vận chuyển', 'delivery', 'ship'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'Chính sách giao hàng của RENGA:',
      bullets: [
        'Giao hàng toàn quốc trong <strong>3–5 ngày</strong> làm việc.',
        'Miễn phí vận chuyển cho đơn hàng trên 5.000.000đ.',
        'Giao hàng nhanh trong ngày tại Hà Nội & TP.HCM.',
      ],
      actions: [
        { label: 'Theo dõi đơn hàng', style: 'primary' },
        { label: 'Hỏi thêm', style: 'secondary' },
      ],
    },
  },
  {
    keywords: ['chất liệu', 'vật liệu', 'vàng', 'kim cương', 'moissanite', 'material'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'RENGA sử dụng những chất liệu cao cấp nhất:',
      bullets: [
        'Vàng <strong>14K</strong> và <strong>18K</strong> — trắng, hồng, vàng.',
        'Bạch kim Platinum 950.',
        'Đá chủ: Moissanite hoặc Kim cương thiên nhiên GIA.',
      ],
      actions: [
        { label: 'Tìm hiểu thêm', style: 'primary' },
        { label: 'Đặt lịch tư vấn', style: 'secondary' },
      ],
    },
  },
  {
    keywords: ['bespoke service', 'bespoke'],
    card: {
      type: 'rich',
      headerLabel: 'REN AI',
      text: 'Dịch vụ Bespoke của RENGA — chế tác trang sức độc bản:',
      bullets: [
        'Tư vấn 1-1 cùng nhà thiết kế chuyên nghiệp.',
        'Phác thảo và điều chỉnh theo ý tưởng của bạn.',
        'Phí tư vấn <strong>500.000đ</strong> (trừ trực tiếp vào đơn hàng).',
      ],
      actions: [
        { label: 'Đặt lịch hẹn ngay', style: 'primary' },
        { label: 'Tìm hiểu thêm', style: 'secondary' },
      ],
    },
  },
];

const SPECIAL_RESPONSE: BotCard = {
  type: 'special',
  headerLabel: 'Yêu cầu chuyên biệt',
  text: 'Rất tiếc, tôi chưa thể trả lời yêu cầu thiết kế riêng chuyên sâu này. Bạn có muốn kết nối trực tiếp với chuyên viên tư vấn của chúng tôi không?',
  italic: true,
  ctaButtons: [
    { label: 'GẶP NHÂN VIÊN CSKH', style: 'primary', icon: 'arrow' },
    { label: 'ĐỂ LẠI THÔNG TIN LIÊN HỆ', style: 'secondary', icon: 'mail' },
  ],
};

@Component({
  selector: 'app-chatbot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  @ViewChild('chatBody') chatBodyRef!: ElementRef<HTMLDivElement>;

  readonly isOpen = signal(false);
  readonly isTyping = signal(false);

  readonly messages = signal<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Xin chào! Tôi là REN AI Concierge. Tôi có thể giúp gì cho bạn?',
      timestamp: 'REN AI • Bây giờ',
    },
  ]);

  readonly inputValue = signal('');
  readonly quickChips: string[] = ['Collections', 'Bespoke Service', 'Order Status'];

  toggle(): void { this.isOpen.update(v => !v); }
  close(): void { this.isOpen.set(false); }
  setInput(value: string): void { this.inputValue.set(value); }

  send(): void {
    const text = this.inputValue().trim();
    if (!text) return;
    this._addUserMessage(text);
    this.inputValue.set('');
    this._scheduleReply(text);
  }

  sendChip(chip: string): void {
    this._addUserMessage(chip);
    this._scheduleReply(chip);
  }

  private _addUserMessage(text: string): void {
    const now = new Date();
    const h = now.getHours() % 12 || 12;
    const m = now.getMinutes().toString().padStart(2, '0');
    const period = now.getHours() >= 12 ? 'CH' : 'SA';
    this.messages.update(msgs => [
      ...msgs,
      { id: String(Date.now()), sender: 'user', text, timestamp: `Đã gửi • ${h}:${m} ${period}` },
    ]);
    this._scrollToBottom();
  }

  private _scheduleReply(userText: string): void {
    this.isTyping.set(true);
    this._scrollToBottom();
    setTimeout(() => {
      this.isTyping.set(false);
      const card = this._findResponse(userText);
      this.messages.update(msgs => [
        ...msgs,
        { id: String(Date.now()), sender: 'bot', card, timestamp: 'REN AI • Bây giờ' },
      ]);
      this._scrollToBottom();
    }, 900);
  }

  private _findResponse(text: string): BotCard {
    const lower = text.toLowerCase();
    for (const entry of FAQ_DB) {
      if (entry.keywords.some(kw => lower.includes(kw))) {
        return entry.card;
      }
    }
    return SPECIAL_RESPONSE;
  }

  private _scrollToBottom(): void {
    setTimeout(() => {
      const el = this.chatBodyRef?.nativeElement;
      if (el) el.scrollTop = el.scrollHeight;
    }, 60);
  }
}
