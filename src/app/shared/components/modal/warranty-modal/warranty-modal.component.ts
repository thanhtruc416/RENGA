import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-warranty-modal',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './warranty-modal.component.html',
  styleUrl: './warranty-modal.component.css',
})
export class WarrantyModalComponent {}
