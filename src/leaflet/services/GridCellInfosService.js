import L from "leaflet";
import {ServiceBase} from './ServiceBase';
import GetGridCellInfosService from '../../common/iServer/GetGridCellInfosService';

/**
 * @class L.supermap.gridCellInfosService
 * @classdesc 数据栅格查询服务
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
     * @return {this}
     */
    getGridCellInfos: function (params, callback) {
        if (!params) {
            return null;
        }
        var me = this;
        var gridCellQueryService = new GetGridCellInfosService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        gridCellQueryService.processAsync(params);
        return me;
    }
});
export var gridCellInfosService = function (url, options) {
    return new GridCellInfosService(url, options);
};

L.supermap.gridCellInfosService = gridCellInfosService;