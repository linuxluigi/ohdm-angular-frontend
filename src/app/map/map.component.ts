import { Component, OnInit } from "@angular/core";
import {
  ActivatedRoute,
  NavigationExtras,
  Params,
  Router,
} from "@angular/router";
import { NgbDate } from "@ng-bootstrap/ng-bootstrap";
import OlTileLayer from "ol/layer/Tile";
import OlMap from "ol/Map";
import { fromLonLat, transform } from "ol/proj";
import OlXYZ from "ol/source/XYZ";
import OlView from "ol/View";
import { Subscription } from "rxjs";
import { MapService } from "../map-service/map.service";

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;
  layer: OlTileLayer;
  view: OlView;
  paramsSubscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mapService: MapService
  ) {}

  ngOnInit() {
    this.getPermalink();

    // trigger when url was updated
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      // set new mapDate
      const requestDate: NgbDate = new NgbDate(
        Number(params.year),
        Number(params.month),
        Number(params.day)
      );
      this.mapService.setMapDate(requestDate);

      if (this.map) {
        // remove all old layers & a new request layer
        this.removeAllMapLayers();
        this.setMapLayer(requestDate);
      } else {
        // create map view if not exist
        this.setupMap(requestDate);
      }
    });
  }

  setupMap(mapDate: NgbDate) {
    this.map = new OlMap({
      target: "map",
      layers: [],
      view: this.view,
    });

    this.setMapLayer(mapDate);

    // update permalink url
    const view = this.map.getView();
    const router = this.router;

    const updatePermalink = function () {
      const center = transform(view.getCenter(), "EPSG:3857", "EPSG:4326");
      const latitude = Math.round(center[0] * 100) / 100;
      const longitude = Math.round(center[1] * 100) / 100;
      const permalinkFragment: string =
        "map=" + view.getZoom() + "/" + longitude + "/" + latitude;
      const navigationExtras: NavigationExtras = {
        fragment: permalinkFragment,
      };
      router.navigate([], navigationExtras);
    };

    // trigger when map was moved
    this.map.on("moveend", updatePermalink);
  }

  setMapLayer(mapDate: NgbDate) {
    // todo use enviroment vars
    this.source = new OlXYZ({
      urls: [
        "https://a.ohdm.net/" +
          mapDate.year +
          "/" +
          mapDate.month +
          "/" +
          mapDate.day +
          "/{z}/{x}/{y}/tile.png",
        "https://b.ohdm.net/" +
          mapDate.year +
          "/" +
          mapDate.month +
          "/" +
          mapDate.day +
          "/{z}/{x}/{y}/tile.png",
        "https://c.ohdm.net/" +
          mapDate.year +
          "/" +
          mapDate.month +
          "/" +
          mapDate.day +
          "/{z}/{x}/{y}/tile.png",
      ],
    });

    this.layer = new OlTileLayer({
      source: this.source,
    });

    this.map.addLayer(this.layer);
  }

  removeAllMapLayers() {
    // remove all map layers
    const map = this.map;
    this.map.getLayers().forEach(function (layer) {
      map.removeLayer(layer);
    });
  }

  getPermalink() {
    if (this.route.snapshot.fragment) {
      const hash: string = this.route.snapshot.fragment.replace("map=", "");
      const parts: string[] = hash.split("/");

      if (parts.length != 3) {
        console.log("permalink url is invalid!");
        this.setDefaultPermalink();
      } else {
        const latitude: number = Number(parts[1]);
        const longitude: number = Number(parts[2]);
        const zoom: number = Number(parts[0]);
        this.view = new OlView({
          center: fromLonLat([longitude, latitude]),
          zoom,
          maxZoom: 19,
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
      zoom: 13,
    });
  }
}
