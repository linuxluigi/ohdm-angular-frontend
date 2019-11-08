import { Component, OnInit } from '@angular/core';

import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import { transform } from "ol/proj";

import { fromLonLat } from 'ol/proj';
import { ActivatedRoute, Params, Router, NavigationExtras } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private router: Router, private mapService: MapService) { }

  ngOnInit() {

    this.getPermalink();

    // trigger when url was updated
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        // set new mapDate
        const requestDate: NgbDate = new NgbDate(Number(params['year']), Number(params['month']), Number(params['day']));
        this.mapService.setMapDate(requestDate);

        // TODO set new map for requestDate
        console.log(requestDate);
      }
    );

    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view,
    });

    // update permalink url
    let view = this.map.getView();
    let router = this.router;


    let updatePermalink = function () {
      let center = transform(view.getCenter(), 'EPSG:3857', 'EPSG:4326')
      let latitude = Math.round(center[0] * 100) / 100;
      let longitude = Math.round(center[1] * 100) / 100;
      let permalinkFragment: string = "map=" + view.getZoom() + "/" + longitude + "/" + latitude;
      let navigationExtras: NavigationExtras = {
        fragment: permalinkFragment
      };
      router.navigate([], navigationExtras);
    };

    // trigger when map was moved
    this.map.on('moveend', updatePermalink);
  }

  getPermalink() {
    let hash: string = this.route.snapshot.fragment.replace('map=', '');
    let parts: string[] = hash.split('/');

    if (parts.length != 3) {
      console.log("permalink url is invalid!")
      // set default position in berlin
      this.view = new OlView({
        center: fromLonLat([13.404954, 52.520008]),
        zoom: 13
      });
    } else {
      let latitude: number = Number(parts[1]);
      let longitude: number = Number(parts[2]);
      let zoom: number = Number(parts[0]);
      this.view = new OlView({
        center: fromLonLat([longitude, latitude]),
        zoom: zoom
      });
    }
  }

}
