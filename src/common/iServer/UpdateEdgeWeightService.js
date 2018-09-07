/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {UpdateEdgeWeightParameters} from './UpdateEdgeWeightParameters';

/**
 * @class SuperMap.UpdateEdgeWeightService
 * @category  iServer NetworkAnalyst EdgeWeight
 * @classdesc 更新边的边的耗费权重服务
 * @extends {SuperMap.NetworkAnalystServiceBase}
 * @example
 *(start code)
 * var updateEdgeWeightService = new SuperMap.UpdateEdgeWeightService(url, {
 *     eventListeners: {
 *         "processCompleted": UpdateEdgeWeightCompleted,      //参数为SuperMap.UpdateEdgeWeightEventArgs
 *		   "processFailed": UpdateEdgeWeightError             //参数为SuperMap.ServiceFailedEventArgs
 *		   }
 * });
 * (end)
 * @param {string} url - 服务的访问地址。如：http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
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
     * @function SuperMap.UpdateEdgeWeightService.prototype.processAsync
     * @description 开始异步执行边的边的耗费权重的更新
     * @param {SuperMap.UpdateEdgeWeightParameters} params - 边的耗费权重更新服务参数类
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
    processAsync(params) {
        if (!(params instanceof UpdateEdgeWeightParameters)) {
            return;
        }

        var me = this, end = me.url.substr(me.url.length - 1, 1);
        var paramStr = me.parse(params);
        if (end === "/") {
            me.url.splice(me.url.length - 1, 1);
        }
        me.url = me.url + paramStr + ".json?";
        var data = params.edgeWeight ? params.edgeWeight : null;
        me.request({
            method: "PUT",
            scope: me,
            data: data,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
    * @function SuperMap.UpdateEdgeWeightService.prototype.parse
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

SuperMap.UpdateEdgeWeightService = UpdateEdgeWeightService;