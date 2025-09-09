import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
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
onRoleChange(event: Event) {
  const input = event.target as HTMLInputElement;
  const roles = this.form.value.roles as string[];

  if (input.checked) {
    if (!roles.includes(input.value)) {
      roles.push(input.value);
    }
  } else {
    const index = roles.indexOf(input.value);
    if (index >= 0) roles.splice(index, 1);
  }

  // update the form control value
  this.form.controls['roles'].setValue(roles);
  this.form.controls['roles'].updateValueAndValidity();
}

  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  @Output() userAdded = new EventEmitter<User>();  

  rolesOptions = ['ADMIN', 'SUPERUSER', 'USER', 'READ_ONLY']; 

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: ['', Validators.required],
    password: ['', Validators.required],
    roles: new FormControl<string[]>([], Validators.required)
  });

  onSubmit() {
    if (this.form.valid) {
      const requestPayload = {
        ...this.form.value,
      };

      this.userService.createUser(requestPayload as any).subscribe({
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
