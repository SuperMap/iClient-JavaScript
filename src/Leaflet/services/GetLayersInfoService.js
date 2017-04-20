/**
 * Class: GetLayersInfoService
 * 地图信息服务类
 * 用法：
 *      L.superMap.getLayersInfoService(url).getLayersInfo()
 *        .on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../common/iServer/GetLayersInfoService');

GetLayersInfoService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    getLayersInfo: function () {
        var me = this;
        var getLayersInfoService = new SuperMap.REST.GetLayersInfoService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getLayersInfoService.processAsync();
        return me;
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