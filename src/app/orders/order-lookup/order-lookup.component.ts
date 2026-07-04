import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ChatbotService } from '../../core/services/chatbot.service';

interface LookupForm {
  orderId: FormControl<string>;
  phone: FormControl<string>;
}

@Component({
  selector: 'app-order-lookup',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './order-lookup.component.html',
  styleUrl: './order-lookup.component.css',
})
export class OrderLookupComponent {
  private readonly router = inject(Router);
  private readonly chatbotService = inject(ChatbotService);

  readonly lookupForm = new FormGroup<LookupForm>({
    orderId: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^0\d{9}$/),
      ],
    }),
  });

  readonly isLoading = signal(false);
  readonly errorMsg = signal('');

  onSubmit(): void {
    if (this.lookupForm.invalid) {
      this.lookupForm.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    const { orderId } = this.lookupForm.getRawValue();

    // TODO: thay bằng gọi API thật — kiểm tra orderId + phone, trả về orderType
    setTimeout(() => {
      this.isLoading.set(false);

      const trimmedId = orderId.trim();
      const prefix = trimmedId.toUpperCase();

      if (!prefix) {
        this.errorMsg.set('Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin.');
        return;
      }

      const isCustom = prefix.startsWith('C') || prefix.startsWith('TB');

      // Khớp đúng thứ tự segment đã khai báo trong app.routes.ts:
      // { path: 'orders/custom/:id' } và { path: 'orders/:id' }
      if (isCustom) {
        this.router.navigate(['/orders', 'custom', trimmedId]);
      } else {
        this.router.navigate(['/orders', trimmedId]);
      }
    }, 600);
  }

  get orderIdCtrl() {
    return this.lookupForm.controls.orderId;
  }

  get phoneCtrl() {
    return this.lookupForm.controls.phone;
  }

  openSupportChat(): void {
    this.chatbotService.open();
  }
}