import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [ MatIconModule],
  selector: 'app-products',
  styleUrl: './products.scss',
  templateUrl: './products.html',
})
export class ProductsComponent {

  constructor(private router: Router) {}

  openPage(route: string): void {
    this.router.navigate([route]);
  }
}
