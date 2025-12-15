export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  questionId: number;
  isCorrect: boolean;
  correctAnswerIds: number[];
}
