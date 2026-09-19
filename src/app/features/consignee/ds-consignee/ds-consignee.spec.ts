import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DsConsignee } from './ds-consignee';

describe('DsConsignee', () => {
  let component: DsConsignee;
  let fixture: ComponentFixture<DsConsignee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DsConsignee],
    }).compileComponents();

    fixture = TestBed.createComponent(DsConsignee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
