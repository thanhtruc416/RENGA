import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CancelAppointmentModalComponent } from '../shared/components/modal/cancel-appointment-modal/cancel-appointment-modal.component';

interface Appointment {
  id: string;
  designer: string;
  designerThumb: string;
  date: string;
  timeStart: string;
  timeEnd?: string;
  location?: string;
  status: 'upcoming' | 'done' | 'cancelled';
}

@Component({
  selector: 'app-appointment-history',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, CancelAppointmentModalComponent],
  templateUrl: './appointment-history.component.html',
  styleUrl: './appointment-history.component.css',
})
export class AppointmentHistoryComponent {
  readonly activeTab = signal<'sap-toi' | 'lich-su'>('sap-toi');
  readonly cancelModalOpen = signal(false);

  readonly upcomingAppointment: Appointment = {
    id: 'APT-2026-001',
    designer: 'Master Henri de Luca',
    designerThumb: 'https://www.figma.com/api/mcp/asset/d331c70c-a7eb-4fd4-925e-5103568cd8f0',
    date: '24 Tháng 10, 2026',
    timeStart: '14:30',
    timeEnd: '15:30',
    location: 'Phòng VIP Heritage, Flagship Store',
    status: 'upcoming',
  };

  readonly historyAppointments: Appointment[] = [
    {
      id: 'APT-2026-034',
      designer: 'Elena Vance',
      designerThumb: 'https://www.figma.com/api/mcp/asset/3fbcec17-e28e-4a1b-be69-0bbff5ae980c',
      date: '15 Tháng 9, 2026',
      timeStart: '10:00',
      status: 'done',
    },
    {
      id: 'APT-2026-021',
      designer: 'Isabella Moretti',
      designerThumb: 'https://www.figma.com/api/mcp/asset/b4caeee8-a646-4e0f-bed4-5c2f36e7c974',
      date: '02 Tháng 8, 2026',
      timeStart: '16:30',
      status: 'cancelled',
    },
  ];

  setTab(tab: 'sap-toi' | 'lich-su'): void {
    this.activeTab.set(tab);
  }

  openCancel(): void {
    this.cancelModalOpen.set(true);
  }

  closeCancel(): void {
    this.cancelModalOpen.set(false);
  }

  confirmCancel(reasons: string[]): void {
    // TODO: gọi API hủy lịch
    console.log('Hủy lịch với lý do:', reasons);
    this.closeCancel();
  }
}
