/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/UGCSubLayer.js
 * @requires SuperMap/REST/ServerColor.js
 */

/**
 * Class: SuperMap.REST.Image
 * UGC 影像图层类。
 * 
 * Inherits from:
 *  - <SuperMap.REST.UGCSubLayer> 
 */
SuperMap.REST.Image = SuperMap.Class(SuperMap.REST.UGCSubLayer, {
    
    /**
     * APIProperty: brightness
     * {Integer} 影像图层的亮度。
     */
    brightness: null,
    
    /**
     * APIProperty: colorSpaceType
     * {<SuperMap.REST.ColorSpaceType>} 返回影像图层的色彩显示模式。
     */
    colorSpaceType: null,
    
    /**
     * APIProperty: contrast
     * {Integer} 影像图层的对比度。
     */
    contrast: null, 
    
    /**
     * APIProperty: displayBandIndexes
     * {Array(Integer)} 返回当前影像图层显示的波段索引。
     */
    displayBandIndexes: null, 
    
    /**
     * APIProperty: transparent
     * {Boolean} 是否背景透明。
     */
    transparent: null, 
    
    /**
     * APIProperty: transparentColor
     * {<SuperMap.REST.ServerColor>} 返回背景透明色。
     */
    transparentColor: null, 
   
    /**
     * APIProperty: transparentColorTolerance
     * {Integer} 背景透明色容限。
     */
    transparentColorTolerance: null, 
 
    /**
     * Constructor: SuperMap.REST.Image
     * UGC 影像图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * colorSpaceType - {<SuperMap.REST.ColorSpaceType>} 返回影像图层的色彩显示模式。  
     * brightness - {Integer} 影像图层的亮度。 
     * displayBandIndexes - {Array(Integer)} 返回当前影像图层显示的波段索引。
     * contrast - {Integer} 影像图层的对比度。 
     * transparent - {Boolean} 是否背景透明。
     * transparentColor - {<SuperMap.REST.ServerColor>} 返回背景透明色。
     * transparentColorTolerance - {Integer} 背景透明色容限。
     */     

    initialize: function(options) {
        options = options || {};
        SuperMap.REST.UGCSubLayer.prototype.initialize.apply(this, [options]);
    },
    
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
        if(this.transparentColor){
            this.transparentColor = new SuperMap.REST.ServerColor(this.transparentColor.red, 
                this.transparentColor.green, 
                this.transparentColor.blue);
        }
    },
    
    /**
     * APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var jsonObject = SuperMap.REST.UGCSubLayer.prototype.toServerJSONObject.apply(this, arguments);;
        return jsonObject;
    },
    
    CLASS_NAME: "SuperMap.REST.Image"
});
