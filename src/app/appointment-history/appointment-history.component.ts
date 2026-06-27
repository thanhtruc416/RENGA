import {
  ChangeDetectionStrategy, Component, computed,
  DestroyRef, inject, OnInit, signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CancelAppointmentModalComponent } from '../shared/components/modal/cancel-appointment-modal/cancel-appointment-modal.component';
import { environment } from '../../environments/environment';

interface Appointment {
  id: string;
  designer: string;
  designerThumb: string;
  date: string;
  timeStart: string;
  timeEnd?: string;
  status: 'upcoming' | 'done' | 'cancelled';
}

function mapStatus(raw: string): 'upcoming' | 'done' | 'cancelled' {
  if (raw === 'CANCELLED') return 'cancelled';
  if (raw === 'COMPLETED') return 'done';
  return 'upcoming';
}

function formatSlotDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatTime(t: string): string {
  return String(t).substring(0, 5);
}

const PAGE_SIZE = 3;

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CancelAppointmentModalComponent],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css',
})
export class AppointmentHistoryComponent implements OnInit {
  private readonly http       = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly activeTab      = signal<'sap-toi' | 'lich-su'>('sap-toi');
  readonly cancelModalOpen  = signal(false);
  readonly sketchPopupOpen  = signal(false);
  readonly isLoading        = signal(true);
  readonly loadError        = signal(false);

  readonly visibleCount = signal(PAGE_SIZE);

  private readonly allAppointments = signal<Appointment[]>([]);

  readonly upcomingAppointment = computed(() =>
    this.allAppointments().find(a => a.status === 'upcoming') ?? null
  );

  private readonly allHistory = computed(() =>
    this.allAppointments().filter(a => a.status !== 'upcoming')
  );

  readonly historyAppointments = computed(() =>
    this.allHistory().slice(0, this.visibleCount())
  );

  readonly hasMore = computed(() =>
    this.visibleCount() < this.allHistory().length
  );

  ngOnInit(): void {
    this.http.get<{ success: boolean; data: any[] }>(`${environment.apiUrl}/design/appointments`)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.allAppointments.set(res.data.map(r => ({
              id:           r.appointment_id,
              designer:     r.designer_name,
              designerThumb: r.designer_avatar ?? 'assets/images/designer-photo.png',
              date:         formatSlotDate(r.slot_date),
              timeStart:    formatTime(r.start_time),
              timeEnd:      formatTime(r.end_time),
              status:       mapStatus(r.appointment_status),
            })));
          } else {
            this.loadError.set(true);
          }
          this.isLoading.set(false);
        },
        error: () => { this.loadError.set(true); this.isLoading.set(false); },
      });
  }

  loadMore(): void {
    this.visibleCount.update(n => n + PAGE_SIZE);
  }

  setTab(tab: 'sap-toi' | 'lich-su'): void {
    this.activeTab.set(tab);
  }

  openCancel(): void  { this.cancelModalOpen.set(true); }
  closeCancel(): void { this.cancelModalOpen.set(false); }

  confirmCancel(reasons: string[]): void {
    const upcoming = this.upcomingAppointment();
    if (!upcoming) return;
    this.allAppointments.update(list =>
      list.map(a => a.id === upcoming.id ? { ...a, status: 'cancelled' as const } : a)
    );
    // modal tự đóng khi user bấm "Đóng" trên màn hình success → emits (closed)
  }
}