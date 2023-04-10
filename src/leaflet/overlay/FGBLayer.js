/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import RBush from 'rbush';
import { getIntersection } from '../../common/util/MapCalculateUtil';
import { FetchRequest } from '../../common/util/FetchRequest';
import { deserialize } from 'flatgeobuf/lib/mjs/geojson';

/**
 * @class FGBLayer
 * @deprecatedclassinstance L.supermap.FGBLayer
 * @classdesc Fgb 图层源。
 * @version 11.1.0
 * @category Visualization FGB
 * @extends {L.LayerGroup}
 * @param {string} url - FGB 服务地址，例如：http://localhost:8090/iserver/services/xxx/rest/data/featureResults/newResourceId.fgb。
 * @param {Object} options - 参数。
 * @param {function} [options.pointToLayer] - 定义点要素如何绘制在地图上。
 * @param {function} [options.style] - 定义点、线、面要素样式。参数为{@link L.Path-option}。
 * @param {boolean} [options.strategy='bbox'] - 指定加载策略，可选值为 all，bbox。 all为全量加载， bbox为按需加载。
 * @param {Array} [options.extent] - 加载范围, 参数规范为: [minX, minY, maxX, maxY], 传递此参数后, 图层将使用局部加载。
 * @param {function} [options.featureLoader] - 要素自定义方法。
 * @param {function} [options.onEachFeature] - 要素创建时调用
 * @usage
 */

export var FGBLayer = L.LayerGroup.extend({
  initialize: function (url, options) {
    this.options = options || {};
    this.strategy = this.options.strategy || 'bbox';
    this._layers = {};
    this.url = url;
    this.previousLayer = null;
    this.loadedExtentsRtree_ = new RBush();
    this.extent = this.options.extent;
    this._updateFeaturesFn = this._updateFeatures.bind(this);
    L.Util.setOptions(this, options);
  },
  onAdd: function (map) {
    this.map = map;
    let extent = [];
    if (this.strategy === 'bbox') {
      const bounds = map.getBounds();
      extent = [bounds.getWest(), bounds.getSouth(),  bounds.getEast(), bounds.getNorth()];
      map.on('moveend', this._updateFeaturesFn);
    }

    if (this.extent) {
      const intersectExtent = getIntersection(this.extent, extent);
      extent = (intersectExtent && intersectExtent.length) ? intersectExtent : this.extent;
    }
    this._handleFeatures(extent);
  },
  onRemove: function (map) {
    this.loadedExtentsRtree_.clear();
    this.loadedExtentsRtree_ = null;
    if (this.strategy === 'bbox') {
      map.off('moveend', this._updateFeaturesFn);
    }
  },
  _updateFeatures: async function (e) {
    const map = e.target;
    let extent = [map.getBounds().getSouthWest(), map.getBounds().getNorthEast()];
    const extentToLoad = [extent[0].lng, extent[0].lat, extent[1].lng, extent[1].lat];
    const alreadyLoaded = this._forEachInExtent(extentToLoad, (object) => {
      return this._containsExtent(object.extent, extentToLoad);
    });
    if (!alreadyLoaded) {
    
      this._handleFeatures(extentToLoad);
    
    }
  },
  _handleFeatures: async function (extent) {
    let fgbStream;
    let rect = {
      minX: extent[0],
      minY: extent[1],
      maxX: extent[2],
      maxY: extent[3]
    };
    if (!extent.length) {
      fgbStream = await this._getStream(this.url);
    } else {
      rect.value = { extent: extent.slice() };
      this.loadedExtentsRtree_.insert(rect);
    }
    
    const fgb = deserialize((fgbStream && fgbStream.body) || this.url, rect);
    
    let curLayer = L.geoJSON(null, this.options);
    curLayer.addTo(this);
    for await (let feature of fgb) {
      if (this.options.featureLoader && typeof this.options.featureLoader === 'function') {
        feature = this.options.featureLoader(feature);
      }
      curLayer.addData(feature);
    }
    this.previousLayer && this.removeLayer(this.previousLayer);
    this.previousLayer = curLayer;
  },
  async _getStream(url) {
    return await FetchRequest.get(url, {}, { withoutFormatSuffix: true }).then(function (response) {
      return response;
    });
  },
  _containsExtent: function (extent1, extent2) {
    return extent1[0] <= extent2[0] && extent2[2] <= extent1[2] && extent1[1] <= extent2[1] && extent2[3] <= extent1[3];
  },
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
  },
  _forEachInExtent(extent, callback) {
    return this._forEach(this._getInExtent(extent), callback);
  },
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
});

export var fgbLayer = function (url, options) {
  return new FGBLayer(url, options);
};
