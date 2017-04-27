/**
 * Class: ServiceBase
 * 服务基类
 */
var L = require("leaflet");
require('../core/Base');
require('../../common/util/Request');

var ServiceBase = L.Evented.extend({
    options: {
        url: null
    },
    initialize: function (url, options) {
        if (url) {
            url = (url.indexOf("/") !== url.length - 1) ?
                url : url.substr(0, url.length - 1);
        }
        this.options.url = url;
        L.setOptions(this, options);
        this.fire("initialized", this);
    },

    destroy: function () {
        this.fire("destroy", this);
    }

});

module.exports = ServiceBase;