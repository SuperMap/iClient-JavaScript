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
import { GraticuleLayerRenderer } from '@supermap/iclient-common/overlay/graticule/GraticuleLayerRenderer';
import mapboxgl from 'mapbox-gl';
/**
 * @class GraticuleLayer
 * @category Visualization GraticuleLayer
 * @classdesc 经纬网类。经纬网是由间隔均匀的经度线和纬度线组成的网络，用于在地图上识别各个位置的地理坐标。
 * @modulecategory Overlay
 * @version 10.1.1
 * @param {Object} options - 参数。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("graticuleLayer_") 创建图层 ID。
 * @param {boolean} [options.visible=true] - 是否显示经纬网。
 * @param {boolean} [options.showLabel=true] - 是否显示标签。
 * @param {number} [options.opacity=1] - 画布不透明度。
 * @param {number|function} [options.interval = 10] - 经纬度的间隔（以度为单位），可以是数字，也可以是函数，参数是map。
 * @param {mapboxgl.LngLatBounds} [options.extent] - 经纬网渲染的边界范围（[minx, miny, maxx, maxy]），不传为整个地图范围。
 * @param {number} [options.minZoom] - 最小视图缩放级别（不包括此级别），在该级别之上，该层将可见。
 * @param {number} [options.maxZoom] - 该图层可见的最大视图缩放级别（含）。
 * @param {function} [options.lngLabelFormatter = null] - 经度标签转换函数。
 * @param {function} [options.latLabelFormatter = null] - 纬度标签转换函数。
 * @param {GraticuleLayer.LabelStyle} [options.lngLabelStyle] - 经度标签样式。
 * @param {GraticuleLayer.LabelStyle} [options.latLabelStyle] - 纬度标签样式。
 * @param {GraticuleLayer.StrokeStyle} [options.strokeStyle] - 绘制经纬线的样式。
 * @usage
 */

/**
 * @typedef {Object} GraticuleLayer.LabelStyle - 标签样式。
 * @property {Array.<string>} [textFont = ['Calibri','sans-serif']] - 字体样式。
 * @property {string} [textSize = '12px'] - 字体大小。
 * @property {string} [textColor ='rgba(0,0,0,1)'] - 字体颜色。
 * @property {string} [textHaloColor ='rgba(255,255,255,1)'] - 描边颜色。
 * @property {number} [textHaloWidth = 1] - 描边宽度。
 * @property {string} [textAnchor = 'bottom'] - 字体基线: "center", "left", "right", "top", "bottom", "top-left", "top-right", "bottom-left", "bottom-right"。
 */

/**
 * @typedef {Object} GraticuleLayer.StrokeStyle - 线样式。
 * @property {string} [lineColor = 'red'] - 线颜色。
 * @property {string} [lineCap = 'round'] - 线端点风格：butt, round, square。
 * @property {string} [lineJoin = round] - 线连接样式：bevel, round, miter。
 * @property {Array.<number>} [lindDasharray = [0.5,4]] - 虚线样式。
 * @property {number} [lineWidth = 1] - 线宽。
 */

const defaultTextStyle = {
  textSize: '12px',
  textFont: ['12px Calibri', 'sans-serif'],
  textAnchor: 'bottom',
  textColor: 'rgba(0,0,0,1)',
  textHaloColor: 'rgba(255,255,255,1)',
  textHaloWidth: 1
};
const defaultStrokeStyle = {
  lineColor: 'red',
  lineCap: 'round', // butt, round, square
  lineJoin: 'round', // bevel, round, miter
  lindDasharray: [0.4, 5], // 数组|function
  lineDashOffset: 0,
  lineWidth: 1 // 数字|function
};
const defaultOptions = {
  showLabel: true,
  opacity: 1,
  visible: true,
  interval: 10, // function|number
  extent: null,
  minZoom: 0,
  maxZoom: 50,
  wrapX: true,
  strokeStyle: defaultStrokeStyle,
  lngLabelFormatter: null,
  latLabelFormatter: null,
  lngLabelStyle: defaultTextStyle,
  latLabelStyle: defaultTextStyle
};

export class GraticuleLayer {
  constructor(options) {
    this.id = options && options.layerID ? options.layerID : CommonUtil.createUniqueID('graticuleLayer_');
    this.sourceId = this.id + '_line';
    options = options || {};
    options.strokeStyle = Object.assign({}, defaultStrokeStyle, options.strokeStyle || {});
    options.lngLabelStyle = Object.assign({}, defaultTextStyle, options.lngLabelStyle || {});
    options.latLabelStyle = Object.assign({}, defaultTextStyle, options.latLabelStyle || {});
    this.options = Object.assign({}, defaultOptions, options);
    this.type = 'custom';
    this.renderingMode = '3d';
    this.overlay = true;
    this.styleDataEevent = this._setLayerTop.bind(this);
  }

  onAdd(map) {
    this.map = map;
    this.renderer = new GraticuleLayerRenderer(this.map, this.options, {
      getMapStateByKey: this.getMapStateByKey,
      getDefaultExtent: this.getDefaultExtent,
      updateGraticuleLayer: this.updateGraticuleLayer.bind(this),
      setVisibility: this.setVisibility.bind(this)
    }, {
      mapElement: this.map.getCanvas(),
      targetElement: this.map.getCanvasContainer(),
      id: this.id
    });
    this.addGraticuleLayer();
    this.resizeEvent = this.renderer._resizeCallback.bind(this.renderer);
    this.zoomendEvent = this.setVisibility.bind(this);
    this._bindEvent()
  }

  onRemove() {
    this.renderer.onRemove();
    this._unbindEvent();
  }

  render() {
    this.renderer.draw();
  }

  getMapStateByKey(key, params) {
    if (key === 'getBearing') {
      return this.map.getBearing();
    } else if (key === 'getBounds') {
      return this.map.getBounds();
    } else if (key === 'project') {
      return this.map.project(params);
    } else if(key === 'unproject') {
      return this.map.unproject(params);
    }
  }

  /**
   * @function GraticuleLayer.prototype.setVisibility
   * @description 设置可见性。
   * @param {boolean} visible - 是否可见。
   */
  setVisibility(visible) {
    const zoom = this.map && this.map.getZoom();
    this.options.visible = typeof visible === 'boolean' ? visible : this.options.visible;
    this.visible =
      typeof visible === 'boolean'
        ? visible
        : this.options.visible && zoom >= this.options.minZoom && zoom <= this.options.maxZoom;
    if (this.renderer) {
      this.renderer.visible = this.visible;
    }
    if (this.map.getLayer(this.sourceId)) {
      this.map.setLayoutProperty(this.sourceId, 'visibility', this.visible ? 'visible' : 'none');
    }
    this.renderer && this.renderer._drawLabel();
  }

  /**
   * @function GraticuleLayer.prototype.setMinZoom
   * @description 设置最小视图缩放级别。
   * @param {number} minZoom - 最小视图缩放级别（不包括此级别），在该级别之上，该层将可见。
   */
  setMinZoom(minZoom) {
    this.options.minZoom = minZoom;
    this.setVisibility();
  }

  /**
   * @function GraticuleLayer.prototype.setMaxZoom
   * @description 该图层可见的最大视图缩放级别。
   * @param {number} maxZoom - 该图层可见的最大视图缩放级别（含）。
   */
  setMaxZoom(maxZoom) {
    this.options.maxZoom = maxZoom;
    this.setVisibility();
  }

  /**
   * @function GraticuleLayer.prototype.setShowLabel
   * @description 设置显示标签。
   * @param {boolean} showLabel - 是否显示标签。
   */
  setShowLabel(showLabel) {
    this.options.showLabel = showLabel;
    this.renderer._drawLabel();
  }

  /**
   * @function GraticuleLayer.prototype.setExtent
   * @description 设置经纬网渲染的边界范围。
   * @param {mapboxgl.LngLatBounds} extent - 经纬网渲染的边界范围。
   */
  setExtent(extent) {
    this.options.extent = this.getDefaultExtent(extent, this.map);
    // this.features = this._getGraticuleFeatures();
    this.updateGraticuleLayer();
    this.renderer._drawLabel();
  }

  /**
   * @function GraticuleLayer.prototype.setStrokeStyle
   * @description 设置经纬线样式。
   * @param {GraticuleLayer.StrokeStyle} strokeStyle - 经纬线样式。
   */
  setStrokeStyle(strokeStyle) {
    if (!this.map || !this.map.getLayer(this.sourceId)) {
      return;
    }
    this.options.strokeStyle = strokeStyle;
    const { layout, paint } = this.renderer._transformStrokeStyle(strokeStyle);
    for (let key in layout) {
      this.map.setLayoutProperty(this.sourceId, key, layout[key]);
    }
    for (let key in paint) {
      this.map.setPaintProperty(this.sourceId, key, paint[key]);
    }
  }

  /**
   * @function GraticuleLayer.prototype.setLngLabelStyle
   * @description 设置经度标签样式。
   * @param {GraticuleLayer.LabelStyle} labelStyle - 标签样式。
   */
  setLngLabelStyle(labelStyle) {
    this.options.lngLabelStyle = labelStyle;
    this.renderer._drawLabel();
  }

  /**
   * @function GraticuleLayer.prototype.setLatLabelStyle
   * @description 设置纬度标签样式。
   * @param {GraticuleLayer.LabelStyle} labelStyle - 标签样式。
   */
  setLatLabelStyle(labelStyle) {
    this.options.latLabelStyle = labelStyle;
    this.renderer._drawLabel();
  }

  /**
   * @function GraticuleLayer.prototype.setIntervals
   * @description 设置经纬度的间隔（以度为单位）。
   * @param {number|function} interval - 经纬度的间隔（以度为单位），可以是数字，也可以是函数，参数是map。
   */
  setIntervals(interval) {
    if (this.renderer) {
      this.renderer.setIntervals(interval);
    }
  }

  getDefaultExtent(extent, map = this.map) {
    const crs = (map.getCRS && map.getCRS()) || {};
    let { extent: crsExtent } = crs;
    if (!crsExtent) {
      crsExtent = [-180, -85.05119, 180, 85.05119];
    }
    if (!extent || extent.length === 0) {
      return crsExtent;
    }
    const { _sw, _ne } = mapboxgl.LngLatBounds.convert(extent);
    extent = [_sw.lng, _sw.lat, _ne.lng, _ne.lat];
    extent = [
      Math.max(crsExtent[0], extent[0]),
      Math.max(crsExtent[1], extent[1]),
      Math.min(crsExtent[2], extent[2]),
      Math.min(crsExtent[3], extent[3])
    ];
    return extent;
  }

  addGraticuleLayer() {
    if (!this.map.getSource(this.sourceId)) {
      const source = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: this.renderer.features
        }
      };
      this.map.addSource(this.sourceId, source);
    }

    if (!this.map.getLayer(this.sourceId)) {
      const layer = Object.assign(
        { id: this.sourceId, type: 'line', source: this.sourceId },
        this.renderer._transformStrokeStyle()
      );
      this.map.addLayer(layer);
    }
  }

  _getLatPoints(lngRange, firstLng, lastLng, features) {
     return this.renderer._getLatPoints(lngRange, firstLng, lastLng, features);
  }

  _bindEvent() {
    this.map.on('styledata', this.styleDataEevent);
    this.map.on('resize', this.resizeEvent);
    this.map.on('zoomend', this.zoomendEvent);
  }

  _unbindEvent() {
    this.map.off('styledata', this.styleDataEevent);
    this.map.off('resize', this.resizeEvent);
    this.map.off('zoomend', this.zoomendEvent);
  }

  _setLayerTop() {
    const map = this.map;
    if (!map) {
      return;
    }
    const layersOnMap = map.getStyle && map.getStyle().layers;
    if (
      layersOnMap &&
      layersOnMap.length &&
      layersOnMap.findIndex(item => item.id === this.sourceId) !== layersOnMap.length - 1
    ) {
      if (map.getLayer(this.sourceId)) {
        map.removeLayer(this.sourceId);
        this.addGraticuleLayer();
      }
    }
  }

  updateGraticuleLayer(features = this.features) {
    if (this.map.getSource(this.sourceId)) {
      const geoJSONData = {
        type: 'FeatureCollection',
        features
      };
      this.map.getSource(this.sourceId).setData(geoJSONData);
    }
    this.addGraticuleLayer();
  }
}

