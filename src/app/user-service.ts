import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  // private apiUrl = 'https://valued-cumulus-466712-a0.wn.r.appspot.com/api/users';
  private apiUrl = 'http://localhost:8080/api/users';

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  } 

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user); 
  }
}
