import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Añadido
import { AuthService } from '../../../../core/services/auth.service';

function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  if (password?.pristine || confirmPassword?.pristine) {
    return null;
  }
  return password && confirmPassword && password.value !== confirmPassword.value
    ? { passwordsNotMatching: true }
    : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Añadido RouterModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: passwordValidator });
  }

  async onSubmit() {
    if (this.registerForm.invalid) {
      this.errorMessage = 'Por favor, completa todos los campos correctamente.';
      return;
    }
    const { name, email, password } = this.registerForm.value;

    try {
      const { data, error } = await this.authService.signUp(email!, password!, name!);
      if (error) {
        this.errorMessage = error.message;
      } else if (data.user) {
        this.successMessage = 'Registro exitoso. ¡Bienvenido!';
        setTimeout(() => this.router.navigate(['/dashboard']), 1500);
      }
    } catch (err: any) {
      this.errorMessage = err.message || 'Error desconocido.';
    }
  }
}