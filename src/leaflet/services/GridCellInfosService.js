
import L from "leaflet";
import {ServiceBase} from './ServiceBase';
import GetGridCellInfosService from  '../../common/iServer/GetGridCellInfosService';
/**
 * Class: GridCellInfosService
 * 数据栅格查询服务
 * 用法：
 *      L.supermap.gridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 */
export var GridCellInfosService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },
    /**
     *
     * @param params
     * <SuperMap.GetGridCellInfosParameters>
     * @param callback
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