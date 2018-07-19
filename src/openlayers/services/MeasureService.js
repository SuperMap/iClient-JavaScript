import ol from 'openlayers';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {MeasureService as CommonMeasureService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.MeasureService
 * @category  iServer Map Measure
 * @classdesc 测量服务。
 * @extends ol.supermap.ServiceBase
 * @param {string} url -  服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options -  交互服务时所需可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 */
export class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.MeasureService.prototype.measureDistance
     * @description 测距。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function ol.supermap.MeasureService.prototype.measureArea
     * @description 测面积。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    /**
     * @function ol.supermap.MeasureService.prototype.measure
     * @description 测量。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {string} type - 类型。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {ol.supermap.MeasureService} 测量服务。
     */
    measure(params, type, callback) {
        var me = this;
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
        measureService.processAsync(me._processParam(params));
    }

    _processParam(params) {
        if (params && params.geometry) {
            params.geometry = Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
        }
        return params;
    }
}
ol.supermap.MeasureService = MeasureService;