import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin-header.component.html',
  styleUrl: './admin-header.component.css',
})
export class AdminHeaderComponent {
  @Input() title = '';
  @Input() subtitle = '';
}
