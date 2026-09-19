import { Component,inject } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { Router } from '@angular/router';


import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule, MatCheckboxModule],
  selector: 'app-login',
  standalone: true,
  styleUrl: './login.scss',
  templateUrl: './login.html',
})
export class LoginComponent {
 private fb = inject(FormBuilder);
  private router = inject(Router);
    private snackBar = inject(MatSnackBar);

  hidePassword = true;

  // Temporary login credentials
  private readonly validUsername = 'admin';
  private readonly validPassword = 'Admin@123';


  loginForm = this.fb.group({

    username: [
      '',
      Validators.required
    ],

    password: [
      '',
      [
        Validators.required,
        Validators.minLength(6)
      ]
    ],

    rememberMe: [false]

  });

login(): void {

  if (this.loginForm.invalid) {

    this.loginForm.markAllAsTouched();

    this.snackBar.open(
      'Please enter username and password',
      'X',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['warning-snackbar']
      }
    );

    return;
  }

  const { username, password } = this.loginForm.value;


  // Check credentials

  if (
    username === this.validUsername &&
    password === this.validPassword
  ) {

    this.snackBar.open(
      'Login successful',
      'X',
      {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']  
      }
    );

    // Navigate after showing success message

    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 500);

  } else {

    this.snackBar.open(
      'Invalid username or password',
      'X',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      }
    );

  }
}

}
