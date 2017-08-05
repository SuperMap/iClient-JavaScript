import L from "leaflet";

/**
 * @class L.supermap.ServiceBase
 * @description L.supermap服务基类
 * @param url - {String} 与客户端交互的服务地址。
 * @param options - {Object} 参数。
 */
export var ServiceBase = L.Evented.extend({
    options: {
        url: null,
        //服务来源 iServer|iPortal|online
        serverType: null
    },

    /**
     * @function L.ServiceBase.prototype.initialize
     * @description L.supermap服务基类的构造函数
     * @param url - {String} 与客户端交互的服务地址。
     * @param options - {Object} 参数。
     */
    initialize: function (url, options) {
        if (url) {
            url = (url.indexOf("/") !== url.length - 1) ?
                url : url.substr(0, url.length - 1);
        }
        this.url = url;
        L.setOptions(this, options);
        this.fire("initialized", this);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        this.fire("destroy", this);
    }

});