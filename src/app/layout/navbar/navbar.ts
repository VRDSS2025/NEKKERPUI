import { Component, EventEmitter, Output, inject } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',

  standalone: true,

  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],

  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class NavbarComponent {

  @Output() menuToggle = new EventEmitter<void>();

  private readonly router = inject(Router);

  profileMenuOpen = false;


  // ================================
  // MENU TOGGLE
  // ================================

  toggleMenu(): void {
    this.menuToggle.emit();
  }


  // ================================
  // HOME NAVIGATION
  // ================================

  goToHome(): void {
    this.router.navigate(['/home']);
  }


  // ================================
  // PROFILE MENU
  // ================================

  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }


  // ================================
  // LOGOUT
  // ================================

  logout(): void {

    // Clear login information
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Close profile menu
    this.profileMenuOpen = false;

    // Navigate to login
    this.router.navigate(['/login']);
  }
}