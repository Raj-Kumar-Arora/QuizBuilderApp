import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { Quiz } from '../../models/quiz/quiz.model';
import { CommonModule } from '@angular/common';
import { QuizResult } from '../../models/quiz-take.model';

@Component({
  standalone: true,
  selector: 'app-take-quiz',
  imports: [CommonModule],
  templateUrl: './take-quiz.html'
})
export class TakeQuizComponent implements OnInit {
  quiz?: Quiz;
  result?: QuizResult;
  submitted = false;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) { }

  ngOnInit() {
    const code = this.route.snapshot.paramMap.get('code')!;
    this.quizService.getByPermalink(code).subscribe(q => {
      this.quiz = q;
      // Initialize selected property for each answer
      this.quiz.questions.forEach(question => {
        question.answers.forEach(answer => {
          answer.selected = false;
        });
      });
    });
  }

  submitQuiz() {
    const payload = {
      answers: this.quiz?.questions.map(q => ({
        questionId: q.id,
        selectedAnswerIds: q.answers
          .filter(a => a.selected)
          .map(a => a.id)
      }))
    };

    this.quizService.submitQuiz(this.quiz!.id!, payload).subscribe({
      next: res => {
        this.result = res;
        this.submitted = true;
      },
      error: err => alert('Submission failed')
    });
  }

  toggleAnswer(question: any, answer: any) {
    answer.selected = !answer.selected;
  }

  isAnswerCorrect(questionId: number, answerId: number): boolean {
    const questionResult = this.result?.questionResults.find(r => r.questionId === questionId);
    if (questionResult) {
      return questionResult.correctAnswerIds.includes(answerId);
    }
    return false;
  }

  isAnswerWrong(questionId: number, answerId: number): boolean {
    const questionResult = this.result?.questionResults.find(r => r.questionId === questionId);
    if (questionResult) {
      return !questionResult.correctAnswerIds.includes(answerId);
    }
    return false;
  }

}

