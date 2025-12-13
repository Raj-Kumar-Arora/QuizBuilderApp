import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  form!: FormGroup;

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
    console.log('LOGIN FORM VALUE 👉', this.form.value);
    if (this.form.invalid) return;

    console.log('navigating to auth service.login')
    this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/quiz/list']),
      error: err => alert(err?.error?.message ?? 'Login failed')
    });
  }
}
