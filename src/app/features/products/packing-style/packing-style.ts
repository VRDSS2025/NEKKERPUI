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
  selector: 'app-packing-style',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './packing-style.html',
  styleUrl: './packing-style.scss'
})
export class PackingStyleComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    {
      key: 'packingCode',
      label: 'Packing Code'
    },
    {
      key: 'uom',
      label: 'UOM'
    },
    {
      key: 'npc',
      label: 'NPC'
    }
  ];

  packingStyles = [
    {
      packingCode: '20x0.75 LBS',
      uom: 'LBS',
      npc: '20',
      noOfInnersPerCarton: '20',
      packSize: '0.75',
      containerWeightCode: '0170',
      grossWt: '17',
      innerPackingWtConvertedToGrams: '340',
      packSizeInKg: '0.3405'
    },
    {
      packingCode: '20x1 LBS',
      uom: 'LBS',
      npc: '20',
      noOfInnersPerCarton: '20',
      packSize: '1',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '6x2 KG',
      uom: 'KG',
      npc: '6',
      noOfInnersPerCarton: '6',
      packSize: '2',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '6x4 LBS',
      uom: 'LBS',
      npc: '6',
      noOfInnersPerCarton: '6',
      packSize: '4',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '10x2 LBS',
      uom: 'LBS',
      npc: '10',
      noOfInnersPerCarton: '10',
      packSize: '2',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '5x2 LBS',
      uom: 'LBS',
      npc: '5',
      noOfInnersPerCarton: '5',
      packSize: '2',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '4x2.5 LBS',
      uom: 'LBS',
      npc: '4',
      noOfInnersPerCarton: '4',
      packSize: '2.5',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '4x5 LBS',
      uom: 'LBS',
      npc: '4',
      noOfInnersPerCarton: '4',
      packSize: '5',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '1x20 LBS',
      uom: 'LBS',
      npc: '1',
      noOfInnersPerCarton: '1',
      packSize: '20',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    },
    {
      packingCode: '6x3 LBS',
      uom: 'LBS',
      npc: '6',
      noOfInnersPerCarton: '6',
      packSize: '3',
      containerWeightCode: '',
      grossWt: '',
      innerPackingWtConvertedToGrams: '',
      packSizeInKg: ''
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addPackingStyle(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Packing Style',
      mode: 'add',

      fields: [
        {
          key: 'packingCode',
          label: 'Packing Code',
          placeholder: 'Enter packing code',
          type: 'text',
          required: true
        },
        {
          key: 'noOfInnersPerCarton',
          label: 'No of Inners per Carton',
          placeholder: 'Enter number of inners',
          type: 'text',
          required: false
        },
        {
          key: 'packSize',
          label: 'Pack Size',
          placeholder: 'Enter pack size',
          type: 'text',
          required: false
        },
        {
          key: 'packSizeInKg',
          label: 'Pack Size Converted to KG',
          placeholder: 'Enter converted pack size',
          type: 'text',
          required: false
        },
        {
          key: 'containerWeightCode',
          label: 'Container Weight Code',
          placeholder: 'Enter container weight code',
          type: 'text',
          required: false
        },
        {
          key: 'uom',
          label: 'UOM',
          type: 'select',
          required: false,
          options: [
            {
              value: 'LBS',
              label: 'LBS'
            },
            {
              value: 'KG',
              label: 'KG'
            }
          ]
        },
        {
          key: 'grossWt',
          label: 'Gross Wt',
          placeholder: 'Enter gross weight',
          type: 'text',
          required: false
        },
        {
          key: 'innerPackingWtConvertedToGrams',
          label: 'Inner Packing Wt Converted to Grams',
          placeholder: 'Enter weight in grams',
          type: 'text',
          required: false
        }
      ]
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

      this.packingStyles = [
        ...this.packingStyles,
        {
          packingCode: result.packingCode,
          uom: result.uom,
          npc: result.noOfInnersPerCarton,
          noOfInnersPerCarton:
            result.noOfInnersPerCarton,
          packSize: result.packSize,
          containerWeightCode:
            result.containerWeightCode,
          grossWt: result.grossWt,
          innerPackingWtConvertedToGrams:
            result.innerPackingWtConvertedToGrams,
          packSizeInKg: result.packSizeInKg
        }
      ];

      this.showSuccess(
        'Packing Style added successfully'
      );
    });
  }

  viewPackingStyle(packingStyle: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Packing Style Details',
      mode: 'view',

      values: packingStyle,

      fields: [
        {
          key: 'packingCode',
          label: 'Packing Code',
          type: 'text'
        },
        {
          key: 'noOfInnersPerCarton',
          label: 'No of Inners per Carton',
          type: 'text'
        },
        {
          key: 'packSize',
          label: 'Pack Size',
          type: 'text'
        },
        {
          key: 'packSizeInKg',
          label: 'Pack Size Converted to KG',
          type: 'text'
        },
        {
          key: 'containerWeightCode',
          label: 'Container Weight Code',
          type: 'text'
        },
        {
          key: 'uom',
          label: 'UOM',
          type: 'select',
          options: [
            {
              value: 'LBS',
              label: 'LBS'
            },
            {
              value: 'KG',
              label: 'KG'
            }
          ]
        },
        {
          key: 'grossWt',
          label: 'Gross Wt',
          type: 'text'
        },
        {
          key: 'innerPackingWtConvertedToGrams',
          label: 'Inner Packing Wt Converted to Grams',
          type: 'text'
        }
      ]
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
        this.editPackingStyle(packingStyle);
      }
    });
  }

  editPackingStyle(packingStyle: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Packing Style',
      mode: 'edit',

      values: {
        packingCode: packingStyle.packingCode,
        noOfInnersPerCarton:
          packingStyle.noOfInnersPerCarton,
        packSize: packingStyle.packSize,
        packSizeInKg: packingStyle.packSizeInKg,
        containerWeightCode:
          packingStyle.containerWeightCode,
        uom: packingStyle.uom,
        grossWt: packingStyle.grossWt,
        innerPackingWtConvertedToGrams:
          packingStyle.innerPackingWtConvertedToGrams
      },

      fields: [
        {
          key: 'packingCode',
          label: 'Packing Code',
          placeholder: 'Enter packing code',
          type: 'text',
          required: true
        },
        {
          key: 'noOfInnersPerCarton',
          label: 'No of Inners per Carton',
          placeholder: 'Enter number of inners',
          type: 'text',
          required: false
        },
        {
          key: 'packSize',
          label: 'Pack Size',
          placeholder: 'Enter pack size',
          type: 'text',
          required: false
        },
        {
          key: 'packSizeInKg',
          label: 'Pack Size Converted to KG',
          placeholder: 'Enter converted pack size',
          type: 'text',
          required: false
        },
        {
          key: 'containerWeightCode',
          label: 'Container Weight Code',
          placeholder: 'Enter container weight code',
          type: 'text',
          required: false
        },
        {
          key: 'uom',
          label: 'UOM',
          type: 'select',
          required: false,
          options: [
            {
              value: 'LBS',
              label: 'LBS'
            },
            {
              value: 'KG',
              label: 'KG'
            }
          ]
        },
        {
          key: 'grossWt',
          label: 'Gross Wt',
          placeholder: 'Enter gross weight',
          type: 'text',
          required: false
        },
        {
          key: 'innerPackingWtConvertedToGrams',
          label: 'Inner Packing Wt Converted to Grams',
          placeholder: 'Enter weight in grams',
          type: 'text',
          required: false
        }
      ]
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
        packingStyle.packingCode !==
          result.packingCode ||
        packingStyle.noOfInnersPerCarton !==
          result.noOfInnersPerCarton ||
        packingStyle.packSize !==
          result.packSize ||
        packingStyle.packSizeInKg !==
          result.packSizeInKg ||
        packingStyle.containerWeightCode !==
          result.containerWeightCode ||
        packingStyle.uom !==
          result.uom ||
        packingStyle.grossWt !==
          result.grossWt ||
        packingStyle.innerPackingWtConvertedToGrams !==
          result.innerPackingWtConvertedToGrams;

      if (!isChanged) {
        this.showError(
          'No changes were made to the Packing Style'
        );

        return;
      }

      packingStyle.packingCode =
        result.packingCode;

      packingStyle.noOfInnersPerCarton =
        result.noOfInnersPerCarton;

      packingStyle.npc =
        result.noOfInnersPerCarton;

      packingStyle.packSize =
        result.packSize;

      packingStyle.packSizeInKg =
        result.packSizeInKg;

      packingStyle.containerWeightCode =
        result.containerWeightCode;

      packingStyle.uom =
        result.uom;

      packingStyle.grossWt =
        result.grossWt;

      packingStyle.innerPackingWtConvertedToGrams =
        result.innerPackingWtConvertedToGrams;

      this.packingStyles = [
        ...this.packingStyles
      ];

      this.showSuccess(
        'Packing Style updated successfully'
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