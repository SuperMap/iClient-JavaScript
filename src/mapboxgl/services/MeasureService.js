import mapboxgl from 'mapbox-gl';
import '../core/Base';import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {Geometry, MeasureService as CommonMeasureService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.MeasureService
 * @category  iServer Map Measure
 * @classdesc 测量服务
 * @extends {mapboxgl.supermap.ServiceBase}
 * @param {string} url - 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map</br>
 * @param {Object} options - 交互服务时所需可选参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。</br>
 * @param {MeasureMode} options.measureMode - 量算模式，包括距离量算模式和面积量算模式。
 */
export class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measureDistance
     * @description 测距
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类</br>
     * @param {RequestCallback} callback 回调函数
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measureArea
     * @description 测面积
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类</br>
     * @param {RequestCallback} callback 回调函数
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measure
     * @description 测量
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类
     * @param {string} type - 类型
     * @param {RequestCallback} callback - 回调函数
     * @returns {mapboxgl.supermap.MeasureService} 测量服务
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
        if (params && !(params.geometry instanceof Geometry)) {

            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        return params;

    }

}

mapboxgl.supermap.MeasureService = MeasureService;