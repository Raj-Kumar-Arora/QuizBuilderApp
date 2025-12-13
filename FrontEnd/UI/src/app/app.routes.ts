import { Routes } from '@angular/router';

import { ListComponent } from './features/quiz/list/list';
import { CreateComponent } from './features/quiz/create/create';
import { EditComponent } from './features/quiz/edit/edit';
import { ViewComponent } from './features/quiz/view/view';

import { TakeQuizComponent } from './features/take-quiz/take-quiz';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';

import { AuthGuard } from './shared/auth.guard';

export const routes: Routes = [
  //{ path: '', redirectTo: 'quiz', pathMatch: 'full' },

  // default
  { path: '', redirectTo: 'quiz/list', pathMatch: 'full' },

  // auth (public)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // quiz (protected)
  { path: 'quiz/list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'quiz/create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'quiz/edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'quiz/view/:id', component: ViewComponent, canActivate: [AuthGuard] },

  // take quiz (public – no auth)
  { path: 'take/:code', component: TakeQuizComponent },

  // fallback
  { path: '**', redirectTo: 'quiz/list' }
];

