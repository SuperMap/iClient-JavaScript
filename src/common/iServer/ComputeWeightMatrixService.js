import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ComputeWeightMatrixParameters} from './ComputeWeightMatrixParameters';
import {NetworkAnalystServiceBase} from './NetworkAnalystServiceBase';

/**
 * @class SuperMap.ComputeWeightMatrixService
 * @category  iServer NetworkAnalyst WeightMatrix
 * @classdesc 耗费矩阵分析服务类。<br>
 *               耗费矩阵是根据交通网络分析参数中的耗费字段来计算一个二维数组，
 *               用来存储指定的任意两点间的资源消耗。
 *               耗费矩阵分析结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.NetworkAnalystServiceBase
 * @example
 * var mycomputeWeightMatrixService = new SuperMap.ComputeWeightMatrixService(url,{
 *     eventListeners: {
 *	       "processCompleted": computeWeightMatrixCompleted,
 *		   "processFailed": computeWeightMatrixnError
 *		   }
 * });
 * @param url - {string} 耗费矩阵分析服务地址。请求服务的URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 */
export class ComputeWeightMatrixService extends NetworkAnalystServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.ComputeWeightMatrixService";
    }


    /**
     * @function SuperMap.ComputeWeightMatrixService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function SuperMap.ComputeWeightMatrixService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.ComputeWeightMatrixParameters} 耗费矩阵分析参数类
     */
    processAsync(params) {
        if (!(params instanceof ComputeWeightMatrixParameters)) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "weightmatrix" : "/weightmatrix") + ".json?";
        jsonObject = {
            parameter: Util.toJSON(params.parameter),
            nodes: me.getJson(params.isAnalyzeById, params.nodes)
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function SuperMap.ComputeWeightMatrixService.prototype.getJson
     * @description 将对象转化为JSON字符串。
     * @param isAnalyzeById - {boolean} 是否通过id分析
     * @param params - {Array} 分析参数数组
     * @return- {string} 转化后的JSON字符串。
     */
    getJson(isAnalyzeById, params) {
        var jsonString = "[",
            len = params ? params.length : 0;

        if (isAnalyzeById === false) {
            for (let i = 0; i < len; i++) {
                if (i > 0) {
                    jsonString += ",";
                }
                jsonString += '{"x":' + params[i].x + ',"y":' + params[i].y + '}';
            }
        } else if (isAnalyzeById == true) {
            for (let i = 0; i < len; i++) {
                if (i > 0) {
                    jsonString += ",";
                }
                jsonString += params[i];
            }
        }
        jsonString += ']';
        return jsonString;
    }
}

SuperMap.ComputeWeightMatrixService = ComputeWeightMatrixService;