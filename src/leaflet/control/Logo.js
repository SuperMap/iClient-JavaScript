/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import {
    LogoBase64
} from '@supermap/iclient-common/control/img/Logo';

/**
 * @class Logo
 * @aliasclass control.Logo
 * @deprecatedclassinstance L.supermap.control.logo
 * @classdesc Logo 控件。
 * @category  Control
 * @modulecategory Control
 * @extends {L.Control}
 * @example
 *  new Logo({
 *      imageUrl: xxx,//非必填项
 *  }).addTo(map);
 * @param {Object} options - 参数。
 * @param {string} [options.position='bottomright'] - 控件位置继承自 leaflet control。
 * @param {string} [options.imageUrl] - logo 图片地址。
 * @param {string} [options.width] - logo 图片宽度。
 * @param {string} [options.height] - logo 图片高度。
 * @param {string} [options.link] - 跳转链接。
 * @param {string} [options.alt='SuperMap iClient'] - logo 图片失效时显示的提示文本。
 * @usage
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
        alt: "SuperMap iClient"
    },

    /**
     * @private
     * @function Logo.prototype.onAdd
     * @override
     * @description 添加 logo。
     * @returns {HTMLElement} 返回创建 logo 的 div。
     */
    onAdd: function () {
        var div = L.DomUtil.create('div', 'iclient-leaflet-logo');
        div.style.marginTop = 0;
        div.style.marginBottom = 0;
        div.style.marginLeft = 0;
        div.style.marginRight = 0;
        //iClient.png base64
        var imgSrc = LogoBase64;
        if (this.options.imageUrl) {
            imgSrc = this.options.imageUrl;
        }
        var alt = this.options.alt;

        var imageWidth = "94px";
        var imageHeight = "29px";
        var styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
        if (this.options.imageUrl) {
            imageWidth = this.options.width;
            imageHeight = this.options.height;
            styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
            if (!imageWidth || !imageHeight) {
                styleSize = "";
            }
        }
        var link = this.options.link;
        div.innerHTML = "<a href='" + link + "' target='_blank' style='border: none;display: block;'>" +
            "<img src=" + imgSrc + " alt='" + alt + "' style='border: none;" + styleSize + "margin-right:5px;margin-bottom:2px;white-space: nowrap'></a>";
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
