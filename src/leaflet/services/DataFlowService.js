/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {DataFlowService as DataFlow} from '@supermap/iclient-common/iServer/DataFlowService';

/**
 * @class DataFlowService
 * @deprecatedclassinstance L.supermap.dataFlowService
 * @classdesc 数据流服务类。
 * @category  iServer DataFlow
 * @modulecategory Services
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {function} [options.style] - 设置数据加载样式。
 * @param {function} [options.onEachFeature] -  给该元素绑定事件和弹窗。
 * @param {GeoJSONObject} [options.geometry] - 指定几何范围，该范围内的要素才能被订阅。
 * @param {Object} [options.excludeField] - 排除字段。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @fires DataFlowService#broadcastSocketConnected
 * @fires DataFlowService#broadcastSocketError
 * @fires DataFlowService#broadcastFailed
 * @fires DataFlowService#broadcastSucceeded
 * @fires DataFlowService#subscribeSocketError
 * @fires DataFlowService#messageSucceeded
 * @fires DataFlowService#setFilterParamSucceeded
 * @usage
 */
export var DataFlowService = ServiceBase.extend({

    options: {
        geometry: null,
        prjCoordSys: null,
        excludeField: null
    },

    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        if (options.projection) {
            this.options.prjCoordSys = options.projection;
        }
        ServiceBase.prototype.initialize.call(this, url, options);
        this.dataFlow = new DataFlow(url, options, this._defaultEvent.bind(this));
    },

    /**
     * @function DataFlowService.prototype.initBroadcast
     * @description 初始化广播。
     */
    initBroadcast: function () {
        this.dataFlow.initBroadcast();
        return this;
    },

    /**
     * @function DataFlowService.prototype.broadcast
     * @description 加载广播数据。
     * @param {JSONObject} obj - JSON 格式的要素数据。
     */
    broadcast: function (obj) {
        this.dataFlow.broadcast(obj);
    },

    /**
     * @function DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据。
     */
    initSubscribe: function () {
        this.dataFlow.initSubscribe();
        return this;
    },


    /**
     * @function DataFlowService.prototype.setExcludeField
     * @description 设置排除字段。
     * @param {Object} excludeField - 排除字段。
     */
    setExcludeField: function (excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    },

    /**
     * @function DataFlowService.prototype.setGeometry
     * @description 设置添加的 GeoJSON 几何要素数据。
     * @param {GeoJSONObject} geometry - 指定几何范围，该范围内的要素才能被订阅。
     */
    setGeometry: function (geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    },

    /**
     * @function DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据。
     */
    unSubscribe: function () {
        this.dataFlow.unSubscribe();
    },

    /**
     * @function DataFlowService.prototype.unBroadcast
     * @description 结束加载广播。
     */
    unBroadcast: function () {
        this.dataFlow.unBroadcast();
    },

    _defaultEvent: function (e) {
        this.fire(e.eventType || e.type, e);
    }
});

export var dataFlowService = function (url, options) {
    return new DataFlowService(url, options);
};
