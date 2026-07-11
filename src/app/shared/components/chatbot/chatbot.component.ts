import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BotCard, FAQ_DB, SPECIAL_RESPONSE } from '../../data/chatbot-faq.data';
import { ChatbotService } from '../../../core/services/chatbot.service';
import { environment } from '../../../../environments/environment';

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
  imports: [RouterLink],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  @ViewChild('chatBody') chatBodyRef!: ElementRef<HTMLDivElement>;

  private readonly chatbotService = inject(ChatbotService);
  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  readonly isOpen = this.chatbotService.isOpen;
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

  toggle(): void { this.chatbotService.toggle(); }
  close(): void { this.chatbotService.close(); }
  onInput(event: Event): void { this.inputValue.set((event.target as HTMLInputElement).value); }

  send(): void {
    const text = this.inputValue().trim();
    if (!text) return;
    this._addUserMessage(text);
    this.inputValue.set('');
    this._scheduleReply(text);
  }

  // Các nút câu hỏi sẵn (chip) luôn trả lời bằng card FAQ dựng sẵn (có nút hành
  // động link đúng trang) như trước — không đi qua AI, vì AI trả text thuần nên
  // sẽ không hiện được các nút bấm đó.
  sendChip(chip: string): void {
    this._addUserMessage(chip);
    this.isTyping.set(true);
    this._scrollToBottom();
    setTimeout(() => {
      this.isTyping.set(false);
      this._addBotMessage({ card: this._findResponse(chip) });
      this._scrollToBottom();
    }, 700);
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

    this.http.post<{ success: boolean; data?: { reply: string } }>(
      `${environment.apiUrl}/chatbot`,
      { message: userText },
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isTyping.set(false);
        if (res.success && res.data?.reply) {
          this._addBotMessage({ text: res.data.reply });
        } else {
          this._addBotMessage({ card: this._findResponse(userText) });
        }
        this._scrollToBottom();
      },
      // AI chưa cấu hình xong (thiếu CHATBOT_API_KEY) hoặc lỗi mạng — vẫn trả lời
      // được bằng FAQ cứng thay vì im lặng/vỡ trải nghiệm.
      error: () => {
        this.isTyping.set(false);
        this._addBotMessage({ card: this._findResponse(userText) });
        this._scrollToBottom();
      },
    });
  }

  private _addBotMessage(content: { text?: string; card?: BotCard }): void {
    this.messages.update(msgs => [
      ...msgs,
      { id: String(Date.now()), sender: 'bot', ...content, timestamp: 'REN AI • Bây giờ' },
    ]);
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
