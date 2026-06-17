import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, signal } from '@angular/core';
import { BotCard, FAQ_DB, SPECIAL_RESPONSE } from '../../data/chatbot-faq.data';

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text?: string;
  card?: BotCard;
  timestamp: string;
}

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
  onInput(event: Event): void { this.inputValue.set((event.target as HTMLInputElement).value); }

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
