import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { MapService } from 'src/app/map-service/map.service';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {
  mapDate: NgbDate;
  @ViewChild('dateInput', { static: false }) dateInputRef: ElementRef;
  maxDate: NgbDate = this.calendar.getToday();

  constructor(private mapService: MapService, private route: ActivatedRoute, private router: Router, private calendar: NgbCalendar) { }

  ngOnInit() {
    this.mapService.mapDateChanged
      .subscribe(
        (mapDate: NgbDate) => {
          this.mapDate = mapDate;
        }
      );
  }

  onDateChange() {
    // update mapDate model in mapService
    this.mapService.setMapDate(this.mapDate);

    // update URL
    let navigationExtras: NavigationExtras = {
      fragment: this.route.snapshot.fragment
    };
    this.router.navigate(['/map', this.mapDate.year, this.mapDate.month, this.mapDate.day], navigationExtras);
  }

}
