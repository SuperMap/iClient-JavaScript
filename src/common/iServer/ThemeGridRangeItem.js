/*
 * Class: SuperMap.ThemeGridRangeItem
 * 栅格分段专题图子项类。
 * 在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。
 * 本类用来设置每个范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。
 */
var SuperMap = require('../SuperMap');
var ServerColor = require('./ServerColor');

/**
 * @class SuperMap.ThemeGridRangeItem
 * @description 栅格分段专题图子项类。
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {String} 栅格分段专题图子项的标题。<br>
 *        color - {SuperMap.ServerColor}栅格分段专题图中每一个分段专题图子项的对应的颜色。<br>
 *        end - {Number} 栅格分段专题图子项的终止值。<br>
 *        start - {Number} 栅格分段专题图子项的起始值。<br>
 *        visible - {Boolean} 栅格分段专题图子项是否可见。
 */
SuperMap.ThemeGridRangeItem = SuperMap.Class({

    /**
     * APIProperty: caption
     * @member SuperMap.ThemeGridRangeItem.prototype.caption -{String}
     * @description 栅格分段专题图子项的标题。
     */
    caption: null,

    /**
     * APIProperty:color
     * @member @member SuperMap.ThemeGridRangeItem.prototype.color -{SuperMap.ServerColor}
     * @description 栅格分段专题图中每一个分段专题图子项的对应的颜色。
     */
    color: null,

    /**
     * APIProperty: end
     * @member SuperMap.ThemeGridRangeItem.prototype.end -{Number}
     * @description 栅格分段专题图子项的终止值，即该段专题值范围的最大值，默认值为 0。
     */
    end: 0,

    /**
     * APIProperty: start
     * @member SuperMap.ThemeGridRangeItem.prototype.start -{Number}
     * @description 栅格分段专题图子项的起始值，即该段专题值范围的最小值，默认值为 0。
     */
    start: 0,


    /**
     * APIProperty: visible
     * @member SuperMap.ThemeGridRangeItem.prototype.visible -{Boolean}
     * @description 栅格分段专题图子项是否可见。默认为 true。
     */
    visible: true,

    /*
     * Constructor: SuperMap.ThemeGridRangeItem
     * 栅格分段专题图子项类构造函数。
     */
    initialize: function (options) {
        var me = this;
        me.color = new ServerColor();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
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

    /*
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        var obj = {};
        obj = SuperMap.Util.copyAttributes(obj, this);
        if (obj.color) {
            if (obj.color.toServerJSONObject) {
                obj.color = obj.color.toServerJSONObject();
            }
        }
        return obj;
    },

    CLASS_NAME: "SuperMap.ThemeGridRangeItem"
});
SuperMap.ThemeGridRangeItem.fromObj = function (obj) {
    if (!obj) return;
    var res = new SuperMap.ThemeGridRangeItem();
    SuperMap.Util.copy(res, obj);
    res.color = SuperMap.ServerColor.fromJson(obj.color);
    return res;
};
module.exports = SuperMap.ThemeGridRangeItem;
