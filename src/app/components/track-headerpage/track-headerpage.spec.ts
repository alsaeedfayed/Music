import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackHeaderpage } from './track-headerpage';

describe('TrackHeaderpage', () => {
  let component: TrackHeaderpage;
  let fixture: ComponentFixture<TrackHeaderpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrackHeaderpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrackHeaderpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
