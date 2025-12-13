import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { QuestionType } from '../../../models/quiz/question.model';

@Component({
  selector: 'app-quiz-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './create.html'
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

  // helpers for questions and answers
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const q = this.fb.group({
      text: ['', Validators.required],
      type: [QuestionType.SingleChoice, Validators.required],
      answers: this.fb.array([])
    });
    this.questions.push(q);
  }

  removeQuestion(index: number): void {
    if (index >= 0 && index < this.questions.length) {
      this.questions.removeAt(index);
    }
  }

  // answer helpers
  getAnswers(questionIndex: number): FormArray {
    const q = this.questions.at(questionIndex);
    return q.get('answers') as FormArray;
  }

  addAnswer(questionIndex: number): void {
    const answers = this.getAnswers(questionIndex);
    answers.push(this.fb.group({
      text: ['', Validators.required],
      isCorrect: [false]
    }));
  }

  removeAnswer(questionIndex: number, answerIndex: number): void {
    const answers = this.getAnswers(questionIndex);
    if (answerIndex >= 0 && answerIndex < answers.length) {
      answers.removeAt(answerIndex);
    }
  }

  submit(): void {
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.quizForm.value.title,
      authorId: this.quizForm.value.authorId,
      isPublished: !!this.quizForm.value.isPublished,
      questions: (this.quizForm.value.questions || []).map((q: any) => ({
        text: q.text,
        type: q.type,
        answers: (q.answers || []).map((a: any) => ({ text: a.text, isCorrect: !!a.isCorrect }))
      }))
    };

    this.quizService.create(payload).subscribe({
      next: () => this.router.navigate(['/quiz']),
      error: (err) => alert('Create failed: ' + (err?.message ?? err))
    });
  }
}
