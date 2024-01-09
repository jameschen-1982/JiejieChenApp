import { TestBed } from '@angular/core/testing';

import { StrapiCmsService } from './strapi-cms.service';

describe('StrapiCmsService', () => {
  let service: StrapiCmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StrapiCmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
