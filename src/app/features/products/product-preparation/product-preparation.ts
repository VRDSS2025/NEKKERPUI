import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

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
  ProductPreparations
} from '../../../core/services/product-group';

import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-product-preparation',

  standalone: true,

  imports: [
    MasterListComponent,
    MatIconModule
  ],

  templateUrl: './product-preparation.html',

  styleUrl: './product-preparation.scss'
})
export class ProductPreparationComponent implements OnInit {

  // =========================================================
  // SERVICES
  // =========================================================

  private readonly router = inject(Router);

  private readonly dialog = inject(MatDialog);

  private readonly snackBar = inject(MatSnackBar);

  private readonly productService = inject(ProductGroup);

  private readonly cdr = inject(ChangeDetectorRef);


  // =========================================================
  // TABLE COLUMNS
  // =========================================================

  columns: MasterColumn[] = [

    {
      key: 'code',
      label: 'Code'
    },

    {
      key: 'productShortForm',
      label: 'Product Short Form'
    },

    {
      key: 'hscode',
      label: 'HSCODE'
    }

  ];


  // =========================================================
  // DATA
  // =========================================================

  products: ProductPreparations[] = [];


  // =========================================================
  // BACK
  // =========================================================

  goBack(): void {

    this.router.navigate(['/products']);

  }


  // =========================================================
  // INIT
  // =========================================================

  ngOnInit(): void {

    this.loadProducts();

  }


  // =========================================================
  // GET PRODUCT PREPARATIONS
  // =========================================================

  loadProducts(): void {

    this.productService
      .getProductPreparations()
      .subscribe({

        next: (response) => {

          console.log(
            'Product Preparations GET Response:',
            response
          );

          this.products =
            Array.isArray(response)
              ? [...response]
              : [];

          console.log(
            'Products assigned to table:',
            this.products
          );

          this.cdr.detectChanges();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to load ProductPreparations'
          );

          console.error(
            'Status:',
            error.status
          );

          console.error(
            'Error:',
            error.error
          );

          console.error(
            'Message:',
            error.message
          );

          this.products = [];

          this.cdr.detectChanges();

          this.showError(
            'Failed to load Product Preparations'
          );

        }

      });

  }


  // =========================================================
  // ADD PRODUCT PREPARATION
  // =========================================================

  addProductPreparations(): void {

    const dialogData: MasterFormDialogData = {

      title: 'Add Product Preparation',

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


      // -------------------------------------------------------
      // FORMAT DATE
      // -------------------------------------------------------

      const effectiveFrom =
        this.formatDateForApi(
          result.effectiveFrom
        );


      // -------------------------------------------------------
      // CREATE PAYLOAD
      // -------------------------------------------------------

      const payload: ProductPreparations = {

        code:
          result.code?.trim() || '',

        productShortForm:
          result.productShortForm?.trim() || '',

        effectiveFrom:
          effectiveFrom,

        hsnDescriptionInTally:
          result.hsnDescriptionInTally?.trim() || '',

        description:
          result.description?.trim() || '',

        hscode:
          result.hscode?.trim() || '',

        autoEmailShortForm:
          result.autoEmailShortForm?.trim() || '',

        taxRateInTally:
          Number(result.taxRateInTally) || 0

      };


      console.log(
        'Product Preparation POST Payload:',
        payload
      );


      // -------------------------------------------------------
      // POST API
      // -------------------------------------------------------

      this.productService
        .CreateProductPreparations(payload)
        .subscribe({

          next: (response) => {

            console.log(
              'Product Preparation Created:',
              response
            );


            this.showSuccess(
              'Product Preparation added successfully'
            );


            this.loadProducts();

          },


          error: (error: HttpErrorResponse) => {

            console.error(
              'Failed to create ProductPreparations'
            );

            console.error(
              'Status:',
              error.status
            );

            console.error(
              'Response:',
              error.error
            );

            console.error(
              'Message:',
              error.message
            );


            if (error.error?.errors) {

              console.error(
                'Validation Errors:',
                error.error.errors
              );

            }


            this.showError(

              error.error?.title ||

              error.error?.message ||

              'Failed to add Product Preparation'

            );

          }

        });

    });

  }


  // =========================================================
  // VIEW PRODUCT PREPARATION
  // =========================================================

  viewProductPreparation(
    product: ProductPreparations
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Product Preparation Details',

      mode: 'view',

      values: product,

      fields: this.getFields(false)

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

        this.editProductPreparations(product);

      }

    });

  }


  // =========================================================
  // EDIT PRODUCT PREPARATION
  // =========================================================

  editProductPreparations(
    product: ProductPreparations
  ): void {


    // -------------------------------------------------------
    // PREPARE DATE FOR EDIT FORM
    // -------------------------------------------------------

    const editDate =
      this.formatDateForForm(
        product.effectiveFrom
      );


    // -------------------------------------------------------
    // DIALOG DATA
    // -------------------------------------------------------

    const dialogData: MasterFormDialogData = {

      title: 'Edit Product Preparation',

      mode: 'edit',

      values: {

        code:
          product.code,

        productShortForm:
          product.productShortForm,

        effectiveFrom:
          editDate,

        hsnDescriptionInTally:
          product.hsnDescriptionInTally,

        description:
          product.description,

        hscode:
          product.hscode,

        autoEmailShortForm:
          product.autoEmailShortForm,

        taxRateInTally:
          product.taxRateInTally

      },

      fields: this.getFields()

    };


    // -------------------------------------------------------
    // OPEN DIALOG
    // -------------------------------------------------------

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


    // -------------------------------------------------------
    // AFTER CLOSE
    // -------------------------------------------------------

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {

        return;

      }


      // -----------------------------------------------------
      // CHECK CHANGES
      // -----------------------------------------------------

      const isChanged =

        (product.code || '') !==
        (result.code || '') ||

        (product.productShortForm || '') !==
        (result.productShortForm || '') ||

        this.formatDateForApi(product.effectiveFrom) !==
        this.formatDateForApi(result.effectiveFrom) ||

        (product.hsnDescriptionInTally || '') !==
        (result.hsnDescriptionInTally || '') ||

        (product.description || '') !==
        (result.description || '') ||

        (product.hscode || '') !==
        (result.hscode || '') ||

        (product.autoEmailShortForm || '') !==
        (result.autoEmailShortForm || '') ||

        Number(product.taxRateInTally || 0) !==
        Number(result.taxRateInTally || 0);


      if (!isChanged) {

        this.showError(
          'No changes were made to the Product Preparation'
        );

        return;

      }


      // -----------------------------------------------------
      // CHECK ID
      // -----------------------------------------------------

      if (!product.id) {

        this.showError(
          'Product Preparation ID is missing'
        );

        return;

      }


      // -----------------------------------------------------
      // UPDATE PAYLOAD
      // -----------------------------------------------------

      const payload: ProductPreparations = {

        code:
          result.code?.trim() || '',

        productShortForm:
          result.productShortForm?.trim() || '',

        effectiveFrom:
          this.formatDateForApi(
            result.effectiveFrom
          ),

        hsnDescriptionInTally:
          result.hsnDescriptionInTally?.trim() || '',

        description:
          result.description?.trim() || '',

        hscode:
          result.hscode?.trim() || '',

        autoEmailShortForm:
          result.autoEmailShortForm?.trim() || '',

        taxRateInTally:
          Number(result.taxRateInTally) || 0

      };


      console.log(
        'Product Preparation PUT ID:',
        product.id
      );

      console.log(
        'Product Preparation PUT Payload:',
        payload
      );


      // -----------------------------------------------------
      // PUT API
      // -----------------------------------------------------

      this.productService
        .updateProductPreparations(
          product.id,
          payload
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Product Preparation Updated:',
              response
            );


            this.showSuccess(
              'Product Preparation updated successfully'
            );


            this.loadProducts();

          },


          error: (error: HttpErrorResponse) => {

            console.error(
              'Failed to update Product Preparation'
            );

            console.error(
              'Status:',
              error.status
            );

            console.error(
              'Response:',
              error.error
            );

            console.error(
              'Message:',
              error.message
            );


            if (error.error?.errors) {

              console.error(
                'Validation Errors:',
                error.error.errors
              );

            }


            this.showError(

              error.error?.title ||

              error.error?.message ||

              'Failed to update Product Preparation'

            );

          }

        });

    });

  }


  // =========================================================
  // FORM FIELDS
  // =========================================================

  private getFields(
    required = true
  ): MasterFormField[] {

    return [

      {
        key: 'code',

        label: 'Code',

        placeholder: 'Enter code',

        type: 'text' as const,

        required

      },


      {
        key: 'productShortForm',

        label: 'Product Short Form',

        placeholder: 'Enter product short form',

        type: 'text' as const,

        required

      },


      {
        key: 'effectiveFrom',

        label: 'Effective From',

        placeholder: 'Select effective date',

        type: 'date' as const,

        required

      },


      {
        key: 'hsnDescriptionInTally',

        label: 'HSN Description in Tally',

        placeholder: 'Enter HSN description',

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
        key: 'hscode',

        label: 'HSCODE',

        placeholder: 'Enter HSCODE',

        type: 'text' as const,

        required

      },


      {
        key: 'autoEmailShortForm',

        label: 'Auto Email Short Form',

        placeholder: 'Enter auto email short form',

        type: 'text' as const,

        required

      },


      {
        key: 'taxRateInTally',

        label: 'Tax Rate in Tally',

        placeholder: 'Enter tax rate',

        type: 'text' as const,

        required

      }

    ];

  }


  // =========================================================
  // FORMAT DATE FOR API
  // =========================================================

  private formatDateForApi(
    value: any
  ): string {

    if (!value) {

      return '';

    }


    const date =
      String(value).trim();


    // Already ISO DateTime
    if (date.includes('T')) {

      return date;

    }


    // YYYY-MM-DD
    if (
      /^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {

      return `${date}T00:00:00`;

    }


    // YYYY/MM/DD
    if (
      /^\d{4}\/\d{2}\/\d{2}$/.test(date)
    ) {

      return `${
        date.replace(/\//g, '-')
      }T00:00:00`;

    }


    // DD/MM/YYYY
    if (
      /^\d{2}\/\d{2}\/\d{4}$/.test(date)
    ) {

      const [
        day,
        month,
        year
      ] = date.split('/');

      return `${year}-${month}-${day}T00:00:00`;

    }


    // DD-MM-YYYY
    if (
      /^\d{2}-\d{2}-\d{4}$/.test(date)
    ) {

      const [
        day,
        month,
        year
      ] = date.split('-');

      return `${year}-${month}-${day}T00:00:00`;

    }


    return date;

  }


  // =========================================================
  // FORMAT DATE FOR FORM
  // =========================================================

  private formatDateForForm(
    value: any
  ): string {

    if (!value) {

      return '';

    }


    const date =
      String(value).split('T')[0];


    return date;

  }


  // =========================================================
  // SUCCESS MESSAGE
  // =========================================================

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

        panelClass: [
          'success-snackbar'
        ]

      }

    );

  }


  // =========================================================
  // ERROR MESSAGE
  // =========================================================

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

        panelClass: [
          'error-snackbar'
        ]

      }

    );

  }

}