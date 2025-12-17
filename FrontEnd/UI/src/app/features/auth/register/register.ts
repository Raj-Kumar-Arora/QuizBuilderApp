import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  error : string  | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
      this.form = this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  submit() {
    if (this.form.invalid) {
      this.showError ('Registration failed. Please check field values submitted!');
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.register(this.form.value).subscribe({
      next: () => {
        window.location.reload();
        //alert('Registration successful. Please login.');
        this.loading = true
        this.router.navigate(['/login']);
      },
      error: err => this.showError (err?.error?.message ?? 'Registration failed')
    });
  }

  showError(msg: string) {
     this.error = msg;
     setTimeout(() => { this.error = null; }, 1500);
  }
}
