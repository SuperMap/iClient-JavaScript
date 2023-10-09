/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {SpatialAnalystBase} from './SpatialAnalystBase';
import {TerrainCurvatureCalculationParameters} from './TerrainCurvatureCalculationParameters';

/**
 * @class TerrainCurvatureCalculationService
 * @deprecatedclass SuperMap.TerrainCurvatureCalculationService
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 地形曲率计算服务类。地形曲率是表达地形曲面结构的主要参数之一。
 * DEM 栅格数据每个像元的表面曲率，是通过将目标像元与八个相邻像元拟合为二次曲面，再对此拟合曲面求（0,0）位置处的曲率而得。
 * 支持计算平均曲率数据集、剖面曲率（即沿最大斜率方向的曲率）数据集、平面曲率（即垂直于最大斜率方向的曲率）数据集。
 * 输出的三种曲率数据集都是和原数据集等大且分辨率相同的数据集。
 * @extends {SpatialAnalystBase}
 * @param {Object} options - 参数。
 * @param {string} options.url - 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example 例如：
 * (start code)
 * var myTerrainCurvatureCalculationService = new TerrainCurvatureCalculationService(url);
 * myTerrainCurvatureCalculationService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
 * );
 * (end)
 * @usage
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
     * @function TerrainCurvatureCalculationService.prototype.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param {TerrainCurvatureCalculationParameters} parameter - 地形曲率计算参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    processAsync(parameter, callback) {
        var me = this;
        var parameterObject = {};

        if (parameter instanceof TerrainCurvatureCalculationParameters) {
            me.url = Util.urlPathAppend(me.url, 'datasets/' + parameter.dataset + '/terraincalculation/curvature');
        }

        TerrainCurvatureCalculationParameters.toObject(parameter, parameterObject);
        var jsonParameters = Util.toJSON(parameterObject);
        me.url = Util.urlAppend(me.url, 'returnContent=true');
        return me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: callback,
            failure: callback
        });
    }
}

