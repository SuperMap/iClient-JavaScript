/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {DataFlowService as DataFlow} from '@supermap/iclient-common';

/**
 * @class L.supermap.dataFlowService
 * @classdesc 数据流服务类。
 * @category  iServer DataFlow
 * @extends {L.supermap.ServiceBase}
 * @param {string} url - 数据流服务地址。
 * @param {Object} options - 参数。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 ISERVER|IPORTAL|ONLINE。
 * @param {Function} [options.style] - 设置数据加载样式。
 * @param {Function} [options.onEachFeature] -  设置每个数据加载 popup 等。
 * @param {GeoJSONObject} [options.geometry] - 指定几何范围，该范围内的要素才能被订阅。
 * @param {Object} [options.excludeField] - 排除字段。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @fires L.supermap.dataFlowService#broadcastSocketConnected
 * @fires L.supermap.dataFlowService#broadcastSocketError
 * @fires L.supermap.dataFlowService#broadcastFailed
 * @fires L.supermap.dataFlowService#broadcastSucceeded
 * @fires L.supermap.dataFlowService#subscribeSocketError
 * @fires L.supermap.dataFlowService#messageSucceeded
 * @fires L.supermap.dataFlowService#setFilterParamSucceeded
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
        this.dataFlow = new DataFlow(url, options);
        /**
         * @event L.supermap.dataFlowService#broadcastSocketConnected
         * @description broadcast Socket 连接成功。
         */
        /**
         * @event L.supermap.dataFlowService#broadcastSocketError
         * @description broadcast Socket 连接失败。
         */
        /**
         * @event L.supermap.dataFlowService#broadcastFailed
         * @description 广播失败。
         */
        /**
         * @event L.supermap.dataFlowService#broadcastSucceeded
         * @description 广播成功。
         */
        /**
         * @event L.supermap.dataFlowService#subscribeSocketConnected
         * @description 订阅数据连接成功。
         */
        /**
         * @event L.supermap.dataFlowService#subscribeSocketError
         * @description 订阅数据连接失败。
         */
        /**
         * @event L.supermap.dataFlowService#messageSucceeded
         * @description 获取信息成功。
         */
        /**
         * @event L.supermap.dataFlowService#setFilterParamSucceeded
         * @description 设置过滤参数成功。
         */
        this.dataFlow.events.on({
            "broadcastSocketConnected": this._defaultEvent,
            "broadcastSocketError": this._defaultEvent,
            "broadcastFailed": this._defaultEvent,
            "broadcastSucceeded": this._defaultEvent,
            "subscribeSocketConnected": this._defaultEvent,
            "subscribeSocketError": this._defaultEvent,
            "messageSucceeded": this._defaultEvent,
            "setFilterParamSucceeded": this._defaultEvent,
            scope: this
        })
    },

    /**
     * @function L.supermap.dataFlowService.prototype.initBroadcast
     * @description 初始化广播。
     */
    initBroadcast: function () {
        this.dataFlow.initBroadcast();
        return this;
    },

    /**
     * @function L.supermap.dataFlowService.prototype.broadcast
     * @description 加载广播数据。
     * @param {JSONObject} obj - JSON 格式的要素数据。
     */
    broadcast: function (obj) {
        this.dataFlow.broadcast(obj);
    },

    /**
     * @function L.supermap.dataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据。
     */
    initSubscribe: function () {
        this.dataFlow.initSubscribe();
        return this;
    },


    /**
     * @function L.supermap.dataFlowService.prototype.setExcludeField
     * @description 设置排除字段。
     * @param {Object} excludeField - 排除字段。
     */
    setExcludeField: function (excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    },

    /**
     * @function L.supermap.dataFlowService.prototype.setGeometry
     * @description 设置添加的 GeoJSON 几何要素数据。
     * @param {GeoJSONObject} geometry - 指定几何范围，该范围内的要素才能被订阅。
     */
    setGeometry: function (geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    },

    /**
     * @function L.supermap.dataFlowService.prototype.unSubscribe
     * @description 结束订阅数据。
     */
    unSubscribe: function () {
        this.dataFlow.unSubscribe();
    },

    /**
     * @function L.supermap.dataFlowService.prototype.unBroadcast
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

L.supermap.dataFlowService = dataFlowService;