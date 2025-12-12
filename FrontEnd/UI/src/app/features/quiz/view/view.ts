import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { Quiz } from '../../../models/quiz.model';

@Component({
  selector: 'app-quiz-view',
  templateUrl: './view.html',
  standalone: true
})
export class ViewComponent implements OnInit {
  quiz?: Quiz;
  constructor(private route: ActivatedRoute, private svc: QuizService) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.svc.getById(id).subscribe(q => this.quiz = q);
  }
}
