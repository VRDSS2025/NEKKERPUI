import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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
  ProductGroupModel,
  ProductGroup
} from '../../../core/services/product-group';

@Component({
  selector: 'app-group',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './group.html',
  styleUrl: './group.scss'
})
export class GroupComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly dialog = inject(MatDialog);
  private readonly snackBar = inject(MatSnackBar);
  private readonly groupService = inject(ProductGroup);
  private readonly cdr = inject(ChangeDetectorRef);

  /* =====================================================
     TABLE COLUMNS
     ===================================================== */

  columns: MasterColumn[] = [
    {
      key: 'productGroupCode',
      label: 'Group Code'
    },
    {
      key: 'productGroupName',
      label: 'Group Name'
    },
    {
      key: 'description',
      label: 'Description'
    }
  ];

  /* =====================================================
     DATA
     ===================================================== */

  groups: ProductGroupModel[] = [];

  loading = false;

  /* =====================================================
     INIT
     ===================================================== */

  ngOnInit(): void {
    this.loadGroups();
  }

  /* =====================================================
     BACK TO PRODUCTS
     ===================================================== */

  goBack(): void {
    this.router.navigate(['/products']);
  }

  /* =====================================================
     GET GROUPS
     ===================================================== */

  loadGroups(): void {

    this.loading = true;

    this.groupService.getProductGroups().subscribe({

      next: (response) => {

        console.log('Product Groups API Response:', response);

        this.groups = Array.isArray(response)
          ? response
          : [];

        this.loading = false;

        // Ensure list updates immediately
        this.cdr.detectChanges();
      },

      error: (error) => {

        console.error(
          'Failed to load product groups:',
          error
        );

        this.groups = [];
        this.loading = false;

        this.cdr.detectChanges();

        this.showError(
          'Failed to load Product Groups'
        );
      }

    });
  }

  /* =====================================================
     ADD GROUP
     ===================================================== */

  addGroup(): void {

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        autoFocus: false,
        panelClass: 'premium-master-dialog',

        data: this.getFormData('add')
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      const payload: ProductGroupModel = {

        productGroupCode:
          result.productGroupCode?.trim(),

        productGroupName:
          result.productGroupName?.trim(),

        description:
          result.description?.trim() || '',

        createdBy: 'Admin'
      };

      this.loading = true;

      this.groupService
        .createProductGroup(payload)
        .subscribe({

          next: () => {

            this.showSuccess(
              'Product Group added successfully'
            );

            // Reload latest records
            this.loadGroups();
          },

          error: (error) => {

            console.error(
              'Failed to create Product Group:',
              error
            );

            this.loading = false;

            this.showError(
              'Failed to add Product Group'
            );
          }

        });

    });
  }

  /* =====================================================
     FORM DATA
     ===================================================== */

  private getFormData(
    mode: 'add' | 'edit',
    group?: ProductGroupModel
  ): MasterFormDialogData {

    return {

      title:
        mode === 'add'
          ? 'Add Product Group'
          : 'Edit Product Group',

      mode,

      values: group
        ? {
            productGroupCode:
              group.productGroupCode,

            productGroupName:
              group.productGroupName,

            description:
              group.description
          }
        : {},

      fields: [

        {
          key: 'productGroupCode',
          label: 'Product Group Code',
          placeholder: 'Enter product group code',
          type: 'text',
          required: true
        },

        {
          key: 'productGroupName',
          label: 'Product Group Name',
          placeholder: 'Enter product group name',
          type: 'text',
          required: true
        },

        {
          key: 'description',
          label: 'Description',
          placeholder: 'Enter description',
          type: 'textarea',
          required: false
        }

      ]

    };
  }

  /* =====================================================
     VIEW GROUP
     ===================================================== */

  viewGroup(group: ProductGroupModel): void {

    const dialogData: MasterFormDialogData = {

      title: 'Product Group Details',

      mode: 'view',

      values: group,

      fields: [

        {
          key: 'productGroupCode',
          label: 'Product Group Code',
          type: 'text'
        },

        {
          key: 'productGroupName',
          label: 'Product Group Name',
          type: 'text'
        },

        {
          key: 'description',
          label: 'Description',
          type: 'textarea'
        }

      ]

    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
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
        this.editGroup(group);
      }

    });
  }

  /* =====================================================
     EDIT GROUP
     ===================================================== */

  editGroup(group: ProductGroupModel): void {

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',

        data: this.getFormData(
          'edit',
          group
        ),

        autoFocus: false,

        panelClass: 'premium-master-dialog'
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      const isChanged =
        group.productGroupCode !==
          result.productGroupCode ||

        group.productGroupName !==
          result.productGroupName ||

        (group.description || '') !==
          (result.description || '');

      if (!isChanged) {

        this.showError(
          'No changes were made to the Product Group'
        );

        return;
      }

      const payload: ProductGroupModel = {

        ...group,

        productGroupCode:
          result.productGroupCode?.trim(),

        productGroupName:
          result.productGroupName?.trim(),

        description:
          result.description?.trim() || '',

        modifiedBy: 'Admin'
      };

      this.loading = true;

      this.groupService
        .updateProductGroup(
          group.id!,
          payload
        )
        .subscribe({

          next: () => {

            this.showSuccess(
              'Product Group updated successfully'
            );

            // Get fresh data from API
            this.loadGroups();
          },

          error: (error) => {

            console.error(
              'Failed to update Product Group:',
              error
            );

            this.loading = false;

            this.showError(
              'Failed to update Product Group'
            );
          }

        });

    });
  }

  /* =====================================================
     SUCCESS MESSAGE
     ===================================================== */

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

  /* =====================================================
     ERROR MESSAGE
     ===================================================== */

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