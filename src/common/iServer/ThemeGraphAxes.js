import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class SuperMap.ThemeGraphAxes
 * @category  iServer Map Theme
 * @classdesc 统计专题图坐标轴样式类。
 * @param  options - {Object} 可选参数。<br>
 *         axesColor - {{@link SuperMap.ServerColor}} 坐标轴颜色。<br>
 *         axesDisplayed - {boolean} 是否显示坐标轴。<br>
 *         axesGridDisplayed - {boolean} 是否在统计图坐标轴上显示网格。<br>
 *         axesTextDisplayed - {boolean} 是否显示坐标轴的文本标注。<br>
 *         axesTextStyle - {{@link SuperMap.ServerTextStyle}} 统计符号的最大最小尺寸。
 */
export class ThemeGraphAxes {

    constructor(options) {

        /**
         * @member SuperMap.ThemeGraphAxes.prototype.axesColor -{SuperMap.ServerColor}
         * @description 坐标轴颜色，默认为黑色。当 axesDisplayed = true 时有效。
         */
        this.axesColor =  new ServerColor(0, 0, 0);

        /**
         * @member SuperMap.ThemeGraphAxes.prototype.axesDisplayed -{boolean}
         * @description 是否显示坐标轴。默认为 false，即不显示。<br>
         *              由于饼状图和环状图无坐标轴，故该属性以及所有与坐标轴设置相关的属性都不适用于它们。并且只有当该值为 true 时，其它设置坐标轴的属性才起作用。
         */
        this.axesDisplayed = false;

        /**
         * @member SuperMap.ThemeGraphAxes.prototype.axesGridDisplayed -{boolean}
         * @description 是否在统计图坐标轴上显示网格。默认为 false，即不显示。
         */
        this.axesGridDisplayed = false;

        /**
         * @member SuperMap.ThemeGraphAxes.prototype.axesTextDisplayed -{boolean}
         * @description 是否显示坐标轴的文本标注。默认为 false，即不显示。
         */
        this.axesTextDisplayed = false;

        /**
         * @member SuperMap.ThemeGraphAxes.prototype.axesTextStyle -{SuperMap.ServerTextStyle}
         * @description 坐标轴文本风格。当 axesTextDisplayed = true 时有效。
         */
        this.axesTextStyle =  new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraphAxes";
    }

    /**
     * @function SuperMap.ThemeGraphAxes.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.axesColor) {
            me.axesColor.destroy();
            me.axesColor = null;
        }
        me.axesDisplayed = null;
        me.axesGridDisplayed = null;
        me.axesTextDisplayed = null;
        if (me.axesTextStyle) {
            me.axesTextStyle.destroy();
            me.axesTextStyle = null;
        }
    }

    /**
     * @function SuperMap.ThemeGraphAxes.fromObj
     * @description 从传入对象获取统计专题图坐标轴样式类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGraphAxes} ThemeGraphAxes对象
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGraphAxes();
        Util.copy(res, obj);
        res.axesColor = ServerColor.fromJson(obj.axesColor);
        res.axesTextStyle = ServerTextStyle.fromObj(obj.axesTextStyle);
        return res;
    }

}

SuperMap.ThemeGraphAxes = ThemeGraphAxes;
