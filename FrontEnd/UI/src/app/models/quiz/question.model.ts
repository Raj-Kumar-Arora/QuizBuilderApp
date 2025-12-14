import { Answer } from "./answer.model";

export enum QuestionType {
  None = 0,
  MultipleChoice = 1,
  TrueFalse = 2
}

export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  quizId: number;
  quizName: string;
  answers: Answer[];
}
