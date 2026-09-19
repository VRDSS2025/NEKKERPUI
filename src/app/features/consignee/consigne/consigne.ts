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
  selector: 'app-consigne',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './consigne.html',
  styleUrl: './consigne.scss'
})
export class ConsigneComponent {

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

  consignees = [
    {
      code: 'EASTERN FI',
      name: 'EASTERN FISH COMPANY LLC',
      contactPerson: 'MR.LEE BLOOM',
      phone: '',
      address1: 'GLEN POINTE CENTRE EAST',
      paymentMailId: 'VLotito@easternfish.com',
      address2: '300 FRANK W. BURR BLVD',
      irsNumber: '',
      state: '',
      gstNo: '',
      zipcode: '',
      country: 'UNITED STATES OF AMERICA',
      effectiveFrom: '04/01/2015',
      isHavePOFormat: true,
      docsEmailId: 'rcampos@easternfish.com',

      billOfLading: true,
      packingInvoice: true,
      bapTraceAbility: false,
      surveyReport: false,
      annexure: false,
      modelCatchCertificate: false,
      isf: false,
      antibioticReport: false,

      certificateOfOrigin: true,
      simpSheet: true,
      healthCertificate: false,
      testReports: false,
      haccpGuaranteeLetter: false,
      simpAquaCultureTraceability: false,
      simpPreProcessing: false,
      inHouseMicroReport: false,

      ds2031Certificate: true,
      certificateOfAnalysis: true,
      simpDocs: false,
      shipmentDetails: false,
      netWeightReport: false,
      eicApproval: false,
      simpDataEntryForm: false,

      commercialInvoice: true,
      codeList: true,
      microReport: false,
      farmerEvidence: false,
      aquacultureSimpDataForm: false,
      dspCodelistAndRm: false,
      moistureReport: false
    },

    {
      code: 'PLTC, INC.',
      name: 'PLTC, INC.',
      contactPerson: 'MS.CHRISTINA OH'
    },

    {
      code: 'CENSEA INC',
      name: 'CENSEA INC.,',
      contactPerson: 'MR.NATE TORCH'
    },

    {
      code: 'SOUTHWIND',
      name: 'SOUTHWIND FOODS LLC DBA GREAT AMERICAN SEAFOOD IMP',
      contactPerson: 'MR.STEVEN'
    },

    {
      code: 'HIGH LINER',
      name: 'HIGH LINER FOODS INC',
      contactPerson: 'MS.DENISE PENDERGAST'
    },

    {
      code: 'ARISTA IND',
      name: 'ARISTA INDUSTRIES INC.,',
      contactPerson: ''
    },

    {
      code: 'CHICKEN OF',
      name: 'CHICKEN OF THE SEA FROZEN FOODS',
      contactPerson: ''
    },

    {
      code: 'RICH PRODU',
      name: 'RICH PRODUCTS CORPORATION',
      contactPerson: ''
    },

    {
      code: 'LIBERTY SE',
      name: 'LIBERTY SEAFOOD',
      contactPerson: ''
    },

    {
      code: 'RED CHAMBE',
      name: 'RED CHAMBER CO',
      contactPerson: ''
    }
  ];

  goBack(): void {
    this.router.navigate(['/consignee']);
  }

  private getFields(): any[] {

    return [

      {
        key: 'code',
        label: 'Consignee Code',
        placeholder: 'Enter consignee code',
        type: 'text',
        required: true
      },
      {
        key: 'contactPerson',
        label: 'Contact Person',
        placeholder: 'Enter contact person',
        type: 'text'
      },
      {
        key: 'name',
        label: 'Consignee Name',
        placeholder: 'Enter consignee name',
        type: 'text',
        required: true
      },
      {
        key: 'phone',
        label: 'Phone',
        placeholder: 'Enter phone',
        type: 'text'
      },

      {
        key: 'address1',
        label: 'Address1',
        placeholder: 'Enter address',
        type: 'text'
      },
      {
        key: 'paymentMailId',
        label: 'Payment Mail Id',
        placeholder: 'Enter payment mail',
        type: 'text'
      },
      {
        key: 'address2',
        label: 'Address2',
        placeholder: 'Enter address',
        type: 'text'
      },
      {
        key: 'irsNumber',
        label: 'IRS Number',
        placeholder: 'Enter IRS number',
        type: 'text'
      },

      {
        key: 'state',
        label: 'State',
        placeholder: 'Enter state',
        type: 'text'
      },
      {
        key: 'gstNo',
        label: 'GST No.',
        placeholder: 'Enter GST number',
        type: 'text'
      },
      {
        key: 'zipcode',
        label: 'Zipcode',
        placeholder: 'Enter zipcode',
        type: 'text'
      },
      {
        key: 'country',
        label: 'Country',
        type: 'select',
        options: [
          {
            value: 'UNITED STATES OF AMERICA',
            label: 'UNITED STATES OF AMERICA'
          },
          {
            value: 'INDIA',
            label: 'INDIA'
          }
        ]
      },

      {
        key: 'effectiveFrom',
        label: 'Effective From Date',
        placeholder: 'Select date',
        type: 'text'
      },
      {
        key: 'isHavePOFormat',
        label: 'Is Have POFormat',
        type: 'checkbox'
      },
      {
        key: 'docsEmailId',
        label: 'Docs Email Id',
        placeholder: 'Enter docs email',
        type: 'text'
      },

      {
        key: 'billOfLading',
        label: 'Bill Of Lading',
        type: 'checkbox'
      },
      {
        key: 'packingInvoice',
        label: 'Packing Invoice',
        type: 'checkbox'
      },
      {
        key: 'bapTraceAbility',
        label: 'BAP Trace Ability',
        type: 'checkbox'
      },
      {
        key: 'surveyReport',
        label: 'Survey Report',
        type: 'checkbox'
      },
      {
        key: 'annexure',
        label: 'Annexure',
        type: 'checkbox'
      },
      {
        key: 'modelCatchCertificate',
        label: 'Model Catch Certificate',
        type: 'checkbox'
      },
      {
        key: 'isf',
        label: 'ISF',
        type: 'checkbox'
      },
      {
        key: 'antibioticReport',
        label: 'Antibiotic Report',
        type: 'checkbox'
      },

      {
        key: 'certificateOfOrigin',
        label: 'Certificate Of Origin',
        type: 'checkbox'
      },
      {
        key: 'simpSheet',
        label: 'SIMP Sheet',
        type: 'checkbox'
      },
      {
        key: 'healthCertificate',
        label: 'Health Certificate',
        type: 'checkbox'
      },
      {
        key: 'testReports',
        label: 'Test Reports',
        type: 'checkbox'
      },
      {
        key: 'haccpGuaranteeLetter',
        label: 'HACCP Guarantee Letter',
        type: 'checkbox'
      },
      {
        key: 'simpAquaCultureTraceability',
        label: 'Simp Aqua Culture Traceability',
        type: 'checkbox'
      },
      {
        key: 'simpPreProcessing',
        label: 'Simp PreProcessing',
        type: 'checkbox'
      },
      {
        key: 'inHouseMicroReport',
        label: 'In house Micro Report',
        type: 'checkbox'
      },

      {
        key: 'ds2031Certificate',
        label: 'DS 2031 Certificate',
        type: 'checkbox'
      },
      {
        key: 'certificateOfAnalysis',
        label: 'Certificate Of Analysis',
        type: 'checkbox'
      },
      {
        key: 'simpDocs',
        label: 'SIMP Docs',
        type: 'checkbox'
      },
      {
        key: 'shipmentDetails',
        label: 'Shipment Details',
        type: 'checkbox'
      },
      {
        key: 'netWeightReport',
        label: 'Net Weight Report',
        type: 'checkbox'
      },
      {
        key: 'eicApproval',
        label: 'Eic Approval',
        type: 'checkbox'
      },
      {
        key: 'simpDataEntryForm',
        label: 'SIMP Data Entry Form',
        type: 'checkbox'
      },

      {
        key: 'commercialInvoice',
        label: 'Commercial Invoice',
        type: 'checkbox'
      },
      {
        key: 'codeList',
        label: 'Code List',
        type: 'checkbox'
      },
      {
        key: 'microReport',
        label: 'Micro Report',
        type: 'checkbox'
      },
      {
        key: 'farmerEvidence',
        label: 'Farmer Evidence',
        type: 'checkbox'
      },
      {
        key: 'aquacultureSimpDataForm',
        label: 'Aquaculture Simp Data Form',
        type: 'checkbox'
      },
      {
        key: 'dspCodelistAndRm',
        label: 'Dsp Codelist And Rm',
        type: 'checkbox'
      },
      {
        key: 'moistureReport',
        label: 'Moisture Report',
        type: 'checkbox'
      }
    ];
  }

  addConsignee(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Consignee',
      mode: 'add',
      fields: this.getFields()
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '1100px',
        maxWidth: '95vw',
        height: '90vh',
        maxHeight: '90vh',
        data: dialogData,
        autoFocus: false,
        panelClass: 'premium-master-dialog'
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.consignees = [
        ...this.consignees,
        result
      ];

      this.showSuccess(
        'Consignee added successfully'
      );
    });
  }

  viewConsignee(consignee: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Consignee Details',
      mode: 'view',
      values: consignee,
      fields: this.getFields()
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '1100px',
        maxWidth: '95vw',
        height: '90vh',
        maxHeight: '90vh',
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
        this.editConsignee(consignee);
      }
    });
  }

  editConsignee(consignee: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Consignee',
      mode: 'edit',
      values: consignee,
      fields: this.getFields()
    };

    const dialogRef = this.dialog.open(
      MasterFormDialogComponent,
      {
        width: '1100px',
        maxWidth: '95vw',
        height: '90vh',
        maxHeight: '90vh',
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
        JSON.stringify(consignee) !==
        JSON.stringify(result);

      if (!isChanged) {
        this.showError(
          'No changes were made to the Consignee'
        );
        return;
      }

      Object.assign(consignee, result);

      this.consignees = [
        ...this.consignees
      ];

      this.showSuccess(
        'Consignee updated successfully'
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