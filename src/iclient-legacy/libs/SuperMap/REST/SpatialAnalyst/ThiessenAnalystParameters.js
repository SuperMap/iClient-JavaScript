/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Geometry.js
 */


/**
 * Class: SuperMap.REST.ThiessenAnalystParameters
 * 泰森多边形分析参数基类。
 */
SuperMap.REST.ThiessenAnalystParameters = SuperMap.Class({

    /** 
     * APIProperty: clipRegion
     * {<SuperMap.Geometry>} 结果数据裁剪区域，可以为null，表示不对结果进行裁剪。
     */
    clipRegion: null,

    /** 
     * APIProperty: createResultDataset
     * {Boolean} 是否返回结果数据集，默认值 false。如果为true，则必须设置属性resultDatasetName和resultDatasourceName。
     */
    createResultDataset: false,
    
    /** 
     * APIProperty: resultDatasetName
     * {String} 指定结果数据集名称。
     */
    resultDatasetName: null,
    
    /** 
     * APIProperty: resultDatasourceName
     * {String} 指定结果数据集所在数据源。
     */
    resultDatasourceName: null,
    
    /** 
     * APIProperty: returnResultRegion
     * {Boolean} 是否返回分析得到的多边形面数组，默认 true，返回。
     */
    returnResultRegion: true,
    

    /**
     * Constructor: SuperMap.REST.ThiessenAnalystParameters
     * 泰森多边形分析参数基类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * clipRegion - {<SuperMap.Geometry>} 结果数据裁剪区域，可以为null，表示不对结果进行裁剪。
     * createResultDataset - {Boolean} 是否返回结果数据集，默认不返回。
     * resultDatasetName - {Boolean} 指定结果数据集名称。
     * resultDatasourceName - {Boolean} 指定结果数据集所在数据源，默认为当前数据源。
     * returnResultRegion - {Boolean} 是否返回分析得到的多边形面数组，默认返回。
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
        if (me.clipRegion) {
            me.clipRegion.destroy();
            me.clipRegion = null;
        }
        me.createResultDataset = null;
        me.resultDatasetName = null;
        me.resultDatasourceName = null;
        me.returnResultRegion = null;
    },

    CLASS_NAME: "SuperMap.REST.ThiessenAnalystParameters"
});