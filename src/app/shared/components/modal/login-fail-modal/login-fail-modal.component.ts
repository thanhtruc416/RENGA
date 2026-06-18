import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-login-fail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  templateUrl: './login-fail-modal.component.html',
  styleUrl: './login-fail-modal.component.css',
})
export class LoginFailModalComponent {
  @Input() remainingAttempts = 3;
  @Output() closed = new EventEmitter<void>();
}
