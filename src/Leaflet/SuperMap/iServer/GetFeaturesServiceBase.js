/**
 * Class: GetFeaturesServiceBase
 * 数据集查询基类。
 */
require('./ServiceBase');

GetFeaturesServiceBase = ServiceBase.extend({

    options: {
        dataSetNames: null,//格式： ["World:Countries"，"World:Cities"]
        fromIndex: null,
        toIndex: null
    },

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this.options.dataSetNames = options.dataSetNames;
        this.options.returnContent = options.returnContent ? options.returnContent : true;
        this.options.fromIndex = options.fromIndex ? options.fromIndex : 0;
        this.options.toIndex = options.toIndex ? options.toIndex : -1;
        L.setOptions(this, url, options);
    }
});

module.exports = function (url, options) {
    return new GetFeaturesServiceBase(url, options);
};
