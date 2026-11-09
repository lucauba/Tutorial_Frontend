import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoansListPage } from './loans-list.page';

describe('LoansListPage', () => {
  let component: LoansListPage;
  let fixture: ComponentFixture<LoansListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoansListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(LoansListPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
