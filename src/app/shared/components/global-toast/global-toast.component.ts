import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-global-toast',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './global-toast.component.html',
  styleUrl: './global-toast.component.css',
})
export class GlobalToastComponent {
  private readonly notificationService = inject(NotificationService);
  readonly toasts = this.notificationService.toasts;

  dismiss(id: number): void {
    this.notificationService.dismiss(id);
  }
}
