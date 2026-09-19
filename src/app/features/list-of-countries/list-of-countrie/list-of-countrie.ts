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
  selector: 'app-list-of-countries',
  standalone: true,
  imports: [
    MatIconModule,
    MasterListComponent
  ],
  templateUrl: './list-of-countrie.html',
  styleUrl: './list-of-countrie.scss'
})
export class ListOfCountriesComponent {

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    {
      key: 'countryCode',
      label: 'Country Code'
    },
    {
      key: 'name',
      label: 'Name'
    },
    {
      key: 'group',
      label: 'Group'
    }
  ];

  countries = [
    {
      countryCode: 'BE',
      name: 'BELGIUM',
      group: 'EU'
    },
    {
      countryCode: 'CA',
      name: 'CANADA',
      group: 'CANADA'
    },
    {
      countryCode: 'CHINA',
      name: 'CHINA',
      group: 'OTHERS'
    },
    {
      countryCode: 'COLOMBIA',
      name: 'COLOMBIA',
      group: 'OTHERS'
    },
    {
      countryCode: 'CO',
      name: 'COLOMBO',
      group: 'OTHERS'
    },
    {
      countryCode: 'DOMINICAN REPUBLIC',
      name: 'DOMINICAN REPUBLIC',
      group: 'OTHERS'
    },
    {
      countryCode: 'EG',
      name: 'EGYPT',
      group: 'OTHERS'
    },
    {
      countryCode: 'FIJI ISLANDS',
      name: 'FIJI ISLANDS',
      group: 'OTHERS'
    },
    {
      countryCode: 'FR',
      name: 'FRANCE',
      group: 'EU'
    },
    {
      countryCode: 'GER',
      name: 'GERMANY',
      group: 'EU'
    }
  ];

  addCountry(): void {
    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'premium-master-dialog',
        data: this.getFormData('add')
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }

      this.countries = [
        ...this.countries,
        result
      ];

      this.showMessage(
        'Country added successfully.',
        'success'
      );
    });
  }

  viewCountry(country: any): void {
    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'premium-master-dialog',
        data: this.getFormData(
          'view',
          country
        )
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result || result.action !== 'edit') {
        return;
      }

      this.editCountry(country);
    });
  }

  private editCountry(country: any): void {
    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'premium-master-dialog',
        data: this.getFormData(
          'edit',
          country
        )
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (!result || result.action === 'edit') {
        return;
      }

      const index = this.countries.indexOf(country);

      if (index === -1) {
        return;
      }

      this.countries[index] = {
        ...this.countries[index],
        ...result
      };

      this.countries = [
        ...this.countries
      ];

      this.showMessage(
        'Country updated successfully.',
        'success'
      );
    });
  }

  private getFormData(
    mode: 'add' | 'edit' | 'view',
    values?: any
  ): MasterFormDialogData {

    return {
      title:
        mode === 'add'
          ? 'Add Country'
          : mode === 'edit'
            ? 'Edit Country'
            : 'Country',

      mode,

      values,

      fields: [
        {
          key: 'countryCode',
          label: 'Country Code',
          placeholder: 'Enter country code',
          type: 'text',
          required: true
        },
        {
          key: 'name',
          label: 'Name',
          placeholder: 'Enter country name',
          type: 'text',
          required: true
        },
        {
          key: 'group',
          label: 'Group',
          type: 'select',
          required: true,
          options: [
            {
              value: 'EU',
              label: 'EU'
            },
            {
              value: 'CANADA',
              label: 'CANADA'
            },
            {
              value: 'OTHERS',
              label: 'OTHERS'
            }
          ]
        }
      ]
    };
  }

  private showMessage(
    message: string,
    panelClass: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,
        panelClass: [`${panelClass}-snackbar`],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );
  }

  goBack(): void {
    this.router.navigate(['/countries']);
  }
}