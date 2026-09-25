import {
  Component,
  ChangeDetectorRef,
  OnInit,
  inject
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
  SubProductForms
} from '../../../core/services/product-group';

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
export class SubProductFormComponent implements OnInit {

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
      key: 'shortForm',
      label: 'Short Form'
    },
    {
      key: 'fullDescription',
      label: 'Full Description'
    }
  ];


  /* =========================================================
     DATA
     ========================================================= */

  products: SubProductForms[] = [];


  /* =========================================================
     INIT
     ========================================================= */

  ngOnInit(): void {
    this.loadProducts();
  }


  /* =========================================================
     LOAD SUB PRODUCT FORMS
     ========================================================= */

  loadProducts(): void {

    this.productService
      .getSubProductForms()
      .subscribe({

        next: (response) => {

          this.products = Array.isArray(response)
            ? [...response]
            : [];

          this.cdr.detectChanges();
        },

        error: (error) => {

          console.error(
            'Failed to load Sub Product Forms:',
            error
          );

          this.products = [];

          this.cdr.detectChanges();

          this.showError(
            'Failed to load Sub Product Forms'
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
     ADD SUB PRODUCT FORM
     ========================================================= */

  addSubProductForms(): void {

    const dialogData: MasterFormDialogData = {

      title: 'Add Sub Product Form',

      mode: 'add',

      fields: this.getFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
        maxWidth: '90vw',
        autoFocus: false,
        panelClass: 'premium-master-dialog',
        data: dialogData
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      const payload: SubProductForms = {

        shortForm:
          result.shortForm?.trim() || '',

        fullDescription:
          result.fullDescription?.trim() || ''
      };


      /* =====================================================
         CREATE API
         ===================================================== */

      this.productService
        .createSubProductForms(payload)
        .subscribe({

          next: () => {

            this.showSuccess(
              'Sub Product Form added successfully'
            );

            this.loadProducts();
          },

          error: (error) => {

            console.error(
              'Failed to create Sub Product Form:',
              error
            );

            this.showError(
              'Failed to add Sub Product Form'
            );
          }

        });
    });
  }


  /* =========================================================
     VIEW SUB PRODUCT FORM
     ========================================================= */

  viewSubProductForm(
    subProductForm: SubProductForms
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Sub Product Form Details',

      mode: 'view',

      values: subProductForm,

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

        this.editSubProductForm(subProductForm);
      }

    });
  }


  /* =========================================================
     EDIT SUB PRODUCT FORM
     ========================================================= */

  editSubProductForm(
    subProductForm: SubProductForms
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Edit Sub Product Form',

      mode: 'edit',

      values: {

        shortForm:
          subProductForm.shortForm,

        fullDescription:
          subProductForm.fullDescription
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
         CHECK WHETHER DATA CHANGED
         ===================================================== */

      const isChanged =
        subProductForm.shortForm !== result.shortForm ||
        (subProductForm.fullDescription || '') !==
          (result.fullDescription || '');


      if (!isChanged) {

        this.showError(
          'No changes were made to the Sub Product Form'
        );

        return;
      }


      /* =====================================================
         UPDATE PAYLOAD
         ===================================================== */

      const payload: SubProductForms = {

        shortForm:
          result.shortForm?.trim() || '',

        fullDescription:
          result.fullDescription?.trim() || ''
      };


      /* =====================================================
         UPDATE API
         ===================================================== */

      if (!subProductForm.id) {

        this.showError(
          'Sub Product Form ID is missing'
        );

        return;
      }


      this.productService
        .UpdateSubProductForms(
          subProductForm.id,
          payload
        )
        .subscribe({

          next: () => {

            this.showSuccess(
              'Sub Product Form updated successfully'
            );

            this.loadProducts();
          },

          error: (error : HttpErrorResponse) => {

            console.error(
              'Failed to update Sub Product Form:',
              error
            );

            this.showError(
              'Failed to update Sub Product Form'
            );
          }

        });
    });
  }


  /* =========================================================
     FORM FIELDS
     ========================================================= */

  private getFields(): MasterFormField[] {

    return [

      {
        key: 'shortForm',
        label: 'Short Form',
        placeholder: 'Short Form',
        type: 'text',
        required: true
      },

      {
        key: 'fullDescription',
        label: 'Full Description',
        placeholder: 'Full Description',
        type: 'textarea',
        required: true
      }

    ];
  }


  /* =========================================================
     SUCCESS MESSAGE
     ========================================================= */

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


  /* =========================================================
     ERROR MESSAGE
     ========================================================= */

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