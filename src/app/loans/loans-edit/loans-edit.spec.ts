import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoansEdit } from './loans-edit';

describe('LoansEdit', () => {
  let component: LoansEdit;
  let fixture: ComponentFixture<LoansEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(LoansEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
