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
import '../core/Base';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { getIntersection } from '@supermap/iclient-common/util/MapCalculateUtil';
import { FGBLayerRenderer } from '@supermap/iclient-common/overlay/fgb/FGBLayerRenderer';

/**
 * @class FGBLayer
 * @category Visualization FGB
 * @classdesc FGB 图层类。该图层把 {@link FlatGeobuf} 格式解析为点线面要素。
 * FlatGeobuf（FGB）是一种用于存储地理要素的坐标、类型的二进制编码格式。
 * FGB 格式与传统的 Shapefile、GeoJSON 等文件格式类似，支持地理空间矢量数据的存储，但 FGB 格式具有更高的存储效率和更快的读写速度，
 * 适用于大量静态数据的编码与传输。
 * @modulecategory Overlay
 * @version 11.1.0
 * @param {Object} options - 参数。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("FGBlayer_") 创建图层 ID。
 * @param {string} [options.strategy='bbox'] - 指定加载策略，可选值为 all，bbox。all 为全量加载， bbox 为当前可见范围加载。
 * @param {Array} [options.extent] - 加载范围，参数规范为: [minX, minY, maxX, maxY]，传递此参数后，图层将使用局部加载。
 * @param {function} [options.featureLoader] - 要素自定义方法，接收要素作为参数，需返回要素。
 * @param {Object} [options.paint] - 参数内容详见: {@link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#paint-property}
 * @param {Object} [options.layout] - 参数内容详见: {@link https://docs.mapbox.com/mapbox-gl-js/style-spec/layers/#layout-property}
 * @param {Object} [options.sourceOptions] - 参数内容详见: {@link mapboxgl.source}
 * @usage
 */

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
  constructor(options = {}) {
    this.id = options.layerID ? options.layerID : CommonUtil.createUniqueID('FGBLayer_');
    this.layerId = this.id + 'outer';
    this.sourceId = this.layerId;
    this.options = options;
    this.strategy = options.strategy || 'bbox';
    this.url = options.url;
    this.layerType = '';
    this.extent = options.extent;
    this.overlay = true;
    this.type='custom';
    this.renderingMode = '3d';
    this._updateFeaturesFn = this._updateFeatures.bind(this);
  }

  /**
   * @function FGBLayer.prototype.onAdd
   * @param {mapboxgl.Map} map - MapBoxGL Map 对象。
   */
  onAdd(map) {
    this.map = map;
    let extent = [];
    if (this.strategy === 'bbox') {
      const bounds = this.map.getBounds().toArray();
      extent = [
        bounds[0][0],
        bounds[0][1],
        bounds[1][0],
        bounds[1][1]
      ];
      this.map.on('moveend', this._updateFeaturesFn);
    }

    if (this.extent) {
      const intersectExtent = getIntersection(this.extent, extent);
      if (intersectExtent && intersectExtent.length) {
        extent = intersectExtent;
      } else {
        extent = this.extent;
      }
    }
    this.renderer = new FGBLayerRenderer(this.options);
    this._handleFeatures(extent);
  }
  /**
   * @function FGBLayer.prototype.onRemove
   */
  onRemove() {
    this.map.off('moveend', this._updateFeaturesFn);
  }
/**
   * @function FGBLayer.prototype.moveLayer
   */
  moveLayer(beforeId) {
    this.map.moveLayer(this.layerId, beforeId);
  }
  /**
    * @function FGBLayer.prototype.render
  */
  render() {

  }
  /**
    * @function FGBLayer.prototype.setVisibility
    * @description 设置图层的显隐
  */
  setVisibility(visibility) {
    const visible = visibility ? 'visible': 'none';
    this.map.setLayoutProperty(this.layerId, 'visibility', visible);
  }

  async _handleFeatures(bounds) {
    let iter = await this.renderer._loadData(bounds);
    const features = await this.renderer.iterateFeatures(iter);
    if (!this.map.getSource(this.sourceId)) {
      this.map.addSource(this.sourceId, {
        type: 'geojson',
        data: features
      });
    } else {
      this.map.getSource(this.sourceId).setData(features);
    }
    if (!this.map.getLayer(this.layerId)) {
      this.layerType = this.renderer.layerType;
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
    const alreadyLoaded = this.renderer._forEachInExtent(extentToLoad, (object) => {
      return this.renderer._containsExtent(object.extent, extentToLoad);
    });
    if (!alreadyLoaded) {
      let iter = await this.renderer._loadData(extentToLoad);
      const features = await this.renderer.iterateFeatures(iter);
      this.map.getSource(this.sourceId).setData(features);
    }
  }
}
