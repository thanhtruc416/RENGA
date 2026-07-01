import { ChangeDetectionStrategy, Component, inject, input, output, ViewEncapsulation } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './payment-success-modal.component.html',
  styleUrl: './payment-success-modal.component.css',
})
export class PaymentSuccessModalComponent {
  readonly isOpen        = input<boolean>(false);
  readonly isGuest       = input<boolean>(false);
  readonly mode          = input<'order' | 'appointment'>('order');
  readonly orderId       = input<string>('');
  readonly isCustomOrder = input<boolean>(false);
  readonly amount        = input<number>(0);
  readonly closed        = output<void>();
  readonly scheduleAgain = output<void>();

  private readonly router = inject(Router);

  close(): void { this.closed.emit(); }

  closeX(): void {
    this.closed.emit();
    if (this.isGuest()) {
      this.router.navigateByUrl('/');
    } else {
      const dest = this.mode() === 'appointment' ? '/appointment-history' : '/orders';
      this.router.navigateByUrl(dest);
    }
  }

  onScheduleAgain(): void { this.closed.emit(); this.scheduleAgain.emit(); }
}