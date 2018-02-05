import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ServerColor} from './ServerColor';
import {ThemeGridUniqueItem} from './ThemeGridUniqueItem';

/**
 * @class SuperMap.ThemeGridUnique
 * @category  iServer Map Theme
 * @classdesc 栅格单值专题图类。
 * @description 栅格单值专题图，是将单元格值相同的归为一类，为每一类设定一种颜色，从而用来区分不同的类别。<br>
 *              栅格单值专题图适用于离散栅格数据和部分连续栅格数据，对于单元格值各不相同的那些连续栅格数据，使用栅格单值专题图不具有任何意义。<br>
 * @extends SuperMap.Theme
 * @param options - {Object} 可选参数。如：<br>
 *        items - {Array<{@link SuperMap.ThemeGridUniqueItem}>} 栅格单值专题图子项数组。<br>
 *        defaultcolor - {{@link SuperMap.ServerColor}} 栅格单值专题图的默认颜色。
 */
export class ThemeGridUnique extends Theme {

    constructor(options) {
        super("GRIDUNIQUE", options);
        /**
         * @member SuperMap.ThemeGridUnique.prototype.defaultcolor -{SuperMap.ServerColor}
         * @description 栅格单值专题图的默认颜色。
         *              对于那些未在格网单值专题图子项之列的要素使用该颜色显示。
         */
        this.defaultcolor = new ServerColor();

        /**
         * @member SuperMap.ThemeGridUnique.prototype.items -{Array<SuperMap.ThemeGridUniqueItem>}
         * @description 栅格单值专题图子项数组。
         *              栅格单值专题图将值相同的单元格归为一类，每一类是一个专题图子项。
         */
        this.items = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGridUnique";
    }

    /**
     * @function SuperMap.ThemeGridUnique.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
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
    }

    /**
     * @function SuperMap.ThemeGridUnique.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return {Object} 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
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
    }

    /**
     * @function SuperMap.ThemeGridUnique.fromObj
     * @description 从传入对象获取栅格单值专题图类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGridUnique} ThemeGridUnique对象
     */
    static fromObj(obj) {
        var res = new ThemeGridUnique();
        var uItems = obj.items;
        var len = uItems ? uItems.length : 0;
        Util.extend(res, obj);
        res.items = [];
        res.defaultcolor = new ServerColor.fromJson(obj.defaultcolor);
        for (var i = 0; i < len; i++) {
            res.items.push(new ThemeGridUniqueItem.fromObj(uItems[i]));
        }
        return res;
    }

}

SuperMap.ThemeGridUnique = ThemeGridUnique;
