/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from '@supermap/iclient-common/iServer/CommonServiceBase';
import {DatasourceService as CommonDatasourceService} from '@supermap/iclient-common/iServer/DatasourceService';
import { SetDatasourceParameters } from '@supermap/iclient-common/iServer/SetDatasourceParameters';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';

/**
 * @class SuperMap.REST.DatasourceService
 * @category  iServer Data Datasource
 * @classdesc 数据源服务类。
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class DatasourceService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.REST.DatasourceService";
    }

    /**
     * @function SuperMap.REST.DatasourceService.prototype.getDatasources
     * @description 数据源集查询服务。
     * @example
     *   new SuperMap.REST.DatasourceService(url).getDatasources(function(result){
     *     //doSomething
     *   });
     * @param {RequestCallback} callback - 回调函数。
     */
    getDatasources(callback) {
        const me = this;
        const datasourceService = new CommonDatasourceService(me.url, {
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
        datasourceService.getDatasourcesService();
    }
    
    /**
     * @function SuperMap.REST.DatasourceService.prototype.getDatasource
     * @description 数据源信息查询服务。
     * @example
     *   new SuperMap.REST.DatasourceService(url).getDatasource(datasourceName,function(result){
     *     //doSomething
     *   });
     * @param {string} datasourceName - 数据源名称。
     * @param {RequestCallback} callback 回调函数。
     */
    getDatasource(datasourceName, callback) {
        if (!datasourceName) {
            return;
        }
        const me = this;
        const datasourceService = new CommonDatasourceService(me.url, {
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
        datasourceService.getDatasourceService(datasourceName);
    }

   /**
     * @function SuperMap.REST.DatasourceService.prototype.setDatasource
     * @description 数据源信息设置服务。可实现更改当前数据源信息。
     * @example
     *  new SuperMap.REST.DatasourceService(url).setDatasource(params, function(result){
     *     //doSomething
     *   });
     * @param {SetDatasourceParameters} params - 数据源信息查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    setDatasource(params, callback) {
        if (!(params instanceof SetDatasourceParameters)) {
            return;
        }
        const datasourceParams = {
            description: params.description ,
            coordUnit: params.coordUnit,
            distanceUnit: params.distanceUnit
        };
        const me = this;
        const url = CommonUtil.urlPathAppend(me.url,`datasources/name/${params.datasourceName}`);
        const datasourceService = new CommonDatasourceService(url, {
            proxy: me.proxy,
            withCredentials: me.withCredentials,
            crossOrigin: me.crossOrigin,
            headers: me.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasourceService.setDatasourceService(datasourceParams);
    }
}
SuperMap.REST.DatasourceService = DatasourceService;
