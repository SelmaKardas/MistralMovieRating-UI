import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesRatingListComponent } from './movies-rating-list.component';

describe('MoviesRatingListComponent', () => {
  let component: MoviesRatingListComponent;
  let fixture: ComponentFixture<MoviesRatingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesRatingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesRatingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
