import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [MatIconModule],
  selector: 'app-consignee',
  styleUrl: './consignee.scss',
  templateUrl: './consignee.html',
})
export class ConsigneeComponent {
    constructor(private router: Router) {}

  openPage(route: string): void {
    this.router.navigate([route]);
  }
}
