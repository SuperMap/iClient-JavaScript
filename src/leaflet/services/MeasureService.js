import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import * as Util from '../core/Util';
import SuperMapMeasureService from '../../common/iServer/MeasureService' ;

/**
 * @class L.supermap.measureService
 * @classdesc 量算服务服务类
 * @augments L.supermap.ServiceBase
 * @example
 * 用法：
 * L.supermap.measureService(url).measureDistance({
 *     geometry:xxx
 * },function(result){
 *     //doSomething
 * })
 * @param url - {string} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 *        eventListeners - {Object} 需要被注册的监听器对象。<br>
 *        measureMode - {SuperMap.MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
 */
export var MeasureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.measureService.prototype.measureDistance
     * @description 测距
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     * @return {this}
     */
    measureDistance: function (params, callback) {
        this.measure(SuperMap.MeasureMode.DISTANCE, params, callback);
        return this;
    },

    /**
     * @function L.supermap.measureService.prototype.measureArea
     * @description 测面积
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     * @return {this}
     */
    measureArea: function (params, callback) {
        this.measure(SuperMap.MeasureMode.AREA, params, callback);
        return this;
    },

    /**
     * @function L.supermap.measureService.measure
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     * @return {this}
     */
    measure: function (type, params, callback) {
        if (!params) {
            return;
        }
        var me = this;
        if (params.geometry) {
            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        var measureService = new SuperMapMeasureService(me.url, {
            serverType: me.options.serverType,
            measureMode: type,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        measureService.processAsync(params);
        return me;
    }
});

export var measureService = function (url, options) {
    return new MeasureService(url, options);
};

L.supermap.measureService = measureService;