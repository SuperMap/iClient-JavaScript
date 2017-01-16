/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Tile.js
 */

/**
 * Class: SuperMap.Tile.Image
 * 该实例用来管理各种图层上的影像瓦片。使用 <SuperMap.Tile.Image> 来创建
 *     新的影像瓦片。
 *
 * Inherits from:
 *  - <SuperMap.Tile>
 */
SuperMap.Tile.Image = SuperMap.Class(SuperMap.Tile, {

    /** 
     * Property: url
     * {String} The URL of the image being requested. No default. Filled in by
     * layer.getURL() function. 
     */
    url: null,
    
    /** 
     * Property: imgDiv
     * {DOMElement} The div element which wraps the image.
     */
    imgDiv: null,

    /**
     * Property: frame
     * {DOMElement} The image element is appended to the frame.  Any gutter on
     * the image will be hidden behind the frame. 
     */ 
    frame: null, 
    
    /**
     * Property: layerAlphaHack
     * {Boolean} True if the png alpha hack needs to be applied on the layer's div.
     */
    layerAlphaHack: null,
    
    /**
     * Property: isFirstDraw
     * {Boolean} Is this the first time the tile is being drawn?
     *     This is used to force resetBackBuffer to synchronize
     *     the backBufferTile with the foreground tile the first time
     *     the foreground tile loads so that if the user zooms
     *     before the layer has fully loaded, the backBufferTile for
     *     tiles that have been loaded can be used.
     */
    isFirstDraw: true,

    /**
     * Property: _timeoutId
     * {Number} onImageLoad方法里面的timeoutId
     * */
    _timeoutId:null,
    
    /**
     * APIProperty: maxGetUrlLength
     * {Number} 设置了该值以后，GET请求的url字符长度大于该值的将使用
     *      HTTP POST来发送请求。通常限制url字符不要超过2048是比较好的实
     *      践。
     *
     *
     * Caution:
     * 老版本的基于Gecko的浏览器（例如 Firefox < 3.5）和 Opera < 10.0 ，不能
     *     完全支持该选项。
     *
     * Note:
     * 不要将这个选项应用于transitionEffect配置后的图层——因为这样通过POST请
     *     求返回的IFrame瓦片不能够被从新定义大小。
     */
    maxGetUrlLength: null,
    
    /** TBD 3.0 - reorder the parameters to the init function to remove 
     *             URL. the getUrl() function on the layer gets called on 
     *             each draw(), so no need to specify it here.
     * 
     * Constructor: SuperMap.Tile.Image
     * 用于实例化新的 <SuperMap.Tile.Image> 的构造器。
     * 
     * Parameters:
     * layer - {<SuperMap.Layer>} 瓦片存放的图层。
     * position - {<SuperMap.Pixel>}
     * bounds - {<SuperMap.Bounds>}
     * url - {<String>} Deprecated. Remove me in 3.0.
     * size - {<SuperMap.Size>}
     * options - {Object}
     */   
    initialize: function(layer, position, bounds, url, size, options) {
        SuperMap.Tile.prototype.initialize.apply(this, arguments);

        if (this.maxGetUrlLength != null) {
            SuperMap.Util.extend(this, SuperMap.Tile.Image.IFrame);
        }

        this.url = url; //deprecated remove me
        
        this.frame = document.createElement('div'); 
        this.frame.style.overflow = 'hidden'; 
        this.frame.style.position = 'absolute'; 

        this.layerAlphaHack = this.layer.alpha && SuperMap.Util.alphaHack();
    },

    /** 
     * APIMethod: destroy
     * 取消引用来防止循环引用和内存泄漏。
     */
    destroy: function() {
        if (this.imgDiv != null)  {
            this.removeImgDiv();
        }
        this.imgDiv = null;
        if ((this.frame != null) && (this.frame.parentNode === this.layer.div)) {
            this.layer.div.removeChild(this.frame); 
        }
        this.frame = null; 
        
        /* clean up the backBufferTile if it exists */
//        if (this.backBufferTile) {
//            this.backBufferTile.destroy();
//            this.backBufferTile = null;
//        }
        
        //this.layer.events.unregister("loadend", this, this.resetBackBuffer);
        this.layer.events.unregister("loadend", this, this.showTile);
        this._timeoutId&&window.clearTimeout(this._timeoutId);
        SuperMap.Tile.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: clone
     *
     * Parameters:
     * obj - {<SuperMap.Tile.Image>} The tile to be cloned
     *
     * Returns:
     * {<SuperMap.Tile.Image>} An exact clone of this <SuperMap.Tile.Image>
     */
    clone: function (obj) {
        if (obj == null) {
            obj = new SuperMap.Tile.Image(this.layer, 
                                            this.position, 
                                            this.bounds, 
                                            this.url, 
                                            this.size);        
        } 
        
        //pick up properties from superclass
        obj = SuperMap.Tile.prototype.clone.apply(this, [obj]);
        
        //dont want to directly copy the image div
        obj.imgDiv = null;
            
        
        return obj;
    },
    
    /**
     * Method: draw
     * Check that a tile should be drawn, and draw it.
     * 
     * Returns:
     * {Boolean} Always returns true.
     */
    draw: function() {
        if (this.layer !== this.layer.map.baseLayer && this.layer.reproject) {
            this.bounds = this.getBoundsFromBaseLayer(this.position);
        }
        var drawTile = SuperMap.Tile.prototype.draw.apply(this, arguments);
        
        if ((SuperMap.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, this.layer.transitionEffect) !== -1) ||
            this.layer.singleTile) {
            if (drawTile&& this.isFirstDraw) {
                  this.events.register('loadend', this, this.showTile);//newmodify
                  this.layer.events.register("loadend", this, this.showTile);//newmodify
                this.isFirstDraw = false;
                //we use a clone of this tile to create a double buffer for visual
                //continuity.  The backBufferTile is used to create transition
                //effects while the tile in the grid is repositioned and redrawn
//                if (!this.backBufferTile) {
//                    this.backBufferTile = this.clone();
//                    this.backBufferTile.hide();
//                    // this is important.  It allows the backBuffer to place itself
//                    // appropriately in the DOM.  The Image subclass needs to put
//                    // the backBufferTile behind the main tile so the tiles can
//                    // load over top and display as soon as they are loaded.
//                    this.backBufferTile.isBackBuffer = true;
//                    
//                    // potentially end any transition effects when the tile loads
//                    this.events.register('loadend', this, this.resetBackBuffer);
//                    
//                    // clear transition back buffer tile only after all tiles in
//                    // this layer have loaded to avoid visual glitches
//                    this.layer.events.register("loadend", this, this.resetBackBuffer);
//                }
                // run any transition effects
                //this.startTransition();
            } else {
                // if we aren't going to draw the tile, then the backBuffer should
                // be hidden too!
//                if (this.backBufferTile) {
//                    this.backBufferTile.clear();
//                }
            }
        } else {
            if (drawTile && this.isFirstDraw) {
                this.events.register('loadend', this, this.showTile);
                this.isFirstDraw = false;
            }   
        }    
        
        if (!drawTile) {
            return false;
        }
        
        if (this.isLoading) {
            //if we're already loading, send 'reload' instead of 'loadstart'.
            this.events.triggerEvent("reload"); 
        } else {
            this.isLoading = true;
            this.events.triggerEvent("loadstart");
        }
        
        return this.renderTile();
    },
    
    /**
     * Method: renderTile
     * Internal function to actually initialize the image tile,
     *     position it correctly, and set its url.
     */
    renderTile: function() {
        //if (this.layer.async) {
            //this.initImgDiv();
            // Asyncronous image requests call the asynchronous getURL method
            // on the layer to fetch an image that covers 'this.bounds', in the scope of
            // 'this', setting the 'url' property of the layer itself, and running
            // the callback 'positionFrame' when the image request returns.
            //this.layer.getURLasync(this.bounds, this, "url", this.positionImage);
        //} else {
            // syncronous image requests get the url and position the frame immediately,
            // and don't wait for an image request to come back.
          
            this.url = this.layer.getURL(this.bounds);
            this.events.triggerEvent(this._loadEvent);

            this.initImgDiv();
          
            // position the frame immediately
            this.positionImage(); 
        //}
        return true;
    },

    /**
     * Method: positionImage
     * Using the properties currenty set on the layer, position the tile correctly.
     * This method is used both by the async and non-async versions of the Tile.Image
     * code.
     */
     positionImage: function() {
        // if the this layer doesn't exist at the point the image is
        // returned, do not attempt to use it for size computation
        if (this.layer === null) {
            return;
        }
        // position the frame 
        SuperMap.Util.modifyDOMElement(this.frame, 
                                          null, this.position, this.size);
        this.imgDiv.style.opacity = 0;
//        var onload = function(me){
//            return function(){
//                me.onImageLoad();
//            }
//        }(this);
//        //SuperMap.Event.observe(this.imgDiv, "onload", SuperMap.Function.bindAsEventListener(this.onImageLoad, this.imgDiv));
//        if(this.imgDiv.readyState){
//            this.imgDiv.onreadystatechange = function(me,onload){
//                return function(){
//                    if(me.imgDiv.readyState == "loaded" || me.imgDiv.readyState == "complete"){
//                        me.imgDiv.onreadystatechange = null;
//                        onload();
//                    }
//                }
//            }(this,onload)
//        }
//        else{
//            this.imgDiv.onload = onload;
//        }
        var imageSize = this.layer.getImageSize(this.bounds); 
        if (this.layerAlphaHack) {
            SuperMap.Util.modifyAlphaImageDiv(this.imgDiv,
                    null, null, imageSize, this.url);
        } else {
            SuperMap.Util.modifyDOMElement(this.imgDiv,
                    null, null, imageSize) ;
            //如果url一样，直接绘制，不用发请求
            if(this.imgDiv.src === this.url)
            {
                this.onImageLoad();
            }
            else
            {
                //跨域请求瓦片，暂时只支持非重定向的SUPERMAP_REST服务的地图
                if(this.layer.useCORS&&!SuperMap.Util.isInTheSameDomain(this.url)&&(this.url.indexOf("redirect=true")<0)&&((SuperMap.Layer.SimpleCachedLayer && this.layer instanceof SuperMap.Layer.SimpleCachedLayer)||
                    (SuperMap.Layer.TiledDynamicRESTLayer && this.layer instanceof SuperMap.Layer.TiledDynamicRESTLayer))){
                    this.imgDiv.crossOrigin="anonymous";
                }
                this.imgDiv.src = this.url;
            }
        }
     },

     /**
     * Method: onImageLoad
     * Handler for the image onload event
     */
     onImageLoad: function() {
         var img = this.imgDiv;
         //img.style.opacity = 0;
         //SuperMap.Event.stopObservingElement(img);
         //img.onload = null;
         this.canvasContext = null;
         img.style.visibility = 'inherit';
         img.style.opacity = 0;
         this.events.triggerEvent("loadend");
         this._timeoutId=window.setTimeout(function(me){
             return function(){
                var o = me.layer.opacity;
                img.style.opacity = (o||o==0)?o:1;
             }
         }(this),10);
     },

    /** 
     * Method: clear
     *  Clear the tile of any bounds/position-related data so that it can 
     *   be reused in a new location.
     */
    clear: function() {
        if(this.imgDiv) {
            this.hide();
            if (SuperMap.Tile.Image.useBlankTile) {
                this.imgDiv.src = SuperMap.Util.getImagesLocation() + "blank.gif";
            }    
        }
        this.canvasContext = null;
    },

    /**
     * Method: initImgDiv
     * Creates the imgDiv property on the tile.
     */
    initImgDiv: function() {
        if (this.imgDiv == null) {
            var offset = this.layer.imageOffset; 
            var size = this.layer.getImageSize(this.bounds); 

            if (this.layerAlphaHack) {
                this.imgDiv = SuperMap.Util.createAlphaImageDiv(null,
                                                               offset,
                                                               size,
                                                               null,
                                                               "relative",
                                                               null,
                                                               null,
                                                               null,
                                                               true);
            } else {
                this.imgDiv = SuperMap.Util.createImage(null,
                                                          offset,
                                                          size,
                                                          null,
                                                          "relative",
                                                          null,
                                                          null,
                                                          true);
            }

            // needed for changing to a different server for onload error
            if (SuperMap.Util.isArray(this.layer.url)) {
                this.imgDiv.urls = this.layer.url.slice();
            }
      
            this.imgDiv.className = 'smTileImage';

            /* checkImgURL used to be used to called as a work around, but it
               ended up hiding problems instead of solving them and broke things
               like relative URLs. See discussion on the dev list:
               http://SuperMap.org/pipermail/dev/2007-January/000205.html

            SuperMap.Event.observe( this.imgDiv, "load",
                SuperMap.Function.bind(this.checkImgURL, this) );
            */
            this.frame.style.zIndex = this.isBackBuffer ? 0 : 1;
            this.frame.appendChild(this.imgDiv); 
            this.layer.div.appendChild(this.frame); 

            if(this.layer.opacity != null) {

                SuperMap.Util.modifyDOMElement(this.imgDiv, null, null, null,
                                                 null, null, null, 
                                                 this.layer.opacity);
            }

            // we need this reference to check back the viewRequestID
            this.imgDiv.map = this.layer.map;

            //bind a listener to the onload of the image div so that we 
            // can register when a tile has finished loading.
            var onload = function() {

                //normally isLoading should always be true here but there are some 
                // right funky conditions where loading and then reloading a tile
                // with the same url *really*fast*. this check prevents sending 
                // a 'loadend' if the msg has already been sent
                //
                if (this.isLoading) { 
                    this.isLoading = false; 
                    //this.events.triggerEvent("loadend");
                    this.onImageLoad();
                }
            };

            if (this.layerAlphaHack) { 
                SuperMap.Event.observe(this.imgDiv.childNodes[0], 'load', 
                                         SuperMap.Function.bind(onload, this));    
            } else { 
                SuperMap.Event.observe(this.imgDiv, 'load', 
                                     SuperMap.Function.bind(onload, this)); 
            } 


            // Bind a listener to the onerror of the image div so that we
            // can registere when a tile has finished loading with errors.
            var onerror = function() {

                // If we have gone through all image reload attempts, it is time
                // to realize that we are done with this image. Since
                // SuperMap.Util.onImageLoadError already has taken care about
                // the error, we can continue as if the image was loaded
                // successfully.
                if (this.imgDiv._attempts > SuperMap.IMAGE_RELOAD_ATTEMPTS) {
                    onload.call(this);
                }
            };
            SuperMap.Event.observe(this.imgDiv, "error",
                                     SuperMap.Function.bind(onerror, this));
        }
        
        this.imgDiv.viewRequestID = this.layer.map.viewRequestID;
    },

    /**
     * APIMethod: drawImgData
     *
     * 重新绘制进行像素操作后的imgdata
     *
     * Parameters:
     * imgData - {<String>} canvas.toDataURL()得到的图片字符串
     */
    drawImgData:function(imgData){
        this.imgDiv.removeAttribute("crossorigin");
        this.imgDiv.src = imgData;
    },

    /**
     * Method: removeImgDiv
     * Removes the imgDiv from the DOM and stops listening to events on it.
     */
    removeImgDiv: function() {
        // unregister the "load" and "error" handlers. Only the "error" handler if
        // this.layerAlphaHack is true.
        SuperMap.Event.stopObservingElement(this.imgDiv);
        
        if (this.imgDiv.parentNode === this.frame) {
            this.frame.removeChild(this.imgDiv);
            this.imgDiv.map = null;
        }
        this.imgDiv.urls = null;

        var child = this.imgDiv.firstChild;
        //check for children (alphaHack img or IFrame)
        if (child) {
            SuperMap.Event.stopObservingElement(child);
            this.imgDiv.removeChild(child);
            delete child;
        } else {
            // abort any currently loading image
            this.imgDiv.src = SuperMap.Util.getImagesLocation() + "blank.gif";
        }
    },

    /**
     * Method: checkImgURL
     * Make sure that the image that just loaded is the one this tile is meant
     * to display, since panning/zooming might have changed the tile's URL in
     * the meantime. If the tile URL did change before the image loaded, set
     * the imgDiv display to 'none', as either (a) it will be reset to visible
     * when the new URL loads in the image, or (b) we don't want to display
     * this tile after all because its new bounds are outside our maxExtent.
     * 
     * This function should no longer  be neccesary with the improvements to
     * Grid.js in SuperMap 2.3. The lack of a good isEquivilantURL function
     * caused problems in 2.2, but it's possible that with the improved 
     * isEquivilant URL function, this might be neccesary at some point.
     * 
     * See discussion in the thread at 
     * http://SuperMap.org/pipermail/dev/2007-January/000205.html
     */
    checkImgURL: function () {
        // Sometimes our image will load after it has already been removed
        // from the map, in which case this check is not needed.  
        if (this.layer) {
            var loaded = this.layerAlphaHack ? this.imgDiv.firstChild.src : this.imgDiv.src;
            if (!SuperMap.Util.isEquivalentUrl(loaded, this.url)) {
                this.hide();
            }
        }
    },
    

    
    /** 
     * Method: show
     * Show the tile by showing its frame.
     */
    show: function() {
        this.frame.style.display = '';
        // Force a reflow on gecko based browsers to actually show the element
        // before continuing execution.
        if (SuperMap.Util.indexOf(this.layer.SUPPORTED_TRANSITIONS, 
                this.layer.transitionEffect) !== -1) {
            if (SuperMap.IS_GECKO === true) { 
                this.frame.scrollLeft = this.frame.scrollLeft; 
            } 
        }
    },
    
    /** 
     * Method: hide
     * Hide the tile by hiding its frame.
     */
    hide: function() {
        this.frame.style.display = 'none';
    },
    
    /**
     * Method: createBackBuffer
     * Create a backbuffer for this tile. A backbuffer isn't exactly a clone
     * of the tile's markup, because we want to avoid the reloading of the
     * image. So we clone the frame, and steal the image from the tile.
     *
     * Returns:
     * {DOMElement} The markup, or undefined if the tile has no image
     * or if it's currently loading.
     */
    createBackBuffer: function() {
        if (!this.imgDiv || this.isLoading) {
            return;
        }
        var backBuffer;
        if (this.frame) {
            //backBuffer = this.frame.cloneNode(false);
            //backBuffer.appendChild(this.imgDiv);
            
            var temp = this.frame.cloneNode(false);
            backBuffer = this.imgDiv;
            backBuffer.style.position = "absolute";
            backBuffer.style.left = temp.style.left.replace(/px/,"%");
            backBuffer.style.right = temp.style.right.replace(/px/,"%");
            backBuffer.style.width = temp.style.width.replace(/px/,"%");
            backBuffer.style.height = temp.style.height.replace(/px/,"%");
        } else {
            backBuffer = this.imgDiv;
        }
        this.imgDiv = null;
        return backBuffer;
    },
    
    CLASS_NAME: "SuperMap.Tile.Image"
  }
);

SuperMap.Tile.Image.useBlankTile = ( 
    SuperMap.Browser.name === "safari" ||
    SuperMap.Browser.name === "opera");
