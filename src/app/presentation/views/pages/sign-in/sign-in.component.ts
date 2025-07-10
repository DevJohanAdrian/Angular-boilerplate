import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SignInData } from '../../models/sign-in.data.model';

@Component({
  selector: 'app-sign-in',
  imports: [ CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent { 

// Form data model
  signInData: SignInData = {
    email: '',
    password: '',
    rememberMe: false
  };

   // Component state
  showPassword = false;
  isLoading = false;
  showDebugInfo = false;

  constructor(private snackBar: MatSnackBar) {}

  // Template Driven Form Submit Handler
  onSubmit(form: any) {
    console.log('Form submitted!');
    console.log('Form valid:', form.valid);
    console.log('Form value:', form.value);
    console.log('Sign in data:', this.signInData);

    if (form.valid) {
      this.isLoading = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        
        // Show success message
        this.snackBar.open('¡Sign in successful!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        
        // Reset form after successful submission
        this.resetForm(form);
        
      }, 2000);
    } else {
      // Show validation errors
      this.snackBar.open('Please fix the form errors before submitting', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
    }
  }

  // Reset form method
  resetForm(form: any) {
    form.resetForm();
    this.signInData = {
      email: '',
      password: '',
      rememberMe: false
    };
    this.showPassword = false;
  }

}







