/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {CommonServiceBase} from './CommonServiceBase';
import {Util} from '../commontypes/Util';
import {SecurityManager} from '../security/SecurityManager';

/**
 * @class DataFlowService
 * @deprecatedclass SuperMap.DataFlowService
 * @category iServer DataFlow
 * @classdesc 数据流服务类
 * @extends {CommonServiceBase}
 * @param {string} url - 数据流服务地址
 * @param {Object} options - 参数。
 * @param {function} options.style - 设置数据加载样式。
 * @param {function} [options.onEachFeature] - 设置每个数据加载popup等。
 * @param {GeoJSONObject} [options.geometry] - 指定几何范围，该范围内的要素才能被订阅。
 * @param {Object} [options.excludeField] - -排除字段。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class DataFlowService extends CommonServiceBase {


    constructor(url, options) {
        options = options || {};
        /*
         * @constant EVENT_TYPES
         * {Array.<string>}
         * 此类支持的事件类型
         */
        options.EVENT_TYPES = ["broadcastSocketConnected", "broadcastSocketError", "broadcastFailed", "broadcastSucceeded", "subscribeSocketConnected", "subscribeSocketError", "messageSucceeded", "setFilterParamSucceeded"]
        super(url, options);

        /**
         * @member {GeoJSONObject} DataFlowService.prototype.geometry
         * @description 指定几何范围，该范围内的要素才能被订阅。
         */
        this.geometry = null;

        /**
         * @member {Object} DataFlowService.prototype.prjCoordSys
         * @description 动态投影参数
         */
        this.prjCoordSys = null;

        /**
         * @member {Object} DataFlowService.prototype.excludeField
         * @description 排除字段
         */
        this.excludeField = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.DataFlowService";
    }

    /**
     * @function DataFlowService.prototype.initBroadcast
     * @description 初始化广播
     * @returns {DataFlowService}
     */
    initBroadcast() {
        var me = this;
        this.broadcastWebSocket = this._connect(Util.urlPathAppend(me.url, 'broadcast'));
        this.broadcastWebSocket.onopen = function (e) {
            me.broadcastWebSocket.isOpen = true;
            e.eventType = 'broadcastSocketConnected';
            me.events.triggerEvent('broadcastSocketConnected', e);
        };
        this.broadcastWebSocket.onclose = function (e) {
            me.broadcastWebSocket.isOpen = false;
            e.eventType = 'broadcastSocketConnected';
            me.events.triggerEvent('broadcastSocketConnected', e);
        };
        this.broadcastWebSocket.onerror = function (e) {
            e.eventType = 'broadcastSocketError';
            me.events.triggerEvent('broadcastSocketError', e);
        };
        return this;
    }

    /**
     * @function DataFlowService.prototype.broadcast
     * @description 加载广播数据。
     * @param {GeoJSONObject} geoJSONFeature - JSON 格式的要素数据。
     */
    broadcast(geoJSONFeature) {
        if (!this.broadcastWebSocket||!this.broadcastWebSocket.isOpen) {
            this.events.triggerEvent('broadcastFailed');
            return;
        }
        this.broadcastWebSocket.send(JSON.stringify(geoJSONFeature));
        this.events.triggerEvent('broadcastSucceeded');

    }

    /**
     * @function DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据
     * @returns {this} this
     */
    initSubscribe() {
        var me = this;
        this.subscribeWebSocket = this._connect(Util.urlPathAppend(me.url, 'subscribe'));
        this.subscribeWebSocket.onopen = function (e) {
            me.subscribeWebSocket.send(me._getFilterParams());
            e.eventType = 'subscribeSocketConnected';
            me.events.triggerEvent('subscribeSocketConnected', e);
        };
        this.subscribeWebSocket.onerror = function (e) {
            e.eventType = 'subscribeSocketError';
            me.events.triggerEvent('subscribeSocketError', e);
        };
        this.subscribeWebSocket.onmessage = function (e) {
            me._onMessage(e);
        };
        return this;
    }


    /**
     * @function DataFlowService.prototype.setExcludeField
     * @description 设置排除字段
     * @param {Object} excludeField - 排除字段
     * @returns {this} this
     */
    setExcludeField(excludeField) {
        this.excludeField = excludeField;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    }

    /**
     * @function DataFlowService.prototype.setGeometry
     * @description 设置添加的几何要素数据
     * @param {GeoJSONObject} geometry - 指定几何范围，该范围内的要素才能被订阅。
     * @returns {this} this
     */
    setGeometry(geometry) {
        this.geometry = geometry;
        this.subscribeWebSocket.send(this._getFilterParams());
        return this;
    }

    /**
     * @function DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据
     */
    unSubscribe() {
        if (!this.subscribeWebSocket) {
            return;
        }
        this.subscribeWebSocket.close();
        this.subscribeWebSocket = null;
    }

    /**
     * @function DataFlowService.prototype.unBroadcast
     * @description 结束加载广播
     */
    unBroadcast() {
        if (!this.broadcastWebSocket) {
            return;
        }
        this.broadcastWebSocket.close();
        this.broadcastWebSocket = null;
    }

    /**
     * @function DataFlowService.prototype.destroy
     * @override
     */
    destroy() {
        CommonServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.geometry = null;
        me.prjCoordSys = null;
        me.excludeField = null;
        this.unBroadcast();
        this.unSubscribe();

    }


    _getFilterParams() {
        var filter = {
            filterParam: {
                prjCoordSys: this.prjCoordSys,
                excludeField: this.excludeField,
                geometry: this.geometry
            }
        };
        return Util.toJSON(filter);
    }


    _onMessage(e) {
        if (e.data && e.data.indexOf("filterParam") >= 0) {
            var filterParam = JSON.parse(e.data);
            e.filterParam = filterParam;
            e.eventType = 'setFilterParamSucceeded';
            this.events.triggerEvent('setFilterParamSucceeded', e);
            return;
        }
        var feature = JSON.parse(e.data);
        e.featureResult = feature;
        e.eventType = 'messageSucceeded';
        this.events.triggerEvent('messageSucceeded', e);
    }


    _connect(url) {
        url = SecurityManager.appendCredential(url);
        if ("WebSocket" in window) {
            return new WebSocket(url);
        } else if ("MozWebSocket" in window) {
            var mozWebSocket = window.MozWebSocket;
            return new mozWebSocket(url);
        } else {
            console.log("no WebSocket");
            return null;
        }
    }
}
