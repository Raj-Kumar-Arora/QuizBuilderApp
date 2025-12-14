import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormArray, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { QuestionType } from '../../../models/quiz/question.model';

@Component({
  selector: 'app-quiz-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit.html'
})
export class EditComponent implements OnInit {
  QuestionType = QuestionType;
  quizId!: number;
  importing = false;
  message = '';

  quizForm!: FormGroup;
  importForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      authorId: [{ value: 1, disabled: true }],
      isPublished: [false],
      questions: this.fb.array([])
    });

    this.importForm = this.fb.group({
      noOfQuestions: [3, [Validators.required, Validators.min(1)]],
      type: ['multiple']
    });
  }

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuiz();
  }

  loadQuiz() {
    this.quizService.getById(this.quizId).subscribe(q => this.patchForm(q));
  }
  //ToDo - patchForm ??
  patchForm(q: any): void {
    this.quizForm.patchValue({
      title: q.title,
      authorId: q.authorId,
      isPublished: !!q.isPublished
    });

    const qs = this.quizForm.get('questions') as FormArray;
    qs.clear();

    (q.questions || []).forEach((qq: any) => {
      const qg = this.fb.group({
        id: [qq.id],
        text: [qq.text],
        type: [qq.type],
        answers: this.fb.array([])
      });

      (qq.answers || []).forEach((aa: any) => {
        (qg.get('answers') as FormArray).push(this.fb.group({
          id: [aa.id],
          text: [aa.text],
          isCorrect: [aa.isCorrect]
        }));
      });

      qs.push(qg);
    });
  }

  // helpers (same as create)
  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.fb.group({
      text: [''],
      type: [QuestionType.MultipleChoice],
      answers: this.fb.array([])
    }));
  }

  removeQuestion(index: number): void {
    this.questions.removeAt(index);
  }

  getAnswers(qIndex: number): FormArray {
    return (this.questions.at(qIndex).get('answers') as FormArray);
  }

  addAnswer(qIndex: number): void {
    this.getAnswers(qIndex).push(this.fb.group({
      text: [''],
      isCorrect: [false]
    }));
  }

  removeAnswer(qIndex: number, aIndex: number): void {
    this.getAnswers(qIndex).removeAt(aIndex);
  }

  submit(): void {
    if (this.quizForm.invalid) {
      this.quizForm.markAllAsTouched();
      return;
    }

    const payload = {
      title: this.quizForm.value.title,
      authorId: this.quizForm.value.authorId,
      isPublished: this.quizForm.value.isPublished,
      questions: this.quizForm.value.questions.map((qq: any) => ({
        id: qq.id,
        text: qq.text,
        type: qq.type,
        quizId: this.quizId,
        answers: (qq.answers || []).map((aa: any) => ({ id: aa.id, text: aa.text, isCorrect: !!aa.isCorrect }))
      }))
    };

    this.quizService.update(this.quizId, payload).subscribe({
      next: () => this.router.navigate(['/quiz']),
      error: err => alert('Update failed: ' + (err?.message ?? err))
    });
  }

  importQuestions() {
    if (this.importForm.invalid) return;

    this.importing = true;
    this.message = '';

    this.quizService.importQuestions(
      this.quizId,
      this.importForm.value as any
    ).subscribe({
      next: (res: any) => {
        this.message = `✅ ${res.imported} questions imported`;
        this.importing = false;
        this.loadQuiz(); // refresh questions
      },
      error: () => {
        this.message = '❌ Import failed';
        this.importing = false;
      }
    });
  }
}
