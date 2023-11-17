/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import { DataFlowService as DataFlow } from '@supermap/iclient-common/iServer/DataFlowService';

/**
 * @class DataFlowService
 * @category  iServer DataFlow
 * @classdesc 数据流服务类。用于实现客户端与服务器之间实现低延迟和实时数据传输。数据流服务采用 WebSocket 协议，支持全双工、双向式通信。
 * 服务器可将流数据服务的分析处理结果作为数据来源向客户端广播，客户端与数据流服务建立连接后，即可自动接收服务器广播的数据。
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      new DataFlowService(url).queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {GeoJSONObject} [options.geometry] - 指定几何范围，只有在该范围内的要素才能被订阅。
 * @param {Object} [options.excludeField] - 排除字段。
 * @usage
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
     * @function DataFlowService.prototype.initBroadcast
     * @description 初始化广播。
     * @returns {DataFlowService} - 数据流服务。
     */
    initBroadcast() {
        this.dataFlow.initBroadcast();
        return this;
    }

    /**
     * @function DataFlowService.prototype.broadcast
     * @description 加载广播数据。
     * @param {JSONObject} obj - JSON 格式的要素数据。
     */
    broadcast(obj) {
        this.dataFlow.broadcast(obj);
    }

    /**
     * @function DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据。
     */
    initSubscribe() {
        this.dataFlow.initSubscribe();
        return this;
    }

    /**
     * @function DataFlowService.prototype.setExcludeField
     * @description 设置排除字段。
     * @param {Object} excludeField - 排除字段。
     */
    setExcludeField(excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    }

    /**
     * @function DataFlowService.prototype.setGeometry
     * @description 设置添加的几何要素数据。
     * @param {GeoJSONObject} geometry - 指定几何范围，只有在该范围内的要素才能被订阅。
     */
    setGeometry(geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    }

    /**
     * @function DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据。
     */
    unSubscribe() {
        this.dataFlow.unSubscribe();
    }

    /**
     * @function DataFlowService.prototype.unBroadcast
     * @description 结束加载广播。
     */
    unBroadcast() {
        this.dataFlow.unBroadcast();
    }

    _defaultEvent(e) {
        this.dispatchEvent({type: e.eventType || e.type, value: e});
    }
}
