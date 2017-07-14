/**
 * Class: ServiceBase
 * 服务基类
 */
require('../core/Base');
require('../../common/util/FetchRequest');
var L = require("leaflet");

var ServiceBase = L.Evented.extend({
    options: {
        url: null,
        //服务来源 iServer|iPortal|online
        serverType: null
    },
    initialize: function (url, options) {
        if (url) {
            url = (url.indexOf("/") !== url.length - 1) ?
                url : url.substr(0, url.length - 1);
        }
        this.url = url;
        L.setOptions(this, options);
        this.fire("initialized", this);
    },

    destroy: function () {
        this.fire("destroy", this);
    }

});

module.exports = ServiceBase;