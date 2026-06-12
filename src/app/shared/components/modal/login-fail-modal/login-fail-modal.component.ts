import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-login-fail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './login-fail-modal.component.html',
  styleUrl: './login-fail-modal.component.css',
})
export class LoginFailModalComponent {}
