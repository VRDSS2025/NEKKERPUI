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
  selector: 'app-domestic-sales',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './domestic-sales.html',
  styleUrl: './domestic-sales.scss'
})
export class DomesticSalesComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    {
      key: 'description',
      label: 'Description'
    },
    {
      key: 'hsnCode',
      label: 'HSNCode'
    }
  ];

  domesticSales = [
    {
      description: 'PRAWNS IQF FROZEN (UN-BRANDED)',
      hsnCode: '03061100',
      preparation: '',
      productDescription: '',
      productDesc: '',
      label1: '',
      label2: '',
      label3: '',
      label4: ''
    },
    {
      description: 'RAW FROZEN PEELED & DEVEINED TAIL OFF',
      hsnCode: '030617',
      preparation: '',
      productDescription: '',
      productDesc: '',
      label1: 'RAW FROZEN',
      label2: 'RAW FROZEN PEELED & DEVE',
      label3: '',
      label4: ''
    },
    {
      description: 'FROZEN SHRIMP SALES',
      hsnCode: '03061720',
      preparation: '',
      productDescription: '',
      productDesc: '',
      label1: '',
      label2: '',
      label3: '',
      label4: ''
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addDomesticSale(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Domestic Sales',
      mode: 'add',

      fields: [
        {
          key: 'preparation',
          label: 'Preparation',
          placeholder: 'Enter preparation',
          type: 'text',
          required: false
        },
        {
          key: 'productDescription',
          label: 'Product Description',
          placeholder: 'Enter product description',
          type: 'text',
          required: false
        },
        {
          key: 'productDesc',
          label: 'Product Desc.',
          type: 'select',
          required: true,
          options: [
            {
              value: 'V_HLSO',
              label: 'V_HLSO'
            },
            {
              value: 'Ezp_IQF_R_NWNC_Yes',
              label: 'Ezp_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_PDTAILON_IQF_R_NWNC_Yes',
              label: 'V_PDTAILON_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_PDTAILOFF_IQF_R_NWNC_Yes',
              label: 'V_PDTAILOFF_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_HLSO_BLOCK_R_NWNC',
              label: 'V_HLSO_BLOCK_R_NWNC'
            }
          ]
        },
        {
          key: 'label1',
          label: 'Label 1',
          placeholder: 'Enter label 1',
          type: 'text',
          required: false
        },
        {
          key: 'label2',
          label: 'Label 2',
          placeholder: 'Enter label 2',
          type: 'text',
          required: false
        },
        {
          key: 'label3',
          label: 'Label 3',
          placeholder: 'Enter label 3',
          type: 'text',
          required: false
        },
        {
          key: 'label4',
          label: 'Label 4',
          placeholder: 'Enter label 4',
          type: 'text',
          required: false
        },
        {
          key: 'hsnCode',
          label: 'HSN Code',
          placeholder: 'Enter HSN code',
          type: 'text',
          required: false
        }
      ]
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '750px',
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

      this.domesticSales = [
        ...this.domesticSales,
        {
          description:
            result.productDescription,

          hsnCode:
            result.hsnCode,

          preparation:
            result.preparation,

          productDescription:
            result.productDescription,

          productDesc:
            result.productDesc,

          label1:
            result.label1,

          label2:
            result.label2,

          label3:
            result.label3,

          label4:
            result.label4
        }
      ];

      this.showSuccess(
        'Domestic Sales added successfully'
      );
    });
  }

  viewDomesticSale(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Domestic Sales Details',
      mode: 'view',

      values: item,

      fields: [
        {
          key: 'preparation',
          label: 'Preparation',
          type: 'text'
        },
        {
          key: 'productDescription',
          label: 'Product Description',
          type: 'text'
        },
        {
          key: 'productDesc',
          label: 'Product Desc.',
          type: 'select',
          options: [
            {
              value: 'V_HLSO',
              label: 'V_HLSO'
            },
            {
              value: 'Ezp_IQF_R_NWNC_Yes',
              label: 'Ezp_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_PDTAILON_IQF_R_NWNC_Yes',
              label: 'V_PDTAILON_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_PDTAILOFF_IQF_R_NWNC_Yes',
              label: 'V_PDTAILOFF_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_HLSO_BLOCK_R_NWNC',
              label: 'V_HLSO_BLOCK_R_NWNC'
            }
          ]
        },
        {
          key: 'label1',
          label: 'Label 1',
          type: 'text'
        },
        {
          key: 'label2',
          label: 'Label 2',
          type: 'text'
        },
        {
          key: 'label3',
          label: 'Label 3',
          type: 'text'
        },
        {
          key: 'label4',
          label: 'Label 4',
          type: 'text'
        },
        {
          key: 'hsnCode',
          label: 'HSN Code',
          type: 'text'
        }
      ]
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '750px',
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
        this.editDomesticSale(item);
      }
    });
  }

  editDomesticSale(item: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Domestic Sales',
      mode: 'edit',

      values: {
        preparation: item.preparation,
        productDescription: item.productDescription,
        productDesc: item.productDesc,
        label1: item.label1,
        label2: item.label2,
        label3: item.label3,
        label4: item.label4,
        hsnCode: item.hsnCode
      },

      fields: [
        {
          key: 'preparation',
          label: 'Preparation',
          placeholder: 'Enter preparation',
          type: 'text',
          required: false
        },
        {
          key: 'productDescription',
          label: 'Product Description',
          placeholder: 'Enter product description',
          type: 'text',
          required: false
        },
        {
          key: 'productDesc',
          label: 'Product Desc.',
          type: 'select',
          required: true,
          options: [
            {
              value: 'V_HLSO',
              label: 'V_HLSO'
            },
            {
              value: 'Ezp_IQF_R_NWNC_Yes',
              label: 'Ezp_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_PDTAILON_IQF_R_NWNC_Yes',
              label: 'V_PDTAILON_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_PDTAILOFF_IQF_R_NWNC_Yes',
              label: 'V_PDTAILOFF_IQF_R_NWNC_Yes'
            },
            {
              value: 'V_HLSO_BLOCK_R_NWNC',
              label: 'V_HLSO_BLOCK_R_NWNC'
            }
          ]
        },
        {
          key: 'label1',
          label: 'Label 1',
          placeholder: 'Enter label 1',
          type: 'text',
          required: false
        },
        {
          key: 'label2',
          label: 'Label 2',
          placeholder: 'Enter label 2',
          type: 'text',
          required: false
        },
        {
          key: 'label3',
          label: 'Label 3',
          placeholder: 'Enter label 3',
          type: 'text',
          required: false
        },
        {
          key: 'label4',
          label: 'Label 4',
          placeholder: 'Enter label 4',
          type: 'text',
          required: false
        },
        {
          key: 'hsnCode',
          label: 'HSN Code',
          placeholder: 'Enter HSN code',
          type: 'text',
          required: false
        }
      ]
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '750px',
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
        item.preparation !== result.preparation ||
        item.productDescription !==
          result.productDescription ||
        item.productDesc !== result.productDesc ||
        item.label1 !== result.label1 ||
        item.label2 !== result.label2 ||
        item.label3 !== result.label3 ||
        item.label4 !== result.label4 ||
        item.hsnCode !== result.hsnCode;

      if (!isChanged) {
        this.showError(
          'No changes were made to Domestic Sales'
        );

        return;
      }

      item.preparation =
        result.preparation;

      item.productDescription =
        result.productDescription;

      item.description =
        result.productDescription;

      item.productDesc =
        result.productDesc;

      item.label1 =
        result.label1;

      item.label2 =
        result.label2;

      item.label3 =
        result.label3;

      item.label4 =
        result.label4;

      item.hsnCode =
        result.hsnCode;

      this.domesticSales = [
        ...this.domesticSales
      ];

      this.showSuccess(
        'Domestic Sales updated successfully'
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