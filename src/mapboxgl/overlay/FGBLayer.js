/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
/**
 * reference and modification
 * dereklieu/cool-grid, cloudybay/leaflet.latlng-graticule
 * (https://github.com/dereklieu/cool-grid, https://github.com/cloudybay/leaflet.latlng-graticule)
 * Apache Licene 2.0
 * thanks dereklieu, cloudybay
 */
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import RBush from 'rbush';
import { getIntersection } from '@supermap/iclient-common/util/MapCalculateUtil';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { deserialize } from 'flatgeobuf/lib/mjs/geojson';

/**
 * @class FGBLayer
 * @category Visualization FGB
 * @classdesc FGB。
 * @version 11.1.0
 * @param {Object} options - 参数。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("FGBlayer_") 创建图层 ID。
 * @param {boolean} [options.strategy='bbox'] - 指定加载策略，可选值为 all，bbox。 all为全部加载， bbox为当前可见范围加载。
 * @param {Array} [options.extent] - 加载范围, 参数规范为: [minX, minY, maxX, maxY], 传递此参数后, 图层将使用局部加载。
 * @param {function} [options.featureLoader] - 要素自定义方法，接收要素作为参数，需返回要素。
 * @param {Object} [options.paint] - 参数内容详见: {@link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-property}
 * @param {Object} [options.layout] - 参数内容详见: {@link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property}
 * @param {Object} [options.sourceOptions] - 参数内容详见: {@link mapboxgl.source}
 * @usage
 */

const GEOMETRY_TYPE_MAP = {
  1: 'circle',
  2: 'line',
  3: 'fill',
  5: 'line',
  4: 'circle',
  6: 'fill',
  'MultiPolygon': 'fill',
  'Point': 'circle',
  'MultiLineString': 'line',
  'MultiPoint': 'circle',
  'LineString': 'line',
  'Polygon': 'fill'
};

const PAINT_MAP = {
  circle: {
    'circle-radius': 6,
    'circle-color': '#3fb1e3',
    'circle-opacity': 1,
    'circle-blur': 0,
    'circle-translate': [0, 0],
    'circle-stroke-width': 0,
    'circle-stroke-color': '#000',
    'circle-stroke-opacity': 1
  },
  line: {
    'line-opacity': 1,
    'line-color': '#3fb1e3',
    'line-width': 3,
    'line-blur': 1
  },
  fill: {
    'fill-opacity': 0.8,
    'fill-color': '#3fb1e3',
    'fill-translate': [0, 0],
    'fill-antialias': true,
    'fill-outline-color': '#3fb1e3'
  }
};

export class FGBLayer {
  constructor(options) {
    this.id = options && options.layerID ? options.layerID : CommonUtil.createUniqueID('FGBLayer_');
    this.layerId = this.id + 'outer';
    this.sourceId = this.layerId;
    this.options = options || {};
    this.strategy = options.strategy || 'bbox';
    this.url = options.url;
    this.loadedExtentsRtree_ = new RBush();
    this.layerType = '';
    this.extent = this.options.extent;
    this._updateFeaturesFn = this._updateFeatures.bind(this);
  }

  onAdd(map) {
    this.map = map;
    let extent = [];
    if (this.strategy === 'bbox') {
      this.map.on('moveend', this._updateFeaturesFn);
      const bounds = this.map.getBounds().toArray();
      extent = [
        bounds[0][0],
        bounds[0][1],
        bounds[1][0],
        bounds[1][1]
      ];
    }

    if (this.extent) {
      const intersectExtent = getIntersection(this.extent, extent);
      if (intersectExtent && intersectExtent.length) {
        extent = intersectExtent;
      } else {
        extent = this.extent;
      }
    }
    this._handleFeatures(extent);
  }

  moveLayer(id, beforeId) {
    this.map.removeLayer(this.layerId, beforeId);
  }

  removeLayer() {
    this.map.removeLayer(this.layerId);
  }

  setVisibility(visibility) {
    const visible = visibility ? 'visible': 'none';
    this.map.setLayoutProperty(this.layerId, 'visibility', visible);
  }

  async _handleFeatures(bounds) {
    let iter = await this._loadData(bounds);
    const features = await this.iterateFeatures(iter);
    if (!this.map.getSource(this.sourceId)) {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: features
      });
    } else {
      this.map.getSource(this.sourceId).setData(features);
    }
    if (!this.map.getLayer(this.layerId)) {
      const layer = Object.assign({
        id: this.layerId,
        type: this.layerType,
        source: this.sourceId,
        paint: Object.assign(PAINT_MAP[this.layerType], this.options.paint) || {},
        layout: this.options.layout || {}
      });
      this.map.addLayer(layer);
    }
  }

  async _updateFeatures() {
    const bounds = this.map.getBounds().toArray();
    const extentToLoad = [bounds[0][0], bounds[0][1], bounds[1][0], bounds[1][1]];
    const alreadyLoaded = this._forEachInExtent(extentToLoad, (object) => {
      return this._containsExtent(object.extent, extentToLoad);
    });
    if (!alreadyLoaded) {
      let iter = await this._loadData(extentToLoad);
      const features = await this.iterateFeatures(iter);
      this.map.getSource(this.sourceId).setData(features);
    }
  }

  async iterateFeatures(iterator) {
    const features = {
      type: 'FeatureCollection',
      features: []
    };
    for await (let feature of iterator) {
      if (this.options.featureLoader && typeof this.options.featureLoader === 'function') {
        feature = this.options.featureLoader(feature);
      }
      if (!this.layerType) {
        this.layerType = GEOMETRY_TYPE_MAP[feature.geometry.type]
      }
      features.features.push(feature);
    }
    return features;
  }

  async _loadData(bounds) {
    let fgbStream;
    let rect = {
      minX: bounds[0],
      minY: bounds[1],
      maxX: bounds[2],
      maxY: bounds[3]
    };
    if (!bounds.length) {
      fgbStream = await this._getStream(this.url);
    } else {
      rect.value = { extent: bounds.slice() };
      this.loadedExtentsRtree_.insert(rect);
    }
   
    return await deserialize((fgbStream && fgbStream.body) || this.url, rect, (headerMeta) => {
      this.layerType = GEOMETRY_TYPE_MAP[headerMeta.geometryType];
    });
  }

  async _getStream(url) {
    return await FetchRequest.get(url, {}, { withoutFormatSuffix: true }).then(function (response) {
      return response;
    });
  }

  _containsExtent(extent1, extent2) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
  }

  _getInExtent(extent) {
    const bbox = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3]
    };
    const items = this.loadedExtentsRtree_.search(bbox);
    return items.map(function (item) {
      return item.value;
    });
  }

  _forEachInExtent(extent, callback) {
    return this._forEach(this._getInExtent(extent), callback);
  }

  _forEach(values, callback) {
    let result;
    for (let i = 0, l = values.length; i < l; i++) {
      result = callback(values[i]);
      if (result) {
        return result;
      }
    }
    return result;
  }
}
