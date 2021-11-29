/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';

/**
 * @class ThemeGridRangeItem
 * @deprecatedclass SuperMap.ThemeGridRangeItem
 * @category  iServer Map Theme
 * @classdesc 栅格分段专题图子项类。
 * @description 在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。
 *              本类用来设置每个范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。
 * @param {Object} options - 参数。
 * @param {ServerColor} options.color - 栅格分段专题图中每一个分段专题图子项的对应的颜色。
 * @param {string} [options.caption] - 栅格分段专题图子项的标题。
 * @param {number} [options.end=0] - 栅格分段专题图子项的终止值。
 * @param {number} [options.start=0] - 栅格分段专题图子项的起始值。
 * @param {boolean} [options.visible=true] - 栅格分段专题图子项是否可见。
 * @usage
 */
export class ThemeGridRangeItem {

    constructor(options) {
        /**
         * @member {string} [ThemeGridRangeItem.prototype.caption]
         * @description 栅格分段专题图子项的标题。
         */
        this.caption = null;

        /**
         * @member {ServerColor} ThemeGridRangeItem.prototype.color
         * @description 栅格分段专题图中每一个分段专题图子项的对应的颜色。
         */
        this.color =  new ServerColor();

        /**
         * @member {number} [ThemeGridRangeItem.prototype.end=0]
         * @description 栅格分段专题图子项的终止值，即该段专题值范围的最大值。
         */
        this.end = 0;

        /**
         * @member {number} [ThemeGridRangeItem.prototype.start=0]
         * @description 栅格分段专题图子项的起始值，即该段专题值范围的最小值。
         */
        this.start = 0;


        /**
         * @member {boolean} [ThemeGridRangeItem.prototype.visible=true]
         * @description 栅格分段专题图子项是否可见。
         */
        this.visible = true;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeGridRangeItem";
    }

    /**
     * @function ThemeGridRangeItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
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
    }

    /**
     * @function ThemeGridRangeItem.prototype.toServerJSONObject
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
     * @function ThemeGridRangeItem.fromObj
     * @description 从传入对象获取栅格分段专题图子项类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeGridRangeItem} ThemeGridRangeItem 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGridRangeItem();
        Util.copy(res, obj);
        res.color = ServerColor.fromJson(obj.color);
        return res;
    }

}
