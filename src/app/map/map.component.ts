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

        if (this.map) {
          // remove all old layers & a new request layer
          this.removeAllMapLayers();
          this.setMapLayer(requestDate);
        } else {
          // create map view if not exist
          this.setupMap(requestDate);
        }
      }
    );

  }

  setupMap(mapDate: NgbDate) {
        this.map = new OlMap({
      target: 'map',
      layers: [],
      view: this.view,
    });

    this.setMapLayer(mapDate);

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

  setMapLayer(mapDate: NgbDate) {
    this.source = new OlXYZ({
      url: 'http://localhost:8000/tile/' + mapDate.year + '/' + mapDate.month + '/' + mapDate.day + '/{z}/{x}/{y}/tile.png'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.map.addLayer(this.layer);
  }

  removeAllMapLayers() {
    // remove all map layers
    let map = this.map;
    this.map.getLayers().forEach(function (layer) {
      map.removeLayer(layer);
    });
  }

  getPermalink() {
    if (this.route.snapshot.fragment) {
      let hash: string = this.route.snapshot.fragment.replace('map=', '');
      let parts: string[] = hash.split('/');

      if (parts.length != 3) {
        console.log("permalink url is invalid!")
        this.setDefaultPermalink();
      } else {
        let latitude: number = Number(parts[1]);
        let longitude: number = Number(parts[2]);
        let zoom: number = Number(parts[0]);
        this.view = new OlView({
          center: fromLonLat([longitude, latitude]),
          zoom: zoom
        });
      }
    } else {
      this.setDefaultPermalink();
    }
  }

  setDefaultPermalink() {
    // set default position in berlin
    this.view = new OlView({
      center: fromLonLat([13.404954, 52.520008]),
      zoom: 13
    });
  }

}
