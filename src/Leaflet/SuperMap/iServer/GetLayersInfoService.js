/**
 * Class: GetLayersInfoService
 * 地图信息服务类
 * 用法：
 *      L.superMap.getLayersInfoService(url,{
 *
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('../../base');
require('../../../Core/iServer/GetLayersInfoService');

GetLayersInfoService = L.Evented.extend({
    options: {
        url: null,
    },
    initialize: function (url, options) {
        this.options.url = url;
        L.setOptions(this, options);
        this._getLayersInfo();
    },

    _getLayersInfo: function () {
        var me = this;
        var getLayersInfoService = new SuperMap.REST.GetLayersInfoService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getLayersInfoService.processAsync();
    },
    processCompleted: function (layersInfoResult) {
        var layersInfo,
            result = layersInfoResult.result;
        if (result && result.subLayers && result.subLayers.layers) {
            layersInfo = result.subLayers.layers;
        }
        this.fire('complete', {data: layersInfo});

    },
    processFailed: function (failedMessage) {
        this.fire('failed', failedMessage);
    }
});

L.supermap.getLayersInfoService = function (url, options) {
    return new GetLayersInfoService(url, options);
};

module.exports = L.supermap.getLayersInfoService;