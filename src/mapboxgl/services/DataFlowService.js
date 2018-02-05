import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {DataFlowService as DataFlow} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.DataFlowService
 * @category  iServer DataFlow
 * @classdesc 实时数据服务
 * @extends mapboxgl.supermap.ServiceBase
 * @example
 *      new mapboxgl.supermap.DataFlowService(url)
 *      .queryChart(param,function(result){
 *          //doSomething
 *      })
 * @param url - {string} 与客户端交互的实时数据服务地址。
 * @param options - {Object} 加载实时数据可选参数。如：<br>
 *        style - {function} 设置数据加载样式。<br>
 *        onEachFeature - {function} 设置每个数据加载popup等。<br>
 *        geometry - {Array<Object>} 设置增添的几何要素对象数组。<br>
 *        excludeField - -{Object} 排除字段
 */
export class DataFlowService extends ServiceBase {


    constructor(url, options) {
        super(url, options);
        options = options || {};
        if (options.projection) {
            this.options.prjCoordSys = options.projection;
        }
        ServiceBase.call(this, url, options);
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
        });
        var me = this;
        me.on('subscribeSocketConnected', function (e) {
            me.fire('subscribeSuccessed', e);
        })

    }


    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.initBroadcast
     * @description 初始化广播
     * @returns {mapboxgl.supermap.DataFlowService}
     */
    initBroadcast() {
        this.dataFlow.initBroadcast();
        return this;
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.broadcast
     * @description 加载广播数据
     * @param obj {JSON} json格式的要素数据
     */
    broadcast(obj) {
        this.dataFlow.broadcast(obj);
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.initSubscribe
     * @description 初始化订阅数据
     */
    initSubscribe() {
        this.dataFlow.initSubscribe();
        return this;
    }


    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.setExcludeField
     * @description 设置排除字段
     * @param excludeField - {Object} 排除字段
     */
    setExcludeField(excludeField) {
        this.dataFlow.setExcludeField(excludeField);
        this.options.excludeField = excludeField;
        return this;
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.setGeometry
     * @description 设置添加的几何要素数据
     * @param geometry - {Array<Object>} 设置增添的几何要素对象数组。
     */
    setGeometry(geometry) {
        this.dataFlow.setGeometry(geometry);
        this.options.geometry = geometry;
        return this;
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.unSubscribe
     * @description 结束订阅数据
     */
    unSubscribe() {
        this.dataFlow.unSubscribe();
    }

    /**
     * @function mapboxgl.supermap.DataFlowService.prototype.unBroadcast
     * @description 结束加载广播
     */
    unBroadcast() {
        this.dataFlow.unBroadcast();
    }

    _defaultEvent(e) {
        this.fire(e.eventType || e.type, e);
    }
}

mapboxgl.supermap.DataFlowService = DataFlowService;