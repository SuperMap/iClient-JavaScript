/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class MathExpressionAnalysisParameters
 * @deprecatedclass SuperMap.MathExpressionAnalysisParameters
 * @category iServer SpatialAnalyst GridMathAnalyst
 * @classdesc 栅格代数运算参数类。
 * @param {Object} options - 参数。
 * @param {string} options.dataset - 指定栅格代数运算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：BaseMap_P@Jingjin。
 * @param {string} options.resultGridName - 指定结果数据集名称。
 * @param {string} options.expression - 指定的栅格运算表达式。如：[DatasourceAlias1.Raster1]*2-10。
 * @param {string} options.targetDatasource - 指定存储结果数据集的数据源。
 * @param {GeometryPolygon|L.Polygon|ol.geom.Polygon} [options.extractRegion] - 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。
 *                                                                                        如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。
 * @param {boolean} [options.isZip=false] - 是否对结果数据集进行压缩处理。
 * @param {boolean} [options.ignoreNoValue=false] - 是否忽略无值栅格数据。true 表示忽略无值数据，即无值栅格不参与运算。
 * @param {boolean} [options.deleteExistResultDataset=false] - 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
 * @usage
 */
export class MathExpressionAnalysisParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} MathExpressionAnalysisParameters.prototype.dataset
         * @description 要用来做栅格代数运算数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。
         *
         */
        this.dataset = null;

        /**
         * @member {GeometryPolygon|L.Polygon|ol.geom.Polygon} [MathExpressionAnalysisParameters.prototype.extractRegion]
         * @description 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。
         * 如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。
         */
        this.extractRegion = null;

        /**
         * @member {string} MathExpressionAnalysisParameters.prototype.expression
         * @description 指定的栅格运算表达式。如："[DatasourceAlias1.Raster1]*2-10"。
         */
        this.expression = null;

        /**
         * @member {boolean} [MathExpressionAnalysisParameters.prototype.isZip=false]
         * @description 是否对结果数据集进行压缩处理。
         */
        this.isZip = false;

        /**
         * @member {boolean} [MathExpressionAnalysisParameters.prototype.ignoreNoValue=false]
         * @description 是否忽略无值栅格数据。
         */
        this.ignoreNoValue = false;

        /**
         * @member {string} MathExpressionAnalysisParameters.prototype.targetDatasource
         * @description 指定存储结果数据集的数据源。
         */
        this.targetDatasource = null;

        /**
         * @member {string} MathExpressionAnalysisParameters.prototype.resultGridName
         * @description 指定结果数据集名称。
         */
        this.resultGridName = null;

        /**
         * @member {boolean} [MathExpressionAnalysisParameters.prototype.deleteExistResultDataset=false]
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
         */
        this.deleteExistResultDataset = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.MathExpressionAnalysisParameters"
    }


    /**
     * @function MathExpressionAnalysisParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.dataset = null;
        me.bounds = null;
        me.expression = null;
        me.isZip = true;
        me.ignoreNoValue = true;
        me.targetDatasource = null;
        me.resultGridName = null;
        me.deleteExistResultDataset = null;
    }

    /**
     * @function MathExpressionAnalysisParameters.toObject
     * @param {Object} mathExpressionAnalysisParameters - 栅格代数运算参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成栅格代数运算对象。
     */
    static toObject(mathExpressionAnalysisParameters, tempObj) {
        for (var name in mathExpressionAnalysisParameters) {
            if (name !== "dataset") {
                tempObj[name] = mathExpressionAnalysisParameters[name];
            }

            if (name === "extractRegion") {
                if (mathExpressionAnalysisParameters[name]) {
                    var bs = mathExpressionAnalysisParameters[name].components[0].components;
                    var region = {},
                        points = [],
                        type = "REGION";

                    var len = bs.length;
                    for (var i = 0; i < len - 1; i++) {
                        var poi = {};
                        poi["x"] = bs[i].x;
                        poi["y"] = bs[i].y;
                        points.push(poi);
                    }


                    region["points"] = points;
                    region["type"] = type;

                    tempObj[name] = region;
                }
            }
        }
    }
}
