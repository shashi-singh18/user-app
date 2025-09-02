import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user-service';
import { User } from '../user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css']
})
export class UserForm {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Output() userAdded = new EventEmitter<User>();  

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: ['', Validators.required]
  });

  onSubmit() {
    if (this.form.valid) {
      this.userService.createUser(this.form.value as unknown as User).subscribe({
        next: (newUser) => {
          this.userAdded.emit(newUser); 
          this.form.reset();
        },
        error: (err) => {
          console.error('Error adding user:', err);
        }
      });
    }
  }
}
