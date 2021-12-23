/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { NetworkAnalystServiceBase } from './NetworkAnalystServiceBase';
import { UpdateTurnNodeWeightParameters } from './UpdateTurnNodeWeightParameters';

/**
 * @class SuperMap.UpdateTurnNodeWeightService
 * @category  iServer NetworkAnalyst TurnNodeWeight
 * @classdesc 转向耗费权重更新服务类
 * @extends {SuperMap.NetworkAnalystServiceBase}
 * @example
 * var UpdateTurnNodeWeightService = new SuperMap.UpdateTurnNodeWeightService(url, {
 *     eventListeners: {
 *         "processCompleted": UpdateTurnNodeWeightCompleted,    //参数为SuperMap.UpdateTurnNodeWeightEventArgs
 *		   "processFailed": UpdateTurnNodeWeightError          //参数为SuperMap.ServiceFailedEventArgs
 *		   }
 * });
 * @param {string} url - 服务的访问地址。如:
 *                       http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
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
     * @param {SuperMap.UpdateTurnNodeWeightParameters} params - 转向耗费权重更新服务参数类
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
        var me = this;
        var paramStr = me.parse(params);
        me.url = Util.urlPathAppend(me.url, paramStr);
        var data = params.turnNodeWeight ? params.turnNodeWeight : null;
        me.request({
            method: "PUT",
            scope: me,
            data: data,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.UpdateTurnNodeWeightService.prototype.parse
     * @description 将更新服务参数解析为用‘/’做分隔的字符串
     */
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