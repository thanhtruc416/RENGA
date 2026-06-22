import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  OnInit,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment-fail-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  templateUrl: './payment-fail-modal.component.html',
  styleUrl: './payment-fail-modal.component.css',
})
export class PaymentFailModalComponent implements OnInit {
  isOpen  = input<boolean>(false);
  isGuest = input<boolean>(false);
  closed  = output<void>();

  private readonly destroyRef = inject(DestroyRef);
  private readonly secondsLeft = signal(3600);

  readonly countdownDisplay = computed(() => {
    const s = this.secondsLeft();
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return [h, m, sec].map(v => String(v).padStart(2, '0')).join(':');
  });

  ngOnInit(): void {
    const id = setInterval(() => {
      const cur = this.secondsLeft();
      if (cur <= 0) { clearInterval(id); return; }
      this.secondsLeft.set(cur - 1);
    }, 1000);

    this.destroyRef.onDestroy(() => clearInterval(id));
  }

  close(): void { this.closed.emit(); }
}
