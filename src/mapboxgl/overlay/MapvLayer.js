/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import mapboxgl from 'mapbox-gl';
import { MapvRenderer } from '@supermapgis/iclient-common/overlay/mapv/MapvRenderer';
import { Util as CommonUtil } from '@supermapgis/iclient-common/commontypes/Util';
import {
  getMeterPerMapUnit
} from '@supermapgis/iclient-common/util/MapCalculateUtil';

/**
 * @class MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv 图层类。MapV 是一款地理信息可视化开源库，MapV 图层可以用来展示大量地理信息数据，点、线、面的数据，每种数据也有不同的展示类型，如直接打点、热力图、网格、聚合等方式展示数据。<br>
 * 展示大量的点数据：如热力图、网格、蜂窝状、点聚合、按颜色区间、按半径大小等方式。<br>
 * 展示大量的线数据：如普通画线、高亮叠加、热力线数据展示等方式，适合展示大量轨迹的场景。<br>
 * 展示大量的自定义面数据：按颜色区间来展示，如展示行政区划数据。
 * @modulecategory Overlay
 * @param {mapboxgl.Map} map - MapBoxGL Map 对象，将在下个版本弃用，请用 map.addLayer() 方法添加图层。
 * @param {Mapv.DataSet} dataSet - MapV 图层数据集。
 * @param {Object} mapVOptions - Mapv 参数。
 * @param {string} [mapVOptions.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("mapvLayer_") 创建专题图层 ID。
 * @usage
 */
export class MapvLayer {
  constructor(map, dataSet, mapVOptions) {
    if (arguments.length === 3) {
      this.map = map;
      delete mapVOptions['layerID'];
      this.mapVOptions = mapVOptions;
      this.dataSet = dataSet;
    } else {
      this.dataSet = map;
      delete dataSet['layerID'];
      this.mapVOptions = dataSet;
    }
    this.id = this.mapVOptions.layerID ? this.mapVOptions.layerID : CommonUtil.createUniqueID('mapvLayer_');
    this.type = 'custom';
    this.visibility = true;
    this.renderingMode = '3d';
    this.overlay = true;
    this.context = this.mapVOptions.context || '2d';
    //保留之前的用法
    if (this.map) {
      this.map.addLayer(this);
    }
  }

  /**
   * @function MapvLayer.prototype.onAdd
   * @description 添加图层到地图。
   * @param {Object} map - 地图对象。
   */
  onAdd(map) {
    this.map = map;
    this.mapContainer = map.getCanvasContainer();
    this.renderer = new MapvRenderer(map, this.dataSet, this.mapVOptions, {
      transferCoordinate: this._transferCoordinate,
      getCenterPixel: this._getCenterPixel,
      getResolution: this._getResolution,
      validZoom: this._validZoom.bind(this)
    }, { mapElement: this.map.getCanvas(), targetElement: this.mapContainer, id: this.id });
    this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
    this.bindEvent();
  }

  /**
     * @function MapvLayer.prototype.onRemove
     * @description 移除图层。
     */
  onRemove() {
    this.renderer.destroy();
    this.unbindEvent();
  }

  /**
     * @function MapvLayer.prototype.render
     * @description 渲染图层。
     */
  render() {
    this.renderer && this.renderer.draw();
  }

  _transferCoordinate() {
    let map = this.map;
    var bounds = map.getBounds(),
      dw = bounds.getEast() - bounds.getWest(),
      dh = bounds.getNorth() - bounds.getSouth();
    let rect = map.getCanvas().getBoundingClientRect();
    var resolutionX = dw / rect.width,
      resolutionY = dh / rect.height;
    var center = map.getCenter();
    var centerPx = map.project(center);
    var self = this;
    return function (coordinate) {
      if (map.transform.rotationMatrix || self.context === '2d') {
        var worldPoint = map.project(new mapboxgl.LngLat(coordinate[0], coordinate[1]));
        return [worldPoint.x, worldPoint.y];
      }
      var pixel = [(coordinate[0] - center.lng) / resolutionX, (center.lat - coordinate[1]) / resolutionY];
      return [pixel[0] + centerPx.x, pixel[1] + centerPx.y];
    }
  }

  _validZoom() {
    if (
      (this.mapVOptions.minZoom && this.map.getZoom() < this.mapVOptions.minZoom) ||
      (this.mapVOptions.maxZoom && this.map.getZoom() > this.mapVOptions.maxZoom)
    ) {
      return false;
    }
    return true;
  }

  _getResolution() {
    var bounds = this.map.getBounds();
    var dw = bounds.getEast() - bounds.getWest();
    var rect = this.map.getCanvas().getBoundingClientRect();
    var resolutionX = dw / rect.width;
    // 一个像素是多少米
    return getMeterPerMapUnit('DEGREE') * resolutionX;
  }

  _getCenterPixel() {
    return this.map.project(new mapboxgl.LngLat(0, 0));
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
  /**
    * @function MapvLayer.prototype.show
    * @description 显示该图层
    */
  show() {
    if (this.renderer) {
      this.renderer.show();
    }
    return this;
  }
  /**
    * @function MapvLayer.prototype.hide
    * @description 隐藏该图层
    */
  hide() {
    if (this.renderer) {
      this.renderer.hide();
    }
    return this;
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
  * @function MapvRenderer.prototype.bindEvent
  * @description 绑定事件。
  */
  bindEvent() {
    var map = this.map;
    if (this.mapVOptions.methods) {
      if (this.mapVOptions.methods.click) {
        map.on('click', this.renderer.clickEvent);
      }
      if (this.mapVOptions.methods.mousemove) {
        map.on('mousemove', this.renderer.mousemoveEvent);
      }
    }
  }

  /**
   * @function MapvRenderer.prototype.unbindEvent
   * @description 解绑事件。
   */
  unbindEvent() {
    var map = this.map;
    if (this.mapvOptions.methods) {
      if (this.mapvOptions.methods.click) {
        map.off('click', this.clickEvent);
      }
      if (this.mapvOptions.methods.mousemove) {
        map.off('mousemove', this.mousemoveEvent);
      }
    }
  }

  /**
    * @function MapvLayer.prototype.setVisibility
    * @description 设置图层可见性。
    * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
    */
  setVisibility(visibility) {
    if (visibility !== this.visibility) {
      this.visibility = visibility;
      if (visibility) {
        this.show();
      } else {
        this.hide();
      }
    }
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

