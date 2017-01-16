/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 * @requires SuperMap/REST/SpatialAnalyst/InterpolationAnalystParameters.js
 */

/**
 * Class: SuperMap.REST.InterpolationDensityAnalystParameters
 * 点密度差值分析参数类
 *
 * Inherits from:
 *  - <SuperMap.REST.InterpolationAnalystParameters>
 */
SuperMap.REST.InterpolationDensityAnalystParameters = SuperMap.Class(SuperMap.REST.InterpolationAnalystParameters,{

    /**
     * Constructor: SuperMap.REST.InterpolationDensityAnalystParameters
     * 点密度插值分析参数构造函数。
     *
     * 例如：
     * (start code)
     * var myInterpolationDensityAnalystParameters = new SuperMap.REST.InterpolationDensityAnalystParameters({
     *      dataset: "SamplesP@Interpolation",
     *      searchRadius: "100000",
     *      pixelFormat: "BIT16",
     *      zValueFieldName: "AVG_TMP",
     *      resolution: 3000,
     *      filterQueryParameter: {
     *          attributeFilter: ""
     *      },
     *      outputDatasetName: "myDensity"
     * });
     * (end)
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bounds - {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * searchRadius - {Number} 查找半径，即参与运算点的查找范围，与点数据集单位相同，默认值为0。
     * zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * zValueScale - {Number} 用于进行插值分析值的缩放比率，默认值为1。
     * resolution - {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
     * filterQueryParameter - {<SuperMap.REST.FilterParameter>} 属性过滤条件。
     * outputDatasetName - {String} 插值分析结果数据集的名称。必设参数
     * outputDatasourceName - {String} 插值分析结果数据源的名称。必设参数
     * pixelFormat - {String} 指定结果栅格数据集存储的像素格式。
     * dataset - {String} 用来做插值分析的数据源中数据集的名称，该名称用形如"数据集名称@数据源别名"形式来表示。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * inputPoints - {Array <SuperMap.Geometry.Point>} 用于做插值分析的离散点集合。当插值分析类型（InterpolationAnalystType）为 geometry 时，必设参数。
     */
    initialize: function (options) {
        SuperMap.REST.InterpolationAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.ThiessenAnalystParameters.prototype.destroy.apply(this,arguments);
    },

    CLASS_NAME: "SuperMap.REST.InterpolationDensityAnalystParameters"
});
