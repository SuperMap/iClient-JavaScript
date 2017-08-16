import SuperMap from '../SuperMap';
import ChartQueryFilterParameter from './ChartQueryFilterParameter';

/**
 * @class SuperMap.ChartQueryParameters
 * @classdesc 海图查询参数类，该类用于设置海图查询时的相关参数，海图查询分为海图属性<br>
 *               查询和海图范围查询两类，通过属性queryMode指定查询模式。必设属性有：<br>
 *               queryMode、chartLayerNames、chartQueryFilterParameters。当进行海图范围查询时，必设属性还包括bounds。
 * @param options - {Object} 可选参数。如：<br>
 *         queryMode - {string} 海图查询模式类型，SuperMap iClient for JavaScript对
 *                              海图支持两种查询方式：海图属性查询（"ChartAttributeQuery"）和海图空间查询（"ChartBoundsQuery"） 。<br>
 *         bounds - {SuperMap.Bounds}  海图查询范围。<br>
 *         chartLayerNames - {Array(String)} 查询的海图图层的名称。<br>
 *         chartQueryFilterParameters - {Array <ChartQueryFilterParameter} 海图查询过滤参数。包括：物标代码、
 *                                                                         物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。<br>
 *         returnContent - {boolean} 获取或设置是返回查询结果记录集 recordsets，还
 *                                   是返回查询结果的资源 resourceInfo。默认为 true，表示返回 recordsets。<br>
 *         startRecord - {number}查询起始记录位置，默认为0。<br>
 *         expectCount - {number}期望查询结果返回的记录数，该值大于0。
 */
export default class ChartQueryParameters {

    /**
     * @member SuperMap.ChartQueryParameters.prototype.queryMode -{string}
     * @description 海图查询模式类型，SuperMap iClient for JavaScript对海图支持两种<br>
     *              查询方式：海图属性查询（"ChartAttributeQuery"）和海图空间查询（"ChartBoundsQuery"） 。
     */
    queryMode = null;

    /**
     * @member SuperMap.ChartQueryParameters.prototype.bounds -{SuperMap.Bounds}
     * @description 海图查询范围。
     */
    bounds = null;

    /**
     * @member SuperMap.ChartQueryParameters.prototype.chartLayerNames -{Array(String)}
     * @description 查询的海图图层的名称。
     */
    chartLayerNames = null;

    /**
     * @member SuperMap.ChartQueryParameters.prototype.chartQueryFilterParameters -{Array(ChartQueryFilterParameter)}
     * @description 海图查询过滤参数。<br>
     *               包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。
     */
    chartQueryFilterParameters = null;

    /**
     * @member SuperMap.ChartQueryParameters.prototype.returnContent -{boolean}
     * @description 获取或设置是返回查询结果记录集 recordsets，还是返回查询结果的
     *      资源 resourceInfo。默认为 true，表示返回 recordsets。
     * @example
     *  Recordsets 和 ResourceInfo 都存储在查询结果类 QueryResult 中。当:
     *  ReturnContent = true
     *  表示返回查询记录集，这时查询结果存储在:
     *      QueryResult.Recordsets
     *  中，而
     *      QueryResult.ResourceInfo
     *  为空；当:
     *      ReturnContent = false
     *  时，表示返回查询结果资源，这时查询结果存储在:
     *      QueryResult.ResourceInfo
     *  中，而
     *      QueryResult.Recordsets
     *  为空。
     */
    returnContent = true;

    /**
     * @member SuperMap.ChartQueryParameters.prototype.startRecord -{number}
     * @description 查询起始记录位置，默认为0。
     */
    startRecord = 0;

    /**
     * @member SuperMap.ChartQueryParameters.prototype.expectCount -{number}
     * @description 期望查询结果返回的记录数，该值大于0。
     */
    expectCount = null;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.ChartQueryParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.queryMode = null;
        me.bounds = null;
        me.chartLayerNames = null;
        me.chartQueryFilterParameters = null;
        me.returnContent = true;
        me.startRecord = 0;
        me.expectCount = null;
    }

    /**
     * @function @member SuperMap.ChartQueryParameters.prototype.getVariablesJson
     * @description 将属性信息转换成能够被服务识别的JSON格式字符串。
     */
    getVariablesJson() {
        var json = "";

        json += "\"queryMode\":\"" + this.queryMode + "\",";

        if (this.chartLayerNames && this.chartLayerNames.length) {
            var chartLayersArray = [];
            var layerLength = this.chartLayerNames.length;
            for (var i = 0; i < layerLength; i++) {
                chartLayersArray.push("\"" + this.chartLayerNames[i] + "\"");
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
            for (var j = 0; j < chartLength; j++) {
                var chartQueryFilterParameter = new ChartQueryFilterParameter();
                chartQueryFilterParameter = this.chartQueryFilterParameters[j];
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
    }

    CLASS_NAME = "SuperMap.ChartQueryParameters"
}
SuperMap.ChartQueryParameters = ChartQueryParameters;