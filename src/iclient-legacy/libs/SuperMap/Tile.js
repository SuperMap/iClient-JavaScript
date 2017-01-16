/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/BaseTypes/Class.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Tile
 *  用来指定单个瓦片的类，但是设计它用来做的相对比较少。瓦片存储关于它们
 *      自己的信息——例如瓦片的URL以及它们的大小。通过 <SuperMap.Tile> 或
 *      其子类构造函数创建一个新的实例。
 *
 * TBD 3.0 - remove reference to url in above paragraph
 * 
 */
SuperMap.Tile = SuperMap.Class({
    
    /** 
     * Constant: EVENT_TYPES
     * {Array(String)} 支持的应用程序事件类型。
     */
    EVENT_TYPES: [ "loadstart", "loadend", "reload", "unload"],
    
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 事件对象，用来处理瓦片上的所有事件。
     */
    events: null,

    /**
     * Property: id 
     * {String} null
     */
    id: null,
    
    /** 
     * Property: layer 
     * {<SuperMap.Layer>} layer the tile is attached to 
     */
    layer: null,
    
    /**
     * Property: url
     * {String} url of the request.
     *
     * TBD 3.0 
     * Deprecated. The base tile class does not need an url. This should be 
     * handled in subclasses. Does not belong here.
     */
    url: null,

    /** 
     * APIProperty: bounds 
     * {<SuperMap.Bounds>} null
     */
    bounds: null,
    
    /** 
     * Property: size 
     * {<SuperMap.Size>} null
     */
    size: null,
    
    /** 
     * Property: position 
     * {<SuperMap.Pixel>} Top Left pixel of the tile
     */    
    position: null,

    /**
     * Property: isLoading
     * {Boolean} Is the tile loading?
     */
    isLoading: false,
        
    /** TBD 3.0 -- remove 'url' from the list of parameters to the constructor.
     *             there is no need for the base tile class to have a url.
     * 
     * Constructor: SuperMap.Tile
     * Constructor for a new <SuperMap.Tile> instance.
     * 
     * Parameters:
     * layer - {<SuperMap.Layer>} layer that the tile will go in.
     * position - {<SuperMap.Pixel>}
     * bounds - {<SuperMap.Bounds>}
     * url - {<String>}
     * size - {<SuperMap.Size>}
     * options - {Object}
     */   
    initialize: function(layer, position, bounds, url, size, options) {
        this.layer = layer;
        this.position = position.clone();
        this.bounds = bounds.clone();
        this.url = url;
        if (size) {
            this.size = size.clone();
        }

        //give the tile a unique id based on its BBOX.
        this.id = SuperMap.Util.createUniqueID("Tile_");
        
        this.events = new SuperMap.Events(this, null, this.EVENT_TYPES);

        SuperMap.Util.extend(this, options);
    },

    /**
     * Method: unload
     * Call immediately before destroying if you are listening to tile
     * events, so that counters are properly handled if tile is still
     * loading at destroy-time. Will only fire an event if the tile is
     * still loading.
     */
    unload: function() {
       if (this.isLoading) { 
           this.isLoading = false; 
           this.events.triggerEvent("unload"); 
       }
    },
    
    /** 
     * APIMethod: destroy
     * 取消引用来防止循环引用和内存泄漏。
     */
    destroy:function() {
        this.layer  = null;
        this.bounds = null;
        this.size = null;
        this.position = null;
        
        this.events.destroy();
        this.events = null;
    },
    
    /**
     * Method: clone
     *
     * Parameters:
     * obj - {<SuperMap.Tile>} The tile to be cloned
     *
     * Returns:
     * {<SuperMap.Tile>} An exact clone of this <SuperMap.Tile>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new SuperMap.Tile(this.layer, 
                                      this.position, 
                                      this.bounds, 
                                      this.url, 
                                      this.size);
        } 
        
        // catch any randomly tagged-on properties
        SuperMap.Util.applyDefaults(obj, this);
        
        return obj;
    },

    /**
     * Method: draw
     * Clear whatever is currently in the tile, then return whether or not 
     *     it should actually be re-drawn.
     * 
     * Returns:
     * {Boolean} Whether or not the tile should actually be drawn. Note that 
     *     this is not really the best way of doing things, but such is 
     *     the way the code has been developed. Subclasses call this and
     *     depend on the return to know if they should draw or not.
     */
    draw: function() {
        var maxExtent = this.layer.maxExtent;
        var withinMaxExtent = (maxExtent &&
                               this.bounds.intersectsBounds(maxExtent, false));
 
        // The only case where we *wouldn't* want to draw the tile is if the 
        // tile is outside its layer's maxExtent.
        this.shouldDraw = (withinMaxExtent || this.layer.displayOutsideMaxExtent);
                
        //clear tile's contents and mark as not drawn
        this.clear();
        
        return this.shouldDraw;
    },
    
    /** 
     * Method: moveTo
     * Reposition the tile.
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>}
     * position - {<SuperMap.Pixel>}
     * redraw - {Boolean} Call draw method on tile after moving.
     *     Default is true
     */
    moveTo: function (bounds, position, redraw) {
        if (redraw == null) {
            redraw = true;
        }

        this.bounds = bounds.clone();
        this.position = position.clone();
        if (redraw) {
            this.draw();
        }
    },

    /** 
     * Method: clear
     * Clear the tile of any bounds/position-related data so that it can 
     *     be reused in a new location. To be implemented by subclasses.
     */
    clear: function() {
        // to be implemented by subclasses
    },
    
    /**   
     * Method: getBoundsFromBaseLayer
     * Take the pixel locations of the corner of the tile, and pass them to 
     *     the base layer and ask for the location of those pixels, so that 
     *     displaying tiles over Google works fine.
     *
     * Parameters:
     * position - {<SuperMap.Pixel>}
     *
     * Returns:
     * bounds - {<SuperMap.Bounds>} 
     */
    getBoundsFromBaseLayer: function(position) {
        var topLeft = this.layer.map.getLonLatFromLayerPx(position); 
        var bottomRightPx = position.clone();
        bottomRightPx.x += this.size.w;
        bottomRightPx.y += this.size.h;
        var bottomRight = this.layer.map.getLonLatFromLayerPx(bottomRightPx); 
        // Handle the case where the base layer wraps around the date line.
        // Google does this, and it breaks WMS servers to request bounds in 
        // that fashion.  
        if (topLeft.lon > bottomRight.lon) {
            if (topLeft.lon < 0) {
                topLeft.lon = -180 - (topLeft.lon+180);
            } else {
                bottomRight.lon = 180+bottomRight.lon+180;
            }        
        }
        var bounds = new SuperMap.Bounds(topLeft.lon, 
                                       bottomRight.lat, 
                                       bottomRight.lon, 
                                       topLeft.lat);  
        return bounds;
    },        
        
    /** 
     * Method: showTile
     * Show the tile only if it should be drawn.
     */
    showTile: function() { 
        if (this.shouldDraw) {
            this.show();
        }
    },
    
    /** 
     * Method: show
     * Show the tile.  To be implemented by subclasses.
     */
    show: function() { },
    
    /** 
     * Method: hide
     * Hide the tile.  To be implemented by subclasses.
     */
    hide: function() { },

    /**
     * APIMethod: getCanvasContext
     * 返回一个canvas context对象，该对象上面绘制了这个瓦片图片
     *
     * 当浏览器不支持或是该瓦片没有图片或是图片没有下载完成时，返回undefined
     *
     * 可以通过该方法对图片进行像素操作，并通过drawImgData方法重新绘制
     * (code)
     * layer.events.on({tileloaded: function(evt) {
     *     var ctx = evt.tile.getCanvasContext();
     *     if (ctx) {
     *         var imgd = ctx.getImageData(0, 0, evt.tile.size.w, evt.tile.size.h);
     *         imgd = modify(imgd);
     *         ctx.putImageData(imgd, 0, 0);
     *         evt.tile.drawImgData(ctx.canvas.toDataURL(),evt);
     *     }
     * }});
     * (end)
     *
     * Returns:
     * {Boolean}
     */
    getCanvasContext: function() {
        var m = this.imgDiv || this.lastImage;
        if (SuperMap.Util.supportCanvas() && m && !this.isLoading) {
            if (!this.canvasContext) {
                var canvas = document.createElement("canvas");
                canvas.width = this.size.w;
                canvas.height = this.size.h;
                this.canvasContext = canvas.getContext("2d");
                this.canvasContext.drawImage(m, 0, 0);
            }
            return this.canvasContext;
        }
    },
    
    CLASS_NAME: "SuperMap.Tile"
});
