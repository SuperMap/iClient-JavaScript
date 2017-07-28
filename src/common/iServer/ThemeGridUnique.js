/*
 * Class: SuperMap.ThemeGridUnique
 * 栅格单值专题图类。
 * 栅格单值专题图，是将单元格值相同的归为一类，为每一类设定一种颜色，从而用来区分不同的类别。
 * 栅格单值专题图适用于离散栅格数据和部分连续栅格数据，对于单元格值各不相同的那些连续栅格数据，使用栅格单值专题图不具有任何意义。
 *
 * Inherits from:
 *  - <SuperMap.Theme>
 */
require('./Theme');
var SuperMap = require('../SuperMap');
var ServerColor = require('./ServerColor');
var ThemeGridUniqueItem = require('./ThemeGridUniqueItem');

/**
 * @class SuperMap.ThemeGridUnique
 * @description 栅格单值专题图类。
 * @augments SuperMap.Theme
 * @param options - {Object} 可选参数。如：<br>
 *        items - {Array<SuperMap.ThemeGridUniqueItem>} 栅格单值专题图子项数组。
 *        defaultcolor - {SuperMap.ServerColor} 栅格单值专题图的默认颜色。
 */
SuperMap.ThemeGridUnique = SuperMap.Class(SuperMap.Theme, {

    /**
     * APIProperty: defaultcolor
     * @member SuperMap.ThemeGridUnique.prototype.defaultcolor -{SuperMap.ServerColor}
     * @description 栅格单值专题图的默认颜色。
     *              对于那些未在格网单值专题图子项之列的要素使用该颜色显示。
     */
    defaultcolor: null,

    /**
     * APIProperty: items
     * @member SuperMap.ThemeGridUnique.prototype.items -{Array<SuperMap.ThemeGridUniqueItem>}
     * @description 栅格单值专题图子项数组。
     *              栅格单值专题图将值相同的单元格归为一类，每一类是一个专题图子项。
     */
    items: null,

    /*
     * Constructor: SuperMap.ThemeGridUnique
     * 栅格单值专题图类构造函数。
     */
    initialize: function (options) {
        var me = this;
        me.defaultcolor = new ServerColor();
        SuperMap.Theme.prototype.initialize.apply(this, ["GRIDUNIQUE", options]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.Theme.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.items) {
            if (me.items.length > 0) {
                for (var item in me.items) {
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }

        if (me.defaultcolor) {
            me.defaultcolor.destroy();
            me.defaultcolor = null;
        }
    },

    /*
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject: function () {
        var obj = {};
        obj = SuperMap.Util.copyAttributes(obj, this);
        if (obj.defaultcolor) {
            if (obj.defaultcolor.toServerJSONObject) {
                obj.defaultcolor = obj.defaultcolor.toServerJSONObject();
            }
        }
        if (obj.items) {
            var items = [],
                len = obj.items.length;
            for (var i = 0; i < len; i++) {
                items.push(obj.items[i].toServerJSONObject());
            }
            obj.items = items;
        }
        return obj;
    },

    CLASS_NAME: "SuperMap.ThemeGridUnique"
});
SuperMap.ThemeGridUnique.fromObj = function (obj) {
    var res = new SuperMap.ThemeGridUnique();
    var uItems = obj.items;
    var len = uItems ? uItems.length : 0;
    SuperMap.Util.extend(res, obj);
    res.items = [];
    res.defaultcolor = new ServerColor.fromJson(obj.defaultcolor);
    for (var i = 0; i < len; i++) {
        res.items.push(new ThemeGridUniqueItem.fromObj(uItems[i]));
    }
    return res;
};
module.exports = function (options) {
    return new SuperMap.ThemeGridUnique(options);
};
