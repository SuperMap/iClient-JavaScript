/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/ServerColor.js
 * @requires SuperMap/REST/ServerStyle.js
 */

/**
 * Class: SuperMap.REST.Grid
 * UGC 栅格图层类。
 * 
 * Inherits from:
 *  - <SuperMap.REST.UGCSubLayer> 
 */
SuperMap.REST.Grid = SuperMap.Class(SuperMap.REST.UGCSubLayer, {  
    /** 
     * APIProperty: colorDictionarys
     * {Array(<SuperMap.REST.ColorDictionary>)} 颜色对照表对象。  
     */
    colorDictionarys: null,
    
    /** 
     * APIProperty: brightness
     * {Integer} Grid 图层的亮度。  
     */
    brightness: null, 
     
    /** 
     * APIProperty: colorGradientType
     * {<SuperMap.REST.ColorGradientType>}   
     */
    colorGradientType: null,
     
    /** 
     * APIProperty: colors
     * {<SuperMap.REST.ServerColor>} 颜色表对象。  
     */
    colors: null, 
     
    /** 
     * APIProperty: contrast
     * {Integer} Grid 图层的对比度。 
     */
    contrast: null, 
     
    /** 
     * APIProperty: dashStyle
     * {<SuperMap.REST.ServerStyle>} 栅格数据集特殊值数据的颜色。  
     */
    dashStyle: null, 
    
    /** 
     * APIProperty: gridType
     * {<SuperMap.REST.GridType>} 格网类型。  
     */
    gridType: null, 
     
    /** 
     * APIProperty: horizontalSpacing
     * {Number} 格网水平间隔大小。 
     */
    horizontalSpacing: null,  
     
    /** 
     * APIProperty: sizeFixed
     * {Boolean} 格网是否固定大小，如果不固定大小，则格网随着地图缩放。  
     */
    sizeFixed: null,  
     
    /** 
     * APIProperty: solidStyle
     * {<SuperMap.REST.ServerStyle>} 格网实线的样式。  
     */
    solidStyle: null, 
     
    /** 
     * APIProperty: specialColor
     * {<SuperMap.REST.ServerColor>} 栅格数据集无值数据的颜色。  
     */
    specialColor: null,  
     
    /** 
     * APIProperty: specialValue
     * {Number} 图层的特殊值。  
     */
    specialValue: null, 
     
    /** 
     * APIProperty: specialValueTransparent
     * {Boolean} 图层的特殊值（specialValue）所处区域是否透明。  
     */
    specialValueTransparent: null,  
     
    /** 
     * APIProperty: verticalSpacing
     * {Number} 格网垂直间隔大小。  
     */
    verticalSpacing: null, 
 
    /**
     * Constructor: SuperMap.REST.Grid
     * UGC 栅格图层类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * colorDictionary - {Array(Object)} 颜色对照表对象。  
     * brightness - {Integer} Grid 图层的亮度。 
     * colorGradientType - {Boolean} 文本压盖时是否显示压盖的文本对象。
     * colors - {<SuperMap.REST.ServerColor>} 颜色表对象。 
     * contrast - {Integer} Grid 图层的对比度。 
     * gridType - {<SuperMap.REST.GridType>} 格网类型。
     * horizontalSpacing - {Number} 格网水平间隔大小。
     * sizeFixed - {Boolean} 格网是否固定大小，如果不固定大小，则格网随着地图缩放。
     * solidStyle - {<SuperMap.REST.ServerStyle>} 格网实线的样式。 
     * specialColor - {<SuperMap.REST.ServerColor>} 栅格数据集无值数据的颜色。
     * specialValue - {Number} 图层的特殊值。
     * specialValueTransparent - {Boolean} 图层的特殊值（specialValue）所处区域是否透明。
     * verticalSpacing - {Number} 格网垂直间隔大小。
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
        if(this.specialColor) {
            this.specialColor = new SuperMap.REST.ServerColor(this.specialColor.red, 
                this.specialColor.green, 
                this.specialColor.blue);
        }
        if(this.colors) {
            var colors = [],
                color;
            for(var i in this.colors) {
                color = this.colors[i];
                colors.push(new SuperMap.REST.ServerColor(color.red,color.green,color.blue));
            }
            this.colors = colors;
        }
        if(this.dashStyle){
            this.dashStyle = new SupweMap.REST.ServerStyle(this.dashStyle);
        }
        if(this.solidStyle){
            this.solidStyle = new SupweMap.REST.ServerStyle(this.solidStyle);
        }
		if(this.colorDictionary) {
			var colorDics = [],
				colorDic;
			for(var key in this.colorDictionary) {
				colorDic = this.colorDictionary[key];
				colorDics.push(new SuperMap.REST.ColorDictionary({elevation:key,color:colorDic}));
			}
			this.colorDictionarys = colorDics;
		}
		delete this.colorDictionary;
    },
    
    /**
     * APIMethod: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var jsonObject = SuperMap.REST.UGCSubLayer.prototype.toServerJSONObject.apply(this, arguments);;
        
        if(jsonObject.dashStyle){
            if(jsonObject.dashStyle.toServerJSONObject){
                jsonObject.dashStyle = jsonObject.dashStyle.toServerJSONObject();
            }
        }
        if(jsonObject.solidStyle){
            if(jsonObject.solidStyle.toServerJSONObject){
                jsonObject.solidStyle = jsonObject.solidStyle.toServerJSONObject();
            }
        }
        return jsonObject;
    },
    
    CLASS_NAME: "SuperMap.REST.Grid"
});
