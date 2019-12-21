/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import {DataFlowService as DataFlow} from '@supermap/iclient-common';

/**
 * @class ol.supermap.DataFlowService
 * @category  iServer DataFlow
 * @classdesc 数据流服务。
 * @extends {ol.supermap.ServiceBase}
 * @example
 *      new ol.supermap.DataFlowService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 与客户端交互的数据流服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {GeoJSONObject} [options.geometry] - 指定几何范围，该范围内的要素才能被订阅。
 * @param {Object} [options.excludeField] - 排除字段。
 */
export class DataFlowService extends ServiceBase {

    constructor(url, options) {
        options = options || {};
        if (options.projection) {
            options.prjCoordSys = options.projection;
        }
        super(url, options);
        this.dataFlow = new DataFlow(url, options);
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
        });
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.initBroadcast
     * @description 初始化广播。
     * @returns {ol.supermap.DataFlowService}
     */
    initBroadcast() {
        this.dataFlow.initBroadcast();
        return this;
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.broadcast
     * @description 加载广播数据。
     * @param {JSON} obj - JSON 格式的要素数据。
     */
    broadcast(obj) {
        this.dataFlow.broadcast(obj);
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据。
     */
    initSubscribe() {
        this.dataFlow.initSubscribe();
        return this;
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.setExcludeField
     * @description 设置排除字段。
     * @param {Object} excludeField - 排除字段。
     */
    setExcludeField(excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.setGeometry
     * @description 设置添加的几何要素数据。
     * @param {GeoJSONObject} geometry - 指定几何范围，该范围内的要素才能被订阅。
     */
    setGeometry(geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据。
     */
    unSubscribe() {
        this.dataFlow.unSubscribe();
    }

    /**
     * @function ol.supermap.DataFlowService.prototype.unBroadcast
     * @description 结束加载广播。
     */
    unBroadcast() {
        this.dataFlow.unBroadcast();
    }

    _defaultEvent(e) {
        this.dispatchEvent({type: e.eventType || e.type, value: e});
    }
}