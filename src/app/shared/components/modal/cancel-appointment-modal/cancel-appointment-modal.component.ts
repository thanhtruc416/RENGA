import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-cancel-appointment-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './cancel-appointment-modal.component.html',
  styleUrl: './cancel-appointment-modal.component.css',
})
export class CancelAppointmentModalComponent {}
