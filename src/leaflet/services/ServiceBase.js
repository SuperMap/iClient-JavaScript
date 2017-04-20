/**
 * Class: ServiceBase
 * 服务基类
 */
require('../core/Base');

ServiceBase = L.Evented.extend({
    options: {
        url: null
    },
    initialize: function (url, options) {
        this.options.url = url;
        L.setOptions(this, options);
    },

    processCompleted: function (serverResult) {
        this.fire('complete', {result: serverResult.result});

    },
    processFailed: function (failedResult) {
        var error = failedResult.error ? failedResult.error : failedResult;
        this.fire('failed', {error: error});
        console.log(error.errorMsg);
    }
});

module.exports = function (url, options) {
    return new ServiceBase(url, options);
};