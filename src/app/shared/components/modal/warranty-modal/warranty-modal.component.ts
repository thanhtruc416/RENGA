import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-warranty-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [ReactiveFormsModule],
  templateUrl: './warranty-modal.component.html',
  styleUrl: './warranty-modal.component.css',
})
export class WarrantyModalComponent {
  private readonly auth = inject(AuthService);

  // ── Inputs ──────────────────────────────────────────
  readonly orderId       = input<string>('');
  readonly productName   = input<string>('');
  readonly productImage  = input<string>('');
  readonly customerName  = input<string>('');
  readonly customerPhone = input<string>('');

  // ── Computed từ auth ────────────────────────────────
  readonly isGuest = computed(() => !this.auth.isLoggedIn());

  // ── Outputs ─────────────────────────────────────────
  readonly closed    = output<void>();
  readonly confirmed = output<void>();

  // ── State ───────────────────────────────────────────
  readonly mockShouldSucceed = input<boolean>(true);
  readonly submitted   = signal(false);
  readonly isSuccess   = signal(false);
  readonly isFailure   = signal(false);
  readonly previewUrls = signal<string[]>([]);

  readonly form = new FormGroup({
    name:    new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    phone:   new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^\d{10}$/)] }),
    issue:   new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  readonly imageError = computed(() => false);

  constructor() {
    setTimeout(() => {
      if (!this.isGuest()) {
        this.form.controls.name.setValue(this.customerName());
        this.form.controls.name.disable();
        this.form.controls.phone.setValue(this.customerPhone());
        this.form.controls.phone.disable();
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files) return;
    const urls: string[] = [...this.previewUrls()];
    Array.from(input.files).forEach(file => {
      const reader = new FileReader();
      reader.onload = () => urls.push(reader.result as string);
      reader.readAsDataURL(file);
      setTimeout(() => this.previewUrls.set([...urls]));
    });
  }

  removeImage(index: number): void {
    this.previewUrls.update(list => list.filter((_, i) => i !== index));
  }

  onSubmit(): void {
    this.submitted.set(true);
    if (this.form.invalid) return;
    if (this.mockShouldSucceed()) {
      this.isSuccess.set(true);
      this.confirmed.emit();
    } else {
      this.isFailure.set(true);
    }
  }

  onClose(): void {
    this.closed.emit();
  }
}
