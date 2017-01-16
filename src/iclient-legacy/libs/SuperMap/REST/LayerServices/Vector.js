/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/REST/ServerStyle.js
 * @requires SuperMap/REST/UGCSubLayer.js
 */

/**
 * Class: SuperMap.REST.Vector
 * UGC 矢量图层类。
 * 
 * Inherits from:
 *  - <SuperMap.REST.UGCSubLayer> 
 */
SuperMap.REST.Vector = SuperMap.Class(SuperMap.REST.UGCSubLayer, {
 
    /** 
     * APIProperty: style
     * {<SuperMap.REST.ServerStyle>} 矢量图层的风格。  
     */
    style: null,  

    /**
     * Constructor: SuperMap.REST.Vector
     * UGC 矢量图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * style - {<SuperMap.REST.ServerStyle>} 矢量图层的风格。 
     */      
    initialize: function(options) {
        options = options || {};
        SuperMap.REST.UGCSubLayer.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。  
     */
    destroy: function() {
       SuperMap.REST.UGCSubLayer.prototype.destroy.apply(this, arguments);
       SuperMap.Util.reset(this);
    },
    
    /**
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson: function(jsonObject){
        SuperMap.REST.UGCSubLayer.prototype.fromJson.apply(this, [jsonObject]);
        var sty = this.style;
        if(sty) {
            this.style = new SuperMap.REST.ServerStyle(sty);
        }
    },
    
    /**
     * APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var jsonObject = SuperMap.REST.UGCSubLayer.prototype.toServerJSONObject.apply(this, arguments);;
        if(jsonObject.style){
            if(jsonObject.style.toServerJSONObject){
                jsonObject.style = jsonObject.style.toServerJSONObject();
            }
        }
        return jsonObject;
    },
    CLASS_NAME: "SuperMap.REST.Vector"
});
