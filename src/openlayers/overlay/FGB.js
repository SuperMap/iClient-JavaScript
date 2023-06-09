/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import VectorSource from 'ol/source/Vector';
import { deserialize } from 'flatgeobuf/lib/mjs/geojson';
import { buildFeature } from 'flatgeobuf/lib/mjs/generic/feature';
import { parseGeometry } from 'flatgeobuf/lib/mjs/generic/geometry';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import { all, bbox } from 'ol/loadingstrategy';
import { getIntersection } from '@supermap/iclient-common/util/MapCalculateUtil';
import GeoJSON from 'ol/format/GeoJSON';
import clonedeep from 'lodash.clonedeep';
import { v4 as uuidv4 } from 'uuid';
/**
 * @class FGB
 * @browsernamespace ol.source
 * @category Visualization FGB
 * @classdesc FGB 图层源，该图层源把 {@link FlatGeobuf} 格式解析为点线面要素。
 * @version 11.1.0
 * @param {Object} opt_options - 参数。
 * @param {string} opt_options.url - FGB 服务地址，例如：http://localhost:8090/iserver/services/xxx/rest/data/featureResults/newResourceId.fgb。
 * @param {ol.loadingstrategy} [opt_options.strategy='bbox'] - 指定加载策略，可选值为 ol.loadingstrategy.all，ol/loadingstrategy.bbox。all为全部加载， bbox为当前可见范围加载
 * @param {Array} [opt_options.extent] - 加载范围, 参数规范为: [minX, minY, maxX, maxY], 传递此参数后, 图层将使用局部加载。
 * @param {function} [opt_options.featureLoader] - 要素加载回调函数
 * @param {boolean} [opt_options.overlaps] - 是否优化重叠要素的填充与描边操作
 * @param {boolean} [opt_options.useSpatialIndex] - 是否启用要素空间索引
 * @param {boolean} [opt_options.wrapX] - 是否平铺地图
 * @extends {ol.source.Vector}
 * @usage
 */
export class FGB extends VectorSource {
  constructor(options) {
    const baseOptions = Object.assign({ strategy: bbox }, options);
    delete baseOptions.url;
    delete baseOptions.extent;
    super(baseOptions);
    this.options = options || {};
    this.strategy = baseOptions.strategy;
    this.url = this.options.url;
    this.extent = this.options.extent;
    this.setLoader(async function (extent) {
      if (this.extent && this.strategy === bbox) {
        const intersectExtent = getIntersection(this.extent, extent);
        extent = intersectExtent && intersectExtent.length ? intersectExtent : this.extent;
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
    let headerMeta = {};
    const fgb = deserialize(url, rect, function (metaInfo) {
      headerMeta = clonedeep(metaInfo);
      console.log('meta', headerMeta);
    });
    for await (let feature of fgb) {
      feature = new GeoJSON().readFeature(feature);
      let properties = feature.getProperties();
      let columns = [];
      headerMeta.columns.forEach((column) => {
        if (properties[column.name]) {
          columns.push(column);
        }
      });
      headerMeta.columns = columns;
      let res = buildFeature(
        parseGeometry(feature.getGeometry(), headerMeta.geometryType),
        properties,
        headerMeta
      );
      console.log('res', res);
      let xxx = uuidv4({}, Array.from(res));
      console.log('xxx', xxx);
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
