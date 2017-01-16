/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 *@requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.EditFeaturesParameters
 * 数据服务中数据集添加、修改、删除参数类。 
 */
SuperMap.REST.EditFeaturesParameters = SuperMap.Class({
    /** 
     * APIProperty: features
     * {Array(Object)} 当前需要创建或者是修改的要素集。
     */
    features: null,
    
    /** 
     * APIProperty: editType
     * {<SuperMap.REST.EditType>} 要素集更新类型(add、update、delete)，默认为 SuperMap.REST.EditType.ADD.
     */
    editType: SuperMap.REST.EditType.ADD,
    
    /** 
     * APIProperty: IDs
     * {Array(String) 或 Array(Integer)} 执行删除时要素集ID集合。
     */
    IDs: null,
    
    /** 
     * APIProperty: returnContent
     * {Boolean} 要素添加时，isUseBatch 不传或传为 false 的情况下有效。 
     *           true 表示直接返回新创建的要素的 ID 数组;false 表示返回创建的 featureResult 资源的 URI。默认不传时为 false。
     */
    returnContent: false,
    
    /** 
     * APIProperty: isUseBatch
     * {Boolean} 是否使用批量添加要素功能，要素添加时有效。 
     *           批量添加能够提高要素编辑效率。 
     *           true 表示批量添加；false 表示不使用批量添加。默认不传时为 false。
     */
    isUseBatch: false,
    
    /**
     * Constructor: SuperMap.REST.EditFeaturesParameters
     * 数据服务中数据集添加、修改、删除参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * features - {Array(Object)} 当前需要创建或者是修改的要素集。  
     * returnContent - {Boolean} 是返回创建要素的ID数组还是返回featureResult资源的URI。
     * editType - {<SuperMap.REST.EditType>} POST动作类型(ADD、UPDATE、DELETE)，默认为 SuperMap.REST.EditType.ADD。
     * IDs - {Array(String) 或 Array(Integer)} 删除要素时的要素的ID数组。
     */
    initialize: function(options) {
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
        me.features = null;
        me.editType = null;
        me.IDs = null;
        me.returnContent = null;
    },
    
    CLASS_NAME:"SuperMap.REST.EditFeaturesParameters"
});
/**
 * Function: SuperMap.REST.EditFeaturesParameters.toJsonParameters
 * 将 <SuperMap.REST.EditFeaturesParameters> 对象参数转换为 json 字符串。 
 *
 * Parameters:
 * params - {<SuperMap.REST.EditFeaturesParameters>} 地物编辑参数。 
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.REST.EditFeaturesParameters.toJsonParameters = function(params) {
    var geometry,
        feature,
        len,
        features,
        editType = params.editType;

    if(editType === SuperMap.REST.EditType.DELETE) {
        if(params.IDs === null) return;
        
        features = {ids:params.IDs};
    }else {
        if(params.features === null) return; 
        
        len = params.features.length;
        features = [];
        for(var i = 0; i < len; i++) {
            feature = params.features[i];
            feature.geometry = SuperMap.REST.ServerGeometry.fromGeometry(feature.geometry);
            features.push(feature);
        }
    }
    
    return SuperMap.Util.toJSON(features);
};