import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-warranty-policy',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './warranty-policy.component.html',
  styleUrl: './warranty-policy.component.css',
})
export class WarrantyPolicyComponent {
  readonly isContactOpen = signal(false);
}
