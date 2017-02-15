/**
 * Class: ServiceBase
 * 服务基类
 */
require('../../base');

ServiceBase = L.Evented.extend({
    options: {
        url: null
    },
    initialize: function (url, options) {
        this.options.url = url;
        L.setOptions(this, options);
    },

    processCompleted: function (serverResult) {
        this.fire('complete', {result:serverResult.result});

    },
    processFailed: function (failedResult) {
        this.fire('failed', {error: failedResult.error});
        console.log(failedResult.error.errorMsg);
    }
});

module.exports  = function (url, options) {
    return new ServiceBase(url, options);
};