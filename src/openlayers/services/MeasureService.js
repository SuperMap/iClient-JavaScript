import ol from 'openlayers';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {MeasureService as CommonMeasureService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.MeasureService
 * @category  iServer Map Measure
 * @classdesc 测量服务
 * @extends ol.supermap.ServiceBase
 * @param url - {string} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 *         measureMode - {MeasureMode} 量算模式，包括距离量算模式和面积量算模式。
 */
export class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.MeasureService.prototype.measureDistance
     * @description 测距
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function ol.supermap.MeasureService.prototype.measureArea
     * @description 测面积
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    /**
     * @function ol.supermap.MeasureService.prototype.measure
     * @description 测量
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param type - {string} 类型
     * @param callback - {function} 回调函数
     * @return {ol.supermap.MeasureService} 测量服务
     */
    measure(params, type, callback) {
        var me = this;
        var measureService = new CommonMeasureService(me.url, {
            proxy: me.options.proxy,
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