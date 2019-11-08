import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from 'src/app/map-service/map.service';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  mapDate: NgbDate;
  @ViewChild('dateInput', { static: false }) dateInputRef: ElementRef;

  constructor(private mapService: MapService, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.mapService.mapDateChanged
      .subscribe(
        (mapDate: NgbDate) => {
          this.mapDate = mapDate;
        }
      );
  }

  onDateChange() {
    this.mapService.setMapDate(this.mapDate);
  }

}
