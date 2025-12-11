import { Question } from './question.model';
export interface Quiz {
  id?: number;
  title: string;
  authorId: number;
  isPublished: boolean;
  questions: Question[];
}
