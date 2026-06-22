import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-returns-policy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './returns-policy.component.html',
  styleUrl: './returns-policy.component.css',
})
export class ReturnsPolicyComponent {
  readonly isContactOpen = signal(false);
}
