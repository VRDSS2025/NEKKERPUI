import { Component, OnInit, inject } from '@angular/core';
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

import {
  ProductGroup,
  Countries
} from '../../../core/services/product-group';


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
export class ListOfCountriesComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly productService = inject(ProductGroup);


  // =====================================================
  // TABLE COLUMNS
  // =====================================================

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


  // =====================================================
  // COUNTRY DATA
  // =====================================================

  countries: Countries[] = [];


  // =====================================================
  // INITIAL LOAD
  // =====================================================

  ngOnInit(): void {
    this.loadCountries();
  }


  // =====================================================
  // GET COUNTRIES
  // =====================================================

  private loadCountries(): void {

    this.productService.getCountries().subscribe({

      next: (response: Countries[]) => {

        this.countries = response ?? [];

      },

      error: (error) => {

        console.error('Failed to load countries:', error);

        this.showMessage(
          'Failed to load countries.',
          'error'
        );

      }

    });

  }


  // =====================================================
  // ADD COUNTRY
  // =====================================================

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


      const payload: Countries = {

        countryCode:
          result.countryCode?.trim() || '',

        name:
          result.name?.trim() || '',

        group:
          result.group || ''

      };


      this.productService
        .createCountries(payload)
        .subscribe({

          next: () => {

            this.showMessage(
              'Country added successfully.',
              'success'
            );

            this.loadCountries();

          },

          error: (error) => {

            console.error(
              'Failed to create country:',
              error
            );

            this.showMessage(
              'Failed to add country.',
              'error'
            );

          }

        });

    });

  }


  // =====================================================
  // VIEW COUNTRY
  // =====================================================

  viewCountry(country: Countries): void {

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


  // =====================================================
  // EDIT COUNTRY
  // =====================================================

  private editCountry(country: Countries): void {

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

      if (!result) {
        return;
      }


      const countryId = country.id;

      if (!countryId) {

        this.showMessage(
          'Country ID is missing.',
          'error'
        );

        return;

      }


      const payload: Countries = {

        id: countryId,

        countryCode:
          result.countryCode?.trim() || '',

        name:
          result.name?.trim() || '',

        group:
          result.group || ''

      };


      this.productService
        .updateCountriese(
          countryId,
          payload
        )
        .subscribe({

          next: () => {

            this.showMessage(
              'Country updated successfully.',
              'success'
            );

            this.loadCountries();

          },

          error: (error) => {

            console.error(
              'Failed to update country:',
              error
            );

            this.showMessage(
              'Failed to update country.',
              'error'
            );

          }

        });

    });

  }


  // =====================================================
  // FORM CONFIGURATION
  // =====================================================

  private getFormData(
    mode: 'add' | 'edit' | 'view',
    values?: Countries
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


  // =====================================================
  // SNACKBAR
  // =====================================================

  private showMessage(
    message: string,
    panelClass: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 3000,

        panelClass: [
          `${panelClass}-snackbar`
        ],

        horizontalPosition: 'right',
        verticalPosition: 'top'
      }
    );

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate(['/countries']);

  }

}