import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-user-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.css'
})
export class UserLogin {
  private http = inject(HttpClient);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);

  form = this.fb.group({
    email: [''],
    password: ['']
  });

  login() {
    this.http.post<any>('http://localhost:8080/api/auth/login', this.form.value).subscribe({
      next: (res) => {
        this.authService.setToken(res.data.token); // backend returns token in AuthResponse
        alert('Login successful');
      },
      error: (err) => {
        console.error(err);
        alert('Login failed');
      }
    });
  }
}
