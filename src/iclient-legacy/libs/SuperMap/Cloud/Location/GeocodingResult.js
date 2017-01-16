SuperMap.Cloud.GeocodingResult = SuperMap.Class({
    /**
     * APIProperty: location
     * {<SuperMap.Geometry.Point>} 匹配输入地址描述的地理坐标。
     */

    location:null,

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
     * APIProperty: geometry
     * {<SuperMap.REST.ServerGeometry>} 匹配输入地址描述具体几何对象。
     */

    geometry:null,

    /**
     * APIProperty: confidence
     * {Number} 匹配结果的可信度(满分100)。
     */
    confidence:null,
    /**
     * APIProperty: level
     * {Number} 匹配的数据类型。
     */
    level:null,
    /**
     * Constructor: SuperMap.Cloud.GeocodingResult
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * location - {<SuperMap.Geometry.Point>} 匹配输入地址描述的地理坐标。
     * name - {String} 匹配的数据记录名称。
     * formatedAddress - {String} 符合地理编码规范的规范地名地址描述。
     * address - {<SuperMap.Cloud.AddressComponent>} 详细地址信息。
     * geometry - {<SuperMap.REST.ServerGeometry>} 匹配输入地址描述具体几何对象。
     * confidence - {Number} 匹配结果的可信度(满分100)。
     * level - {Number} 匹配的数据类型。
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
        me.location.destroy();
        me.location = null;
        me.name = null;
        me.formatedAddress = null;
        me.address.destroy();
        me.address = null;
        me.geometry.destroy();
        me.geometry = null;
        me.confidence = null;
        me.level = null;
    },

    CLASS_NAME: "SuperMap.Cloud.GeocodingResult"

});

SuperMap.Cloud.GeocodingResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return null;
    }
    var location = new SuperMap.Geometry.Point(jsonObject.location.x,jsonObject.location.y);
    var address = SuperMap.Cloud.AddressComponent.fromJson(jsonObject.address);
    var geometry = SuperMap.REST.ServerGeometry.fromJson(jsonObject.geometry);
    return new SuperMap.Cloud.GeocodingResult({
        location: location,
        name: jsonObject.name,
        formatedAddress: jsonObject.formatedAddress ,
        address: address,
        geometry:geometry,
        confidence: jsonObject.confidence
    });
};
