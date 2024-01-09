import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HomePage} from "../models/cms/home-page";
import {environment} from "../../environments/environment";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class StrapiCmsService {

  constructor(private http: HttpClient) { }

  getHomePageContent(): Observable<HomePage> {
    return this.http.get<any>(environment.cmsApiUrl + '/home-page').pipe<HomePage>(map(x => {
      let homePage: HomePage = { AboutHeading: x.data.attributes.AboutHeading };
      return homePage;
    }));
  }
}
