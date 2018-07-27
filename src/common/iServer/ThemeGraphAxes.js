import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class SuperMap.ThemeGraphAxes
 * @category  iServer Map Theme
 * @classdesc 统计专题图坐标轴样式类。
 * @param {Object} options - 参数。
 * @param {SuperMap.ServerColor} [options.axesColor=(0, 0, 0)] - 坐标轴颜色。
 * @param {boolean} [options.axesDisplayed=false] - 是否显示坐标轴。
 * @param {boolean} [options.axesGridDisplayed=false] - 是否在统计图坐标轴上显示网格。
 * @param {boolean} [options.axesTextDisplayed=false] - 是否显示坐标轴的文本标注。
 * @param {SuperMap.ServerTextStyle} [options.axesTextStyle] - 统计符号的最大最小尺寸。
 */
export class ThemeGraphAxes {

    constructor(options) {

        /**
         * @member {SuperMap.ServerColor} [SuperMap.ThemeGraphAxes.prototype.axesColor=(0, 0, 0)]
         * @description 坐标轴颜色。当 axesDisplayed = true 时有效。
         */
        this.axesColor =  new ServerColor(0, 0, 0);

        /**
         * @member {boolean} [SuperMap.ThemeGraphAxes.prototype.axesDisplayed=false]
         * @description 是否显示坐标轴。<br>
         *              由于饼状图和环状图无坐标轴，故该属性以及所有与坐标轴设置相关的属性都不适用于它们。并且只有当该值为 true 时，其它设置坐标轴的属性才起作用。
         */
        this.axesDisplayed = false;

        /**
         * @member {boolean} [SuperMap.ThemeGraphAxes.prototype.axesGridDisplayed=false]
         * @description 是否在统计图坐标轴上显示网格。
         */
        this.axesGridDisplayed = false;

        /**
         * @member {boolean} [SuperMap.ThemeGraphAxes.prototype.axesTextDisplayed=false]
         * @description 是否显示坐标轴的文本标注。
         */
        this.axesTextDisplayed = false;

        /**
         * @member {SuperMap.ServerTextStyle} SuperMap.ThemeGraphAxes.prototype.axesTextStyle
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
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeGraphAxes} ThemeGraphAxes 对象。
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
