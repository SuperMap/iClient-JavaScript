/**
 * Class: SuperMap.REST.SpatialAnalystBase
 * 空间分析服务基类。
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../format/GeoJSON');
require('./ServiceBase');
SuperMap.REST.SpatialAnalystBase = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"ISERVER","GEOJSON",GEOJSON
     */
    format: SuperMap.Format.GEOJSON,

    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options && options.format) {
            this.format = options.format.toUpperCase();
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
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
        if (result && me.format === SuperMap.Format.GEOJSON && typeof me.toGeoJSONResult === 'function') {
            analystResult = me.toGeoJSONResult(result);
        }
        if (!analystResult) {
            analystResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: analystResult, originalResult: result});
    },
    /**
     * Method: toGeoJSONResult
     * 将含有geometry的数据转换为geojson格式。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    toGeoJSONResult: function (result) {
        if (!result) {
            return null;
        }
        var geoJSONResult;
        var geoJSONFormat = new SuperMap.Format.GeoJSON();
        if (result.recordsets) {
            geoJSONResult = [];
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    var feature = JSON.parse(geoJSONFormat.write(recordsets[i].features));
                    geoJSONResult.push(feature);
                }
            }
        } else if (result.recordset && result.recordset.features) {
            geoJSONResult = JSON.parse(geoJSONFormat.write(result.recordset.features));
        }
        
        return geoJSONResult;
    },
    CLASS_NAME: "SuperMap.REST.SpatialAnalystBase"
});

module.exports = function (url, options) {
    return new SuperMap.REST.SpatialAnalystBase(url, options);
};
