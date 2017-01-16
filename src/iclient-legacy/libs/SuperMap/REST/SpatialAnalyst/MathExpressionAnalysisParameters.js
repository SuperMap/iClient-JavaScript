/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.MathExpressionAnalysisParameters
 * 栅格代数运算参数类
 *
 */
SuperMap.REST.MathExpressionAnalysisParameters = SuperMap.Class({

    /**
     * APIProperty: dataset
     * {String} 要用来做栅格代数运算数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：JingjinTerrain@Jingjin。必设字段。
     *
     */
    dataset: null,

    /**
     * APIProperty: extractRegion
     * {<SuperMap.Geometry.Ploygon>} 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。
     * 如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。
     */
    extractRegion: null,

    /**
     * APIProperty: expression
     * {String} 指定的栅格运算表达式。如："[DatasourceAlias1.Raster1]*2-10"；必设字段。
     */
    expression: null,

    /**
     * APIProperty: isZip
     * {Boolean} 是否对结果数据集进行压缩处理。默认为False，表示不压缩。
     */
    isZip: false,

    /**
     * APIProperty: ignoreNoValue
     * {Boolean} 是否忽略无值栅格数据，默认为true。
     */
    ignoreNoValue: false,

    /**
     * APIProperty: targetDatasource
     * {String}  指定存储结果数据集的数据源，必设字段。
     */
    targetDatasource: null,

    /**
     * APIProperty: resultGridName
     * {String} 指定结果数据集名称，必设字段。
     */
    resultGridName: null,

    /**
     * APIProperty: deleteExistResultDataset
     * {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    deleteExistResultDataset: false,

    /**
     * Constructor: SuperMap.REST.MathExpressionAnalysisParameters
     * 栅格代数运算参数构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * dataset - {String} 要用来做栅格代数运算数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：BaseMap_P@Jingjin。必设字段。
     * extractRegion - {<SuperMap.Geometry.Ploygon>} 栅格代数运算的范围，指定数据集中参与栅格代数运算的区域。 如果缺省，则计算全部区域，如果参与运算的数据集范围不一致，将使用所有数据集的范围的交集作为计算区域 。
     * expression - {String} 指定的栅格运算表达式。如：[DatasourceAlias1.Raster1]*2-10；必设字段。
     * isZip - {Boolean} 是否对结果数据集进行压缩处理。默认为 false，表示不压缩。
     * ignoreNoValue - {Boolean} 是否忽略无值栅格数据。true 表示忽略无值数据，即无值栅格不参与运算。默认为 false。
     * targetDatasource - {String} 指定存储结果数据集的数据源，必设字段。
     * resultGridName - {Number} 指定结果数据集名称，必设字段。
     * deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。默认为 false，即不删除。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.dataset = null;
        me.bounds = null;
        me.expression = null;
        me.isZip = true;
        me.ignoreNoValue = true;
        me.targetDatasource = null;
        me.resultGridName = null;
        me.deleteExistResultDataset = null;
    },

    CLASS_NAME: "SuperMap.REST.MathExpressionAnalysisParameters"
});

SuperMap.REST.MathExpressionAnalysisParameters.toObject =  function(mathExpressionAnalysisParameters, tempObj){
    for (var name in mathExpressionAnalysisParameters) {
        if(name !== "dataset"){
            tempObj[name] = mathExpressionAnalysisParameters[name];
        }

        if(name === "extractRegion"){
            if(mathExpressionAnalysisParameters[name]){
                var bs = mathExpressionAnalysisParameters[name].components[0].components;
                var region = {},
                    points = [],
                    type = "REGION";

                var len = bs.length;
                for(var i = 0; i < len - 1; i++){
                    var poi = {};
                    poi["x"] = bs[i].x;
                    poi["y"] = bs[i].y;
                    points.push(poi);
                };

                region["points"] = points;
                region["type"] = type;

                tempObj[name] = region;
            }
        }
    }
};