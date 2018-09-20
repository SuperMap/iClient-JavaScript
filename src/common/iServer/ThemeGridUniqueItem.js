/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';

/**
 * @class SuperMap.ThemeGridUniqueItem
 * @category  iServer Map Theme
 * @classdesc 栅格单值专题图子项类。
 *            栅格单值专题图是将值相同的单元格归为一类，每一类是一个专题图子项。
 * @param {Object} options - 参数。
 * @param {string} [options.caption] - 栅格单值专题图子项的名称。
 * @param {SuperMap.ServerColor} [options.color] - 栅格单值专题图子项的显示颜色。
 * @param {number} options.unique - 栅格单值专题图子项的专题值，即单元格的值，值相同的单元格位于一个子项内。
 * @param {boolean} [options.visible=true] - 栅格单值专题图子项是否可见。
 */
export class ThemeGridUniqueItem {

    constructor(options) {
        /**
         * @member {string} [SuperMap.ThemeGridUniqueItem.prototype.caption]
         * @description 栅格单值专题图子项的名称。
         */
        this.caption = null;

        /**
         * @member {SuperMap.ServerColor} [SuperMap.ThemeGridUniqueItem.prototype.color]
         * @description 栅格单值专题图子项的显示颜色。
         */
        this.color = new ServerColor();

        /**
         * @member {number} SuperMap.ThemeGridUniqueItem.prototype.unique
         * @description 栅格单值专题图子项的专题值，即单元格的值，值相同的单元格位于一个子项内。
         */
        this.unique = null;

        /**
         * @member {boolean} [SuperMap.ThemeGridUniqueItem.prototype.visible=true]
         * @description 栅格单值专题图子项是否可见。
         */
        this.visible = true;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGridUniqueItem";
    }

    /**
     * @function SuperMap.ThemeGridUniqueItem.prototype.destroy
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

    /**
     * @function SuperMap.ThemeGridUniqueItem.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
        if (obj.color) {
            if (obj.color.toServerJSONObject) {
                obj.color = obj.color.toServerJSONObject();
            }
        }
        return obj;
    }

    /**
     * @function SuperMap.ThemeGridUniqueItem.fromObj
     * @description 从传入对象获取栅格单值专题图子项类。
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeGridUniqueItem} ThemeGridUniqueItem 对象。
     */
    static fromObj(obj) {
        var res = new ThemeGridUniqueItem();
        Util.copy(res, obj);
        res.color = ServerColor.fromJson(obj.color);
        return res;

    }

}

SuperMap.ThemeGridUniqueItem = ThemeGridUniqueItem;
