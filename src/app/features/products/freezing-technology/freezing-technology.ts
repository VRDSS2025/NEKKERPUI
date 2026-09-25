import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
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
  MasterFormDialogData,
  MasterFormField
} from '../../../shared/components/master-form-dialog/master-form-dialog';

import {
  ProductGroup,
  FreezingTechnologies
} from '../../../core/services/product-group';


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
export class FreezingTechnologyComponent implements OnInit {

  /* =========================================================
     SERVICES
     ========================================================= */

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly productService = inject(ProductGroup);
  private readonly cdr = inject(ChangeDetectorRef);


  /* =========================================================
     LIST COLUMNS
     ========================================================= */

  columns: MasterColumn[] = [
    {
      key: 'freezeCode',
      label: 'Freeze Code'
    },
    {
      key: 'freezeTechnology',
      label: 'Freeze Technology'
    },
    {
      key: 'shortForm',
      label: 'Short Form'
    }
  ];


  /* =========================================================
     DATA
     ========================================================= */

  products: FreezingTechnologies[] = [];


  /* =========================================================
     INIT
     ========================================================= */

  ngOnInit(): void {
    this.loadProducts();
  }


  /* =========================================================
     LOAD FREEZING TECHNOLOGIES
     ========================================================= */

  loadProducts(): void {

    this.productService
      .getFreezingTechnologies()
      .subscribe({

        next: (response) => {

          this.products = Array.isArray(response)
            ? [...response]
            : [];

          this.cdr.detectChanges();
        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to load Freezing Technologies:',
            error
          );

          this.products = [];

          this.cdr.detectChanges();

          this.showError(
            'Failed to load Freezing Technologies'
          );
        }

      });
  }


  /* =========================================================
     BACK
     ========================================================= */

  goBack(): void {
    this.router.navigate(['/products']);
  }


  /* =========================================================
     ADD FREEZING TECHNOLOGY
     ========================================================= */

  addProduct(): void {

    const dialogData: MasterFormDialogData = {

      title: 'Add Freezing Technology',

      mode: 'add',

      fields: this.getFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
        maxWidth: '90vw',
        data: dialogData,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      /* =====================================================
         CREATE PAYLOAD
         ===================================================== */

      const payload: FreezingTechnologies = {

        freezeCode:
          result.freezeCode?.trim() || '',

        freezeTechnology:
          result.freezeTechnology?.trim() || '',

        description:
          result.description?.trim() || '',

        shortForm:
          result.shortForm?.trim() || ''
      };


      /* =====================================================
         CREATE API
         ===================================================== */

      this.productService
        .createFreezingTechnologies(payload)
        .subscribe({

          next: () => {

            this.showSuccess(
              'Freezing Technology added successfully'
            );

            this.loadProducts();
          },

          error: (error: HttpErrorResponse) => {

            console.error(
              'Failed to create Freezing Technology:',
              error
            );

            this.showError(
              'Failed to add Freezing Technology'
            );
          }

        });
    });
  }


  /* =========================================================
     VIEW FREEZING TECHNOLOGY
     ========================================================= */

  viewFreezing(
    freezing: FreezingTechnologies
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Freezing Technology Details',

      mode: 'view',

      values: freezing,

      fields: this.getFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
        maxWidth: '90vw',
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

        this.editFreezing(freezing);
      }

    });
  }


  /* =========================================================
     EDIT FREEZING TECHNOLOGY
     ========================================================= */

  editFreezing(
    freezing: FreezingTechnologies
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Edit Freezing Technology',

      mode: 'edit',

      values: {

        freezeCode:
          freezing.freezeCode,

        freezeTechnology:
          freezing.freezeTechnology,

        description:
          freezing.description,

        shortForm:
          freezing.shortForm
      },

      fields: this.getFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
        maxWidth: '90vw',
        data: dialogData,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      /* =====================================================
         CHECK CHANGES
         ===================================================== */

      const isChanged =
        freezing.freezeCode !== result.freezeCode ||
        freezing.freezeTechnology !== result.freezeTechnology ||
        (freezing.description || '') !==
          (result.description || '') ||
        freezing.shortForm !== result.shortForm;


      if (!isChanged) {

        this.showError(
          'No changes were made to the Freezing Technology'
        );

        return;
      }


      /* =====================================================
         UPDATE PAYLOAD
         ===================================================== */

      const payload: FreezingTechnologies = {

        freezeCode:
          result.freezeCode?.trim() || '',

        freezeTechnology:
          result.freezeTechnology?.trim() || '',

        description:
          result.description?.trim() || '',

        shortForm:
          result.shortForm?.trim() || ''
      };


      /* =====================================================
         CHECK ID
         ===================================================== */

      if (!freezing.id) {

        this.showError(
          'Freezing Technology ID is missing'
        );

        return;
      }


      /* =====================================================
         UPDATE API
         ===================================================== */

      this.productService
        .updateFreezingTechnologies(
          freezing.id,
          payload
        )
        .subscribe({

          next: () => {

            this.showSuccess(
              'Freezing Technology updated successfully'
            );

            this.loadProducts();
          },

          error: (error: HttpErrorResponse) => {

            console.error(
              'Failed to update Freezing Technology:',
              error
            );

            this.showError(
              'Failed to update Freezing Technology'
            );
          }

        });
    });
  }


  /* =========================================================
     FORM FIELDS
     ========================================================= */

  private getFields(
    required = true
  ): MasterFormField[] {

    return [

      {
        key: 'freezeCode',
        label: 'Freeze Code',
        placeholder: 'Enter freeze code',
        type: 'text',
        required
      },

      {
        key: 'freezeTechnology',
        label: 'Freeze Technology',
        placeholder: 'Enter freeze technology',
        type: 'text',
        required
      },

      {
        key: 'description',
        label: 'Description',
        placeholder: 'Enter description',
        type: 'textarea',
        required
      },

      {
        key: 'shortForm',
        label: 'Short Form',
        placeholder: 'Enter short form',
        type: 'text',
        required
      }

    ];
  }


  /* =========================================================
     SUCCESS MESSAGE
     ========================================================= */

  private showSuccess(
    message: string
  ): void {

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


  /* =========================================================
     ERROR MESSAGE
     ========================================================= */

  private showError(
    message: string
  ): void {

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