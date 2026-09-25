
import {
  Component,
  inject,
  OnInit,
  ChangeDetectorRef
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
  MasterFormDialogData,
  MasterFormField
} from '../../../shared/components/master-form-dialog/master-form-dialog';

import {
  ProductGroup,
  Consignees
} from '../../../core/services/product-group';

import { HttpErrorResponse } from '@angular/common/http';


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
export class ConsigneComponent implements OnInit {

  // =====================================================
  // SERVICES
  // =====================================================

  private readonly router = inject(Router);

  private readonly dialog = inject(MatDialog);

  private readonly snackBar = inject(MatSnackBar);

  private readonly productService = inject(ProductGroup);

  private readonly cdr = inject(ChangeDetectorRef);


  // =====================================================
  // TABLE COLUMNS
  // =====================================================

  columns: MasterColumn[] = [

    {
      key: 'consigneeCode',
      label: 'Customer Code'
    },

    {
      key: 'consigneeName',
      label: 'Customer Name'
    },

    {
      key: 'contactPerson',
      label: 'Contact Person'
    }

  ];


  // =====================================================
  // DATA
  // =====================================================

  consignees: Consignees[] = [];


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadConsignees();

  }


  // =====================================================
  // BACK
  // =====================================================

  goBack(): void {

    this.router.navigate(['/consignee']);

  }


  // =====================================================
  // GET CONSIGNEES
  // =====================================================

  loadConsignees(): void {

    this.productService
      .getConsignees()
      .subscribe({

        next: (response) => {

          console.log(
            'Consignees GET Response:',
            response
          );

          this.consignees =
            Array.isArray(response)
              ? [...response]
              : [];

          this.cdr.detectChanges();

        },

        error: (error: HttpErrorResponse) => {

          console.error(
            'Failed to load Consignees'
          );

          console.error(
            'Status:',
            error.status
          );

          console.error(
            'Response:',
            error.error
          );

          console.error(
            'Message:',
            error.message
          );

          this.consignees = [];

          this.cdr.detectChanges();

          this.showError(
            'Failed to load Consignees'
          );

        }

      });

  }


  // =====================================================
  // FORM FIELDS
  // =====================================================

  private getFields(): MasterFormField[] {

    return [

      {
        key: 'consigneeCode',
        label: 'Consignee Code',
        placeholder: 'Enter consignee code',
        type: 'text' as const,
        required: true
      },

      {
        key: 'contactPerson',
        label: 'Contact Person',
        placeholder: 'Enter contact person',
        type: 'text' as const,
        required: true
      },

      {
        key: 'consigneeName',
        label: 'Consignee Name',
        placeholder: 'Enter consignee name',
        type: 'text' as const,
        required: true
      },

      {
        key: 'phone',
        label: 'Phone',
        placeholder: 'Enter phone',
        type: 'text' as const
      },

      {
        key: 'address1',
        label: 'Address 1',
        placeholder: 'Enter address',
        type: 'text' as const
      },

      {
        key: 'paymentMailId',
        label: 'Payment Mail Id',
        placeholder: 'Enter payment mail',
        type: 'text' as const
      },

      {
        key: 'address2',
        label: 'Address 2',
        placeholder: 'Enter address',
        type: 'text' as const
      },

      {
        key: 'irsNumber',
        label: 'IRS Number',
        placeholder: 'Enter IRS number',
        type: 'text' as const
      },

      {
        key: 'state',
        label: 'State',
        placeholder: 'Enter state',
        type: 'text' as const
      },

      {
        key: 'gstNo',
        label: 'GST No.',
        placeholder: 'Enter GST number',
        type: 'text' as const
      },

      {
        key: 'zipcode',
        label: 'Zipcode',
        placeholder: 'Enter zipcode',
        type: 'text' as const
      },

      {
        key: 'countryId',
        label: 'Country ID',
        placeholder: 'Enter country ID',
        type: 'text' as const
      },

      {
        key: 'effectiveFromDate',
        label: 'Effective From Date',
        placeholder: 'YYYY-MM-DD',
        type: 'text' as const,
        required: true
      },

      {
        key: 'isHavePOFormat',
        label: 'Is Have PO Format',
        type: 'checkbox' as const
      },

      {
        key: 'docsEmailId',
        label: 'Docs Email Id',
        placeholder: 'Enter docs email',
        type: 'text' as const
      },


      // ===================================================
      // DOCUMENT CHECKBOXES
      // ===================================================

      {
        key: 'billOfLading',
        label: 'Bill Of Lading',
        type: 'checkbox' as const
      },

      {
        key: 'certificateOfOrigin',
        label: 'Certificate Of Origin',
        type: 'checkbox' as const
      },

      {
        key: 'dS2031Certificate',
        label: 'DS 2031 Certificate',
        type: 'checkbox' as const
      },

      {
        key: 'commercialInvoice',
        label: 'Commercial Invoice',
        type: 'checkbox' as const
      },

      {
        key: 'packingInvoice',
        label: 'Packing Invoice',
        type: 'checkbox' as const
      },

      {
        key: 'simpSheet',
        label: 'SIMP Sheet',
        type: 'checkbox' as const
      },

      {
        key: 'certificateOfAnalysis',
        label: 'Certificate Of Analysis',
        type: 'checkbox' as const
      },

      {
        key: 'codeList',
        label: 'Code List',
        type: 'checkbox' as const
      },

      {
        key: 'bapTraceAbility',
        label: 'BAP Trace Ability',
        type: 'checkbox' as const
      },

      {
        key: 'healthCertificate',
        label: 'Health Certificate',
        type: 'checkbox' as const
      },

      {
        key: 'simpDocs',
        label: 'SIMP Docs',
        type: 'checkbox' as const
      },

      {
        key: 'microReport',
        label: 'Micro Report',
        type: 'checkbox' as const
      },

      {
        key: 'surveyReport',
        label: 'Survey Report',
        type: 'checkbox' as const
      },

      {
        key: 'testReports',
        label: 'Test Reports',
        type: 'checkbox' as const
      },

      {
        key: 'farmerEvidence',
        label: 'Farmer Evidence',
        type: 'checkbox' as const
      },

      {
        key: 'annexure',
        label: 'Annexure',
        type: 'checkbox' as const
      },

      {
        key: 'haccpGuaranteeLetter',
        label: 'HACCP Guarantee Letter',
        type: 'checkbox' as const
      },

      {
        key: 'netWeightReport',
        label: 'Net Weight Report',
        type: 'checkbox' as const
      },

      {
        key: 'aquacultureSimpDataForm',
        label: 'Aquaculture SIMP Data Form',
        type: 'checkbox' as const
      },

      {
        key: 'modelCatchCertificate',
        label: 'Model Catch Certificate',
        type: 'checkbox' as const
      },

      {
        key: 'simpAquaCultureTraceability',
        label: 'SIMP Aqua Culture Traceability',
        type: 'checkbox' as const
      },

      {
        key: 'eicApproval',
        label: 'EIC Approval',
        type: 'checkbox' as const
      },

      {
        key: 'dspCodeListAndRM',
        label: 'DSP Code List And RM',
        type: 'checkbox' as const
      },

      {
        key: 'is',
        label: 'IS',
        type: 'checkbox' as const
      },

      {
        key: 'simpPreProcessing',
        label: 'SIMP Pre Processing',
        type: 'checkbox' as const
      },

      {
        key: 'simpDataEntryForm',
        label: 'SIMP Data Entry Form',
        type: 'checkbox' as const
      },

      {
        key: 'moistureReport',
        label: 'Moisture Report',
        type: 'checkbox' as const
      },

      {
        key: 'antibioticReport',
        label: 'Antibiotic Report',
        type: 'checkbox' as const
      },

      {
        key: 'inHouseMicroReport',
        label: 'In House Micro Report',
        type: 'checkbox' as const
      }

    ];

  }


  // =====================================================
  // ADD CONSIGNEE
  // =====================================================

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


      const payload =
        this.buildPayload(result);


      console.log(
        'Consignee POST Payload:',
        payload
      );


      this.productService
        .createConsignee(payload)
        .subscribe({

          next: (response) => {

            console.log(
              'Consignee created successfully:',
              response
            );


            this.showSuccess(
              'Consignee added successfully'
            );


            this.loadConsignees();

          },

          error: (error: HttpErrorResponse) => {

            this.handleApiError(
              error,
              'Failed to add Consignee'
            );

          }

        });

    });

  }


  // =====================================================
  // VIEW CONSIGNEE
  // =====================================================

  viewConsignee(
    consignee: Consignees
  ): void {

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


  // =====================================================
  // EDIT CONSIGNEE
  // =====================================================

  editConsignee(
    consignee: Consignees
  ): void {

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


      if (!consignee.id) {

        this.showError(
          'Consignee ID is missing'
        );

        return;

      }


      const isChanged =
        JSON.stringify(
          this.normalizeForComparison(consignee)
        ) !==
        JSON.stringify(
          this.normalizeForComparison(result)
        );


      if (!isChanged) {

        this.showError(
          'No changes were made to the Consignee'
        );

        return;

      }


      const payload =
        this.buildPayload(result);


      console.log(
        'Consignee PUT ID:',
        consignee.id
      );

      console.log(
        'Consignee PUT Payload:',
        payload
      );


      this.productService
        .updateConsignee(
          consignee.id,
          payload
        )
        .subscribe({

          next: (response) => {

            console.log(
              'Consignee updated successfully:',
              response
            );


            this.showSuccess(
              'Consignee updated successfully'
            );


            this.loadConsignees();

          },

          error: (error: HttpErrorResponse) => {

            this.handleApiError(
              error,
              'Failed to update Consignee'
            );

          }

        });

    });

  }


  // =====================================================
  // BUILD API PAYLOAD
  // =====================================================

  private buildPayload(
    result: any
  ): Consignees {

    return {

      consigneeCode:
        result.consigneeCode?.trim() || '',

      contactPerson:
        result.contactPerson?.trim() || '',

      consigneeName:
        result.consigneeName?.trim() || '',

      phone:
        result.phone?.trim() || '',

      address1:
        result.address1?.trim() || '',

      paymentMailId:
        result.paymentMailId?.trim() || '',

      address2:
        result.address2?.trim() || '',

      irsNumber:
        result.irsNumber?.trim() || '',

      state:
        result.state?.trim() || '',

      gstNo:
        result.gstNo?.trim() || '',

      zipcode:
        result.zipcode?.trim() || '',

      countryId:
        Number(result.countryId) || 0,

      effectiveFromDate:
        this.formatDateForApi(
          result.effectiveFromDate
        ),

      isHavePOFormat:
        Boolean(result.isHavePOFormat),

      docsEmailId:
        result.docsEmailId?.trim() || '',


      // ---------------------------------------------------
      // DOCUMENT FLAGS
      // ---------------------------------------------------

      billOfLading:
        Boolean(result.billOfLading),

      certificateOfOrigin:
        Boolean(result.certificateOfOrigin),

      dS2031Certificate:
        Boolean(result.dS2031Certificate),

      commercialInvoice:
        Boolean(result.commercialInvoice),

      packingInvoice:
        Boolean(result.packingInvoice),

      simpSheet:
        Boolean(result.simpSheet),

      certificateOfAnalysis:
        Boolean(result.certificateOfAnalysis),

      codeList:
        Boolean(result.codeList),

      bapTraceAbility:
        Boolean(result.bapTraceAbility),

      healthCertificate:
        Boolean(result.healthCertificate),

      simpDocs:
        Boolean(result.simpDocs),

      microReport:
        Boolean(result.microReport),

      surveyReport:
        Boolean(result.surveyReport),

      testReports:
        Boolean(result.testReports),
        shipmentDetails: Boolean(result.shipmentDetails),

      farmerEvidence:
        Boolean(result.farmerEvidence),

      annexure:
        Boolean(result.annexure),

      haccpGuaranteeLetter:
        Boolean(result.haccpGuaranteeLetter),

      netWeightReport:
        Boolean(result.netWeightReport),

      aquacultureSimpDataForm:
        Boolean(result.aquacultureSimpDataForm),

      modelCatchCertificate:
        Boolean(result.modelCatchCertificate),

      simpAquaCultureTraceability:
        Boolean(result.simpAquaCultureTraceability),

      eicApproval:
        Boolean(result.eicApproval),

      dspCodeListAndRM:
        Boolean(result.dspCodeListAndRM),

      is:
        Boolean(result.is),

      simpPreProcessing:
        Boolean(result.simpPreProcessing),

      simpDataEntryForm:
        Boolean(result.simpDataEntryForm),

      moistureReport:
        Boolean(result.moistureReport),

      antibioticReport:
        Boolean(result.antibioticReport),

      inHouseMicroReport:
        Boolean(result.inHouseMicroReport)

    };

  }


  // =====================================================
  // DATE FORMAT
  // =====================================================

  private formatDateForApi(
    value: any
  ): string {

    if (!value) {

      return '';

    }


    const date =
      String(value).trim();


    // Already ISO
    if (date.includes('T')) {

      return date;

    }


    // YYYY-MM-DD
    if (
      /^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {

      return `${date}T00:00:00`;

    }


    // YYYY/MM/DD
    if (
      /^\d{4}\/\d{2}\/\d{2}$/.test(date)
    ) {

      return `${date.replace(/\//g, '-')}T00:00:00`;

    }


    // DD/MM/YYYY
    if (
      /^\d{2}\/\d{2}\/\d{4}$/.test(date)
    ) {

      const [
        day,
        month,
        year
      ] = date.split('/');

      return `${year}-${month}-${day}T00:00:00`;

    }


    // DD-MM-YYYY
    if (
      /^\d{2}-\d{2}-\d{4}$/.test(date)
    ) {

      const [
        day,
        month,
        year
      ] = date.split('-');

      return `${year}-${month}-${day}T00:00:00`;

    }


    return date;

  }


  // =====================================================
  // COMPARISON
  // =====================================================

  private normalizeForComparison(
    value: any
  ): any {

    if (!value) {

      return value;

    }


    return {

      consigneeCode:
        value.consigneeCode || '',

      contactPerson:
        value.contactPerson || '',

      consigneeName:
        value.consigneeName || '',

      phone:
        value.phone || '',

      address1:
        value.address1 || '',

      paymentMailId:
        value.paymentMailId || '',

      address2:
        value.address2 || '',

      irsNumber:
        value.irsNumber || '',

      state:
        value.state || '',

      gstNo:
        value.gstNo || '',

      zipcode:
        value.zipcode || '',

      countryId:
        Number(value.countryId || 0),

      effectiveFromDate:
        this.formatDateForApi(
          value.effectiveFromDate
        ),

      isHavePOFormat:
        Boolean(value.isHavePOFormat),

      docsEmailId:
        value.docsEmailId || '',

      billOfLading:
        Boolean(value.billOfLading),

      certificateOfOrigin:
        Boolean(value.certificateOfOrigin),

      dS2031Certificate:
        Boolean(value.dS2031Certificate),

      commercialInvoice:
        Boolean(value.commercialInvoice),

      packingInvoice:
        Boolean(value.packingInvoice),

      simpSheet:
        Boolean(value.simpSheet),

      certificateOfAnalysis:
        Boolean(value.certificateOfAnalysis),

      codeList:
        Boolean(value.codeList),

      bapTraceAbility:
        Boolean(value.bapTraceAbility),

      healthCertificate:
        Boolean(value.healthCertificate),

      simpDocs:
        Boolean(value.simpDocs),

      microReport:
        Boolean(value.microReport),

      surveyReport:
        Boolean(value.surveyReport),

      testReports:
        Boolean(value.testReports),

      farmerEvidence:
        Boolean(value.farmerEvidence),

      annexure:
        Boolean(value.annexure),

      haccpGuaranteeLetter:
        Boolean(value.haccpGuaranteeLetter),

      netWeightReport:
        Boolean(value.netWeightReport),

      aquacultureSimpDataForm:
        Boolean(value.aquacultureSimpDataForm),

      modelCatchCertificate:
        Boolean(value.modelCatchCertificate),

      simpAquaCultureTraceability:
        Boolean(value.simpAquaCultureTraceability),

      eicApproval:
        Boolean(value.eicApproval),

      dspCodeListAndRM:
        Boolean(value.dspCodeListAndRM),

      is:
        Boolean(value.is),

      simpPreProcessing:
        Boolean(value.simpPreProcessing),

      simpDataEntryForm:
        Boolean(value.simpDataEntryForm),

      moistureReport:
        Boolean(value.moistureReport),

      antibioticReport:
        Boolean(value.antibioticReport),

      inHouseMicroReport:
        Boolean(value.inHouseMicroReport)

    };

  }


  // =====================================================
  // API ERROR
  // =====================================================

  private handleApiError(
    error: HttpErrorResponse,
    defaultMessage: string
  ): void {

    console.error(
      'API Error Status:',
      error.status
    );

    console.error(
      'API Error Response:',
      error.error
    );

    console.error(
      'API Error Message:',
      error.message
    );


    if (error.error?.errors) {

      console.error(
        'Validation Errors:',
        error.error.errors
      );

    }


    this.showError(

      error.error?.title ||

      error.error?.message ||

      defaultMessage

    );

  }


  // =====================================================
  // SUCCESS
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

        panelClass: [
          'success-snackbar'
        ]

      }

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

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

        panelClass: [
          'error-snackbar'
        ]

      }

    );

  }

}


