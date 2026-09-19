import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PackingStyle } from './packing-style';

describe('PackingStyle', () => {
  let component: PackingStyle;
  let fixture: ComponentFixture<PackingStyle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PackingStyle],
    }).compileComponents();

    fixture = TestBed.createComponent(PackingStyle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
