import SuperMap from '../SuperMap';
import SpatialAnalystBase from './SpatialAnalystBase';
import MathExpressionAnalysisParameters from './MathExpressionAnalysisParameters';

/**
 * @class SuperMap.MathExpressionAnalysisService
 * @constructs SuperMap.MathExpressionAnalysisService
 * @classdesc
 * 栅格代数运算服务类。
 * @extends {SuperMap.SpatialAnalystBase}
 * @api
 * @example 例如：
 * (start code)
 * var myMathExpressionAnalysisService = new SuperMap.MathExpressionAnalysisService(url);
 * myMathExpressionAnalysisService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
 * );
 * (end)
 *
 */
export default  class MathExpressionAnalysisService extends SpatialAnalystBase {

    /**
     * @method SuperMap.MathExpressionAnalysisService.initialize
     * @param options - {Object} 参数。
     * @param url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    constructor(url, options) {
        super(url, options);
    }

    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
    }

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     * @method SuperMap.MathExpressionAnalysisService.processAsync
     * @param  parameter - {SuperMap.MathExpressionAnalysisParameters}
     */
    processAsync(parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        var parameterObject = {};

        if (parameter instanceof MathExpressionAnalysisParameters) {
            me.url += 'datasets/' + parameter.dataset + '/mathanalyst';
        }

        MathExpressionAnalysisParameters.toObject(parameter, parameterObject);
        var jsonParameters = SuperMap.Util.toJSON(parameterObject);

        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }


    CLASS_NAME = "SuperMap.MathExpressionAnalysisService"
}

SuperMap.MathExpressionAnalysisService = MathExpressionAnalysisService;