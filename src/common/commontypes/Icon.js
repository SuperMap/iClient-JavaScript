import SuperMap from '../SuperMap';
import Event from './Event';
import Size from './Size';
import Pixel from './Pixel';
import {Element} from './Element';
import {Util} from './Util';

/**
 * @class SuperMap.Icon
 *
 * @description 图标类，表示显示在屏幕上的图标，通常与 {<SuperMap.Marker>} 配合使用表示屏幕上显示的Marker。<br>
 *              Icon具有url,size和position属性。也包含偏移量属性，<br>
 *              可以提供作为一个固定的偏移量，也可以函数计算得到期望的偏移量。<br>
 */
export default class Icon {

    /**
     * Property: url
     * {String}  image url
     */
    url = null;

    /**
     * Property: size
     * {<SuperMap.Size>}
     */
    size = null;

    /**
     * Property: offset
     * {<SuperMap.Pixel>} distance in pixels to offset the image when being rendered
     */
    offset = null;

    /**
     * Property: calculateOffset
     * {<SuperMap.Pixel>} Function to calculate the offset (based on the size)
     */
    calculateOffset = null;

    /**
     * Property: imageDiv
     * {DOMElement}
     */
    imageDiv = null;

    /**
     * Property: px
     * {<SuperMap.Pixel>}
     */
    px = null;

    /**
     * Constructor: SuperMap.Icon
     * 创建图标，在网页中表现为div标签中的image标签。
     *
     * 例如:
     * (start code)
     *  size = new SuperMap.Size(44, 33),
     *  offset = new SuperMap.Pixel(-(size.w/2), -size.h),
     *  icon = new SuperMap.Icon("../theme/images/marker.png", size, offset);
     * (end)
     *
     * Parameters:
     * url - {String} 图标对应图片的url地址。
     * size - {<SuperMap.Size>} 指定图标的大小， 为 <SuperMap.Size> 对象。
     * offset - {<SuperMap.Pixel>} 指定图标的偏移量，为 <SuperMap.Pixel> 对象。
     * calculateOffset - {Function}  用于计算偏移量的方法。
     */
    constructor(url, size, offset, calculateOffset) {
        this.url = url;
        this.size = (size) ? size : new Size(20, 20);
        this.offset = offset ? offset : new Pixel(-(this.size.w / 2), -(this.size.h / 2));
        this.calculateOffset = calculateOffset;

        var id = Util.createUniqueID("SM_icon_");
        this.imageDiv = Util.createAlphaImageDiv(id);
    }

    /**
     * Method: destroy
     * Nullify references and remove event listeners to prevent circular
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
     * Method: clone
     *
     * Returns:
     * {<SuperMap.Icon>} A fresh copy of the icon.
     */
    clone() {
        return new Icon(this.url,
            this.size,
            this.offset,
            this.calculateOffset);
    }

    /**
     * Method: setSize
     *
     * Parameters:
     * size - {<SuperMap.Size>}
     */
    setSize(size) {
        if (size != null) {
            this.size = size;
        }
        this.draw();
    }

    /**
     * Method: setUrl
     *
     * Parameters:
     * url - {String}
     */
    setUrl(url) {
        if (url != null) {
            this.url = url;
        }
        this.draw();
    }

    /**
     * Method: draw
     * Move the div to the given pixel.
     *
     * Parameters:
     * px - {<SuperMap.Pixel>}
     *
     * Returns:
     * {DOMElement} A new DOM Image of this icon set at the location passed-in
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
     * Method: erase
     * Erase the underlying image element.
     *
     */
    erase() {
        if (this.imageDiv != null && this.imageDiv.parentNode != null) {
            Element.remove(this.imageDiv);
        }
    }

    /**
     * Method: setOpacity
     * Change the icon's opacity
     *
     * Parameters:
     * opacity - {float}
     */
    setOpacity(opacity) {
        Util.modifyAlphaImageDiv(this.imageDiv, null, null, null,
            null, null, null, null, opacity);

    }

    /**
     * Method: moveTo
     * move icon to passed in px.
     *
     * Parameters:
     * px - {<SuperMap.Pixel>}
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
     * Method: display
     * Hide or show the icon
     *
     * Parameters:
     * display - {Boolean}
     */
    display(display) {
        this.imageDiv.style.display = (display) ? "" : "none";
    }


    /**
     * APIMethod: isDrawn
     *
     * Returns:
     * {Boolean} 图标是否重绘。
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
