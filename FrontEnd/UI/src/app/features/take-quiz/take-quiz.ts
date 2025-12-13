import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz/quiz.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-take-quiz',
  imports: [CommonModule],
  templateUrl: './take-quiz.html'
})
export class TakeQuizComponent implements OnInit {
  quiz?: Quiz;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code')!;
    this.quizService.getByPermalink(code).subscribe(q => (this.quiz = q));
  }
}

