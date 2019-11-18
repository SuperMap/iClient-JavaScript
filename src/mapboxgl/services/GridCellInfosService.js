/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {GetGridCellInfosService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.GridCellInfosService
 * @category  iServer Data Grid
 * @classdesc 数据栅格查询服务。
 * @extends {mapboxgl.supermap.ServiceBase}
 * @example
 * new mapboxgl.supermap.GridCellInfosService(url)
 *  .getGridCellInfos(param,function(result){
 *     //doSomething
 * })
 * @param {string} url - 与客户端交互的地图服务地址。请求地图服务，URL 应为：</br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"。
 * @param {Object} options - 服务所需可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 */
export class GridCellInfosService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.GridCellInfosService.prototype.getGridCellInfos
     * @param {SuperMap.GetGridCellInfosParameters} params - 查询所需参数类。
     * @param {RequestCallback} callback 回调函数。
     */
    getGridCellInfos(params, callback) {
        if (!params) {
            return null;
        }
        var me = this;
        var gridCellQueryService = new GetGridCellInfosService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        gridCellQueryService.processAsync(params);
    }
}

mapboxgl.supermap.GridCellInfosService = GridCellInfosService;