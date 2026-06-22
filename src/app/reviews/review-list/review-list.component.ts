import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';

interface ReviewOrder {
  id: string;
  type: string;
  date: string;
  product: string;
  total: string;
  reviewed: boolean;
}

const ALL_ORDERS: ReviewOrder[] = [
  { id: '#AH-29384', type: 'LUXURY PACKAGING', date: '14/05/2024', product: 'Bespoke Diamond Tiara',    total: '850.000.000₫', reviewed: false },
  { id: '#AH-28110', type: 'CERTIFIED GIA',    date: '22/03/2024', product: 'Aurelian Gold Cufflinks',  total: '42.500.000₫',  reviewed: true  },
  { id: '#AH-27552', type: 'VINTAGE REPLICA',  date: '02/01/2024', product: 'Heritage Emerald Necklace', total: '320.000.000₫', reviewed: true  },
  { id: '#AH-26901', type: 'CERTIFIED GIA',    date: '18/11/2023', product: 'Celestial Sapphire Ring',  total: '195.000.000₫', reviewed: true  },
  { id: '#AH-26415', type: 'LUXURY PACKAGING', date: '05/10/2023', product: 'Vermeil Signet Ring',       total: '28.500.000₫',  reviewed: false },
  { id: '#AH-25870', type: 'VINTAGE REPLICA',  date: '12/09/2023', product: 'Art Deco Pearl Brooch',    total: '76.000.000₫',  reviewed: true  },
  { id: '#AH-25211', type: 'CERTIFIED GIA',    date: '01/08/2023', product: 'Colombian Emerald Pendant', total: '412.000.000₫', reviewed: true  },
  { id: '#AH-24788', type: 'LUXURY PACKAGING', date: '20/07/2023', product: 'Aurelian Cuff Bracelet',   total: '63.000.000₫',  reviewed: false },
  { id: '#AH-24102', type: 'VINTAGE REPLICA',  date: '09/06/2023', product: 'Moonstone Halo Earrings',  total: '34.000.000₫',  reviewed: true  },
  { id: '#AH-23547', type: 'CERTIFIED GIA',    date: '28/05/2023', product: 'Diamond Tennis Bracelet',  total: '680.000.000₫', reviewed: true  },
  { id: '#AH-22983', type: 'LUXURY PACKAGING', date: '14/04/2023', product: 'Ruby Pavé Ring',           total: '125.000.000₫', reviewed: false },
  { id: '#AH-22310', type: 'VINTAGE REPLICA',  date: '02/03/2023', product: 'Victorian Garnet Necklace', total: '89.000.000₫',  reviewed: true  },
];

const PAGE_SIZE = 4;

@Component({
  selector: 'app-review-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './review-list.component.html',
  styleUrl: './review-list.component.css',
})
export class ReviewListComponent {
  private readonly router = inject(Router);

  navigateToReview(orderId: string): void {
    this.router.navigate(['/orders/reviews/write'], { queryParams: { orderId } });
  }
  // Draft — what user selected but not yet applied
  readonly pendingType   = signal('');
  readonly pendingStatus = signal('');
  readonly pendingTime   = signal('3months');

  // Active — what's actually used for filtering
  readonly activeType   = signal('');
  readonly activeStatus = signal('');
  readonly activeTime   = signal('3months');

  readonly currentPage = signal(1);

  readonly hasDraftChanges = computed(() =>
    this.pendingType()   !== this.activeType()   ||
    this.pendingStatus() !== this.activeStatus() ||
    this.pendingTime()   !== this.activeTime()
  );

  readonly hasActiveFilters = computed(() =>
    this.activeType()   !== '' ||
    this.activeStatus() !== '' ||
    this.activeTime()   !== '3months'
  );

  readonly filtered = computed(() => {
    let list = ALL_ORDERS;
    const type   = this.activeType();
    const status = this.activeStatus();
    if (type)   list = list.filter(o => o.type === type);
    if (status === 'unreviewed') list = list.filter(o => !o.reviewed);
    if (status === 'reviewed')   list = list.filter(o => o.reviewed);
    return list;
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filtered().length / PAGE_SIZE)));

  readonly pageItems = computed(() => {
    const start = (this.currentPage() - 1) * PAGE_SIZE;
    return this.filtered().slice(start, start + PAGE_SIZE);
  });

  readonly pageNumbers = computed(() =>
    Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  applyFilters(): void {
    this.activeType.set(this.pendingType());
    this.activeStatus.set(this.pendingStatus());
    this.activeTime.set(this.pendingTime());
    this.currentPage.set(1);
  }

  clearFilters(): void {
    this.pendingType.set('');
    this.pendingStatus.set('');
    this.pendingTime.set('3months');
    this.activeType.set('');
    this.activeStatus.set('');
    this.activeTime.set('3months');
    this.currentPage.set(1);
  }

  goTo(page: number): void {
    if (page >= 1 && page <= this.totalPages()) this.currentPage.set(page);
  }

  onOrderTypeChange(event: Event): void {
    this.pendingType.set((event.target as HTMLSelectElement).value);
  }

  onStatusChange(event: Event): void {
    this.pendingStatus.set((event.target as HTMLSelectElement).value);
  }

  onTimeChange(event: Event): void {
    this.pendingTime.set((event.target as HTMLSelectElement).value);
  }
}
