/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil} from '../commontypes/Util';
import { GetFeaturesByIDsService } from './GetFeaturesByIDsService';
import { GetFeaturesBySQLService } from './GetFeaturesBySQLService';
import { GetFeaturesByBoundsService } from './GetFeaturesByBoundsService';
import { GetFeaturesByBufferService } from './GetFeaturesByBufferService';
import { GetFeaturesByGeometryService } from './GetFeaturesByGeometryService';
import { EditFeaturesService } from './EditFeaturesService';
import { DataFormat } from '../REST';

/**
 * @class FeatureService
 * @constructs FeatureService
 * @category  iServer Data Feature
 * @classdesc 数据集类。提供：ID 查询，范围查询，SQL查询，几何查询，bounds 查询，缓冲区查询，地物编辑。
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
     * @param {GetFeaturesByIDsParameters} params - ID查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
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
            format: resultFormat
        });
        getFeaturesByIDsService.processAsync(params);

    }

    /**
     * @function FeatureService.prototype.getFeaturesByBounds
     * @description 数据集 Bounds 查询服务。
     * @param {GetFeaturesByBoundsParameters} params - 数据集范围查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
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
        getFeaturesByBoundsService.processAsync(params);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByBuffer
     * @description 数据集 Buffer 查询服务。
     * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
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
        getFeatureService.processAsync(params);
    }

    /**
     * @function FeatureService.prototype.getFeaturesBySQL
     * @description 数据集 SQL 查询服务。
     * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
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

        getFeatureBySQLService.processAsync(params);
    }

    /**
     * @function FeatureService.prototype.getFeaturesByGeometry
     * @description 数据集几何查询服务类。
     * @param {GetFeaturesByGeometryParameters} params - 数据集几何查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回的数据格式。
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
        getFeaturesByGeometryService.processAsync(params);
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
        url = CommonUtil.urlPathAppend(url, "datasources/" + dataSourceName + "/datasets/" + dataSetName);

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
        editFeatureService.processAsync(params);
    }
    _processFormat(resultFormat) {
      return resultFormat ? resultFormat : DataFormat.GEOJSON;
  }
}
