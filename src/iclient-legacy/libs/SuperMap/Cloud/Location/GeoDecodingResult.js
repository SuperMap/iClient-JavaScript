SuperMap.Cloud.GeoDecodingResult = SuperMap.Class({

    /**
     * APIProperty: name
     * {String} 匹配的数据记录名称。
     */
    name:null,

    /**
     * APIProperty: formatedAddress
     * {String} 符合地理编码规范的规范地名地址描述。
     */
    formatedAddress:null,

    /**
     * APIProperty: address
     * {<SuperMap.Cloud.AddressComponent>} 详细地址信息。
     */
    address:null,

    /**
     * Constructor: SuperMap.Cloud.GeoDecodingResult
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * name - {String} 匹配的数据记录名称。
     * formatedAddress - {String} 符合地理编码规范的规范地名地址描述。
     * address - {<SuperMap.Cloud.AddressComponent>} 详细地址信息。
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
        me.name = null;
        me.formatedAddress = null;
        me.address.destroy();
    },

    CLASS_NAME: "SuperMap.Cloud.GeoDecodingResult"

});

SuperMap.Cloud.GeoDecodingResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return null;
    }
    var address = SuperMap.Cloud.AddressComponent.fromJson(jsonObject.address);
    return new SuperMap.Cloud.GeoDecodingResult({
        name: jsonObject.name,
        formatedAddress: jsonObject.formatedAddress ,
        address: address
    });
};
