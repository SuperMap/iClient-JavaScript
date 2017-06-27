/**
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

ol.supermap.LayerInfoService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.LayerInfoService, ol.supermap.ServiceBase);

ol.supermap.LayerInfoService.prototype.getLayersInfo = function (callback) {
    var me = this;
    var getLayersInfoService = new GetLayersInfoService(me.options.url, {
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
 *设置图层信息服务类。可以实现临时图层中子图层的修改
 * @param params
 * <SuperMap.SetLayerInfoParameters>
 * @param callback
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
    var url = me.options.url.concat();
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
 *设置图层信息服务类。可以实现创建新的临时图层和对现有临时图层的修改
 * @param params
 * <SuperMap.SetLayersInfoParameters>
 * @param callback
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
    var setLayersInfoService = new SetLayersInfoService(me.options.url, {
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
 * 子图层显示控制服务类。
 * 该类负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
 * @param params
 * <SuperMap.SetLayerStatusParameters>
 * @param callback
 */
ol.supermap.LayerInfoService.prototype.setLayerStatus = function (params, callback) {
    if (!params) {
        return;
    }
    var me = this;
    var setLayerStatusService = new SetLayerStatusService(me.options.url, {
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