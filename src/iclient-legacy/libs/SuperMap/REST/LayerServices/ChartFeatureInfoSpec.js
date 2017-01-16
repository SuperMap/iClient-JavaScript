/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.ChartFeatureInfoSpec
 *     产品规范物标信息类。用于描述海图物标的基本信息，包括物标的名称、类型及
 *     与该物标相关的属性等。
 */
SuperMap.REST.ChartFeatureInfoSpec = SuperMap.Class({

    /**
     * APIProperty: acronym
     *  {String} 返回物标的简称。
     */
    acronym:null,

    /**
     * APIProperty: code
     * {Number} 物标的代码。
     */
    code:null,

    /**
     * APIProperty: localName
     * {String} 物标的本地化名称。
     */
    localName:null,

    /**
     * APIProperty: name
     * {String} 物标的名称。
     */
    name:null,

    /**
     * APIProperty: primitive
     * {String} 物标可应用的对象类型。可以点（P）、线（L）、面（A）或它们的组合。
     */
    primitive:null,

    /**
     * APIProperty: attributeFields
     * {Array <SuperMap.REST.ChartAttributeSpec> } 返回物标的属性集合。数据元素类型为ChartAttributeSpec。
     */
    attributeFields:null,

    /**
     * Constructor: SuperMap.REST.ChartFeatureInfoSpec
     *  初始化 ChartFeatureInfoSpec 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * acronym - {String} 返回物标的简称。
     * code - {Number} 物标的代码。
     * localName - {String} 物标的本地化名称。
     * name - {String} 物标的名称。
     * primitive -  {String} 物标可应用的对象类型。可以点（P）、线（L）、面（A）
     *      或它们的组合。
     * attributeFields -  {Array <SuperMap.REST.ChartAttributeSpec> } 返回物标
     *      的属性集合。数据元素类型为ChartAttributeSpec。
     */
    initialize:function (options) {
        if (!options) {
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
        me.acronym = null,
            me.code = null,
            me.localName = null,
            me.name = null,
            me.primitive = null,
            me.attributeFields = null
    },

    /**
     *  Method: fromJson
     *  {<SuperMap.REST.ChartFeatureInfoSpec>} 通过json对象创建 ChartFeatureInfoSpec
     *      实例。
     *
     * Parameters:
     * json - {Object} JSON对象，它可以包含ChartFeatureInfoSpec对象能够接收的
     *     属性。
     */
    fromJson:function (json) {
        var chartInfo = new SuperMap.REST.ChartFeatureInfoSpec();
        if (json) {
            if (json.acronym) {
                chartInfo.acronym = json.acronym;
            }
            if (json.code!=null) {
                chartInfo.code = json.code;
            }
            if (json.localName) {
                chartInfo.localName = json.localName;
            }
            if (json.name) {
                chartInfo.name = json.name;
            }
            if (json.primitive) {
                chartInfo.primitive = json.primitive;
            }
            if (json.attributeFields) {
                var chartAttributeSpec = new SuperMap.REST.ChartAttributeSpec();
                var attriFields = [];
                for (var item in json.attributeFields) {
                    attriFields.push(chartAttributeSpec.fromJson(json.attributeFields[item]));
                }
                chartInfo.attributeFields = attriFields;
            }
        }
        return chartInfo;
    },

    CLASS_NAME:"SuperMap.REST.ChartFeatureInfoSpec"
})