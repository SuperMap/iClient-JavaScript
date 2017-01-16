/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Feature
 * 要素类组合了地理和属性，Feature 类同时具有 marker 和 lonlat 属性。
 */
SuperMap.Feature = SuperMap.Class({

    /** 
     * Property: layer 
     * {<SuperMap.Layer>} 
     */
    layer: null,

    /** 
     * Property: id 
     * {String} 
     */
    id: null,
    
    /** 
     * Property: lonlat 
     * {<SuperMap.LonLat>} 
     */
    lonlat: null,

    /** 
     * Property: data 
     * {Object} 
     */
    data: null,

    /** 
     * Property: marker 
     * {<SuperMap.Marker>} 
     */
    marker: null,

    /**
     * APIProperty: popupClass
     * {<SuperMap.Class>} 用来实例化新的弹出窗口。默认为SuperMap.Popup.AnchoredBubble。
     */
    popupClass: null,

    /** 
     * Property: popup 
     * {<SuperMap.Popup>} 
     */
    popup: null,

    /** 
     * Constructor: SuperMap.Feature
     * 构造函数，用来创建新的feature对象。
     *
     * Parameters:
     * layer - {<SuperMap.Layer>} 图层。
     * lonlat - {<SuperMap.LonLat>} 经纬度。
     * data - {Object} 数据对象。
     * 
     * Returns:
     * {<SuperMap.Feature>}返回一个要素类。
     */
    initialize: function(layer, lonlat, data) {
        this.layer = layer;
        this.lonlat = lonlat;
        this.data = (data != null) ? data : {};
        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME + "_"); 
    },

    /** 
     * Method: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {

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
    },
    
    /**
     * Method: onScreen
     * 
     * Returns:
     * {Boolean} Whether or not the feature is currently visible on screen
     *           (based on its 'lonlat' property)
     */
    onScreen:function() {
        
        var onScreen = false;
        if ((this.layer != null) && (this.layer.map != null)) {
            var screenBounds = this.layer.map.getExtent();
            onScreen = screenBounds.containsLonLat(this.lonlat);
        }    
        return onScreen;
    },
    

    /**
     * Method: createMarker
     * Based on the data associated with the Feature, create and return a marker object.
     *
     * Returns: 
     * {<SuperMap.Marker>} A Marker Object created from the 'lonlat' and 'icon' properties
     *          set in this.data. If no 'lonlat' is set, returns null. If no
     *          'icon' is set, SuperMap.Marker() will load the default image.
     *          
     *          Note - this.marker is set to return value
     * 
     */
    createMarker: function() {

        if (this.lonlat != null) {
            this.marker = new SuperMap.Marker(this.lonlat, this.data.icon);
        }
        return this.marker;
    },

    /**
     * Method: destroyMarker
     * Destroys marker.
     * If user overrides the createMarker() function, s/he should be able
     *   to also specify an alternative function for destroying it
     */
    destroyMarker: function() {
        this.marker.destroy();  
    },

    /**
     * Method: createPopup
     * Creates a popup object created from the 'lonlat', 'popupSize',
     *     and 'popupContentHTML' properties set in this.data. It uses
     *     this.marker.icon as default anchor. 
     *  
     *  If no 'lonlat' is set, returns null. 
     *  If no this.marker has been created, no anchor is sent.
     *
     *  Note - the returned popup object is 'owned' by the feature, so you
     *      cannot use the popup's destroy method to discard the popup.
     *      Instead, you must use the feature's destroyPopup
     * 
     *  Note - this.popup is set to return value
     * 
     * Parameters: 
     * closeBox - {Boolean} create popup with closebox or not
     * 
     * Returns:
     * {<SuperMap.Popup>} Returns the created popup, which is also set
     *     as 'popup' property of this feature. Will be of whatever type
     *     specified by this feature's 'popupClass' property, but must be
     *     of type <SuperMap.Popup>.
     * 
     */
    createPopup: function(closeBox) {

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
    },

    
    /**
     * Method: destroyPopup
     * Destroys the popup created via createPopup.
     *
     * As with the marker, if user overrides the createPopup() function, s/he 
     *   should also be able to override the destruction
     */
    destroyPopup: function() {
        if (this.popup) {
            this.popup.feature = null; 
            this.popup.destroy();
            this.popup = null;
        }    
    },

    CLASS_NAME: "SuperMap.Feature"
});
