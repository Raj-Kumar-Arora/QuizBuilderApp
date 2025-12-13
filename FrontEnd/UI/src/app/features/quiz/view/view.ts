import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz/quiz.model';

@Component({
  standalone: true,
  selector: 'app-quiz-view',
  imports: [RouterLink],
  templateUrl: './view.html'
})
export class ViewComponent implements OnInit {
  quiz?: Quiz;
  constructor(private route: ActivatedRoute, private quizService: QuizService) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.quizService.getById(id).subscribe(q => {
          this.quiz = q;
          console.log(this.quiz);
    });
  }
}
