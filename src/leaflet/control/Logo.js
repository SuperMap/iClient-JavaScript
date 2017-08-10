import '../core/Base';
import L from 'leaflet';
import logoSrc from '../../common/control/img/iClient.png'

/**
 * @class L.supermap.control.Logo
 * @classdesc Logo控件。</br>
 *            map初始化的配置项为logoControl，如果为true，则显示控件；否则不显示该控件。目前默认显示。
 * @extends L.Control
 * @example
 * (start code)
 *  L.supermap.control.Logo({
 *      imageUrl: xxx,//非必填项
 *  }).addTo(map);
 * (end)
 * @param options -{Object} logo控件配置项</br>
 *        imageUrl - {String} logo图片地址</br>
 *        width - {String} logo图片宽</br>
 *        height - {String} logo图片高</br>
 *        link - {String} 跳转链接</br>
 *        alt - {String} logo图片失效时显示文本
 */
export var Logo = L.Control.extend({

    options: {
        position: 'bottomright',
        //logo图片地址
        imageUrl: null,
        //跳转链接
        link: null,
        //logo图片宽
        width: null,
        //logo图片高
        height: null,
        //logo图片失效时显示文本
        alt: "SuperMap iClient",
    },

    onAdd: function () {
        var div = L.DomUtil.create('div', 'iclient-leaflet-logo');
        div.style.marginTop = 0;
        div.style.marginBottom = 0;
        div.style.marginLeft = 0;
        div.style.marginRight = 0;

        var imgSrc = logoSrc;
        if (this.options.imageUrl) {
            imgSrc = this.options.imageUrl;
        }
        var alt = this.options.alt;

        var imageWidth = "96px";
        var imageHeight = "26px";
        var styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
        if (this.options.imageUrl) {
            imageWidth = this.options.width;
            imageHeight = this.options.height;
            styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
            if (!imageWidth || !imageHeight) {
                styleSize = "";
            }
        }
        var link = this.options.link || "http://iclient.supermapol.com";
        div.innerHTML = "<a href='" + link + "' target='_blank' style='border: none;display: block;'>" +
            "<img src=" + imgSrc + " alt='" + alt + "' style='border: none;" + styleSize + "margin-right:2px;white-space: nowrap'></a>";
        return div;
    }
});
//map默认开启logoControl
L.Map.mergeOptions({
    logoControl: true
});
//map默认开启logoControl
L.Map.addInitHook(function () {
    if (!this._logoAdded && this.options.logoControl) {
        if (this.options.logoControl === true) {
            this.logoControl = new Logo();

        } else if (this.options.logoControl instanceof L.Control) {
            this.logoControl = this.options.logoControl;
        }
        if (this.logoControl) {
            this.addControl(this.logoControl);
            this._logoAdded = true;
        }
    }
});
export var logo = function (options) {
    return new Logo(options);
};
L.supermap.control.logo = logo;
