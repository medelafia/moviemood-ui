import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorySkeleton } from './history-skeleton';

describe('HistorySkeleton', () => {
  let component: HistorySkeleton;
  let fixture: ComponentFixture<HistorySkeleton>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorySkeleton]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorySkeleton);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
