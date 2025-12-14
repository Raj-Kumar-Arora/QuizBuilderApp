import { Component, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,           // <-- REQUIRED for standalone apps
  imports: [RouterOutlet],    // <-- RouterOutlet must be imported here
  templateUrl: './app.html',
  styleUrls: ['./app.css']    // <-- use plural (recommended)
})
export class AppComponent{
  title = signal('QUIZ BUILDER APP');       // signal works correctly now

    constructor(
      private authService: AuthService,
      private router: Router
    ) {}

    isLoggedIn() {
      return this.authService.isLoggedIn();
    }

    logout() {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
}

