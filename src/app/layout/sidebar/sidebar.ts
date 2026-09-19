import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  selector: 'app-sidebar',
  styleUrl: './sidebar.scss',
  templateUrl: './sidebar.html',
})
export class Sidebar {
    masterOpen = false;
    consigneeOpen = false;

  toggleMaster(): void {
    this.masterOpen = !this.masterOpen;
  }
    toggleConsignee(): void {
    this.consigneeOpen = !this.consigneeOpen;
  }
}
