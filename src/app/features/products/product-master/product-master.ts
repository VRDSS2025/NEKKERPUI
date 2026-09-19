import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import {
  MasterListComponent,
  MasterColumn
} from '../../../shared/components/master-list/master-list';

interface ProductMaster {
  productCode: string;
  productDescription: string;
  productGroup: string;
  species: string;
  productForm: string;
  freezingTech: string;
  preparation: string;
  subProductForm: string;
  coat: string;
  sauceWeight: string;
  shrimpShape: string;
  glazeStatus: string;
  glazePercent: string;
  glazeType: string;
  treatment: string;
  tradeName: string;
  shrimpPercent: string;
  shrimpWeight: string;
  finFrom: number;
  finTo: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MasterListComponent
  ],
  templateUrl: './product-master.html',
  styleUrl: './product-master.scss'
})
export class ProductMasterComponent {

  private router = inject(Router);
  private fb = inject(FormBuilder);

  columns: MasterColumn[] = [
    {
      key: 'productCode',
      label: 'Product Code'
    },
    {
      key: 'productDescription',
      label: 'Description'
    },
    {
      key: 'productForm',
      label: 'Product Form'
    }
  ];

  products: ProductMaster[] = [
    {
      productCode: '7111791396385011',
      productDescription: 'V_HOSO_IQF_R_NWNC_Yes',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '7171421010',
      productDescription: 'V_HOSO_IQF_R_NWNC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '717142113020',
      productDescription: 'V_HOSO_IQF_R_30_FWFC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '7181411010',
      productDescription: 'SEAWHITE_HOSO_BLOCKS_R_NWNC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'BLOCK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '71422010',
      productDescription: 'V_HOSO_IQF_C_NWNC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '717142111020',
      productDescription: 'V_HOSO_IQF_R_10_FWFC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '7171411010',
      productDescription: 'V_HOSO_BLOCKS_R_NWNC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'BLOCK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '717142112020',
      productDescription: 'V_HOSO_IQF_R_20_FWFC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '7181426010',
      productDescription: 'SEAWHITE_HOSO_IQF_CHILLED_NWNC_No',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'INDIVIDUALLY QUICK FROZEN',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'No',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    },
    {
      productCode: '7171436011',
      productDescription: 'V_HOSO_CHILLED_CHILLED_NWNC_Yes',
      productGroup: 'SHRIMPS',
      species: 'SEA CAUGHT',
      productForm: 'HEAD ON SHELL ON',
      freezingTech: 'CHILLED',
      preparation: 'CHILLED SHRIMPS',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: 'Yes',
      glazePercent: '',
      glazeType: 'NWNC',
      treatment: 'No',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    }
  ];

  form: FormGroup;

  showForm = false;
  isViewMode = false;
  isEditMode = false;

  selectedProduct: ProductMaster | null = null;

  yieldFrom = 0;
  yieldTo = 100;

  constructor() {
    this.form = this.fb.group({
      productCode: ['', Validators.required],
      productDescription: ['', Validators.required],
      productGroup: ['', Validators.required],
      species: ['', Validators.required],
      productForm: ['', Validators.required],
      freezingTech: ['', Validators.required],
      preparation: ['', Validators.required],
      subProductForm: [''],
      coat: [''],
      sauceWeight: [''],
      shrimpShape: [''],
      glazeStatus: [''],
      glazePercent: [''],
      glazeType: [''],
      treatment: [''],
      tradeName: [''],
      shrimpPercent: [''],
      shrimpWeight: [''],
      finFrom: [0],
      finTo: [10]
    });
  }

  goBack(): void {
    this.router.navigate(['/products']);
  }

  addProduct(): void {
    this.isViewMode = false;
    this.isEditMode = false;
    this.selectedProduct = null;

    this.form.reset({
      productCode: '',
      productDescription: '',
      productGroup: '',
      species: '',
      productForm: '',
      freezingTech: '',
      preparation: '',
      subProductForm: '',
      coat: '',
      sauceWeight: '',
      shrimpShape: '',
      glazeStatus: '',
      glazePercent: '',
      glazeType: '',
      treatment: '',
      tradeName: '',
      shrimpPercent: '',
      shrimpWeight: '',
      finFrom: 0,
      finTo: 10
    });

    this.form.enable();

    this.yieldFrom = 0;
    this.yieldTo = 100;

    this.showForm = true;
  }

  viewProduct(product: ProductMaster): void {
    this.selectedProduct = product;

    this.isViewMode = true;
    this.isEditMode = false;

    this.form.patchValue(product);

    this.yieldFrom = product.finFrom;
    this.yieldTo = product.finTo;

    this.form.disable();

    this.showForm = true;
  }

  editProduct(): void {
    this.isViewMode = false;
    this.isEditMode = true;

    this.form.enable();
  }

  closeForm(): void {
    this.showForm = false;

    this.form.enable();

    this.selectedProduct = null;
  }

  saveProduct(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const product: ProductMaster = {
      ...value,
      finFrom: this.yieldFrom,
      finTo: this.yieldTo
    };

    if (this.isEditMode && this.selectedProduct) {

      const index = this.products.indexOf(
        this.selectedProduct
      );

      if (index !== -1) {
        this.products[index] = product;
        this.products = [...this.products];
      }

    } else {

      this.products = [
        product,
        ...this.products
      ];

    }

    this.closeForm();
  }

  addNew(type: string): void {
    console.log(`Add New ${type}`);
  }

  updateYieldFrom(event: Event): void {

    const value = Number(
      (event.target as HTMLInputElement).value
    );

    if (value >= this.yieldTo) {
      this.yieldFrom = Math.max(
        0,
        this.yieldTo - 1
      );

      return;
    }

    this.yieldFrom = value;
  }

  updateYieldTo(event: Event): void {

    const value = Number(
      (event.target as HTMLInputElement).value
    );

    if (value <= this.yieldFrom) {
      this.yieldTo = Math.min(
        100,
        this.yieldFrom + 1
      );

      return;
    }

    this.yieldTo = value;
  }

  isInvalid(field: string): boolean {

    const control = this.form.get(field);

    return !!(
      control &&
      control.invalid &&
      control.touched
    );
  }
}