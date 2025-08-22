import { TestBed } from '@angular/core/testing';

import { Play } from './play';

describe('Play', () => {
  let service: Play;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Play);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
