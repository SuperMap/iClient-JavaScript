import {SuperMap} from '../SuperMap';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {UpdateTurnNodeWeightParameters} from './UpdateTurnNodeWeightParameters';

/**
 * @class SuperMap.UpdateTurnNodeWeightService
 * @category  iServer NetworkAnalyst TurnNodeWeight
 * @classdesc 转向耗费权重更新服务类
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * var UpdateTurnNodeWeightService = new SuperMap.UpdateTurnNodeWeightService(url, {
 *     eventListeners: {
 *         "processCompleted": UpdateTurnNodeWeightCompleted,    //参数为SuperMap.UpdateTurnNodeWeightEventArgs
 *		   "processFailed": UpdateTurnNodeWeightError          //参数为SuperMap.ServiceFailedEventArgs
 *		   }
 * });
 * @param url - {string} 服务的访问地址。如:<br>
 *                       http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class UpdateTurnNodeWeightService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.UpdateTurnNodeWeightService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.UpdateTurnNodeWeightService.prototype.processAsync
     * @description 开始异步执行转向耗费权重的更新
     * @param params - {SuperMap.UpdateTurnNodeWeightParameters} 转向耗费权重更新服务参数类
     * @example
     * (code)
     *  var updateTurnNodeWeightParam=new SuperMap.UpdateTurnNodeWeightParameters({
     *           nodeId:"106",
     *           fromEdgeId:"6508",
     *           toEdgeId:"6504",
     *           weightField:"TurnCost",
     *           turnNodeWeight:"50"
     *       });
     *  updateTurnNodeWeightService.processAsync(updateTurnNodeWeightParam);
     * (end)
     **/
    processAsync(params) {
        if (!(params instanceof UpdateTurnNodeWeightParameters)) {
            return;
        }

        var me = this, end = me.url.substr(me.url.length - 1, 1);
        var paramStr = me.parse(params);
        if (end === "/") {
            me.url.splice(me.url.length - 1, 1);
        }
        me.url = me.url + paramStr + ".json?";
        var data = params.turnNodeWeight ? params.turnNodeWeight : null;
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
     * */
    parse(params) {
        if (!params) {
            return;
        }
        var paramStr = "";
        for (var attr in params) {
            if (params[attr] === "" || params[attr] === "turnNodeWeight") {
                continue;
            }
            switch (attr) {
                case "nodeId":
                    paramStr += "/turnnodeweight/" + params[attr];
                    break;
                case "fromEdgeId":
                    paramStr += "/fromedge/" + params[attr];
                    break;
                case "toEdgeId":
                    paramStr += "/toedge/" + params[attr];
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

SuperMap.UpdateTurnNodeWeightService = UpdateTurnNodeWeightService;