import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasterFormDialog } from './master-form-dialog';

describe('MasterFormDialog', () => {
  let component: MasterFormDialog;
  let fixture: ComponentFixture<MasterFormDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterFormDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(MasterFormDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
