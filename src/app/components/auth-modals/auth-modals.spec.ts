import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthModals } from './auth-modals';

describe('AuthModals', () => {
  let component: AuthModals;
  let fixture: ComponentFixture<AuthModals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthModals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthModals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
