/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { EditFeaturesService } from '@supermap/iclient-common/iServer/EditFeaturesService';
import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
import { Geometry } from '@supermap/iclient-common/commontypes/Geometry';
import { FeatureService as CommonFeatureService } from '@supermap/iclient-common/iServer/FeatureService';
/**
 * @class FeatureService
 * @category  iServer Data Feature
 * @classdesc 要素数据集类。提供：ID 查询、范围查询、SQL 查询、几何查询、缓冲区查询、地物编辑，要素附件查询、编辑等方法。
 * @modulecategory Services
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
        this._featureService = new CommonFeatureService(url, options);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByIDs
     * @description 数据集 ID 查询服务。
     * @param {GetFeaturesByIDsParameters} params - ID 查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByIDs(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._featureService.getFeaturesByIDs(params, callback, resultFormat);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBounds
     * @description 数据集范围查询服务。
     * @param {GetFeaturesByBoundsParameters} params - 数据集范围查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByBounds(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._featureService.getFeaturesByBounds(params, callback, resultFormat);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集 Buffer 查询服务。
     * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByBuffer(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._featureService.getFeaturesByBuffer(params, callback, resultFormat);
    }

    /**
     * @function FeatureService.prototype.getFeaturesBySQL
     * @description 数据集 SQL 查询服务。
     * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesBySQL(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._featureService.getFeaturesBySQL(params, callback, resultFormat);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类。
     * @param {GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByGeometry(params, callback, resultFormat) {
        params = this._processParams(params);
        return this._featureService.getFeaturesByGeometry(params, callback, resultFormat);
    }

    /**
     * @function FeatureService.prototype.editFeatures
     * @description 地物编辑服务。
     * @param {EditFeaturesParameters} params - 数据服务中数据集添加、修改、删除参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
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
            headers: me.options.headers
        });
        return editFeatureService.processAsync(me._processParams(params), callback);
    }

    /**
     * @function FeatureService.prototype.getMetadata
     * @description 地理要素元信息。
     * @version 11.1.1
     * @param {Object} params - 包括数据源名称、数据集名称、要素 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getMetadata(params, callback) {
        return this._featureService.getMetadata(params, callback);
    }

    /**
     * @function FeatureService.prototype.getFeatureAttachments
     * @description 要素附件查询服务。
     * @version 11.2.0
     * @param {AttachmentsParameters} params - 要素附件服务中附件查询除参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getFeatureAttachments(params, callback) {
        return this._featureService.getFeatureAttachments(params, callback);
    }
    
    /**
       * @function FeatureService.prototype.editFeatureAttachments
       * @description 要素附件编辑服务。
       * @version 11.2.0
       * @param {EditAttachmentsParameters} params - 要素附件服务中附件添加、删除参数类。
       * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
       * @returns {Promise} Promise 对象。
       */
    editFeatureAttachments(params, callback) {
        return this._featureService.editFeatureAttachments(params, callback);
    }
    /**
     * @private
     * @description 参数类型转换。
     * @param {Object} params - 参数。
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
}

