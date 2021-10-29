/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { DataFormat } from '@supermap/iclient-common/REST';
import { GetFeaturesByIDsService } from '@supermap/iclient-common/iServer/GetFeaturesByIDsService';
import { GetFeaturesBySQLService } from '@supermap/iclient-common/iServer/GetFeaturesBySQLService';
import { GetFeaturesByBoundsService } from '@supermap/iclient-common/iServer/GetFeaturesByBoundsService';
import { GetFeaturesByBufferService } from '@supermap/iclient-common/iServer/GetFeaturesByBufferService';
import { GetFeaturesByGeometryService } from '@supermap/iclient-common/iServer/GetFeaturesByGeometryService';
import { EditFeaturesService } from '@supermap/iclient-common/iServer/EditFeaturesService';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { Geometry } from '@supermap/iclient-common/commontypes/Geometry';

/**
 * @class FeatureService
 * @category  iServer Data Feature
 * @classdesc 要素数据集类。提供：ID 查询、范围查询、SQL 查询、几何查询、bounds 查询、缓冲区查询、地物编辑。
 * @example
 * new FeatureService(url)
 *  .getFeaturesByIDs(param,function(result){
 *     //doSomething
 * })
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options -参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class FeatureService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByIDs
     * @description 数据集 ID 查询服务。
     * @param {GetFeaturesByIDsParameters} params - ID查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByIDs(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByIDsService = new GetFeaturesByIDsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByIDsService.processAsync(me._processParams(params));
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBounds
     * @description 数据集 Bounds 查询服务。
     * @param {GetFeaturesByBoundsParameters} params - 数据集范围查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByBounds(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByBoundsService = new GetFeaturesByBoundsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByBoundsService.processAsync(me._processParams(params));
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集 Buffer 查询服务。
     * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByBuffer(params, callback, resultFormat) {
        var me = this;
        var getFeatureService = new GetFeaturesByBufferService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeatureService.processAsync(me._processParams(params));
    }

    /**
     * @function FeatureService.prototype.getFeaturesBySQL
     * @description 数据集 SQL 查询服务。
     * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数类。
     * @param {RequestCallback} callback 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesBySQL(params, callback, resultFormat) {
        var me = this;
        var getFeatureBySQLService = new GetFeaturesBySQLService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        getFeatureBySQLService.processAsync(me._processParams(params));
    }

    /**
     * @function FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类。
     * @param {GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByGeometry(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByGeometryService = new GetFeaturesByGeometryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });
        getFeaturesByGeometryService.processAsync(me._processParams(params));
    }

    /**
     * @function FeatureService.prototype.editFeatures
     * @description 地物编辑服务。
     * @param {EditFeaturesParameters} params - 数据集添加、修改、删除参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    editFeatures(params, callback) {
        if (!params || !params.dataSourceName || !params.dataSetName) {
            return;
        }
        var me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;

        url = CommonUtil.urlPathAppend(url, 'datasources/' + dataSourceName + '/datasets/' + dataSetName);
        var editFeatureService = new EditFeaturesService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        editFeatureService.processAsync(me._processParams(params));
    }

    /**
     * @private
     * @description 参数类型转换。
     * @param {Object} params - 参数 。
     * @returns {Object} params - 转换后的对接 SuperMap 服务的参数。
     */
    _processParams(params) {
        if (!params) {
            return {};
        }
        var me = this;
        params.returnContent = params.returnContent == null ? true : params.returnContent;
        params.fromIndex = params.fromIndex ? params.fromIndex : 0;
        params.toIndex = params.toIndex === 0 ? 0 : params.toIndex ? params.toIndex : -1;
        if (params.bounds) {
            params.bounds = Util.toSuperMapBounds(params.bounds);
        }
        if (params.editType) {
            params.editType = params.editType.toLowerCase();
        }

        //mapboxgl geojson要素对象转 SuperMap Geometry 对象
        if (params.geometry) {
            if (params.geometry instanceof mapboxgl.LngLatBounds) {
                params.geometry = Util.toSuperMapPolygon(params.geometry);
                params.geometry.SRID = 4326;
            } else if (params.geometry instanceof mapboxgl.Point) {
                params.geometry = new GeometryPoint(params.geometry.x, params.geometry.y);
            } else if (params.geometry instanceof mapboxgl.LngLat) {
                params.geometry = new GeometryPoint(params.geometry.lng, params.geometry.lat);
                params.geometry.SRID = 4326;
            } else if (!(params.geometry instanceof Geometry)) {
                params.geometry = Util.toSuperMapGeometry(params.geometry);
            }
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
        var feature = {},
            fieldNames = [],
            fieldValues = [];
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
        return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
}

