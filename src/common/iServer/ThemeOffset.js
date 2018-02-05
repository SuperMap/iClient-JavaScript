import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ThemeOffset
 * @category  iServer Map Theme
 * @classdesc 专题图中文本或符号相对于要素内点的偏移量设置类。
 *              通过该类可以设置专题图中标记文本或符号的偏移量以及偏移量是否随地图缩放而改变。
 * @param options - {Object} 可选参数。如：<br>
 *        offsetFixed - {boolean} 当前专题图是否固定标记文本或符号的偏移量。<br>
 *        offsetX - {string} 专题图中文本或符号相对于要素内点的水平偏移量。<br>
 *        offsetY - {string} 专题图中文本或符号相对于要素内点的垂直偏移量。
 */
export class ThemeOffset {

    constructor(options) {
        /**
         * @member SuperMap.ThemeOffset.prototype.offsetFixed -{boolean}
         * @description 当前专题图是否固定标记文本或符号的偏移量。所谓固定偏移量，则文本或符号的偏移量不随地图的缩放而变化。默认为 false，表示偏移量随地图的缩放而变化。
         */
        this.offsetFixed = false;

        /**
         * @member SuperMap.ThemeOffset.prototype.offsetX -{string}
         * @description 专题图中文本或符号相对于要素内点的水平偏移量。偏移量的单位为地图单位。
         *              该偏移量的值为一个常量值或者字段表达式所表示的值，即如果字段表达式为 SmID，其中 SmID = 2，那么水平偏移量为2。
         */
        this.offsetX = "0.0";

        /**
         * @member SuperMap.ThemeOffset.prototype.offsetY -{string}
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
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeOffset} ThemeOffset对象
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
