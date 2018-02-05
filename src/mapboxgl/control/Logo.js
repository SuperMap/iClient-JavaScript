import mapboxgl from 'mapbox-gl';
import '../core/Base';
import logoSrc from '@supermap/iclient-common/control/img/iClient.png';

/**
 * @class mapboxgl.supermap.LogoControl
 * @category  Control
 * @classdesc Logo控件。默认不显示</br>
 *
 * @example
 * (start code)
 *  map.addControl(new mapboxgl.supermap.LogoControl(),'bottom-right');
 * (end)
 * @param options -{Object} logo控件配置项</br>
 *        imageUrl - {string} logo图片地址</br>
 *        width - {string} logo图片宽</br>
 *        height - {string} logo图片高</br>
 *        link - {string} 跳转链接</br>
 *        alt - {string} logo图片失效时显示文本
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
     * @function mapboxgl.supermap.LogoControl.prototype.onAdd
     * @description 添加一个logo
     * @return {div} 返回创建的logo元素
     */
    onAdd(map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'mapboxgl-ctrl iclient-logo';
        this._container.style.marginTop = 0;
        this._container.style.marginBottom = 0;
        this._container.style.marginLeft = 0;
        this._container.style.marginRight = 0;

        var imgSrc = logoSrc;
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
        var link = this.link || "http://iclient.supermap.io";
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

mapboxgl.supermap.LogoControl = Logo;