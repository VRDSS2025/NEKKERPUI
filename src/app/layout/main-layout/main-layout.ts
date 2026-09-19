import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar/navbar';
import {RouterOutlet} from '@angular/router';
import { Sidebar } from '../sidebar/sidebar';
import { FooterComponent } from '../footer/footer';

@Component({
  imports: [NavbarComponent, RouterOutlet, Sidebar, FooterComponent],
  selector: 'app-main-layout',
  styleUrl: './main-layout.scss',
  templateUrl: './main-layout.html',
})
export class MainLayoutComponent {
   sidebarOpen = false;

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }
}
