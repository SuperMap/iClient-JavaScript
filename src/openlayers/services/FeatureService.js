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
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';

/**
 * @class ol.supermap.FeatureService
 * @constructs ol.supermap.FeatureService
 * @category  iServer Data Feature
 * @classdesc 数据集类。提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询，地物编辑
 * @example
 *      new ol.supermap.FeatureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 * @param url - {string} 与客户端交互的服务地址。
 * @param options -{Object} 参数。
 * @extends ol.supermap.ServiceBase
 */
export class FeatureService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByIDs
     * @description 数据集ID查询服务
     * @param params - {SuperMap.GetFeaturesByIDsParameters} 查询所需参数类。
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的数据格式
     */
    getFeaturesByIDs(params, callback, resultFormat) {
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

    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByBounds
     * @description 数据集Bounds查询服务
     * @param params - {SuperMap.GetFeaturesByBoundsParameters} 查询所需参数类。
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回的数据格式
     */
    getFeaturesByBounds(params, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集Buffer查询服务
     * @param params - {SuperMap.GetFeaturesByBufferParameters} 查询所需参数类。
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的数据格式
     */
    getFeaturesByBuffer(params, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesBySQL
     * @description 数据集SQL查询服务
     * @param params - {SuperMap.GetFeaturesBySQLParameters} 查询所需参数类。
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的数据格式
     */
    getFeaturesBySQL(params, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类
     * @param params - {SuperMap.GetFeaturesByGeometryParameters} 查询所需参数类。
     * @param callback - {function} 回调函数
     * @param resultFormat {SuperMap.DataFormat} 返回的数据格式
     */
    getFeaturesByGeometry(params, callback, resultFormat) {
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
    }

    /**
     * @function ol.supermap.FeatureService.prototype.editFeatures
     * @description 地物编辑服务
     * @param params - {SuperMap.EditFeaturesParameters} 查询所需参数类。
     * @param callback - {function} 回调函数
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