import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModalComponent } from '../../features/auth/auth-modal/auth-modal';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, AuthModalComponent],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  showAuthModal = false;
  mode: 'login' | 'register' = 'login';

  constructor(public auth: AuthService, private router: Router) {}

    openLogin() {
    this.mode = 'login';
    this.showAuthModal = true;
  }

  openRegister() {
    this.mode = 'register';
    this.showAuthModal = true;
  }

  logout() {
     this.auth.logout();
    this.router.navigate(['/']);
  }
  
  confirmLogout() {
  const result = confirm("Are you sure you want to logout?");
  if (result) {
    this.logout(); // proceed with logout
  }
}

}

