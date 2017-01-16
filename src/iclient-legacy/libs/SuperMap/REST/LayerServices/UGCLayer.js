/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Bounds.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.UGCLayer
 * UGC 图层类。
 */
SuperMap.REST.UGCLayer = SuperMap.Class({
     
    /** 
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 图层范围。  
     */
    bounds: null,  
     
    /** 
     * APIProperty: caption
     * {String} 图层的标题。  
     */
    caption: null,  
     
    /** 
     * APIProperty: description
     * {String} 图层的描述信息。 
     */
    description: null,  
     
    /** 
     * APIProperty: name
     * {String} 图层的名称。  
     */
    name: null,
     
    /** 
     * APIProperty: queryable
     * {Boolean} 图层中的对象是否可以查询。  
     */
    queryable: null,
     
    /** 
     * APIProperty: subUGCLayers
     * {Array} 子图层集。  
     */
    subLayers: null,  
    
    /** 
     * APIProperty: type
     * {<SuperMap.REST.UGCLayerType>} 图层类型。  
     */
    type: null, 
     
    /** 
     * APIProperty: visible
     * {Boolean} 图层是否可视。
     */
    visible: null,
    /**
     * Constructor: SuperMap.REST.UGCMapLayer
     * UGC 图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bounds - {<SuperMap.Bounds>} 图层范围。 
     * caption - {String} 图层的标题。
     * description - {String} 图层的描述信息。 
     * name - {String} 图层的名称。
     * queryable - {Boolean} 图层中的对象是否可以查询。 
     * subUGCLayers - {Boolean} 是否允许图层的符号大小随图缩放。 
     * type - {<SuperMap.REST.UGCLayerType>} 图层类型。 
     * visible - {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。
     */
    initialize: function(options) {
        options = options ? options : {};
        SuperMap.Util.extend(this, options);
    },
    
    destroy: function() {
        var me = this;
        SuperMap.Util.reset(me);
    },
    
    /**
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson: function(jsonObject){
        jsonObject = jsonObject ? jsonObject : {};
        SuperMap.Util.extend(this, jsonObject);
        var b = this.bounds;
        if(b) {
            this.bounds = new SuperMap.Bounds(b.leftBottom.x, b.leftBottom.y,b.rightTop.x,b.rightTop.y);
        }
    },
    
    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var jsonObject = {};
        jsonObject = SuperMap.Util.copyAttributes(jsonObject, this);
        if(jsonObject.bounds){
            if(jsonObject.bounds.toServerJSONObject){
                jsonObject.bounds = jsonObject.bounds.toServerJSONObject();
            }
        }
        return jsonObject;
    },

    CLASS_NAME: "SuperMap.REST.UGCLayer"
});
