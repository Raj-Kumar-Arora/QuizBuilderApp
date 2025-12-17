import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  form!: FormGroup;
  loading = false;
  error : string  | null = null;
  @Output() loggedIn = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }


  submit() {
    if (this.form.invalid) {
      this.showError ('Invalid username or password !');
      return;
    }

    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        console.log('Login successful, navigating to QUIZ LIST');
        // window.location.reload();
        this.loggedIn.emit(); // notify parent modal
        this.router.navigate(['/quiz/list']);
      },
      error: err => {
        if (err.status === 401) {
          this.showError ('Invalid username or password!');
        } else {
          this.showError ('Not able to connect with Quiz Service/Backend !');
        }
      }
    });
  }

  showError(msg: string) {
     this.error = msg;
     setTimeout(() => { this.error = null; }, 1500);
  }
}
