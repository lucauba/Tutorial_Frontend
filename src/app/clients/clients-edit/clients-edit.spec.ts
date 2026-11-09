import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientsEditPage } from './clients-edit';

describe('ClientsEdit', () => {
  let component: ClientsEditPage;
  let fixture: ComponentFixture<ClientsEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientsEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
