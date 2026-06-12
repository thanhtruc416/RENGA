import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-detail-custom',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './order-detail-custom.component.html',
  styleUrl: './order-detail-custom.component.css',
})
export class OrderDetailCustomComponent {}
