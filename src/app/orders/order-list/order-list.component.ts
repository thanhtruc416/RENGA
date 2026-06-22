import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DecimalPipe, registerLocaleData } from '@angular/common';
import localeVi from '@angular/common/locales/vi';

registerLocaleData(localeVi);

export interface OrderSummary {
  id: string;
  date: string;
  status: string;
  statusLabel: string;
  total: number;
  itemCount: number;
  imageUrl: string;
  productName: string;
}

const STATUS_CLASS: Record<string, string> = {
  'P':  'order-list__status--pending',
  'PC': 'order-list__status--confirmed',
  'PF': 'order-list__status--processing',
  'S':  'order-list__status--shipping',
  'CM': 'order-list__status--completed',
  'C':  'order-list__status--cancelled',
};

@Component({
  selector: 'app-order-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DecimalPipe],
  providers: [{ provide: 'LOCALE_ID', useValue: 'vi' }],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css',
})
export class OrderListComponent {
  readonly orders = signal<OrderSummary[]>([
    {
      id: 'AH-8829104',
      date: '25/10/2026',
      status: 'S',
      statusLabel: 'Đang giao hàng',
      total: 20_700_000,
      itemCount: 2,
      imageUrl: '/images/product-nhan-kim-cuong-solitaire.png',
      productName: 'Celestial Gold Choker',
    },
    {
      id: 'AH-7714302',
      date: '10/10/2026',
      status: 'CM',
      statusLabel: 'Hoàn thành',
      total: 12_500_000,
      itemCount: 1,
      imageUrl: '/images/product-nhan-eternal-love.png',
      productName: 'Nhẫn Eternal Love',
    },
    {
      id: 'AH-6603219',
      date: '02/09/2026',
      status: 'C',
      statusLabel: 'Đã hủy',
      total: 8_200_000,
      itemCount: 1,
      imageUrl: '/images/product-nhan-rose-gold-sapphire.png',
      productName: 'Nhẫn Rose Gold Sapphire',
    },
  ]);

  readonly statusClass = STATUS_CLASS;

  getStatusClass(status: string): string {
    return STATUS_CLASS[status] ?? '';
  }
}
