/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {DatasetService as CommonDatasetService} from '@supermap/iclient-common/iServer/DatasetService';
import {
    CreateDatasetParameters,
    UpdateDatasetParameters,
    CommonUtil
} from '@supermap/iclient-common';

/**
 * @class  L.supermap.datasetService
 * @classdesc 数据集信息服务类。
 * @category iServer Data Dataset
 * @extends {L.supermap.ServiceBase}
 * @param {string} url - 数据集服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export var DatasetService = ServiceBase.extend({

    initialize: function (url,options) {
        ServiceBase.prototype.initialize.call(this, url,options);
    },

    
    /**
     * @function L.supermap.datasetService.prototype.getDatasets
     * @description 数据集查询服务。
     * @example
     *   L.supermap.datasetService(url).getDatasets(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    getDatasets: function (datasourceName, callback) {
        if (!datasourceName) {
            return;
        }
        const me = this;
        const datasetService = new CommonDatasetService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.getDatasetsService(datasourceName);
        },

    /**
     * @function L.supermap.DatasetService.prototype.getDataset
     * @description 数据集信息查询服务。
     * @example
     *   L.supermap.datasetService(url).getDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    getDataset: function (datasourceName, datasetName, callback) {
        if (!datasourceName || !datasetName) {
            return;
        }
        const me = this;
        const datasetService = new CommonDatasetService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.getDatasetService(datasourceName, datasetName);
    },

    /**
     * @function  L.supermap.datasetService.prototype.setDataset
     * @description 数据集信息设置服务。可实现修改已存在数据集，新增不存在数据集。
     * @example
     *   L.supermap.datasetService(url).setDataset(params, function(result){
     *     //doSomething
     *   });
     * @param {SuperMap.CreateDatasetParameters | SuperMap.UpdateDatasetParameters } params - 数据集设置参数类(当前数据源下的数据集不存在时，新建数据集) || 数据集信息更改参数类。(当前数据源下的数据集存在时，更改数据集信息)
     * @param {RequestCallback} callback - 回调函数。
     */
    setDataset(params, callback) {
        if(!(params instanceof CreateDatasetParameters) && !(params instanceof UpdateDatasetParameters)){
            return;
        }else if (params instanceof CreateDatasetParameters) {
            var datasetParams = {
                "datasetType": params.datasetType,
                "datasetName": params.datasetName
            }
        }else if(params instanceof UpdateDatasetParameters){
             datasetParams = {
                    "datasetName": params.datasetName,
                    "isFileCache": params.isFileCache,
                    "description": params.description,
                    "prjCoordSys": params.prjCoordSys,
                    "charset": params.charset
                }
        }
        const me = this;
        const url = CommonUtil.urlPathAppend(me.url, `datasources/name/${params.datasourceName}/datasets/name/${params.datasetName}`);
        const datasetService = new CommonDatasetService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.setDatasetService(datasetParams);
    },

    /**
     * @function  L.supermap.datasetService.prototype.deleteDataset
     * @description 指定数据源下的数据集删除服务。
     * @example
     *   L.supermap.datasetService(url).deleteDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    deleteDataset: function (datasourceName, datasetName, callback) {
        const me = this;
        const url = CommonUtil.urlPathAppend(me.url, `datasources/name/${datasourceName}/datasets/name/${datasetName}`);
        const datasetService = new CommonDatasetService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.deleteDatasetService();
        }
});

export var datasetService = function (url, options) {
    return new DatasetService(url, options);
};

L.supermap.datasetService = datasetService;