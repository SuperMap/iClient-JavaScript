import SuperMap from '../SuperMap';
import Event from './Event';
import Size from './Size';
import Pixel from './Pixel';
import {Element} from './Element';
import {Util} from './Util';

/**
 * @class SuperMap.Icon
 * @classdesc 图标类，表示显示在屏幕上的图标，通常与 {@link SuperMap.Marker} 配合使用表示屏幕上显示的Marker。<br>
 *              Icon具有url,size和position属性。也包含偏移量属性，<br>
 *              可以提供作为一个固定的偏移量，也可以函数计算得到期望的偏移量。<br>
 * @param url - {string} 图标对应图片的url地址。
 * @param size - {SuperMap.Size} 指定图标的大小， 为 {@link SuperMap.Size} 对象。
 * @param offset - {SuperMap.Pixel} 指定图标的偏移量，为 {@link SuperMap.Pixel} 对象。
 * @param calculateOffset - {Function}  用于计算偏移量的方法。
 *
 * @example
 * var size = new SuperMap.Size(44, 33),
 * var offset = new SuperMap.Pixel(-(size.w/2), -size.h),
 * var icon = new SuperMap.Icon("../theme/images/marker.png", size, offset);
 */
export default class Icon {

    /**
     * @member SuperMap.Icon.prototype.eventTypes  -{string}
     * @description image url
     */
    url = null;

    /**
     * @member SuperMap.Icon.prototype.size -{SuperMap.Size}
     * @description size
     */
    size = null;

    /**
     * @member SuperMap.Icon.prototype.offset -{SuperMap.Pixel}
     * @description distance in pixels to offset the image when being rendered
     */
    offset = null;

    /**
     * @member SuperMap.Icon.prototype.calculateOffset -{SuperMap.Pixel}
     * @description Function to calculate the offset (based on the size)
     */
    calculateOffset = null;

    /**
     * @member SuperMap.Icon.prototype.imageDiv -{HTMLElement}
     * @description imageDiv
     */
    imageDiv = null;

    /**
     * @member SuperMap.Icon.prototype.px -{SuperMap.Pixel}
     * @description px
     */
    px = null;

    constructor(url, size, offset, calculateOffset) {
        this.url = url;
        this.size = (size) ? size : new Size(20, 20);
        this.offset = offset ? offset : new Pixel(-(this.size.w / 2), -(this.size.h / 2));
        this.calculateOffset = calculateOffset;

        var id = Util.createUniqueID("SM_icon_");
        this.imageDiv = Util.createAlphaImageDiv(id);
    }

    /**
     * @function SuperMap.Icon.prototype.destroy
     * @description Nullify references and remove event listeners to prevent circular
     * references and memory leaks
     */
    destroy() {
        // erase any drawn elements
        this.erase();
        Event.stopObservingElement(this.imageDiv.firstChild);
        this.imageDiv.innerHTML = "";
        this.imageDiv = null;
    }

    /**
     * @function SuperMap.Icon.prototype.clone
     * @returns {SuperMap.Icon} A fresh copy of the icon.
     */
    clone() {
        return new Icon(this.url,
            this.size,
            this.offset,
            this.calculateOffset);
    }

    /**
     * @function SuperMap.Icon.prototype.setSize
     * @param size - {SuperMap.Size}
     */
    setSize(size) {
        if (size != null) {
            this.size = size;
        }
        this.draw();
    }

    /**
     * @function SuperMap.Icon.prototype.setUrl
     * @param url - {string}
     */
    setUrl(url) {
        if (url != null) {
            this.url = url;
        }
        this.draw();
    }

    /**
     * @function SuperMap.Icon.prototype.draw
     * @description Move the div to the given pixel.
     * @param px - {SuperMap.Pixel}
     * @returns {HTMLElement} A new DOM Image of this icon set at the location passed-in
     */
    draw(px) {
        Util.modifyAlphaImageDiv(this.imageDiv,
            null,
            null,
            this.size,
            this.url,
            "absolute");
        this.imageDiv.style.cursor = "pointer";
        this.moveTo(px);
        return this.imageDiv;
    }

    /**
     * @function SuperMap.Icon.prototype.erase
     * @description Erase the underlying image element.
     */
    erase() {
        if (this.imageDiv != null && this.imageDiv.parentNode != null) {
            Element.remove(this.imageDiv);
        }
    }

    /**
     * @function SuperMap.Icon.prototype.setOpacity
     * @description Change the icon's opacity
     * @param opacity - {float}
     */
    setOpacity(opacity) {
        Util.modifyAlphaImageDiv(this.imageDiv, null, null, null,
            null, null, null, null, opacity);

    }

    /**
     * @function SuperMap.Icon.prototype.moveTo
     * @description move icon to passed in px.
     * @param px - {SuperMap.Pixel}
     */
    moveTo(px) {
        //if no px passed in, use stored location
        if (px != null) {
            this.px = px;
        }

        if (this.imageDiv != null) {
            if (this.px == null) {
                this.display(false);
            } else {
                if (this.calculateOffset) {
                    this.offset = this.calculateOffset(this.size);
                }
                var offsetPx = this.px.offset(this.offset);
                Util.modifyAlphaImageDiv(this.imageDiv, null, offsetPx);
            }
        }
    }

    /**
     * @function SuperMap.Icon.prototype.display
     * @description Hide or show the icon
     * @param display - {Boolean}
     */
    display(display) {
        this.imageDiv.style.display = (display) ? "" : "none";
    }


    /**
     * @function SuperMap.Icon.prototype.isDrawn
     * @returns {Boolean} 图标是否`重绘。
     */
    isDrawn() {
        // nodeType 11 for ie, whose nodes *always* have a parentNode
        // (of type document fragment)
        var isDrawn = (this.imageDiv && this.imageDiv.parentNode &&
        (this.imageDiv.parentNode.nodeType !== 11));

        return isDrawn;
    }

    CLASS_NAME = "SuperMap.Icon"
}
SuperMap.Icon = Icon;
