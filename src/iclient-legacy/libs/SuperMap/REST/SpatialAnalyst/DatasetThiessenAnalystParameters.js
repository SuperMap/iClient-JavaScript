/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/SpatialAnalyst/ThiessenAnalystParameters.js
  * @requires SuperMap/REST/Query/FilterParameter.js
 * @requires SuperMap/REST/ServerType/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.DatasetThiessenAnalystParameters
 * 数据集泰森多边形分析参数类
 *
 * Inherits from:
 *  - <SuperMap.REST.ThiessenAnalystParameters> 
 */
SuperMap.REST.DatasetThiessenAnalystParameters = SuperMap.Class(SuperMap.REST.ThiessenAnalystParameters, {
    
    /** 
     * APIProperty: filterQueryParameter
     * {<SuperMap.REST.FilterParameter>} 过滤条件，
     * 对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
     * (start code)
     * filterQueryParameter的使用方法如：
     *  filterQueryParameter = new SuperMap.REST.FilterParameter({
     *   name: "Countries@World",
     *   attributeFilter: "SmID>100"
     *  });
     * (end)
     */
    filterQueryParameter : null,

    /** 
     * APIProperty: dataset
     * {String} 数据集名称
     * 待分析的数据集名称，请使用‘datasetName@datasourceName’格式来表示。  
     */
    dataset: null,

    /**
     * Constructor: SuperMap.REST.DatasetThiessenAnalystParameters 
     * 数据集泰森多边形分析参数类构造函数。
     * 
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * filterQueryParameter - {<SuperMap.REST.FilterParameter>} 对待分析数据集中的点进行过滤，不设置时默认为null，即对数据集中的所有点进行分析。
     */
    initialize: function (options) {
        SuperMap.REST.ThiessenAnalystParameters.prototype.initialize.apply(this, arguments);
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

        var me = this;
        if(me.filterQueryParameter ){
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.DatasetThiessenAnalystParameters"
});

SuperMap.REST.DatasetThiessenAnalystParameters.toObject =  function(datasetThiessenAnalystParameters, tempObj){
    for (var name in datasetThiessenAnalystParameters) {
        if (name === "clipRegion") {
            tempObj.clipRegion = SuperMap.REST.ServerGeometry.fromGeometry(datasetThiessenAnalystParameters.clipRegion);
        }else {
            tempObj[name] = datasetThiessenAnalystParameters[name];
        }
    }
};