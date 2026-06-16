import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header';
import { FooterComponent } from './shared/components/footer/footer.component';
import { ChatbotComponent } from './shared/components/chatbot/chatbot.component';
import { LoginRequiredModalComponent } from './shared/components/modal/login-required-modal/login-required-modal.component';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, ChatbotComponent, LoginRequiredModalComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('renga-tmp');
  readonly modalService = inject(ModalService);
}
