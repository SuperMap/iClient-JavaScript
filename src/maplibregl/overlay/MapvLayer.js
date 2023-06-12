/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';
import { MapvRenderer } from '@supermap/iclient-common/overlay/mapv/MapvRenderer';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import {
  getMeterPerMapUnit
} from '@supermap/iclient-common/util/MapCalculateUtil';
/**
 * @class MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv 图层。
 * @version 11.1.0
 * @param {mapboxgl.Map} map - MapBoxGL Map 对象，将在下个版本弃用，请用 map.addLayer() 方法添加图层。
 * @param {Mapv.DataSet} dataSet - MapV 图层数据集。
 * @param {Object} options - Mapv 参数。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("mapvLayer_") 创建专题图层 ID。
 * @usage
 */
export class MapvLayer {
  constructor(map, dataSet, options) {
    if (map) {
      this.map = map;
    }
    this.id = options.layerID ? options.layerID : CommonUtil.createUniqueID('mapvLayer_');
    delete options['layerID'];
    this.options = options;
    this.dataSet = dataSet;
    this.type = 'custom';
    this.isPitching = false;
    this.pitchStartEvent = this.pitchStart.bind(this);
    this.pitchEndEvent = this.pitchEnd.bind(this);
    this.renderingMode = '3d';
    this.context = this.options.context || '2d';
  }

  onAdd(map) {
    this.map = map;
    this.mapContainer = map.getCanvasContainer();
    this.renderer = new MapvRenderer(map, this.dataSet, this.options, {
      getMapInfo: this.getMapInfo,
      getOriginPixel: this.getOriginPixel
    }, { mapContainer: this.mapContainer, mapCanvas: this.map.getCanvas() });
    this._bindEvent();
  }

  onRemove() {
    this.mapContainer.removeChild(this.canvas);
    this.renderer.destroy();
    this._unbindEvent();
  }

  render() {
    if (this.map.isZooming() || this.map.isRotating() || this.isPitching) {
      this.renderer.visible() && this.renderer.hide();
      return;
    }
    !this.renderer.visible() && this.renderer.show();
    this.renderer.draw();
  }

  getMapInfo() {
    let map = this.map;
    var bounds = map.getBounds(),
      dw = bounds.getEast() - bounds.getWest(),
      dh = bounds.getNorth() - bounds.getSouth();
    var resolutionX = dw / this.map.getCanvas().getBoundingClientRect().width,
      resolutionY = dh / this.map.getCanvas().getBoundingClientRect().height;
    // 一个像素是多少米
    var zoomUnit = getMeterPerMapUnit('DEGREE') * resolutionX;
    var center = map.getCenter();
    var centerPx = map.project(center);
    var self = this;
    function transferCoordinate(coordinate) {
      if (map.transform.rotationMatrix || self.context === '2d') {
        var worldPoint = map.project(new maplibregl.LngLat(coordinate[0], coordinate[1]));
        return [worldPoint.x, worldPoint.y];
      }
      var pixel = [(coordinate[0] - center.lng) / resolutionX, (center.lat - coordinate[1]) / resolutionY];
      return [pixel[0] + centerPx.x, pixel[1] + centerPx.y];
    }
    return { transferCoordinate, zoomUnit }
  }

  getOriginPixel() {
    return this.map.project(new maplibregl.LngLat(0, 0));
  }

  /**
   * @function MapvLayer.prototype.getTopLeft
   * @description 获取左上的坐标。
   */
  getTopLeft() {
    var map = this.map;
    var topLeft;
    if (map) {
      var bounds = map.getBounds();
      topLeft = bounds.getNorthWest();
    }
    return topLeft;
  }

  /**
   * @function MapvLayer.prototype.addData
   * @description 追加数据。
   * @param {Object} data - 要追加的数据。
   * @param {Object} options - 要追加的值。
   */
  addData(data, options) {
    this.renderer.addData(data, options);
  }

  /**
   * @function MapvLayer.prototype.update
   * @description 更新图层。
   * @param {Object} opt - 待更新的数据。
   * @param {Object} opt.data - mapv 数据集。
   * @param {Object} opt.options - mapv 绘制参数。
   */
  update(opt) {
    this.renderer.update(opt);
  }

  /**
   * @function MapvLayer.prototype.getData
   * @description 获取数据。
   * @returns {Mapv.DataSet} mapv 数据集。
   */
  getData() {
    if (this.renderer) {
      this.dataSet = this.renderer.getData();
    }
    return this.dataSet;
  }

  /**
   * @function MapvLayer.prototype.removeData
   * @description 删除符合过滤条件的数据。
   * @param {function} [filter] - 过滤条件。条件参数为数据项，返回值为 true,表示删除该元素；否则表示不删除。
   * @example
   * filter=function(data){
   *    if(data.id=="1"){
   *      return true
   *    }
   *    return false;
   * }
   */
  removeData(filter) {
    this.renderer && this.renderer.removeData(filter);
  }

  /**
   * @function MapvLayer.prototype.clearData
   * @description 清除数据。
   */
  clearData() {
    this.renderer.clearData();
  }
  _bindEvent() {
    var map = this.map;
    map.on('pitchstart', this.pitchStartEvent);
    map.on('pitchend', this.pitchEndEvent);
    if (this.options.methods) {
      if (this.options.methods.click) {
        map.on('click', this.renderer.clickEvent);
      }
      if (this.options.methods.mousemove) {
        map.on('mousemove', this.renderer.mousemoveEvent);
      }
    }
  }

  _unbindEvent() {
    let map = this.map;
    map.off('pitchstart', this.pitchStartEvent);
    map.off('pitchend', this.pitchEndEvent);
    if (this.options.methods) {
      if (this.options.methods.click) {
        map.off('click', this.renderer.clickEvent);
      }
      if (this.options.methods.mousemove) {
        map.off('mousemove', this.renderer.mousemoveEvent);
      }
    }
  }

  pitchStart() {
    this.isPitching = true;
  }

  pitchEnd() {
    this.isPitching = false;
  }

  /**
   * @function MapvLayer.prototype.setZIndex
   * @description 设置 canvas 层级。
   * @param {number} zIndex - canvas 层级。
   */
  setZIndex(z) {
    this.renderer.setZIndex(z);
  }
}

