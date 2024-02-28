/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import VectorSource from 'ol/source/Vector';
import { deserialize } from 'flatgeobuf/lib/mjs/geojson';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { all, bbox } from 'ol/loadingstrategy';
import { getIntersection } from '@supermap/iclient-common/util/MapCalculateUtil';
import GeoJSON from 'ol/format/GeoJSON';
/**
 * @class FGB
 * @browsernamespace ol.source
 * @category Visualization FGB
 * @classdesc FGB 图层源，该图层源把 {@link FlatGeobuf} 格式解析为点线面要素。
 * FlatGeobuf（FGB）是一种用于存储地理要素的坐标、类型的二进制编码格式。
 * FGB 格式与传统的 Shapefile、GeoJSON 等文件格式类似，支持地理空间矢量数据的存储，但 FGB 格式具有更高的存储效率和更快的读写速度，
 * 适用于大量静态数据的编码与传输。
 * @modulecategory Overlay
 * @version 11.1.0
 * @param {Object} opt_options - 参数。
 * @param {string} opt_options.url - FGB 地址，例如：http://localhost:8090/iserver/services/xxx/rest/data/featureResults/newResourceId.fgb。
 * @param {ol.loadingstrategy} [opt_options.strategy= ol.loadingstrategy.bbox] - ol.loadingstrategy.all 为全量加载，要素会以流的方式渲染到地图。ol.loadingstrategy.bbox 为当前可见范围加载，当地图范围改变时会重新加载要素，此时可以通过 idField 参数来标识已被加载过的要素，被标识的要素无需再次加载。idField 参数无效时会清空要素，重新加载。
 * @param {Array} [opt_options.extent] - 加载范围，参数规范为: [minX, minY, maxX, maxY]，传递此参数后，图层将使用局部加载。
 * @param {function} [opt_options.featureLoader] - 要素加载回调函数。
 * @param {boolean} [opt_options.overlaps] - 是否优化重叠要素的填充与描边操作。
 * @param {boolean} [opt_options.useSpatialIndex] - 是否启用要素空间索引。
 * @param {boolean} [opt_options.wrapX] - 是否平铺地图。
 * @param {boolean} [opt_options.idField='SmID'] - 要素属性中表示唯一标识的字段，当 strategy 为 ol.loadingstrategy.bbox 时生效。
 * @extends {ol.source.Vector}
 * @usage
 */
export class FGB extends VectorSource {
  constructor(options) {
    const baseOptions = Object.assign({ strategy: bbox }, options);
    delete baseOptions.url;
    delete baseOptions.extent;
    delete baseOptions.idField;
    super(baseOptions);
    this.options = options || {};
    this.strategy = baseOptions.strategy;
    this.url = this.options.url;
    this.extent = this.options.extent;
    this._idField = this.options.idField || 'SmID';
    this._validatedId = false;
    this._checked = false; 
    this.setLoader(async function (extent) {
      if (this.strategy === bbox) {
        if (!this._validatedId) {
          this.clear();
        }
        if (this.extent) {
          const intersectExtent = getIntersection(this.extent, extent);
          extent = (intersectExtent && intersectExtent.length) ? intersectExtent : this.extent;
        }
      }
      if (!this.extent && (this.strategy === all || !isFinite(extent[0]))) {
        extent = [];
      }
      let fgbStream;
      if (!Object.keys(extent).length) {
        fgbStream = await this._getStream(this.url);
      }
      this._handleFeatures((fgbStream && fgbStream.body) || this.url, extent);
    });
  }

  async _handleFeatures(url, extent) {
    let rect = {};
    if (extent && extent.length) {
      rect = {
        minX: extent[0],
        minY: extent[1],
        maxX: extent[2],
        maxY: extent[3]
      };
    }
    const fgb = deserialize(url, rect);
    for await (let feature of fgb) {
      let id = feature.properties[this._idField];
      if (id && !this._validatedId) {
        this._validatedId = true;
        this._checked = true;
      }
      feature = new GeoJSON().readFeature(feature);
      if (id && this._checked) {
        feature.setId(id);
      }
      if (this.options.featureLoader && typeof this.options.featureLoader === 'function') {
        feature = this.options.featureLoader(feature);
      }
      this.addFeature(feature);
    }
  }

  async _getStream(url) {
    return await FetchRequest.get(url, {}, { withoutFormatSuffix: true }).then(function (response) {
      return response;
    });
  }
}
