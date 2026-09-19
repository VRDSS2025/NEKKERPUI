import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FreezingTechnology } from './freezing-technology';

describe('FreezingTechnology', () => {
  let component: FreezingTechnology;
  let fixture: ComponentFixture<FreezingTechnology>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreezingTechnology],
    }).compileComponents();

    fixture = TestBed.createComponent(FreezingTechnology);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
