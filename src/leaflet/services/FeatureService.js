/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import '../core/Base';
 import { ServiceBase } from './ServiceBase';
 import * as Util from '../core/Util';
 import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
 import { DataFormat } from '@supermap/iclient-common/REST';
 import { CommontypesConversion } from '../core/CommontypesConversion';
 import { EditFeaturesService } from '@supermap/iclient-common/iServer/EditFeaturesService';
 import { FeatureService as CommonFeatureService } from '@supermap/iclient-common/iServer/FeatureService';

/**
 * @class FeatureService
 * @deprecatedclassinstance L.supermap.featureService
 * @classdesc 要素数据集类。提供：ID 查询，范围查询，SQL 查询，几何查询，bounds 查询，缓冲区查询，地物编辑。
 * @category  iServer Data Feature
 * @modulecategory Services
 * @example
 *      new FeatureService(url)
 *      .getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var FeatureService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._featureService = new CommonFeatureService(url, options);
    },

    /**
     * @function FeatureService.prototype.getFeaturesByIDs
     * @description 数据集 ID 查询服务。
     * @param {GetFeaturesByIDsParameters} params - ID 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByIDs: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._featureService.getFeaturesByIDs(params, callback, resultFormat);
    },

    /**
     * @function FeatureService.prototype.getFeaturesByBounds
     * @description 数据集 bounds 查询服务。
     * @param {GetFeaturesByBoundsParameters} params - 数据集范围查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByBounds: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._featureService.getFeaturesByBounds(params, callback, resultFormat);
    },

    /**
     * @function FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集 buffer 查询服务。
     * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByBuffer: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._featureService.getFeaturesByBuffer(params, callback, resultFormat);
    },

    /**
     * @function FeatureService.prototype.getFeaturesBySQL
     * @description 数据集 SQL 查询服务。
     * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesBySQL: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._featureService.getFeaturesBySQL(params, callback, resultFormat);
    },

    /**
     * @function FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类。
     * @param {GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     */
    getFeaturesByGeometry: function (params, callback, resultFormat) {
      params = this._processParams(params);
      this._featureService.getFeaturesByGeometry(params, callback, resultFormat);
    },

    /**
     * @function FeatureService.prototype.editFeatures
     * @description 地物编辑服务。
     * @param {EditFeaturesParameters} params - 数据服务中数据集添加、修改、删除参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    editFeatures: function (params, callback) {

        if (!params || !params.dataSourceName || !params.dataSetName) {
            return;
        }

        var me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;

        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName);
        var editFeatureService = new EditFeaturesService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin:me.options.crossOrigin,
            headers:me.options.headers,
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
