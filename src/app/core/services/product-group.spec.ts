import { TestBed } from '@angular/core/testing';
import { ProductGroup } from './product-group';

describe('ProductGroup', () => {
  let service: ProductGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductGroup);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
