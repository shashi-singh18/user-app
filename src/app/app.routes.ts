//app-route.ts:
import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list'; 
import { UserLogin } from './user-login/user-login';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default to login
  { path: 'login', component: UserLogin },      
  { path: 'users', component: UserList }   
];
