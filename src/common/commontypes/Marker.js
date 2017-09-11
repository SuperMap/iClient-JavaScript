import SuperMap from '../SuperMap';
import Icon from './Icon';
import Size from './Size';
import Pixel from './Pixel';
import Event from './Event';
import {FunctionExt} from './BaseTypes';
import {Util} from './Util';

/**
 * @class  SuperMap.Marker
 * @classdesc 标记覆盖物，对地图上的点进行标注，可以自定义选择标注的图标，需添加到 Markers 图层上显示。
 * @param lonlat - {SuperMap.LonLat} 当前标记的位置。
 * @param icon - {SuperMap.Icon}  当前标记的图标。
 *
 * @example
 * var markers = new SuperMap.Layer.Markers( "Markers" );
 * map.addLayer(markers);
 *
 * var size = new SuperMap.Size(21,25);
 * var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
 * var icon = new SuperMap.Icon('..img/marker.png', size, offset);
 * markers.addMarker(new SuperMap.Marker(new SuperMap.LonLat(0,0),icon));
 */
export default class Marker {

    /**
     * @member SuperMap.Marker.prototype.icon -{SuperMap.Icon}
     * @description The icon used by this marker.
     */
    icon = null;

    /**
     * @member SuperMap.Marker.prototype.lonlat -{SuperMap.LonLat}
     * @description location of object
     */
    lonlat = null;

    /**
     * @member SuperMap.Marker.prototype.events -{SuperMap.Events}
     * @description the event handler.
     * @description 支持事件类型:
     * * click - 当鼠标单击maker时触发此事件。
     * * dblclick - 当鼠标双击maker时触发此事件。
     * * mousedown - 当鼠标在maker上按下时触发此事件。
     * * mouseup - 当鼠标在maker上按下并放开时触发此事件。
     * * mousemove - 当鼠标移过maker时触发此事件。
     * * mouseout - 当鼠标移出maker时触发此事件。
     * * mouseover - 当鼠标移进maker时触发此事件。
     * * rightclick -  当鼠标右键单击maker时触发此事件。
     * * touchstart - 当在触摸屏上对marker开始进行触摸时触发此事件。
     * * touchmove -  当在触摸屏上对marker进行触摸并移动时触发此事件。
     * * touchend -  当在触摸屏上对marker触摸完成时触发此事件。
     *
     * @example
     * //例如点击marker弹出popup
     * var marker.events.on({
     *    "click":openInfoWin,
     *    "scope": marker
     * });
     *
     * function openInfoWin(){
     *    //doSomeThing
     * }
     */
    events = null;

    /**
     * @member SuperMap.Marker.prototype.map -{Object}
     * @description the map this marker is attached to
     */
    map = null;

    constructor(lonlat, icon) {
        var t = this;
        this.lonlat = lonlat;

        var newIcon = (icon) ? icon.clone() : Marker.defaultIcon();
        if (this.icon == null) {
            this.icon = newIcon;
        } else {
            this.icon.url = newIcon.url;
            this.icon.size = newIcon.size;
            this.icon.offset = newIcon.offset;
            this.icon.calculateOffset = newIcon.calculateOffset;
        }
        this.events = new Events(this, this.icon.imageDiv, ["rightclick"]);


        var eventHandler = FunctionExt.bindAsEventListener(
            function (evt) {
                if (evt.preventDefault) evt.preventDefault();
                t.events.triggerEvent("rightclick", evt);
                return false;
            }, this.events
        );

        Event.observe(this.icon.imageDiv, "contextmenu", eventHandler);
    }


    /**
     * @function SuperMap.Marker.prototype.getLonLat
     * @description 获取marker的当前坐标
     * @returns {SuperMap.LonLat}
     */
    getLonLat() {
        return this.lonlat;
    }


    /**
     * @function SuperMap.Marker.prototype.destroy
     * @description 清除标记，需要首先移除图层上添加的标记，在标记内不能执行此操作，因为不知道标记连接到哪个图层。
     */
    destroy() {
        // erase any drawn features
        this.erase();

        this.map = null;

        this.events.destroy();
        this.events = null;

        if (this.icon != null) {
            this.icon.destroy();
            this.icon = null;
        }
    }


    /**
     * @function SuperMap.Marker.prototype.draw
     * @description Calls draw on the icon, and returns that output.
     * @param px - {SuperMap.Pixel}
     * @returns {HTMLElement} A new DOM Image with this marker's icon set at the
     * location passed-in
     */
    draw(px) {
        return this.icon.draw(px);
    }


    /**
     * @function SuperMap.Marker.prototype.erase
     * @description Erases any drawn elements for this marker.
     */
    erase() {
        if (this.icon != null) {
            this.icon.erase();
        }
    }


    /**
     * @function SuperMap.Marker.prototype.moveTo
     * @description Move the marker to the new location.
     * @param px - {SuperMap.Pixel} the pixel position to move to
     */
    moveTo(px) {
        if ((px != null) && (this.icon != null)) {
            this.icon.moveTo(px);
        }
        this.lonlat = this.map.getLonLatFromLayerPx(px);
    }


    /**
     * @function SuperMap.Marker.prototype.isDrawn
     * @description 获取标记是否绘制。
     * @returns {Boolean} 标记是否被绘制。
     */
    isDrawn() {
        var isDrawn = (this.icon && this.icon.isDrawn());
        return isDrawn;
    }


    /**
     * @function SuperMap.Marker.prototype.onScreen
     * @returns {Boolean} Whether or not the marker is currently visible on screen.
     */
    onScreen() {
        var onScreen = false;
        if (this.map) {
            var screenBounds = this.map.getExtent();
            onScreen = screenBounds.containsLonLat(this.lonlat);
        }
        return onScreen;
    }


    /**
     * @function SuperMap.Marker.prototype.inflate
     * @description Englarges the markers icon by the specified ratio.
     * @param inflate - {float} the ratio to enlarge the marker by (passing 2
     *                   will double the size).
     */
    inflate(inflate) {
        if (this.icon) {
            var newSize = new Size(this.icon.size.w * inflate,
                this.icon.size.h * inflate);
            this.icon.setSize(newSize);
        }
    }


    /**
     * @function SuperMap.Marker.prototype.setOpacity
     * @description Change the opacity of the marker by changin the opacity of its icon
     * @param opacity - {float}  Specified as fraction (0.4, etc)
     */
    setOpacity(opacity) {
        this.icon.setOpacity(opacity);
    }


    /**
     * @function SuperMap.Marker.prototype.setUrl
     * @description Change URL of the Icon Image.
     * @param url - {string}
     */
    setUrl(url) {
        this.icon.setUrl(url);
    }


    /**
     * @function SuperMap.Marker.prototype.display
     * @description Hide or show the icon
     * @param display - {Boolean}
     */
    display(display) {
        this.icon.display(display);
    }


    /**
     * @function SuperMap.Marker.defaultIcon
     * @description Creates a default {@link SuperMap.Icon}.
     * @returns {SuperMap.Icon} A default SuperMap.Icon to use for a marker
     */
    static defaultIcon() {
        var url = "";
        var size = new Size(21, 25);
        var calculateOffset = function (size) {
            return new Pixel(-(size.w / 2), -size.h);
        };

        return new Icon(url, size, null, calculateOffset);
    };

    CLASS_NAME = "SuperMap.Marker"
}

SuperMap.Marker = Marker;