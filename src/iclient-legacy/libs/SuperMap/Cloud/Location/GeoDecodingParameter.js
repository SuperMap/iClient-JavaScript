/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.GeoDecodingParameter
 * 逆地理编码服务可以根据用户输入的地址描述和城市范围返回对应的地理坐标和结构化的地址详细描述。
 *
 */
SuperMap.Cloud.GeoDecodingParameter = SuperMap.Class({

    /**
     * APIProperty: location
     * {<SuperMap.Geometry.Point>} 地址经纬度坐标。
     */
    location : null,

    /**
     * Constructor: SuperMap.Cloud.GeoDecodingParameter
     *
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * location - {<SuperMap.Geometry.Point>} 地址经纬度坐标。
     */
    initialize: function(options) {
        var me = this;
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    toObject:function(){
        return {
            location:this.location
        };
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        me.location = null;
    },

    CLASS_NAME: "SuperMap.Cloud.GeoDecodingParameter"
});