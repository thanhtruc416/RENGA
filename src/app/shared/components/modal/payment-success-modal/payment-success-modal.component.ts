import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-success-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  templateUrl: './payment-success-modal.component.html',
  styleUrl: './payment-success-modal.component.css',
})
export class PaymentSuccessModalComponent {
  readonly isOpen       = input<boolean>(false);
  readonly isGuest      = input<boolean>(false);
  readonly mode         = input<'order' | 'appointment'>('order');
  readonly closed       = output<void>();
  readonly scheduleAgain = output<void>();

  close(): void { this.closed.emit(); }
  onScheduleAgain(): void { this.closed.emit(); this.scheduleAgain.emit(); }
}