import { Component, ElementRef, ViewChild } from '@angular/core';
import { DateTime, Duration } from 'luxon';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'James Chen - Fullstack Web Developer, Senior Software Engineer';

  get age() {
    return 2021 - 1982;
  }

  get currentEmploymentLength() {
    const now = DateTime.now();
    const then = DateTime.fromISO('2020-03-01');
    const diff = now.diff(then, ['years', 'months', 'days']).toObject();
    return `${diff.years} year ${diff.months} months`;
  }

  exportAsPDF() {
    window.print();
  }
}
