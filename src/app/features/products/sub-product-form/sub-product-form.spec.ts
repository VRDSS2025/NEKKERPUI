import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubProductForm } from './sub-product-form';

describe('SubProductForm', () => {
  let component: SubProductForm;
  let fixture: ComponentFixture<SubProductForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubProductForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SubProductForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
