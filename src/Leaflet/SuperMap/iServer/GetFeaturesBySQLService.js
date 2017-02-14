/**
 * Class: GetFeaturesBySQLService
 * 数据集Bounds查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesBySQLService');
require('leaflet');

GetFeaturesBySQLService = GetFeaturesServiceBase.extend({

    options: {
        /* {String} 查询数据集名称或者图层名称，根据实际的查询对象而定，必设属性。
         * 一般情况下该字段为数据集名称，但在进行与地图相关功能的操作时，
         * 需要设置为图层名称（图层名称格式：数据集名称@数据源别名）*/
        name: null,
        attributeFilter: null,
    },

    initialize: function (url, options) {
        GetFeaturesServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
        this._getFeaturesBySQL();
    },

    _getFeaturesBySQL: function () {
        var me = this,
            getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;

        getFeatureParam = new SuperMap.REST.FilterParameter({
            name: me.options.name,
            attributeFilter: me.options.attributeFilter
        });

        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            returnContent: me.options.returnContent,
            queryParameter: getFeatureParam,
            datasetNames: me.options.dataSetNames,
            fromIndex: me.options.fromIndex,
            toIndex: me.options.toIndex
        });

        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });

        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }
});

L.supermap.getFeaturesBySQLService = function (url, options) {
    return new GetFeaturesBySQLService(url, options);
};

module.exports = L.supermap.getFeaturesBySQLService;