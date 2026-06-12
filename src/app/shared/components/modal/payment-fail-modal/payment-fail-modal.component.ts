import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-fail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './payment-fail-modal.component.html',
  styleUrl: './payment-fail-modal.component.css',
})
export class PaymentFailModalComponent {}
