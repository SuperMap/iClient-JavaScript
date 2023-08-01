/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {TerrainSlopeCalculationParameters} from './TerrainSlopeCalculationParameters';

/**
 * @class TerrainSlopeCalculationService
 * @deprecatedclass SuperMap.TerrainSlopeCalculationService
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 填挖方计算服务类。
 * @extends {SpatialAnalystBase}
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {string} options.url - 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example 例如：
 * (start code)
 * var myTerrainCutFillCalculationService = new TerrainSlopeCalculationService(url);
 * myTerrainCutFillCalculationService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
 * );
 * (end)
 * @usage
 */
export class TerrainSlopeCalculationService extends SpatialAnalystBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.TerrainSlopeCalculationService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function TerrainSlopeCalculationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {TerrainSlopeCalculationParameters} parameter - 地形坡度计算参数类。
     */
    processAsync(parameter) {
        var me = this;
        var parameterObject = {};

        if (parameter instanceof TerrainSlopeCalculationParameters) {
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/terraincalculation/slope');
        }

        TerrainSlopeCalculationParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

