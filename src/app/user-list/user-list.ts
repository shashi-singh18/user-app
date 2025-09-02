import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../user-service';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
  ],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);

  users: User[] = [];
  hasError = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.hasError = false;
    this.errorMessage = null;

    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.hasError = true;
        this.errorMessage = `Error loading users: ${error.message}`;
      },
    });
  }
}
