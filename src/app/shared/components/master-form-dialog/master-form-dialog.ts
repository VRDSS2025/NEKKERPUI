import { Component,Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';


/* =========================================================
   MASTER FORM FIELD
   ========================================================= */

export interface MasterFormField {

  key: string;

  label: string;

  placeholder?: string;

  type?: 'text' | 'textarea' | 'select' | 'checkbox' ;

  required?: boolean;

  options?: {
    value: string | number;
    label: string;
  }[];
}


/* =========================================================
   MASTER FORM DIALOG DATA
   ========================================================= */

export interface MasterFormDialogData {

  title: string;

  fields: MasterFormField[];

  mode?: 'add' | 'edit' | 'view';

  values?: any;

   secondaryActionLabel?: string;
}


/* =========================================================
   COMPONENT
   ========================================================= */

@Component({
  selector: 'app-master-form-dialog',

  standalone: true,

  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],

  templateUrl: './master-form-dialog.html',

  styleUrl: './master-form-dialog.scss'
})

export class MasterFormDialogComponent {

  form: FormGroup;

  

  constructor(
    private fb: FormBuilder,

    private dialogRef:
      MatDialogRef<MasterFormDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: MasterFormDialogData
  ) {

    const controls: Record<string, any> = {};


    /* =====================================================
       CREATE FORM CONTROLS
       ===================================================== */

    for (const field of data.fields) {

      controls[field.key] = [

        data.values?.[field.key] ?? '',

        field.required
          ? Validators.required
          : []

      ];

    }


    this.form = this.fb.group(controls);


    /* =====================================================
       VIEW MODE
       ===================================================== */

    if (data.mode === 'view') {

      this.form.disable();

    }

  }


  /* =========================================================
     SAVE
     ========================================================= */

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();

      return;

    }


    this.dialogRef.close(
      this.form.getRawValue()
    );

  }


  /* =========================================================
     CLOSE
     ========================================================= */

  close(): void {

    this.dialogRef.close();

  }


  /* =========================================================
     EDIT
     ========================================================= */

  edit(): void {

    this.dialogRef.close({
      action: 'edit'
    });

  }


  /* =========================================================
     VALIDATION
     ========================================================= */

  isInvalid(fieldKey: string): boolean {

    const control =
      this.form.get(fieldKey);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );

  }


  /* =========================================================
     VIEW MODE
     ========================================================= */

  get isViewMode(): boolean {

    return this.data.mode === 'view';

  }


  /* =========================================================
     EDIT MODE
     ========================================================= */

  get isEditMode(): boolean {

    return this.data.mode === 'edit';

  }


  /* =========================================================
     ADD MODE
     ========================================================= */

  get isAddMode(): boolean {

    return (
      !this.data.mode ||
      this.data.mode === 'add'
    );

  }

  
  /* =========================================================
     Address
     ========================================================= */

  addAddress(): void {

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.dialogRef.close({
    action: 'add-address',
    values: this.form.getRawValue()
  });
}

}