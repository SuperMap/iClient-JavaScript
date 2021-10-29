/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {Util} from '../commontypes/Util';
import {DatasetSurfaceAnalystParameters} from './DatasetSurfaceAnalystParameters';
import {GeometrySurfaceAnalystParameters} from './GeometrySurfaceAnalystParameters';
import {SurfaceAnalystParameters} from './SurfaceAnalystParameters';


/**
 * @class SurfaceAnalystService
 * @deprecatedclass SuperMap.SurfaceAnalystService
 * @category  iServer SpatialAnalyst SurfaceAnalyst
 * @classdesc 表面分析服务类。
 * 该类负责将客户设置的表面分析服务参数传递给服务端，并接收服务端返回的表面分析服务分析结果数据。
 * 表面分析结果通过该类支持的事件的监听函数参数获取
 * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var mySurfaceAnalystService = new SurfaceAnalystService(url, {
     *      eventListeners: {
     *	       "processCompleted": surfaceAnalysCompleted,
     *		   "processFailed": surfaceAnalysFailed
     *		   }
     * });
 * (end)
 * @usage
 */
export class SurfaceAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.SurfaceAnalystService";
    }

    /**
     * @function SurfaceAnalystService.prototype.destroy
     * @description 释放资源,将引用的资源属性置空。
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SurfaceAnalystService.prototype.processAsync
     * @description 负责将客户端的表面分析服务参数传递到服务端。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     */
    processAsync(params) {
        if (!(params instanceof SurfaceAnalystParameters)) {
            return;
        }
        var me = this, jsonParameters;
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SurfaceAnalystService.prototype.getJsonParameters
     * @description 将参数转化为 JSON 字符串。
     * @param {SurfaceAnalystParameters} params - 表面分析提取操作参数类。
     * @returns {Object} 转化后的JSON字符串。
     */
    getJsonParameters(params) {
        var jsonParameters = '';
        var parameterObject = {};
        var me = this;
        if (params instanceof DatasetSurfaceAnalystParameters) {
            me.url = Util.urlPathAppend(
                me.url,
                'datasets/' + params.dataset + '/' + params.surfaceAnalystMethod.toLowerCase()
            );
            DatasetSurfaceAnalystParameters.toObject(params, parameterObject);
            jsonParameters = Util.toJSON(parameterObject);
        } else if (params instanceof GeometrySurfaceAnalystParameters) {
            me.url = Util.urlPathAppend(me.url, 'geometry/' + params.surfaceAnalystMethod.toLowerCase());
            jsonParameters = Util.toJSON(params);
        } else {
            return;
        }
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        return jsonParameters;
    }
}
