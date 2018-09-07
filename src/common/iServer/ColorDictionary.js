/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';

/**
 * @class SuperMap.ColorDictionary
 * @category  iServer Map Theme
 * @classdesc 颜色对照表类。
 * @description 颜色对照表中的键名为具体的高程值，键值表示该高程值要显示的颜色。对于栅格图层中高程值小于颜色对照表中高程最小值的点使用颜色对照表中高程最小值对应的颜色，对于栅格图层中高程值大于颜色对照表中高程最大值的点使用颜色对照表中高程最大值对应的颜色，对于栅格图层中高程值在颜色对照表中没有对应颜色的点，则查找颜色对照表中与当前高程值相邻的两个高程对应的颜色，然后通过渐变运算要显示的颜色。如果设置了颜色对照表的话，则颜色表设置无效。
 * @param {Object} options - 参数。 
 * @param {number} options.elevation - 高程值。 
 * @param {SuperMap.ServerColor} options.color - 服务端颜色类。
 */
export class ColorDictionary {


    constructor(options) {
        options = options || {};

        /**
         * @member {number} SuperMap.ColorDictionary.prototype.elevation
         * @description 高程值。
         */
        this.elevation = null;

        /**
         * @member {SuperMap.ServerColor} SuperMap.ColorDictionary.prototype.color
         * @description 服务端颜色类。
         */
        this.color = null;

        Util.extend(this, options);

        var me = this,
            c = me.color;
        if (c) {
            me.color = new ServerColor(c.red, c.green, c.blue);
        }

        this.CLASS_NAME = "SuperMap.ColorDictionary";
    }

    /**
     * @function SuperMap.ColorDictionary.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        Util.reset(this);
    }

    /**
     * @function SuperMap.ColorDictionary.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} JSON 对象。
     */
    toServerJSONObject() {
        var dataObj = {};
        dataObj = Util.copyAttributes(dataObj, this);
        return dataObj;
    }
}

SuperMap.ColorDictionary = ColorDictionary;

