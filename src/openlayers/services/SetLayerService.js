/**
 * Class: SetLayersService
 * 设置图层信息服服务类
 */
require('./ServiceBase');
require('../../common/iServer/SetLayerInfoService');
require('../../common/iServer/SetLayersInfoService');
require('../../common/iServer/SetLayerStatusService');

ol.supermap.SetLayerService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    var end = this.options.url.substr(me.options.url.length - 1, 1);
    this.options.url += (end === "/") ? '' : '/';

};

ol.inherits(ol.supermap.SetLayerService, ol.supermap.ServiceBase);

/**
 * @param params:
 *       tempLayerID,layerPath,resourceID
 */
ol.supermap.SetLayerService.prototype.setLayerInfo = function (params) {
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
    url += "tempLayersSet/" + tempLayerID + "/" + layerPath;

    var setLayerInfoService = new SuperMap.REST.SetLayerInfoService(url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        resourceID: resourceID
    });

    setLayerInfoService.processAsync(layerInfoParams);
    return me;
};

/**
 * @param params:
 *       layersInfo(iServer图层信息，可以从GetLayersInfoService得到)
 *       tempLayerID,isTempLayers
 */
ol.supermap.SetLayerService.prototype.setLayersInfo = function (params) {
    if (!params) {
        return;
    }
    var me = this, layersInfoParam,
        resourceID = params.resourceID,
        isTempLayers = params.isTempLayers ? params.isTempLayers : false,
        layersInfo = params.layersInfo;
    if (!resourceID || !layersInfo) {
        return;
    }
    layersInfoParam.subLayers = {};
    layersInfoParam.subLayers.layers = layersInfo;
    var setLayersInfoService = new SuperMap.REST.SetLayersInfoService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        resourceID: resourceID,
        isTempLayers: isTempLayers
    });

    setLayersInfoService.processAsync(layersInfoParam);
    return me;
};

/**
 * @param params:
 *     <SetLayerStatusParameters>
 */
ol.supermap.SetLayerService.prototype.setLayerStatus = function (params) {
    if (!params) {
        return;
    }
    var me = this;
    var setLayerStatusService = new SuperMap.REST.SetLayerStatusService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }

    });
    setLayerStatusService.processAsync(params);
    return me;
}

module.exports = ol.supermap.SetLayerService;