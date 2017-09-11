import SuperMap from '../SuperMap';
import Marker from './Marker';
import {Util} from './Util';

/**
 * @class SuperMap.Feature
 * @classdesc 要素类组合了地理和属性，Feature 类同时具有 marker 和 lonlat 属性。
 * @param layer - {SuperMap.Layer} 图层。
 * @param lonlat - {SuperMap.LonLat} 经纬度。
 * @param data - {Object} 数据对象。
 */
export default class Feature {

    /**
     * @deprecated
     * @member SuperMap.Feature.prototype.layer -{SuperMap.Layer}
     * @description layer
     */
    layer = null;

    /**
     * @member SuperMap.Feature.prototype.id -{String}
     * @description id
     */
    id = null;

    /**
     * @member SuperMap.Feature.prototype.lonlat -{SuperMap.LonLat}
     * @description lonlat
     *
     */
    lonlat = null;

    /**
     * @member SuperMap.Feature.prototype.data -{Object}
     * @description data
     */
    data = null;

    /**
     * @member SuperMap.Feature.prototype.marker -{SuperMap.Marker}
     * @description marker
     */
    marker = null;

    /**
     * @deprecated
     * @member SuperMap.Feature.prototype.popupClass -{SuperMap.Class}
     * @description 用来实例化新的弹出窗口。默认为{@link SuperMap.Popup.AnchoredBubble}
     */
    popupClass = null;

    /**
     * @deprecated
     * @member SuperMap.Feature.prototype.popup -{SuperMap.Popup}
     * @description popup
     */
    popup = null;

    constructor(layer, lonlat, data) {
        this.layer = layer;
        this.lonlat = lonlat;
        this.data = (data != null) ? data : {};
        this.id = Util.createUniqueID(this.CLASS_NAME + "_");
    }

    /**
     * @function SuperMap.Feature.prototype.destroy
     * @description nullify references to prevent circular references and memory leaks
     */
    destroy() {

        //remove the popup from the map
        if ((this.layer != null) && (this.layer.map != null)) {
            if (this.popup != null) {
                this.layer.map.removePopup(this.popup);
            }
        }
        // remove the marker from the layer
        if (this.layer != null && this.marker != null) {
            this.layer.removeMarker(this.marker);
        }

        this.layer = null;
        this.id = null;
        this.lonlat = null;
        this.data = null;
        if (this.marker != null) {
            this.destroyMarker(this.marker);
            this.marker = null;
        }
        if (this.popup != null) {
            this.destroyPopup(this.popup);
            this.popup = null;
        }
    }


    /**
     * @function SuperMap.Feature.prototype.onScreen
     * @returns {Boolean} Whether or not the feature is currently visible on screen
     *           (based on its 'lonlat' property)
     */
    onScreen() {
        var onScreen = false;
        if ((this.layer != null) && (this.layer.map != null)) {
            var screenBounds = this.layer.map.getExtent();
            onScreen = screenBounds.containsLonLat(this.lonlat);
        }
        return onScreen;
    }


    /**
     * @function SuperMap.Feature.prototype.createMarker
     * @description Based on the data associated with the Feature, create and return a marker object.
     * @returns {SuperMap.Marker} A Marker Object created from the 'lonlat' and 'icon' properties
     *          set in this.data. If no 'lonlat' is set, returns null. If no
     *          'icon' is set, SuperMap.Marker() will load the default image.
     *
     *          Note - this.marker is set to return value
     *
     */
    createMarker() {
        if (this.lonlat != null) {
            this.marker = new Marker(this.lonlat, this.data.icon);
        }
        return this.marker;
    }


    /**
     * @function SuperMap.Feature.prototype.destroyMarker
     * @description Destroys marker.
     * If user overrides the createMarker() function, s/he should be able
     *   to also specify an alternative function for destroying it
     */
    destroyMarker() {
        this.marker.destroy();
    }


    /**
     * @function SuperMap.Feature.prototype.createPopup
     * @description Creates a popup object created from the 'lonlat', 'popupSize',
     *     and 'popupContentHTML' properties set in this.data. It uses
     *     this.marker.icon as default anchor.<br>
     *
     *  If no 'lonlat' is set, returns null.<br>
     *  If no this.marker has been created, no anchor is sent.<br>
     *
     *  Note - the returned popup object is 'owned' by the feature, so you
     *      cannot use the popup's destroy method to discard the popup.
     *      Instead, you must use the feature's destroyPopup.<br>
     *
     *  Note - this.popup is set to return value.<br>
     * @param closeBox - {Boolean} create popup with closebox or not
     * @returns {SuperMap.Popup} Returns the created popup, which is also set
     *     as 'popup' property of this feature. Will be of whatever type
     *     specified by this feature's 'popupClass' property, but must be
     *     of type <SuperMap.Popup>.
     *
     */
    createPopup(closeBox) {
        if (this.lonlat != null) {
            if (!this.popup) {
                var anchor = (this.marker) ? this.marker.icon : null;
                var popupClass = this.popupClass ?
                    this.popupClass : SuperMap.Popup.AnchoredBubble;
                this.popup = new popupClass(this.id + "_popup",
                    this.lonlat,
                    this.data.popupSize,
                    this.data.popupContentHTML,
                    anchor,
                    closeBox);
            }
            if (this.data.overflow != null) {
                this.popup.contentDiv.style.overflow = this.data.overflow;
            }

            this.popup.feature = this;
        }
        return this.popup;
    }


    /**
     * @function SuperMap.Feature.prototype.destroyPopup
     * @description Destroys the popup created via createPopup.
     *  As with the marker, if user overrides the createPopup() function, s/he
     *   should also be able to override the destruction
     */
    destroyPopup() {
        if (this.popup) {
            this.popup.feature = null;
            this.popup.destroy();
            this.popup = null;
        }
    }

    CLASS_NAME = "SuperMap.Feature"
}
SuperMap.Feature = Feature;