import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-login-required',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './modal-login-required.component.html',
  styleUrl: './modal-login-required.component.css',
})
export class ModalLoginRequiredComponent {
  readonly loginClicked = output<void>();
  readonly backClicked = output<void>();

  onLogin(): void { this.loginClicked.emit(); }
  onBack(): void { this.backClicked.emit(); }
}
