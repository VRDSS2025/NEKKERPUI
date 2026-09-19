import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfCountries } from './list-of-countries';

describe('ListOfCountries', () => {
  let component: ListOfCountries;
  let fixture: ComponentFixture<ListOfCountries>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfCountries],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfCountries);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
