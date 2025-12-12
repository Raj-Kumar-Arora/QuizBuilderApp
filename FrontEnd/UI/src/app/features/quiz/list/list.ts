import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './list.html'
})
export class ListComponent implements OnInit {
  quizzes: Quiz[] = [];
  loading = false;
  error = '';

  constructor(private svc: QuizService, private router: Router) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.loading = true;
    console.log('1 - Quiz list loading...');
    this.svc.getAll().subscribe({
      next: (data) => { this.quizzes = data; this.loading = false; },
      error: (err) => { this.error = err?.message ?? 'Load failed'; this.loading = false; }
    });
  }

  create() { this.router.navigate(['/quiz/create']); }
  view(id?: number) { if (id) this.router.navigate(['/quiz/view', id]); }
  edit(id?: number) { if (id) this.router.navigate(['/quiz/edit', id]); }

  delete(id?: number) {
    if (!id) return;
    if (!confirm('Delete this quiz?')) return;
    this.svc.delete(id).subscribe({
      next: () => this.load(),
      error: (err) => alert('Delete failed: ' + (err?.message ?? err))
    });
  }
}
