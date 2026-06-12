import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-profile-loyalty',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './profile-loyalty.component.html',
  styleUrl: './profile-loyalty.component.css',
})
export class ProfileLoyaltyComponent {}
