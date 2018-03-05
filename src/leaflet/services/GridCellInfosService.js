import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {GetGridCellInfosService, GetGridCellInfosParameters} from '@supermap/iclient-common';

/**
 * @class L.supermap.gridCellInfosService
 * @classdesc 数据栅格查询服务
 * @category  iServer Data Grid
 * @extends L.supermap.ServiceBase
 * @example
 *      L.supermap.gridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 * @param url - {string} 数据栅格查询服务地址
 * @param options - {Object} 数据栅格查询服务类可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 */
export var GridCellInfosService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.gridCellInfosService.prototype.getGridCellInfos
     * @param params {SuperMap.GetGridCellInfosParameters} 数据服务栅格查询参数类
     * @param callback - {function} 回调函数
     */
    getGridCellInfos: function (params, callback) {
        if (!(params instanceof GetGridCellInfosParameters)) {
            return;
        }
        var me = this;
        var gridCellQueryService = new GetGridCellInfosService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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