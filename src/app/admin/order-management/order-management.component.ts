import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.css',
})
export class OrderManagementComponent {}
