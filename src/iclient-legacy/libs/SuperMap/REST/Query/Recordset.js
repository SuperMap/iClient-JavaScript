/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Feature/Vector.js
 */

/**
 * Class: SuperMap.REST.Recordset
 * 查询结果记录集
 * 将查询出来的地物按照图层进行划分，一个查询记录集存放一个图层的查询结果，
 * 即查询出的所有地物要素。
 */
SuperMap.REST.Recordset = SuperMap.Class({
    
    /** 
     * APIProperty: datasetName
     * {String} 被查数据集或图层的名称。  
     */
    datasetName: null,
    
    /** 
     * APIProperty: fieldCaptions
     * {Array(String)} 记录集中所有字段的别名。
     * 例如在属性表中有一个名为 Area 属性字段，在属性表中标题为“面积”，则“面积”即为该字段的别名。   
     */
    fieldCaptions: null,
    
    /** 
     * APIProperty: fields
     * {Array(String)} 记录集中所有字段的名称。
     * 例如在属性表中有一个名为 Area 属性字段，在属性表中标题为“面积”，则 Area 即为该字段的名称。   
     */
    fields: null,
    
    /** 
     * APIProperty: fieldTypes
     * {Array(String)} 记录集中所有字段类型。
     */
    fieldTypes: null,
    
    /** 
     * APIProperty: features
     * {Array(<SuperMap.Feature.Vector>)} 记录集中所有地物要素。 
     */
    features: null,

    /**
     * Constructor: SuperMap.REST.Recordset
     * 查询结果记录集构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * datasetName - {String} 被查数据集或图层的名称。
     * fieldCaptions - {Array(String)} 记录集中所有字段的别名。
     * fields - {Array(String)} 记录集中所有字段的名称。
     * fieldTypes - {Array(String)} 记录集中所有字段类型。
     * features - {Array(<SuperMap.Feature.Vector>)} 记录集中所有地物要素。
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
        me.datasetName = null;
        me.fieldCaptions = null;
        me.fields = null;
        me.fieldTypes = null;
        if (me.features) {
            for (var i=0,features=me.features,len=features.length; i<len; i++) {
                features[i].destroy();
            }
            me.features = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.Recordset"
});

/**
 * Function: SuperMap.REST.Recordset.fromJson
 * 将 JSON 对象表示的查询结果记录集转化为 Recordset 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的查询结果记录集。 
 *
 * Returns:
 * {SuperMap.REST.Recordset} 转化后的 Recordset 对象。
 */
SuperMap.REST.Recordset.fromJson = function (jsonObject){
    if (!jsonObject) {
        return;
    }
    var feature = null,
        features = null;
    if (jsonObject.features) {
        features = [];
        for (var i=0,fe=jsonObject.features,len=fe.length; i<len; i++) {
            feature = SuperMap.REST.ServerFeature.fromJson(fe[i]).toFeature();
            features.push(feature);
        }    
    }
    return new SuperMap.REST.Recordset({
        datasetName: jsonObject.datasetName,
        fieldCaptions: jsonObject.fieldCaptions,
        fields: jsonObject.fields,
        fieldTypes: jsonObject.fieldTypes,
        features: features
    });    
};