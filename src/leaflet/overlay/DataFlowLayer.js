/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {
  DataFlowService
} from "../services/DataFlowService";
import {
  MapvRenderer
} from './dataflow/MapvRenderer';
import {
  NormalRenderer
} from './dataflow/NormalRenderer';

/**
 * @class DataFlowLayer
 * @deprecatedclassinstance L.supermap.dataFlowLayer
 * @classdesc 数据流图层源。订阅SuperMap iServer 数据流服务并上图。订阅得到的数据会根据 `options.idField` 自动更新。
 * @category  iServer DataFlow
 * @extends {L.LayerGroup}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Object} [options.render='normal'] - 绘制方式。可选值为'normal'，'mapv'。
 'normal' 表示以 {( {@link L.LatLng}|{@link L.Polyline}|{@link L.Polygon}|{@link L.Marker} )} 方式绘制数据流。'mapv' 表示以 {@link MapVLayer} 方式绘制实时数据。
 * @param {GeoJSONObject} [options.geometry] - 指定几何范围，该范围内的要素才能被订阅。
 * @param {Object} [options.prjCoordSys] - 投影坐标对象。
 * @param {string} [options.excludeField] - 排除字段。
 * @param {string} [options.idField='id'] - 要素属性中表示唯一标识的字段。
 * @param {function} [options.pointToLayer] - 定义点要素如何绘制在地图上。
 `function(geoJsonPoint, latlng) {
                                                return L.marker(latlng);
                                            }`
 * @param {function} [options.style] - 定义点、线、面要素样式。参数为{@link L.Path-option}。</br>
 `function (feature) {
                                                    return {
                                                        fillColor: "red",
                                                        fillOpacity: 1,
                                                        radius: 6,
                                                        weight: 0
                                                    };
                                            }`
 * @param {function|number} [options.deg] - 定义图标的旋转角度。`options.render` 为 `mapv` 时有效。</br>
 `function (feature,latlng) {
                                                        return feature.properties['rotate'];
                                                }`
 * @fires DataFlowLayer#subscribesucceeded
 * @fires DataFlowLayer#subscribefailed
 * @fires DataFlowLayer#setfilterparamsucceeded
 * @fires DataFlowLayer#dataupdated
 * @usage
 */

export var DataFlowLayer = L.LayerGroup.extend({

  options: {
    geometry: null,
    prjCoordSys: null,
    excludeField: null,
    idField: "id",
    render: 'normal'
  },

  initialize: function (url, options) {
    options = options || {};
    L.Util.setOptions(this, options);
    this.url = url;
    this._layers = {};
    this.dataService = new DataFlowService(this.url, {
      geometry: this.options.geometry,
      prjCoordSys: this.options.prjCoordSys,
      excludeField: this.options.excludeField
    })

  },
  /**
   * @private
   * @function DataFlowLayer.prototype.onAdd
   * @description 添加地图。
   * @param {L.Map} map - Leaflet Map 对象。
   */
  onAdd: function (map) { // eslint-disable-line no-unused-vars
    this.dataService.initSubscribe();
    /**
     * @event DataFlowLayer#subscribesucceeded
     * @description 初始化成功后触发。
     * @property {Object} e  - 事件对象。
     */
    this.dataService.on('subscribeSocketConnected', (e) => this.fire("subscribesucceeded", e));

    /**
     * @event DataFlowLayer#subscribefailed
     * @description 初始化失败后触发。
     * @property {Object} e  - 事件对象。
     */
    this.dataService.on('subscribeSocketError', (e) => this.fire("subscribefailed", e))
    this.dataService.on('messageSucceeded', (msg) => this._onMessageSuccessed(msg));

    /**
     * @event DataFlowLayer#setfilterparamsucceeded
     * @description 过滤参数设置成功后触发。
     * @property {Object} e  - 事件对象。
     */
    this.dataService.on('setFilterParamSucceeded', (msg) => this.fire("setfilterparamsucceeded", msg));
    if (this.options.render === 'mapv') {
      this.addLayer(new MapvRenderer(this.url, this.options));
    } else {
      this.addLayer(new NormalRenderer(this.url, this.options));
    }
    L.LayerGroup.prototype.onAdd.call(this, map);
  },
  /**
   * @private
   * @function DataFlowLayer.prototype.onRemove
   * @description 删除指定地图。
   * @param {L.Map} map - Leaflet Map 对象。
   */
  onRemove: function (map) { // eslint-disable-line no-unused-vars
    L.LayerGroup.prototype.onRemove.call(this, map);
    this.dataService && this.dataService.unSubscribe();
  },
  /**
   * @function DataFlowLayer.prototype.setExcludeField
   * @description 设置唯一字段。
   * @param {string} excludeField - 唯一字段。
   */
  setExcludeField: function (excludeField) {
    this.dataService.setExcludeField(excludeField);
    this.options.excludeField = excludeField;
    return this;
  },

  /**
   * @function DataFlowLayer.prototype.setGeometry
   * @description 设置几何要素。
   * @param {GeoJSONObject} geometry - 待设置的 GeoJSON 几何要素对象。
   */
  setGeometry: function (geometry) {
    this.dataService.setGeometry(geometry);
    this.options.geometry = geometry;
    return this;
  },
  _onMessageSuccessed: function (msg) {
    this.getLayers().map((layer) => {
      if (layer.onMessageSuccessed) {
        layer.onMessageSuccessed(msg);
        /**
         * @description 图层数据更新成功后触发。
         * @event DataFlowLayer#dataupdated
         * @property {Object} layer  - 更新数据成功的图层。
         * @property {Object} data  - 更新的要素。
         */
        this.fire("dataupdated", {
          layer: layer,
          data: msg.featureResult
        });
      }
      return layer;
    })
  }

});
export var dataFlowLayer = function (url, options) {
  return new DataFlowLayer(url, options);
};
