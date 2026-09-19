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
  MasterFormDialogData,
  MasterFormField
} from '../../../shared/components/master-form-dialog/master-form-dialog';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './product.html',
  styleUrl: './product.scss'
})
export class ProductComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  /* =========================================================
     LIST COLUMNS
     ========================================================= */

  columns: MasterColumn[] = [
    {
      key: 'code',
      label: 'Code'
    },
    {
      key: 'shortForm',
      label: 'Short Form'
    }
  ];

    /* =========================================================
     BACK
     ========================================================= */

  goBack(): void {
    this.router.navigate(['/products']);
  }


  /* =========================================================
     PRODUCT DATA
     TEMPORARY FRONTEND DATA
     ========================================================= */

  products = [
    {
      code: '1004',
      shortForm: 'HOSO',
      description: 'HEAD ON SHELL ON',
      groupId: 'HEAD ON SHELL ON'
    },
    {
      code: '1005',
      shortForm: 'HLSO',
      description: 'HEAD LESS SHELL ON',
      groupId: 'HEAD LESS SHELL ON'
    },
    {
      code: '1001',
      shortForm: 'HLSO Ezp',
      description: 'HEAD LESS SHELL OFF EASY PEEL',
      groupId: 'HEAD LESS SHELL OFF'
    },
    {
      code: '1002',
      shortForm: 'PDTAILON',
      description: 'PEELED DEVEINED TAIL ON',
      groupId: 'PEELED'
    },
    {
      code: '1003',
      shortForm: 'PDTAILOFF',
      description: 'PEELED DEVEINED TAIL OFF',
      groupId: 'PEELED'
    },
    {
      code: '1013',
      shortForm: 'PUDTON',
      description: 'PEELED UNDEVEINED TAIL ON',
      groupId: 'PEELED'
    },
    {
      code: '1014',
      shortForm: 'PUDTOFF',
      description: 'PEELED UNDEVEINED TAIL OFF',
      groupId: 'PEELED'
    },
    {
      code: '1021',
      shortForm: 'HOEZP',
      description: 'HEAD ON EASY PEEL',
      groupId: 'HEAD ON'
    },
    {
      code: '1022',
      shortForm: 'HLSO RP',
      description: 'HEAD LESS SHELL OFF RP',
      groupId: 'HEAD LESS SHELL OFF'
    },
    {
      code: '1023',
      shortForm: 'PD RP',
      description: 'PEELED DEVEINED RP',
      groupId: 'PEELED'
    }
  ];


  /* =========================================================
     GROUP OPTIONS
     TEMPORARY DATA
     ========================================================= */

  groupOptions = [
    {
      value: 'HEAD ON SHELL ON',
      label: 'HEAD ON SHELL ON'
    },
    {
      value: 'HEAD LESS SHELL ON',
      label: 'HEAD LESS SHELL ON'
    },
    {
      value: 'HEAD LESS SHELL OFF',
      label: 'HEAD LESS SHELL OFF'
    },
    {
      value: 'PEELED',
      label: 'PEELED'
    },
    {
      value: 'HEAD ON',
      label: 'HEAD ON'
    }
  ];


  /* =========================================================
     ADD PRODUCT
     ========================================================= */

  addProduct(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Product',
      mode: 'add',
      fields: this.getFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
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


      this.products = [
        ...this.products,
        {
          code: result.code,
          shortForm: result.shortForm,
          description: result.description,
          groupId: result.groupId
        }
      ];


      this.showSuccess(
        'Product added successfully'
      );

    });
  }


  /* =========================================================
     VIEW PRODUCT
     ========================================================= */

  viewProduct(product: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Product Details',
      mode: 'view',
      values: product,
      fields: this.getFields(false)
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
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

        this.editProduct(product);

      }

    });
  }


  /* =========================================================
     EDIT PRODUCT
     ========================================================= */

  editProduct(product: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Product',
      mode: 'edit',

      values: {
        code: product.code,
        shortForm: product.shortForm,
        description: product.description,
        groupId: product.groupId
      },

      fields: this.getFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '700px',
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
        product.code !== result.code ||
        product.shortForm !== result.shortForm ||
        (product.description || '') !==
          (result.description || '') ||
        product.groupId !== result.groupId;


      if (!isChanged) {

        this.showError(
          'No changes were made to the Product'
        );

        return;
      }


      product.code = result.code;
      product.shortForm = result.shortForm;
      product.description = result.description;
      product.groupId = result.groupId;


      this.products = [
        ...this.products
      ];


      this.showSuccess(
        'Product updated successfully'
      );

    });
  }


  /* =========================================================
     FORM FIELDS
     ========================================================= */

  private getFields(required = true): MasterFormField[] {

    return [

      {
        key: 'code',
        label: 'Code',
        placeholder: 'Code',
        type: 'text',
        required
      },

      {
        key: 'shortForm',
        label: 'Short Form',
        placeholder: 'Short Form',
        type: 'text',
        required
      },

      {
        key: 'description',
        label: 'Description',
        placeholder: 'Description',
        type: 'textarea',
        required: false
      },

      {
        key: 'groupId',
        label: 'GroupID',
        type: 'select',
        required,

        options: this.groupOptions
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
        panelClass: [
          'success-snackbar'
        ]
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
        panelClass: [
          'error-snackbar'
        ]
      }
    );
  }

}