import { TestBed } from '@angular/core/testing';

import { GraphcmsService } from './graphcms.service';

describe('GraphcmsService', () => {
  let service: GraphcmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GraphcmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
