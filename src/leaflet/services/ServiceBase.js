/**
 * Class: ServiceBase
 * 服务基类
 */
require('../core/Base');
require('../../common/util/Request');

ServiceBase = L.Evented.extend({
    options: {
        url: null
    },
    initialize: function (url,options) {
        if (url) {
            url = (url.indexOf("/") !== url.length - 1) ?
                url : url.substr(0, url.length - 1);
        }
        this.options.url = url;
        L.setOptions(this, options);
        this.fire("initialized", this);
    },
    processCompleted: function (servicesResult) {
       this.callback(servicesResult.result);
    },

    processFailed: function () {

    },

    destroy: function () {
        this.fire("destroy", this);
    }

});

module.exports = function (url, options) {
    return new ServiceBase(url, options);
};