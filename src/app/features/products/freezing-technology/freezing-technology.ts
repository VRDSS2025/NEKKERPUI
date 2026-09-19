import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import {
  MasterListComponent,
  MasterColumn
} from '../../../shared/components/master-list/master-list';

import {
  MasterFormDialogComponent,
  MasterFormDialogData
} from '../../../shared/components/master-form-dialog/master-form-dialog';

@Component({
  selector: 'app-freezing-technology',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './freezing-technology.html',
  styleUrl: './freezing-technology.scss'
})
export class FreezingTechnologyComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    { key: 'code', label: 'Freeze Code' },
    { key: 'technology', label: 'Freeze Technology' },
    { key: 'shortForm', label: 'Short Form' }
  ];

  freezingTechnologies = [
    {
      code: '02',
      technology: 'BLOCK FROZEN',
      description: 'BLOCK FROZEN',
      shortForm: 'BLOCKS'
    },
    {
      code: '01',
      technology: 'INDIVIDUALLY QUICK FROZEN',
      description: 'INDIVIDUALLY QUICK FROZEN',
      shortForm: 'IQF'
    },
    {
      code: '03',
      technology: 'CHILLED',
      description: 'CHILLED',
      shortForm: 'CHILLED'
    },
    {
      code: 'IQF TRAY PACK',
      technology: 'IQF TRAY PACK',
      description: 'IQF TRAY PACK',
      shortForm: 'IQF TRAY PACK'
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addFreezingTechnology(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Freezing Technology',
      mode: 'add',
      fields: this.getFields()
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data: dialogData,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.freezingTechnologies = [
        ...this.freezingTechnologies,
        {
          code: result.code,
          technology: result.technology,
          description: result.description,
          shortForm: result.shortForm
        }
      ];

      this.showSuccess(
        'Freezing Technology added successfully'
      );
    });
  }

  viewFreezingTechnology(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Freezing Technology Details',
      mode: 'view',
      values: item,
      fields: this.getFields(false)
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data: dialogData,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      if (result.action === 'edit') {
        this.editFreezingTechnology(item);
      }
    });
  }

  editFreezingTechnology(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Freezing Technology',
      mode: 'edit',
      values: {
        code: item.code,
        technology: item.technology,
        description: item.description,
        shortForm: item.shortForm
      },
      fields: this.getFields()
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data: dialogData,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      const isChanged =
        item.code !== result.code ||
        item.technology !== result.technology ||
        item.description !== result.description ||
        item.shortForm !== result.shortForm;

      if (!isChanged) {
        this.showError(
          'No changes were made to the Freezing Technology'
        );
        return;
      }

      item.code = result.code;
      item.technology = result.technology;
      item.description = result.description;
      item.shortForm = result.shortForm;

      this.freezingTechnologies = [
        ...this.freezingTechnologies
      ];

      this.showSuccess(
        'Freezing Technology updated successfully'
      );
    });
  }

  private getFields(required = true) {

    return [
      {
        key: 'code',
        label: 'Freeze Code',
        placeholder: 'Enter freeze code',
        type: 'text' as const,
        required
      },
      {
        key: 'technology',
        label: 'Freeze Technology',
        placeholder: 'Enter freeze technology',
        type: 'text' as const,
        required
      },
      {
        key: 'description',
        label: 'Description',
        placeholder: 'Enter description',
        type: 'textarea' as const,
        required
      },
      {
        key: 'shortForm',
        label: 'Short Form',
        placeholder: 'Enter short form',
        type: 'text' as const,
        required
      }
    ];
  }

  private showSuccess(message: string): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      }
    );
  }

  private showError(message: string): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3500,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      }
    );
  }
}