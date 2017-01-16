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
 * Class: SuperMap.REST.InterpolationRBFAnalystParameter
 * 样条插值（径向基函数插值法）分析参数类
 *
 * Inherits from:
 *  - <SuperMap.REST.InterpolationAnalystParameters>
 */

SuperMap.REST.InterpolationRBFAnalystParameters = SuperMap.Class(SuperMap.REST.InterpolationAnalystParameters,{
    /**
     * APIProperty: smooth
     * {Number} 光滑系数，值域为 0到1，默认值为0.1，常用取值如0、0.001、0.01、0.1、和0.5。
     * 该值表示插值函数曲线与点的逼近程度，此数值越大，函数曲线与点的偏差越大，反之越小。
     */
    smooth:0.1,

    /**
     * APIProperty: tension
     * {Number} 张力系数，默认为40，常用取值如0、1、5和10。
     * 用于调整结果栅格数据表面的特性，张力越大，插值时每个点对计算结果影响越小，反之越大。
     */
    tension:40,

    /**
     * APIProperty: searchMode
     * {<SuperMap.REST.SearchMode>} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数
     * 具体如下：
     * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
     * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
     * {QUADTREE} 使用 QUADTREE 方式查找参与内插分析的点（块查找）。
     */
    searchMode:null,

    /**
     * APIProperty: expectedCount
     * {Number} 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数。默认值为12。
     */
    expectedCount:12,

    /**
     * APIProperty: maxPointCountForInterpolation
     * {Number} 【块查找】方式下，最多参与插值的点数。默认值为200。
     */
    maxPointCountForInterpolation:200,

    /**
     * APIProperty: maxPointCountInNode
     * {Number} 【块查找】方式下，单个块内最多参与运算点数。默认值为50。
     */
    maxPointCountInNode:50,

    /**
     * Constructor: SuperMap.REST.InterpolationRBFAnalystParameters
     * 样条插值分析参数类构造函数。
     *
     * 例如：
     * (start code)
     * var myInterpolationRBFAnalystParameters = new SuperMap.REST.InterpolationRBFAnalystParameters({
     *     dataset:"SamplesP@Interpolation",
     *     smooth: 0.1,
     *     tension: 40,
     *     searchMode: "QUADTREE",
     *     maxPointCountForInterpolation: 20,
     *     maxPointCountInNode: 5,
     *     pixelFormat: "BIT16",
     *     zValueFieldName: "AVG_TMP",
     *     resolution: 3000,
     *     filterQueryParameter: {
     *         attributeFilter: ""
     *     },
     *     outputDatasetName: "myRBF"
     * });
     * (end)
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * smooth - {Number} 光滑系数，该值表示插值函数曲线与点的逼近程度，值域为 0到1，默认值为0.1。
     * tension - {Number} 张力系数，用于调整结果栅格数据表面的特性，默认为40。
     * bounds - {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * searchMode - {String} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数
     * expectedCount - {Number} 【固定点数查找】方式下，设置参与差值运算的点数，默认值为12。
     * searchRadius - {Number} 【定长查找】方式下，设置参与运算点的查找范围，默认值为0。
     * maxPointCountForInterpolation - {Number} 【块查找】方式下，设置最多参与插值的点数。默认为200。
     * maxPointCountInNode - {Number} 【块查找】方式下，设置单个块内最多参与运算点数。默认为50。
     * zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * zValueScale - {Number} 用于进行插值分析值的缩放比率，默认值为1。
     * resolution - {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
     * filterQueryParameter - {<SuperMap.REST.FilterParameter>} 属性过滤条件。
     * outputDatasetName - {String} 插值分析结果数据集的名称。必设参数
     * outputDatasourceName - {String} 插值分析结果数据源的名称。必设参数
     * pixelFormat - {String} 指定结果栅格数据集存储的像素格式。
     * dataset - {String} 要用来做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * inputPoints - {Array <SuperMap.Geometry.Point>} 用于做插值分析的离散点集合。当插值分析类型（InterpolationAnalystType）为 geometry 时，必设参数。
     */
    initialize: function (options) {
        SuperMap.REST.InterpolationAnalystParameters.prototype.initialize.apply(this, arguments);
        var me =this;
        me.smooth =0.1;
        me.tension =40;
        me.searchMode =null;
        me.expectedCount =12;
        me.maxPointCountForInterpolation =200;
        me.maxPointCountInNode =50;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.ThiessenAnalystParameters.prototype.destroy.apply(this,arguments);
        var me = this;
        me.smooth =null;
        me.tension =null;
        me.searchMode =null;
        me.expectedCount =null;
        me.maxPointCountForInterpolation =null;
        me.maxPointCountInNode =null;
    },

    CLASS_NAME: "SuperMap.REST.InterpolationRBFAnalystParameters"
});

SuperMap.REST.InterpolationRBFAnalystParameters.toObject =  function(datasetInterpolationRBFAnalystParameters, tempObj){
    for (var name in datasetInterpolationRBFAnalystParameters) {
        tempObj[name] = datasetInterpolationRBFAnalystParameters[name];

    }
};

/**
 * Class: SuperMap.REST.InterpolationRBFAnalystParameter
 * 样条插值（径向基函数插值法）分析参数类
 *
 * Inherits from:
 *  - <SuperMap.REST.InterpolationAnalystParameters>
 */

SuperMap.REST.InterpolationRBFAnalystParameters = SuperMap.Class(SuperMap.REST.InterpolationAnalystParameters,{
    /**
     * APIProperty: smooth
     * {Number} 光滑系数，值域为 0到1，默认值为0.1，常用取值如0、0.001、0.01、0.1、和0.5。
     * 该值表示插值函数曲线与点的逼近程度，此数值越大，函数曲线与点的偏差越大，反之越小。
     */
    smooth:0.1,

    /**
     * APIProperty: tension
     * {Number} 张力系数，默认为40，常用取值如0、1、5和10。
     * 用于调整结果栅格数据表面的特性，张力越大，插值时每个点对计算结果影响越小，反之越大。
     */
    tension:40,

    /**
     * APIProperty: searchMode
     * {String} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必输参数。
     * 具体如下：
     * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
     * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
     * {QUADTREE} 使用 QUADTREE 方式查找参与内插分析的点（块查找）。
     */
    searchMode:null,

    /**
     * APIProperty: expectedCount
     * {Number} 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数。默认为12。
     */
    expectedCount:12,

    /**
     * APIProperty: maxPointCountForInterpolation
     * {Number} 【块查找】方式下，最多参与插值的点数。默认为200。
     */
    maxPointCountForInterpolation:200,

    /**
     * APIProperty: maxPointCountInNode
     * {Number} 【块查找】方式下，单个块内最多参与运算点数。默认为50。
     */
    maxPointCountInNode:50,

    /**
     * Constructor: SuperMap.REST.InterpolationRBFAnalystParameters
     * 样条插值分析参数类构造函数。
     *
     * 例如：
     * (start code)
     * var myInterpolationRBFAnalystParameters = new SuperMap.REST.InterpolationRBFAnalystParameters({
     *     dataset:"SamplesP@Interpolation",
     *     smooth: 0.1,
     *     tension: 40,
     *     searchMode: "QUADTREE",
     *     maxPointCountForInterpolation: 20,
     *     maxPointCountInNode: 5,
     *     pixelFormat: "BIT16",
     *     zValueFieldName: "AVG_TMP",
     *     resolution: 3000,
     *     filterQueryParameter: {
     *         attributeFilter: ""
     *     },
     *     outputDatasetName: "myRBF"
     * });
     * (end)
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * smooth - {Number} 光滑系数，该值表示插值函数曲线与点的逼近程度，值域为 0到1，默认值约为0.1。
     * tension - {Number} 张力系数，用于调整结果栅格数据表面的特性，默认为40。
     * bounds - {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * searchMode - {String} 插值运算时，查找参与运算点的方式，有固定点数查找、定长查找、块查找。必设参数
     * expectedCount - {Number} 【固定点数查找】方式下，设置参与差值运算的点数。
     * searchRadius - {Number} 【定长查找】方式下，设置参与运算点的查找范围。
     * maxPointCountForInterpolation - {Number} 【块查找】方式下，设置最多参与插值的点数。默认为200。
     * maxPointCountInNode - {Number} 【块查找】方式下，设置单个块内最多参与运算点数。默认为50。
     * zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。必设参数
     * zValueScale - {Number} 用于进行插值分析值的缩放比率，默认为1。
     * resolution - {Number} 插值结果栅格数据集的分辨率，即一个像元所代表的实地距离，与点数据集单位相同。
     * filterQueryParameter - {<SuperMap.REST.FilterParameter>} 属性过滤条件。必设参数
     * outputDatasetName - {String} 插值分析结果数据集的名称。必设参数
     * pixelFormat - {String} 指定结果栅格数据集存储的像素格式。必设参数
     * dataset - {String} 要用来做插值分析的数据源中数据集的名称。该名称用形如”数据集名称@数据源别名”形式来表示。必设参数
     */
    initialize: function (options) {
        SuperMap.REST.InterpolationAnalystParameters.prototype.initialize.apply(this, arguments);
        var me =this;
        me.smooth =0.1;
        me.tension =40;
        me.searchMode =null;
        me.expectedCount =12;
        me.maxPointCountForInterpolation =200;
        me.maxPointCountInNode =50;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.ThiessenAnalystParameters.prototype.destroy.apply(this,arguments);
        var me = this;
        me.smooth =null;
        me.tension =null;
        me.searchMode =null;
        me.expectedCount =null;
        me.maxPointCountForInterpolation =null;
        me.maxPointCountInNode =null;
    },

    CLASS_NAME: "SuperMap.REST.InterpolationRBFAnalystParameters"
});
