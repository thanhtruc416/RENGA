import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-qa-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './qa-management.component.html',
  styleUrl: './qa-management.component.css',
})
export class QaManagementComponent {}
