import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/pages/login/login.component';

export const routes: Routes = [
  // 1. Si no ponemos nada, que vaya al login
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  
  // 2. Ruta para el componente de Login
  { path: 'login', component: LoginComponent },
  
  // 3. Ruta para el Dashboard (por ahora lo mandamos al login hasta que lo creemos)
  { path: 'dashboard', component: LoginComponent },

  // 4. Comodín: Cualquier cosa rara, al login
  { path: '**', redirectTo: '/login' }
];