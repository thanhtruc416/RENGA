import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-phone-not-found-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [RouterLink],
  templateUrl: './phone-not-found-modal.component.html',
  styleUrl: './phone-not-found-modal.component.css',
})
export class PhoneNotFoundModalComponent {
  @Output() closed = new EventEmitter<void>();
}
