import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ThemeGraphSize
 * @category  iServer Map Theme
 * @classdesc 统计专题图符号尺寸类。
 * @param {Object} options - 参数。
 * @param {number} [options.maxGraphSize=0] - 统计图中显示的最大图表尺寸基准值。
 * @param {number} [options.minGraphSize=0] - 统计图中显示的最小图表尺寸基准值。
 */
export class ThemeGraphSize {

    constructor(options) {
        /**
         * @member {number} [SuperMap.ThemeGraphSize.prototype.maxGraphSize=0]
         * @description 获取或设置统计图中显示的最大图表尺寸基准值，单位为像素。
         */
        this.maxGraphSize = 0;

        /**
         * @member {number} [SuperMap.ThemeGraphSize.prototype.minGraphSize=0]
         * @description 获取或设置统计图中显示的最小图表尺寸基准值，单位为像素。
         */
        this.minGraphSize = 0;

        if (options) {
            Util.extend(this, options);
        }

       this.CLASS_NAME = "SuperMap.ThemeGraphSize";
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
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeGraphSize}  ThemeGraphSize对象。
     */
    static fromObj(obj) {
        var res = new ThemeGraphSize();
        Util.copy(res, obj);
        return res;
    }

}

SuperMap.ThemeGraphSize = ThemeGraphSize;
