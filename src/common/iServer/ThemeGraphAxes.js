import SuperMap from '../SuperMap';
import ServerColor from './ServerColor';
import ServerTextStyle from './ServerTextStyle';

/**
 * @class SuperMap.ThemeGraphAxes
 * @classdesc 统计专题图坐标轴样式类。
 * @param  options - {Object} 可选参数。<br>
 *         axesColor - {SuperMap.ServerColor} 坐标轴颜色。<br>
 *         axesDisplayed - {Boolean} 是否显示坐标轴。<br>
 *         axesGridDisplayed - {Boolean} 是否在统计图坐标轴上显示网格。<br>
 *         axesTextDisplayed - {Boolean} 是否显示坐标轴的文本标注。<br>
 *         axesTextStyle - {SuperMap.ServerTextStyle} 统计符号的最大最小尺寸。
 */
export default  class ThemeGraphAxes {

    /**
     * @member SuperMap.ThemeGraphAxes.prototype.axesColor -{SuperMap.ServerColor}
     * @description 坐标轴颜色，默认为黑色。当 axesDisplayed = true 时有效。
     */
    axesColor = null;

    /**
     * @member SuperMap.ThemeGraphAxes.prototype.axesDisplayed -{Boolean}
     * @description 是否显示坐标轴。默认为 false，即不显示。<br>
     *              由于饼状图和环状图无坐标轴，故该属性以及所有与坐标轴设置相关的属性都不适用于它们。并且只有当该值为 true 时，其它设置坐标轴的属性才起作用。
     */
    axesDisplayed = false;

    /**
     * @member SuperMap.ThemeGraphAxes.prototype.axesGridDisplayed -{Boolean}
     * @description 是否在统计图坐标轴上显示网格。默认为 false，即不显示。
     */
    axesGridDisplayed = false;

    /**
     * @member SuperMap.ThemeGraphAxes.prototype.axesTextDisplayed -{Boolean}
     * @description 是否显示坐标轴的文本标注。默认为 false，即不显示。
     */
    axesTextDisplayed = false;

    /**
     * @member SuperMap.ThemeGraphAxes.prototype.axesTextStyle -{SuperMap.ServerTextStyle}
     * @description 坐标轴文本风格。当 axesTextDisplayed = true 时有效。
     */
    axesTextStyle = null;

    /*
     * Constructor: SuperMap.ThemeGraphAxes
     * 统计专题图坐标轴样式类构造函数。
     */
    constructor(options) {
        var me = this;
        me.axesColor = new ServerColor(0, 0, 0);
        me.axesTextStyle = new ServerTextStyle();
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

    static fromObj(obj) {
        if (!obj) return;
        var res = new ThemeGraphAxes();
        SuperMap.Util.copy(res, obj);
        res.axesColor = ServerColor.fromJson(obj.axesColor);
        res.axesTextStyle = ServerTextStyle.fromObj(obj.axesTextStyle);
        return res;
    }

    CLASS_NAME = "SuperMap.ThemeGraphAxes"
}

SuperMap.ThemeGraphAxes = ThemeGraphAxes;
