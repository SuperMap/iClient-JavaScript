/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { DatasourceService as CommonDatasourceService } from '@supermap/iclient-common/iServer/DatasourceService';
import { SetDatasourceParameters, CommonUtil } from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.DatasourceService
 * @category  iServer Data Datasource
 * @classdesc 数据源服务类。
 * @param {string} url - 与客户端交互的服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {mapboxgl.supermap.ServiceBase}
 */
export class DatasourceService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.DatasourceService.prototype.getDatasources
     * @description 数据源集查询服务。
     * @example
     *   new mapboxgl.supermap.DatasourceService(url).getDatasources(function(result){
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
     * @function mapboxgl.supermap.DatasourceService.prototype.getDatasource
     * @description 数据源信息查询服务。
     * @example
     *   new mapboxgl.supermap.DatasourceService(url).getDatasource(datasourceName,function(result){
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
     * @function mapboxgl.supermap.DatasourceService.prototype.setDatasource
     * @description 数据源信息设置服务。可实现更改当前数据源信息。
     * @example
     *  new mapboxgl.supermap.DatasourceService(url).setDatasource(params, function(result){
     *     //doSomething
     *   });
     * @param {SuperMap.SetDatasourceParameters} params - 数据源信息设置参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    setDatasource(params, callback) {
        if (!(params instanceof SetDatasourceParameters)) {
            return;
        }
        const datasourceParams = {
            description: params.description,
            coordUnit: params.coordUnit,
            distanceUnit: params.distanceUnit
        };
        const me = this;
        const url = CommonUtil.urlPathAppend(me.url, `datasources/name/${params.datasourceName}`);
        const datasourceService = new CommonDatasourceService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        datasourceService.setDatasourceService(datasourceParams);
    }
}

mapboxgl.supermap.DatasourceService = DatasourceService;
