import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRatingComponent } from './movies-rating.component';

describe('MoviesRatingComponent', () => {
  let component: MoviesRatingComponent;
  let fixture: ComponentFixture<MoviesRatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
