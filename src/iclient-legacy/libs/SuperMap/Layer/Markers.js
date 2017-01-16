/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Layer.js
 */

/**
 * Class: SuperMap.Layer.Markers
 * 标记图层类。
 *
 * Inherits from:
 *  - <SuperMap.Layer> 
 */
SuperMap.Layer.Markers = SuperMap.Class(SuperMap.Layer, {
    
    /** 
     * APIProperty: isBaseLayer 
     * {Boolean} 是否为基础图层，默认为false。标记层不会作为基础层。
     */
    isBaseLayer: false,
    
    /** 
     * APIProperty: markers 
     * {Array(<SuperMap.Marker>)} 内部标记列表。用于存放标记（marker）。
     */
    markers: null,


    /** 
     * Property: drawn 
     * {Boolean} internal state of drawing. This is a workaround for the fact
     * that the map does not call moveTo with a zoomChanged when the map is
     * first starting up. This lets us catch the case where we have *never*
     * drawn the layer, and draw it even if the zoom hasn't changed.
     */
    drawn: false,
    
    /**
     * Constructor: SuperMap.Layer.Markers 
     * map上创建标记层，在标记层上添加相应的标记。如：
     * (start code)
     * //创建标记图层     
     * var markers = new SuperMap.Layer.Markers("Markers",{});
     * map.addLayer(markers);
     * //标记图层上添加标记
     * var size = new SuperMap.Size(21,25);
     * var offset = new SuperMap.Pixel(-(size.w/2), -size.h);
     * var icon = new SuperMap.Icon('../img/marker.png',size,offset);
     * markers.addMarker(new SuperMap.Marker(new SuperMap.LonLat(0,0),icon));
     * (end)
     *      
     * Parameters:
     * name - {String}图层名称
     * options - {Object} 该类及其父类开放的属性。
     */
    initialize: function(name, options) {
        SuperMap.Layer.prototype.initialize.apply(this, arguments);
        this.markers = [];
    },
    
    /**
     * APIMethod: destroy
     * 解构Markers类，释放资源。
     */
    destroy: function() {
        this.clearMarkers();
        this.markers = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: setOpacity
     * 设置标记的不透明度。如：
     * (start code)
     *  var marker = new SuperMap.Marker(new SuperMap.LonLat(90,10),icon);
     *  marker.setOpacity(0.2);
     *  (end)
     * 
     * Parameter:
     * opacity - {Float}不透明度参数，范围在[0,1]内。
     */
    setOpacity: function(opacity) {
        if (opacity !== this.opacity) {
            this.opacity = opacity;
            for (var i=0, len=this.markers.length; i<len; i++) {
                this.markers[i].setOpacity(this.opacity);
            }
        }
    },

    /** 
     * Method: moveTo
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} 
     * zoomChanged - {Boolean} 
     * dragging - {Boolean} 
     */
    moveTo:function(bounds, zoomChanged, dragging) {
        SuperMap.Layer.prototype.moveTo.apply(this, arguments);

        if (zoomChanged || !this.drawn) {
            for(var i=0, len=this.markers.length; i<len; i++) {
                this.drawMarker(this.markers[i]);
            }
            this.drawn = true;
        }
    },

    /**
     * APIMethod: addMarker
     * 在标记图层里添加marker（标记）。
     * Parameters:
     * marker - {<SuperMap.Marker>}需要添加的标记。
     */
    addMarker: function(marker) {
        this.markers.push(marker);

        if (this.opacity != null) {
            marker.setOpacity(this.opacity);
        }

        if (this.map && this.map.getExtent()) {
            marker.map = this.map;
            this.drawMarker(marker);
        }
    },

    /**
     * APIMethod: removeMarker
     * 移除标记图层里面的marker（标记）。
     * Parameters:
     * marker - {<SuperMap.Marker>}需要移除的标记。
     */
    removeMarker: function(marker) {
        if (this.markers && this.markers.length) {
            SuperMap.Util.removeItem(this.markers, marker);
            marker.erase();
        }
    },

    /**
     * APIMethod: clearMarkers
     * 清空图层上所有的markers。
     */
    clearMarkers: function() {
        if (this.markers != null) {
            while(this.markers.length > 0) {
                this.removeMarker(this.markers[0]);
            }
        }
    },

    /** 
     * Method: drawMarker
     * Calculate the pixel location for the marker, create it, and 
     *    add it to the layer's div
     * 绘制marker。（addmarker后需要绘制）
     * Parameters:
     * marker - {<SuperMap.Marker>}需要绘制的marker。
     */
    drawMarker: function(marker) {
        var px = this.map.getLayerPxFromLonLat(marker.lonlat);
        if (px == null) {
            marker.display(false);
        } else {
            if (!marker.isDrawn()) {
                var markerImg = marker.draw(px);
                this.div.appendChild(markerImg);
            } else if(marker.icon) {
                marker.icon.moveTo(px);
            }
        }
    },
    
    /** 
     * APIMethod: getDataExtent
     * 计算所有的标记的最大范围。
     * 
     * Returns:
     * {<SuperMap.Bounds>}返回的最大范围。
     */
    getDataExtent: function () {
        var maxExtent = null;
        
        if ( this.markers && (this.markers.length > 0)) {
            var maxExtent = new SuperMap.Bounds();
            for(var i=0, len=this.markers.length; i<len; i++) {
                var marker = this.markers[i];
                maxExtent.extend(marker.lonlat);
            }
        }

        return maxExtent;
    },

    CLASS_NAME: "SuperMap.Layer.Markers"
});
