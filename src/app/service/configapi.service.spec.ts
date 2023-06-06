import { TestBed } from '@angular/core/testing';

import { ConfigapiService } from './configapi.service';

describe('ConfigapiService', () => {
  let service: ConfigapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
