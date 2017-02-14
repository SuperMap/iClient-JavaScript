/**
 * Class: GetFeaturesServiceBase
 * 数据集查询基类。
 */
require('../../base');
require('leaflet');

GetFeaturesServiceBase = L.Evented.extend({

    options: {
        url: null,
        dataSetNames: null,//格式： ["World:Countries"，"World:Cities"]
        fromIndex: null,
        toIndex: null,
    },

    initialize: function (url, options) {
        L.setOptions(this, url, options);
        this.options.url = url;
        this.options.dataSetNames = options.dataSetNames;
        this.options.returnContent = options.returnContent ? options.returnContent : true;
        this.options.fromIndex = options.fromIndex ? options.fromIndex : 0;
        this.options.toIndex = options.toIndex ? options.toIndex : -1;
    },

    processCompleted: function (getFeaturesEventArgs) {
        var result = getFeaturesEventArgs.result;
        if (result && result.features) {
            var geoJSONFeatures = [];
            result.features.map(function (item) {
                geoJSONFeatures.push(L.Util.toGeoJSON(item))
            });
            this.fire("complete", {data: geoJSONFeatures})
        }
    },

    processFailed: function (e) {
        this.fire("failed", e)
    }

});

module.exports = function (url, options) {
    return new GetFeaturesServiceBase(url, options);
};
