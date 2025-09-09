//user-service.ts:
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  // private apiUrl = 'https://valued-cumulus-466712-a0.wn.r.appspot.com/api/users';
  private apiUrl = 'http://localhost:8080/api/user';

  getUsers(): Observable<User[]> {
  return this.http.get<{ message: string; data: User[]; statusCode: number }>(this.apiUrl)
    .pipe(
      map(response => response.data)
    );
  } 

  createUser(user: User): Observable<User> {
  return this.http.post<{ message: string; data: User; statusCode: number }>(this.apiUrl, user)
    .pipe(
      map(response => response.data) // extract the 'data' object
    );
  }
}
