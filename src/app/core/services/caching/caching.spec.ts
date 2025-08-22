import { TestBed } from '@angular/core/testing';

import { Caching } from './caching';

describe('Caching', () => {
  let service: Caching;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Caching);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
