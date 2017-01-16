/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/REST/ServerGeometry.js
 */

/**
 * Class: SuperMap.REST.ServerFeature
 * 服务端矢量要素类。
 * 该类描述了服务端返回的矢量要素的相关信息，包括字段和几何信息。
 */
SuperMap.REST.ServerFeature = SuperMap.Class({

    /** 
     * APIProperty: fieldNames
     * {Array(String)} 矢量要素的属性字段名集合。    
     */
    fieldNames: null,
    
    /** 
     * APIProperty: fieldValues
     * {Array(String)} 矢量要素的属性字段值集合。      
     */
    fieldValues: null,
    
    /** 
     * APIProperty: geometry
     * {<SuperMap.REST.ServerGeometry>} 矢量要素的几何信息。      
     */
    geometry: null,
    
    /**
     * Constructor: SuperMap.REST.ServerFeature
     * 服务端矢量要素类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * fieldNames - {Array(String)} 矢量要素的属性字段名集合。
     * fieldValues - {Array(String)} 矢量要素的属性字段值集合。
     * geometry - {<SuperMap.REST.ServerGeometry>} 矢量要素的几何信息。
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
        me.fieldNames = null;
        me.fieldValues = null;
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
    },

    /**
     * APIMethod: toFeature
     * 将服务端矢量要素 ServerFeature 转换为客户端矢量要素 Feature。 
     *
     * Returns
     * {<SuperMap.Feature.Vector>} 转换后的客户端矢量要素。     
     */
    toFeature: function() {
        var names, values, geo,
            attr = {},
            me = this,
			feature;
        
        names = me.fieldNames;
        values = me.fieldValues;
        for(var i in names) {
            attr[names[i]] = values[i];
        }
        if (me.geometry) {
            geo = me.geometry.toGeometry();
        }
        feature = new SuperMap.Feature.Vector(geo,attr);
		if(me.geometry&&me.geometry.id)feature.fid = me.geometry.id;
		
		return feature;
    },
    
    CLASS_NAME: "SuperMap.REST.ServerFeature"
});

/**
 * Function: SuperMap.REST.ServerFeature.fromJson
 * 将 JSON 对象表示服务端矢量要素转换为 ServerFeature  
 *
 * Parameters:
 * jsonObject - {Object} 要转换的 JSON 对象。 
 *
 * Returns:
 * {SuperMap.REST.ServerFeature} 转化后的 ServerFeature 对象。
 */
SuperMap.REST.ServerFeature.fromJson = function(jsonObject) {
    var me = this,
        geo = null;
    if (!jsonObject) {    
        return;
    }
    geo = jsonObject.geometry;
    if (geo) {
        geo = SuperMap.REST.ServerGeometry.fromJson(geo);
    }
    return new SuperMap.REST.ServerFeature({
        fieldNames: jsonObject.fieldNames,
        fieldValues: jsonObject.fieldValues,
        geometry: geo
    });
};