import {SuperMap} from '../SuperMap';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {TerrainCurvatureCalculationParameters} from './TerrainCurvatureCalculationParameters';

/**
 * @class SuperMap.TerrainCurvatureCalculationService
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 地形曲率计算服务类。
 * @extends SuperMap.SpatialAnalystBase
 * @param options - {Object} 可选参数。如</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 * @param url - {string} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @example 例如：
 * (start code)
 * var myTerrainCurvatureCalculationService = new SuperMap.TerrainCurvatureCalculationService(url);
 * myTerrainCurvatureCalculationService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
 * );
 * (end)
 *
 */
export class TerrainCurvatureCalculationService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.TerrainCurvatureCalculationService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.TerrainCurvatureCalculationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param parameter - {SuperMap.TerrainCurvatureCalculationParameters}
     */
    processAsync(parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end !== '/') {
            me.url += "/";
        }

        var parameterObject = {};

        if (parameter instanceof TerrainCurvatureCalculationParameters) {
            me.url += 'datasets/' + parameter.dataset + '/terraincalculation/curvature';
        }

        TerrainCurvatureCalculationParameters.toObject(parameter, parameterObject);
        var jsonParameters = SuperMap.Util.toJSON(parameterObject);
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

SuperMap.TerrainCurvatureCalculationService = TerrainCurvatureCalculationService;
