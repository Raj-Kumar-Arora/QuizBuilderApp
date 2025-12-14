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
  loading = false;
  error = '';

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
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: (res: any) => {
        //console.log('Login successful', res);
        this.router.navigate(['/quiz/list']);
      },
      error: err => {
        if (err.status === 401) {
          this.error = 'Invalid username or password';
        } else {
          this.error = 'Something went wrong.';
        }
      }
    });
  }
}
