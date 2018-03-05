import {SuperMap} from '../SuperMap';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';
import {FacilityAnalystStreamParameters} from './FacilityAnalystStreamParameters';

/**
 * @class SuperMap.FacilityAnalystStreamService
 * @category  iServer NetworkAnalyst UpstreamCirticalFaclilities 
 * @classdesc 上游/下游 关键设施查找资源服务类;即查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
 * @extends SuperMap.NetworkAnalystServiceBase
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FacilityAnalystStreamService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystStreamService";
    }


    /**
     * @function SuperMap.FacilityAnalystStreamService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function SuperMap.FacilityAnalystStreamService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FacilityAnalystStreamParameters} 上游/下游关键设施查找资源参数类。
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystStreamParameters)) {
            return;
        }
        var me = this, jsonObject;
        var end = me.url.substr(me.url.length - 1, 1);

        //URL 通过参数类型来判断是 上游 还是下游 查询
        if (params.queryType === 0) {
            me.url = me.url + ((end === "/") ? "upstreamcirticalfaclilities" :
                "/upstreamcirticalfaclilities") + ".json?";
        } else if (params.queryType === 1) {
            me.url = me.url + ((end === "/") ? "downstreamcirticalfaclilities" :
                "/downstreamcirticalfaclilities") + ".json?";
        } else {
            return;
        }

        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };

        if (params.edgeID !== null && params.nodeID !== null) {
            return;
        }
        if (params.edgeID === null && params.nodeID === null) {
            return;
        }
        if (params.edgeID !== null) {
            jsonObject.edgeID = params.edgeID;
        } else {
            jsonObject.nodeID = params.nodeID;
        }

        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.FacilityAnalystStreamService = FacilityAnalystStreamService;