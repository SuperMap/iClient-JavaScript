/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil } from '../commontypes/Util';
import { GetFeaturesByIDsService } from './GetFeaturesByIDsService';
import { GetFeaturesBySQLService } from './GetFeaturesBySQLService';
import { GetFeaturesByBoundsService } from './GetFeaturesByBoundsService';
import { GetFeaturesByBufferService } from './GetFeaturesByBufferService';
import { GetFeaturesByGeometryService } from './GetFeaturesByGeometryService';
import { FeatureAttachmentsService } from './FeatureAttachmentsService';
import { EditFeaturesService } from './EditFeaturesService';
import { DataFormat } from '../REST';

const FEATURE_SERVICE_MAP = {
  id: GetFeaturesByIDsService,
  sql: GetFeaturesBySQLService ,
  bounds: GetFeaturesByBoundsService, 
  buffer: GetFeaturesByBufferService, 
  geometry: GetFeaturesByGeometryService
}

/**
 * @class FeatureService
 * @constructs FeatureService
 * @category  iServer Data Feature
 * @classdesc 数据集类。提供：ID 查询，范围查询，SQL查询，几何查询，缓冲区查询，地物编辑，要素附件查询、添加、删除等方法。
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
export class FeatureService {

    constructor(url, options) {
        this.url = url;
        this.options = options || {};
    }

    /**
     * @function FeatureService.prototype.getFeaturesByIDs
     * @description 数据集 ID 查询服务。
     * @param {GetFeaturesByIDsParameters} params - ID 查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByIDs(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByIDsService = new GetFeaturesByIDsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: resultFormat
        });
        return getFeaturesByIDsService.processAsync(params, callback);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBounds
     * @description 数据集范围查询服务。
     * @param {GetFeaturesByBoundsParameters} params - 数据集范围查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByBounds(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByBoundsService = new GetFeaturesByBoundsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return getFeaturesByBoundsService.processAsync(params, callback);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集缓冲区查询服务。
     * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByBuffer(params, callback, resultFormat) {
        var me = this;
        var getFeatureService = new GetFeaturesByBufferService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return getFeatureService.processAsync(params, callback);
    }

    /**
     * @function FeatureService.prototype.getFeaturesBySQL
     * @description 数据集 SQL 查询服务。
     * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesBySQL(params, callback, resultFormat) {
        var me = this;
        var getFeatureBySQLService = new GetFeaturesBySQLService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return getFeatureBySQLService.processAsync(params, callback);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类。
     * @param {GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesByGeometry(params, callback, resultFormat) {
        var me = this;
        var getFeaturesByGeometryService = new GetFeaturesByGeometryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            format: me._processFormat(resultFormat)
        });
        return getFeaturesByGeometryService.processAsync(params, callback);
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
        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName);

        var editFeatureService = new EditFeaturesService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return editFeatureService.processAsync(params, callback);
    }

    /**
     * @function FeatureService.prototype.getMetadata
     * @description 地理要素元信息服务。
     * @param {Object} params - 包括数据源名称、数据集名称、要素 ID。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getMetadata(params, callback) {
        var me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;
        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName);
        var editFeatureService = new EditFeaturesService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return editFeatureService.getMetaData(params, callback);
    }
    /**
     * @function FeatureService.prototype.getFeatureAttachments
     * @description 要素附件查询服务。
     * @version 11.2.0
     * @param {AttachmentsParameters} params - 要素附件服务中附件查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getFeatureAttachments(params, callback) {
        if (!params || !params.dataSourceName || !params.dataSetName || !params.featureId == null) {
            return;
        }
        var me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;
        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName);
        var featureAttachmentsService = new FeatureAttachmentsService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return featureAttachmentsService.getAttachments(params, callback);
    }

    /**
     * @function FeatureService.prototype.editFeatureAttachments
     * @description 要素附件编辑服务。
     * @version 11.2.0
     * @param {EditAttachmentsParameters} params - 要素附件服务中附件添加、删除参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    editFeatureAttachments(params, callback) {
        if (!params || !params.dataSourceName || !params.dataSetName || !params.featureId == null || !params.editType) {
            return;
        }
        var me = this,
            url = me.url,
            dataSourceName = params.dataSourceName,
            dataSetName = params.dataSetName;
        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName);
        var featureAttachmentsService = new FeatureAttachmentsService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return featureAttachmentsService.processAsync(params, callback);
    }

    /**
     * @function FeatureService.prototype.getFeaturesCount
     * @description 获取要素数量。
     * @version 11.2.0
     * @param {GetFeaturesByIDsParameters|GetFeaturesByBoundsParameters|GetFeaturesByBufferParameters|GetFeaturesByGeometryParameters|GetFeaturesBySQLParameters} params - 查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesCount(params, callback) {
      var me = this;
      var newParams = { ...params, returnCountOnly: true, returnContent: true, returnFeaturesOnly: false };
      let queryType = Object.keys(FEATURE_SERVICE_MAP).find((type) => {
        return newParams.CLASS_NAME.toLowerCase().includes(type);
      });
      var getFeaturesServiceBase = new FEATURE_SERVICE_MAP[queryType](me.url, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers
      });
      return getFeaturesServiceBase.processAsync(newParams, callback);
    }

    /**
     * @function FeatureService.prototype.getFeaturesDatasetInfo
     * @description 获取要素数据集信息。
     * @version 11.2.0
     * @param {GetFeaturesByIDsParameters|GetFeaturesByBoundsParameters|GetFeaturesByBufferParameters|GetFeaturesByGeometryParameters|GetFeaturesBySQLParameters} params - 查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getFeaturesDatasetInfo(params, callback) {
      var me = this;
      var newParams = { ...params, returnDatasetInfoOnly: true, returnContent: true, returnFeaturesOnly: false };
      let queryType = Object.keys(FEATURE_SERVICE_MAP).find((type) => {
        return newParams.CLASS_NAME.toLowerCase().includes(type);
      });
      var getFeaturesServiceBase = new FEATURE_SERVICE_MAP[queryType](me.url, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers
      });
      return getFeaturesServiceBase.processAsync(newParams, callback);
    }

    _processFormat(resultFormat) {
        return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
}
