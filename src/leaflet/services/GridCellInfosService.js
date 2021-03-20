/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {GetGridCellInfosService, GetGridCellInfosParameters} from '@supermap/iclient-common';

/**
 * @class L.supermap.gridCellInfosService
 * @classdesc 数据栅格查询服务。
 * @category  iServer Data Grid
 * @extends {L.supermap.ServiceBase}
 * @example
 *      L.supermap.gridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 * @param {string} url - 数据栅格查询服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export var GridCellInfosService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.gridCellInfosService.prototype.getGridCellInfos
     * @param {SuperMap.GetGridCellInfosParameters} params - 数据服务栅格查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    getGridCellInfos: function (params, callback) {
        if (!(params instanceof GetGridCellInfosParameters)) {
            return;
        }
        var me = this;
        var gridCellQueryService = new GetGridCellInfosService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers:me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        gridCellQueryService.processAsync(params);
    }
});
export var gridCellInfosService = function (url, options) {
    return new GridCellInfosService(url, options);
};

L.supermap.gridCellInfosService = gridCellInfosService;