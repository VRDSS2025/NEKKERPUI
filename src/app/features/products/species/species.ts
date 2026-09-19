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
  selector: 'app-species',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './species.html',
  styleUrl: './species.scss'
})
export class SpeciesComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);


  /* =========================================================
     LIST COLUMNS
     ========================================================= */

  columns: MasterColumn[] = [
    {
      key: 'code',
      label: 'Species Code'
    },
    {
      key: 'name',
      label: 'Species'
    },
    {
      key: 'shortForm',
      label: 'Short Form'
    }
  ];


  /* =========================================================
     PRODUCT SPECIES DATA
     TEMPORARY FRONTEND DATA
     ========================================================= */

  species = [
    {
      code: 'P_1002',
      productGroup: 'SHRIMPS',
      productCommonName: 'BLACK TIGER',
      simpProductCode: '',
      name: 'PENAEUS MONODON',
      shortForm: 'BT',
      scientificName: 'PENAEUS MONODON'
    },

    {
      code: 'V_1001',
      productGroup: 'SHRIMPS',
      productCommonName: '',
      simpProductCode: '',
      name: 'VANNAMEI',
      shortForm: 'V',
      scientificName: ''
    },

    {
      code: 'S_1003',
      productGroup: 'FISH',
      productCommonName: '',
      simpProductCode: '',
      name: 'SEA CAUGHT',
      shortForm: 'SEAWHITE',
      scientificName: ''
    },

    {
      code: 'S_1004',
      productGroup: 'FISH',
      productCommonName: '',
      simpProductCode: '',
      name: 'SEA TIGER',
      shortForm: 'ST',
      scientificName: ''
    },

    {
      code: 'P_1005',
      productGroup: 'SHRIMPS',
      productCommonName: '',
      simpProductCode: '',
      name: 'POOVELAN',
      shortForm: 'PVN',
      scientificName: ''
    },

    {
      code: 'F_1006',
      productGroup: 'FISH',
      productCommonName: '',
      simpProductCode: '',
      name: 'FLOWER',
      shortForm: 'FLWR',
      scientificName: ''
    },

    {
      code: 'P_1007',
      productGroup: 'SHRIMPS',
      productCommonName: '',
      simpProductCode: '',
      name: 'PINK',
      shortForm: 'PINK',
      scientificName: ''
    },

    {
      code: 'B_1008',
      productGroup: 'FISH',
      productCommonName: '',
      simpProductCode: '',
      name: 'BROWN',
      shortForm: 'BRWN',
      scientificName: ''
    },

    {
      code: 'S_1009',
      productGroup: 'FISH',
      productCommonName: '',
      simpProductCode: '',
      name: 'SEA CAUGHT BAMBOO',
      shortForm: 'SEA CAUGHT BAMBOO',
      scientificName: ''
    },

    {
      code: 'S_1010',
      productGroup: 'FISH',
      productCommonName: '',
      simpProductCode: '',
      name: 'SEA WHITE',
      shortForm: 'SEA WHITE',
      scientificName: ''
    }
  ];


  /* =========================================================
     PRODUCT GROUP OPTIONS
     TEMPORARY - WILL COME FROM API LATER
     ========================================================= */

  productGroups = [
    {
      value: 'SHRIMPS',
      label: 'SHRIMPS'
    },

    {
      value: 'FISH',
      label: 'FISH'
    }
  ];


  /* =========================================================
     BACK
     ========================================================= */

  goBack(): void {
    this.router.navigate(['/products']);
  }


  /* =========================================================
     ADD
     ========================================================= */

  addSpecies(): void {

    const dialogData: MasterFormDialogData = {

      title: 'Add Product Species',

      mode: 'add',

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


      this.species = [
        ...this.species,

        {
          code: result.code,
          productGroup: result.productGroup,
          productCommonName: result.productCommonName,
          simpProductCode: result.simpProductCode,
          name: result.name,
          shortForm: result.shortForm,
          scientificName: result.scientificName
        }
      ];


      this.showSuccess(
        'Product Species added successfully'
      );

    });
  }


  /* =========================================================
     VIEW
     ========================================================= */

  viewSpecies(species: any): void {

    const dialogData: MasterFormDialogData = {

      title: 'Product Species',

      mode: 'view',

      values: species,

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

        this.editSpecies(species);

      }

    });
  }


  /* =========================================================
     EDIT
     ========================================================= */

  editSpecies(species: any): void {

    const dialogData: MasterFormDialogData = {

      title: 'Edit Product Species',

      mode: 'edit',

      values: {
        code: species.code,
        productGroup: species.productGroup,
        productCommonName: species.productCommonName,
        simpProductCode: species.simpProductCode,
        name: species.name,
        shortForm: species.shortForm,
        scientificName: species.scientificName
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
        species.code !== result.code ||
        species.productGroup !== result.productGroup ||
        species.productCommonName !== result.productCommonName ||
        species.simpProductCode !== result.simpProductCode ||
        species.name !== result.name ||
        species.shortForm !== result.shortForm ||
        species.scientificName !== result.scientificName;


      if (!isChanged) {

        this.showError(
          'No changes were made to the Product Species'
        );

        return;
      }


      species.code = result.code;
      species.productGroup = result.productGroup;
      species.productCommonName = result.productCommonName;
      species.simpProductCode = result.simpProductCode;
      species.name = result.name;
      species.shortForm = result.shortForm;
      species.scientificName = result.scientificName;


      this.species = [
        ...this.species
      ];


      this.showSuccess(
        'Product Species updated successfully'
      );

    });
  }


  /* =========================================================
     REUSABLE SPECIES FORM FIELDS
     ========================================================= */

  private getFields(required = true) {

    return [

      /* LEFT - ROW 1 */

      {
        key: 'code',
        label: 'Species Code',
        placeholder: 'Species Code',
        type: 'text' as const,
        required
      },


      /* RIGHT - ROW 1 */

      {
        key: 'name',
        label: 'Species',
        placeholder: 'Species',
        type: 'text' as const,
        required
      },


      /* LEFT - ROW 2 */

      {
        key: 'productGroup',
        label: 'Product Group',
        type: 'select' as const,
        required,

        options: this.productGroups
      },


      /* RIGHT - ROW 2 */

      {
        key: 'shortForm',
        label: 'Short Form',
        placeholder: 'Short Form',
        type: 'text' as const,
        required
      },


      /* LEFT - ROW 3 */

      {
        key: 'productCommonName',
        label: 'Product Common Name',
        placeholder: 'Product Common Name',
        type: 'text' as const,
        required
      },


      /* RIGHT - ROW 3 */

      {
        key: 'scientificName',
        label: 'Scientific Name',
        placeholder: 'Scientific Name',
        type: 'text' as const,
        required
      },


      /* LEFT - ROW 4 */

      {
        key: 'simpProductCode',
        label: 'SIMP Product Code',
        placeholder: 'SIMP Product Code',
        type: 'text' as const,
        required: false
      }

    ];
  }


  /* =========================================================
     SUCCESS
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
     ERROR
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