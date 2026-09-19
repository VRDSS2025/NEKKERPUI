import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Consigne } from './consigne';

describe('Consigne', () => {
  let component: Consigne;
  let fixture: ComponentFixture<Consigne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Consigne],
    }).compileComponents();

    fixture = TestBed.createComponent(Consigne);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
