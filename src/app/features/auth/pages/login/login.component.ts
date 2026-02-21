import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // Añadido
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router'; // Añadido RouterModule
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule], // Actualizado
  templateUrl: './login.component.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  async onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (!email || !password) return;

      const { error } = await this.authService.signIn(email, password);
      
      if (error) {
        alert('Error al entrar: ' + error.message);
      } else {
        this.router.navigate(['/dashboard']);
      }
    }
  }
}