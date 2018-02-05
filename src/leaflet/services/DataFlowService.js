import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {DataFlowService as DataFlow} from '@supermap/iclient-common';

/**
 * @class L.supermap.dataFlowService
 * @classdesc 实时数据服务类
 * @category  iServer DataFlow
 * @extends L.supermap.ServiceBase
 * @param url - {string} 实时数据服务地址
 * @param options - {Object} 加载实时数据可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 *        style - {function} 设置数据加载样式。<br>
 *        onEachFeature - {function} 设置每个数据加载popup等。<br>
 *        geometry - {Array<Object>} 设置增添的几何要素对象数组。<br>
 *        excludeField - -{Object} 排除字段
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
        this.dataFlow.events.on({
            "broadcastSocketConnected": this._defaultEvent,
            "broadcastSocketError": this._defaultEvent,
            "broadcastFailed": this._defaultEvent,
            "broadcastSuccessed": this._defaultEvent,
            "subscribeSocketConnected": this._defaultEvent,
            "subscribeSocketError": this._defaultEvent,
            "messageSuccessed": this._defaultEvent,
            "setFilterParamSuccessed": this._defaultEvent,
            scope: this
        })
    },

    /**
     * @function L.supermap.dataFlowService.prototype.initBroadcast
     * @description 初始化广播
     */
    initBroadcast: function () {
        this.dataFlow.initBroadcast();
        return this;
    },

    /**
     * @function L.supermap.dataFlowService.prototype.broadcast
     * @description 加载广播数据
     * @param obj {JSONObject} json格式的要素数据
     */
    broadcast: function (obj) {
        this.dataFlow.broadcast(obj);
    },

    /**
     * @function L.supermap.dataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据
     */
    initSubscribe: function () {
        this.dataFlow.initSubscribe();
        return this;
    },


    /**
     * @function L.supermap.dataFlowService.prototype.setExcludeField
     * @description 设置排除字段
     * @param excludeField - {Object} 排除字段
     */
    setExcludeField: function (excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    },

    /**
     * @function L.supermap.dataFlowService.prototype.setGeometry
     * @description 设置添加的GeoJSON几何要素数据
     * @param geometry - {Array<Object>} 设置增添的GeoJSON几何要素对象数组。
     */
    setGeometry: function (geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    },

    /**
     * @function L.supermap.dataFlowService.prototype.unSubscribe
     * @description 结束订阅数据
     */
    unSubscribe: function () {
        this.dataFlow.unSubscribe();
    },

    /**
     * @function L.supermap.dataFlowService.prototype.unBroadcast
     * @description 结束加载广播
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