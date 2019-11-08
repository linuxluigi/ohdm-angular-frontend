import { Injectable, EventEmitter } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private mapDate: NgbDate;
  mapDateChanged = new EventEmitter<NgbDate>();
  
  constructor() { }

  getMapDate() {
    return new NgbDate(
      this.mapDate.year, 
      this.mapDate.month,
      this.mapDate.day
    );
  }

  setMapDate(mapDate: NgbDate) {
    this.mapDate = mapDate;
    this.mapDateChanged.emit(mapDate);
  }

}
