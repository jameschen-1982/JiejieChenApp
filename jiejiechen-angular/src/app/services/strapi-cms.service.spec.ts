import {TestBed} from '@angular/core/testing';

import {StrapiCmsService} from './strapi-cms.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('StrapiCmsService', () => {
  let service: StrapiCmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        StrapiCmsService
      ]
    });
    service = TestBed.inject(StrapiCmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
