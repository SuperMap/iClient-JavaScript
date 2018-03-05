import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {GetGridCellInfosService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.GridCellInfosService
 * @category  iServer Data Grid
 * @classdesc 数据栅格查询服务
 * @extends mapboxgl.supermap.ServiceBase
 * @example
 *      new mapboxgl.supermap.GridCellInfosService(url)
 *      .getGridCellInfos(param,function(result){
 *           //doSomething
 *      })
 * @param url - {string} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
 * @param options - {Object} 服务所需可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class GridCellInfosService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.GridCellInfosService.prototype.getGridCellInfos
     * @param params - {SuperMap.GetGridCellInfosParameters} 查询所需参数类
     * @param callback - {function} 回调函数
     */
    getGridCellInfos(params, callback) {
        if (!params) {
            return null;
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
}

mapboxgl.supermap.GridCellInfosService = GridCellInfosService;