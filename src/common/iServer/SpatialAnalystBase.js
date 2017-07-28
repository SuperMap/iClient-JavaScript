var SuperMap = require('../SuperMap');
var GeoJSONFormat = require('../format/GeoJSON');
var ServiceBase = require('./ServiceBase');
SuperMap.SpatialAnalystBase = SuperMap.Class(ServiceBase, {
    /**
     * @class SuperMap.SpatialAnalystBase
     * @constructs SuperMap.SpatialAnalystBase
     * @classdesc
     * 空间分析服务基类。
     * @extends {SuperMap.ServiceBase}
     * @api
     */

    /**
     *  Property: format
     *  {String} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式
     *  参数格式为"ISERVER","GEOJSON",GEOJSON
     */
    format: SuperMap.DataFormat.GEOJSON,

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
        if (options && options.format) {
            this.format = options.format.toUpperCase();
        }
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        ServiceBase.prototype.destroy.apply(this, arguments);
        this.format = null;
    },

    /**
     * @method SuperMap.SpatialAnalystBase.serviceProcessCompleted
     * @description 分析完成，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted: function (result) {
        var me = this, analystResult;
        result = SuperMap.Util.transformResult(result);
        if (result && me.format === SuperMap.DataFormat.GEOJSON && typeof me.toGeoJSONResult === 'function') {
            analystResult = me.toGeoJSONResult(result);
        }
        if (!analystResult) {
            analystResult = result;
        }
        me.events.triggerEvent("processCompleted", {result: analystResult});
    },
    /**
     * @method SuperMap.SpatialAnalystBase.toGeoJSONResult
     * @description 将含有geometry的数据转换为geojson格式。
     * @param result - {Object} 服务器返回的结果对象。
     *
     */
    toGeoJSONResult: function (result) {
        if (!result) {
            return null;
        }
        var geoJSONFormat = new GeoJSONFormat();
        if (result.recordsets) {
            for (var i = 0, recordsets = result.recordsets, len = recordsets.length; i < len; i++) {
                if (recordsets[i].features) {
                    recordsets[i].features = JSON.parse(geoJSONFormat.write(recordsets[i].features));
                }
            }
        } else if (result.recordset && result.recordset.features) {
            result.recordset.features = JSON.parse(geoJSONFormat.write(result.recordset.features));
        }

        return result;
    },
    CLASS_NAME: "SuperMap.SpatialAnalystBase"
});

module.exports = SuperMap.SpatialAnalystBase;
