import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';

/**
 * @class SuperMap.ThemeUniqueItem
 * @category  iServer Map Theme
 * @classdesc 单值专题图子项类。
 * @description 单值专题图是将专题值相同的要素归为一类，为每一类设定一种渲染风格，其中每一类就是一个专题图子项。比如，利用单值专题图制作行政区划图，Name 字段代表
 *              省/直辖市名，该字段用来做专题变量，如果该字段的字段值总共有5种不同值，则该行政区划图有5个专题图子项。
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {string} 单值专题图子项的标题。<br>
 *        style - {{@link SuperMap.ServerStyle}} 单值专题图子项的风格。<br>
 *        unique - {string} 单值专题图子项的单值。<br>
 *        visible - {boolean} 单值专题图子项是否可见。
 */
export class ThemeUniqueItem {

    constructor(options) {
        /**
         * @member SuperMap.ThemeUniqueItem.prototype.caption -{string}
         * @description 单值专题图子项的标题。
         */
        this.caption = null;

        /**
         * @member SuperMap.ThemeUniqueItem.prototype.style -{SuperMap.ServerStyle}
         * @description 单值专题图子项的显示风格。
         */
        this.style = new ServerStyle();

        /**
         * @member SuperMap.ThemeUniqueItem.prototype.unique -{string}
         * @description 单值专题图子项的值，可以为数字、字符串等。
         */
        this.unique = null;

        /**
         * @member SuperMap.ThemeUniqueItem.prototype.visible -{boolean}
         * @description 单值专题图子项的可见性。默认为 true，表示可见。
         */
        this.visible = true;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeUniqueItem";
    }

    /**
     * @function SuperMap.ThemeUniqueItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.unique = null;

        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    }

    /**
     * @function SuperMap.ThemeUniqueItem.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return {Object} 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var obj = {};
        obj = Util.copyAttributes(obj, this);
        if (obj.style) {
            if (obj.style.toServerJSONObject) {
                obj.style = obj.style.toServerJSONObject();
            }
        }
        return obj;
    }

    /**
     * @function SuperMap.ThemeUniqueItem.fromObj
     * @description 从传入对象获取单值专题图子项类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeUniqueItem} ThemeUniqueItem对象
     */
    static fromObj(obj) {
        var res = new ThemeUniqueItem();
        Util.copy(res, obj);
        res.style = ServerStyle.fromJson(obj.style);
        return res;

    }

}

SuperMap.ThemeUniqueItem = ThemeUniqueItem;

