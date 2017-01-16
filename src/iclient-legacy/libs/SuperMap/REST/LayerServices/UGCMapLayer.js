/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Layer.js
 */

/**
 * Class: SuperMap.REST.UGCMapLayer
 * UGC 地图图层类。
 * 
 * Inherits from:
 *  - <SuperMap.REST.UGCLayer> 
 */
SuperMap.REST.UGCMapLayer = SuperMap.Class(SuperMap.REST.UGCLayer, {
     
    /** 
     * APIProperty: completeLineSymbolDisplayed
     * {Boolean} 是否显示完整线型。 
     */
    completeLineSymbolDisplayed: null,  
     
    /** 
     * APIProperty: maxScale
     * {Number} 地图最大比例尺。  
     */
    maxScale: null, 
     
    /** 
     * APIProperty: minScale
     * {Number} 地图最小比例尺。  
     */
    minScale: null,  
     
    /** 
     * APIProperty: minVisibleGeometrySize
     * {Number} 几何对象的最小可见大小，以像素为单位。 
     */
    minVisibleGeometrySize: null, 
     
    /** 
     * APIProperty: opaqueRate
     * {Integer} 图层的不透明度。 
     */
    opaqueRate: null, 
    /** 
     * APIProperty: symbolScalable
     * {Boolean} 是否允许图层的符号大小随图缩放。
     */
    symbolScalable: null, 
    /** 
     * APIProperty: symbolScale
     * {Number} 图层的符号缩放基准比例尺。  
     */
    symbolScale: null, 
	
	/** 
     * APIProperty: overlapDisplayed
     * {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。  
     */
    overlapDisplayed: null,
	
	/** 
     * APIProperty: overlapDisplayedOptions
     * {<SuperMap.REST.OverlapDisplayedOptions>} 地图的压盖过滤显示选项，当 overlapDisplayed 为 false 时有效。  
     */
    overlapDisplayedOptions: null,

    /**
     * Constructor: SuperMap.REST.UGCMapLayer
     * UGC 地图图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * completeLineSymbolDisplayed - {Boolean} 是否显示完整线型。 
     * maxScale - {Number} 地图最大比例尺。 
     * minScale - {Number} 地图最小比例尺。
     * minVisibleGeometrySize - {Number} 几何对象的最小可见大小，以像素为单位。
     * opaqueRate - {Integer} 图层的不透明度。
     * symbolScalable - {Boolean} 是否允许图层的符号大小随图缩放。 
     * symbolScale - {Number} 图层的符号缩放基准比例尺。 
     * overlapDisplayed - {Boolean} 地图对象在同一范围内时，是否重叠显示，默认为False。
     * overlapDisplayedOptions - {<SuperMap.REST.OverlapDisplayedOptions>} 地图的压盖过滤显示选项，当
     * overlapDisplayed 为 false 时有效。  
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.REST.UGCLayer.prototype.initialize.apply(this, [options]);
        //SuperMap.Util.extend(this, options);
    },
    
    destroy: function() {
        SuperMap.REST.UGCLayer.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },
    
    /**
     * Method: fromJson
     * 将服务端JSON对象转换成当前客户端对象
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     */
    fromJson: function(jsonObject){
        SuperMap.REST.UGCLayer.prototype.fromJson.apply(this, [jsonObject]);
    },
    
    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var jsonObject = SuperMap.REST.UGCLayer.prototype.toServerJSONObject.apply(this, arguments);;
        return jsonObject;
    },
    
    CLASS_NAME: "SuperMap.REST.UGCMapLayer"
});
