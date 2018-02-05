import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';

/**
 * @class SuperMap.ThemeGridRangeItem
 * @category  iServer Map Theme
 * @classdesc 栅格分段专题图子项类。
 * @description  在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。<br>
 *            本类用来设置每个范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。<br>
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {string} 栅格分段专题图子项的标题。<br>
 *        color - {{@link SuperMap.ServerColor}}栅格分段专题图中每一个分段专题图子项的对应的颜色。<br>
 *        end - {number}栅格分段专题图子项的终止值。<br>
 *        start - {number}栅格分段专题图子项的起始值。<br>
 *        visible - {boolean} 栅格分段专题图子项是否可见。
 */
export class ThemeGridRangeItem {

    constructor(options) {
        /**
         * @member SuperMap.ThemeGridRangeItem.prototype.caption -{string}
         * @description 栅格分段专题图子项的标题。
         */
        this.caption = null;

        /**
         * @member SuperMap.ThemeGridRangeItem.prototype.color -{SuperMap.ServerColor}
         * @description 栅格分段专题图中每一个分段专题图子项的对应的颜色。
         */
        this.color =  new ServerColor();

        /**
         * @member SuperMap.ThemeGridRangeItem.prototype.end -{number}
         * @description 栅格分段专题图子项的终止值，即该段专题值范围的最大值，默认值为 0。
         */
        this.end = 0;

        /**
         * @member SuperMap.ThemeGridRangeItem.prototype.start -{number}
         * @description 栅格分段专题图子项的起始值，即该段专题值范围的最小值，默认值为 0。
         */
        this.start = 0;


        /**
         * @member SuperMap.ThemeGridRangeItem.prototype.visible -{boolean}
         * @description 栅格分段专题图子项是否可见。默认为 true。
         */
        this.visible = true;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeGridRangeItem";
    }

    /**
     * @function SuperMap.ThemeGridRangeItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.end = null;
        me.start = null;
        //需要验证是够存在destroy方法
        if (me.color) {
            me.color.destroy();
            me.color = null;
        }
        me.visible = null;
    }

    /**
     * @function SuperMap.ThemeGridRangeItem.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return {Object} 对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
        if (obj.color) {
            if (obj.color.toServerJSONObject) {
                obj.color = obj.color.toServerJSONObject();
            }
        }
        return obj;
    }

    /**
     * @function SuperMap.ThemeGridRangeItem.fromObj
     * @description 从传入对象获取栅格分段专题图子项类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGridRangeItem} ThemeGridRangeItem对象
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGridRangeItem();
        Util.copy(res, obj);
        res.color = ServerColor.fromJson(obj.color);
        return res;
    }

}

SuperMap.ThemeGridRangeItem = ThemeGridRangeItem;
