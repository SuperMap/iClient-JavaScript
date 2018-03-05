import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.MathExpressionAnalysisParameters
 * @category  iServer SpatialAnalyst GridMathAnalyst
 * @classdesc 栅格代数运算参数类
 * @param options - {Object} 可选参数。如：</br>
 *        dataset - {string} 要用来做栅格代数运算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：BaseMap_P@Jingjin。必设字段。</br>
 *        extractRegion - {Object} 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。</br>
 *                     面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|ol.geom.Polygon。</br>
 *                     如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。</br>
 *        expression - {string} 指定的栅格运算表达式。如：[DatasourceAlias1.Raster1]*2-10；必设字段。</br>
 *        isZip - {boolean} 是否对结果数据集进行压缩处理。默认为 false，表示不压缩。</br>
 *        ignoreNoValue - {boolean} 是否忽略无值栅格数据。true表示忽略无值数据，即无值栅格不参与运算。默认为 false。</br>
 *        targetDatasource - {string} 指定存储结果数据集的数据源，必设字段。</br>
 *        resultGridName - {number}指定结果数据集名称，必设字段。</br>
 *        deleteExistResultDataset - {boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。</br>
 */
export class MathExpressionAnalysisParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.dataset -{string}
         * @description 要用来做栅格代数运算数据源中数据集的名称。
         * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。必设字段。
         *
         */
        this.dataset = null;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.extractRegion
         * @description 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。</br>
         * > 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|ol.geom.Polygon。</br>
         * > 如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。
         */
        this.extractRegion = null;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.expression -{string}
         * @description 指定的栅格运算表达式。如："[DatasourceAlias1.Raster1]*2-10"；必设字段。
         */
        this.expression = null;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.isZip -{boolean}
         * @description 是否对结果数据集进行压缩处理。默认为false，表示不压缩。
         */
        this.isZip = false;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.ignoreNoValue -{boolean}
         * @description 是否忽略无值栅格数据，默认为false。
         */
        this.ignoreNoValue = false;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.targetDatasource -{string}
         * @description 指定存储结果数据集的数据源，必设字段。
         */
        this.targetDatasource = null;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.resultGridName -{string}
         * @description 指定结果数据集名称，必设字段。
         */
        this.resultGridName = null;

        /**
         * @member SuperMap.MathExpressionAnalysisParameters.prototype.deleteExistResultDataset -{boolean}
         * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
         */
        this.deleteExistResultDataset = false;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.MathExpressionAnalysisParameters"
    }


    /**
     * @function SuperMap.MathExpressionAnalysisParameters.prototype.destroy
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
     * @function SuperMap.MathExpressionAnalysisParameters.toObject
     * @param mathExpressionAnalysisParameters -{Object} 栅格代数运算参数
     * @param tempObj - {Object} 目标对象
     * @description 生成栅格代数运算对象
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

SuperMap.MathExpressionAnalysisParameters = MathExpressionAnalysisParameters;