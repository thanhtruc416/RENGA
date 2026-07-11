import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, NavigationStart, NavigationCancel, NavigationError } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { LoginRequiredModalComponent } from './shared/components/modal/login-required-modal/login-required-modal.component';
import { GlobalToastComponent } from './shared/components/global-toast/global-toast.component';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent, LoginRequiredModalComponent, GlobalToastComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly modalService = inject(ModalService);
  private readonly router = inject(Router);

  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => (e as NavigationEnd).urlAfterRedirects)
    ),
    { initialValue: this.router.url }
  );

  // Route lazy-load (vd Studio ~260KB, chunk nặng nhất app) trước đây không có
  // dấu hiệu nào khi bấm — trông như bị đơ, khách phải bấm lại hoặc đợi mù mờ
  // mới thấy trang hiện ra. Hiện thanh loading mỏng trong lúc chunk đang tải.
  readonly isNavigating = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd
                || e instanceof NavigationCancel || e instanceof NavigationError),
      map(e => e instanceof NavigationStart)
    ),
    { initialValue: false }
  );

  readonly isAdminRoute = computed(() =>
    this.currentUrl().startsWith('/admin') || this.currentUrl().startsWith('/quan-tri-vien')
  );

  readonly isAuthRoute = computed(() => {
    const url = this.currentUrl();
    return url.startsWith('/dang-nhap') || url.startsWith('/dang-ki')
        || url.startsWith('/quen-mat-khau') || url.startsWith('/mat-khau-moi');
  });
}
