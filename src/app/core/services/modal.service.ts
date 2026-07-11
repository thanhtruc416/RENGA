import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ModalService {
  readonly showLoginRequired = signal(false);

  openLoginRequired(): void { this.showLoginRequired.set(true); }
  closeLoginRequired(): void { this.showLoginRequired.set(false); }
}
