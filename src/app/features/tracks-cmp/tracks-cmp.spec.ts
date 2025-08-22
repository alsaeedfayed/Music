import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksCMP } from './tracks-cmp';

describe('TracksCMP', () => {
  let component: TracksCMP;
  let fixture: ComponentFixture<TracksCMP>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TracksCMP]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TracksCMP);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
