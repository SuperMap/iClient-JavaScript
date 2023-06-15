/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import maplibregl from 'maplibre-gl';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { HeatMapLayerRenderer } from '@supermap/iclient-common/overlay/heatmap/HeatMapLayerRenderer';

/**
 * @class HeatMapLayer
 * @classdesc 热力图层类。
 * @category  Visualization HeatMap
 * @version 11.1.0
 * @param {string} name - 图层名称。
 * @param {Object} options - 构造参数。
 * @param {maplibregl.Map} options.map - MapLibreGL Map 对象。
 * @param {string} options.featureWeight - 对应 feature 属性中的热点权重字段名称，权重值类型为 float。
 * @param {string} [options.id] - 专题图层ID。默认使用 CommonUtil.createUniqueID("HeatMapLayer_") 创建专题图层 ID。
 * @param {number} [options.radius=50] - 热点渲染的最大半径（热点像素半径），单位为 px,当 useGeoUnit参数 为 true 时，单位使用当前图层地理坐标单位。热点显示的时候以精确点为中心点开始往四周辐射衰减，其衰减半径和权重值成比列。
 * @param {boolean} [options.loadWhileAnimating=true] - 是否实时重绘。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为false)。
 * @param {number} [options.opacity=1] - 图层不透明度。
 * @param {Array.<string>} [options.colors=['blue','cyan','lime','yellow','red']] - 颜色线性渐变数组,颜色值必须为canvas所支。
 * @param {boolean} [options.useGeoUnit=false] - 使用地理单位，即默认热点半径默认使用像素单位。当设置为 true 时，热点半径和图层地理坐标保持一致。
 * @extends {maplibregl.Evented}
 * @fires HeatMapLayer#featuresadded
 * @fires HeatMapLayer#changelayer
 * @fires HeatMapLayer#featuresremoved
 * @usage
 */
export class HeatMapLayer extends maplibregl.Evented {

  constructor(name, options) {
    super();

    var _options = options ? options : {};
    this.options = _options;
    /**
     * @member {string} HeatMapLayer.prototype.name
     * @description 图层名字。
     */
    this.name = name;

    /**
     * @member {string} HeatMapLayer.prototype.id
     * @description 热力图图层 ID。
     */
    this.id = _options.id ? _options.id : CommonUtil.createUniqueID("HeatMapLayer_");

    /**
     * @member {boolean} [HeatMapLayer.prototype.loadWhileAnimating=true]
     * @description 是否实时重绘。(当绘制大数据量要素的情况下会出现卡顿，建议把该参数设为false)。
     */
    this.loadWhileAnimating = _options.loadWhileAnimating === undefined ? true : _options.loadWhileAnimating;

    /**
        * @member {Array.<FeatureVector>} HeatMapLayer.prototype.features
        * @description 热点信息数组，记录存储图层上添加的所有热点信息。
        */
    this.features = {};

    /**
     * @member HeatMapLayer.prototype.EVENT_TYPES
     * @description 监听一个自定义事件可用如下方式:
     *              热点图自定义事件信息，事件调用时的属性与具体事件类型相对应。
     *
     * 支持的事件如下 (另外包含 <Layer 中定义的其他事件>):
     * featuresadded - 热点添加完成时触发。回调参数为添加的热点信息数组和操作成功与否信息。
     * 参数类型：{features: features, succeed: succeed}
     * featuresremoved - 热点被删除时触发。回调参数为删除的热点信息数组和操作成功与否信息。
     * 参数类型：{features: features, succeed: succeed}
     * featuresdrawcompleted - 热点图渲染完成时触发。
     */
    this.EVENT_TYPES = ["featuresadded", "featuresremoved", "featuresdrawcompleted"];
    this.type = 'custom';
    this.renderingMode = '3d';
    this.overlay = true;
  }

  /**
   * @function HeatMapLayer.prototype.onAdd
   * @description 添加该图层
   */
  onAdd(map) {
    this.map = map;
    const targetElement = this.map.getCanvasContainer();
    const mapElement = this.map.getCanvas();
    this.renderer = new HeatMapLayerRenderer({ id: this.id, ...this.options, convertLatlonToPixel: this._convertLatlonToPixel.bind(this), targetElement, mapElement });
    if (this.features.features && this.features.features.length) {
      this.renderer.setExtent(this.map.getBounds());
      this.renderer.addFeatures(this.features);
    }
  }

  /**
   * @function HeatMapLayer.prototype.onRemove
   * @description 移除该图层
   */
  onRemove() {
    this.removeAllFeatures();
    this.renderer.removeFromMap();
    this.features = {};
    this.renderer = null;
  }

  /**
   * @function HeatMapLayer.prototype.render
   * @description 渲染图层
   */
  render() {
    this.refresh();
  }

  /**
   * @function HeatMapLayer.prototype.addFeatures
   * @description 添加热点信息。
   * @param {GeoJSONObject} features - 待添加的要素数组。
   *
   * @example
   * var geojson = {
   *      "type": "FeatureCollection",
   *      "features": [
   *          {
   *              "type": "feature",
   *              "geometry": {
   *                  "type": "Point",  //只支持point类型
   *                  "coordinates": [0, 0]
   *              },
   *              "properties": {
   *                  "height": Math.random()*9,
   *                  "geoRadius": useGeoRadius?radius:null
   *              }
   *          }
   *      ]
   *   };
   * var heatMapLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   pLayer = new HeatMapLayer("heatmaplayer",{"featureWeight":"height"});
   * heatMapLayer.addFeatures(geojson);
   * map.addLayer(heatMapLayer);
   */
  addFeatures(features) {
    if (this.renderer) {
      this.renderer.addFeatures(features);
    } else {
      this.features = features;
    }
    /**
     * @event HeatMapLayer#featuresadded
     * @description 要素添加完成之后触发。
     * @property {GeoJSONObject} features - 被添加的要素。
     * @property {boolean} succeed - 要素是否成功添加。
     */
    this.fire(this.EVENT_TYPES[0], { features: features, succeed: true });
  }

  /**
   * @function HeatMapLayer.prototype.refresh
   * @description 强制刷新当前热点显示，在图层热点数组发生变化后调用，更新显示。
   */
  refresh() {
    if (this.map) {
      this.renderer.setExtent(this.map.getBounds());
      this.renderer.refresh();
    }
  }

  /**
   * @function HeatMapLayer.prototype.setOpacity
   * @description 设置图层的不透明度，取值[0-1]之间。
   * @param {number} [opacity] - 不透明度。
   */
  setOpacity(opacity) {
    if (opacity !== this.opacity) {
      this.renderer.setOpacity(opacity);
      if (this.map !== null) {
        /**
         * @event HeatMapLayer#changelayer
         * @description 图层属性改变之后触发。
         * @property {Object} layer - 图层。
         * @property {string} property - 被改变的图层属性。
         */
        this.fire('changelayer', { layer: this, property: "opacity" });
      }
    }
  }

  /**
   * @function HeatMapLayer.prototype.updateHeatPoints
   * @description 刷新热点图显示。
   * @param {maplibregl.LngLatBounds} bounds - 当前显示范围。
   */
  updateHeatPoints(bounds) {
    this.renderer.updateHeatPoints(bounds);
  }

  /**
   * @function HeatMapLayer.prototype.getPixelXY
   * @description 转换地理坐标为相对于当前窗口左上角的像素坐标。
   * @param {number} x - 热点的像素 x 坐标。
   * @param {number} y - 热点的像素 y 坐标。
   */
  getPixelXY(coordinate) {
    return this.renderer.getPixelXY(coordinate);
  }

  /**
   * @function HeatMapLayer.prototype.removeFeatures
   * @description 移除指定的热点信息。
   * @param {Array.<FeatureVector>|FeatureVector} features - 热点信息数组。
   */
  removeFeatures(features) {
    const removeFeaturesRes = this.renderer.removeFeatures(features);
    if(!removeFeaturesRes) {
      return;
    }
    const { heatPointsFailedRemoved, succeed } = removeFeaturesRes;
    //派发删除features成功的事件
    /**
     * @event HeatMapLayer#featuresremoved
     * @description 要素删除之后触发。
     * @property {Array.<FeatureVector>} features - 需要被删除的要素。
     * @property {boolean} succeed - 要素删除成功与否。
     */
    this.fire(this.EVENT_TYPES[1], { features: heatPointsFailedRemoved, succeed });
  }

  /**
   * @function HeatMapLayer.prototype.removeAllFeatures
   * @description 移除全部的热点信息。
   */
  removeAllFeatures() {
    this.renderer.removeAllFeatures();
  }

   /**
    * @function HeatMapLayer.prototype.moveTo
    * @description 将图层移动到某个图层之前。
    * @param {string} layerID - 待插入的图层ID。
    * @param {boolean} [before=true] - 是否将本图层插入到图层 ID 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 ID 为 layerID 的图层之后)。
    */
   moveTo(layerID, before) {
       var layer = document.getElementById(this.renderer.rootCanvas.id);
       before = before !== undefined ? before : true;
       if (before) {
           var beforeLayer = document.getElementById(layerID);
           if (layer && beforeLayer) {
               beforeLayer.parentNode.insertBefore(layer, beforeLayer);
           }
           return;
       }
       var nextLayer = document.getElementById(layerID);
       if (layer) {
           if (nextLayer.nextSibling) {
               nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
               return;
           }
           nextLayer.parentNode.appendChild(layer);
       }
   }

  /**
   * @function HeatMapLayer.prototype.setVisibility
   * @description 设置图层可见性。
   * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
   */
  setVisibility(visibility) {
    this.renderer.setVisibility(visibility);
  }

  _convertLatlonToPixel(coordinate) {
    return this.map.project(new maplibregl.LngLat(coordinate.lon, coordinate.lat));
  }
}
