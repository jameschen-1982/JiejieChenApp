import {Injectable, inject} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {Convert, HomePage} from "../models/cms/home-page";

@Injectable({
  providedIn: 'root'
})
export class StrapiCmsService {
  private readonly http = inject(HttpClient);

  getHomePageContent(): Observable<HomePage> {
    return this.http
      .get(environment.cmsApiUrl + '/home-page?populate=*', { responseType: 'text' })
      .pipe<HomePage>(map((data) => Convert.toHomePage(data) ));
  }
}
