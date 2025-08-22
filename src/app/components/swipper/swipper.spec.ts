import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Swipper } from './swipper';

describe('Swipper', () => {
  let component: Swipper;
  let fixture: ComponentFixture<Swipper>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Swipper]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Swipper);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
