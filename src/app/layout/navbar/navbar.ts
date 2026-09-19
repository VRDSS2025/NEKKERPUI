import { Component, EventEmitter, Output, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router} from '@angular/router';

@Component({
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  selector: 'app-navbar',
  styleUrl: './navbar.scss',
  templateUrl: './navbar.html',
})
export class NavbarComponent {
   @Output() menuToggle = new EventEmitter<void>();

     private readonly router = inject(Router);

  profileMenuOpen = false

  toggleMenu(): void {
    this.menuToggle.emit();
}
  toggleProfileMenu(): void {
    this.profileMenuOpen = !this.profileMenuOpen;
  }

  logout(): void {
    // Clear temporary login information
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Close profile menu
    this.profileMenuOpen = false;

    // Navigate to login
    this.router.navigate(['/login']);
  }
}