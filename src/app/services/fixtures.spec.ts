import { TestBed } from '@angular/core/testing';

import { Fixtures } from './fixtures';

describe('Fixtures', () => {
  let service: Fixtures;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Fixtures);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
