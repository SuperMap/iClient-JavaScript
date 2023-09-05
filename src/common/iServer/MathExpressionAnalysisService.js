/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {MathExpressionAnalysisParameters} from './MathExpressionAnalysisParameters';

/**
 * @class MathExpressionAnalysisService
 * @deprecatedclass SuperMap.MathExpressionAnalysisService
 * @category  iServer SpatialAnalyst GridMathAnalyst
 * @classdesc 栅格代数运算服务类。
 * @param {string} url - 服务地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SpatialAnalystBase}
 * @example 例如：
 * (start code)
 * var myMathExpressionAnalysisService = new MathExpressionAnalysisService(url);
 * (end)
 * @usage
 */
export class MathExpressionAnalysisService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.MathExpressionAnalysisService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function MathExpressionAnalysisService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {MathExpressionAnalysisParameters} parameter - 栅格代数运算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameter, callback) {
        var me = this;
        var parameterObject = {};

        if (parameter instanceof MathExpressionAnalysisParameters) {
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/mathanalyst');
        }

        MathExpressionAnalysisParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }

}
