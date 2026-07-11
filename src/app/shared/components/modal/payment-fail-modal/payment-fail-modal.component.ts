import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-fail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './payment-fail-modal.component.html',
  styleUrl: './payment-fail-modal.component.css',
})
export class PaymentFailModalComponent {
  readonly isOpen   = input<boolean>(false);
  readonly isGuest  = input<boolean>(false);
  readonly orderId  = input<string>('');
  readonly total    = input<number>(0);
  readonly closed   = output<void>();

  close(): void { this.closed.emit(); }
}
