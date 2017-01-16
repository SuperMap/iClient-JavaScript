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
 * Class: SuperMap.REST.InterpolationIDWAnalystParameter
 * 反距离加权插值（IDW）分析参数类
 *
 * Inherits from:
 *  - <SuperMap.REST.InterpolationAnalystParameters>
 */

SuperMap.REST.InterpolationIDWAnalystParameters = SuperMap.Class(SuperMap.REST.InterpolationAnalystParameters,{
    /**
     * APIProperty: power
     * {Number} 距离权重计算的幂次，默认值为2。
     * 该值决定了权值下降的速度，幂次越大，随距离的增大权值下降越快，距离预测点越远的点的权值也越小。
     * 理论上，参数值必须大于0，但是0.5到3之间时运算结果更合理，因此推荐值为0.5~3。
     */
    power:2,

    /**
     * APIProperty: searchMode
     * {<SuperMap.REST.SearchMode>} 插值运算时，查找参与运算点的方式，支持固定点数查找、定长查找。必设参数
     * 具体如下：
     * {KDTREE_FIXED_COUNT} 使用 KDTREE 的固定点数方式查找参与内插分析的点。
     * {KDTREE_FIXED_RADIUS} 使用 KDTREE 的定长方式查找参与内插分析的点。
     */
    searchMode:null,

    /**
     * APIProperty: expectedCount
     * {Number} 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数，默认值为12。
     */
    expectedCount:12,

    /**
     * Constructor: SuperMap.REST.InterpolationIDWAnalystParameters
     * IDW分析参数类构造函数。
     *
     * 例如：
     * (start code)
     * var myInterpolationIDWAnalystParameters = new SuperMap.REST.InterpolationIDWAnalystParameters({
     *      dataset:"SamplesP@Interpolation",
     *      power: 2,
     *      searchMode: "KDTREE_FIXED_COUNT",
     *      expectedCount: 12,
     *      pixelFormat: "BIT16",
     *      zValueFieldName: "AVG_TMP",
     *      resolution: 3000,
     *      filterQueryParameter: {
     *          attributeFilter: ""
     *      },
     *      outputDatasetName: "myIDW"
     * });
     * (end)
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * power - {Number} 距离权重计算的幂次。
     * bounds - {<SuperMap.Bounds>} 插值分析的范围，用于确定结果栅格数据集的范围。
     * searchMode - {String} 插值运算时，查找参与运算点的方式，支持固定点数查找、定长查找。必设参数
     * expectedCount - {Number} 【固定点数查找】方式下，设置待查找的点数，即参与差值运算的点数，默认值为12。
     * searchRadius - {Number} 【定长查找】方式下，设置查找半径，即参与运算点的查找范围，与点数据集单位相同，默认值为0。
     * zValueFieldName - {String} 存储用于进行插值分析的字段名称，插值分析不支持文本类型的字段。当插值分析类型(InterpolationAnalystType)为 dataset 时，必设参数。
     * zValueScale - {Number} 用于进行插值分析值的缩放比率，默认为1。
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
        me.power =2;
        me.searchMode =null;
        me.expectedCount =12;
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
        me.power =null;
        me.searchMode =null;
        me.expectedCount =null;
    },

    CLASS_NAME: "SuperMap.REST.InterpolationIDWAnalystParameters"
});
