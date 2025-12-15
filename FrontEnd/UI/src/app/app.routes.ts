import { Routes } from '@angular/router';

import { ListComponent } from './features/quiz/list/list';
import { CreateComponent } from './features/quiz/create/create';
import { EditComponent } from './features/quiz/edit/edit';
import { ViewComponent } from './features/quiz/view/view';

import { TakeQuizComponent } from './features/take-quiz/take-quiz';
import { LoginComponent } from './features/auth/login/login';
import { RegisterComponent } from './features/auth/register/register';

import { AuthGuard } from './shared/auth.guard';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  // default
  { path: '', component: HomeComponent  },

  // public – no auth
  // login/register functionality moved to Modal/Popup dialog
  // { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  { path: 'take/:code', component: TakeQuizComponent },

  // quiz (protected)
  { path: 'quiz/list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'quiz/create', component: CreateComponent, canActivate: [AuthGuard] },
  { path: 'quiz/edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'quiz/view/:id', component: ViewComponent, canActivate: [AuthGuard] },

  // fallback
  { path: '**', redirectTo: '' }
];

