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
  selector: 'app-grade',
  standalone: true,
  imports: [
    MasterListComponent,
    MatIconModule
  ],
  templateUrl: './grade.html',
  styleUrl: './grade.scss'
})
export class GradeComponent {

  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  columns: MasterColumn[] = [
    {
      key: 'grade',
      label: 'Grade'
    },
    {
      key: 'customerId',
      label: 'Customer ID'
    }
  ];

  grades = [
    {
      grade: 'BKN U/20',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '0',
      docCodes: '0',
      targetCount: ''
    },
    {
      grade: '2/4',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '4/6',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '6/8',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '8/12',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '11/13',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '13/15',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '16/20',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '21/25',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    },
    {
      grade: '26/30',
      customerId: '',
      consignee: '',
      consigneeGrade: '',
      asSoldCountSizesCodes: '',
      docCodes: '',
      targetCount: ''
    }
  ];

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addGrade(): void {

    const dialogData: MasterFormDialogData = {
      title: 'Add Grade',
      mode: 'add',

      fields: [
        {
          key: 'grade',
          label: 'Grade',
          placeholder: 'Enter grade',
          type: 'text',
          required: true
        },
        {
          key: 'consignee',
          label: 'Consignee',
          type: 'select',
          required: false,
          options: [
            {
              value: 'ALL',
              label: 'All'
            }
          ]
        },
        {
          key: 'consigneeGrade',
          label: 'Consignee Grade',
          placeholder: 'Enter consignee grade',
          type: 'text',
          required: false
        },
        {
          key: 'asSoldCountSizesCodes',
          label: 'As Sold Count Sizes Codes',
          placeholder: 'Enter count sizes codes',
          type: 'text',
          required: false
        },
        {
          key: 'docCodes',
          label: 'DOC Codes',
          placeholder: 'Enter DOC codes',
          type: 'text',
          required: false
        },
        {
          key: 'targetCount',
          label: 'Target Count',
          placeholder: 'Enter target count',
          type: 'text',
          required: false
        },
        {
          key: 'customerId',
          label: 'Customer ID',
          placeholder: 'Enter customer ID',
          type: 'text',
          required: false
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

      this.grades = [
        ...this.grades,
        {
          grade: result.grade,
          customerId: result.customerId,
          consignee: result.consignee,
          consigneeGrade: result.consigneeGrade,
          asSoldCountSizesCodes:
            result.asSoldCountSizesCodes,
          docCodes: result.docCodes,
          targetCount: result.targetCount
        }
      ];

      this.showSuccess(
        'Grade added successfully'
      );
    });
  }

  viewGrade(grade: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Grade Details',
      mode: 'view',

      values: grade,

      fields: [
        {
          key: 'grade',
          label: 'Grade',
          type: 'text'
        },
        {
          key: 'consignee',
          label: 'Consignee',
          type: 'select',
          options: [
            {
              value: 'ALL',
              label: 'All'
            }
          ]
        },
        {
          key: 'consigneeGrade',
          label: 'Consignee Grade',
          type: 'text'
        },
        {
          key: 'asSoldCountSizesCodes',
          label: 'As Sold Count Sizes Codes',
          type: 'text'
        },
        {
          key: 'docCodes',
          label: 'DOC Codes',
          type: 'text'
        },
        {
          key: 'targetCount',
          label: 'Target Count',
          type: 'text'
        },
        {
          key: 'customerId',
          label: 'Customer ID',
          type: 'text'
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
        this.editGrade(grade);
      }
    });
  }

  editGrade(grade: any): void {

    const dialogData: MasterFormDialogData = {
      title: 'Edit Grade',
      mode: 'edit',

      values: {
        grade: grade.grade,
        consignee: grade.consignee,
        consigneeGrade: grade.consigneeGrade,
        asSoldCountSizesCodes:
          grade.asSoldCountSizesCodes,
        docCodes: grade.docCodes,
        targetCount: grade.targetCount,
        customerId: grade.customerId
      },

      fields: [
        {
          key: 'grade',
          label: 'Grade',
          placeholder: 'Enter grade',
          type: 'text',
          required: true
        },
        {
          key: 'consignee',
          label: 'Consignee',
          type: 'select',
          required: false,
          options: [
            {
              value: 'ALL',
              label: 'All'
            }
          ]
        },
        {
          key: 'consigneeGrade',
          label: 'Consignee Grade',
          placeholder: 'Enter consignee grade',
          type: 'text',
          required: false
        },
        {
          key: 'asSoldCountSizesCodes',
          label: 'As Sold Count Sizes Codes',
          placeholder: 'Enter count sizes codes',
          type: 'text',
          required: false
        },
        {
          key: 'docCodes',
          label: 'DOC Codes',
          placeholder: 'Enter DOC codes',
          type: 'text',
          required: false
        },
        {
          key: 'targetCount',
          label: 'Target Count',
          placeholder: 'Enter target count',
          type: 'text',
          required: false
        },
        {
          key: 'customerId',
          label: 'Customer ID',
          placeholder: 'Enter customer ID',
          type: 'text',
          required: false
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

      const isChanged =
        grade.grade !== result.grade ||
        grade.customerId !== result.customerId ||
        grade.consignee !== result.consignee ||
        grade.consigneeGrade !== result.consigneeGrade ||
        grade.asSoldCountSizesCodes !==
          result.asSoldCountSizesCodes ||
        grade.docCodes !== result.docCodes ||
        grade.targetCount !== result.targetCount;

      if (!isChanged) {
        this.showError(
          'No changes were made to the Grade'
        );
        return;
      }

      grade.grade = result.grade;
      grade.customerId = result.customerId;
      grade.consignee = result.consignee;
      grade.consigneeGrade =
        result.consigneeGrade;
      grade.asSoldCountSizesCodes =
        result.asSoldCountSizesCodes;
      grade.docCodes = result.docCodes;
      grade.targetCount = result.targetCount;

      this.grades = [...this.grades];

      this.showSuccess(
        'Grade updated successfully'
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