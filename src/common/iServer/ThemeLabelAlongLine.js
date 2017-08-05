import SuperMap from '../SuperMap';
import {AlongLineDirection} from '../REST';

/**
 * @class SuperMap.ThemeLabelAlongLine
 * @description 标签沿线标注样式类。
 * @param options - {Object} 可选参数。如：<br>
 *        isAlongLine - {Boolean} 是否沿线显示文本。<br>
 *        alongLineDirection - {SuperMap.AlongLineDirection} 标签沿线标注方向。<br>
 *        angleFixed - {Boonlean} 当沿线显示文本时，是否将文本角度固定。<br>
 *        repeatedLabelAvoided - {Boonlean} 沿线循环标注时是否避免标签重复标注。<br>
 *        repeatIntervalFixed - {Boonlean} 循环标注间隔是否固定。<br>
 *        labelRepeatInterval - {Number} 沿线且循环标注时循环标注的间隔。
 */
export default class ThemeLabelAlongLine {

    /**
     * APIProperty: isAlongLine
     * @member SuperMap.ThemeLabelAlongLine.prototype.isAlongLine -{Boolean}
     * @description 是否沿线显示文本。true 表示沿线显示文本，false 表示正常显示文本，默认为 true。
     */
    isAlongLine = true;

    /**
     * APIProperty: alongLineDirection
     * @member SuperMap.ThemeLabelAlongLine.prototype.alongLineDirection -{SuperMap.AlongLineDirection}
     * @description 标签沿线标注方向。默认为 SuperMap.AlongLineDirection.LB_TO_RT（从上到下，从左到右放置）。
     */
    alongLineDirection = AlongLineDirection.LB_TO_RT;

    /**
     * APIProperty: angleFixed
     * @member SuperMap.ThemeLabelAlongLine.prototype.angleFixed -{Boonlean}
     * @description 当沿线显示文本时，是否将文本角度固定。true 表示按固定文本角度显示文本，false 表示按照沿线角度显示文本。
     *              默认值为 false。如果固定角度，则所有标签均按所设置的文本风格中字体的旋转角度来显示，不考虑沿线标注的方向；
     *              如果不固定角度，在显示标签时会同时考虑字体的旋转角度和沿线标注的方向。
     */
    angleFixed = false;

    /**
     * APIProperty: repeatedLabelAvoided
     * @member SuperMap.ThemeLabelAlongLine.prototype.repeatedLabelAvoided -{Boonlean}
     * @description 沿线循环标注时是否避免标签重复标注。
     */
    repeatedLabelAvoided = false;

    /**
     * APIProperty: repeatIntervalFixed
     * @member SuperMap.ThemeLabelAlongLine.prototype.repeatIntervalFixed -{Boonlean}
     * @description 循环标注间隔是否固定。true 表示使用固定循环标注间隔，即使用逻辑坐标来显示循环标注间隔；
     *              false 表示循环标注间隔随地图的缩放而变化，即使用地理坐标来显示循环标注间隔。默认值为 false。
     */
    repeatIntervalFixed = false;

    /**
     * APIProperty: labelRepeatInterval
     * @member SuperMap.ThemeLabelAlongLine.prototype.labelRepeatInterval -{Number}
     * @description 沿线且循环标注时循环标注的间隔。长度的单位与地图的地理单位一致。只有设定 RepeatedLabelAvoided 为 true
     *              的时候，labelRepeatInterval 属性才有效。默认为0地图单位。
     */
    labelRepeatInterval = 0;

    /*
     * Constructor: SuperMap.ThemeLabelAlongLine
     * 标签沿线标注样式类构造函数，用于创建 SuperMap.ThemeLabelAlongLine 类的新实例。
     */
    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /**
     * APIMethod: destroy
     * @function destroy
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

    static fromObj(obj) {
        if (!obj) return;
        var t = new ThemeLabelAlongLine();
        SuperMap.Util.copy(t, obj);
        return t;
    }

    CLASS_NAME = "SuperMap.ThemeLabelAlongLine"
}

SuperMap.ThemeLabelAlongLine = ThemeLabelAlongLine;
