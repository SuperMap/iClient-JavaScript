import SuperMap from '../SuperMap';
import ServerColor from './ServerColor';

/**
 * @class SuperMap.ThemeGridUniqueItem
 * @classdesc 栅格单值专题图子项类。<br>
 *              栅格单值专题图是将值相同的单元格归为一类，每一类是一个专题图子项。<br>
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {String} 栅格单值专题图子项的名称。<br>
 *        color - {SuperMap.ServerColor} 栅格单值专题图子项的显示颜色。<br>
 *        unique - {Number} 栅格单值专题图子项的专题值，即单元格的值，值相同的单元格位于一个子项内。<br>
 *        visible - {Boolean} 栅格单值专题图子项是否可见。
 */
export default  class ThemeGridUniqueItem {

    /**
     * @member SuperMap.ThemeGridUniqueItem.prototype.caption -{String}
     * @description 栅格单值专题图子项的名称。
     */
    caption = null;

    /**
     * @member SuperMap.ThemeGridUniqueItem.prototype.color -{SuperMap.ServerColor}
     * @description 栅格单值专题图子项的显示颜色。
     */
    color = null;

    /**
     * @member SuperMap.ThemeGridUniqueItem.prototype.unique -{Number}
     * @description 栅格单值专题图子项的专题值，即单元格的值，值相同的单元格位于一个子项内。
     */
    unique = null;

    /**
     * @member SuperMap.ThemeGridUniqueItem.prototype.visible -{Boolean}
     * @description 栅格单值专题图子项是否可见。默认为true。
     */
    visible = true;

    /*
     * Constructor: SuperMap.ThemeGridUniqueItem
     * 栅格单值专题图子项类构造函数。
     */
    constructor(options) {
        var me = this;
        me.color = new ServerColor();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.unique = null;

        if (me.color) {
            me.color.destroy();
            me.color = null;
        }
        me.visible = null;
    }

    /*
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj = SuperMap.Util.copyAttributes(obj, this);
        if (obj.color) {
            if (obj.color.toServerJSONObject) {
                obj.color = obj.color.toServerJSONObject();
            }
        }
        return obj;
    }

    static fromObj(obj) {
        var res = new ThemeGridUniqueItem();
        SuperMap.Util.copy(res, obj);
        res.color = ServerColor.fromJson(obj.color);
        return res;

    }

    CLASS_NAME = "SuperMap.ThemeGridUniqueItem"
}

SuperMap.ThemeGridUniqueItem = ThemeGridUniqueItem;
