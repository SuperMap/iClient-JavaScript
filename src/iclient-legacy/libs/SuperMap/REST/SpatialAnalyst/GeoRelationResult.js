/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
 
/**
 * Class: SuperMap.REST.GeoRelationResult
 * 空间关系分析结果类。
 * 空间关系分析服务返回一个由 <SuperMap.REST.GeoRelationResult> 类型数据组成的数组。
 */
SuperMap.REST.GeoRelationResult = SuperMap.Class({
    
    /**
     * APIProperty: count
     * {Integer} 在操作数据集中与源空间对象满足指定空间关系的对象个数。
     */
    count: null,
    
    /**
     * APIProperty: result
     * {Array(Object)} 在操作数据集中与源空间对象满足指定空间关系的对象数组或者对象ID数组。
     */
    result: null,
    
    /**
     * APIProperty: source
     * {Object} 源空间对象或源空间对象ID。
     */
    source: null,
    
    /**
     * APIProperty: isFeatureResult
     * {Boolean} 标记返回的结果是否是feature对象。如果为false则表明存储的是ID信息。
     */
    isFeatureResult: null,
    
    /**
     * Constructor: SuperMap.REST.GeoRelationResult
     * 空间关系分析服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * count - {Integer} 在操作数据集中与源空间对象满足指定空间关系的对象个数。
     * result - {Array(Object)} 在操作数据集中与源空间对象满足指定空间关系的对象数组或者对象ID数组。
     * source - {Object} 源空间对象或源空间对象ID。
     * isFeatureResult - {Boolean} 标记返回的结果是否是feature对象。如果为false则表明存储的是ID信息。
     */
    initialize: function(options){
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * AIPMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function(){
        var me = this, i, len;
        me.count = null;
        if(me.isFeatureResult){
            if(me.result){
                len = me.result.length;
                for(i = 0; i < len; i++){
                    me.result[i].destroy();
                    me.result[i] = null;
                }
            }
            if(me.source){
                me.source.destroy();
            }
        }
        me.result = null;
        me.source = null;
        me.isFeatureResult = null;
    },
     
    CLASS_NAME: "SuperMap.REST.GeoRelationResult"
});

/**
 * Function: SuperMap.REST.GeoRelationResult.fromJson
 * 将 JSON 对象表示的空间关系分析结果转换为 GeoRelationResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} 要转换的 JSON 对象。 
 *
 * Returns:
 * {SuperMap.REST.GeoRelationResult} 转化后的 GeoRelationResult 对象。
 */
SuperMap.REST.GeoRelationResult.fromJson = function(jsonObject) {
    if(!jsonObject){
        return;
    }
    //返回数据集对象的结果信息
    var source, isFeatureResult, result = [];
    if(jsonObject.result && jsonObject.result instanceof Array){
        var i, obj, len = jsonObject.result.length;
        for(i = 0; i < len; i++){
            obj = jsonObject.result[i];
            if(typeof obj === "object"){
                result.push(SuperMap.REST.ServerFeature.fromJson(obj).toFeature())
            }else{
                result.push(obj);
            }
        }
    }
    if(typeof jsonObject.source === "object"){
        source = SuperMap.REST.ServerFeature.fromJson(jsonObject.source).toFeature();
        isFeatureResult = true;
    }else{
        source = jsonObject.source;
        isFeatureResult = false;
    }
    return new SuperMap.REST.GeoRelationResult({
                "count": jsonObject.count, 
                "result": result, 
                "source": source,
                "isFeatureResult": isFeatureResult
            });
};