import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  quizUrl = '';

  constructor(private router: Router) {}

  openQuiz() {
    if (!this.quizUrl) return;

    // supports full URL or just code
    const code = this.quizUrl.split('/').pop();
    this.router.navigate(['/take', code]);
  }
}

