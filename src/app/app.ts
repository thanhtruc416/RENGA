import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { filter, map } from 'rxjs/operators';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { LoginRequiredModalComponent } from './shared/components/modal/login-required-modal/login-required-modal.component';
import { ModalService } from './core/services/modal.service';

@Component({
  selector: 'app-root',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent, LoginRequiredModalComponent],
  templateUrl: './app.html',
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

  readonly isAdminRoute = computed(() =>
    this.currentUrl().startsWith('/admin') || this.currentUrl().startsWith('/quan-tri-vien')
  );

  readonly isAuthRoute = computed(() => {
    const url = this.currentUrl();
    return url.startsWith('/dang-nhap') || url.startsWith('/dang-ki')
        || url.startsWith('/quen-mat-khau') || url.startsWith('/mat-khau-moi');
  });
}
