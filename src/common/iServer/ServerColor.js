import {SuperMap} from '../SuperMap';

/**
 * @class SuperMap.ServerColor
 * @category  iServer Map Theme
 * @classdesc 颜色类。该类使用三原色（ RGB ）来表达颜色。
 * @param options - {Object} 可选参数。如：<br>
 *        red - {number}获取或设置红色值,默认值为255。<br>
 *        green - {number}获取或设置绿色值,默认值为0。<br>
 *        blue - {number}获取或设置蓝色值,默认值为0。
 */
export class ServerColor {

    constructor(red, green, blue) {

        /**
         * @member SuperMap.ServerColor.prototype.red -{number}
         * @description 获取或设置红色值,默认值为255。
         * @default 255
         */
        this.red = (!red && red != 0)?255:red;

        /**
         * @member SuperMap.ServerColor.prototype.green -{number}
         * @description 获取或设置绿色值,默认值为0。
         * @default 0
         */
        this.green = green||0;

        /**
         * @member SuperMap.ServerColor.prototype.blue -{number}
         * @description 获取或设置蓝色值,默认值为0。
         * @default 0
         */
        this.blue = blue||0;

        this.CLASS_NAME = "SuperMap.ServerColor";
    }

    /**
     * @function SuperMap.ServerColor.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.red = null;
        me.green = null;
        me.blue = null;
    }


    /**
     * @function SuperMap.ServerColor.formJson
     * @description 将JSON对象转化为ServerColor对象。
     * @param jsonObject - {Object} 要转换的JSON对象
     * @return{SuperMap.ServerColor} 转化后的ServerColor对象。
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

SuperMap.ServerColor = ServerColor;

