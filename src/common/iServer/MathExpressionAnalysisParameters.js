import SuperMap from '../SuperMap';

/**
 * @class SuperMap.MathExpressionAnalysisParameters
 * @classdesc 栅格代数运算参数类
 * @param options - {Object} 可选参数。如：</br>
 *        dataset - {String} 要用来做栅格代数运算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：BaseMap_P@Jingjin。必设字段。</br>
 *        extractRegion - {SuperMap.Geometry.Ploygon} 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。</br>
 *        如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。</br>
 *        expression - {String} 指定的栅格运算表达式。如：[DatasourceAlias1.Raster1]*2-10；必设字段。</br>
 *        isZip - {Boolean} 是否对结果数据集进行压缩处理。默认为 false，表示不压缩。</br>
 *        ignoreNoValue - {Boolean} 是否忽略无值栅格数据。true </br>表示忽略无值数据，即无值栅格不参与运算。默认为 false。
 *        targetDatasource - {String} 指定存储结果数据集的数据源，必设字段。</br>
 *        resultGridName - {Number} 指定结果数据集名称，必设字段。</br>
 *        deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。</br>
 */
export default  class MathExpressionAnalysisParameters {

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.dataset -{String}
     * @descriptione 要用来做栅格代数运算数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。必设字段。
     *
     */
    dataset = null;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.extractRegion -{SuperMap.Geometry.Ploygon}
     * @description 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。
     * 如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。
     */
    extractRegion = null;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.expression -{String}
     * @description 指定的栅格运算表达式。如："[DatasourceAlias1.Raster1]*2-10"；必设字段。
     */
    expression = null;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.isZip -{Boolean}
     * @description 是否对结果数据集进行压缩处理。默认为false，表示不压缩。
     */
    isZip = false;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.ignoreNoValue -{Boolean}
     * @description 是否忽略无值栅格数据，默认为false。
     */
    ignoreNoValue = false;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.targetDatasource -{String}
     * @description 指定存储结果数据集的数据源，必设字段。
     */
    targetDatasource = null;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.resultGridName -{String}
     * @description 指定结果数据集名称，必设字段。
     */
    resultGridName = null;

    /**
     * @member SuperMap.MathExpressionAnalysisParameters.prototype.deleteExistResultDataset -{Boolean}
     * @description 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset = false;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
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
                    ;

                    region["points"] = points;
                    region["type"] = type;

                    tempObj[name] = region;
                }
            }
        }
    }

    CLASS_NAME = "SuperMap.MathExpressionAnalysisParameters"
}

SuperMap.MathExpressionAnalysisParameters = MathExpressionAnalysisParameters;