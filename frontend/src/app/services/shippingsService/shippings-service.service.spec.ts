import { TestBed } from '@angular/core/testing';

import { ShippingsServiceService } from './shippings-service.service';

describe('ShippingsServiceService', () => {
  let service: ShippingsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
