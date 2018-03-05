import mapboxgl from 'mapbox-gl';
import '../core/Base';import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {Geometry, MeasureService as CommonMeasureService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.MeasureService
 * @category  iServer Map Measure
 * @classdesc 测量服务
 * @extends mapboxgl.supermap.ServiceBase
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
     * @function mapboxgl.supermap.MeasureService.prototype.measureDistance
     * @description 测距
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measureArea
     * @description 测面积
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param callback - {function} 回调函数
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measure
     * @description 测量
     * @param params -{SuperMap.MeasureParameters} 测量相关参数类
     * @param type - {string} 类型
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.MeasureService} 测量服务
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
        if (params && !(params.geometry instanceof Geometry)) {

            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        return params;

    }

}

mapboxgl.supermap.MeasureService = MeasureService;