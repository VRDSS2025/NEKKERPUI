import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard';

@Component({
  imports: [DashboardComponent],
  selector: 'app-home',
  styleUrl: './home.scss',
  templateUrl: './home.html',
})
export class HomeComponent {}
