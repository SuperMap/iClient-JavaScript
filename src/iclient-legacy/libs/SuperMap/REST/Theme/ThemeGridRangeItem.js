/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerColor.js
 */

/**
 * Class: SuperMap.REST.ThemeGridRangeItem
 * 栅格分段专题图子项类。
 * 在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。
 * 本类用来设置每个范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。
 */
SuperMap.REST.ThemeGridRangeItem = SuperMap.Class({

    /**
     * APIProperty: caption
     * {String} 栅格分段专题图子项的标题。
     */
    caption: null,
    /**
     * APIProperty:color
     * {ServerColor} 栅格分段专题图中每一个分段专题图子项的对应的颜色。
     */
    color:null,
    /**
     * APIProperty: end
     * {Number} 栅格分段专题图子项的终止值，即该段专题值范围的最大值，默认值为 0。
     */
    end: 0,

    /**
     * APIProperty: start
     * {Number} 栅格分段专题图子项的起始值，即该段专题值范围的最小值，默认值为 0。
     */
    start: 0,


    /**
     * APIProperty: visible
     * {Boolean} 栅格分段专题图子项是否可见。
     * 默认为 true。
     */
    visible: true,

    /**
     * Constructor: SuperMap.REST.ThemeGridRangeItem
     * 栅格分段专题图子项类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * caption - {String} 栅格分段专题图子项的标题。
     * color - {ServerColor}栅格分段专题图中每一个分段专题图子项的对应的颜色。
     * end - {Number} 栅格分段专题图子项的终止值。
     * start - {Number} 栅格分段专题图子项的起始值。
     * visible - {Boolean} 栅格分段专题图子项是否可见。
     */
    initialize: function(options) {
        var me = this;
        me.color =new SuperMap.REST.ServerColor() ;
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
        //需要验证是够存在destroy方法
        if (me.color) {
            me.color.destroy();
            me.color = null;
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
        if(obj.color){
            if(obj.color.toServerJSONObject){
                obj.color = obj.color.toServerJSONObject();
            }
        }
        return obj;
    },

    CLASS_NAME: "SuperMap.REST.ThemeGridRangeItem"
});
SuperMap.REST.ThemeGridRangeItem.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeGridRangeItem();
    SuperMap.Util.copy(res, obj);
    res.color = SuperMap.REST.ServerColor.fromJson(obj.color);
    return res;
}
