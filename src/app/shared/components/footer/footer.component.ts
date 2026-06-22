import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RingSizeGuideModalComponent } from '../modal/ring-size-guide-modal/ring-size-guide-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, RingSizeGuideModalComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly showSizeGuide = signal(false);
  openSizeGuide(e: Event): void { e.preventDefault(); this.showSizeGuide.set(true); }
  closeSizeGuide(): void { this.showSizeGuide.set(false); }
}
