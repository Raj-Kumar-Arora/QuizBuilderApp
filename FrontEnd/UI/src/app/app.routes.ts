import { Routes } from '@angular/router';
import { ListComponent } from './features/quiz/list/list';
import { CreateComponent } from './features/quiz/create/create';
import { EditComponent } from './features/quiz/edit/edit';
import { ViewComponent } from './features/quiz/view/view';
import { TakeQuizComponent } from './features/take-quiz/take-quiz';

export const routes: Routes = [
  { path: '', redirectTo: 'quiz', pathMatch: 'full' },
  { path: 'quiz/list', component: ListComponent },
  { path: 'quiz/create', component: CreateComponent },
  { path: 'quiz/edit/:id', component: EditComponent },
  { path: 'quiz/view/:id', component: ViewComponent },
  { path: 'take/:code', component: TakeQuizComponent },
  { path: '**', redirectTo: 'quiz/list' },
];

