/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.TerrainCurvatureCalculationParameters
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 地形曲率计算参数类。
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 要用来做地形曲率计算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
 * @param {string} options.averageCurvatureName - 结果数据集：平均曲率数据集的名称。
 * @param {string} options.profileCurvatureName - 结果数据集：剖面曲率数据集的名称。
 * @param {string} options.planCurvatureName - 结果数据集：平面曲率数据集的名称。
 * @param {number} [options.zFactor=1.0] - 指定的高程缩放系数。1.0 表示不缩放。
 * @param {boolean} [options.deleteExistResultDataset=false] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
 */
export class TerrainCurvatureCalculationParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.TerrainCurvatureCalculationParameters.prototype.dataset
         * @description 要用来做地形曲率计算数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
         * 注：地形曲率计算必须为栅格数据集。
         */
        this.dataset = null;

        /**
         * @member {number} [SuperMap.TerrainCurvatureCalculationParameters.prototype.zFactor=1.0]
         * @description 指定的高程缩放系数。1.0 表示不缩放。
         * 该值是指在 DEM 栅格数据中，栅格值（ Z 坐标，即高程值）相对于 X 和 Y 坐标的单位变换系数。
         * 通常有 X，Y，Z 都参加的计算中，需要将高程值乘以一个高程缩放系数，使得三者单位一致。
         * 例如，X、Y 方向上的单位是米，而 Z 方向的单位是英尺，由于 1 英尺等于 0.3048 米，则需要指定缩放系数为 0.3048。
         */
        this.zFactor = 1.0;

        /**
         * @member {string} SuperMap.TerrainCurvatureCalculationParameters.prototype.averageCurvatureName
         * @description 结果数据集：平均曲率数据集的名称。
         */
        this.averageCurvatureName = null;

        /**
         * @member {string} SuperMap.TerrainCurvatureCalculationParameters.prototype.profileCurvatureName
         * @description 结果数据集：剖面曲率数据集的名称。
         */
        this.profileCurvatureName = "";

        /**
         * @member {string} SuperMap.TerrainCurvatureCalculationParameters.prototype.planCurvatureName
         * @description 结果数据集：平面曲率数据集的名称。
         */
        this.planCurvatureName = "";

        /**
         * @member {boolean} [SuperMap.TerrainCurvatureCalculationParameters.prototype.deleteExistResultDataset=false]
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TerrainCurvatureCalculationParameters";
    }


    /**
     * @function SuperMap.TerrainCurvatureCalculationParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataset = null;
        me.zFactor = 1.0;
        me.averageCurvatureName = null;
        me.profileCurvatureName = null;
        me.planCurvatureName = null;
        me.deleteExistResultDataset = true;
    }

    /**
     * @function SuperMap.TerrainCurvatureCalculationParameters.toObject
     * @param {Object} derrainCurvatureCalculationParameters - 地形曲率计算参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成地形曲率计算对象。
     */
    static toObject(derrainCurvatureCalculationParameters, tempObj) {
        for (var name in derrainCurvatureCalculationParameters) {
            if (name !== "dataset") {
                tempObj[name] = derrainCurvatureCalculationParameters[name];
            }
        }
    }

}

SuperMap.TerrainCurvatureCalculationParameters = TerrainCurvatureCalculationParameters;
