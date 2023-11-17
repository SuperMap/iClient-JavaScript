/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
// import {Geometry3D} from '../commontypes/Geometry3D';

/**
 * @class TerrainCutFillCalculationParameters
 * @deprecatedclass SuperMap.TerrainCutFillCalculationParameters
 * @category  iServer SpatialAnalyst TerrainCalculation
 * @classdesc 填挖方计算参数类。该类用于设置填挖方计算的数据集、填挖方分析类型以及不同分析类型相对应的参数等，还可对结果数据集进行一系列设置。
 * 支持的填挖方类型：栅格填挖方（GRID）、斜面填挖方（LINE3DANDBUFFERRADIUS）、三维面填挖方（REGION3D）、选面填挖方（REGIONANDALTITUDE）。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 用于做填挖方计算的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
 * @param {string} [options.cutFillType="GRID"] - 填挖方分析的类型，包含：<br>
                                                栅格填挖方（GRID）：根据结果栅格进行填挖方分析； <br>
                                                斜面填挖方（LINE3DANDBUFFERRADIUS）：根据指定的三维线及缓冲半径进行进行填挖方分析；<br>
                                                三维面填挖方计算（REGION3D）；<br>
                                                选面填挖方（REGIONANDALTITUDE）：根据指定的面区域及结果高程值进行填挖方分析。 
* @param {string} [options.afterCutFillDataset] - 填挖方后的栅格数据集，当填挖方分析的类型为 GRID 时有效，此时为必填。
* @param {string} [options.resultDataset] - 填挖方分析的结果数据集。
* @param {boolean} [options.buildPyramid] - 是否对结果栅格数据集创建金字塔。 
* @param {boolean} [options.deleteExistResultDataset] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
* @param {number} [options.bufferRadius] - 填挖方线路的缓冲区半径，当填挖方分析的类型为 LINE3DANDBUFFERRADIUS 时有效。
* @param {boolean} [options.isRoundHead] - 是否使用圆头缓冲为填挖方路线创建缓冲区，默认为 false，当填挖方分析的类型为 LINE3DANDBUFFERRADIUS 时有效。 
* @param {Geometry3D} [options.line3D] - 填挖方路线，当填挖方分析的类型为 LINE3DANDBUFFERRADIUS 时有效。
* @param {Geometry} [options.region] - 填挖方区域，当填挖方分析的类型为 REGIONANDALTITUDE 时有效。
* @param {Geometry3D} [options.region3D] - 三维面对象，当填挖方分析的类型为 REGION3D 时有效。
 * @usage
 */
export class TerrainCutFillCalculationParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} TerrainCutFillCalculationParameters.prototype.dataset
         * @description 用于做填挖方计算的数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
         */
        this.dataset = null;

        /**
         * @member {string} TerrainCutFillCalculationParameters.prototype.cutFillType
         * @description 填挖方分析的类型，包含：<br>
                                        栅格填挖方（GRID）：根据结果栅格进行填挖方分析； <br>
                                        斜面填挖方（LINE3DANDBUFFERRADIUS）：根据指定的三维线及缓冲半径进行进行填挖方分析；<br>
                                        三维面填挖方计算（REGION3D）；<br>
                                        选面填挖方（REGIONANDALTITUDE）：根据指定的面区域及结果高程值进行填挖方分析。 
         */
        // this.cutFillType = cutFillType.GRID;
        this.cutFillType = "GRID";

        /**
         * @member {string} TerrainCutFillCalculationParameters.prototype.afterCutFillDataset
         * @description 填挖方后的栅格数据集，当填挖方分析的类型为 GRID 时有效，此时为必填。
         */
        this.afterCutFillDataset = null;

        /**
         * @member {string} TerrainCutFillCalculationParameters.prototype.resultDataset
         * @description 填挖方分析的结果数据集。
         */
        this.resultDataset = null;

        /**
         * @member {boolean} TerrainCutFillCalculationParameters.prototype.buildPyramid
         * @description 是否对结果栅格数据集创建金字塔。 
         */
        this.buildPyramid = null;

        /**
         * @member {boolean} TerrainCutFillCalculationParameters.prototype.deleteExistResultDataset
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = null;

        /**
         * @member {number} TerrainCutFillCalculationParameters.prototype.bufferRadius
         * @description 填挖方线路的缓冲区半径，当填挖方分析的类型为 LINE3DANDBUFFERRADIUS 时有效。
         */
        this.bufferRadius = null;

        /**
         * @member {boolean} TerrainCutFillCalculationParameters.prototype.isRoundHead
         * @description 是否使用圆头缓冲为填挖方路线创建缓冲区，默认为 false，当填挖方分析的类型为 LINE3DANDBUFFERRADIUS 时有效。 
         */
        this.isRoundHead = null;

        /**
         * @member {Geometry3D} TerrainCutFillCalculationParameters.prototype.line3D
         * @description 填挖方路线，当填挖方分析的类型为 LINE3DANDBUFFERRADIUS 时有效。
         */
        this.line3D = null;

        /**
         * @member {Geometry} TerrainCutFillCalculationParameters.prototype.region
         * @description 填挖方区域，当填挖方分析的类型为 REGIONANDALTITUDE 时有效。
         */
        this.region = null;

        /**
         * @member {Geometry3D} TerrainCutFillCalculationParameters.prototype.region3D
         * @description 三维面对象，当填挖方分析的类型为 REGION3D 时有效。
         */
        this.region3D = null;


        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TerrainCutFillCalculationParameters";
    }


    /**
     * @function TerrainCutFillCalculationParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.cutFillType = null;
        me.afterCutFillDataset = null;
        me.resultDataset = null;
        me.buildPyramid = null;
        me.deleteExistResultDataset = null;
        me.bufferRadius = null;
        me.isRoundHead = null;
        me.line3D = null;
        me.region = null;
        me.region3D = null;
    }

    /**
     * @function TerrainCutFillCalculationParameters.toObject
     * @param {Object} terrainCutFillCalculationParameters - 填挖方计算参数。
     * @param {Object} tempObj - 目标对象。
     * @description 填挖方计算对象。
     */
    static toObject(terrainCutFillCalculationParameters, tempObj) {
        for (var name in terrainCutFillCalculationParameters) {
            if (name !== "dataset") {
                tempObj[name] = terrainCutFillCalculationParameters[name];
            }
        }
    }

}

