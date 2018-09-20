/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ThemeOffset
 * @category  iServer Map Theme
 * @classdesc 专题图中文本或符号相对于要素内点的偏移量设置类。
 *            通过该类可以设置专题图中标记文本或符号的偏移量以及偏移量是否随地图缩放而改变。
 * @param {Object} options - 参数。
 * @param {boolean} [options.offsetFixed=false] - 当前专题图是否固定标记文本或符号的偏移量。
 * @param {string} [options.offsetX='0.0'] - 专题图中文本或符号相对于要素内点的水平偏移量。
 * @param {string} [options.offsetY='0.0'] - 专题图中文本或符号相对于要素内点的垂直偏移量。
 */
export class ThemeOffset {

    constructor(options) {
        /**
         * @member {boolean} [SuperMap.ThemeOffset.prototype.offsetFixed=false]
         * @description 当前专题图是否固定标记文本或符号的偏移量。所谓固定偏移量，则文本或符号的偏移量不随地图的缩放而变化。
         */
        this.offsetFixed = false;

        /**
         * @member {string} [SuperMap.ThemeOffset.prototype.offsetX=0.0]
         * @description 专题图中文本或符号相对于要素内点的水平偏移量。偏移量的单位为地图单位。
         *              该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么水平偏移量为2。
         */
        this.offsetX = "0.0";

        /**
         * @member {string} [SuperMap.ThemeOffset.prototype.offsetY=0.0]
         * @description 专题图中文本或符号相对于要素内点的垂直偏移量。偏移量的单位为地图单位。
         *              该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么垂直偏移量为2。
         */
        this.offsetY = "0.0";

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeOffset";
    }

    /**
     * @function SuperMap.ThemeOffset.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.offsetFixed = null;
        me.offsetX = null;
        me.offsetY = null;
    }

    /**
     * @function SuperMap.ThemeOffset.fromObj
     * @description 从传入对象获取专题图中文本或符号相对于要素内点的偏移量设置类。
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeOffset} ThemeOffset 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeOffset();
        Util.copy(res, obj);
        return res;
    }

}

SuperMap.ThemeOffset = ThemeOffset;
