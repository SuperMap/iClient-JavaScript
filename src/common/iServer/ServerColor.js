import SuperMap from '../SuperMap';

/**
 * Class: SuperMap.ServerColor
 * 颜色类
 * 该类使用三原色（ RGB ）来表达颜色。
 */
export default  class ServerColor {

    /**
     * APIProperty: red
     * {Number} 获取或设置红色值,默认值为255。
     */
    red = 255;

    /**
     * APIProperty: green
     * {Number} 获取或设置绿色值,默认值为0。
     */
    green = 0;

    /**
     * APIProperty: blue
     * {Number} 获取或设置蓝色值,默认值为0。
     */
    blue = 0;

    /**
     * Constructor: SuperMap.ServerColor
     * 颜色类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * red - {Number} 获取或设置红色值,默认值为255。
     * green - {Number} 获取或设置绿色值,默认值为0。
     * blue - {Number} 获取或设置蓝色值,默认值为0。
     */
    constructor(red, green, blue) {
        if (!red && red != 0) {
            this.red = 255;
        }
        else {
            this.red = red;
        }

        if (!green && green != 0) {
            this.green = 0;
        }
        else {
            this.green = green;
        }

        if (!blue && blue != 0) {
            this.blue = 0;
        }
        else {
            this.blue = blue;
        }
    }


    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.red = null;
        me.green = null;
        me.blue = null;
    }


    /**
     * Function: SuperMap.ServerColor.formJson
     * 将JSON对象转化为ServerColor对象。
     *
     * Parameters: jsonObject - {Object} 要转换的JSON对象
     *
     * Returns:
     * { SuperMap.ServerColor> } 转化后的ServerColor对象。
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

    CLASS_NAME = "SuperMap.ServerColor"
}

SuperMap.ServerColor = ServerColor;

