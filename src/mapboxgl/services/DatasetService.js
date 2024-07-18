/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import { DatasetService as CommonDatasetService } from '@supermapgis/iclient-common/iServer/DatasetService';
import { CreateDatasetParameters } from '@supermapgis/iclient-common/iServer/CreateDatasetParameters';
import { UpdateDatasetParameters } from '@supermapgis/iclient-common/iServer/UpdateDatasetParameters';
/**
 * @class DatasetService
 * @category  iServer Data Dataset
 * @classdesc 数据集信息服务类。提供方法：查询数据集集合、查询指定数据集信息，在指定数据源下新增、修改、删除数据集等。
 * @modulecategory Services
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {ServiceBase}
 * @usage
 */

export class DatasetService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._datasetService = new CommonDatasetService(this.url, {
          proxy: this.options.proxy,
          withCredentials: this.options.withCredentials,
          crossOrigin: this.options.crossOrigin,
          headers: this.options.headers
        });
    }

    /**
     * @function DatasetService.prototype.getDatasets
     * @description 数据集查询服务。
     * @example
     *   new DatasetService(url).getDatasets(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasets(datasourceName, callback) {
      if (!datasourceName) {
        return;
      }
      return this._datasetService.getDatasetsService(datasourceName, callback);
    }

    /**
     * @function DatasetService.prototype.getDataset
     * @description 数据集查询服务。
     * @example
     *   new DatasetService(url).getDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDataset(datasourceName, datasetName, callback) {
      if (!datasourceName || !datasetName) {
        return;
      }
      return this._datasetService.getDatasetService(datasourceName, datasetName, callback);
    }

    /**
     * @function DatasetService.prototype.setDataset
     * @description 数据集信息设置服务。可实现修改已存在数据集，新增不存在数据集。
     * @example
     *   new DatasetService(url).setDataset(params, function(result){
     *     //doSomething
     *   });
     * @param {CreateDatasetParameters|UpdateDatasetParameters} params - 数据集创建参数类或数据集信息更改参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    setDataset(params, callback) {
      if(!(params instanceof CreateDatasetParameters) && !(params instanceof UpdateDatasetParameters)){
        return;
      }else if (params instanceof CreateDatasetParameters) {
          var datasetParams = {
              "datasetType": params.datasetType,
              "datasetName": params.datasetName,
              "datasourceName": params.datasourceName
          }
      }else if(params instanceof UpdateDatasetParameters){
            datasetParams = {
                  "datasetName": params.datasetName,
                  "datasourceName": params.datasourceName,
                  "isFileCache": params.isFileCache,
                  "description": params.description,
                  "prjCoordSys": params.prjCoordSys,
                  "charset": params.charset
              }
      }
      return this._datasetService.setDatasetService(datasetParams, callback);
    }

    /**
     * @function DatasetService.prototype.deleteDataset
     * @description 指定数据源下的数据集删除服务。
     * @example
     *   new DatasetService(url).deleteDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    deleteDataset(datasourceName, datasetName, callback) {
      return this._datasetService.deleteDatasetService(datasourceName, datasetName, callback);
    }
}
