import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import * as Util from '../core/Util';
import {MeasureMode, MeasureService as CommonMeasureService, MeasureParameters} from '@supermap/iclient-common';

/**
 * @class L.supermap.measureService
 * @classdesc 量算服务类。
 * @category  iServer Map Measure
 * @augments {L.supermap.ServiceBase}
 * @example
 * 用法：
 * L.supermap.measureService(url).measureDistance({
 *     geometry:xxx
 * },function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 */
export var MeasureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.measureService.prototype.measureDistance
     * @description 测距。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measureDistance: function (params, callback) {
        this.measure(MeasureMode.DISTANCE, params, callback);
        return this;
    },

    /**
     * @function L.supermap.measureService.prototype.measureArea
     * @description 测面积。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measureArea: function (params, callback) {
        this.measure(MeasureMode.AREA, params, callback);
        return this;
    },

    /**
     * @function L.supermap.measureService.measure
     * @param {SuperMap.MeasureMode} type - 量算模式。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measure: function (type, params, callback) {
        if (!(params instanceof MeasureParameters)) {
            return;
        }
        var me = this;
        if (params.geometry) {
            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        var measureService = new CommonMeasureService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            measureMode: type,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        measureService.processAsync(params);
    }
});

export var measureService = function (url, options) {
    return new MeasureService(url, options);
};

L.supermap.measureService = measureService;