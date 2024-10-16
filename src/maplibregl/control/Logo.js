/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {LogoBase64} from '@supermap/iclient-common/control/img/Logo';

 /**
  * @class Logo
  * @deprecatedclass maplibregl.supermap.LogoControl
  * @category  Control
  * @classdesc Logo 控件类。默认不显示。
  * @modulecategory Control
  *
  * @example
  * (start code)
  *  map.addControl(new Logo(),'bottom-right');
  * (end)
  * @param {Object} options - logo 控件配置项。
  * @param {string} [options.imageUrl] - logo 图片地址。
  * @param {string} [options.width] - logo 图片宽度。
  * @param {string} [options.height] - logo 图片高度。
  * @param {string} [options.link] - logo图片跳转链接。
  * @param {string} [options.alt='SuperMap iClient'] - logo 图片失效时显示文本。
  * @usage
  */
 export class Logo {
     constructor(options) {
         //logo图片地址
         this.imageUrl = null;
         //跳转链接
         this.link = null;
         //logo图片宽
         this.width = null;
         //logo图片高
         this.height = null;
         //logo图片失效时显示文本
         this.alt = "SuperMap iClient";
         this._extend(this, options)
     }

     /**
      * @function Logo.prototype.onAdd
      * @description 添加Logo。
      * @returns {HTMLElement} 返回创建的 Logo 元素。
      */
     onAdd(map) {
         this._map = map;
         this._container = document.createElement('div');
         this._container.className = 'maplibregl-ctrl iclient-logo';
         this._container.style.marginTop = 0;
         this._container.style.marginBottom = 0;
         this._container.style.marginLeft = 0;
         this._container.style.marginRight = 0;

         var imgSrc = LogoBase64;
         if (this.imageUrl) {
             imgSrc = this.imageUrl;
         }
         var alt = this.alt;

         var imageWidth = "94px";
         var imageHeight = "29px";
         var styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
         if (this.imageUrl) {
             imageWidth = this.width;
             imageHeight = this.height;
             styleSize = "width:" + imageWidth + ";height:" + imageHeight + ";";
             if (!imageWidth || !imageHeight) {
                 styleSize = "";
             }
         }
         var link = this.link;
         this._container.innerHTML = "<a href='" + link + "' target='_blank'>" +
             "<img src=" + imgSrc + " alt='" + alt + "' style='" + styleSize + "margin-bottom: 2px'></a>";
         this._createStyleSheet();
         return this._container;
     }

     _createStyleSheet() {
         var style = document.createElement('style');
         style.type = 'text/css';
         style.innerHTML = ".iclient-logo{" +
             "margin:0 !important;" +
             "}" +
             ".iclient-logo a{" +
             "border: none;" +
             "display: block;" +
             "height:31px;" +
             "}" +
             ".iclient-logo img{" +
             "border: none;" +
             "white-space: nowrap" +
             "}";
         document.getElementsByTagName('head')[0].appendChild(style);
     }

     _extend(dest) {
         for (var index = 0; index < Object.getOwnPropertyNames(arguments).length; index++) {
             var arg = Object.getOwnPropertyNames(arguments)[index];
             if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                 continue;
             }
             var obj = arguments[arg];
             if (obj) {
                 for (var j = 0; j < Object.getOwnPropertyNames(obj).length; j++) {
                     var key = Object.getOwnPropertyNames(obj)[j];
                     if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                         continue;
                     }
                     dest[key] = obj[key];
                 }
             }
         }
         return dest;
     }
 }
