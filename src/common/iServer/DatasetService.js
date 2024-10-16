/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';

/**
 * @class DatasetService
 * @deprecatedclass SuperMap.DatasetService
 * @category iServer Data Dataset
 * @classdesc 数据集查询服务。
 * @param {string} url - 服务的访问地址。如访问World Data服务，只需将url设为：http://localhost:8090/iserver/services/data-world/rest/data 即可。
 * @param {Object} options - 参数。
 * @param {DataFormat} [options.format=DataFormat.GEOJSON] - 查询结果返回格式，目前支持 iServerJSON 和 GeoJSON 两种格式。参数格式为 "ISERVER"，"GEOJSON"。
 * @param {string}options.datasource - 数据源名称。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class DatasetService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        if(!options){
            return;
        }
        /**
         * @member {string} DatasetService.prototype.datasource
         * @description 要查询的数据集所在的数据源名称。
         */
        this.datasource = null;

        /**
         *  @member {string} DatasetService.prototype.dataset
         *  @description 要查询的数据集名称。
         */
        this.dataset = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.DatasetService";
    }

    /**
     * @function DatasetService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        me.datasource = null;
        me.dataset = null;
    }

    /**
     * @function DatasetService.prototype.getDatasetsService
     * @description 执行服务，查询数据集服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasetsService(params, callback) {
        const url = Util.urlPathAppend(this.url,`datasources/name/${params}/datasets`);
        return this.processAsync(url, 'GET', callback);
    }

    /**
     * @function DatasetService.prototype.getDatasetService
     * @description 执行服务，查询数据集信息服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasetService(datasourceName, datasetName, callback) {
        const url = Util.urlPathAppend(this.url,`datasources/name/${datasourceName}/datasets/name/${datasetName}`);
        return this.processAsync(url, 'GET', callback);
    }

    /**
     * @function DatasetService.prototype.setDatasetService
     * @description 执行服务，更改数据集信息服务。
     * @returns {Promise} Promise 对象。
     */
    setDatasetService(params, callback) {
        if (!params) {
            return;
        }
        const url = Util.urlPathAppend(this.url, `datasources/name/${params.datasourceName}/datasets/name/${params.datasetName}`);
        delete params.datasourceName;
        return this.processAsync(url, 'PUT', callback, params);
    }

     /**
     * @function DatasetService.prototype.deleteDatasetService
     * @description 执行服务，删除数据集信息服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    deleteDatasetService(datasourceName, datasetName, callback) {
      const url = Util.urlPathAppend(this.url, `datasources/name/${datasourceName}/datasets/name/${datasetName}`);
      return this.processAsync(url, 'DELETE', callback);
    }

    processAsync(url, method, callback, params) {
       var me = this;
       let requestConfig = {
          url,
          method,
          scope: me,
          success: callback,
          failure: callback
        }
        params && (requestConfig.data = Util.toJSON(params));
        return me.request(requestConfig);
    }
}
