import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-required-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  templateUrl: './login-required-modal.component.html',
  styleUrl: './login-required-modal.component.css',
})
export class LoginRequiredModalComponent {
  @Output() closed = new EventEmitter<void>();
}
