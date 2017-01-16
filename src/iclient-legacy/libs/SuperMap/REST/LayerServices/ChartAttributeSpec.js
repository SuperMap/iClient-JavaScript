/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.ChartAttributeSpec
 *      产品规范物标属性类，用于提供电子海图产品规范中物标的属性字段。
 */
SuperMap.REST.ChartAttributeSpec = SuperMap.Class({

    /**
     * APIProperty: code
     * {Number}  属性字段代码。
     */
    code:null,

    /**
     * APIProperty: required
     * {Number}  返回该属性是否是物标的必须属性。返回的值可以为0、1或者2。当
     *      为0时，表示该属性不是物标的必须属性；当为1时，表示该属性是物标的必
     *      须属性；当为2时，表示该属性的设置在特定条件下有意义。
     */
    required:null,

    /**
     * Constructor: SuperMap.REST.ChartQueryParameters
     *  初始化 ChartAttributeSpec 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     *  code - {Number} 属性字段代码。
     *  required - {Number} 返回该属性是否是物标的必须属性。返回的值可以为0、1或者2。当
     *      为0时，表示该属性不是物标的必须属性；当为1时，表示该属性是物标的必
     *      须属性；当为2时，表示该属性的设置在特定条件下有意义。
     *
     */
    initialize:function (options) {
        if(!options){
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.code = null;
        me.required = null;
    },

    /**
     * Method: fromJson
     *  {<SuperMap.REST.ChartAttributeSpec>} 通过json对象创建 ChartAttributeSpec
     *      实例。
     *
     * Parameters:
     * json - {Object} JSON对象，可以包含ChartAttributeSpec对象能够接收的属性，
     *      其属性能够被赋给新的ChartAttributeSpec对象并返回。
     */
    fromJson:function (json) {
        var chartAttri = new SuperMap.REST.ChartAttributeSpec();
        if (json) {
            if (json.code!=null) {
                chartAttri.code = json.code;
            }
            if (json.required) {
                chartAttri.required = json.required;
            }
        }
        return chartAttri;
    },

    CLASS_NAME:"SuperMap.REST.ChartAttributeSpec"
})