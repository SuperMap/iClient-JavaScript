/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
// import '../core/Base';
import mapboxgl from 'mapbox-gl';
import { MapvRenderer } from '@supermap/iclient-common/overlay/mapv/MapvRenderer';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import {
  getMeterPerMapUnit
} from '@supermap/iclient-common/util/MapCalculateUtil';

/**
 * @class MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv 图层。
 * @param {mapboxgl.Map} map - MapBoxGL Map 对象，将在下个版本弃用，请用 map.addLayer() 方法添加图层。
 * @param {Mapv.DataSet} dataSet - MapV 图层数据集。
 * @param {Object} mapVOptions - Mapv 参数。
 * @param {string} [mapVOptions.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("mapvLayer_") 创建专题图层 ID。
 * @usage
 */
export class MapvLayer {
  constructor(map, dataSet, mapVOptions) {
    this.map = map;
    this.id = mapVOptions.layerID ? mapVOptions.layerID : CommonUtil.createUniqueID('mapvLayer_');
    delete mapVOptions['layerID'];
    this.mapVOptions = mapVOptions;
    this.dataSet = dataSet;
    this.type = 'custom';
    this.visibility = true;
    this.renderingMode = '2d';
    //保留之前的用法
    if (this.map) {
      this.map.addLayer(this);
    }
  }

  onAdd(map) {
    this.map = map;
    this.mapContainer = map.getCanvasContainer();
    this.renderer = new MapvRenderer(map, this.dataSet, this.mapVOptions, {
      getMapInfo: this.getMapInfo,
      getOriginPixel: this.getOriginPixel
    }, { mapCanvas: this.map.getCanvas(), mapContainer: this.mapContainer });
    // this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
  }

  render() {
    this.renderer.draw();
  }

  getMapInfo() {
    let map = this.map;
    var bounds = map.getBounds(),
      dw = bounds.getEast() - bounds.getWest(),
      dh = bounds.getNorth() - bounds.getSouth();
    let rect = map.getCanvas().getBoundingClientRect();
    var resolutionX = dw / rect.width,
      resolutionY = dh / rect.height;
    // 一个像素是多少米
    var zoomUnit = getMeterPerMapUnit('DEGREE') * resolutionX;
    var center = map.getCenter();
    var centerPx = map.project(center);

    function transferCoordinate(coordinate) {
      if (map.transform.rotationMatrix || self.context === '2d') {
        var worldPoint = map.project(new mapboxgl.LngLat(coordinate[0], coordinate[1]));
        return [worldPoint.x, worldPoint.y];
      }
      var pixel = [(coordinate[0] - center.lng) / resolutionX, (center.lat - coordinate[1]) / resolutionY];
      return [pixel[0] + centerPx.x, pixel[1] + centerPx.y];
    }
    return { transferCoordinate, zoomUnit }
  }

  getOriginPixel() {
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

  show() {
    if (this.renderer) {
      this.renderer._show();
    }
    return this;
  }

  hide() {
    if (this.renderer) {
      this.renderer._hide();
    }
    return this;
  }

  /**
  * @function MapvRenderer.prototype.bindEvent
  * @description 绑定事件。
  */
  bindEvent() {
    var map = this.map;
    if (this.options.methods) {
      if (this.options.methods.click) {
        map.on('click', this.clickEvent);
      }
      if (this.options.methods.mousemove) {
        map.on('mousemove', this.mousemoveEvent);
      }
    }
  }

  /**
   * @function MapvRenderer.prototype.unbindEvent
   * @description 解绑事件。
   */
  unbindEvent() {
    var map = this.map;
    if (this.options.methods) {
      if (this.options.methods.click) {
        map.off('click', this.clickEvent);
      }
      if (this.options.methods.mousemove) {
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
    this.canvas.style.zIndex = z;
  }
}

