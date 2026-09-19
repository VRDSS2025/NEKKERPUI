import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProductGroupModel {
  id?: number;
  productGroupCode: string;
  productGroupName: string;
  description?: string;
  createdBy?: string;
  modifiedBy?: string;
}

@Injectable({ providedIn: 'root' })
export class ProductGroup {

  private readonly http = inject(HttpClient);

  private readonly baseUrl = 'https://apinek.hrms.vrtechnosolutions.com/api/ProductGroups';   // <-- match your backend

  getProductGroups(): Observable<ProductGroupModel[]> {
    return this.http.get<ProductGroupModel[]>(this.baseUrl);
  }

  createProductGroup(payload: ProductGroupModel): Observable<ProductGroupModel> {
    return this.http.post<ProductGroupModel>(this.baseUrl, payload);
  }

  updateProductGroup(id: number, payload: ProductGroupModel): Observable<ProductGroupModel> {
    return this.http.put<ProductGroupModel>(`${this.baseUrl}/${id}`, payload);
  }
}