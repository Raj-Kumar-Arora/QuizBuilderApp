//import { Component } from '@angular/core';
//import { FormArray, FormBuilder, Validators } from '@angular/forms';
//import { QuizService } from '../../../services/quiz.service';

//@Component({
//  selector: 'app-quiz-create',
//  templateUrl: './create.html',
//})
//export class QuizCreateComponent {

//  constructor(private fb: FormBuilder, private quizService: QuizService) { }

//  quizForm = this.fb.group({
//    title: ['', Validators.required],
//    authorId: [1, Validators.required],
//    questions: this.fb.array([])
//  });

//  get questions() {
//    return this.quizForm.get('questions') as FormArray;
//  }

//  addQuestion() {
//    const question = this.fb.group({
//      text: ['', Validators.required],
//      type: [0, Validators.required],
//      answers: this.fb.array([])
//    });
//    this.questions.push(question);
//  }

//  getAnswers(questionIndex: number): FormArray {
//    return this.questions.at(questionIndex).get('answers') as FormArray;
//  }

//  addAnswer(questionIndex: number) {
//    const answer = this.fb.group({
//      text: ['', Validators.required],
//      isCorrect: [false]
//    });
//    this.getAnswers(questionIndex).push(answer);
//  }

//  submit() {
//    if (this.quizForm.invalid) return;

//    this.quizService.create(this.quizForm.value).subscribe({
//      next: () => alert('Quiz created successfully')
//    });
//  }
//}

