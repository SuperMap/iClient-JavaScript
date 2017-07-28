/*
 * Class: LayerInfoService
 * 图层信息服务类
 * 用法：
 *      new ol.superMap.LayerInfoService(url).getLayersInfo(function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
var ol = require('openlayers/dist/ol-debug');
var GetLayersInfoService = require('../../common/iServer/GetLayersInfoService');
var SetLayerInfoService = require('../../common/iServer/SetLayerInfoService');
var SetLayersInfoService = require('../../common/iServer/SetLayersInfoService');
var SetLayerStatusService = require('../../common/iServer/SetLayerStatusService');
/**
 * @class ol.supermap.LayerInfoService
 * @description 图层信息服务类
 * @augments ol.supermap.ServiceBase
 * @example
 * 用法：
 *      new ol.supermap.LayerInfoService(url).getLayersInfo(function(result){
 *           //doSomething
 *      })
 * @param url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
 * @param options - {Object}  互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
ol.supermap.LayerInfoService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.LayerInfoService, ol.supermap.ServiceBase);

/**
 * @function ol.supermap.LayerInfoService.getLayersInfo
 * @description 获取图层信息服务
 * @param callback - {function} 回调函数
 * @return {ol.supermap.LayerInfoService} 返回图层信息类
 */
ol.supermap.LayerInfoService.prototype.getLayersInfo = function (callback) {
    var me = this;
    var getLayersInfoService = new GetLayersInfoService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        }
    });
    getLayersInfoService.processAsync();
    return me;
};

/**
 * @function ol.supermap.LayerInfoService.setLayerInfo
 * @description 设置图层信息服务。可以实现临时图层中子图层的修改
 * @param params - {SuperMap.SetLayerInfoParameters} 设置图层信息参数类
 * @param callback -{function} 回调函数
 */
ol.supermap.LayerInfoService.prototype.setLayerInfo = function (params, callback) {
    if (!params) {
        return;
    }
    var me = this,
        tempLayerID = params.tempLayerID,
        layerPath = params.layerPath,
        resourceID = params.resourceID,
        layerInfoParams = params.layerInfo;
    if (!tempLayerID || !layerPath || !resourceID) {
        return;
    }
    var url = me.url.concat();
    url += "/tempLayersSet/" + tempLayerID + "/" + layerPath;

    var setLayerInfoService = new SetLayerInfoService(url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        resourceID: resourceID
    });

    setLayerInfoService.processAsync(layerInfoParams);
    return me;
};

/**
 * @function ol.supermap.LayerInfoService.setLayersInfo
 * @description 设置图层信息服务。可以实现创建新的临时图层和对现有临时图层的修改
 * @param params - {SuperMap.SetLayersInfoParameters}  设置图层信息参数类,包括临时图层。
 * @param callback - {function} 回调函数
 */
ol.supermap.LayerInfoService.prototype.setLayersInfo = function (params, callback) {
    if (!params) {
        return;
    }
    var me = this,
        resourceID = params.resourceID,
        isTempLayers = params.isTempLayers ? params.isTempLayers : false,
        layersInfo = params.layersInfo;
    if (!resourceID || !layersInfo) {
        return;
    }
    var layersInfoParam = {};
    layersInfoParam.subLayers = {};
    layersInfoParam.subLayers.layers = layersInfo;
    var setLayersInfoService = new SetLayersInfoService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        },
        resourceID: resourceID,
        isTempLayers: isTempLayers
    });

    setLayersInfoService.processAsync(layersInfoParam);
    return me;
};

/**
 * @function ol.supermap.LayerInfoService.setLayerStatus
 * @description 子图层显示控制服务。负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
 * @param params - {SuperMap.SetLayerStatusParameters} 子图层显示控制参数类
 * @param callback - {function} 回调函数
 */
ol.supermap.LayerInfoService.prototype.setLayerStatus = function (params, callback) {
    if (!params) {
        return;
    }
    var me = this;
    var setLayerStatusService = new SetLayerStatusService(me.url, {
        serverType: me.options.serverType,
        eventListeners: {
            processCompleted: callback,
            processFailed: callback
        }
    });
    setLayerStatusService.processAsync(params);
    return me;
};

module.exports = ol.supermap.LayerInfoService;