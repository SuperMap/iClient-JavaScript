/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {LogoBase64} from '@supermap/iclient-common/control/img/Logo';
import Control from 'ol/control/Control';

/**
 * @class ol.supermap.control.Logo
 * @category  Control
 * @classdesc Logo控件。默认不显示，需手动添加控件。
 * @extends {ol/control/Control}
 * @example
 *      var control = new ol.supermap.control.Logo();
 *      map.addControl(control);
 * @param {Object} options - logo 控件配置项。
 * @param {string} [options.imageUrl] - logo 图片地址。
 * @param {number} [options.width] - logo 图片宽。
 * @param {number} [options.height] - logo 图片高。
 * @param {string} [options.link='https://iclient.supermap.io'] - 跳转链接。
 * @param {string} [options.alt='SuperMap iClient'] - logo 图片失效时显示文本。
 */
export class Logo extends Control {

    constructor(options) {
        options = options || {};
        options.imageUrl = options.imageUrl || null;
        options.width = options.width || null;
        options.height = options.height || null;
        options.alt = options.alt || "SuperMap iClient";
        super(options);
        this.options = options;
        this.element = options.element = initLayerout.call(this);

        /**
         * @function ol.supermap.control.Logo.prototype.initLayerout
         * @description 初始化图层信息。
         */
        function initLayerout() {
            var className = 'ol-control-logo ol-unselectable ol-control';
            var div = document.createElement("div");
            div.className = className;

            setDivStyle.call(this, div);

            var imgSrc = LogoBase64;
            if (this.options.imageUrl) {
                imgSrc = this.options.imageUrl;
            }
            var alt = this.options.alt;
            var link = this.options.link;

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


            div.innerHTML = "<a href='" + link + "' target='_blank' style='border: none;display: block;'>" +
                "<img src=" + imgSrc + " alt='" + alt + "'  style='border: none;" + styleSize + "white-space: nowrap;margin-bottom: 2px'></a>";
            return div;
        }

        /**
         * @function ol.supermap.control.Logo.prototype.setDivStyle
         * @description 设置对象 style。
         * @param {HTMLElement} 待设置的 div。
         */
        function setDivStyle(div) {
            var attributionsElem = document.getElementsByClassName('ol-attribution');
            attributionsElem = attributionsElem && attributionsElem[0];
            var attrHeight = attributionsElem && attributionsElem.clientHeight || 29;
            div.style.bottom = (parseInt(attrHeight) + 6) + "px";
            div.style.right = "4px";
            div.style.marginTop = 0;
            div.style.marginLeft = 0;
            div.style.marginBottom = 0;
            div.style.marginRight = 0;
            var logoStyle = document.createElement('style');
            logoStyle.type = 'text/css';
            logoStyle.innerHTML = '.ol-control-logo,.ol-control-logo:hover {' +
                'background-color: rgba(255,255,255,0);' +
                '}';
            document.getElementsByTagName('head')[0].appendChild(logoStyle);
        }

    }
}


