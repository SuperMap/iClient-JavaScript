/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {
    DataFormat,
    GetFeaturesByIDsService,
    GetFeaturesBySQLService,
    GetFeaturesByBoundsService,
    GetFeaturesByBufferService,
    GetFeaturesByGeometryService,
    EditFeaturesService
} from '@supermap/iclient-common';
import {
    Util
} from '../core/Util';
import {
    ServiceBase
} from './ServiceBase';

/**
 * @class ol.supermap.FeatureService
 * @constructs ol.supermap.FeatureService
 * @category  iServer Data Feature
 * @classdesc 数据集类。提供：ID 查询，范围查询，SQL查询，几何查询，bounds 查询，缓冲区查询，地物编辑。
 * @example
 *      new ol.supermap.FeatureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 与客户端交互的服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @extends {ol.supermap.ServiceBase}
 */
export class FeatureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByIDs
     * @description 数据集 ID 查询服务。
     * @param {SuperMap.GetFeaturesByIDsParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的数据格式。
     */
    getFeaturesByIDs(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByIDsService = new GetFeaturesByIDsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByIDsService.processAsync(me._processParams(params));

    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByBounds
     * @description 数据集 Bounds 查询服务。
     * @param {SuperMap.GetFeaturesByBoundsParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的数据格式。
     */
    getFeaturesByBounds(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByBoundsService = new GetFeaturesByBoundsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByBoundsService.processAsync(me._processParams(params));
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集 Buffer 查询服务。
     * @param {SuperMap.GetFeaturesByBufferParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的数据格式。
     */
    getFeaturesByBuffer(params, callback, resultFormat) {
        var me = this;
        var getFeatureService = new GetFeaturesByBufferService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeatureService.processAsync(me._processParams(params));
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesBySQL
     * @description 数据集 SQL 查询服务。
     * @param {SuperMap.GetFeaturesBySQLParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的数据格式。
     */
    getFeaturesBySQL(params, callback, resultFormat) {
        var me = this;
        var getFeatureBySQLService = new GetFeaturesBySQLService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        getFeatureBySQLService.processAsync(me._processParams(params));
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类。
     * @param {SuperMap.GetFeaturesByGeometryParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {SuperMap.DataFormat} [resultFormat=SuperMap.DataFormat.GEOJSON] - 返回的数据格式。
     */
    getFeaturesByGeometry(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByGeometryService = new GetFeaturesByGeometryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByGeometryService.processAsync(me._processParams(params));
    }

    /**
     * @function ol.supermap.FeatureService.prototype.editFeatures
     * @description 地物编辑服务。
     * @param {SuperMap.EditFeaturesParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    editFeatures(params, callback) {
        if (!params || !params.dataSourceName || !params.dataSetName) {
            return;
        }
        var me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;

        url += "/datasources/" + dataSourceName + "/datasets/" + dataSetName;
        var editFeatureService = new EditFeaturesService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        editFeatureService.processAsync(me._processParams(params));
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        var me = this;
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        params.fromIndex = params.fromIndex ? params.fromIndex : 0;
        params.toIndex = params.toIndex ? params.toIndex : -1;
        if (params.bounds) {
            params.bounds = Util.toSuperMapBounds(params.bounds);
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
                    return feature;
                });
            } else {
                features.push(me._createServerFeature(params.features));
            }
            params.features = features;
        }
        return params;
    }

    _createServerFeature(geoFeature) {
        var feature = {},
            fieldNames = [],
            fieldValues = [];
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
        if (geoFeature.getId()) {
            feature.id = geoFeature.getId();
        }
        feature.geometry = Util.toSuperMapGeometry((new ol.format.GeoJSON()).writeFeatureObject(geoFeature));
        return feature;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}

ol.supermap.FeatureService = FeatureService;