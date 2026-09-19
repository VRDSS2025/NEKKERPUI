import { Component, Inject, inject } from '@angular/core';
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

interface DsConsignee {
  code: string;
  name: string;
  contactPerson: string;
  mailId: string;
  irsNumber: string;
  phone: string;
  country: string;
  addresses: DsAddress[];
}

interface DsAddress {
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipcode: string;
  gstNo: string;
}

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
export class DsConsigneeComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    {
      key: 'code',
      label: 'Customer Code'
    },
    {
      key: 'name',
      label: 'Customer Name'
    },
    {
      key: 'contactPerson',
      label: 'Contact Person'
    }
  ];

  consigneeList: DsConsignee[] = [
    {
      code: 'BARBEQUE N',
      name: 'BARBEQUE NATION HOSPITALITY LTD',
      contactPerson: 'MR.LEE BLOOM',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: [
        {
          address1: 'EAST BLOCK, 1ST FLOOR, D.NO.7-8-10',
          address2: 'PANDURANGAPURAM, WARD NO.18, VISAKHAPATNAM',
          city: '',
          state: '',
          zipcode: '',
          gstNo: '37AAKCS3053N1ZV'
        },
        {
          address1: 'WESTERN FARMFRESH PVT LTD,C/O HARICULTURE DEPT',
          address2: 'DOUBLE ROAD ENTRANCE,LALBAG GARDEN',
          city: '',
          state: 'BANGALORE',
          zipcode: '',
          gstNo: '29AAKCS3053N1ZS'
        },
        {
          address1: 'WESTERN FARMFRESH PVT LTD, NO 37',
          address2: 'VARADARAJAPURAM, POONAMALLE, CHENNAI',
          city: '',
          state: '',
          zipcode: '',
          gstNo: '33AAKCS3053N1Z3'
        }
      ]
    },
    {
      code: 'BARBEQUE-NAT',
      name: 'BARBEQUE-NATION RESTAURANT LLC',
      contactPerson: 'MS.CHRISTINA OH',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'NEKKANTICONS',
      name: 'NEKKANTICONSUMER FOODS PRIVATE LIMITED',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'PISCES SEAFO',
      name: 'PISCES SEAFOOD',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'DASPALLA GLO',
      name: 'DASPALLA GLOBAL HOTELS PRIVATE LIMITED',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'DASPALLA HOT',
      name: 'DASPALLA HOTELS PRIVATE LIMITED',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'DASPALLA RES',
      name: 'DASPALLA RESORTS PRIVATE LIMITED',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'HIMANSHU BEH',
      name: 'HIMANSHU BEHRA',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'SUNFISH COMP',
      name: 'SUNFISH COMPANY',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    },
    {
      code: 'Vanapalli Ra',
      name: 'Vanapalli Ravichandra Kumar',
      contactPerson: '',
      mailId: '',
      irsNumber: '',
      phone: '',
      country: 'INDIA',
      addresses: []
    }
  ];

  goBack(): void {
    this.router.navigate(['/consignee']);
  }

  addConsignee(): void {

    const data: MasterFormDialogData = {
      title: 'Add DS Consignee',
      mode: 'add',

      secondaryActionLabel: 'Add Address',

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

      if (result.action === 'add-address') {

        this.openAddAddress(
          result.values,
          null
        );

        return;
      }

      this.consigneeList = [
        ...this.consigneeList,
        {
          code: result.code,
          name: result.name,
          contactPerson: result.contactPerson,
          mailId: result.mailId,
          irsNumber: result.irsNumber,
          phone: result.phone,
          country: result.country,
          addresses: []
        }
      ];

      this.showSuccess(
        'DS Consignee added successfully'
      );
    });
  }

  viewConsignee(consignee: DsConsignee): void {

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

  editConsignee(consignee: DsConsignee): void {

    const data: MasterFormDialogData = {
      title: 'Edit DS Consignee',
      mode: 'edit',
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

      const changed =
        consignee.code !== result.code ||
        consignee.name !== result.name ||
        consignee.contactPerson !== result.contactPerson ||
        consignee.mailId !== result.mailId ||
        consignee.irsNumber !== result.irsNumber ||
        consignee.phone !== result.phone ||
        consignee.country !== result.country;

      if (!changed) {
        this.showError(
          'No changes were made to the DS Consignee'
        );

        return;
      }

      consignee.code = result.code;
      consignee.name = result.name;
      consignee.contactPerson = result.contactPerson;
      consignee.mailId = result.mailId;
      consignee.irsNumber = result.irsNumber;
      consignee.phone = result.phone;
      consignee.country = result.country;

      this.consigneeList = [
        ...this.consigneeList
      ];

      this.showSuccess(
        'DS Consignee updated successfully'
      );
    });
  }

  viewAddress(consignee: DsConsignee): void {

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

  private openAddAddress(
    consigneeData: any,
    existingConsignee: DsConsignee | null
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
        address1: result.address1,
        address2: result.address2,
        city: result.city,
        state: result.state,
        zipcode: result.zipcode,
        gstNo: result.gstNo
      };

      if (existingConsignee) {

        existingConsignee.addresses = [
          ...existingConsignee.addresses,
          address
        ];

        this.consigneeList = [
          ...this.consigneeList
        ];

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

  private getConsigneeFields() {

    return [
      {
        key: 'code',
        label: 'DS Consignee Code',
        placeholder: 'Enter consignee code',
        type: 'text' as const,
        required: true
      },
      {
        key: 'name',
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
        key: 'country',
        label: 'Country',
        type: 'select' as const,
        options: [
          {
            value: 'INDIA',
            label: 'INDIA'
          },
          {
            value: 'USA',
            label: 'UNITED STATES'
          },
          {
            value: 'UK',
            label: 'UNITED KINGDOM'
          }
        ]
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
              {{ data.consignee.name }}
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
              address of data.consignee.addresses;
              track $index
            ) {

              <tr>

                <td>{{ $index + 1 }}</td>
                <td>{{ address.address1 }}</td>
                <td>{{ address.address2 }}</td>
                <td>{{ address.city }}</td>
                <td>{{ address.state }}</td>
                <td>{{ address.zipcode }}</td>
                <td>{{ address.gstNo }}</td>

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
    @Inject(MAT_DIALOG_DATA) public data: any
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