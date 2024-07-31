/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import { decryptSources } from './decryptSource';
import { getServiceKey } from '@supermapgis/iclient-common/util/EncryptRequest';
import { createMapExtendExtending } from '@supermapgis/iclient-common/util/MapExtend';

/**
 * @function MapExtend
 * @description 扩展 mapboxgl.Map。
 * @private
 */
export var MapExtend = (function () {
  if (mapboxgl.VectorTileSource && mapboxgl.VectorTileSource.prototype.beforeLoadBak === undefined) {
    mapboxgl.VectorTileSource.prototype.beforeLoadBak = mapboxgl.VectorTileSource.prototype.beforeLoad;
    mapboxgl.VectorTileSource.prototype.beforeLoad = async function (id, options) {
      const url = options && options.tiles && options.tiles[0];
      if (decryptSources.values.includes(id) && url) {
        const res = await getServiceKey(url);
        if (res) {
          this.decryptOptions = {
            key: res.serviceKey,
            algorithm: res.algorithm
          };
        }
      }
      this.beforeLoadBak(id, options);
    };
  }

  const originMapProto = mapboxgl.Map.prototype;

  if (!originMapProto._inherit) {
    mapboxgl.Map = class MapEnhance extends createMapExtendExtending(mapboxgl) {
      constructor(options) {
        super(options);
      }
    }
    // 防止引入多个 iclient-mapboxgl 导致死循环
    mapboxgl.Map.prototype._inherit = true;
  }
})();
