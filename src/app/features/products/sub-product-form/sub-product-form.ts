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
  selector: 'app-sub-product-form',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './sub-product-form.html',
  styleUrl: './sub-product-form.scss'
})
export class SubProductFormComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    { key: 'shortForm', label: 'Short Form' },
    { key: 'description', label: 'Full Description' }
  ];

  subProductForms = [
    {
      shortForm: 'BRE',
      description: 'BREADED'
    },
    {
      shortForm: 'CC',
      description: 'CURL CONTROL'
    },
    {
      shortForm: 'MR',
      description: 'MARINATED'
    },
    {
      shortForm: 'NBS',
      description: 'STRETCHED / NOBHASHI'
    },
    {
      shortForm: 'REG',
      description: 'REGULAR'
    },
    {
      shortForm: 'RINGS',
      description: 'RINGS'
    },
    {
      shortForm: 'SKW',
      description: 'SKEWERS'
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addSubProductForm(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Sub Product Form',
      mode: 'add',
      fields: [
        {
          key: 'shortForm',
          label: 'Short Form',
          placeholder: 'Enter short form',
          type: 'text',
          required: true
        },
        {
          key: 'description',
          label: 'Full Description',
          placeholder: 'Enter full description',
          type: 'textarea',
          required: true
        }
      ]
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

      this.subProductForms = [
        ...this.subProductForms,
        {
          shortForm: result.shortForm,
          description: result.description
        }
      ];

      this.showSuccess(
        'Sub Product Form added successfully'
      );
    });
  }

  viewSubProductForm(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Sub Product Form Details',
      mode: 'view',
      values: item,
      fields: [
        {
          key: 'shortForm',
          label: 'Short Form',
          type: 'text'
        },
        {
          key: 'description',
          label: 'Full Description',
          type: 'textarea'
        }
      ]
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
        this.editSubProductForm(item);
      }
    });
  }

  editSubProductForm(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Sub Product Form',
      mode: 'edit',
      values: {
        shortForm: item.shortForm,
        description: item.description
      },
      fields: [
        {
          key: 'shortForm',
          label: 'Short Form',
          placeholder: 'Enter short form',
          type: 'text',
          required: true
        },
        {
          key: 'description',
          label: 'Full Description',
          placeholder: 'Enter full description',
          type: 'textarea',
          required: true
        }
      ]
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
        item.shortForm !== result.shortForm ||
        item.description !== result.description;

      if (!isChanged) {
        this.showError(
          'No changes were made to the Sub Product Form'
        );
        return;
      }

      item.shortForm = result.shortForm;
      item.description = result.description;

      this.subProductForms = [
        ...this.subProductForms
      ];

      this.showSuccess(
        'Sub Product Form updated successfully'
      );
    });
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