import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {StrapiCmsService} from "./services/strapi-cms.service";
import {Title} from "@angular/platform-browser";

describe('AppComponent', () => {
  beforeEach(async () => {
    const spy = jasmine.createSpyObj<StrapiCmsService>(['getHomePageContent']);

    await TestBed.configureTestingModule({
      providers: [
        Title,
        AppComponent,
        {provide: StrapiCmsService, useValue: spy}
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'James Chen - Team Lead, Application Architect, Full Stack Software Developer - 0430 227 759'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('James Chen - Team Lead, Application Architect, Full Stack Software Developer - 0430 227 759');
  });
});
