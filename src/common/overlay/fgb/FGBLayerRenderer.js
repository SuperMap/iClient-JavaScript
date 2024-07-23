/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util as CommonUtil } from '../../commontypes/Util';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { deserialize } from 'flatgeobuf/lib/mjs/geojson';
import RBush from 'rbush';

/**
 * @private
 * @class FGBLayerRenderer
 * @classdesc FGB。
 * @version 11.1.0
 * @param {Object} options - 参数。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("FGBlayer_") 创建图层 ID。
 * @param {boolean} [options.strategy='bbox'] - 指定加载策略，可选值为 all，bbox。 all 为全量加载， bbox 为当前可见范围加载。
 * @param {Array} [options.extent] - 加载范围, 参数规范为: [minX, minY, maxX, maxY], 传递此参数后, 图层将使用局部加载。
 * @param {function} [options.featureLoader] - 要素自定义方法，接收要素作为参数，需返回要素。
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

export class FGBLayerRenderer {
  constructor(options = {}) {
    this.id = options.layerID ? options.layerID : CommonUtil.createUniqueID('FGBLayer_');
    this.layerId = this.id + 'outer';
    this.sourceId = this.layerId;
    this.options = options;
    this.strategy = options.strategy || 'bbox';
    this.url = options.url;
    this.layerType = '';
    this.extent = options.extent;
    this.init();
  }

  init() {
    if (this.strategy === 'bbox') {
      this.loadedExtentsRtree_ = new RBush();
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
