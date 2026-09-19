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
  selector: 'app-product-preparation',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './product-preparation.html',
  styleUrl: './product-preparation.scss'
})
export class ProductPreparationComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    { key: 'code', label: 'Code' },
    { key: 'productShortForm', label: 'Product Short Form' },
    { key: 'hscode', label: 'HSCODE' }
  ];

  productPreparations = [
    {
      code: '1001',
      productShortForm: 'R',
      description: 'RAW FROZEN',
      hscode: '030617',
      effectiveFrom: '04/01/2025',
      autoEmailShortForm: 'RAW',
      hsnDescription: 'Raw Processed Shrimp',
      taxRate: '5',
      effectiveTo: '03/31/2050'
    },
    {
      code: '1002',
      productShortForm: 'C',
      description: 'COOKED',
      hscode: '16052900',
      effectiveFrom: '04/03/2015',
      autoEmailShortForm: 'COOKED',
      hsnDescription: 'Cooked Processed Shrimp',
      taxRate: '5',
      effectiveTo: '03/31/2025'
    },
    {
      code: '1003',
      productShortForm: 'B',
      description: 'BOILED',
      hscode: '030617',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'BOILED',
      hsnDescription: 'Boiled Processed Shrimp',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    },
    {
      code: '1004',
      productShortForm: 'M',
      description: 'MARINATED',
      hscode: '030617',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'MARINATED',
      hsnDescription: 'Marinated Shrimp',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    },
    {
      code: '1005',
      productShortForm: 'BR',
      description: 'BREADed',
      hscode: '16052900',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'BREADED',
      hsnDescription: 'Breaded Shrimp',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    },
    {
      code: '1006',
      productShortForm: 'CHILLED',
      description: 'CHILLED',
      hscode: '030617',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'CHILLED',
      hsnDescription: 'Chilled Shrimp',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    },
    {
      code: '1007',
      productShortForm: 'COOKED IN SHELL',
      description: 'COOKED IN SHELL',
      hscode: '16052900',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'COOKED',
      hsnDescription: 'Cooked Shrimp in Shell',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    },
    {
      code: '1008',
      productShortForm: 'CURL CONTROL',
      description: 'CURL CONTROL',
      hscode: '030617',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'CURL',
      hsnDescription: 'Curl Control Shrimp',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    },
    {
      code: '1009',
      productShortForm: 'PDTON RINGS',
      description: 'PDTON RINGS',
      hscode: '160529',
      effectiveFrom: '04/01/2015',
      autoEmailShortForm: 'RINGS',
      hsnDescription: 'PDTON Rings',
      taxRate: '5',
      effectiveTo: '04/02/2015'
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addProductPreparation(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Product Preparation',
      mode: 'add',
      fields: this.getFields()
    };

const dialogRef = this.dialog.open(MasterFormDialogComponent, {
  width: '700px',
  maxWidth: '95vw',
  height: '90vh',
  maxHeight: '90vh',
  data: dialogData,
  autoFocus: false,
  panelClass: 'premium-master-dialog'
});

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.productPreparations = [
        ...this.productPreparations,
        {
          code: result.code,
          productShortForm: result.productShortForm,
          description: result.description,
          hscode: result.hscode,
          effectiveFrom: result.effectiveFrom,
          autoEmailShortForm: result.autoEmailShortForm,
          hsnDescription: result.hsnDescription,
          taxRate: result.taxRate,
          effectiveTo: ''
        }
      ];

      this.showSuccess(
        'Product Preparation added successfully'
      );
    });
  }

  viewProductPreparation(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Product Preparation Details',
      mode: 'view',
      values: item,
      fields: this.getFields(false)
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '850px',
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
        this.editProductPreparation(item);
      }
    });
  }

  editProductPreparation(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Product Preparation',
      mode: 'edit',
      values: {
        code: item.code,
        productShortForm: item.productShortForm,
        description: item.description,
        hscode: item.hscode,
        effectiveFrom: item.effectiveFrom,
        autoEmailShortForm: item.autoEmailShortForm,
        hsnDescription: item.hsnDescription,
        taxRate: item.taxRate
      },
      fields: this.getFields()
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '850px',
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
        item.productShortForm !== result.productShortForm ||
        item.description !== result.description ||
        item.hscode !== result.hscode ||
        item.effectiveFrom !== result.effectiveFrom ||
        item.autoEmailShortForm !== result.autoEmailShortForm ||
        item.hsnDescription !== result.hsnDescription ||
        item.taxRate !== result.taxRate;

      if (!isChanged) {
        this.showError(
          'No changes were made to the Product Preparation'
        );
        return;
      }

      item.code = result.code;
      item.productShortForm = result.productShortForm;
      item.description = result.description;
      item.hscode = result.hscode;
      item.effectiveFrom = result.effectiveFrom;
      item.autoEmailShortForm = result.autoEmailShortForm;
      item.hsnDescription = result.hsnDescription;
      item.taxRate = result.taxRate;

      this.productPreparations = [
        ...this.productPreparations
      ];

      this.showSuccess(
        'Product Preparation updated successfully'
      );
    });
  }

  private getFields(required = true) {

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
        placeholder: 'DD/MM/YYYY',
        type: 'text' as const,
        required
      },
      {
        key: 'hsnDescription',
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
        label: 'Auto Email ShortForm',
        placeholder: 'Enter auto email short form',
        type: 'text' as const,
        required
      },
      {
        key: 'taxRate',
        label: 'Tax Rate in Tally',
        placeholder: 'Enter tax rate',
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