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
  selector: 'app-brand',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './brand.html',
  styleUrl: './brand.scss'
})
export class BrandComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    {
      key: 'code',
      label: 'Brand Code'
    },
    {
      key: 'name',
      label: 'Brand Name'
    }
  ];

  brands = [
    {
      code: '1007',
      name: 'NEKKANTI'
    },
    {
      code: '1053',
      name: 'AKASAKA SPECIAL'
    },
    {
      code: '1028',
      name: 'AGAMA PROFESSIONAL'
    },
    {
      code: '1002',
      name: 'DELHAIZE'
    },
    {
      code: '1075',
      name: 'CONDOR'
    },
    {
      code: '1114',
      name: 'SUPREME CHOICE'
    },
    {
      code: '1005',
      name: 'SEAPORT'
    },
    {
      code: '1003',
      name: 'PORTICO BOUNTY'
    },
    {
      code: '1006',
      name: 'HARBOR BANKS'
    },
    {
      code: '1081',
      name: 'DUMMY'
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addBrand(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Brand',
      mode: 'add',

      fields: [
        {
          key: 'code',
          label: 'Brand Code',
          placeholder: 'Enter brand code',
          type: 'text',
          required: true
        },
        {
          key: 'name',
          label: 'Brand Name',
          placeholder: 'Enter brand name',
          type: 'text',
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

      this.brands = [
        ...this.brands,
        {
          code: result.code,
          name: result.name
        }
      ];

      this.showSuccess(
        'Brand added successfully'
      );
    });
  }

  viewBrand(brand: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Brand Details',
      mode: 'view',

      values: brand,

      fields: [
        {
          key: 'code',
          label: 'Brand Code',
          type: 'text'
        },
        {
          key: 'name',
          label: 'Brand Name',
          type: 'text'
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
        this.editBrand(brand);
      }
    });
  }

  editBrand(brand: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Brand',
      mode: 'edit',

      values: {
        code: brand.code,
        name: brand.name
      },

      fields: [
        {
          key: 'code',
          label: 'Brand Code',
          placeholder: 'Enter brand code',
          type: 'text',
          required: true
        },
        {
          key: 'name',
          label: 'Brand Name',
          placeholder: 'Enter brand name',
          type: 'text',
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
        brand.code !== result.code ||
        brand.name !== result.name;

      if (!isChanged) {
        this.showError(
          'No changes were made to the Brand'
        );

        return;
      }

      brand.code = result.code;
      brand.name = result.name;

      this.brands = [
        ...this.brands
      ];

      this.showSuccess(
        'Brand updated successfully'
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