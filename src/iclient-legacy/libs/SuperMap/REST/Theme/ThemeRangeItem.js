/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerStyle.js
 */
 
/**
 * Class: SuperMap.REST.ThemeRangeItem
 * 范围分段专题图子项类。
 * 在分段专题图中，字段值按照某种分段模式被分成多个范围段，每个范围段即为一个子项，同一范围段的要素属于同一个分段专题图子项。
 * 每个子项都有其分段起始值、终止值、名称和风格等。每个分段所表示的范围为[start, end)。
 */
SuperMap.REST.ThemeRangeItem = SuperMap.Class({
    
    /** 
     * APIProperty: caption
     * {String} 分段专题图子项的标题。
     */
    caption: null,
    
    /** 
     * APIProperty: end
     * {Number} 分段专题图子项的终止值，即该段专题值范围的最大值，默认值为 0。
     * 如果该子项是分段中最后一个子项，则该终止值应大于分段字段（ThemeRange 类的 rangeExpression 属性）的最大值，若该终止值小于分段字段最大值，则剩余部分由内部随机定义其颜色；如果不是最后一项，该终止值必须与其下一子项的起始值相同，否则系统抛出异常；
     * 如果设置了范围分段模式和分段数，则会自动计算每段的范围[start, end)，故无需设置[start, end)；当然可以设置，那么结果就会按您设置的值对分段结果进行调整。
     */
    end: 0,    
    
    /** 
     * APIProperty: start
     * {Number} 分段专题图子项的起始值，即该段专题值范围的最小值，默认值为 0。
     * 如果该子项是分段中第一个子项，那么该起始值就是分段的最小值；如果子项的序号大于等于1的时候，该起始值必须与前一子项的终止值相同，否则系统会抛出异常。
     * 如果设置了范围分段模式和分段数，则会自动计算每段的范围[start, end)，故无需设置[start, end)；当然可以设置，那么结果就会按您设置的值对分段结果进行调整。
     */
    start: 0,
    
    /** 
     * APIProperty: style
     * {<SuperMap.REST.ServerStyle>} 分段专题图子项的风格。
     * 每一个分段专题图子项都对应一种显示风格。
     */
    style: null,
    
    /** 
     * APIProperty: visible
     * {Boolean} 分段专题图子项是否可见。
     * 默认为 true。
     */
    visible: true,
    
    /**
     * Constructor: SuperMap.REST.ThemeRangeItem 
     * 范围分段专题图子项类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * caption - {String} 分段专题图子项的标题。
     * end - {Number} 分段专题图子项的终止值。
     * start - {Number} 分段专题图子项的起始值。
     * style - {<SuperMap.REST.ServerStyle>} 分段专题图子项的风格。
     * visible - {Boolean} 分段专题图子项是否可见。
     */
    initialize: function(options) {
        var me = this;
        me.style = new SuperMap.REST.ServerStyle();
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
        me.caption = null;
        me.end = null;
        me.start = null;

        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    },
    
    /**
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function(){
        var obj = {};
        obj = SuperMap.Util.copyAttributes(obj, this);
        if(obj.style){
            if(obj.style.toServerJSONObject){
                obj.style = obj.style.toServerJSONObject();
            }
        }
        return obj;
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeRangeItem"
});
SuperMap.REST.ThemeRangeItem.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeRangeItem();
    SuperMap.Util.copy(res, obj);
    res.style = SuperMap.REST.ServerStyle.fromJson(obj.style);
    return res;
}
