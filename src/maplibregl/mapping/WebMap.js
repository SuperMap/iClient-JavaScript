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


export class WebMap extends createWebMapExtending(maplibregl.Evented, { LngLat: maplibregl.LngLat, CRS: maplibregl.CRS }) {
  _createWebMapFactory(type) {
    const commonFactoryOptions = { MapManager, mapRepo: maplibregl, mapRepoName: 'maplibre-gl' };
    const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7, proj4: this.options.proj4 });
    switch (type) {
      case 'MapStyle':
        return createMapStyleExtending(createMapClassExtending(maplibregl.Evented), commonFactoryOptions);
      case 'WebMap3':
        return createWebMapV3Extending(createMapClassExtending(maplibregl.Evented), {
          ...commonFactoryOptions,
          l7LayerUtil
        });
      default:
        return createWebMapV2Extending(
          createWebMapBaseExtending(createMapClassExtending(maplibregl.Evented), 'fire'),
          commonFactoryOptions
        );
    }
  }
}