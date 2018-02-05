import ol from 'openlayers';
import logoSrc from '@supermap/iclient-common/control/img/iClient.png';

ol.supermap = ol.supermap || {};
ol.supermap.control = ol.supermap.control || {};

/**
 * @class ol.supermap.control.Logo
 * @category  Control
 * @classdesc Logo控件。默认不显示，需手动添加控件。
 * @extends ol.control.Control{@linkdoc-openlayers/ol.control.Control}
 * @example
 *      var control = new ol.supermap.control.Logo();
 *      map.addControl(control);
 * @param options - {Object} logo控件配置项。配置项有如下:</br>
 *        imageUrl - {string} logo图片地址。</br>
 *        width - {number} logo图片宽。</br>
 *        height - {number} logo图片高。</br>
 *        link - {string} 跳转链接。</br>
 *        alt - {string} logo图片失效时显示文本。
 */
export class Logo extends ol.control.Control {

    constructor(options) {
        options = options || {};
        options.imageUrl = options.imageUrl || null;
        options.width = options.width || null;
        options.height = options.height || null;
        options.link = options.link || "http://iclient.supermap.io";
        options.alt = options.alt || "SuperMap iClient";
        super(options);
        this.options = options;
        this.element = options.element = initLayerout.call(this);

        /*
         * @function ol.supermap.control.Logo.prototype.initLayerout
         * @description 初始化图层信息
         */
        function initLayerout() {
            var className = 'ol-control-logo ol-unselectable ol-control';
            var div = document.createElement("div");
            div.className = className;

            setDivStyle.call(this, div);

            var imgSrc = logoSrc;
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

        /*
         * @function ol.supermap.control.Logo.prototype.setDivStyle
         * @div 获取div对象
         * @description 设置对象style
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
ol.supermap.control.Logo = Logo;


