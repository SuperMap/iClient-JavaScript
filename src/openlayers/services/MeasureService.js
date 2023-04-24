/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { MeasureService as CommonMeasureService } from '@supermap/iclient-common/iServer/MeasureService';
import GeoJSON from 'ol/format/GeoJSON';

/**
 * @class MeasureService
 * @category  iServer Map Measure
 * @classdesc 量算服务。
 * @extends {ServiceBase}
 * @param {string} url -  服务地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {Object} options -  参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function MeasureService.prototype.measureDistance
     * @description 测距。
     * @param {MeasureParameters} params - 量算参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measureDistance(params, callback) {
        this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function MeasureService.prototype.measureArea
     * @description 测面积。
     * @param {MeasureParameters} params - 量算参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    measureArea(params, callback) {
        this.measure(params, 'AREA', callback);
    }

    /**
     * @function MeasureService.prototype.measure
     * @description 测量。
     * @param {MeasureParameters} params - 量算参数类。
     * @param {string} type - 类型。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {MeasureService} 量算服务。
     */
    measure(params, type, callback) {
        var me = this;
        var measureService = new CommonMeasureService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            measureMode: type
        });
        measureService.processAsync(me._processParam(params), callback);
    }

    _processParam(params) {
        if (params && params.geometry) {
            params.geometry = Util.toSuperMapGeometry(JSON.parse((new GeoJSON()).writeGeometry(params.geometry)));
        }
        return params;
    }
}
