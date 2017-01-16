/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.DataReturnOption 
 * 数据返回设置类
 */
SuperMap.REST.DataReturnOption = SuperMap.Class({

    /** 
     * APIProperty: expectCount
     * {Number}  设置返回的最大记录数，小于或者等于0时表示返回所有记录数。
     */
    expectCount: 1000,
    
    /**
     * APIProperty: dataset
     * {String} 设置结果数据集标识，当dataReturnMode为 SuperMap.REST.DataReturnMode.DATASET_ONLY
     * 或SuperMap.REST.DataReturnMode.DATASET_AND_RECORDSET时有效，
     * 作为返回数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
     */
    dataset: null,
    
    /**
     * APIProperty: dataReturnMode
     * {<SuperMap.REST.DataReturnMode>} 数据返回模式，默认为SuperMap.REST.DataReturnMode.RECORDSET_ONLY。
     */
    dataReturnMode: SuperMap.REST.DataReturnMode.RECORDSET_ONLY,
    
    /**
     * APIProperty: deleteExistResultDataset
     * {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
     */
    deleteExistResultDataset: true,
    
    /**
     * Constructor: SuperMap.REST.DataReturnOption
     * 数据返回设置类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * expectCount - {Number} 返回的最大记录数。
     * dataset - {String} 设置结果数据集标识，当dataReturnMode为 SuperMap.REST.DataReturnMode.DATASET_ONLY
     或SuperMap.REST.DataReturnMode.DATASET_AND_RECORDSET时有效，作为返回数据集的名称。
     * dataReturnMode - {<SuperMap.REST.DataReturnMode>} 数据返回模式，默认为DataReturnMode.DATASET_ONLY。
     * deleteExistResultDataset - {Boolean} 如果用户命名的结果数据集名称与已有的数据集重名，是否删除已有的数据集。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        me.expectCount = null;
        me.dataset = null;
        me.dataReturnMode = null;
        me.deleteExistResultDataset = null;
    },
    
    CLASS_NAME: "SuperMap.REST.DataReturnOption"
});