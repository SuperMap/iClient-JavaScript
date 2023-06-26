/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { DataFormat } from '@supermap/iclient-common/REST';
import { EditFeaturesService } from '@supermap/iclient-common/iServer/EditFeaturesService';
import { FeatureService as CommonFeatureService } from '@supermap/iclient-common/iServer/FeatureService';
import { Util } from '../core/Util';
import { ServiceBase } from './ServiceBase';
import GeoJSON from 'ol/format/GeoJSON';

/**
 * @class FeatureService
 * @constructs FeatureService
 * @category  iServer Data Feature
 * @classdesc 数据集类。提供：ID 查询，范围查询，SQL查询，几何查询，bounds 查询，缓冲区查询，地物编辑。
 * @modulecategory Services
 * @example
 *      new FeatureService(url).getFeaturesByIDs(param,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {ServiceBase}
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
   * @param {GetFeaturesByIDsParameters} params - ID查询参数类。
   * @param {RequestCallback} callback - 回调函数。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
   */
  getFeaturesByIDs(params, callback, resultFormat) {
    params = this._processParams(params);
    this._featureService.getFeaturesByIDs(params, callback, resultFormat);
  }

  /**
   * @function FeatureService.prototype.getFeaturesByBounds
   * @description 数据集 Bounds 查询服务。
   * @param {GetFeaturesByBoundsParameters} params - 数据集范围查询参数类。
   * @param {RequestCallback} callback - 回调函数。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
   */
  getFeaturesByBounds(params, callback, resultFormat) {
    params = this._processParams(params);
    this._featureService.getFeaturesByBounds(params, callback, resultFormat);
  }

  /**
   * @function FeatureService.prototype.getFeaturesByBuffer
   * @description 数据集 Buffer 查询服务。
   * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数类。
   * @param {RequestCallback} callback - 回调函数。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
   */
  getFeaturesByBuffer(params, callback, resultFormat) {
    params = this._processParams(params);
    this._featureService.getFeaturesByBuffer(params, callback, resultFormat);
  }

  /**
   * @function FeatureService.prototype.getFeaturesBySQL
   * @description 数据集 SQL 查询服务。
   * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数类。
   * @param {RequestCallback} callback - 回调函数。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
   */
  getFeaturesBySQL(params, callback, resultFormat) {
    params = this._processParams(params);
    this._featureService.getFeaturesBySQL(params, callback, resultFormat);
  }

  /**
   * @function FeatureService.prototype.getFeaturesByGeometry
   * @description 数据集几何查询服务类。
   * @param {GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
   * @param {RequestCallback} callback - 回调函数。
   * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
   */
  getFeaturesByGeometry(params, callback, resultFormat) {
    params = this._processParams(params);
    this._featureService.getFeaturesByGeometry(params, callback, resultFormat);
  }

  /**
   * @function FeatureService.prototype.editFeatures
   * @description 地物编辑服务。
   * @param {EditFeaturesParameters} params - 数据服务中数据集添加、修改、删除参数类。
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

  _processParams(params) {
    if (!params) {
      return {};
    }
    var me = this;
    params.returnContent = params.returnContent == null ? true : params.returnContent;
    params.fromIndex = params.fromIndex ? params.fromIndex : 0;
    params.toIndex = params.toIndex ? params.toIndex : -1;
    if (params.bounds) {
      params.bounds = Util.toSuperMapBounds(params.bounds);
    }
    if (params.geometry) {
      params.geometry = Util.toSuperMapGeometry(JSON.parse(new GeoJSON().writeGeometry(params.geometry)));
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
    feature.geometry = Util.toSuperMapGeometry(new GeoJSON().writeFeatureObject(geoFeature));
    return feature;
  }

  _processFormat(resultFormat) {
    return resultFormat ? resultFormat : DataFormat.GEOJSON;
  }
}
