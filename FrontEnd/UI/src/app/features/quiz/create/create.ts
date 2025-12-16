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
  //importing = false;
  //message = '';
  error = '';

  quizForm! : FormGroup;
  //importForm!: FormGroup;

  constructor(private fb: FormBuilder, private quizService: QuizService, private router: Router)
  {
      this.quizForm = this.fb.group({
        title: ['', Validators.required],
        questions: this.fb.array([])
      });


      //ToDo - Import  To be added later
  //    this.importForm = this.fb.group({
  //      noOfQuestions: [3, [Validators.required, Validators.min(1)]],
  //      type: ['multiple']
  //    });
  //}

  //   loadQuiz() {
  //   this.quizService.getById(this.quizId).subscribe(q => this.patchForm(q));
  // }
  //ToDo - patchForm ??
  //patchForm(q: any): void {
  //  this.quizForm.patchValue({
  //    title: q.title,
  //    authorId: q.authorId,
  //    isPublished: !!q.isPublished
  //  });

  //  const qs = this.quizForm.get('questions') as FormArray;
  //  qs.clear();

  //  (q.questions || []).forEach((qq: any) => {
  //    const qg = this.fb.group({
  //      id: [qq.id],
  //      text: [qq.text],
  //      type: [qq.type],
  //      answers: this.fb.array([])
  //    });

  //    (qq.answers || []).forEach((aa: any) => {
  //      (qg.get('answers') as FormArray).push(this.fb.group({
  //        id: [aa.id],
  //        text: [aa.text],
  //        isCorrect: [aa.isCorrect]
  //      }));
  //    });

  //    qs.push(qg);
  //  });
  }

  // helpers for questions and answers
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    const q = this.fb.group({
      text: ['', Validators.required],
      questionType: [0],
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
      this.error = 'Invalid data entered!';
      //ToDo
      this.quizForm.markAllAsTouched();
      return;
    }

    const questions = this.quizForm.value.questions;
    const invalidQuestion = questions.length < 1 || questions.length > 10
    const invalidAnswer = questions.find((q: any) =>
      !q.answers || q.answers.length < 1 || q.answers.length > 5
    );
    if (invalidQuestion) {
      this.error = 'No of Questions should be between 1 - 10 !';
      return;
    }
    if (invalidAnswer) {
      this.error = 'No of Answers should be between 1 - 5 !';
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
      error: (err) => this.error = 'Create failed: ' + (err?.error ?? err)
    });
  }

  //ToDo - Import  To be added later
  //  importQuestions() {
  //  if (this.importForm.invalid) return;

  //  this.importing = true;
  //  this.message = '';

  //  this.quizService.importQuestions(
  //    null,
  //    this.importForm.value as any
  //  ).subscribe({
  //    next: (res: any) => {
  //      this.message = `✅ ${res.imported} questions imported`;
  //      this.importing = false;
  //      //this.loadQuiz(); // refresh questions
  //    },
  //    error: () => {
  //      this.message = '❌ Import failed';
  //      this.importing = false;
  //    }
  //  });
  //}
}
