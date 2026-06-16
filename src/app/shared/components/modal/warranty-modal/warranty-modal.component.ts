import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface RepairLineItem {
  id: string;
  label: string;
  fee: number;
}

/**
 * Modal Bảo hành / Sửa chữa — BR-45, BR-46, BPMN 3.1.6
 *
 * ViewEncapsulation.None để CSS backdrop (position:fixed, display:flex)
 * không bị Angular scoped — tránh modal render sai vị trí.
 */
@Component({
  selector: 'app-warranty-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [DecimalPipe, FormsModule],
  templateUrl: './warranty-modal.component.html',
  styleUrl: './warranty-modal.component.css',
})
export class WarrantyModalComponent {
  // ── Inputs ──────────────────────────────────────────────────────────────────
  readonly orderId          = input<string>('AH-8924102');
  readonly warrantyCode     = input<string>('WR-8829-2023');
  readonly customerName     = input<string>('Nguyễn Thu Thủy');
  readonly productName      = input<string>('Vòng tay Kim cương Aurora - Platinum Edition');
  readonly productImage     = input<string>('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=200&h=200&fit=crop');
  readonly issueDescription = input<string>('Móc khóa bị lỏng, một viên kim cương tấm ở canh bên có dấu hiệu bị lung lay sau khi va chạm mạnh.');
  readonly evidenceImages   = input<string[]>([
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&h=200&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=200&h=200&fit=crop',
  ]);
  readonly repairItems      = input<RepairLineItem[]>([]);
  readonly isFreeWarranty   = input<boolean>(false);

  // ── Outputs ─────────────────────────────────────────────────────────────────
  readonly confirmed = output<{ quoteNote: string }>();
  readonly rejected  = output<void>();
  readonly closed    = output<void>();

  // ── State ───────────────────────────────────────────────────────────────────
  readonly isSubmitting = signal(false);
  readonly isSuccess    = signal(false);
  readonly quoteNote    = signal('');

  // ── Computed ────────────────────────────────────────────────────────────────
  readonly hasQuote = computed<boolean>(() => this.repairItems().length > 0);
  readonly totalFee = computed<number>(() =>
    this.repairItems().reduce((sum, item) => sum + item.fee, 0),
  );

  // ── Actions ─────────────────────────────────────────────────────────────────
  onConfirm(): void {
    if (this.isSubmitting()) return;
    this.isSubmitting.set(true);
    // TODO: gọi OrdersService.confirmWarrantyQuote(orderId, warrantyCode, quoteNote)
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
      this.confirmed.emit({ quoteNote: this.quoteNote() });
    }, 500);
  }

  onReject(): void {
    if (this.isSubmitting()) return;
    this.rejected.emit();
  }

  onClose(): void {
    this.closed.emit();
  }

  onQuoteNoteChange(value: string): void {
    this.quoteNote.set(value);
  }
}