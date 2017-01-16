/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.ChartFeatureInfoSpecsResult
 *     海图产品规范物标信息查询结果类，该结果通过海图物标信息服务
 *     ChartFeatureInfoSpecsService获取。
 */
SuperMap.REST.ChartFeatureInfoSpecsResult = SuperMap.Class({
    /**
     * APIProperty: chartFeatureInfoSpecs
     *  {Array(<SuperMap.REST.ChartFeatureInfoSpec>)} 物标信息查询结果数组。数据元素类型为 ChartFeatureInfoSpec。
     */
    chartFeatureInfoSpecs:null,

    /** Constructor: SuperMap.REST.ChartFeatureInfoSpecsResult
     *  初始化 ChartFeatureInfoSpecsResult 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     *  chartFeatureInfoSpecs - {Array<SuperMap.REST.ChartFeatureInfoSpec>}
     *       物标信息查询结果数组。数据元素类型为ChartFeatureInfoSpec。
     */
    initialize:function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.chartFeatureInfoSpecs = null
    },

    /**
     *  Method: fromJson
     *  {<SuperMap.REST.ChartFeatureInfoSpecsResult>} 通过json对象创建 ChartFeatureInfoSpecsResult
     *      实例。
     *
     * Parameters:
     * json - {Array<Object>} JSON对象数组，其对象可以包含ChartFeatureInfoSpec
     *      对象能够接收的属性。
     */
    fromJson:function (json) {
        if (json == null) {
            return null;
        }

        var result = new SuperMap.REST.ChartFeatureInfoSpecsResult();
        var chartFeatures = [];

        var chartFeatureInfoSpec = new SuperMap.REST.ChartFeatureInfoSpec();
        for (var item in json) {
            chartFeatures.push(chartFeatureInfoSpec.fromJson(json[item]));
        }

        result.chartFeatureInfoSpecs = chartFeatures;
        return result;
    },

    CLASS_NAME:"SuperMap.REST.ChartFeatureInfoSpecsResult"
})