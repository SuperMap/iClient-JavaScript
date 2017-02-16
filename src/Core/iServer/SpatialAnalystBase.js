/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.SpatialAnalystBase
 * 空间分析服务基类。
 * 该类负责将从客户端指定的服务器上获取该服务器提供的地图信息
 * Inherits from:
 *  - <SuperMap.CoreServiceBase>
 */
require('../format/GeoJSON');
require('./CoreServiceBase');
SuperMap.REST.SpatialAnalystBase = SuperMap.Class(SuperMap.CoreServiceBase, {

    /**
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"iserver","geojson",默认为geojson
     */
    format: "geojson",

    initialize: function (url, options) {
        SuperMap.CoreServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        this.format = this.format.toLowerCase();
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.CoreServiceBase.prototype.destroy.apply(this, arguments);
        this.format = null;
    },

    /**
     * Method: getMapStatusCompleted
     * 分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function (result) {
        var me = this, analystResult;
        result = SuperMap.Util.transformResult(result);
        if (result && result.recordsets && me.format === "geojson") {
            analystResult = [];
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    var geoJSONFormat = new SuperMap.Format.GeoJSON();
                    var feature = JSON.parse(geoJSONFormat.write(recordsets[i].features));
                    analystResult.push(feature);
                }
            }

        } else {
            analystResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: analystResult});
    },

    CLASS_NAME: "SuperMap.REST.SpatialAnalystBase"
});

module.exports = function (url, options) {
    return new SuperMap.REST.SpatialAnalystBase(url, options);
};
