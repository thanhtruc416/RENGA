import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-warranty-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './warranty-management.component.html',
  styleUrl: './warranty-management.component.css',
})
export class WarrantyManagementComponent {}
