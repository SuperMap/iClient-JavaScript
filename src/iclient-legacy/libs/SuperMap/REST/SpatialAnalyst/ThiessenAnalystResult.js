/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/Geometry.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.ThiessenAnalystResult
 * 泰森多边形分析服务结果数据类
 */
SuperMap.REST.ThiessenAnalystResult = SuperMap.Class({
    
    /** 
     * APIProperty: datasetName
     * {String} 生成的泰森多边形数据集名称。
     */
    datasetName: null,
    
    /**
     * APIProperty: datasourceName
     * {String} 数据源名称。
     */
    datasourceName: null,
    
    /**
     * APIProperty: regions
     * {Array(<SuperMap.Geometry>)} 分析得到的多边形面数组。
     */
    regions: null,
     
    /**
     * Constructor: SuperMap.REST.ThiessenAnalystResult 
     * 泰森多边形分析服务结果数据类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * datasetName - {String} 生成的泰森多边形数据集名称。
     * datasourceName - {String} 数据源名称。
     * regions - {Array(<SuperMap.Geometry>)} 分析得到的多边形面数组。
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
        if (me.regions) {
            for(var i = 0, len = me.regions.length; i < len; i++){
                me.regions[i].destroy();
            }
            me.regions = null;
        }
        me.datasetName = null;
        me.datasourceName = null;
    },

    CLASS_NAME: "SuperMap.REST.ThiessenAnalystResult"
});

/**
 * Function: SuperMap.REST.ThiessenAnalystResult.fromJson
 * 将 JSON 对象表示的泰森多边形结果转化为泰森多边形分析对象结果。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的泰森多边形分析结果。 
 *
 * Returns:
 * {<SuperMap.REST.ThiessenAnalystResult>} 转化后的泰森多边形结果对象。
 */
SuperMap.REST.ThiessenAnalystResult.fromJson = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.ThiessenAnalystResult();
    if (jsonObject.datasetName) {
        result.datasetName = jsonObject.datasetName;
    }
    if (jsonObject.datasourceName) {
        result.datasourceName = jsonObject.datasourceName;
    }
    var regions = [];
    if (jsonObject.regions) {
        for(var i = 0, len = jsonObject.regions.length; i < len; i++){
            regions.push(SuperMap.REST.ServerGeometry.fromJson(jsonObject.regions[i]).toGeometry())
        }
        result.regions = regions;
    }
    return result;
};