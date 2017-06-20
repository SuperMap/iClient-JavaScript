/**
 * Class: FeatureService
 * 数据集类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询，地物编辑
 * 用法：
 *      new ol.superMap.FeatureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 */
require('./ServiceBase');
var ol = require('openlayers');
var Util = require('../core/Util');
var SuperMap = require('../../common/SuperMap');
var GetFeaturesByIDsService = require('../../common/iServer/GetFeaturesByIDsService');
var GetFeaturesBySQLService = require('../../common/iServer/GetFeaturesBySQLService');
var GetFeaturesByBoundsService = require('../../common/iServer/GetFeaturesByBoundsService');
var GetFeaturesByBufferService = require('../../common/iServer/GetFeaturesByBufferService');
var GetFeaturesByGeometryService = require('../../common/iServer/GetFeaturesByGeometryService');
var EditFeaturesService = require('../../common/iServer/EditFeaturesService');

ol.supermap.FeatureService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.FeatureService, ol.supermap.ServiceBase);

/**
 * 数据集ID查询服务
 * @param params:
 * <SuperMap.GetFeaturesByIDsParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.FeatureService.prototype.getFeaturesByIDs = function (params, callback, resultFormat) {
    var me = this;
    var getFeaturesByIDsService = new GetFeaturesByIDsService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    getFeaturesByIDsService.processAsync(me._processParams(params));
    return me;

};

/**
 * 数据集Bounds查询服务
 * @param params:
 * <SuperMap.GetFeaturesByBoundsParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.FeatureService.prototype.getFeaturesByBounds = function (params, callback, resultFormat) {
    var me = this;
    var getFeaturesByBoundsService = new GetFeaturesByBoundsService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    getFeaturesByBoundsService.processAsync(me._processParams(params));
    return me;
};

/**
 * 数据集Buffer查询服务
 * @param params:
 * <SuperMap.GetFeaturesByBufferParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.FeatureService.prototype.getFeaturesByBuffer = function (params, callback, resultFormat) {
    var me = this;
    var getFeatureService = new GetFeaturesByBufferService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    getFeatureService.processAsync(me._processParams(params));
    return me;
};

/**
 * 数据集SQL查询服务
 * @param params:
 * <SuperMap.GetFeaturesBySQLParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.FeatureService.prototype.getFeaturesBySQL = function (params, callback, resultFormat) {
    var me = this;
    var getFeatureBySQLService = new GetFeaturesBySQLService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });

    getFeatureBySQLService.processAsync(me._processParams(params));
    return me;
};

/**
 * 数据集几何查询服务类
 * @param params:
 * <SuperMap.GetFeaturesByGeometryParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.FeatureService.prototype.getFeaturesByGeometry = function (params, callback, resultFormat) {
    var me = this;
    var getFeaturesByGeometryService = new GetFeaturesByGeometryService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });
    getFeaturesByGeometryService.processAsync(me._processParams(params));
    return me;
};

/**
 *  地物编辑服务
 * @param params
 * <SuperMap.EditFeaturesParameters>
 * @param callback
 */
ol.supermap.FeatureService.prototype.editFeatures = function (params, callback) {
    if (!params || !params.dataSourceName || !params.dataSetName) {
        return;
    }
    var me = this,
        url = me.options.url,
        dataSourceName = params.dataSourceName,
        dataSetName = params.dataSetName;

    url += "/datasources/" + dataSourceName + "/datasets/" + dataSetName;
    var editFeatureService = new EditFeaturesService(url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        }
    });
    editFeatureService.processAsync(me._processParams(params));
    return me;
};

ol.supermap.FeatureService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    var me = this;
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
    params.fromIndex = params.fromIndex ? params.fromIndex : 0;
    params.toIndex = params.fromIndex ? params.fromIndex : -1;
    if (params.bounds) {
        params.bounds = new SuperMap.Bounds(
            params.bounds[0],
            params.bounds[1],
            params.bounds[2],
            params.bounds[3]
        );
    }
    if (params.geometry) {
        params.geometry = Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
    }
    if (params.editType) {
        params.editType = params.editType.toLowerCase();
    }
    if (params.features) {
        var features = [];
        if (Util.isArray(params.features)) {
            params.features.map(function (feature) {
                features.push(me._createServerFeature(feature));
            });
        } else {
            features.push(me._createServerFeature(params.features));
        }
        params.features = features;
    }
    return params;
};

ol.supermap.FeatureService.prototype._createServerFeature = function (geoFeature) {
    var feature = {}, fieldNames = [], fieldValues = [];
    var properties = geoFeature.getProperties();
    for (var key in properties) {
        if (key === geoFeature.getGeometryName()) {
            continue;
        }
        fieldNames.push(key);
        fieldValues.push(properties[key]);
    }
    feature.fieldNames = fieldNames;
    feature.fieldValues = fieldValues;
    if (geoJSONFeature.id) {
        feature.id = geoJSONFeature.id;
    }
    feature.geometry = Util.toSuperMapGeometry((new ol.format.GeoJSON()).writeFeatureObject(geoFeature));
    return feature;
};

ol.supermap.FeatureService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

module.exports = ol.supermap.FeatureService;
