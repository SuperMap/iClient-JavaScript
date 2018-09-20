/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {Geometry, MeasureService as CommonMeasureService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.MeasureService
 * @category  iServer Map Measure
 * @classdesc 测量服务。
 * @extends {mapboxgl.supermap.ServiceBase}
 * @param {string} url - 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map。
 * @param {Object} options - 交互服务时所需可选参数。 
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {SuperMap.MeasureMode} [options.measureMode=SuperMap.MeasureMode.DISTANCE] - 量算模式，包括距离量算模式和面积量算模式。
 */
export class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measureDistance
     * @description 距离测量。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measureArea
     * @description 面积测量。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    /**
     * @function mapboxgl.supermap.MeasureService.prototype.measure
     * @description 测量。
     * @param {SuperMap.MeasureParameters} params - 测量相关参数类。
     * @param {string} type - 测量类型。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {mapboxgl.supermap.MeasureService} 测量服务。
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