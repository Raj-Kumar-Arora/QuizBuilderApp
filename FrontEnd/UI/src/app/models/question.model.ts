import { Answer } from "./answer.model";

export enum QuestionType {
  None = 0,
  SingleChoice = 1,
  MultipleChoice = 2,
  Other = 3
}

export interface Question {
  id?: number;
  text: string;
  type: QuestionType;
  quizId: number;
  quizName: string;
  answers: Answer[];
}
