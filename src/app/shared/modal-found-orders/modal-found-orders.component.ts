import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-found-orders',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './modal-found-orders.component.html',
  styleUrl: './modal-found-orders.component.css',
})
export class ModalFoundOrdersComponent {
  readonly confirmed = output<void>();
  readonly skipped = output<void>();
  readonly closed = output<void>();

  onConfirm(): void { this.confirmed.emit(); }
  onSkip(): void { this.skipped.emit(); }
  onClose(): void { this.closed.emit(); }
}
