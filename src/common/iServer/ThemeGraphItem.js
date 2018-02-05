import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';

/**
 * @class SuperMap.ThemeGraphItem
 * @category  iServer Map Theme
 * @classdesc 统计专题图子项类
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {string} 专题图子项的名称。<br>
 *        graphExpression - {string} 统计专题图的专题变量。<br>
 *        memoryDoubleValues - {Array<number>} 内存数组方式制作专题图时的值数组。<br>
 *        uniformStyle - {{@link SuperMap.ServerStyle}} 统计专题图子项的显示风格
 */
export class ThemeGraphItem {

    constructor(options) {

        /**
         * @member SuperMap.ThemeGraphItem.prototype.caption -{string}
         * @description 专题图子项的名称。
         */
        this.caption = null;

        /**
         * @member SuperMap.ThemeGraphItem.prototype.graphExpression -{string}
         * @description 统计专题图的专题变量。专题变量可以是一个字段或字段表达式。字段必须为数值型；表达式只能为数值型的字段间的运算。必设字段。
         */
        this.graphExpression = null;

        /**
         * @member SuperMap.ThemeGraphItem.prototype.memoryDoubleValues -{Array<number>}
         * @description 内存数组方式制作专题图时的值数组。<br>
         *              内存数组方式制作专题图时，只对 SmID 值在键数组（{@link SuperMap.ThemeGraph.memoryKeys}）中的记录制作专题图。<br>
         *              值数组的数值个数必须与键数组中数值的个数一致。 值数组中的值将代替原来的专题值来制作统计专题图。<br>
         *              比如：利用面积字段和周长字段（即有两个统计专题图子项 ）作为专题变量制作统计专题图。
         */
        this.memoryDoubleValues = null;

        /**
         * @member SuperMap.ThemeGraphItem.prototype.uniformStyle -{SuperMap.ServerStyle}
         * @description 统计专题图子项的显示风格。
         *              每一个统计专题图子项都对应一种显示风格。
         */
        this.uniformStyle = new ServerStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraphItem";
    }

    /**
     * @function SuperMap.ThemeGraphItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.graphExpression = null;
        me.memoryDoubleValues = null;
        me.uniformStyle = null;
    }

    /**
     * @function SuperMap.ThemeGraphItem.fromObj
     * @description 从传入对象获取统计专题图子项类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGraphItem} ThemeGraphItem对象
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGraphItem();
        Util.copy(res, obj);
        res.uniformStyle = ServerStyle.fromJson(obj.uniformStyle);
        return res;
    }

}

SuperMap.ThemeGraphItem = ThemeGraphItem;
