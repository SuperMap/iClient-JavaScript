import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import * as Util from '../core/Util';
import {CommontypesConversion} from '../core/CommontypesConversion';
import {
    DataFormat,
    GetFeaturesByIDsService,
    GetFeaturesBySQLService,
    GetFeaturesByBoundsService,
    GetFeaturesByBufferService,
    GetFeaturesByGeometryService,
    EditFeaturesService
} from '@supermap/iclient-common';

/**
 * @class L.supermap.featureService
 * @classdesc 要素数据集类。提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询，地物编辑
 * @category  iServer Data Feature
 * @example
 *      L.supermap.featureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 * @extends L.supermap.ServiceBase
 * @param url - {string} 要素数据集服务地址
 * @param options - {Object} 创建要素数据集服务类可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
 */
export var FeatureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.featureService.prototype.getFeaturesByIDs
     * @description 数据集ID查询服务
     * @param params {SuperMap.GetFeaturesByIDsParameters} ID 查询参数类
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回结果类型
     */
    getFeaturesByIDs: function (params, callback, resultFormat) {
        var me = this;
        var getFeaturesByIDsService = new GetFeaturesByIDsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByIDsService.processAsync(me._processParams(params));

    },

    /**
     * @function L.supermap.featureService.prototype.getFeaturesByBounds
     * @description 数据集Bounds查询服务
     * @param params {SuperMap.GetFeaturesByBoundsParameters} 数据集范围查询参数类
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回结果类型
     */
    getFeaturesByBounds: function (params, callback, resultFormat) {
        var me = this;
        var getFeaturesByBoundsService = new GetFeaturesByBoundsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByBoundsService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.featureService.prototype.getFeaturesByBuffer
     * @description 数据集Buffer查询服务
     * @param params {SuperMap.GetFeaturesByBufferParameters} 数据服务中数据集缓冲区查询参数类
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回结果类型
     */
    getFeaturesByBuffer: function (params, callback, resultFormat) {
        var me = this;
        var getFeatureService = new GetFeaturesByBufferService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeatureService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.featureService.prototype.getFeaturesBySQL
     * @description 数据集SQL查询服务
     * @param params {SuperMap.GetFeaturesBySQLParameters} 数据服务中数据集SQL查询参数类
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回结果类型
     */
    getFeaturesBySQL: function (params, callback, resultFormat) {
        var me = this;
        var getFeatureBySQLService = new GetFeaturesBySQLService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeatureBySQLService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.featureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类
     * @param params {SuperMap.GetFeaturesByGeometryParameters} 数据集几何查询参数类
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回结果类型
     */
    getFeaturesByGeometry: function (params, callback, resultFormat) {
        var me = this;
        var getFeaturesByGeometryService = new GetFeaturesByGeometryService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByGeometryService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.featureService.prototype.editFeatures
     * @description 地物编辑服务
     * @param params {SuperMap.EditFeaturesParameters} 数据服务中数据集添加、修改、删除参数类
     * @param callback - {function} 回调函数
     */
    editFeatures: function (params, callback) {

        if (!params || !params.dataSourceName || !params.dataSetName) {
            return;
        }

        var me = this,
            url = me.url,
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
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        params.fromIndex = params.fromIndex ? params.fromIndex : 0;
        params.toIndex = params.toIndex ? params.toIndex : -1;
        params.isUseBatch = (params.isUseBatch == null) ? false : params.isUseBatch;
        if (params.bounds) {
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds);
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
                    return feature;
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

        geoJSONFeature = geoFeature || {};

        for (var key in geoJSONFeature.properties) {
            fieldNames.push(key);
            fieldValues.push(geoJSONFeature.properties[key]);
        }
        feature.fieldNames = fieldNames;
        feature.fieldValues = fieldValues;
        if (geoJSONFeature.id) {
            feature.id = geoJSONFeature.id;
        }
        feature.geometry = Util.toSuperMapGeometry(geoJSONFeature);
        return feature;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
});

export var featureService = function (url, options) {
    return new FeatureService(url, options);
};

L.supermap.featureService = featureService;