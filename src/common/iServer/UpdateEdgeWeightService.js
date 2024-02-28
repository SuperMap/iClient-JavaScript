/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { UpdateEdgeWeightParameters } from './UpdateEdgeWeightParameters';

/**
 * @class UpdateEdgeWeightService
 * @deprecatedclass SuperMap.UpdateEdgeWeightService
 * @category  iServer NetworkAnalyst EdgeWeight
 * @classdesc 更新边的边的耗费权重服务
 * @extends {NetworkAnalystServiceBase}
 * @example
 *(start code)
 * var updateEdgeWeightService = new UpdateEdgeWeightService(url);
 * (end)
 * @param {string} url - 服务地址。如：http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class UpdateEdgeWeightService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.UpdateEdgeWeightService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function UpdateEdgeWeightService.prototype.processAsync
     * @description 开始异步执行边的边的耗费权重的更新
     * @param {UpdateEdgeWeightParameters} params - 边的耗费权重更新服务参数类
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     * @example
     * (code)
     *  var updateEdgeWeightParam=new SuperMapUpdateEdgeWeightParameters({
     *          edgeId:"20",
     *          fromNodeId:"26",
     *          toNodeId:"109",
     *          weightField:"time",
     *          edgeWeight:"25"
     *      });
     *  updateEdgeWeightService.processAsync(updateEdgeWeightParam);
     * (end)
     */
    processAsync(params, callback) {
        if (!(params instanceof UpdateEdgeWeightParameters)) {
            return;
        }

        var me = this;
        var paramStr = me.parse(params);
        me.url = Util.urlPathAppend(me.url, paramStr);
        var data = params.edgeWeight ? params.edgeWeight : null;
        return me.request({
            method: "PUT",
            scope: me,
            data: data,
            success: callback,
            failure: callback
        });
    }

    /**
    * @function UpdateEdgeWeightService.prototype.parse
    * @description 将更新服务参数解析为用‘/’做分隔的字符串
    */
    parse(params) {
        if (!params) {
            return;
        }
        var paramStr = "";
        for (var attr in params) {
            if (params[attr] === "" || params[attr] === "edgeWeight") {
                continue;
            }
            switch (attr) {
                case "edgeId":
                    paramStr += "/edgeweight/" + params[attr];
                    break;
                case "fromNodeId":
                    paramStr += "/fromnode/" + params[attr];
                    break;
                case "toNodeId":
                    paramStr += "/tonode/" + params[attr];
                    break;
                case "weightField":
                    paramStr += "/weightfield/" + params[attr];
                    break;
                default :
                    break;
            }
        }
        return paramStr;
    }

}
