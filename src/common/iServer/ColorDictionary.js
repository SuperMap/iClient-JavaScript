import SuperMap from '../SuperMap';
import ServerColor from './ServerColor';

/**
 * @class SuperMap.ColorDictionary
 * @classdesc 颜色对照表类。
 * @description 颜色对照表中的键名为具体的高程值，键值表示该高程值要显示的颜色。<br>
 *              对于栅格图层中高程值小于颜色对照表中高程最小值的点使用颜色对照表中高程最小值对应的颜色，<br>
 *              对于栅格图层中高程值大于颜色对照表中高程最大值的点使用颜色对照表中高程最大值对应的颜色，<br>
 *              对于栅格图层中高程值在颜色对照表中没有对应颜色的点，则查找颜色对照表中与当前高程值相邻的两个高程对应的颜色，<br>
 *              然后通过渐变运算要显示的颜色。如果设置了颜色对照表的话，则颜色表设置无效。
 * @param options - {object} 颜色对照表类可选参数。如：<br>
 *        elevation - {number}高程值。<br>
 *        color -{SuperMap.ServerColor} 服务端颜色类。
 */
export default class ColorDictionary {

    /**
     * @member SuperMap.ColorDictionary.prototype.elevation -{number}
     * @description 高程值。
     */
    elevation = null;

    /**
     * @member SuperMap.ColorDictionary.prototype.color -{SuperMap.ServerColor}
     * @description 服务端颜色类。
     */
    color = null;

    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);

        var me = this,
            c = me.color;
        if (c) {
            me.color = new ServerColor(c.red, c.green, c.blue);
        }
    }

    /**
     * @function SuperMap.ColorDictionary.prototype.destroy
     * @description 释放资源,将引用资源的属性置空。
     */
    destroy() {
        SuperMap.Util.reset(this);
    }

    /**
     * @function SuperMap.ColorDictionary.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var dataObj = {};
        dataObj = SuperMap.Util.copyAttributes(dataObj, this);
        return dataObj;
    }

    CLASS_NAME = "SuperMap.ColorDictionary"
}

SuperMap.ColorDictionary = ColorDictionary;

