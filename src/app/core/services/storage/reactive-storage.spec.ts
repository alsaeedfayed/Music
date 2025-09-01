import { TestBed } from '@angular/core/testing';

import { ReactiveStorage } from './reactive-storage';

describe('ReactiveStorage', () => {
  let service: ReactiveStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
