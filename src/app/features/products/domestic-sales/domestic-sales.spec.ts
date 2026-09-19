import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DomesticSales } from './domestic-sales';

describe('DomesticSales', () => {
  let component: DomesticSales;
  let fixture: ComponentFixture<DomesticSales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DomesticSales],
    }).compileComponents();

    fixture = TestBed.createComponent(DomesticSales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
