/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class TerrainSlopeCalculationParameters
 * @deprecatedclass SuperMap.TerrainSlopeCalculationParameters
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 地形坡度计算参数类。该类用于设置地形坡向计算的数据集、地形分析基本环境设置、高程缩放系数等参数，还可对结果数据集进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 地形坡度计算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
 * @param {terrainAnalystSetting} options.terrainAnalystSetting - 地形分析基本的环境设置。
 * @param {string} [options.resultDatasetName] - 结果数据集名称。
 * @param {boolean} [options.deleteExistResultDataset] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
 * @param {number} [options.zFactor] - 高程缩放系数。
 * @param {string} options.slopeType - 结果坡度的单位类型，包括： 
                                            DEGREE：以角度为单位表示坡度；
                                            PERCENT：以百分数来表示坡度；
                                            RADIAN：以弧度为单位表示坡度。
 * @usage
 */
export class TerrainSlopeCalculationParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} TerrainSlopeCalculationParameters.prototype.dataset
         * @description 要用来做地形坡度计算数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
         */
        this.dataset = null;

        /**
         * @member {terrainAnalystSetting} TerrainSlopeCalculationParameters.prototype.terrainAnalystSetting
         * @description 地形分析基本的环境设置。
         */
        this.terrainAnalystSetting = null;

        /**
         * @member {string} TerrainSlopeCalculationParameters.prototype.resultDatasetName
         * @description 结果数据集名称。
         */
        this.resultDatasetName = null;

        /**
         * @member {boolean} TerrainSlopeCalculationParameters.prototype.deleteExistResultDataset
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = null;

        /**
         * @member {number} TerrainSlopeCalculationParameters.prototype.zFactor
         * @description 高程缩放系数。
         */
        this.zFactor = null;

        /**
         * @member {string} TerrainSlopeCalculationParameters.prototype.slopeType
         * @description 结果坡度的单位类型，包括： 
                            DEGREE：以角度为单位表示坡度；
                            PERCENT：以百分数来表示坡度；
                            RADIAN：以弧度为单位表示坡度。
         */
        this.slopeType = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TerrainSlopeCalculationParameters";
    }


    /**
     * @function TerrainSlopeCalculationParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.terrainAnalystSetting = null;
        me.resultDatasetName = null;
        me.deleteExistResultDataset = null;
        me.zFactor = null;
        me.slopeType = null;
    }

    /**
     * @function TerrainSlopeCalculationParameters.toObject
     * @param {Object} terrainSlopeCalculationParameters - 地形坡度计算参数。
     * @param {Object} tempObj - 目标对象。
     * @description 地形坡度计算对象。
     */
    static toObject(terrainSlopeCalculationParameters, tempObj) {
        for (var name in terrainSlopeCalculationParameters) {
            if (name !== "dataset") {
                tempObj[name] = terrainSlopeCalculationParameters[name];
            }
        }
    }

}

