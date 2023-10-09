/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { Geometry } from '@supermap/iclient-common/commontypes/Geometry';
import { MeasureService as CommonMeasureService } from '@supermap/iclient-common/iServer/MeasureService';

/**
 * @class MeasureService
 * @category  iServer Map Measure
 * @classdesc 量算服务类。提供方法：面积量算、距离量算等。
 * @version 11.1.0
 * @modulecategory Services
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {MeasureMode} [options.measureMode=MeasureMode.DISTANCE] - 量算模式，包括距离量算模式和面积量算模式。
 * @usage
 */
export class MeasureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function MeasureService.prototype.measureDistance
     * @description 距离量算。
     * @param {MeasureParameters} params - 量算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    measureDistance(params, callback) {
        return this.measure(params, 'DISTANCE', callback);
    }

    /**
     * @function MeasureService.prototype.measureArea
     * @description 面积量算。
     * @param {MeasureParameters} params - 量算参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    measureArea(params, callback) {
        return this.measure(params, 'AREA', callback);
    }

    /**
     * @function MeasureService.prototype.measure
     * @description 量算。
     * @param {MeasureParameters} params - 量算参数类。
     * @param {string} type - 量算类型。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
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
        return measureService.processAsync(me._processParam(params), callback);
    }

    _processParam(params) {
        if (params && !(params.geometry instanceof Geometry)) {

            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        return params;

    }

}
