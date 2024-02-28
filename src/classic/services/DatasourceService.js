/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from '@supermap/iclient-common/iServer/CommonServiceBase';
import {DatasourceService as CommonDatasourceService} from '@supermap/iclient-common/iServer/DatasourceService';
import { SetDatasourceParameters } from '@supermap/iclient-common/iServer/SetDatasourceParameters';

/**
 * @class SuperMap.REST.DatasourceService
 * @category  iServer Data Datasource
 * @classdesc 数据源服务类。提供方法：查询数据源集合、查询指定数据源信息、设置指定数据源信息。
 * 可以获取的数据源信息包括数据源名称、数据源描述、引擎类型、距离单位、坐标单位、投影信息等。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class DatasourceService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        const me = this;
        this._datasourceService = new CommonDatasourceService(me.url, {
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers
        });
        this.CLASS_NAME = "SuperMap.REST.DatasourceService";
    }

    /**
     * @function SuperMap.REST.DatasourceService.prototype.getDatasources
     * @description 数据源集合查询服务。
     * @example
     *   new SuperMap.REST.DatasourceService(url).getDatasources(function(result){
     *     //doSomething
     *   });
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasources(callback) {
        return this._datasourceService.getDatasourcesService(callback);
    }
    
    /**
     * @function SuperMap.REST.DatasourceService.prototype.getDatasource
     * @description 数据源信息查询服务。
     * @example
     *   new SuperMap.REST.DatasourceService(url).getDatasource(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getDatasource(datasourceName, callback) {
        if (!datasourceName) {
            return;
        }
        return this._datasourceService.getDatasourceService(datasourceName, callback);
    }

   /**
     * @function SuperMap.REST.DatasourceService.prototype.setDatasource
     * @description 数据源信息设置服务。可实现更改当前数据源信息。
     * @example
     *  new SuperMap.REST.DatasourceService(url).setDatasource(params, function(result){
     *     //doSomething
     *   });
     * @param {SetDatasourceParameters} params - 数据源信息查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    setDatasource(params, callback) {
        if (!(params instanceof SetDatasourceParameters)) {
            return;
        }
        const datasourceParams = {
            description: params.description ,
            coordUnit: params.coordUnit,
            distanceUnit: params.distanceUnit,
            datasourceName: params.datasourceName
        };
        return this._datasourceService.setDatasourceService(datasourceParams, callback);
    }
}
SuperMap.REST.DatasourceService = DatasourceService;
