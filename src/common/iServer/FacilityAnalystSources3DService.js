import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {FacilityAnalystSources3DParameters} from './FacilityAnalystSources3DParameters';

/**
 * @class SuperMap.FacilityAnalystSources3DService
 * @category  iServer FacilityAnalyst3D Sources
 * @classdesc 最近设施分析服务类(源查找资源) <br>
 *               最近设施分析是指在网络上给定一个事件点和一组设施点，
 *               查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 *               该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 *               最近设施分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.CommonServiceBase
 * @param  url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export class FacilityAnalystSources3DService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.FacilityAnalystSources3DService";
    }


    /**
     * @function SuperMap.FacilityAnalystSources3DService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function SuperMap.FacilityAnalystSources3DService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FacilityAnalystSources3DParameters} 最近设施分析参数类(源查找资源)
     */
    processAsync(params) {
        if (!(params instanceof FacilityAnalystSources3DParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "sources" : "/sources") + ".json?";
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

SuperMap.FacilityAnalystSources3DService = FacilityAnalystSources3DService;