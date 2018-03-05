import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {
    GetLayersInfoService,
    SetLayerInfoService,
    SetLayersInfoService,
    SetLayerStatusService
} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.LayerInfoService
 * @category  iServer Map Layer
 * @classdesc 图层信息服务类 
 * @extends mapboxgl.supermap.ServiceBase
 * @example
 *      new mapboxgl.supermap.LayerInfoService(url).getLayersInfo(function(result){
 *           //doSomething
 *      })
 * @param url - {string} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
 * @param options - {Object} 服务所需可选参数。如：<br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 */
export class LayerInfoService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.LayerInfoService.prototype.getLayersInfo
     * @description 获取图层信息服务
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.LayerInfoService} 返回图层信息类
     */
    getLayersInfo(callback) {
        var me = this;
        var getLayersInfoService = new GetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        getLayersInfoService.processAsync();
    }

    /**
     * @function mapboxgl.supermap.LayerInfoService.prototype.setLayerInfo
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改
     * @param params - {SuperMap.SetLayerInfoParameters} 设置图层信息参数类
     * @param callback - {function} 回调函数
     */
    setLayerInfo(params, callback) {
        if (!params) {
            return;
        }
        var me = this,
            resourceID = params.resourceID,
            tempLayerName = params.tempLayerName,
            layerInfoParams = params.layerInfo;
        if (!resourceID || !tempLayerName) {
            return;
        }
        var url = me.url.concat();
        url += "/tempLayersSet/" + resourceID + "/" + tempLayerName;
        var setLayerInfoService = new SetLayerInfoService(url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        setLayerInfoService.processAsync(layerInfoParams);
    }

    /**
     * @function mapboxgl.supermap.LayerInfoService.prototype.setLayersInfo
     * @description 设置图层信息服务。可以实现创建新的临时图层和对现有临时图层的修改
     * @param params - {SuperMap.SetLayersInfoParameters}  设置图层信息参数类,包括临时图层。
     * @param callback - {function} 回调函数
     */
    setLayersInfo(params, callback) {
        if (!params) {
            return;
        }
        var me = this,
            resourceID = params.resourceID,
            isTempLayers = params.isTempLayers ? params.isTempLayers : false,
            layersInfo = params.layersInfo;
        if ((isTempLayers && !resourceID) || !layersInfo) {
            return;
        }
        var setLayersInfoService = new SetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            resourceID: resourceID,
            isTempLayers: isTempLayers
        });
        setLayersInfoService.processAsync(layersInfo);
    }

    /**
     * @function mapboxgl.supermap.LayerInfoService.prototype.setLayerStatus
     * @description 子图层显示控制服务。负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
     * @param params - {SuperMap.SetLayerStatusParameters} 子图层显示控制参数类
     * @param callback - {function} 回调函数
     */
    setLayerStatus(params, callback) {
        if (!params) {
            return;
        }
        var me = this;
        var setLayerStatusService = new SetLayerStatusService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        setLayerStatusService.processAsync(params);
    }
}

mapboxgl.supermap.LayerInfoService = LayerInfoService;