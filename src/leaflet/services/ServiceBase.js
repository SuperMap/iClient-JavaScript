import L from "leaflet";
import "../core/Base"

/**
 * @class L.supermap.ServiceBase
 * @private
 * @description L.supermap服务基类
 * @param url - {string} 与客户端交互的服务地址。
 * @param options - {Object} 可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
 */
export var ServiceBase = L.Evented.extend({

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

    /**
     * @function L.supermap.ServiceBase.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        this.fire("destroy", this);
    }

});