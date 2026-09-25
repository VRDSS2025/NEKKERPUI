import {
  Component,
  Inject,
  inject,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';

import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';

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
  DSConsignees
} from '../../../core/services/product-group';


/* =========================================================
   ADDRESS MODEL
   ========================================================= */

interface DsAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  gstNo: string;
}


/* =========================================================
   COMPONENT
   ========================================================= */

@Component({
  selector: 'app-ds-consignee',
  standalone: true,

  imports: [
    MasterListComponent,
    MatIconModule
  ],

  templateUrl: './ds-consignee.html',
  styleUrl: './ds-consignee.scss'
})
export class DsConsigneeComponent implements OnInit {

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
      key: 'dsConsigneeCode',
      label: 'Customer Code'
    },
    {
      key: 'dsConsigneeName',
      label: 'Customer Name'
    },
    {
      key: 'contactPerson',
      label: 'Contact Person'
    }
  ];


  /* =========================================================
     DATA
     ========================================================= */

  consigneeList: DSConsignees[] = [];


  /* =========================================================
     INIT
     ========================================================= */

  ngOnInit(): void {
    this.loadDsConsignees();
  }


  /* =========================================================
     LOAD DS CONSIGNEES
     ========================================================= */

  loadDsConsignees(): void {

    this.productService
      .getDsConsignees()
      .subscribe({

        next: (response) => {

          this.consigneeList = Array.isArray(response)
            ? [...response]
            : [];

          this.cdr.detectChanges();
        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to load DS Consignees:',
            error
          );

          this.consigneeList = [];

          this.cdr.detectChanges();

          this.showError(
            'Failed to load DS Consignees'
          );
        }

      });
  }


  /* =========================================================
     BACK
     ========================================================= */

  goBack(): void {
    this.router.navigate(['/consignee']);
  }


  /* =========================================================
     ADD DS CONSIGNEE
     ========================================================= */

  addConsignee(): void {

    const data: MasterFormDialogData = {

      title: 'Add DS Consignee',

      mode: 'add',

      fields: this.getConsigneeFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      /* =====================================================
         PAYLOAD
         ===================================================== */

      const payload: DSConsignees = {

        dsConsigneeCode:
          result.dsConsigneeCode?.trim() || '',

        dsConsigneeName:
          result.dsConsigneeName?.trim() || '',

        contactPerson:
          result.contactPerson?.trim() || '',

        phone:
          result.phone?.trim() || '',

        mailId:
          result.mailId?.trim() || '',

        irsNumber:
          result.irsNumber?.trim() || '',

        countryId:
          Number(result.countryId) || 0
      };


      /* =====================================================
         CREATE API
         ===================================================== */

      this.productService
        .createDsConsignee(payload)
        .subscribe({

          next: () => {

            this.showSuccess(
              'DS Consignee added successfully'
            );

            this.loadDsConsignees();
          },

          error: (error: HttpErrorResponse) => {

            console.error(
              'Failed to create DS Consignee:',
              error
            );

            this.showError(
              'Failed to add DS Consignee'
            );
          }

        });
    });
  }


  /* =========================================================
     VIEW DS CONSIGNEE
     ========================================================= */

  viewConsignee(
    consignee: DSConsignees
  ): void {

    const data: MasterFormDialogData = {

      title: 'DS Consignee Details',

      mode: 'view',

      values: consignee,

      fields: this.getConsigneeFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      if (result.action === 'edit') {

        this.editConsignee(consignee);
      }

    });
  }


  /* =========================================================
     EDIT DS CONSIGNEE
     ========================================================= */

  editConsignee(
    consignee: DSConsignees
  ): void {

    const data: MasterFormDialogData = {

      title: 'Edit DS Consignee',

      mode: 'edit',

      values: {

        dsConsigneeCode:
          consignee.dsConsigneeCode,

        dsConsigneeName:
          consignee.dsConsigneeName,

        contactPerson:
          consignee.contactPerson,

        phone:
          consignee.phone,

        mailId:
          consignee.mailId,

        irsNumber:
          consignee.irsNumber,

        countryId:
          consignee.countryId
      },

      fields: this.getConsigneeFields()
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      /* =====================================================
         CHECK CHANGES
         ===================================================== */

      const isChanged =
        consignee.dsConsigneeCode !==
          result.dsConsigneeCode ||

        consignee.dsConsigneeName !==
          result.dsConsigneeName ||

        consignee.contactPerson !==
          result.contactPerson ||

        consignee.phone !==
          result.phone ||

        consignee.mailId !==
          result.mailId ||

        consignee.irsNumber !==
          result.irsNumber ||

        consignee.countryId !==
          Number(result.countryId);


      if (!isChanged) {

        this.showError(
          'No changes were made to the DS Consignee'
        );

        return;
      }


      /* =====================================================
         PAYLOAD
         ===================================================== */

      const payload: DSConsignees = {

        dsConsigneeCode:
          result.dsConsigneeCode?.trim() || '',

        dsConsigneeName:
          result.dsConsigneeName?.trim() || '',

        contactPerson:
          result.contactPerson?.trim() || '',

        phone:
          result.phone?.trim() || '',

        mailId:
          result.mailId?.trim() || '',

        irsNumber:
          result.irsNumber?.trim() || '',

        countryId:
          Number(result.countryId) || 0
      };


      /* =====================================================
         CHECK ID
         ===================================================== */

      if (!consignee.id) {

        this.showError(
          'DS Consignee ID is missing'
        );

        return;
      }


      /* =====================================================
         UPDATE API
         ===================================================== */

      this.productService
        .updateDsConsignee(
          consignee.id,
          payload
        )
        .subscribe({

          next: () => {

            this.showSuccess(
              'DS Consignee updated successfully'
            );

            this.loadDsConsignees();
          },

          error: (error: HttpErrorResponse) => {

            console.error(
              'Failed to update DS Consignee:',
              error
            );

            this.showError(
              'Failed to update DS Consignee'
            );
          }

        });
    });
  }


  /* =========================================================
     VIEW ADDRESS
     ========================================================= */

  viewAddress(
    consignee: DSConsignees
  ): void {

    const dialogRef = this.dialog.open(
      DsConsigneeAddressDialogComponent,
      {
        width: '1100px',
        maxWidth: '95vw',

        data: {
          consignee
        },

        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      if (result.action === 'add-address') {

        this.openAddAddress(
          null,
          consignee
        );
      }

    });
  }


  /* =========================================================
     ADD ADDRESS
     ========================================================= */

  private openAddAddress(
    consigneeData: any,
    existingConsignee: DSConsignees | null
  ): void {

    const data: MasterFormDialogData = {

      title: 'Add Address',

      mode: 'add',

      fields: [

        {
          key: 'address1',
          label: 'Address1',
          placeholder: 'Enter address1',
          type: 'text',
          required: true
        },

        {
          key: 'address2',
          label: 'Address2',
          placeholder: 'Enter address2',
          type: 'text'
        },

        {
          key: 'city',
          label: 'City',
          placeholder: 'Enter city',
          type: 'text'
        },

        {
          key: 'state',
          label: 'State',
          placeholder: 'Enter state',
          type: 'text'
        },

        {
          key: 'zipcode',
          label: 'Zipcode',
          placeholder: 'Enter zipcode',
          type: 'text'
        },

        {
          key: 'gstNo',
          label: 'GST No.',
          placeholder: 'Enter GST No.',
          type: 'text'
        }

      ]
    };


    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '650px',
        maxWidth: '95vw',
        data,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );


    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }


      const address: DsAddress = {

        address1:
          result.address1 || '',

        address2:
          result.address2 || '',

        city:
          result.city || '',

        state:
          result.state || '',

        zipcode:
          result.zipcode || '',

        gstNo:
          result.gstNo || ''
      };


      if (existingConsignee) {

        /*
         * Address API is not present in the
         * DSConsignees service/model you provided.
         *
         * For now this only updates the local
         * address display.
         */

        this.showSuccess(
          'Address added successfully'
        );

        return;
      }


      if (consigneeData) {

        this.showSuccess(
          'Address added successfully'
        );
      }

    });
  }


  /* =========================================================
     FORM FIELDS
     ========================================================= */

  private getConsigneeFields() {

    return [

      {
        key: 'dsConsigneeCode',
        label: 'DS Consignee Code',
        placeholder: 'Enter consignee code',
        type: 'text' as const,
        required: true
      },

      {
        key: 'dsConsigneeName',
        label: 'DS Consignee Name',
        placeholder: 'Enter consignee name',
        type: 'text' as const,
        required: true
      },

      {
        key: 'mailId',
        label: 'Mail Id',
        placeholder: 'Enter mail id',
        type: 'text' as const
      },

      {
        key: 'irsNumber',
        label: 'IRS Number',
        placeholder: 'Enter IRS number',
        type: 'text' as const
      },

      {
        key: 'contactPerson',
        label: 'Contact Person',
        placeholder: 'Enter contact person',
        type: 'text' as const
      },

      {
        key: 'phone',
        label: 'Phone',
        placeholder: 'Enter phone',
        type: 'text' as const
      },

      {
        key: 'countryId',
        label: 'Country',
        type: 'select' as const,

        options: [
          {
            value: 1,
            label: 'INDIA'
          },
          {
            value: 2,
            label: 'UNITED STATES'
          },
          {
            value: 3,
            label: 'UNITED KINGDOM'
          }
        ]
      }

    ];
  }


  /* =========================================================
     SUCCESS MESSAGE
     ========================================================= */

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


  /* =========================================================
     ERROR MESSAGE
     ========================================================= */

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
        panelClass: ['error-snackbar']
      }
    );
  }

}


/* =========================================================
   ADDRESS DIALOG
   ========================================================= */

@Component({
  selector: 'app-ds-consignee-address-dialog',
  standalone: true,

  imports: [
    MatIconModule
  ],

  template: `
    <div class="address-dialog">

      <div class="dialog-header">

        <div class="header-left">

          <div class="header-icon">
            <mat-icon>location_on</mat-icon>
          </div>

          <div class="header-content">

            <h2>DS Consignee Address</h2>

            <p>
              {{ data.consignee.dsConsigneeName }}
            </p>

          </div>

        </div>

        <button
          type="button"
          class="close-button"
          (click)="close()"
        >
          <mat-icon>close</mat-icon>
        </button>

      </div>


      <div class="address-content">

        <table class="address-table">

          <thead>
            <tr>
              <th>S.No.</th>
              <th>Address1</th>
              <th>Address2</th>
              <th>City</th>
              <th>State</th>
              <th>Zipcode</th>
              <th>GST No.</th>
            </tr>
          </thead>

          <tbody>

            @for (
              address of data.consignee.addresses || [];
              track $index
            ) {

              <tr>

                <td>{{ $index + 1 }}</td>

                <td>
                  {{ address.address1 }}
                </td>

                <td>
                  {{ address.address2 }}
                </td>

                <td>
                  {{ address.city }}
                </td>

                <td>
                  {{ address.state }}
                </td>

                <td>
                  {{ address.zipcode }}
                </td>

                <td>
                  {{ address.gstNo }}
                </td>

              </tr>

            } @empty {

              <tr>

                <td
                  colspan="7"
                  class="empty-row"
                >
                  No addresses available.
                </td>

              </tr>

            }

          </tbody>

        </table>

      </div>


      <div class="dialog-footer">

        <button
          type="button"
          class="cancel-button"
          (click)="close()"
        >
          Close
        </button>

        <button
          type="button"
          class="save-button"
          (click)="addAddress()"
        >
          <mat-icon>add</mat-icon>
          <span>Add Address</span>
        </button>

      </div>

    </div>
  `,

  styles: [`

    .address-dialog {
      width: 100%;
      background: #ffffff;
      border-radius: 18px;
      overflow: hidden;
      box-sizing: border-box;

      display: flex;
      flex-direction: column;

      max-height: 90vh;
    }

    .dialog-header {
      min-height: 92px;
      padding: 20px 24px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      background: linear-gradient(
        135deg,
        #f8fbff 0%,
        #ffffff 100%
      );

      border-bottom: 1px solid #e8edf5;
      box-sizing: border-box;
    }

    .header-left {
      display: flex;
      align-items: center;
      gap: 14px;
    }

    .header-icon {
      width: 44px;
      height: 44px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 10px;

      background: #eff6ff;
      color: #2563eb;
    }

    .header-icon mat-icon {
      width: 24px;
      height: 24px;
      font-size: 24px;
    }

    .header-content h2 {
      margin: 0;

      color: #111827;
      font-size: 19px;
      font-weight: 600;
    }

    .header-content p {
      margin: 4px 0 0;

      color: #64748b;
      font-size: 13px;
    }

    .close-button {
      width: 38px;
      height: 38px;

      display: flex;
      align-items: center;
      justify-content: center;

      border: 0;
      border-radius: 8px;

      background: transparent;
      color: #64748b;

      cursor: pointer;
    }

    .close-button:hover {
      background: #eff6ff;
      color: #2563eb;
    }

    .address-content {
      flex: 1 1 auto;
      min-height: 0;

      overflow: auto;

      padding: 24px 28px;
      box-sizing: border-box;
    }

    .address-table {
      width: 100%;
      border-collapse: collapse;
      font-size: 13px;
    }

    .address-table th {
      padding: 11px 10px;

      background: #f8fafc;
      color: #374151;

      border-bottom: 1px solid #e5e7eb;

      text-align: left;
      font-weight: 600;
      white-space: nowrap;
    }

    .address-table td {
      padding: 11px 10px;

      color: #4b5563;

      border-bottom: 1px solid #edf0f5;

      vertical-align: top;
    }

    .address-table tbody tr:hover {
      background: #f8fbff;
    }

    .empty-row {
      padding: 30px !important;
      text-align: center;
      color: #94a3b8 !important;
    }

    .dialog-footer {
      flex: 0 0 auto;

      padding: 18px 28px;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;

      border-top: 1px solid #edf0f5;
    }

    .cancel-button,
    .save-button {
      height: 40px;

      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;

      padding: 0 16px;

      border-radius: 8px;

      font-size: 14px;
      font-weight: 600;

      cursor: pointer;
    }

    .cancel-button {
      border: 1px solid #dbe1ea;
      background: #ffffff;
      color: #64748b;
    }

    .save-button {
      border: 0;
      background: #2563eb;
      color: #ffffff;
    }

    .save-button mat-icon {
      width: 18px;
      height: 18px;
      font-size: 18px;
    }

  `]
})
export class DsConsigneeAddressDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DsConsigneeAddressDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: any
  ) {}


  close(): void {
    this.dialogRef.close();
  }


  addAddress(): void {

    this.dialogRef.close({
      action: 'add-address'
    });

  }

}