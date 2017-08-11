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
 *@param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
 * @param options - {Object}  互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
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