/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerColor.js
 */

/**
 * Class: SuperMap.REST.ThemeGridUniqueItem
 * 栅格单值专题图子项类。
 * 栅格单值专题图是将值相同的单元格归为一类，每一类是一个专题图子项。
 */
SuperMap.REST.ThemeGridUniqueItem = SuperMap.Class({

    /**
     * APIProperty: caption
     * {String} 栅格单值专题图子项的名称。
     */
    caption: null,

    /**
     * APIProperty: color
     * {<SuperMap.REST.ServerColor>} 栅格单值专题图子项的显示颜色。
     */
    color: null,

    /**
     * APIProperty: unique
     * {Number} 栅格单值专题图子项的专题值，即单元格的值，值相同的单元格位于一个子项内。
     */
    unique: null,

    /**
     * APIProperty: visible
     * {Boolean} 栅格单值专题图子项是否可见。默认为true。
     */
    visible: true,

    /**
     * Constructor: SuperMap.REST.ThemeGridUniqueItem
     * 栅格单值专题图子项类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * caption - {String} 栅格单值专题图子项的名称。
     * color - {<SuperMap.REST.ServerColor>} 栅格单值专题图子项的显示颜色。
     * unique - {Number} 栅格单值专题图子项的专题值，即单元格的值，值相同的单元格位于一个子项内。
     * visible - {Boolean} 栅格单值专题图子项是否可见。
     */
    initialize: function(options) {
        var me = this;
        me.color = new SuperMap.REST.ServerColor();
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
        me.unique = null;

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

    CLASS_NAME: "SuperMap.REST.ThemeGridUniqueItem"
});
SuperMap.REST.ThemeGridUniqueItem.fromObj = function(obj) {
    var res = new SuperMap.REST.ThemeGridUniqueItem();
    SuperMap.Util.copy(res, obj);
    res.color = SuperMap.REST.ServerColor.fromJson(obj.color);
    return res;

}
