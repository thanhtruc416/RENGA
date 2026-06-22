import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

interface ReviewSpec { label: string; value: string; }

@Component({
  selector: 'app-reviews',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.css',
})
export class ReviewsComponent {
  private readonly route = inject(ActivatedRoute);

  readonly orderId = toSignal(
    this.route.queryParamMap.pipe(map(p => p.get('orderId') ?? '#AH-8829104')),
    { initialValue: '#AH-8829104' },
  );

  readonly specs: ReviewSpec[] = [
    { label: 'Đá chính',           value: 'Colombian Emerald (8.2ct)' },
    { label: 'Chất liệu',          value: '950 Platinum & 18k Gold' },
    { label: 'Thời gian giao hàng', value: '15/09/2026' },
  ];

  readonly stars = [1, 2, 3, 4, 5];

  readonly rating     = signal(0);
  readonly hoverRating = signal(0);
  readonly reviewText  = signal('');
  readonly fileNames   = signal<string[]>([]);
  readonly isSubmitted = signal(false);
  readonly isSubmitting = signal(false);

  readonly displayRating = computed(() => this.hoverRating() || this.rating());

  setRating(n: number): void { this.rating.set(n); }
  setHover(n: number): void  { this.hoverRating.set(n); }
  clearHover(): void          { this.hoverRating.set(0); }

  onTextInput(event: Event): void {
    this.reviewText.set((event.target as HTMLTextAreaElement).value);
  }

  onFileSelect(event: Event): void {
    const files = (event.target as HTMLInputElement).files;
    if (files) {
      this.fileNames.set(Array.from(files).map(f => f.name));
    }
  }

  submitReview(): void {
    if (this.rating() === 0 || this.isSubmitting()) return;
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 800);
  }
}
