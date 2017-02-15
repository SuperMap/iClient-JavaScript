/**
 * Class: GetFeaturesServiceBase
 * 数据集查询基类。
 */
require('../../base');

GetFeaturesServiceBase = L.Evented.extend({

    options: {
        url: null,
        dataSetNames: null,//格式： ["World:Countries"，"World:Cities"]
        fromIndex: null,
        toIndex: null
    },

    initialize: function (url, options) {
        L.setOptions(this, url, options);
        this.options.url = url;
        this.options.dataSetNames = options.dataSetNames;
        this.options.returnContent = options.returnContent ? options.returnContent : true;
        this.options.fromIndex = options.fromIndex ? options.fromIndex : 0;
        this.options.toIndex = options.toIndex ? options.toIndex : -1;
    },

    processCompleted: function (getFeaturesResult) {
        this.fire("complete", {data: getFeaturesResult.result})
    },

    processFailed: function (e) {
        this.fire("failed", e)
    }

});

module.exports = function (url, options) {
    return new GetFeaturesServiceBase(url, options);
};
