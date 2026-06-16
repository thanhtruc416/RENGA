import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface CategoryLink {
  label: string;
  route: string;
}

interface CategoryCard {
  id: string;
  name: string;
  englishName: string;
  imageUrl: string;
  links: CategoryLink[];
}

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-categories',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent {
  readonly topCategories: CategoryCard[] = [
    {
      id: 'nhan',
      name: 'Nhẫn',
      englishName: 'Rings',
      imageUrl: '/images/category-nhan.png',
      links: [
        { label: 'Nhẫn Cưới & Cầu Hôn', route: '/products' },
        { label: 'Vàng 24K / 18K / 14K', route: '/products' },
        { label: 'Kim Cương Lab-Grown', route: '/products' },
        { label: 'Nhẫn Phong Thủy', route: '/products' },
      ],
    },
    {
      id: 'day-chuyen',
      name: 'Dây Chuyền',
      englishName: 'Necklaces',
      imageUrl: '/images/category-day-chuyen.png',
      links: [
        { label: 'Vàng & Vàng Trắng', route: '/products' },
        { label: 'Trang Sức Bạc', route: '/products' },
        { label: 'Mặt Dây Phong Thủy', route: '/products' },
      ],
    },
    {
      id: 'hoa-tai',
      name: 'Hoa Tai',
      englishName: 'Earrings',
      imageUrl: '/images/category-hoa-tai.png',
      links: [
        { label: 'Vàng & Vàng Trắng', route: '/products' },
        { label: 'Hoa Tai Bạc', route: '/products' },
        { label: 'Gắn Đá Quý', route: '/products' },
      ],
    },
  ];

  readonly braceletsLinks: CategoryLink[] = [
    { label: 'Vàng & Vàng Trắng', route: '/products' },
    { label: 'Vòng Charm Bạc', route: '/products' },
    { label: 'Đá Quý Phong Thủy', route: '/products' },
    { label: 'Lắc Charm Cá Tính', route: '/products' },
  ];

  readonly chatbotOpen = signal(false);

  readonly chatMessages = signal<ChatMessage[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Xin chào! Tôi là REN AI Concierge. Tôi có thể giúp gì cho bạn?',
      timestamp: 'REN AI • NOW',
    },
  ]);

  readonly inputValue = signal('');

  readonly quickChips: string[] = ['Collections', 'Bespoke Service', 'Order Status'];

  toggleChatbot(): void {
    this.chatbotOpen.update((v) => !v);
  }

  closeChatbot(): void {
    this.chatbotOpen.set(false);
  }

  setInputValue(value: string): void {
    this.inputValue.set(value);
  }

  sendMessage(): void {
    const text = this.inputValue().trim();
    if (!text) return;
    this.chatMessages.update((msgs) => [
      ...msgs,
      { id: String(msgs.length + 1), sender: 'user', text, timestamp: 'YOU • NOW' },
    ]);
    this.inputValue.set('');
  }

  sendChip(chip: string): void {
    this.chatMessages.update((msgs) => [
      ...msgs,
      { id: String(msgs.length + 1), sender: 'user', text: chip, timestamp: 'YOU • NOW' },
    ]);
  }
}
