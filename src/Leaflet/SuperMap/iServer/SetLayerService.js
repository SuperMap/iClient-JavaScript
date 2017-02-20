/**
 * Class: SetLayersService
 * 设置图层信息服服务类
 * 用法：
 *      L.superMap.setLayerService(url).setLayerInfo({
 *         tempLayerID:xxx
 *         layerPath:xxx,
 *         resourceID:xxx,
 *         layerInfo:layerInfo
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../../Core/iServer/SetLayerInfoService');
require('../../../Core/iServer/SetLayersInfoService');
require('../../../Core/iServer/SetLayerStatusService');

SetLayerService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        var end = me.options.url.substr(me.options.url.length - 1, 1);
        me.options.url += (end === "/") ? '' : '/';
    },

    /**
     * @param params:
     *       tempLayerID,layerPath,resourceID
     */
    setLayerInfo: function (params) {
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
    },


    /**
     * @param params:
     *       layersInfo(iServer图层信息，可以从GetLayersInfoService得到)
     *       tempLayerID,isTempLayers
     */
    setLayersInfo: function (params) {
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
    },


    /**
     * @param params:
     *      layersStatus(数组，包含layerStatus对象，layerStatus属性包括：layerName，isVisible，displayFilter，fieldValuesDisplayFilter)
     *      resourceID，holdTime
     */
    setLayerStatus: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            layersList = params.layersStatus,
            resourceID = params.resourceID,
            holdTime = params.holdTime ? params.holdTime : 15;
        var layerStatusParameters = new SuperMap.REST.SetLayerStatusParameters();
        layerStatusParameters.resourceID = resourceID;
        layerStatusParameters.holdTime = holdTime;

        for (var i = 0; i < layersList.length; i++) {
            layersList[i].isVisible = layersList[i].isVisible ? layersList[i].isVisible : true;
            layerStatusParameters.layerStatusList.push(layersList[i]);
        }

        var setLayerStatusService = new SuperMap.REST.SetLayerStatusService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }

        });

        setLayerStatusService.processAsync(layerStatusParameters);
        return me;
    }
});

L.supermap.setLayerService = function (url, options) {
    return new SetLayerService(url, options);
};

module.exports = L.supermap.setLayerService;