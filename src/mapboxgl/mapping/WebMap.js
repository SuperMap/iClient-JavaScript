import mapboxgl from 'mapbox-gl';
import { createWebMapExtending } from '@supermapgis/iclient-common/mapping/WebMap';
import { createWebMapV2Extending } from '@supermapgis/iclient-common/mapping/WebMapV2';
import { createWebMapV3Extending } from '@supermapgis/iclient-common/mapping/WebMapV3';
import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';
import { createMapStyleExtending } from '@supermapgis/iclient-common/mapping/MapStyle';
import { createWebMapBaseExtending } from '@supermapgis/iclient-common/mapping/WebMapBase';
import { L7LayerUtil } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { featureFilter, expression } from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8';
import { L7Layer, L7 } from '../overlay/L7Layer';
import MapManager from './webmap/MapManager';

export class WebMap extends createWebMapExtending(mapboxgl.Evented, { mapRepo: mapboxgl }) {
  _createWebMapFactory(type) {
    const commonFactoryOptions = { MapManager, mapRepo: mapboxgl, mapRepoName: 'mapbox-gl' };
    const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec, L7Layer, L7, proj4: this.options.proj4 });
    switch (type) {
      case 'MapStyle':
        return createMapStyleExtending(createMapClassExtending(mapboxgl.Evented), commonFactoryOptions);
      case 'WebMap3':
        return createWebMapV3Extending(createMapClassExtending(mapboxgl.Evented), {
          ...commonFactoryOptions,
          l7LayerUtil
        });
      default:
        return createWebMapV2Extending(
          createWebMapBaseExtending(createMapClassExtending(mapboxgl.Evented), 'fire'),
          commonFactoryOptions
        );
    }
  }
}
