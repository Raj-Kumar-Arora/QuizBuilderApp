import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login';
import { RegisterComponent } from '../register/register';

@Component({
  selector: 'app-auth-modal',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './auth-modal.html',
  styleUrls: ['./auth-modal.css']
})
export class AuthModalComponent {
  @Input() mode: 'login' | 'register' = 'login';
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  // ESC key support
  @HostListener('document:keydown.escape')
  onEsc() {
    this.closeModal();
  }
}
