/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.ChartQueryParameters
 *     海图查询参数类，该类用于设置海图查询时的相关参数，海图查询分为海图属性
 *     查询和海图范围查询两类，通过属性queryMode指定查询模式。必设属性有：
 *     queryMode、chartLayerNames、chartQueryFilterParameters。当进行海图范围查询时，必设属性还包括bounds。
 */
SuperMap.REST.ChartQueryParameters = SuperMap.Class({

    /**
     * APIProperty: queryMode
     * {String}  海图查询模式类型，SuperMap iClient for JavaScript对海图支持两种
     *     查询方式：海图属性查询（"ChartAttributeQuery"）和海图空间查询
     *     （"ChartBoundsQuery"） 。
     */
    queryMode:null,

    /**
     * APIProperty: bounds
     * {<SuperMap.Bounds>}  海图查询范围。
     */
    bounds:null,

    /**
     * APIProperty: chartLayerNames
     * {Array(String)} 查询的海图图层的名称。
     */
    chartLayerNames:null,

    /**
     * APIProperty: chartQueryFilterParameters
     * {Array <SuperMap.REST.ChartQueryFilterParameter>} 海图查询过滤参数。
     *      包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字
     *      段过滤条件。
     */
    chartQueryFilterParameters:null,

    /**
     * Property: returnContent
     * {Boolean} 获取或设置是返回查询结果记录集 recordsets，还是返回查询结果的
     *      资源 resourceInfo。默认为 true，表示返回 recordsets。
     *
     *  note: Recordsets 和 ResourceInfo 都存储在查询结果类 QueryResult 中。
     *  当
     *  (start code)
     *  ReturnContent = true
     *  (end)
     *  表示返回查询记录集，这时
     *  查询结果存储在
     *  (start code)
     *      QueryResult.Recordsets
     *  (end)
     *  中，而
     *  (start code)
     *      QueryResult.ResourceInfo
     *  (end)
     *  为空；当
     *  (start code)
     *      ReturnContent = false
     *  (end)
     *  时，表示返回查询结果资源，这时查询结果存储在
     *  (start code)
     *      QueryResult.ResourceInfo
     *  (end)
     *  中，而
     *  (start code)
     *      QueryResult.Recordsets
     *  (end)
     *  为空。
     */
    returnContent:true,

    /**
     * APIProperty: startRecord
     * {Number} 查询起始记录位置，默认为0。
     */
    startRecord:0,

    /**
     * APIProperty: expectCount
     * {Number} 期望查询结果返回的记录数，该值大于0。
     */
    expectCount:null,

    /**
     * Constructor: SuperMap.REST.ChartQueryParameters
     *  初始化 ChartQueryParameters 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * queryMode - {String}  海图查询模式类型，SuperMap iClient for JavaScript对
     *     海图支持两种查询方式：海图属性查询（"ChartAttributeQuery"）和海图空
     *     间查询（"ChartBoundsQuery"） 。
     * bounds - {<SuperMap.Bounds>}  海图查询范围。
     * chartLayerNames - {Array(String)} 查询的海图图层的名称。
     * chartQueryFilterParameters - {Array <SuperMap.REST.ChartQueryFilterParameter>}
     *      海图查询过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、
     *      线或面）、属性字段过滤条件。
     * returnContent - {Boolean} 获取或设置是返回查询结果记录集 recordsets，还
     *       是返回查询结果的资源 resourceInfo。默认为 true，表示返回 recordsets。
     * startRecord - {Number} 查询起始记录位置，默认为0。
     * expectCount - {Number} 期望查询结果返回的记录数，该值大于0。
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
        me.queryMode = null;
        me.bounds = null;
        me.chartLayerNames = null;
        me.chartQueryFilterParameters = null;
        me.returnContent = true;
        me.startRecord = 0;
        me.expectCount = null;
    },

    /**
     * Method: getVariablesJson
     * 将属性信息转换成能够被服务识别的JSON格式字符串。
     */
    getVariablesJson:function () {
        var json="";

        json += "\"queryMode\":\"" + this.queryMode + "\",";

        if (this.chartLayerNames && this.chartLayerNames.length) {
            var chartLayersArray = [];
            var layerLength = this.chartLayerNames.length;
            for (var i = 0; i < layerLength;  i++)
            {
                chartLayersArray.push("\""+this.chartLayerNames[i]+"\"");
            }
            var layerNames = "[" + chartLayersArray.join(",") + "]";
            json += "\"chartLayerNames\":" + layerNames + ",";
        }

        if (this.queryMode === "ChartBoundsQuery" && this.bounds) {
            json += "\"bounds\":" + "{" + "\"leftBottom\":" + "{" + "\"x\":" + this.bounds.left + "," +
                "\"y\":" + this.bounds.bottom + "}" + "," + "\"rightTop\":" + "{" + "\"x\":" + this.bounds.right + "," +
                "\"y\":" + this.bounds.top + "}" + "},";
        }

        if (this.chartQueryFilterParameters && this.chartQueryFilterParameters.length) {
            var chartParamArray = [];
            var chartLength = this.chartQueryFilterParameters.length;
            for (var j = 0; j < chartLength; j++)
            {
               var chartQueryFilterParameter = new SuperMap.REST.ChartQueryFilterParameter();
                chartQueryFilterParameter =  this.chartQueryFilterParameters[j];
                chartParamArray.push(chartQueryFilterParameter.toJson());
            }
            var chartParamsJson = "[" + chartParamArray.join(",") + "]";
            chartParamsJson = "\"chartQueryParams\":" + chartParamsJson + ",";
            chartParamsJson += "\"startRecord\":" + this.startRecord + ",";
            chartParamsJson += "\"expectCount\":" + this.expectCount;
            chartParamsJson = "{" + chartParamsJson + "}";
            json += "\"chartQueryParameters\":" + chartParamsJson;
        }
        json = "{" + json + "}";
        return json;
    },

    CLASS_NAME:"SuperMap.REST.ChartQueryParameters"
})