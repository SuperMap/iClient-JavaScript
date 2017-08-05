import SuperMap from '../SuperMap';
import ComputeWeightMatrixParameters from './ComputeWeightMatrixParameters';
import NetworkAnalystServiceBase from './NetworkAnalystServiceBase';

/**
 * @class SuperMap.ComputeWeightMatrixService
 * @description 耗费矩阵分析服务类。<br>
 *               耗费矩阵是根据交通网络分析参数中的耗费字段来计算一个二维数组，
 *               用来存储指定的任意两点间的资源消耗。
 *               耗费矩阵分析结果通过该类支持的事件的监听函数参数获取
 * @augments SuperMap.NetworkAnalystServiceBase
 * @example
 * (start code)
 * var mycomputeWeightMatrixService = new SuperMap.ComputeWeightMatrixService(url,{
 *     eventListeners: {
 *	       "processCompleted": computeWeightMatrixCompleted,
 *		   "processFailed": computeWeightMatrixnError
 *		   }
 * });
 * (end)
 * @param url - {String} 耗费矩阵分析服务地址。请求服务的URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
export default class ComputeWeightMatrixService extends NetworkAnalystServiceBase {

    /**
     * @function SuperMap.ComputeWeightMatrixService.prototype.initialize
     * @description 耗费矩阵分析服务类构造函数。
     * @param url - {String} 耗费矩阵分析服务地址。请求服务的URL应为：<br>
     *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
     *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);
    }


    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
    }


    /**
     * @function SuperMap.ComputeWeightMatrixService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {ComputeWeightMatrixParameters} 耗费矩阵分析参数类
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "weightmatrix" : "/weightmatrix") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            parameter: SuperMap.Util.toJSON(params.parameter),
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

    /*
     * Method: getJson
     * 将对象转化为JSON字符串。
     *
     * Parameters:
     * isAnalyzeById - {Boolean}
     * params - {Array}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJson(isAnalyzeById, params) {
        var jsonString = "[",
            len = params ? params.length : 0;

        if (isAnalyzeById === false) {
            for (var i = 0; i < len; i++) {
                if (i > 0) jsonString += ",";
                jsonString += '{"x":' + params[i].x + ',"y":' + params[i].y + '}';
            }
        } else if (isAnalyzeById == true) {
            for (var i = 0; i < len; i++) {
                if (i > 0) jsonString += ",";
                jsonString += params[i];
            }
        }
        jsonString += ']';
        return jsonString;
    }

    CLASS_NAME = "SuperMap.ComputeWeightMatrixService"
}
SuperMap.ComputeWeightMatrixService = ComputeWeightMatrixService;