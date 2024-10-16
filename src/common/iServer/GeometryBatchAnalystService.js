/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {GeometryBufferAnalystParameters} from './GeometryBufferAnalystParameters';
import {GeometryOverlayAnalystParameters} from './GeometryOverlayAnalystParameters';
import {GeometryThiessenAnalystParameters} from './GeometryThiessenAnalystParameters';
import {InterpolationAnalystParameters} from './InterpolationAnalystParameters';

/**
 * @class GeometryBatchAnalystService
 * @deprecatedclass SuperMap.GeometryBatchAnalystService
 * @category iServer SpatialAnalyst BatchAnalyst
 * @classdesc 批量空间分析服务类
 * @description 该类负责将客户设置的叠加分析参数传递给服务端，并接收服务端返回的叠加分析结果数据。
 *              获取的结果数据包括 originResult 、result 两种，
 *              其中，originResult 为服务端返回的用 JSON 对象表示的量算结果数据，result 为服务端返回的量算结果数据。
 * @extends {SpatialAnalystBase}
 * @param {string} url - 服务地址。如：http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * var myOverlayAnalystService = new GeometryBatchAnalystService(url);
 * @usage
 */
export class GeometryBatchAnalystService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.GeometryBatchAnalystService";
    }

    /**
     * @function GeometryBatchAnalystService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {GeometryOverlayAnalystParameter} parameter - 批量几何对象叠加分析参数类
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameters, callback) {
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'geometry/batchanalyst');
        me.url = Util.urlAppend(me.url, 'returnContent=true&ignoreAnalystParam=true');
        var parameterObjects = me._processParams(parameters);
        var jsonParameters = Util.toJSON(parameterObjects);

        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }

    _processParams(parameters) {
        var me = this;
        if (!Util.isArray(parameters)) {
            return;
        }
        var processParams = [];
        parameters.map(function (item) {
            processParams.push(me._toJSON(item));
            return item;
        });

        return processParams;
    }

    _toJSON(parameter) {
        var tempObj = {};
        if(parameter.analystName ==="buffer"){
            tempObj.analystName = "buffer";
            tempObj.param = {};
            //几何对象的批量空间分析，
            GeometryBufferAnalystParameters.toObject(parameter.param, tempObj.param);

        }else if(parameter.analystName ==="overlay"){
            tempObj.analystName = "overlay";
            tempObj.param = {};
            GeometryOverlayAnalystParameters.toObject(parameter.param, tempObj.param);

        }else if(parameter.analystName ==="interpolationDensity"){
            tempObj.analystName = "interpolationDensity";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        }else if(parameter.analystName ==="interpolationidw"){
            tempObj.analystName = "interpolationidw";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        }else if(parameter.analystName ==="interpolationRBF"){
            tempObj.analystName = "interpolationRBF";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        }else if(parameter.analystName ==="interpolationKriging"){
            tempObj.analystName = "interpolationKriging";
            tempObj.param = {};
            InterpolationAnalystParameters.toObject(parameter.param, tempObj.param);

        }else if(parameter.analystName ==="thiessenpolygon"){
            tempObj.analystName = "thiessenpolygon";
            tempObj.param = {};
            GeometryThiessenAnalystParameters.toObject(parameter.param, tempObj.param);

        }else {
            //isoline; isoregion; calculatemeasure; routelocator 四种分析不需要再处理参数
            return parameter;
        }
        return tempObj;
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }


}
