/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {DatasetThiessenAnalystParameters} from './DatasetThiessenAnalystParameters';
import {GeometryThiessenAnalystParameters} from './GeometryThiessenAnalystParameters';

/**
 * @class SuperMap.ThiessenAnalystService
 * @category  iServer SpatialAnalyst ThiessenPolygonAnalyst
 * @classdesc
 * 泰森多边形分析服务类
 * 该类负责将客户设置的泰森多边形分析参数传递给服务端，并接收服务端返回的分析结果数据。
 * 泰森多边形分析结果通过该类支持的事件的监听函数参数获取
 * 泰森多边形分析的参数支持两种，当参数为 {SuperMap.DatasetThiessenAnalystParameters} 类型
 * 时，执行数据集泰森多边形分析，当参数为 {SuperMap.GeometryThiessenAnalystParameters} 类型时，
 * 执行几何对象泰森多边形分析。
 * @param url - {string} 服务的访问地址。
 * 如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SuperMap.SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myThiessenAnalystService = new SuperMap.ThiessenAnalystService(url, {
     *     eventListeners: {
     *           "processCompleted": bufferCompleted,
     *           "processFailed": bufferFailed
     *           }
     *    });
 * (end)
 *
 */
export class ThiessenAnalystService extends SpatialAnalystBase {


    constructor(url, options) {
        super(url, options);
        /**
         * @member {string} SuperMap.ThiessenAnalystService.prototype.mode
         * @description 缓冲区分析类型
         */
        this.mode = null;
        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThiessenAnalystService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
        this.mode = null;
    }

    /**
     * @function SuperMap.ThiessenAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {(SuperMap.DatasetThiessenAnalystParameters|GeometryThiessenAnalystParameters)} parameter - 泰森多边形分析参数基类。
     */
    processAsync(parameter) {
        var parameterObject = {};
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }

        if (parameter instanceof DatasetThiessenAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.dataset + '/thiessenpolygon';
            DatasetThiessenAnalystParameters.toObject(parameter, parameterObject);
        } else if (parameter instanceof GeometryThiessenAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/thiessenpolygon';
            GeometryThiessenAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = Util.toJSON(parameterObject);
        me.url += '.json?returnContent=true';
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

SuperMap.ThiessenAnalystService = ThiessenAnalystService;