/**
 * Class: GetLayersInfoService
 * 地图信息服务类
 */
require('./ServiceBase');
require('../../common/iServer/GetLayersInfoService');

ol.supermap.GetLayersInfoService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.GetLayersInfoService, ol.supermap.ServiceBase);

ol.supermap.GetLayersInfoService.prototype.getLayersInfo = function () {
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
};

ol.supermap.GetLayersInfoService.prototype.processCompleted = function (layersInfoResult) {
    var layersInfo,
        result = layersInfoResult.result;
    if (result && result.subLayers && result.subLayers.layers) {
        layersInfo = result.subLayers.layers;
    }
    this.dispatchEvent(new ol.Collection.Event('complete', {result: layersInfo}));
}

module.exports = ol.supermap.GetLayersInfoService;