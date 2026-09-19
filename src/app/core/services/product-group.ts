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

export interface ProductSpecies {
  id?: number;
    speciesCode: string,
  productGroupId: number,
  productCommonName: string,
  simpProductCode: string,
  species: string,
  shortForm: string,
  scientificName: string
}

export interface ProductShortCodes {
  id? : number,
  code: string,
  shortForm: string,
  description: string
}

@Injectable({
  providedIn: 'root'
})
export class ProductGroup {

  private readonly http = inject(HttpClient);

  private readonly baseUrl =
    'https://apinek.hrms.vrtechnosolutions.com/api/ProductGroups';

  private readonly speciesUrl =
    'https://apinek.hrms.vrtechnosolutions.com/api/ProductSpecies';

    private readonly ProductShortCodesUrl = 
    'https://apinek.hrms.vrtechnosolutions.com/api/ProductShortCodes';

  // =====================================================
  // PRODUCT GROUP
  // =====================================================

  getProductGroups(): Observable<ProductGroupModel[]> {
    return this.http.get<ProductGroupModel[]>(
      this.baseUrl
    );
  }

  createProductGroup(
    payload: ProductGroupModel
  ): Observable<ProductGroupModel> {

    return this.http.post<ProductGroupModel>(
      this.baseUrl,
      payload
    );
  }

  updateProductGroup(
    id: number,
    payload: ProductGroupModel
  ): Observable<ProductGroupModel> {

    return this.http.put<ProductGroupModel>(
      `${this.baseUrl}/${id}`,
      payload
    );
  }

  // =====================================================
  // PRODUCT SPECIES
  // =====================================================

  getProductSpecies(): Observable<ProductSpecies[]> {
    return this.http.get<ProductSpecies[]>(
      this.speciesUrl
    );
  }

  createProductSpecies(
    payload: ProductSpecies
  ): Observable<ProductSpecies> {

    return this.http.post<ProductSpecies>(
      this.speciesUrl,
      payload
    );
  }

  updateProductSpecies(
    id: number,
    payload: ProductSpecies
  ): Observable<ProductSpecies> {

    return this.http.put<ProductSpecies>(
      `${this.speciesUrl}/${id}`,
      payload
    );
  }

    // =====================================================
  // PRODUCT Short Codes
  // =====================================================

  getProductShortCodes() : Observable<ProductShortCodes[]>{
    return this.http.get<ProductShortCodes[]>(
      this.ProductShortCodesUrl
    );
  }

  createProductShortCodes(
    payload : ProductShortCodes
  ) : Observable<ProductShortCodes[]>{
    return this.http.post<ProductShortCodes[]>(
      this.ProductShortCodesUrl,
      payload
    );
  }

  updateProductShortCodes(
    id : number,
    payload : ProductShortCodes
  ) : Observable<ProductShortCodes[]>{
    return this.http.put<ProductShortCodes[]>(
      `${this.ProductShortCodesUrl}/${id}`,
      payload
    );
  }

}