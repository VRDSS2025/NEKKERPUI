import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
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
  MasterFormDialogData
} from '../../../shared/components/master-form-dialog/master-form-dialog';

import {
  ProductGroup,
  ProductSpecies
} from '../../../core/services/product-group';


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
export class SpeciesComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);

  private readonly productService = inject(ProductGroup);


  // =====================================================
  // TABLE COLUMNS
  // =====================================================

  columns: MasterColumn[] = [
    {
      key: 'speciesCode',
      label: 'Species Code'
    },
    {
      key: 'species',
      label: 'Species'
    },
    {
      key: 'shortForm',
      label: 'Short Form'
    }
  ];


  // =====================================================
  // DATA
  // =====================================================

  species: ProductSpecies[] = [];

  productGroups: {
    value: number;
    label: string;
  }[] = [];

  loading = false;


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadProductGroups();
    this.loadSpecies();

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate(['/products']);

  }


  // =====================================================
  // LOAD PRODUCT GROUPS
  // =====================================================

  loadProductGroups(): void {

    this.productService
      .getProductGroups()
      .subscribe({

        next: (response) => {

          this.productGroups =
            (response ?? [])
              .filter(group => group.id != null)
              .map(group => ({
                value: Number(group.id),
                label: group.productGroupName
              }));

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Failed to load Product Groups:',
            error
          );

          this.productGroups = [];

          this.showError(
            'Failed to load Product Groups'
          );

        }

      });

  }


  // =====================================================
  // LOAD PRODUCT SPECIES
  // =====================================================

  loadSpecies(): void {

    this.productService
      .getProductSpecies()
      .subscribe({

        next: (response) => {

          this.species =
            Array.isArray(response)
              ? [...response]
              : [];

          this.cdr.detectChanges();

        },

        error: (error) => {

          console.error(
            'Failed to load Product Species:',
            error
          );

          this.species = [];

          this.cdr.detectChanges();

          this.showError(
            'Failed to load Product Species'
          );

        }

      });

  }


  // =====================================================
  // ADD PRODUCT SPECIES
  // =====================================================

  addSpecies(): void {

    const dialogData: MasterFormDialogData = {

      title: 'Add Product Species',

      mode: 'add',

      fields: this.getFields()

    };


    const dialogRef =
      this.dialog.open(
        MasterFormDialogComponent,
        {
          width: '850px',
          maxWidth: '95vw',
          data: dialogData,
          autoFocus: false,
          panelClass: 'premium-master-dialog'
        }
      );


    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }


        // =================================================
        // PRODUCT GROUP ID
        // =================================================

        const productGroupId =
          this.getProductGroupId(
            result.productGroupId
          );


        if (productGroupId === null) {

          this.showError(
            'Please select a Product Group'
          );

          return;

        }


        // =================================================
        // PRODUCT SPECIES PAYLOAD
        // =================================================

        const payload: ProductSpecies = {

          speciesCode:
            result.speciesCode?.trim() || '',

          productGroupId:
            productGroupId,

          productCommonName:
            result.productCommonName?.trim() || '',

          simpProductCode:
            result.simpProductCode?.trim() || '',

          species:
            result.species?.trim() || '',

          shortForm:
            result.shortForm?.trim() || '',

          scientificName:
            result.scientificName?.trim() || ''

        };


        // =================================================
        // CREATE PRODUCT SPECIES
        // =================================================

        this.loading = true;

        this.productService
          .createProductSpecies(payload)
          .subscribe({

            next: () => {

              this.loading = false;

              this.showSuccess(
                'Product Species added successfully'
              );

              this.loadSpecies();

            },

            error: (error) => {

              this.loading = false;

              console.error(
                'Failed to create Product Species:',
                error
              );

              this.showError(
                'Failed to add Product Species'
              );

            }

          });

      });

  }


  // =====================================================
  // GET PRODUCT GROUP ID
  // =====================================================

  private getProductGroupId(
    value: unknown
  ): number | null {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {

      return null;

    }


    if (typeof value === 'number') {

      return Number.isInteger(value) &&
        value > 0
        ? value
        : null;

    }


    if (typeof value === 'string') {

      const id = Number(value);

      return Number.isInteger(id) &&
        id > 0
        ? id
        : null;

    }


    if (
      typeof value === 'object' &&
      value !== null
    ) {

      const option =
        value as {
          value?: unknown;
          id?: unknown;
        };

      const id =
        Number(
          option.value ??
          option.id
        );

      return Number.isInteger(id) &&
        id > 0
        ? id
        : null;

    }


    return null;

  }


  // =====================================================
  // VIEW PRODUCT SPECIES
  // =====================================================

  viewSpecies(
    species: ProductSpecies
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Product Species Details',

      mode: 'view',

      values: species,

      fields: this.getFields(false)

    };


    const dialogRef =
      this.dialog.open(
        MasterFormDialogComponent,
        {
          width: '850px',
          maxWidth: '95vw',
          data: dialogData,
          autoFocus: false,
          panelClass: 'premium-master-dialog'
        }
      );


    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (
          result?.action === 'edit'
        ) {

          this.editSpecies(species);

        }

      });

  }


  // =====================================================
  // EDIT PRODUCT SPECIES
  // =====================================================

  editSpecies(
    species: ProductSpecies
  ): void {

    const dialogData: MasterFormDialogData = {

      title: 'Edit Product Species',

      mode: 'edit',

      values: {

        speciesCode:
          species.speciesCode,

        productGroupId:
          species.productGroupId,

        productCommonName:
          species.productCommonName,

        simpProductCode:
          species.simpProductCode,

        species:
          species.species,

        shortForm:
          species.shortForm,

        scientificName:
          species.scientificName

      },

      fields:
        this.getFields()

    };


    const dialogRef =
      this.dialog.open(
        MasterFormDialogComponent,
        {
          width: '850px',
          maxWidth: '95vw',
          data: dialogData,
          autoFocus: false,
          panelClass: 'premium-master-dialog'
        }
      );


    dialogRef
      .afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }


        const productGroupId =
          this.getProductGroupId(
            result.productGroupId
          );


        if (productGroupId === null) {

          this.showError(
            'Please select a Product Group'
          );

          return;

        }


        const payload: ProductSpecies = {

          ...species,

          speciesCode:
            result.speciesCode?.trim() || '',

          productGroupId:
            productGroupId,

          productCommonName:
            result.productCommonName?.trim() || '',

          simpProductCode:
            result.simpProductCode?.trim() || '',

          species:
            result.species?.trim() || '',

          shortForm:
            result.shortForm?.trim() || '',

          scientificName:
            result.scientificName?.trim() || ''

        };


        this.loading = true;


        this.productService
          .updateProductSpecies(
            species.id!,
            payload
          )
          .subscribe({

            next: () => {

              this.loading = false;

              this.showSuccess(
                'Product Species updated successfully'
              );

              this.loadSpecies();

            },

            error: (error) => {

              this.loading = false;

              console.error(
                'Failed to update Product Species:',
                error
              );

              this.showError(
                'Failed to update Product Species'
              );

            }

          });

      });

  }


  // =====================================================
  // FORM FIELDS
  // =====================================================

  private getFields(
    required = true
  ) {

    return [

      {
        key: 'speciesCode',
        label: 'Species Code',
        placeholder: 'Species Code',
        type: 'text' as const,
        required
      },

      {
        key: 'species',
        label: 'Species',
        placeholder: 'Species',
        type: 'text' as const,
        required
      },

      {
        key: 'productGroupId',
        label: 'Product Group',
        type: 'select' as const,
        required,
        options: this.productGroups
      },

      {
        key: 'shortForm',
        label: 'Short Form',
        placeholder: 'Short Form',
        type: 'text' as const,
        required
      },

      {
        key: 'productCommonName',
        label: 'Product Common Name',
        placeholder: 'Product Common Name',
        type: 'text' as const,
        required
      },

      {
        key: 'scientificName',
        label: 'Scientific Name',
        placeholder: 'Scientific Name',
        type: 'text' as const,
        required
      },

      {
        key: 'simpProductCode',
        label: 'SIMP Product Code',
        placeholder: 'SIMP Product Code',
        type: 'text' as const,
        required: false
      }

    ];

  }


  // =====================================================
  // SUCCESS MESSAGE
  // =====================================================

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


  // =====================================================
  // ERROR MESSAGE
  // =====================================================

  private showError(
    message: string
  ): void {

    this.snackBar.open(
      message,
      'Close',
      {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      }
    );

  }

}