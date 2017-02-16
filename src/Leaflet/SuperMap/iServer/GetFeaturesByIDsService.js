/**
 * Class: GetFeaturesByIDsService
 * 数据集ID查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByIDsService');


GetFeaturesByIDsService = GetFeaturesServiceBase.extend({

    options: {
        IDs: null
    },

    initialize: function (url, options) {
        GetFeaturesServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
    },

    getFeatures: function () {
        var me = this;
        var getFeaturesByIDsParameters, getFeaturesByIDsService;
        getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
            returnContent: me.options.returnContent,
            datasetNames: me.options.dataSetNames,
            fromIndex: me.options.fromIndex,
            toIndex: me.options.toIndex,
            IDs: me.options.IDs
        });
        getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        return me;
    }

});

L.supermap.getFeaturesByIDsService = function (url, options) {
    return new GetFeaturesByIDsService(url, options);
};

module.exports = L.supermap.getFeaturesByIDsService;