/**
 * Class: SuperMap.Cloud.AddressComponent
 * 详细地址信息类
 *
 */
SuperMap.Cloud.AddressComponent = SuperMap.Class({
    /**
     * APIProperty: province
     * {String} 省级地址描述。
     */
    province: null,
    /**
     * APIProperty: city
     * {String} 市级地址描述。
     */
    city: null,
    /**
     * APIProperty: county
     * {String} 县级地址描述。
     */
    county: null,
    /**
     * APIProperty: streetNumber
     * {String} 街道、门号信息。
     */
    streetNumber: null,

    /**
     * Constructor: SuperMap.Cloud.AddressComponent
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * province -  {String} 省级地址描述。
     * city -  {String} 市级地址描述。
     * county -  {String} 县级地址描述。
     * streetNumber -  {String} 街道、门号信息。
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        me.province = null;
        me.city = null;
        me.county = null;
        me.streetNumber = null;
    },

    CLASS_NAME: "SuperMap.Cloud.AddressComponent"
});
/**
 * Function: SuperMap.Cloud.AddressComponent.fromJson
 * 将 JSON 对象表示的地址信息转化为 AddressComponent 对象。
 *
 * Parameters:
 * jsonObj - {Object} JSON 对象表示的地址信息。
 *
 * Returns:
 * {<SuperMap.Cloud.AddressComponent>} 转化后的 AddressComponent 对象。
 */
SuperMap.Cloud.AddressComponent.fromJson = function(jsonObj){
    if(!jsonObj){
        return null;
    }
    return new SuperMap.Cloud.AddressComponent({
        province: jsonObj.province,
        city: jsonObj.city,
        county: jsonObj.county,
        streetNumber: jsonObj.streetNumber
    });
}
