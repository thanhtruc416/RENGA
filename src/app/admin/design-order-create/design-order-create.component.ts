import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-design-order-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './design-order-create.component.html',
  styleUrl: './design-order-create.component.css',
})
export class DesignOrderCreateComponent {}
