import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {FacilityAnalystSinks3DParameters} from './FacilityAnalystSinks3DParameters';

/**
 * @class SuperMap.FacilityAnalystSinks3DService
 * @category  iServer FacilityAnalyst3D Sinks
 * @classdesc  最近设施分析服务类(汇查找资源)<br>
 *                最近设施分析是指在网络上给定一个事件点和一组设施点，
 *                查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *                该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 *                最近设施分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.CommonServiceBase
 * @example
 * var myFacilityAnalystSinks3DService = new SuperMap.FacilityAnalystSinks3DService(url, {
 *     eventListeners: {
 *	       "processCompleted": facilityAnalystSinks3DCompleted,
 *		   "processFailed": facilityAnalystSinks3DError
 *		   }
 * });
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *              例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。<br>
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FacilityAnalystSinks3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystSinks3DService";
    }


    /**
     * @function SuperMap.FacilityAnalystSinks3DService.prototype.destroy
     * @override
     */
    destroy() {
        CommonServiceBase.prototype.destroy.apply(this, arguments);
    }


    /**
     * @function SuperMap.FacilityAnalystSinks3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FacilityAnalystSinks3DParameters} 最近设施分析参数类(汇查找资源)
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystSinks3DParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "sinks" : "/sinks") + ".json?";
        jsonObject = {
            edgeID: params.edgeID,
            nodeID: params.nodeID,
            weightName: params.weightName,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.FacilityAnalystSinks3DService = FacilityAnalystSinks3DService;