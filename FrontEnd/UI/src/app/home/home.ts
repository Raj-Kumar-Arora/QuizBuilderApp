import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent {
  quizUrl = '';
  error = '';

  constructor(private router: Router, private quizService:QuizService) {  }

  openQuiz() {
    if (!this.quizUrl) {
      this.error = 'Invalid Quiz URL !';
      return;
    }

    // supports full URL or just code
    const code = this.quizUrl.split('/').pop();
    if (!code) { alert('Invalid code'); return; }
    this.quizService.getByPermalink(code).subscribe({
      next: () => {
        this.router.navigate(['/take', code]);
      },
      error: () => {
        this.error =  'Invalid Quiz URL !';
      }
    });
  }
}
