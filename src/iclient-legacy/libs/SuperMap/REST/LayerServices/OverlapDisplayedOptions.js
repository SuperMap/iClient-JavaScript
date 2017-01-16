/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * 
 */

/**
 * Class: SuperMap.REST.OverlapDisplayedOptions
 * 地图压盖过滤显示选项。
 * 在文本或专题图元素显示较密集的区域，文本之间或专题元素之间会发生相互压盖的现象，
 * 该类可以分别控制各种类型的对象的压盖显示情况，进而很好地处理地图中各种类型对象的压盖显示问题。
 */
SuperMap.REST.OverlapDisplayedOptions = SuperMap.Class({
     
    /** 
     * APIProperty: allowPointOverlap
     * {Boolean} 点和点压盖时是否显示压盖的点对象。默认值为true。
     */
    allowPointOverlap: true,  
     
    /** 
     * APIProperty: allowPointWithTextDisplay
     * {Boolean} 标签和相应普通图层上的点是否一起过滤显示,如果过滤显示，  
     * 只以图层集合中对应数据集的索引最小的图层的点风格来绘制点。默认值为true。  
     */
    allowPointWithTextDisplay: true, 
     
    /** 
     * APIProperty: allowTextOverlap
     * {Boolean} 文本压盖时是否显示压盖的文本对象。默认值为false。
     */
    allowTextOverlap: false,  
     
    /** 
     * APIProperty: allowTextAndPointOverlap
     * {Boolean} 文本和点压盖时是否显示压盖的文本或点对象(此属性不处理文本之间的压盖和点之间的压盖)。默认值为true。
     */
    allowTextAndPointOverlap: true, 
     
    /** 
     * APIProperty: allowThemeGraduatedSymbolOverlap
     * {Boolean} 等级符号元素压盖时是否显示压盖的等级符号元素。默认值为false。
     */
    allowThemeGraduatedSymbolOverlap: false, 
    /** 
     * APIProperty: allowThemeGraphOverlap
     * {Boolean} 统计专题图元素压盖时是否显示压盖的统计专题图元素。默认值为false。
     */
    allowThemeGraphOverlap: false, 
    /** 
     * APIProperty: horizontalOverlappedSpaceSize
     * {Number} 两个对象之间的横向压盖间距，单位为0.1毫米，跟 verticalOverlappedSpaceSize 结合使用， 
     * 当两个对象的横向间距小于该值，且纵向间距小于 verticalOverlappedSpaceSize 时认为压盖。默认值为0。
     */
    horizontalOverlappedSpaceSize: 0, 
    
    /** 
     * APIProperty: verticalOverlappedSpaceSize
     * {Number} 两个对象之间的纵向压盖间距，单位为0.1毫米，跟 horizontalOverlappedSpaceSize 结合使用，
     * 当两个对象的纵向间距小于该值，且横向间距小于 horizontalOverlappedSpaceSize 时认为压盖。默认值为0。  
     */
    verticalOverlappedSpaceSize: 0,
    /**
     * Constructor: SuperMap.REST.OverlapDisplayedOptions
     * 服务端几何对象类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * allowPointOverlap - {Boolean} 点和点压盖时是否显示压盖的点对象。默认值为true。 
     * allowPointWithTextDisplay - {Boolean} 标签和相应普通图层上的点是否一起过滤显示,如果过滤显示，  
     * 只以图层集合中对应数据集的索引最小的图层的点风格来绘制点。默认值为true。
     * allowTextOverlap - {Boolean} 文本压盖时是否显示压盖的文本对象。默认值为false。
     * allowTextAndPointOverlap - {Boolean} 文本和点压盖时是否显示压盖的文本或点对象(此属性不处理文本之间的压盖和点之间的压盖)。默认值为true。
     * allowThemeGraduatedSymbolOverlap - {Boolean} 等级符号元素压盖时是否显示压盖的等级符号元素。默认值为false。 
     * allowThemeGraphOverlap - {Number} 统计专题图元素压盖时是否显示压盖的统计专题图元素。默认值为false。
     * horizontalOverlappedSpaceSize - {Number} 两个对象之间的横向压盖间距，单位为0.1毫米，跟  
     * verticalOverlappedSpaceSize 结合使用， 
     * 当两个对象的横向间距小于该值，且纵向间距小于 verticalOverlappedSpaceSize 时认为压盖。默认值为0。
     * verticalOverlappedSpaceSize - {Number} 两个对象之间的纵向压盖间距，单位为0.1毫米，跟   
     * horizontalOverlappedSpaceSize 结合使用，
     * 当两个对象的纵向间距小于该值，且横向间距小于 horizontalOverlappedSpaceSize 时认为压盖。默认值为0。 
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },
    
    destroy: function() {
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
    
    /**
     * Method: toString
     * 转换成对应的 tileImage请求瓦片时overlapDisplayedOptions参数。
     */
    toString: function(){
        var jsonObject = SuperMap.REST.UGCLayer.prototype.toServerJSONObject.apply(this, arguments);
        var str = "{";
        for(var attr in jsonObject) {
            if(jsonObject.hasOwnProperty(attr)) {
                str += "'" + attr + "':" + jsonObject[attr] + ",";
            }
        }
        str = str.substr(0, str.length - 1);
        str += "}";
        return str;
    },
    
    CLASS_NAME: "SuperMap.REST.OverlapDisplayedOptions"
});
