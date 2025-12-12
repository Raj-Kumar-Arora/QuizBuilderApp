import { Component } from '@angular/core';
import { FormBuilder, FormArray, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { QuizService } from '../../../services/quiz.service';
import { QuestionType } from '../../../models/question.model';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  templateUrl: './create.html',
  styleUrls: ['./create.css'],
  imports: [
    CommonModule,          // <-- REQUIRED for *ngFor, *ngIf
    ReactiveFormsModule    // <-- REQUIRED for formGroup, formControl, formArray
  ]
})
export class CreateComponent {
  QuestionType = QuestionType;
  quizForm! : FormGroup

  constructor(private fb: FormBuilder, private quizService: QuizService, private router: Router)
  {
      this.quizForm = this.fb.group({
        title: ['', Validators.required],
        authorId: [0, Validators.required],
        isPublished: [false],
        questions: this.fb.array([])
      });
  }

  get questions() {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion() {
    this.questions.push(
      this.fb.group({
        text: ['', Validators.required],
        type: [QuestionType.SingleChoice, Validators.required],
        answers: this.fb.array([])
      })
    );
  }

  submit() {
    if (this.quizForm.invalid) return;
    this.quizService.create(this.quizForm.value).subscribe(() => {
      this.router.navigate(['/quiz']);
    });
  }
}
