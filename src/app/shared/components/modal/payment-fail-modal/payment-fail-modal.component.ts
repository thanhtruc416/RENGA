import { ChangeDetectionStrategy, Component, input, output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-fail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  templateUrl: './payment-fail-modal.component.html',
  styleUrl: './payment-fail-modal.component.css',
})
export class PaymentFailModalComponent {
  isOpen = input<boolean>(false);
  isGuest = input<boolean>(false);
  countdownDisplay = input<string>('00:00:00');
  closed = output<void>();

  close(): void {
    this.closed.emit();
  }
}
