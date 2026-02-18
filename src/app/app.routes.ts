import { Routes } from '@angular/router';
import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
//caminho e o componente
export const routes: Routes = [
  { path: 'register', component: Register },
  { path: 'login', component: Login },
];
