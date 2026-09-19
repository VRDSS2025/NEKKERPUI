import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Consignee } from './consignee';

describe('Consignee', () => {
  let component: Consignee;
  let fixture: ComponentFixture<Consignee>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consignee],
    }).compileComponents();

    fixture = TestBed.createComponent(Consignee);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
