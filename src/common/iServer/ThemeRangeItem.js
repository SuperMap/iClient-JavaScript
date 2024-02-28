/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';

/**
 * @class ThemeRangeItem
 * @deprecatedclass SuperMap.ThemeRangeItem
 * @category  iServer Map Theme
 * @classdesc 范围分段专题图子项类。在分段专题图中，字段值按照某种分段模式被分成多个范围段，
 * 每个范围段即为一个子项，同一范围段的要素属于同一个分段专题图子项。
 * 每个子项都有其分段起始值、终止值、名称和风格等。每个分段所表示的范围为 [start, end)。
 * @param {Object} options - 参数。
 * @param {string} [options.caption] - 子项的标题。
 * @param {number} [options.end=0] - 子项的终止值。
 * @param {number} [options.start=0] - 子项的起始值。
 * @param {ServerStyle} options.style - 子项的风格。
 * @param {boolean} [options.visible=true] - 子项是否可见。
 * @usage
 */
export class ThemeRangeItem {

    constructor(options) {
        /**
         * @member {string} [ThemeRangeItem.prototype.caption]
         * @description 分段专题图子项的标题。
         */
        this.caption = null;

        /**
         * @member {number} [ThemeRangeItem.prototype.end=0]
         * @description 分段专题图子项的终止值，即该段专题值范围的最大值。<br>
         *              如果该子项是分段中最后一个子项，则该终止值应大于分段字段（ThemeRange 类的 rangeExpression 属性）的最大值，若该终止值小于分段字段最大值，
         *              则剩余部分由内部随机定义其颜色；如果不是最后一项，该终止值必须与其下一子项的起始值相同，否则系统抛出异常；
         *              如果设置了范围分段模式和分段数，则会自动计算每段的范围 [start, end)，故无需设置 [start, end)；当然可以设置，那么结果就会按您设置的值对分段结果进行调整。
         */
        this.end = 0;

        /**
         * @member {number} [ThemeRangeItem.prototype.start=0]
         * @description 分段专题图子项的起始值，即该段专题值范围的最小值。<br>
         *              如果该子项是分段中第一个子项，那么该起始值就是分段的最小值；如果子项的序号大于等于 1 的时候，该起始值必须与前一子项的终止值相同，否则系统会抛出异常。
         *              如果设置了范围分段模式和分段数，则会自动计算每段的范围 [start, end)，故无需设置 [start, end)；当然可以设置，那么结果就会按您设置的值对分段结果进行调整。
         */
        this.start = 0;

        /**
         * @member {ServerStyle} ThemeRangeItem.prototype.style
         * @description 分段专题图子项的风格。
         *              每一个分段专题图子项都对应一种显示风格。
         */
        this.style = new ServerStyle();

        /**
         * @member {boolean} [ThemeRangeItem.prototype.visible=true]
         * @description 分段专题图子项是否可见。
         */
        this.visible = true;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeRangeItem";
    }

    /**
     * @function ThemeRangeItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.end = null;
        me.start = null;

        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    }

    /**
     * @function ThemeRangeItem.prototypetoServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
        if (obj.style) {
            if (obj.style.toServerJSONObject) {
                obj.style = obj.style.toServerJSONObject();
            }
        }
        return obj;
    }

    /**
     * @function ThemeRangeItem.fromObj
     * @description 从传入对象获取范围分段专题图子项类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeRangeItem} ThemeRangeItem 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeRangeItem();
        Util.copy(res, obj);
        res.style = ServerStyle.fromJson(obj.style);
        return res;
    }
}

