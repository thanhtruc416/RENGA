import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-found-orders-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './found-orders-modal.component.html',
  styleUrl: './found-orders-modal.component.css',
})
export class FoundOrdersModalComponent {
  readonly confirmed = output<void>();
  readonly skipped = output<void>();
  readonly closed = output<void>();

  onConfirm(): void { this.confirmed.emit(); }
  onSkip(): void { this.skipped.emit(); }
  onClose(): void { this.closed.emit(); }
}
