import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-required-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './login-required-modal.component.html',
  styleUrl: './login-required-modal.component.css',
})
export class LoginRequiredModalComponent {}
