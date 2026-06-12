import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cancel-design-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './cancel-design-modal.component.html',
  styleUrl: './cancel-design-modal.component.css',
})
export class CancelDesignModalComponent {}
