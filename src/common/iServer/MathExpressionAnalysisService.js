import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {MathExpressionAnalysisParameters} from './MathExpressionAnalysisParameters';

/**
 * @class SuperMap.MathExpressionAnalysisService
 * @category  iServer SpatialAnalyst GridMathAnalyst
 * @classdesc 栅格代数运算服务类。
 * @param options - {Object} 可选参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst
 * @extends SuperMap.SpatialAnalystBase
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
export class MathExpressionAnalysisService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);

        this.CLASS_NAME = "SuperMap.MathExpressionAnalysisService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.MathExpressionAnalysisService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param  parameter - {SuperMap.MathExpressionAnalysisParameters}
     */
    processAsync(parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }

        var parameterObject = {};

        if (parameter instanceof MathExpressionAnalysisParameters) {
            me.url += 'datasets/' + parameter.dataset + '/mathanalyst';
        }

        MathExpressionAnalysisParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url += '.json?returnContent=true';
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.MathExpressionAnalysisService = MathExpressionAnalysisService;