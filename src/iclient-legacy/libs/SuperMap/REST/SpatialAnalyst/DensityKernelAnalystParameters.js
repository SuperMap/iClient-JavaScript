/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.DensityKernelAnalystParameters
 * 核密度分析参数类
 *
 */
SuperMap.REST.DensityKernelAnalystParameters = SuperMap.Class({

    /**
     * APIProperty: dataset
     * {String} 要用来做核密度分析数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：Railway@Changchun。必设字段。
     *
     * 注：核密度分析支持点数据集和线数据集。
     */
    dataset: null,

    /**
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 核密度分析的范围，用于确定结果栅格数据集的范围。
     * 如果缺省，则默认为原数据集的范围。
     */
    bounds: null,

    /**
     * APIProperty: fieldName
     * {String} 用于进行核密度分析的测量值的字段名称，核密度分析不支持文本类型的字段，必设字段。
     */
    fieldName: null,

    /**
     * APIProperty: resultGridDatasetResolution
     * {Number} 密度分析结果栅格数据的分辨率，单位与当前数据集相同。默认值为当前数据集的长宽中的最小值除500。
     */
    resultGridDatasetResolution: null,

    /**
     * APIProperty: searchRadius
     * {Number} 栅格邻域内用于计算密度的查找半径，单位与当前数据集相同。默认值为当前数据集的长宽中的最大值除30。
     */
    searchRadius: null,

    /**
     * APIProperty: targetDatasource
     * {String}  指定的存储结果数据集的数据源，默认为当前分析的数据集所在的数据源。
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
     * Constructor: SuperMap.REST.DensityKernelAnalystParameters
     * 核密度分析参数构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * dataset - {String} 要用来做核密度分析数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示，例如：BaseMap_P@Jingjin。必设字段。
     * bounds - {<SuperMap.Bounds>} 核密度分析的范围，用于确定结果栅格数据集的范围。 如果缺省，则默认为原数据集的范围。
     * searchRadius - {Number} 栅格邻域内用于计算密度的查找半径，单位与当前数据集相同。默认值为当前数据集的长宽中的最大值除30。
     * fieldName - {String} 用于进行核密度分析的测量值的字段名称，核密度分析不支持文本类型的字段，必设字段。
     * resultGridDatasetResolution - {Number} 密度分析结果栅格数据的分辨率，单位与当前数据集相同。默认值为当前数据集的长宽中的最小值除500。
     * targetDatasource - {String} 指定的存储结果数据集的数据源，默认为当前分析的数据集所在的数据源。
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
        me.fieldName = null;
        me.resultGridDatasetResolution = null;
        me.searchRadius = null;

        me.targetDatasource = null;
        me.resultGridName = null;
        me.deleteExistResultDataset = null;
    },

    CLASS_NAME: "SuperMap.REST.DensityKernelAnalystParameters"
});

SuperMap.REST.DensityKernelAnalystParameters.toObject =  function(densityKernelAnalystParameters, tempObj){
    for (var name in densityKernelAnalystParameters) {
        if(name !== "dataset"){
            tempObj[name] = densityKernelAnalystParameters[name];
        }
        /*
        if(name == "bounds"){
            var icbounds = densityKernelAnalystParameters[name];
            //var boundsJson = "{\"leftBottom\":{\"x\":" + bounds.left + ",\"y\":" + bounds.bottom
            //   + ",\"rightTop\":{\"x\":" + bounds.right + ",\"y\":" + bounds.top + "}}";;

            var leftBottom = {},  rightTop = {}, bounds = {};
            leftBottom["x"] = icbounds.left;
            leftBottom["y"] = icbounds.bottom;

            rightTop["x"] = icbounds.right;
            rightTop["y"] = icbounds.top;

            bounds["leftBottom"] = leftBottom;
            bounds["rightTop"] = rightTop;

            tempObj[name] = bounds;
        }
        */
    }
};