import SuperMap from '../SuperMap';

/**
 * @class SuperMap.ThemeGraphSize
 * @classdesc 统计专题图符号尺寸类。
 * @param  options - {Object} 可选参数。如：<br>
 *         maxGraphSize - {number}统计图中显示的最大图表尺寸基准值。<br>
 *         minGraphSize - {number}统计图中显示的最小图表尺寸基准值。
 */
export default  class ThemeGraphSize {

    /**
     * @member SuperMap.ThemeGraphSize.prototype.maxGraphSize -{number}
     * @description 获取或设置统计图中显示的最大图表尺寸基准值，默认为0像素。
     */
    maxGraphSize = 0;

    /**
     * @member SuperMap.ThemeGraphSize.prototype.minGraphSize -{number}
     * @description 获取或设置统计图中显示的最小图表尺寸基准值，默认为0像素。
     */
    minGraphSize = 0;

    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @function SuperMap.ThemeGraphSize.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.maxGraphSize = null;
        me.minGraphSize = null;
    }

    /**
     * @function SuperMap.ThemeGraphSize.fromObj
     * @description 从传入对象获统计专题图符号尺寸类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGraphSize}  ThemeGraphSize对象
     */
    static fromObj(obj) {
        var res = new ThemeGraphSize();
        SuperMap.Util.copy(res, obj);
        return res;
    }

    CLASS_NAME = "SuperMap.ThemeGraphSize"
}

SuperMap.ThemeGraphSize = ThemeGraphSize;
