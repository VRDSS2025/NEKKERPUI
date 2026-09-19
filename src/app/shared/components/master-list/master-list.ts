import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges
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
export class MasterListComponent implements OnChanges {

  @Input() title = '';

  @Input() description = '';

  @Input() icon = 'database';

  @Input() columns: MasterColumn[] = [];

  @Input() data: any[] = [];

  @Input() searchPlaceholder = 'Search...';

  @Input() primaryActionLabel = 'View';

  @Input() secondaryActionLabel = '';

  @Output() addClicked =
    new EventEmitter<void>();

  @Output() viewClicked =
    new EventEmitter<any>();

  @Output() secondaryActionClicked =
    new EventEmitter<any>();

  searchText = '';

  filteredData: any[] = [];

  /* =====================================================
     DATA CHANGE
     ===================================================== */

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['data'] || changes['columns']) {
      this.applyFilter();
    }
  }

  /* =====================================================
     SEARCH
     ===================================================== */

  onSearch(event: Event): void {

    const input =
      event.target as HTMLInputElement;

    this.searchText =
      input.value;

    this.applyFilter();
  }

  /* =====================================================
     FILTER
     ===================================================== */

  private applyFilter(): void {

    const search =
      this.searchText
        .trim()
        .toLowerCase();

    if (!search) {

      this.filteredData =
        this.data ? [...this.data] : [];

      return;
    }

    this.filteredData =
      (this.data ?? []).filter(row =>
        this.columns.some(column =>
          String(
            row?.[column.key] ?? ''
          )
            .toLowerCase()
            .includes(search)
        )
      );
  }

  /* =====================================================
     ADD
     ===================================================== */

  add(): void {
    this.addClicked.emit();
  }

  /* =====================================================
     VIEW
     ===================================================== */

  view(row: any): void {
    this.viewClicked.emit(row);
  }

  /* =================z====================================
     SECONDARY ACTION
     ===================================================== */

  secondaryAction(row: any): void {
    this.secondaryActionClicked.emit(row);
  }
}