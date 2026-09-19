import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule],
  selector: 'app-list-of-countries',
  styleUrl: './list-of-countries.scss',
  templateUrl: './list-of-countries.html',
})
export class ListOfCountriesComponent {

  constructor(private router: Router) {}

  openPage(): void {
    this.router.navigate(['/countries/list']);
  }
}
