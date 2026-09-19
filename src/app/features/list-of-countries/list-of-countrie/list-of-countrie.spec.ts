import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListOfCountrie } from './list-of-countrie';

describe('ListOfCountrie', () => {
  let component: ListOfCountrie;
  let fixture: ComponentFixture<ListOfCountrie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOfCountrie],
    }).compileComponents();

    fixture = TestBed.createComponent(ListOfCountrie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
