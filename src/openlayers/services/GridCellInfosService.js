import ol from 'openlayers/dist/ol-debug';
import ServiceBase from './ServiceBase';
import GetGridCellInfosService from '../../common/iServer/GetGridCellInfosService';
/**
 * @class ol.supermap.GridCellInfosService
 * @classdesc 数据栅格查询服务
 * @example 用法：
 *      new ol.superMap.GridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 */
export default class GridCellInfosService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.GridCellInfosService.prototype.getGridCellInfos
     * @param params -{SuperMap.GetGridCellInfosParameters} 查询所需参数类
     * @param callback -{function}
     */
    getGridCellInfos(params, callback) {
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
}
ol.supermap.GridCellInfosService = GridCellInfosService;