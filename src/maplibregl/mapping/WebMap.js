import maplibregl from 'maplibre-gl';
import { createWebMapExtending } from '@supermapgis/iclient-common/mapping/WebMap';
import { createWebMapV2Extending } from '@supermapgis/iclient-common/mapping/WebMapV2';
import { createWebMapV3Extending } from '@supermapgis/iclient-common/mapping/WebMapV3';
import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';
import { createMapStyleExtending } from '@supermapgis/iclient-common/mapping/MapStyle';
import { createWebMapBaseExtending } from '@supermapgis/iclient-common/mapping/WebMapBase';
import { L7LayerUtil } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { featureFilter, expression } from '@maplibre/maplibre-gl-style-spec';
import spec from '@maplibre/maplibre-gl-style-spec/src/reference/v8';
import { L7Layer, L7 } from '../overlay/L7Layer';
import MapManager from './webmap/MapManager';

const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7});

export class WebMap extends createWebMapExtending(maplibregl.Evented, { LngLat: maplibregl.LngLat, CRS: maplibregl.CRS }) {

  _createWebMapV2(commonOptions, mapOptions) {
    const WebMapV2 = createWebMapV2Extending(createWebMapBaseExtending(createMapClassExtending(maplibregl.Evented)), { MapManager, mapRepo: maplibregl });
    const webMapHandler = new WebMapV2(this.mapId, commonOptions, mapOptions, this.layerFilter);
    return webMapHandler;
  }

  _createWebMapV3(commonOptions, mapOptions) {
    const WebMapV3 = createWebMapV3Extending(createMapClassExtending(maplibregl.Evented), { MapManager, mapRepo: maplibregl, l7LayerUtil });
    const webMapHandler = new WebMapV3(
      this.mapId,
      {
        ...commonOptions,
        server: this.options.serverUrl,
        iportalServiceProxyUrl: this.webMapService.iportalServiceProxyUrl
      },
      mapOptions
    );
    return webMapHandler;
  }

  _createMapStyle(commonOptions, mapOptions) {
     const MapStyle = createMapStyleExtending(maplibregl.Evented);
     const mapStyleHandler = new MapStyle(this.mapId, commonOptions, mapOptions);
     return mapStyleHandler;
   }
}