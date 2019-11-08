import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';

import { fromLonLat } from 'ol/proj';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { MapService } from '../map-service/map.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute, private mapService: MapService) { }

  ngOnInit() {

    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        const requestDate: NgbDate = new NgbDate(Number(params['year']), Number(params['month']), Number(params['day']));
        this.mapService.setMapDate(
          requestDate
        );
      }
    );

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: fromLonLat([6.661594, 50.433237]),
      zoom: 3
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }


}
