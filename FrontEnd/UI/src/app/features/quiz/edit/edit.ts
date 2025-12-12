import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../../services/quiz.service';
import { QuestionType } from '../../../models/question.model';

@Component({
  selector: 'app-quiz-edit',
  templateUrl: './edit.html',
  standalone: true
})
export class EditComponent  { }
//export class EditComponent implements OnInit {
//  quizId!: number;
//  QuestionType = QuestionType;
//  quizForm!: FormGroup;

//  constructor(private fb: FormBuilder, private route: ActivatedRoute, private quizService: QuizService, private router: Router)
//  {
//      this.quizForm = this.fb.group({
//        title: [''],
//        authorId: [0],
//        isPublished: [false],
//        questions: this.fb.array([])
//      });
//  }

//  ngOnInit(): void {
//    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
//    this.quizService.getById(this.quizId).subscribe(quiz => this.patchForm(quiz));
//  }

//  patchForm(quiz: any) {
//    this.quizForm.patchValue({
//      title: quiz.title,
//      authorId: quiz.authorId,
//      isPublished: !!quiz.isPublished
//    });

//    const qs = this.quizForm.get('questions') as FormArray;
//    qs.clear();

//    (quiz.questions || []).forEach((q: any) => {
//      const qg = this.fb.group({
//        id: [q.id],
//        text: [q.text],
//        type: [q.type],
//        answers: this.fb.array([])
//      });

//      (q.answers || []).forEach((a: any) => {
//        (qg.get('answers') as FormArray).push(this.fb.group({
//          id: [a.id],
//          text: [a.text],
//          isCorrect: [a.isCorrect]
//        }));
//      });

//      qs.push(qg);
//    });
//  }

//  get questions() { return this.quizForm.get('questions') as FormArray; }
//  getAnswers(qIndex: number) { return this.questions.at(qIndex).get('answers') as FormArray; }

//  addQuestion() {
//    this.questions.push(this.fb.group({
//      text: [''],
//      type: [QuestionType.None],
//      answers: this.fb.array([])
//    }));
//  }

//  addAnswer(qIndex: number) {
//    this.getAnswers(qIndex).push(this.fb.group({
//      text: [''],
//      isCorrect: [false]
//    }));
//  }

//  submit() {
//    if (this.quizForm.invalid) return;
//    const payload = {
//      ...this.quizForm.value,
//      questions: this.quizForm.value.questions.map((q: any) => ({
//        id: q.id,
//        text: q.text,
//        type: q.type,
//        quizId: this.quizId,
//        answers: q.answers.map((a: any) => ({ id: a.id, text: a.text, isCorrect: !!a.isCorrect }))
//      }))
//    };
//    this.quizService.update(this.quizId, payload).subscribe(() => this.router.navigate(['/quiz']));
//  }
//}
