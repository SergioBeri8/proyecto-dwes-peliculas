import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  // Define esto para que el HTML no de error
  movies = signal<any[]>([]); 
}