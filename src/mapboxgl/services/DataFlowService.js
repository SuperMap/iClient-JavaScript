/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {DataFlowService as DataFlow} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.DataFlowService
 * @category  iServer DataFlow
 * @classdesc 数据流服务。
 * @extends {mapboxgl.supermap.ServiceBase}
 * @example
 * new mapboxgl.supermap.DataFlowService(url)
 *  .queryChart(param,function(result){
 *     //doSomething
 * })
 * @param {string} url - 与客户端交互的实时数据服务地址。
 * @param {Object} options - 加载实时数据可选参数。
 * @param {Array.<Object>} [options.geometry] - 设置增添的几何要素对象数组。
 * @param {Object} [options.excludeField] - 排除字段。
 * @fires mapboxgl.supermap.DataFlowService#broadcastSocketConnected
 * @fires mapboxgl.supermap.DataFlowService#broadcastSocketError
 * @fires mapboxgl.supermap.DataFlowService#broadcastFailed
 * @fires mapboxgl.supermap.DataFlowService#broadcastSucceeded
 * @fires mapboxgl.supermap.DataFlowService#subscribeSocketError
 * @fires mapboxgl.supermap.DataFlowService#messageSucceeded
 * @fires mapboxgl.supermap.DataFlowService#setFilterParamSucceeded
 */
export class DataFlowService extends ServiceBase {


    constructor(url, options) {
        options = options || {};
        if (options.projection) {
            options.prjCoordSys = options.projection;
        }
        super(url, options);
        this.dataFlow = new DataFlow(url, options);
        /**
         * @event mapboxgl.supermap.DataFlowService#broadcastSocketConnected
         * @description broadcast Socket 连接成功。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#broadcastSocketError
         * @description broadcast Socket 连接失败。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#broadcastFailed
         * @description 广播失败。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#broadcastSucceeded
         * @description 广播成功。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#subscribeSocketConnected
         * @description 订阅数据连接成功。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#subscribeSocketError
         * @description 订阅数据连接失败。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#messageSucceeded
         * @description 获取信息成功。
         */
        /**
         * @event mapboxgl.supermap.DataFlowService#setFilterParamSucceeded
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
        });
        var me = this;
        me.on('subscribeSocketConnected', function (e) {
            /**
             * @event mapboxgl.supermap.DataFlowService#subscribesucceeded
             * @description 数据流服务订阅成功后触发。
             * @property {Object} e - 事件对象。
             */
            me.fire('subscribesucceeded', e);
        })

    }


    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.initBroadcast
     * @description 初始化广播。
     * @returns {mapboxgl.supermap.DataFlowService}
     */
    initBroadcast() {
        this.dataFlow.initBroadcast();
        return this;
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.broadcast
     * @description 加载广播数据。
     * @param {JSON} obj - JSON 格式的要素数据。
     */
    broadcast(obj) {
        this.dataFlow.broadcast(obj);
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据。
     */
    initSubscribe() {
        this.dataFlow.initSubscribe();
        return this;
    }


    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.setExcludeField
     * @description 设置排除字段。
     * @param {Object} excludeField - 排除字段。
     */
    setExcludeField(excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.setGeometry
     * @description 设置添加的几何要素数据。
     * @param {Array.<Object>} geometry - 设置增添的几何要素对象数组。
     */
    setGeometry(geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据。
     */
    unSubscribe() {
        this.dataFlow.unSubscribe();
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.unBroadcast
     * @description 结束加载广播。
     */
    unBroadcast() {
        this.dataFlow.unBroadcast();
    }

    _defaultEvent(e) {
        this.fire(e.eventType || e.type, e);
    }
}

mapboxgl.supermap.DataFlowService = DataFlowService;