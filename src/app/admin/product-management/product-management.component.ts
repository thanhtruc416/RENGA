import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './product-management.component.html',
  styleUrl: './product-management.component.css',
})
export class ProductManagementComponent {}
