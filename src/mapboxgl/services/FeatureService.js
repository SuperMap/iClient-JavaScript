import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
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
 * @class mapboxgl.supermap.FeatureService
 * @category  iServer Data Feature
 * @classdesc 要素数据集类。提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询，地物编辑
 * @example
 *      new mapboxgl.supermap.FeatureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 * @extends mapboxgl.supermap.ServiceBase
 * @param url - {string} 要素数据集服务地址
 * @param options - {Object} 创建要素数据集服务类可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
 */
export class FeatureService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.FeatureService.prototype.getFeaturesByIDs
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
     * @function mapboxgl.supermap.FeatureService.prototype.getFeaturesByBounds
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
     * @function mapboxgl.supermap.FeatureService.prototype.getFeaturesByBuffer
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
     * @function mapboxgl.supermap.FeatureService.prototype.getFeaturesBySQL
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
     * @function mapboxgl.supermap.FeatureService.prototype.getFeaturesByGeometry
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
     * @function mapboxgl.supermap.FeatureService.prototype.editFeatures
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

    /**
     * @private
     * @description 参数类型转换
     * @param params - {object} 由端传进的服务参数
     * @return params - {object} 转换后的对接SuperMap 服务的参数
     */
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
        if (params.editType) {
            params.editType = params.editType.toLowerCase();
        }

        //mapboxgl geojson要素对象转 SuperMap Geometry 对象
        if (params.geometry) {
            params.geometry = Util.toSuperMapGeometry(params.geometry);
        }
        //editFeature服务参数转换,传入单独得对象或对象数组
        if (params.features) {
            var features = [];
            if (Util.isArray(params.features)) {
                params.features.map(function (feature) {
                    features.push(me._createServerFeature(feature));
                    return features;
                });
            } else {
                features.push(me._createServerFeature(params.features));
            }
            params.features = features;
        }
        return params;
    }

    //geoFeature严格按照 mapboxgl geojson的结构
    _createServerFeature(geoFeature) {
        var feature = {}, fieldNames = [], fieldValues = [];
        var properties = geoFeature.properties;
        for (var key in properties) {
            fieldNames.push(key);
            fieldValues.push(properties[key]);
        }
        feature.fieldNames = fieldNames;
        feature.fieldValues = fieldValues;
        if (geoFeature.id) {
            feature.id = geoFeature.id;
        }
        feature.geometry = Util.toSuperMapGeometry(geoFeature);
        return feature;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
}

mapboxgl.supermap.FeatureService = FeatureService;