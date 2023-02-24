import { Component, ElementRef, ViewChild } from '@angular/core';
import { DateTime, Duration } from 'luxon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = "Jiejie (James) Chen - Lead Full Stack Web Developer";

  constructor(private titleService:Title) {
    this.titleService.setTitle(this.title);
  }

  get age() {
    return new Date().getFullYear() - 1982;
  }

  get currentEmploymentLength() {
    const now = DateTime.now();
    const then = DateTime.fromISO('2021-10-01');
    const diff = now.diff(then, ['years', 'months', 'days']).toObject();
    return `${diff.years} year ${diff.months} months`;
  }

  exportAsPDF() {
    window.print();
  }
}
