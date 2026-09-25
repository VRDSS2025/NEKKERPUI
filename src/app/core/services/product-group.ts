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

export interface SubProductForms{
  id? : number;
  shortForm: string,
  fullDescription: string
}

export interface FreezingTechnologies{
  id? : number,
  freezeCode: string,
  description: string,
  freezeTechnology: string,
  shortForm: string
}

export interface ProductPreparations{
  id? : number,
  code : string,
  productShortForm: string,
  effectiveFrom: string,
  hsnDescriptionInTally: string,
  description: string,
  hscode: string,
  autoEmailShortForm: string,
  taxRateInTally: number
}

export interface Consignees {
  id?: number;
  consigneeCode: string;
  contactPerson: string;
  consigneeName: string;
  phone: string;
  address1: string;
  paymentMailId: string;
  address2: string;
  irsNumber: string;
  state: string;
  gstNo: string;
  zipcode: string;
  countryId: number;
  effectiveFromDate: string;
  isHavePOFormat: boolean;
  docsEmailId: string;
  billOfLading: boolean;
  certificateOfOrigin: boolean;
  dS2031Certificate: boolean;
  commercialInvoice: boolean;
  packingInvoice: boolean;
  simpSheet: boolean;
  certificateOfAnalysis: boolean;
  codeList: boolean;
  bapTraceAbility: boolean;
  healthCertificate: boolean;
  simpDocs: boolean;
  microReport: boolean;
  surveyReport: boolean;
  testReports: boolean;
  shipmentDetails: boolean;
  farmerEvidence: boolean;
  annexure: boolean;
  haccpGuaranteeLetter: boolean;
  netWeightReport: boolean;
  aquacultureSimpDataForm: boolean;
  modelCatchCertificate: boolean;
  simpAquaCultureTraceability: boolean;
  eicApproval: boolean;
  dspCodeListAndRM: boolean;
  is: boolean;
  simpPreProcessing: boolean;
  simpDataEntryForm: boolean;
  moistureReport: boolean;
  antibioticReport: boolean;
  inHouseMicroReport: boolean;
}

export interface DSConsignees{
  id? : number,
  dsConsigneeCode: string,
  contactPerson: string,
  dsConsigneeName: string,
  phone: string,
  mailId: string,
  irsNumber: string,
  countryId: number
}

export interface Countries{
  id? : number,
  countryCode: string,
  group: string,
  name: string
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

    private readonly SubProductFormsUrl = 
    'https://apinek.hrms.vrtechnosolutions.com/api/SubProductForms';

    private readonly FreezingTechnologiesUrl = 
    'https://apinek.hrms.vrtechnosolutions.com/api/FreezingTechnologies';

    private readonly ProductPreparationsUrl = 
    'https://apinek.hrms.vrtechnosolutions.com/api/ProductPreparations';

    private readonly consigneeUrl =
    'https://apinek.hrms.vrtechnosolutions.com/api/Consignees';

    private readonly DSConsigneesurl =
    'https://apinek.hrms.vrtechnosolutions.com/api/DSConsignees';

    private readonly CountriesUrl = 
    'https://apinek.hrms.vrtechnosolutions.com/api/Countries';

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

  // =====================================================
  // SubProductForms Short Codes
  // =====================================================


  getSubProductForms() : Observable<SubProductForms[]>{
    return this.http.get<SubProductForms[]>(
      this.SubProductFormsUrl
    )
  }

  createSubProductForms(
    Payload : SubProductForms
  ): Observable<SubProductForms[]>{
    return this.http.post<SubProductForms[]>(
      this.SubProductFormsUrl,
      Payload
    )
  }
  
  UpdateSubProductForms(
    id : number,
    payload : SubProductForms
  ) : Observable<SubProductForms[]>{
    return this.http.put<SubProductForms[]>(
     ` ${this.SubProductFormsUrl}/${id}`,payload
    );
  }

  /*================================================
  FreezingTechnologies Short code 
  =================================================*/

  getFreezingTechnologies() : Observable<FreezingTechnologies[]>{
    return this.http.get<FreezingTechnologies[]>(
      this.FreezingTechnologiesUrl
    );
  }

  createFreezingTechnologies(
  payload : FreezingTechnologies) :
  Observable<FreezingTechnologies[]>{
    return this.http.post<FreezingTechnologies[]>(
      this.FreezingTechnologiesUrl,payload
    );
  } 

updateFreezingTechnologies(
  id: number,
  payload: FreezingTechnologies
): Observable<FreezingTechnologies[]> {
  return this.http.put<FreezingTechnologies[]>(
    `${this.FreezingTechnologiesUrl}/${id}`,
    payload
  );
}

/*=================================================
ProductPreparations
==================================================*/

getProductPreparations() : Observable<ProductPreparations[]>{
  return this.http.get<ProductPreparations[]>(
    this.ProductPreparationsUrl
  )
}

CreateProductPreparations(
  payload : ProductPreparations
): Observable<ProductPreparations[]>{
  return this.http.post<ProductPreparations[]>(
    this.ProductPreparationsUrl,payload
  )
}

updateProductPreparations(
  id : number,
  payload : ProductPreparations
): Observable<ProductPreparations[]>{
  return this.http.put<ProductPreparations[]>(
    `${this.ProductPreparationsUrl}/${id}`,payload
  )
}
// =====================================================
// CONSIGNEES
// =====================================================

getConsignees(): Observable<Consignees[]> {
  return this.http.get<Consignees[]>(
    this.consigneeUrl
  );
}

createConsignee(
  payload: Consignees
): Observable<Consignees> {
  return this.http.post<Consignees>(
    this.consigneeUrl,
    payload
  );
}

updateConsignee(
  id: number,
  payload: Consignees
): Observable<Consignees> {
  return this.http.put<Consignees>(
    `${this.consigneeUrl}/${id}`,
    payload
  );
}

// =====================================================
// DSCONSIGNEES
// =====================================================
getDsConsignees(): Observable<DSConsignees[]> {
  return this.http.get<DSConsignees[]>(
    this.DSConsigneesurl
  );
}

createDsConsignee(
  payload: DSConsignees
): Observable<DSConsignees> {
  return this.http.post<DSConsignees>(
    this.DSConsigneesurl,
    payload
  );
}

updateDsConsignee(
  id: number,
  payload: DSConsignees
): Observable<DSConsignees> {
  return this.http.put<DSConsignees>(
    `${this.DSConsigneesurl}/${id}`,
    payload
  );
}

// =====================================================
// Countries
// =====================================================
getCountries(): Observable<Countries[]> {
  return this.http.get<Countries[]>(
    this.CountriesUrl
  );
}

createCountries(
  payload: Countries
): Observable<Countries> {
  return this.http.post<Countries>(
    this.CountriesUrl,
    payload
  );
}

updateCountriese(
  id: number,
  payload: Countries
): Observable<Countries> {
  return this.http.put<Countries>(
    `${this.CountriesUrl}/${id}`,
    payload
  );
}



}