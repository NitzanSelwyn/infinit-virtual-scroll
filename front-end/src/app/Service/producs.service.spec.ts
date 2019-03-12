import { TestBed } from '@angular/core/testing';

import { ProducsService } from './producs.service';

describe('ProducsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProducsService = TestBed.get(ProducsService);
    expect(service).toBeTruthy();
  });
});
