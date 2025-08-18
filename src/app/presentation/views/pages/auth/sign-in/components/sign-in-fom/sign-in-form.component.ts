import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { SignInData } from '@presentation/views/models/sign-in.data.model';
import { SignInController } from '@presentation/controllers/sign-in.controller';

@Component({
  selector: 'sign-in-form',
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './sign-in-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SignInController],
})
export class SignInFormComponent {
  // Form data model
  signInData: SignInData = {
    email: '',
    password: '',
    rememberMe: false,
  };

  // Component state
  showPassword = false;
  isLoading = false;
  showDebugInfo = false;

  constructor(
    private snackBar: MatSnackBar,
    private readonly signInController: SignInController,
  ) {}

  // Template Driven Form Submit Handler
  onSubmit(form: any) {
    console.log('Form submitted!');
    console.log('Form valid:', form.valid);
    console.log('Form value:', form.value);
    console.log('Sign in data:', this.signInData);

    if (form.invalid) {
      // Show validation errors
      this.snackBar.open(
        'Please fix the form errors before submitting',
        'Close',
        {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['error-snackbar'],
        },
      );

      return;
    }

    // // Simulate API call
    // setTimeout(() => {
    //   this.isLoading = false;

    //   // Show success message
    //   this.snackBar.open('¡Sign in successful!', 'Close', {
    //     duration: 3000,
    //     horizontalPosition: 'center',
    //     verticalPosition: 'top',
    //     panelClass: ['success-snackbar']
    //   });

    //      // Reset form after successful submission
    //   this.resetForm(form);

    // }, 2000);

    this.isLoading = true;
    const { email, password, rememberMe } = form.value;


    this.signInController.signIn(email, password).subscribe({
      next: (user) => {
        console.log('Usuario autenticado:', user);
        this.isLoading = false;
        // 👇 Aquí podrías navegar al dashboard

        // Reset form after successful submission
        this.resetForm(form);
      },
      error: (err) => {
        this.isLoading = false;

        this.snackBar.open(
          err.message || 'Error signing in. Please try again.',
          'Close',
          {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['error-snackbar'],
          },
        );
        console.error(err);
      },
    });
  }

  // Reset form method
  resetForm(form: any) {
    form.resetForm();
    this.signInData = {
      email: '',
      password: '',
      rememberMe: false,
    };
    this.showPassword = false;
  }
}
