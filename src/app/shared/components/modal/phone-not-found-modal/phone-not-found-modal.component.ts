import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-phone-not-found-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './phone-not-found-modal.component.html',
  styleUrl: './phone-not-found-modal.component.css',
})
export class PhoneNotFoundModalComponent {}
