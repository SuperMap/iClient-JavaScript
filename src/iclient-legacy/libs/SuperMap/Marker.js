/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Events.js
 * @requires SuperMap/Icon.js
 */

/**
 * Class: SuperMap.Marker
 * 标记覆盖物，对地图上的点进行标注，可以自定义选择标注的图标，需添加到 Markers 图层上显示。
 */
SuperMap.Marker = SuperMap.Class({
    
    /** 
     * Property: icon 
     * {<SuperMap.Icon>} The icon used by this marker.
     */
    icon: null,

    /** 
     * Property: lonlat 
     * {<SuperMap.LonLat>} location of object
     */
    lonlat: null,
    
    /** 
     * APIProperty: events
     * {<SuperMap.Events>} the event handler.
     *
     * 支持事件类型:
     * click - 当鼠标单击maker时触发此事件。
     * dblclick - 当鼠标双击maker时触发此事件。
     * mousedown - 当鼠标在maker上按下时触发此事件。
     * mouseup - 当鼠标在maker上按下并放开时触发此事件。
     * mousemove - 当鼠标移过maker时触发此事件。
     * mouseout - 当鼠标移出maker时触发此事件。
     * mouseover - 当鼠标移进maker时触发此事件。
     * rightclick -  当鼠标右键单击maker时触发此事件。
     * touchstart - 当在触摸屏上对marker开始进行触摸时触发此事件。
     * touchmove -  当在触摸屏上对marker进行触摸并移动时触发此事件。
     * touchend -  当在触摸屏上对marker触摸完成时触发此事件。
     *
     *
     *
     * (start code)
     * //例如点击marker弹出popup
     * marker.events.on({
     *    "click":openInfoWin,
     *    "scope": marker
     * });
     *
     * function openInfoWin(){
     *     var marker = this;
     *     var lonlat = marker.getLonLat();
     *     var contentHTML = "<div style='font-size:.8em; opacity: 0.8; overflow-y:hidden;'>";
     *     contentHTML += "<div>"+marker.sm_capital+"</div></div>";
     *
     *     var popup = new SuperMap.Popup.FramedCloud("popwin",new SuperMap.LonLat(lonlat.lon,lonlat.lat),null,contentHTML,null,true);
     *     map.addPopup(popup);
     * }
     * (end)
     */
    events: null,
    
    /** 
     * Property: map 
     * {<SuperMap.Map>} the map this marker is attached to
     */
    map: null,
    
    /** 
     * Constructor: SuperMap.Marker
     * 创建标记。通常通过调用 <SuperMap.Layer.Markers> 将标记添加到指定的标记图层。如：
     * 
     * (code)
     * var markers = new SuperMap.Layer.Markers( "Markers" );
     * map.addLayer(markers);
     *
     * var size = new SuperMap.Size(21,25);
     * var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
     * var icon = new SuperMap.Icon('..img/marker.png', size, offset);
     * markers.addMarker(new SuperMap.Marker(new SuperMap.LonLat(0,0),icon));
     * (end) 
     *     
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 当前标记的位置。
     * icon - {<SuperMap.Icon>}  当前标记的图标。
     */
    initialize: function(lonlat, icon) {
        var t = this;
        this.lonlat = lonlat;
        
        var newIcon = (icon) ? icon.clone() : SuperMap.Marker.defaultIcon();
        if (this.icon == null) {
            this.icon = newIcon;
        } else {
            this.icon.url = newIcon.url;
            this.icon.size = newIcon.size;
            this.icon.offset = newIcon.offset;
            this.icon.calculateOffset = newIcon.calculateOffset;
        }
        this.events = new SuperMap.Events(this, this.icon.imageDiv, ["rightclick"]);


        var eventHandler = SuperMap.Function.bindAsEventListener(
            function(evt){
                if(evt.preventDefault)evt.preventDefault();
                t.events.triggerEvent("rightclick", evt)
                return false;
            }, this.events
        );

        SuperMap.Event.observe(this.icon.imageDiv, "contextmenu", eventHandler);
    },

    /**
     * APIMethod: getLonLat
     * 获取marker的当前坐标
     *
     * Returns:
     * {SuperMap.LonLat}
     */
    getLonLat:function(){
        return this.lonlat;
    },
    
    /**
     * APIMethod: destroy
     * 清除标记，需要首先移除图层上添加的标记，在标记内不能执行此操作，因为不知道标记连接到哪个图层。
     */
    destroy: function() {
        // erase any drawn features
        this.erase();

        this.map = null;

        this.events.destroy();
        this.events = null;

        if (this.icon != null) {
            this.icon.destroy();
            this.icon = null;
        }
    },
    
    /** 
    * Method: draw
    * Calls draw on the icon, and returns that output.
    * 
    * Parameters:
    * px - {<SuperMap.Pixel>}
    * 
    * Returns:
    * {DOMElement} A new DOM Image with this marker's icon set at the 
    * location passed-in
    */
    draw: function(px) {
        return this.icon.draw(px);
    }, 

    /** 
    * Method: erase
    * Erases any drawn elements for this marker.
    */
    erase: function() {
        if (this.icon != null) {
            this.icon.erase();
        }
    }, 

    /**
    * Method: moveTo
    * Move the marker to the new location.
    *
    * Parameters:
    * px - {<SuperMap.Pixel>} the pixel position to move to
    */
    moveTo: function (px) {
        if ((px != null) && (this.icon != null)) {
            this.icon.moveTo(px);
        }           
        this.lonlat = this.map.getLonLatFromLayerPx(px);
    },

    /**
     * APIMethod: isDrawn
     * 获取标记是否绘制。
     * Returns:
     * {Boolean} 标记是否被绘制。
     */
    isDrawn: function() {
        var isDrawn = (this.icon && this.icon.isDrawn());
        return isDrawn;   
    },

    /**
     * Method: onScreen
     *
     * Returns:
     * {Boolean} Whether or not the marker is currently visible on screen.
     */
    onScreen:function() {
        
        var onScreen = false;
        if (this.map) {
            var screenBounds = this.map.getExtent();
            onScreen = screenBounds.containsLonLat(this.lonlat);
        }    
        return onScreen;
    },
    
    /**
     * Method: inflate
     * Englarges the markers icon by the specified ratio.
     *
     * Parameters:
     * inflate - {float} the ratio to enlarge the marker by (passing 2
     *                   will double the size).
     */
    inflate: function(inflate) {
        if (this.icon) {
            var newSize = new SuperMap.Size(this.icon.size.w * inflate,
                                              this.icon.size.h * inflate);
            this.icon.setSize(newSize);
        }        
    },
    
    /** 
     * Method: setOpacity
     * Change the opacity of the marker by changin the opacity of 
     *   its icon
     * 
     * Parameters:
     * opacity - {float}  Specified as fraction (0.4, etc)
     */
    setOpacity: function(opacity) {
        this.icon.setOpacity(opacity);
    },

    /**
     * Method: setUrl
     * Change URL of the Icon Image.
     * 
     * url - {String} 
     */
    setUrl: function(url) {
        this.icon.setUrl(url);
    },    

    /** 
     * Method: display
     * Hide or show the icon
     * 
     * display - {Boolean} 
     */
    display: function(display) {
        this.icon.display(display);
    },

    CLASS_NAME: "SuperMap.Marker"
});


/**
 * Function: defaultIcon
 * Creates a default <SuperMap.Icon>.
 * 
 * Returns:
 * {<SuperMap.Icon>} A default SuperMap.Icon to use for a marker
 */
SuperMap.Marker.defaultIcon = function() {
    var url = SuperMap.Util.getImagesLocation() + "marker.png";
    var size = new SuperMap.Size(21, 25);
    var calculateOffset = function(size) {
                    return new SuperMap.Pixel(-(size.w/2), -size.h);
                 };

    return new SuperMap.Icon(url, size, null, calculateOffset);        
};
    

