import { ChangeDetectionStrategy, Component, computed, input, output, ViewEncapsulation } from '@angular/core';
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
  isOpen = input<boolean>(false);
  isGuest = input<boolean>(false);
  closed = output<void>();

  readonly isModalOpen = computed(() => this.isOpen());
  close(): void {
    this.closed.emit();
  }
}