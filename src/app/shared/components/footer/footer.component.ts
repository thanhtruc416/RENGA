import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { RingSizeGuideModalComponent } from '../modal/ring-size-guide-modal/ring-size-guide-modal.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, RingSizeGuideModalComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  readonly showSizeGuide = signal(false);
  openSizeGuide(e: Event): void { e.preventDefault(); this.showSizeGuide.set(true); }
  closeSizeGuide(): void { this.showSizeGuide.set(false); }

  readonly emailCtrl = new FormControl('', [Validators.required, Validators.email]);
  readonly newsletterDone = signal(false);

  onNewsletterSubmit(): void {
    if (this.emailCtrl.invalid) {
      this.emailCtrl.markAsTouched();
      return;
    }
    this.newsletterDone.set(true);
    this.emailCtrl.reset();
  }
}
