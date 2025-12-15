import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.html'
})
export class RegisterComponent {
  form!: FormGroup;
  loading = false;
  error = '';

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
      //alert('Registration failed. Please check field values submitted.');
      this.error = 'Registration failed. Please check field values submitted.';
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
      error: err => alert(err?.error?.message ?? 'Registration failed')
    });
  }
}
