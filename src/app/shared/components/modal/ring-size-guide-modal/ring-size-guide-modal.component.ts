import { ChangeDetectionStrategy, Component, output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-ring-size-guide-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './ring-size-guide-modal.component.html',
  styleUrl: './ring-size-guide-modal.component.css',
})
export class RingSizeGuideModalComponent {
  readonly closed = output<void>();

  close(): void { this.closed.emit(); }
}
