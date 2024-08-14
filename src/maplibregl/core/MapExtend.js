/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';
import { createMapExtendExtending } from '@supermapgis/iclient-common/util/MapExtend';

/**
  * @function MapExtend
  * @description 扩展 maplibregl.Map。
  * @private
  */
 export var MapExtend = (function () {
    maplibregl.Map = class MapEnhance extends createMapExtendExtending(maplibregl) {
      constructor(options) {
        super(options);
      }
    }
})();
