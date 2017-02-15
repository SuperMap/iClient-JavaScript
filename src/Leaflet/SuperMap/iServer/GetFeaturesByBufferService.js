/**
 * Class: GetFeaturesByBufferService
 * 数据集Buffer查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByBufferService');

GetFeaturesByBufferService = GetFeaturesServiceBase.extend({

    options: {
        bufferDistance: null,
        /**
         * 支持L.marker,L.polyLine,L.polygon,L.rectangle,L.circle,L.circleMarker
         */
        geometry: null,
    },

    initialize: function (url, options) {
        GetFeaturesServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
        if (options && options.geometry && options.geometry instanceof L.Path) {
            var geometry = L.Util.toSuperMapGeometry(options.geometry.toGeoJSON());
            this.options.geometry = geometry;
        }
        this._getFeaturesByBuffer();
    },

    _getFeaturesByBuffer: function () {
        var me = this,
            getFeatureParameter, getFeatureService;
        getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
            bufferDistance: me.options.bufferDistance,
            geometry: me.options.geometry,

            datasetNames: me.options.dataSetNames,
            returnContent: me.options.returnContent,
            fromIndex: me.options.fromIndex,
            toIndex: me.options.toIndex
        });
        getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeatureService.processAsync(getFeatureParameter);
    }
});

L.supermap.getFeaturesByBufferService = function (url, options) {
    return new GetFeaturesByBufferService(url, options);
};

module.exports = L.supermap.getFeaturesByBufferService;