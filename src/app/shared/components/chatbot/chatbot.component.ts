import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {}
