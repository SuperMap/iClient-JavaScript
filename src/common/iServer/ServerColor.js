/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @class ServerColor
 * @deprecatedclass SuperMap.ServerColor
 * @category iServer Map Theme
 * @classdesc 颜色类。该类使用三原色（ RGB ）来表达颜色，R：红色，G：绿色，B：蓝色。
 * @param {Object} options - 可选参数。
 * @param {number} [options.red=255] - 获取或设置红色值。
 * @param {number} [options.green=0] - 获取或设置绿色值。
 * @param {number} [options.blue=0] - 获取或设置蓝色值。
 * @usage
 */
export class ServerColor {

    constructor(red, green, blue) {

        /**
         * @member {number} [ServerColor.prototype.red=255]
         * @description 获取或设置红色值。
         */
        this.red = (!red && red != 0)?255:red;

        /**
         * @member {number} [ServerColor.prototype.green=0]
         * @description 获取或设置绿色值。
         */
        this.green = green||0;

        /**
         * @member {number} [ServerColor.prototype.blue=0]
         * @description 获取或设置蓝色值。
         */
        this.blue = blue||0;

        this.CLASS_NAME = "SuperMap.ServerColor";
    }

    /**
     * @function ServerColor.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.red = null;
        me.green = null;
        me.blue = null;
    }


    /**
     * @function ServerColor.formJson
     * @description 将 JSON 对象转化为 ServerColor 对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     * @returns {ServerColor} 转化后的 ServerColor 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        var color = new ServerColor();
        var red = 255;
        if (jsonObject.red !== null) {
            red = Number(jsonObject.red);
        }
        color.red = red;

        var green = 0;
        if (jsonObject.green !== null) {
            green = Number(jsonObject.green);
        }
        color.green = green;

        var blue = 0;
        if (jsonObject.blue !== null) {
            blue = Number(jsonObject.blue);
        }
        color.blue = blue;
        return color;
    }

}


