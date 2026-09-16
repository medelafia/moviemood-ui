import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSkeleton } from './movie-skeleton';

describe('MovieSkeleton', () => {
  let component: MovieSkeleton;
  let fixture: ComponentFixture<MovieSkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
