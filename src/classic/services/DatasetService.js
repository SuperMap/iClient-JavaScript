/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { CommonServiceBase } from '@supermap/iclient-common/iServer/CommonServiceBase';
import { DatasetService as CommonDatasetService } from '@supermap/iclient-common/iServer/DatasetService';
import { CreateDatasetParameters } from '@supermap/iclient-common/iServer/CreateDatasetParameters';
import { UpdateDatasetParameters } from '@supermap/iclient-common/iServer/UpdateDatasetParameters';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';

/**
 * @class SuperMap.REST.DatasetService
 * @category  iServer Data Dataset
 * @classdesc 数据集查询。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class DatasetService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.REST.DatasetService";
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.getDatasets
     * @description 数据集查询服务。
     * @example
     *   new SuperMap.REST.DatasetService(url).getDatasets(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    getDatasets(datasourceName, callback) {
        if (!datasourceName) {
            return;
        }
        const me = this;
        const datasetService = new CommonDatasetService(me.url, {
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.getDatasetsService(datasourceName);
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.getDataset
     * @description 数据集查询服务。
     * @example
     *   new SuperMap.REST.DatasetService(url).getDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    getDataset(datasourceName, datasetName, callback) {
        if (!datasourceName || !datasetName) {
            return;
        }
        const me = this;
        const datasetService = new CommonDatasetService(me.url, {
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.getDatasetService(datasourceName, datasetName);
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.setDataset
     * @description 数据集信息设置服务。可实现修改已存在数据集，新增不存在数据集。
     * @example
     *   new SuperMap.REST.DatasetService(url).setDataset(params, function(result){
     *     //doSomething
     *   });
     * @param {CreateDatasetParameters | UpdateDatasetParameters } params - 数据集创建参数类或数据集信息更改参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    setDataset(params, callback) {
        if (!(params instanceof CreateDatasetParameters) && !(params instanceof UpdateDatasetParameters)) {
            return;
        } 
        let datasetParams;
        if (params instanceof CreateDatasetParameters) {
            datasetParams = {
                "datasetType": params.datasetType,
                "datasetName": params.datasetName
            }
        } else if (params instanceof UpdateDatasetParameters) {
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
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.setDatasetService(datasetParams);
    }

    /**
     * @function SuperMap.REST.DatasetService.prototype.deleteDataset
     * @description 指定数据源下的数据集删除服务。
     * @example
     *   new SuperMap.REST.DatasetService(url).deleteDataset(datasourceName, datasetName, function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {string} datasetName - 数据集名称。
     * @param {RequestCallback} callback - 回调函数。
     */
    deleteDataset(datasourceName, datasetName, callback) {
        const me = this;
        const url = CommonUtil.urlPathAppend(me.url, `datasources/name/${datasourceName}/datasets/name/${datasetName}`);
        const datasetService = new CommonDatasetService(url, {
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasetService.deleteDatasetService();
    }
}
SuperMap.REST.DatasetService = DatasetService;
