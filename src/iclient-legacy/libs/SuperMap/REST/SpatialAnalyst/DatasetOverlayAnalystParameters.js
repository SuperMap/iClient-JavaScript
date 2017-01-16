/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/FilterParameter.js
 * @requires SuperMap/REST/SurfaceAnalyst/DataReturnOption.js
 * @requires SuperMap/REST/SpatialAnalyst/OverlayAnalystParameters.js
 */

/**
 * Class: SuperMap.REST.DatasetOverlayAnalystParameters
 * 数据集叠加分析参数类
 *
 * Inherits from:
 *  - <SuperMap.REST.OverlayAnalystParameters> 
 */
SuperMap.REST.DatasetOverlayAnalystParameters = SuperMap.Class(SuperMap.REST.OverlayAnalystParameters, {

    /** 
     * APIProperty: operateDataset
     * {String} 叠加分析中操作数据集的名称。
     */
    operateDataset: null,

    /** 
     * APIProperty: operateDatasetFields
     * {Array(String} 叠加分析中操作数据集保留在结果数据集中的字段名列表。
     */
    operateDatasetFields: null,

    /** 
     * APIProperty: operateDatasetFilter
     * {<SuperMap.REST.FilterParameter>} 设置操作数据集中空间对象过滤条件。
     */
    operateDatasetFilter: null,

    /** 
     * APIProperty: operateRegions
     * {Array(<SuperMap.Geometry>)}操作面对象集合，表示与这些面对象进行叠加分析。
     * 与 operateDataset 参数互斥，冲突时以operateDataset 为准。
     */
    operateRegions: null,


    /** 
     * APIProperty: sourceDataset
     * {String} 叠加分析中源数据集的名称。必设字段。 
     */
    sourceDataset: null,

    
    /** 
     * APIProperty: sourceDatasetFields
     * {Array(String} 叠加分析中源数据集保留在结果数据集中的字段名列表。
     */
    sourceDatasetFields: null,


    /** 
     * APIProperty: filterQueryParameter
     * {<SuperMap.REST.FilterParameter>} 设置源数据集中空间对象过滤条件。
     */
    sourceDatasetFilter: null,

   
    /** 
     * APIProperty: tolerance
     * {Integer} 容限。
     */
    tolerance: 0,
    
    /** 
     * APIProperty: resultSetting
     * {<SuperMap.REST.DataReturnOption>} 结果返回设置类。
     */    
    resultSetting: null,

    /**
     * Constructor: SuperMap.REST.DatasetOverlayAnalystParameters 
     * 数据集叠加分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties: 
     * operateDataset - {String} 叠加分析中操作数据集的名称。必设字段。
     * operateDatasetFields - {Array(String} 叠加分析中操作数据集保留在结果数据集中的字段名列表。
     * operateDatasetFilter - {<SuperMap.REST.FilterParameter>} 设置操作数据集中空间对象过滤条件。
     * operateRegions - {Array(<SuperMap.Geometry>)} 操作区域。设置了操作区域后，仅对该区域内的对象进行分析。 
     * sourceDataset - {String} 叠加分析中源数据集的名称。必设字段。
     * sourceDatasetFields - {Array(String} 叠加分析中源数据集保留在结果数据集中的字段名列表。
     * sourceDatasetFilter - {<SuperMap.REST.FilterParameter>} 设置源数据集中空间对象过滤条件。
     * tolerance - {Integer} 容限。
     * operation - {<SuperMap.REST.OverlayOperationType>} 叠加操作枚举值。
     * resultSetting - {<SuperMap.REST.DataReturnOption>} 结果返回设置类。
     */
    initialize: function (options) {
        var me = this;
        me.operateDatasetFields = new Array();
        me.operateDatasetFilter = new SuperMap.REST.FilterParameter();
        me.operateRegions = new Array();
        me.sourceDatasetFields = new Array();
        me.sourceDatasetFilter = new SuperMap.REST.FilterParameter();
        me.resultSetting = new SuperMap.REST.DataReturnOption();
        
        SuperMap.REST.OverlayAnalystParameters.prototype.initialize.apply(this, arguments);
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
        SuperMap.REST.OverlayAnalystParameters.prototype.destroy.apply(this, arguments);

        var me = this;
        me.operateDataset = null;
        me.operateDatasetFields = null;
        if (me.operateDatasetFilter) {
            me.operateDatasetFilter.destroy();
            me.operateDatasetFilter = null;
        }
        if (me.operateRegions) {
            for (var i = 0, opRegions = me.operateRegions, len = opRegions.length; i < len; i++) {
                opRegions[i].destroy();
            }
            me.operateRegions = null;
        }
        me.sourceDataset = null;
        me.sourceDatasetFields = null;
        if (me.sourceDatasetFilter) {
            me.sourceDatasetFilter.destroy();
            me.sourceDatasetFilter = null;
        }
        me.tolerance = null;
        if (me.resultSetting) {
            me.resultSetting.destroy();
            me.resultSetting = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.DatasetOverlayAnalystParameters"
});

SuperMap.REST.DatasetOverlayAnalystParameters.toObject = function (datasetOverlayAnalystParameters, tempObj) {
    for (var name in datasetOverlayAnalystParameters) {
        if (name === "sourceDataset") {
        }
        else if (name === "operateRegions") {
            tempObj.operateRegions = new Array();
			var ors = datasetOverlayAnalystParameters.operateRegions;
            for (var index in ors) {
				if(ors.hasOwnProperty(index)){    //icl542
					tempObj.operateRegions[index] = SuperMap.REST.ServerGeometry.fromGeometry(ors[index]);
				}               
            }
        }
        else if (name === "resultSetting") {
            tempObj.dataReturnOption = datasetOverlayAnalystParameters.resultSetting;
        }
        else {
            tempObj[name] = datasetOverlayAnalystParameters[name];
        }
    }
};