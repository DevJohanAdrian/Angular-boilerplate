import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SignUpData } from '@presentation/views/models/sign-up.data.model';

import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// Custom validator for password confirmation
export function passwordMatchValidator(
  control: AbstractControl,
): { [key: string]: any } | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');

  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'sign-up-form',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpFormComponent implements OnInit {
  // Component state
  signUpForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  showDebugInfo = false;

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validators: passwordMatchValidator, // Custom validator at form level
      },
    );
  }


   // Reactive Form Submit Handler
  onSubmit() {
    console.log('Sign Up Form submitted!');
    console.log('Form valid:', this.signUpForm.valid);
    console.log('Form errors:', this.signUpForm.errors);
    console.log('Form value:', this.signUpForm.value);
    console.log('Form status:', this.signUpForm.status);



    if (this.signUpForm.valid) {
      this.isLoading = true;

      // Simulate API call (change to a real API call)
      setTimeout(() => {
        this.isLoading = false;

        // Show success message
        this.snackBar.open('¡Account created successfully! Welcome aboard!', 'Close', {
          duration: 4000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });

        // Reset form after successful submission
        this.resetForm();

      }, 2500);
    } else {
      // Show validation errors
      let errorMessage = 'Please fix the form errors before submitting';

      // if (this.signUpData.password !== this.signUpData.confirmPassword) {
      //   errorMessage = 'Passwords do not match';
      // }

      if (this.signUpForm.hasError('passwordMismatch')) {
        errorMessage = 'Passwords do not match';
      }

      this.snackBar.open(errorMessage, 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  // Reset form method
  resetForm() {
    this.signUpForm.reset();
     this.showPassword = false;
    this.showConfirmPassword = false;
    
    // // Reset form to initial state
    // this.initForm();
  }
}
