import {SuperMap} from '../SuperMap';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {UpdateEdgeWeightParameters} from './UpdateEdgeWeightParameters';

/**
 * @class SuperMap.UpdateEdgeWeightService
 * @category  iServer NetworkAnalyst EdgeWeight
 * @classdesc 更新边的边的耗费权重服务
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 *(start code)
 * var updateEdgeWeightService = new SuperMap.UpdateEdgeWeightService(url, {
 *     eventListeners: {
 *         "processCompleted": UpdateEdgeWeightCompleted,      //参数为SuperMap.UpdateEdgeWeightEventArgs
 *		   "processFailed": UpdateEdgeWeightError             //参数为SuperMap.ServiceFailedEventArgs
 *		   }
 * });
 * (end)
 * @param url - {string} 服务的访问地址。 如:<br>
 *                       http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
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
     * @param params - {SuperMap.UpdateEdgeWeightParameters} 边的耗费权重更新服务参数类
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

    /*
     * Method: parse
     * 将更新服务参数解析为用‘/’做分隔的字符串
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