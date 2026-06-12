import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-voucher-management',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './voucher-management.component.html',
  styleUrl: './voucher-management.component.css',
})
export class VoucherManagementComponent {}
