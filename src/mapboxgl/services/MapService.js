import mapboxgl from 'mapbox-gl';
import ServiceBase from './ServiceBase';
import CommonMapService  from '../../common/iServer/MapService';
import TilesetsService from '../../common/iServer/TilesetsService';
/**
 * @class mapboxgl.supermap.MapService
 * @classdesc 地图信息服务类
 * @extends mapboxgl.supermap.ServiceBase
 * @param url -{string} 地图服务地址
 * @param options -{Object} 地图服务信息相关参数。如：<br>
 *        serverType - {string} 服务来源 iServer|iPortal|online。
 * @example
 *   new mapboxgl.supermap.MapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 */
export default class MapService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.MapService.prototype.getMapInfo
     * @description 地图信息查询服务
     * @param callback -{function} 回调函数
     * @return {mapboxgl.supermap.MapService} 获取服务信息
     */
    getMapInfo(callback) {
        var me = this;
        var getMapStatusService = new CommonMapService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
    }

    /**
     * @function mapboxgl.supermap.MapService.prototype.getTilesets
     * @description 切片列表信息查询服务
     * @param callback -{function} 回调函数
     * @return {mapboxgl.supermap.MapService} 获取服务信息
     */
    getTilesets(callback) {
        var me = this;
        var tilesetsService = new TilesetsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        tilesetsService.processAsync();
    }
}
mapboxgl.supermap.MapService = MapService;