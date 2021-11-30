/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {AlongLineDirection} from '../REST';

/**
 * @class ThemeLabelAlongLine
 * @deprecatedclass SuperMap.ThemeLabelAlongLine
 * @category  iServer Map Theme
 * @classdesc 标签沿线标注样式类。
 * @param {Object} options - 参数。
 * @param {boolean} [options.isAlongLine=true] - 是否沿线显示文本。
 * @param {AlongLineDirection} [options.alongLineDirection=AlongLineDirection.LB_TO_RT] - 标签沿线标注方向。
 * @param {boolean} [options.angleFixed=false] - 当沿线显示文本时，是否将文本角度固定。
 * @param {boolean} [options.repeatedLabelAvoided=false] - 沿线循环标注时是否避免标签重复标注。
 * @param {boolean} [options.repeatIntervalFixed=false] - 循环标注间隔是否固定。
 * @param {number} [options.labelRepeatInterval=0] - 沿线且循环标注时循环标注的间隔。
 * @usage
 */
export class ThemeLabelAlongLine {


    constructor(options) {
        /**
         * @member {boolean} [ThemeLabelAlongLine.prototype.isAlongLine=true]
         * @description 是否沿线显示文本。true 表示沿线显示文本，false 表示正常显示文本。
         */
        this.isAlongLine = true;

        /**
         * @member {AlongLineDirection} [ThemeLabelAlongLine.prototype.alongLineDirection=AlongLineDirection.LB_TO_RT]
         * @description 标签沿线标注方向。
         */
        this.alongLineDirection = AlongLineDirection.LB_TO_RT;

        /**
         * @member {boolean} [ThemeLabelAlongLine.prototype.angleFixed=false]
         * @description 当沿线显示文本时，是否将文本角度固定。true 表示按固定文本角度显示文本，false 表示按照沿线角度显示文本。
         *              如果固定角度，则所有标签均按所设置的文本风格中字体的旋转角度来显示，不考虑沿线标注的方向；
         *              如果不固定角度，在显示标签时会同时考虑字体的旋转角度和沿线标注的方向。
         */
        this.angleFixed = false;

        /**
         * @member {boolean} ThemeLabelAlongLine.prototype.repeatedLabelAvoided
         * @description 沿线循环标注时是否避免标签重复标注。
         */
        this.repeatedLabelAvoided = false;

        /**
         * @member {boolean} [ThemeLabelAlongLine.prototype.repeatIntervalFixed=false]
         * @description 循环标注间隔是否固定。true 表示使用固定循环标注间隔，即使用逻辑坐标来显示循环标注间隔；
         *              false 表示循环标注间隔随地图的缩放而变化，即使用地理坐标来显示循环标注间隔。
         */
        this.repeatIntervalFixed = false;

        /**
         * @member {number} [ThemeLabelAlongLine.prototype.labelRepeatInterval=0]
         * @description 沿线且循环标注时循环标注的间隔。长度的单位与地图的地理单位一致。只有设定 RepeatedLabelAvoided 为 true
         *              的时候，labelRepeatInterval 属性才有效。
         */
        this.labelRepeatInterval = 0;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeLabelAlongLine";
    }


    /**
     * @function ThemeLabelAlongLine.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isAlongLine = null;
        me.alongLineDirection = null;
        me.angleFixed = null;
        me.repeatedLabelAvoided = null;
        me.repeatIntervalFixed = null;
        me.labelRepeatInterval = null;
    }

    /**
     * @function ThemeLabelAlongLine.fromObj
     * @description 从传入对象获取标签沿线标注样式类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeLabelAlongLine} ThemeLabelAlongLine 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var t = new ThemeLabelAlongLine();
        Util.copy(t, obj);
        return t;
    }

}

