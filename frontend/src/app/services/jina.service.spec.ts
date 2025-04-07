import { TestBed } from '@angular/core/testing';

import { JinaService } from './jina.service';

describe('JinaService', () => {
  let service: JinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
