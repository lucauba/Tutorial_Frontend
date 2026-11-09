import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameEditPage } from './game-edit';

describe('GameEditPage', () => {
  let component: GameEditPage;
  let fixture: ComponentFixture<GameEditPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameEditPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GameEditPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
