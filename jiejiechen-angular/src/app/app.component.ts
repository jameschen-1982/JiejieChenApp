import {Component} from '@angular/core';
import { DateTime } from 'luxon';
import {Title} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {StrapiCmsService} from "./services/strapi-cms.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "James Chen - Team Lead, Application Architect, Full Stack Software Developer - 0430 227 759";
  homePageContent$ = this.strapiCmsService.getHomePageContent();

  constructor(private titleService:Title, private strapiCmsService: StrapiCmsService) {
    this.titleService.setTitle(this.title);
  }

  get age() {
    return new Date().getFullYear() - 1982;
  }

  get year() {
    return new Date().getFullYear();
  }

  get currentEmploymentLength() {
    const now = DateTime.now();
    const then = DateTime.fromISO('2021-10-01');
    const diff = now.diff(then, ['years', 'months', 'days']).toObject();
    return `${diff.years} year${diff.years ?? 0 > 1 ? "s" : ""} ${diff.months} month${diff.months ?? 0 > 1 ? "s" : ""}`;
  }

  exportAsPDF() {
    window.print();
  }

  downloadCV() {

  }

  protected readonly Date = Date;
}
