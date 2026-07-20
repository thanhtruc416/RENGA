import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ChatbotService } from '../../core/services/chatbot.service';
import { GuestOrderService } from '../../core/services/guest-order.service';
import { environment } from '../../../environments/environment';

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
  private readonly http = inject(HttpClient);
  private readonly guestOrderService = inject(GuestOrderService);
  private readonly destroyRef = inject(DestroyRef);

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

    const { orderId, phone } = this.lookupForm.getRawValue();
    const trimmedId = orderId.trim();

    this.http.post<{ success: boolean; accessToken: string; orderType: 'STANDARD' | 'STUDIO' | 'DESIGN' }>(
      `${environment.apiUrl}/orders/lookup`, { orderId: trimmedId, phone: phone.trim() },
    ).pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.guestOrderService.save(trimmedId, res.accessToken);
        // Khớp đúng thứ tự segment đã khai báo trong app.routes.ts:
        // { path: 'orders/custom/:id' } và { path: 'orders/:id' }
        if (res.orderType === 'STUDIO' || res.orderType === 'DESIGN') {
          this.router.navigate(['/orders', 'custom', trimmedId]);
        } else {
          this.router.navigate(['/orders', trimmedId]);
        }
      },
      error: (err: HttpErrorResponse) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message ?? 'Không tìm thấy đơn hàng. Vui lòng kiểm tra lại thông tin.');
      },
    });
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