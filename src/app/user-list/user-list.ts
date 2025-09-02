import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../user-service';
import { User } from '../user';
import { UserForm } from '../user-form/user-form';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterLink, MatDialogModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.css'],
})
export class UserList implements OnInit {
  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);

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
      next: (users) => (this.users = users),
      error: (error) => {
        this.hasError = true;
        this.errorMessage = `Error loading users: ${error.message}`;
      },
    });
  }

  openUserForm() {
    const dialogRef = this.dialog.open(UserForm, {
      width: '500px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.componentInstance.userAdded.subscribe((newUser: User) => {
      this.users.push(newUser); // add new user
    });
  }
}
