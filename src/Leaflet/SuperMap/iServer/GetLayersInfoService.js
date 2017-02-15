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
require('./ServiceBase');
require('../../../Core/iServer/GetLayersInfoService');

GetLayersInfoService = ServiceBase.extend({
    options: {
    },
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
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
        this.fire('complete', {result: layersInfo});
    }
});

L.supermap.getLayersInfoService = function (url, options) {
    return new GetLayersInfoService(url, options);
};

module.exports = L.supermap.getLayersInfoService;