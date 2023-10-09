/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class TerrainAspectCalculationParameters
 * @deprecatedclass SuperMap.TerrainAspectCalculationParameters
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 地形坡向计算参数类。此类用于指定地形坡向计算的数据集、地形分析环境等参数，还可以对结果数据集进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 地形坡向计算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
 * @param {terrainAnalystSetting} options.terrainAnalystSetting - 地形分析基本的环境设置。
 * @param {string} [options.resultDatasetName] - 结果数据集名称。
 * @param {boolean} [options.deleteExistResultDataset] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
 * @usage
 */
export class TerrainAspectCalculationParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} TerrainAspectCalculationParameters.prototype.dataset
         * @description 要用来做地形坡向计算数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
         */
        this.dataset = null;

        /**
         * @member {terrainAnalystSetting} TerrainAspectCalculationParameters.prototype.terrainAnalystSetting
         * @description 地形分析基本的环境设置。
         */
        this.terrainAnalystSetting = null;

        /**
         * @member {string} TerrainAspectCalculationParameters.prototype.resultDatasetName
         * @description 结果数据集名称。
         */
        this.resultDatasetName = null;

        /**
         * @member {boolean} TerrainAspectCalculationParameters.prototype.deleteExistResultDataset
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TerrainAspectCalculationParameters";
    }


    /**
     * @function TerrainAspectCalculationParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.terrainAnalystSetting = null;
        me.resultDatasetName = null;
        me.deleteExistResultDataset = null;
    }

    /**
     * @function TerrainAspectCalculationParameters.toObject
     * @param {Object} terrainAspectCalculationParameters - 地形坡向计算参数。
     * @param {Object} tempObj - 目标对象。
     * @description 地形坡向计算对象。
     */
    static toObject(terrainAspectCalculationParameters, tempObj) {
        for (var name in terrainAspectCalculationParameters) {
            if (name !== "dataset") {
                tempObj[name] = terrainAspectCalculationParameters[name];
            }
        }
    }

}

