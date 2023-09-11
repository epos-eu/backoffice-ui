/* eslint-disable @typescript-eslint/dot-notation */
import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Subject } from 'rxjs';
import { SpatialCoverageType } from 'src/utility/enums/spatialCoverageType.enum';

@Component({
  selector: 'app-spatial-coverage-map',
  templateUrl: './spatial-coverage-map.component.html',
  styleUrls: ['./spatial-coverage-map.component.scss'],
})
export class SpatialCoverageMapComponent implements AfterViewInit, OnInit {
  @Input() mapId?: string;
  @Input() spatialRange: Array<string | undefined> = [''];
  @Input() coordinatesChange: Subject<Array<string | undefined>> = new Subject();

  private map: L.Map | undefined;

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit() {
    this.coordinatesChange.subscribe((v) => {
      this.spatialRange = v;
      this.map?.eachLayer((layer) => {
        if (layer instanceof L.Marker || layer instanceof L.Polygon) {
          this.map?.removeLayer(layer);
        }
      });

      setTimeout(() => {
        this.getDataOnMaps();
      }, 100);
    });
  }

  private initMap(): void {
    const esriLink = '<a href="https://www.esri.com/">Esri</a>';
    const whoLink = 'Source: Esri';
    const tiles = L.tileLayer(
      'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      {
        attribution: `| Powered by ${esriLink} | ${whoLink}`,
      },
    );
    this.map = L.map('map' + this.mapId, {
      center: [45, 3],
      zoom: 3,
      zoomControl: true,
      touchZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
      dragging: true,
    });
    tiles.addTo(this.map);

    this.getDataOnMaps();
  }

  private getDataOnMaps() {
    this.spatialRange.forEach((block) => {
      if (this.spatialRange !== undefined && block !== '') {
        this.getPolygonFromString(block).then((coordinates) => {
          if (coordinates.length !== 0) {
            if (block?.includes(SpatialCoverageType.POINT)) {
              const icon = new L.Icon.Default();
              icon.options.shadowSize = [0, 0];
              icon.options.imagePath = 'assets/img/leaflet/';
              icon.options.iconUrl = 'marker-icon.png';
              icon.options.shadowUrl = 'marker-shadow.png';
              const spatialPoint = new L.Marker({ lat: coordinates[0][1], lng: coordinates[0][0] }, { icon: icon });
              if (this.map !== undefined) {
                spatialPoint.addTo(this.map);
                this.map.flyTo({ lat: coordinates[0][1], lng: coordinates[0][0] });
              }
            } else {
              const globalBbox = new L.Polygon(coordinates as Array<L.LatLngTuple>);

              if (this.map !== undefined) {
                globalBbox.addTo(this.map);
                this.map.panTo(coordinates[0] as L.LatLngTuple);
              }
            }
          }
        });
      }
    });

    if (this.spatialRange.length > 1) {
      this.map?.setZoom(0);
    }
  }

  private getPolygonFromString(stringPolygon: string | undefined): Promise<Array<Array<number>>> {
    let regex = /\(\((.*?)\)\)/g;
    if (stringPolygon?.includes(SpatialCoverageType.POINT)) {
      regex = /\((.*?)\)/g;
    }
    const matches: Array<Array<number>> = [];

    let match;

    if (stringPolygon !== undefined) {
      while ((match = regex.exec(stringPolygon)) !== null) {
        match[1].split(',').map((value) => {
          const coord = value.trim().split(' ');
          matches.push([Number(coord[0]), Number(coord[1])]);
        });
      }
    }

    return new Promise((resolve) => {
      resolve(matches);
    });
  }
}
