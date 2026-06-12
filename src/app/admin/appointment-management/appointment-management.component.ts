import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-appointment-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './appointment-management.component.html',
  styleUrl: './appointment-management.component.css',
})
export class AppointmentManagementComponent {}
