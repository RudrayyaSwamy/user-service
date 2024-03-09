import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-custom-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-alert.component.html',
  styleUrl: './custom-alert.component.scss'
})
export class CustomAlertComponent implements OnInit {
  @Input() message: string;
  @Input() type: 'success' | 'error' = 'success';
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }

  ngOnInit(): void {
    // Automatically close the alert after 15 seconds
    setTimeout(() => {
      this.onClose();
    }, 5000); // 15 seconds in milliseconds
  }
}
