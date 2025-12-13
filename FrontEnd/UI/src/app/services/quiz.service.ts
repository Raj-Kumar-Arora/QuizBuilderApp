import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz/quiz.model';
import { PublishResponse } from '../models/quiz/publish-response.model';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = 'https://localhost:7175/api/quiz';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(this.apiUrl);
  }

  getById(id: number): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/${id}`);
  }

  create(quiz: any): Observable<Quiz> {
    // ensure we don't send id (backend will generate it)
    const payload = { ...quiz } as any;

    //ToDo : delete ??
    delete payload.id;
    return this.http.post<Quiz>(this.apiUrl, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  update(id: number, quiz: any): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.apiUrl}/${id}`, quiz);
  }

  publish(id: number) {
    return this.http.put<PublishResponse>(`${this.apiUrl}/${id}/publish`, {});
  }
  getByPermalink(code: string): Observable<Quiz> {
    return this.http.get<Quiz>(`${this.apiUrl}/public/${code}`);
  }
}
