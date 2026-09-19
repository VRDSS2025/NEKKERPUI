import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


export interface MasterColumn {
  key: string;
  label: string;
}


@Component({
  selector: 'app-master-list',
  standalone: true,

  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],

  templateUrl: './master-list.html',
  styleUrl: './master-list.scss'
})
export class MasterListComponent {


  // =====================================================
  // INPUTS
  // =====================================================

  @Input() title = '';

  @Input() description = '';

  @Input() icon = 'database';

  @Input() columns: MasterColumn[] = [];


  private _data: any[] = [];

  @Input()
  set data(value: any[]) {

    this._data = value ?? [];

    /*
     * Whenever new API data comes from the parent,
     * immediately update the table.
     */
    this.applyFilter();

  }

  get data(): any[] {
    return this._data;
  }


  @Input() searchPlaceholder = 'Search...';

  @Input() primaryActionLabel = 'View';

  @Input() secondaryActionLabel = '';


  // =====================================================
  // OUTPUTS
  // =====================================================

  @Output() addClicked =
    new EventEmitter<void>();

  @Output() viewClicked =
    new EventEmitter<any>();

  @Output() secondaryActionClicked =
    new EventEmitter<any>();


  // =====================================================
  // SEARCH
  // =====================================================

  searchText = '';

  filteredData: any[] = [];


  // =====================================================
  // SEARCH
  // =====================================================

  onSearch(
    event: Event
  ): void {

    const input =
      event.target as HTMLInputElement;

    this.searchText =
      input.value;

    this.applyFilter();

  }


  // =====================================================
  // APPLY FILTER
  // =====================================================

  private applyFilter(): void {

    const data =
      this._data ?? [];

    const search =
      this.searchText
        .trim()
        .toLowerCase();


    // -----------------------------------------------------
    // NO SEARCH
    // Show ALL API records immediately
    // -----------------------------------------------------

    if (!search) {

      this.filteredData =
        [...data];

      return;

    }


    // -----------------------------------------------------
    // SEARCH
    // -----------------------------------------------------

    this.filteredData =
      data.filter(row => {

        return this.columns.some(column => {

          const value =
            row?.[column.key];

          return String(
            value ?? ''
          )
            .toLowerCase()
            .includes(search);

        });

      });

  }


  // =====================================================
  // ADD
  // =====================================================

  add(): void {

    this.addClicked.emit();

  }


  // =====================================================
  // VIEW
  // =====================================================

  view(
    row: any
  ): void {

    this.viewClicked.emit(row);

  }


  // =====================================================
  // SECONDARY ACTION
  // =====================================================

  secondaryAction(
    row: any
  ): void {

    this.secondaryActionClicked.emit(row);

  }

}