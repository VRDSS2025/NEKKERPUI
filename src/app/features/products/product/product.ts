import { Component, inject, OnInit,ChangeDetectorRef } from '@angular/core';
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
ProductGroup,ProductShortCodes   
} from'../../../core/services/product-group';



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



export class ProductComponent implements OnInit {

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


  products : ProductShortCodes[]= [];


  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts():void{
    this.productService
    .getProductShortCodes()
    .subscribe({
      next : (response) => {
        this.products = 
        Array.isArray(response)
        ? [...response]
        : [];
        this.cdr.detectChanges();
      },
      error : (error) => {
        console.error(
          "Failed to load Product Short Codes:",
          error
        );
        this.products = [];
        this.cdr.detectChanges();
        this.showError(
          "Failed to load Products"
        );
      }
    })
  }

  /* =========================================================
     ADD PRODUCT
     ========================================================= */

      addProduct() : void {
        const dialogData : MasterFormDialogData = {
          title : 'Add Product',
          mode : 'add',
          fields : this.getFields()
        };

        const dialogRef = this.dialog.open(
          MasterFormDialogComponent,
          {
            width : '700px',
            maxWidth : '95vw',
            data : dialogData,
            autoFocus : false,
            panelClass : 'premium-master-dialog'
          }
        );

        dialogRef.afterClosed().subscribe(result =>{
          if(!result){
            return;
          }

              // ================================================
              // PRODUCT SHORT CODE PAYLOAD
              // ================================================

              const payload : ProductShortCodes = {
                code :
                result.code?.trim() || '',
                shortForm :
                result.shortForm?.trim() || '',
                description:
                result.description?.trim() || '',
              };
              
                  // ================================================
                  // CREATE PRODUCT
                  // ================================================
                  this.productService
                  .createProductShortCodes(payload)
                  .subscribe({
                    next : () =>{
                      this.showSuccess(
                      'products added successfully'
                      );

                      //Reload Records From Api

                      this.loadProducts();

                    },
                    error: (error)=>{
                      console.error('Failed to create Product:',error);

                      this.showError('Failed to add Product');
                    }
                  });
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
      
     editProduct(product : ProductShortCodes) : void {
      const dialogData : MasterFormDialogData = {
        title : 'Edit product',
        mode : 'edit',

        values : {
           code : product.code,
           shortForm : product.shortForm,
           description : product.description
        },
        fields:this.getFields()
      };
      const dialogRef = this.dialog.open(
        MasterFormDialogComponent,{
          width : '700px',
          maxWidth : '90vw',
          data : dialogData,
          autoFocus : false,
          panelClass : 'Premium-master-dialog'
        }
      );
      dialogRef.afterClosed().subscribe(result => {
        if(!result){
          return;
        }

            // ================================================
            // CHECK CHANGES
            // ================================================

            const isChanged = 
            product.code !== result.code ||
            product.shortForm !== result.shortForm ||
           ( product.description || '') !== ( result.description || '' );
           
           if(!isChanged){
            this.showError('No changes were made to the product');
            return;
           }

                // ================================================
                // UPDATE PAYLOAD
                // ================================================

                const payload :ProductShortCodes = {
                  code :
                  result.code?.trim() || '',
                  shortForm :
                  result.shortForm?.trim() || '',
                  description :
                  result.description?.trim() || ''
                };
                  // ================================================
                  // UPDATE PRODUCT
                  // ================================================

                  this.productService
                  .updateProductShortCodes(
                    product.id!,
                    payload
                  )
                  .subscribe({
                    next: ()=>{
                      this.showSuccess('Product update succesfully');

                      //Reaload latest Record from Api

                      this.loadProducts();

                    },
                    error:(error)=>{
                      console.error('Failed to update product:',error);
                      this.showError('Failed to update product');
                    }
                  });
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