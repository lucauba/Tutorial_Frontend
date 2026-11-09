import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameItemPage } from './game-item';

describe('GameItem', () => {
  let component: GameItemPage;
  let fixture: ComponentFixture<GameItemPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameItemPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GameItemPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
