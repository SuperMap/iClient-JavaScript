/**
 * Class: FeatureService
 * 数据集类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询，地物编辑
 * 用法：
 *      L.supermap.featureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 */
var L = require("leaflet");
var SuperMap = require('../../common/SuperMap');
var ServiceBase = require('./ServiceBase');
var Util = require('../core/Util');
var GetFeaturesByIDsService = require('../../common/iServer/GetFeaturesByIDsService');
var GetFeaturesBySQLService = require('../../common/iServer/GetFeaturesBySQLService');
var GetFeaturesByBoundsService = require('../../common/iServer/GetFeaturesByBoundsService');
var GetFeaturesByBufferService = require('../../common/iServer/GetFeaturesByBufferService');
var GetFeaturesByGeometryService = require('../../common/iServer/GetFeaturesByGeometryService');
var EditFeaturesService = require('../../common/iServer/EditFeaturesService');

var FeatureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 数据集ID查询服务
     * @param params:
     * <SuperMap.GetFeaturesByIDsParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    getFeaturesByIDs: function (params, callback, resultFormat) {
        var me = this;
        var getFeaturesByIDsService = new GetFeaturesByIDsService(me.options.url, {
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByIDsService.processAsync(me._processParams(params));
        return me;

    },
    /**
     * 数据集Bounds查询服务
     * @param params:
     * <SuperMap.GetFeaturesByBoundsParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    getFeaturesByBounds: function (params, callback, resultFormat) {
        var me = this;
        var getFeaturesByBoundsService = new GetFeaturesByBoundsService(me.options.url, {
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByBoundsService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 数据集Buffer查询服务
     * @param params:
     * <SuperMap.GetFeaturesByBufferParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    getFeaturesByBuffer: function (params, callback, resultFormat) {
        var me = this;
        var getFeatureService = new GetFeaturesByBufferService(me.options.url, {
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeatureService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 数据集SQL查询服务
     * @param params:
     * <SuperMap.GetFeaturesBySQLParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    getFeaturesBySQL: function (params, callback, resultFormat) {
        var me = this;
        var getFeatureBySQLService = new GetFeaturesBySQLService(me.options.url, {
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        getFeatureBySQLService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * 数据集几何查询服务类
     * @param params:
     * <SuperMap.GetFeaturesByGeometryParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    getFeaturesByGeometry: function (params, callback, resultFormat) {
        var me = this;
        var getFeaturesByGeometryService = new GetFeaturesByGeometryService(me.options.url, {
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByGeometryService.processAsync(me._processParams(params));
        return me;
    },

    /**
     *  地物编辑服务
     * @param params
     * <SuperMap.EditFeaturesParameters>
     * @param callback
     */

    editFeatures: function (params, callback) {

        if (!params || !params.dataSourceName || !params.dataSetName) {
            return;
        }

        var me = this,
            url = me.options.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;

        url += "/datasources/" + dataSourceName + "/datasets/" + dataSetName;
        var editFeatureService = new EditFeaturesService(url, {
            eventListeners: {

                processCompleted: callback,
                processFailed: callback
            }
        });
        editFeatureService.processAsync(me._processParams(params));
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        params.fromIndex = params.fromIndex ? params.fromIndex : 0;
        params.toIndex = params.fromIndex ? params.fromIndex : -1;
        params.isUseBatch = (params.isUseBatch == null) ? false : params.isUseBatch;
        if (params.bounds && params.bounds instanceof L.LatLngBounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
        if (params.geometry) {
            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }

        if (params.editType) {
            params.editType = params.editType.toLowerCase();
        }

        var me = this;
        if (params.features) {
            var features = [];
            if (L.Util.isArray(params.features)) {
                params.features.map(function (feature) {
                    features.push(me._createServerFeature(feature));
                });
            } else {
                features.push(me._createServerFeature(params.features));
            }
            params.features = features;
        }
        return params;
    },

    _createServerFeature: function (geoFeature) {
        var geoJSONFeature, feature = {}, fieldNames = [], fieldValues = [];
        geoJSONFeature = geoFeature.toGeoJSON();
        for (var key in geoJSONFeature.properties) {
            fieldNames.push(key);
            fieldValues.push(geoJSONFeature.properties[key]);
        }
        feature.fieldNames = fieldNames;
        feature.fieldValues = fieldValues;
        feature.geometry = Util.toSuperMapGeometry(geoJSONFeature);
        return feature;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});

L.supermap.featureService = function (url, options) {
    return new FeatureService(url, options);
};

module.exports = FeatureService;
