/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.Control.OverviewMap
 * 鹰眼控件类。
 * 用于控制地图中的鹰眼。
 * 使用鹰眼应注意的是：
 * 1、如果在实例化该鹰眼时传入layers数组，并且layers数组中的对象是使用canvas进行渲染，
 * 请先将鹰眼控件加入map对象中，然后将layer加入map对象中。示例如下:
 * var layer1 = new SuperMap.Layer.TiledDynamicRESTLayer("name",url,null,{useCanvas:true});
 * var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("name",url,null,{useCanvas:true});
 * var map = new SuperMap.Map("map");
 * var ovm = new SuperMap.Control.OverviewMap({layers:[layer1.clone(),layer2.clone()]});
 * map.addControl(ovm);
 * map.addLayers([layer1,layer2]);
 * 2、如果使用canvas渲染，在实例化map对象时没有加入鹰眼控件，而又需要加入鹰眼控件，请使用如下方式：
 * var layer1 = new SuperMap.Layer.TiledDynamicRESTLayer("name",url,null,{useCanvas:true});
 * var map = new SuperMap.Map("map");
 * var ovm = new SuperMap.Control.OverviewMap();
 * map.addControl(ovm);
 * map.addLayers([layer1]);
 * 3、其他情况下如(map对象实例化时传入鹰眼对象或者是使用非canvas渲染)，加入先后次序无关。
 * Inherits from:
 *  - <SuperMap.Control>
 */
SuperMap.Control.OverviewMap = SuperMap.Class(SuperMap.Control, {
    
    /**
     * Property: element
     * {DOMElement} The DOM element that contains the overview map
     */
    element: null,
    
    /**
     * Property: ovmap
     * {<SuperMap.Map>} A reference to the overview map itself.
     */
    ovmap: null,

    /**
     * Property: size
     * {<SuperMap.Size>} 鹰眼地图大小，以pixels为单位。这是地图本身的大小，
     * 其中包含地图上的元素（默认的类名smControlOverviewMapElement）可能通过CSS属性添加有填充或添加其他样式.
     */
    size: {w: 180, h: 180},

    /**
     * APIProperty: layers
     * {Array(<SuperMap.Layer>)} 鹰眼地图上的图层列表，如果构造函数中没有传layer，则使用主图的baselayer。
     */
    layers: null,
    
    /**
     * APIProperty: minRectSize
     * {Integer} 鹰眼范围矩形边框的最小的宽度和高度。默认为8pixels。
     */
    minRectSize: 8,
    
    /**
     * APIProperty: minRectDisplayClass
     * {String} 鹰眼范围矩形边框为minRectSize时，更换范围矩形的风格类名。
     * 此字符串将被添加到displayClass的后缀。默认为RectReplacement.
     *
     * CSS声明示例:
     * (code)
     * .smControlOverviewMapRectReplacement {
     *     overflow: hidden;
     *     cursor:url("../images/cursors/PanDown.cur"),move;
     *     background-image: url("img/overview_replacement.gif");
     *     background-repeat: no-repeat;
     *     background-position: center;
     * }
     * (end)
     */
    minRectDisplayClass: "RectReplacement",

    /**
     * APIProperty: minRatio
     * {Float} 鹰眼地图的分辨率与主地图分辨率的最小比值。
     */
    minRatio: 24,

    /**
     * APIProperty: maxRatio
     * {Float} 鹰眼地图的分辨率与主地图分辨率的最大比值。
     */
    maxRatio: 32,
    
    /**
     * APIProperty: mapOptions
     * {Object} 一个对象，该对象包含了传给鹰眼的map构造函数的非默认选项。
     *     该对象包含的属性应该是主地图map对象构造是传递的非默认选项。
     * 示例:两个(甚至更多)图层叠加，同时鹰眼中也要显示多个叠加图层，代码如下
     * var layer1 = new SuperMap.Layer.TiledDynamicRESTLayer("name",url);
     * var layer2 = new SuperMap.Layer.TiledDynamicRESTLayer("name",url);
     * var map = new SuperMap.Map("map",{allOverlays:true});
     * var ovm = new SuperMap.Control.OverviewMap({layers:[layer1.clone(),layer2.clone()], mapOptions:{allOverlays: true}});
     * map.addControl(ovm);
     * map.addLayers([layer1,layer2]);
     */
    mapOptions: null,

    /**
     * APIProperty: autoPan
     * {Boolean} 自动平移鹰眼中的地图，这样标记范围能够始终保持在中心
     *      位置，默认值是true。当拖拽标记范围时，鹰眼中的地图会自动更新，
     *      这样标记范围能够重返中心位置。
     */
    autoPan: true,
    
    /**
     * Property: handlers
     * {Object}
     */
    handlers: null,

    /**
     * Property: resolutionFactor
     * {Object}
     */
    resolutionFactor: 1,

    /**
     * APIProperty: maximized
     * {Boolean} 鹰眼窗口开始为最大化（可见）。默认值为 true ，若设为false，需要点击一下表示鹰眼的图标才能打开鹰眼。
     */ 
    maximized: true,
    
    /**
     * Constructor: SuperMap.Control.OverviewMap
     * 鹰眼控件构造函数，如：
     * (start code) 
     * var overview = new SuperMap.Control.OverviewMap({maximized: true});
     * (end)
     *      
     * Parameters:
     * options - {Object} 该类开放的属性。
     */
    initialize: function(options) {
        var userstyle = false, 
        imgLocation, img, centered;

        this.layers = [];
        this.handlers = {};
        SuperMap.Control.prototype.initialize.apply(this, [options]);
    },
    
    setMap: function(map) {
        SuperMap.Control.prototype.setMap.apply(this, [map]);
        this.map.events.register("changebaselayer", this, this.baseLayerDraw);
    },
    
    /**
     * Method: updateLayers
     * 切换地图时，更新鹰眼
     */
    updateLayers: function() {
        if(this.map.baseLayer) {
            var lyrs = this.layers;
            for(var i = 0, len = lyrs.length; i < len; i++) {
                this.ovmap.removeLayer(lyrs[i]);
                this.layers.pop();
            }
            var layer = this.map.baseLayer.clone();
            layer.isBaseLayer = true;
            this.layers.push(layer);
            this.ovmap.addLayers(this.layers);
            var me = this;
            setTimeout(function(){
                if(me.map && me.map.getExtent()){
                    me.update();
                    me.redrawAllLayers();
                }
            },0);
            this.ovmap.layerContainerOrigin = null;
            this.ovmap.zoomToMaxExtent();
            //this.update();            
        }
        return false;
    },
    
    /**
     * APIMethod: destroy
     * 解构控件。
     */
    destroy: function() {
        if (!this.mapDiv) { // we've already been destroyed
            return;
        }
        if (this.handlers.click) {
            this.handlers.click.destroy();
        }
        if (this.handlers.drag) {
            this.handlers.drag.destroy();
        }

        this.ovmap && this.ovmap.eventsDiv.removeChild(this.extentRectangle);
        this.extentRectangle = null;

        if (this.rectEvents) {
            this.rectEvents.destroy();
            this.rectEvents = null;
        }

        if (this.ovmap) {
            this.ovmap.destroy();
            this.ovmap = null;
        }
        
        this.element.removeChild(this.mapDiv);
        this.mapDiv = null;

        this.div.removeChild(this.element);
        this.element = null;

        if (this.maximizeDiv) {
            SuperMap.Event.stopObservingElement(this.maximizeDiv);
            this.div.removeChild(this.maximizeDiv);
            this.maximizeDiv = null;
        }
        
        if (this.minimizeDiv) {
            SuperMap.Event.stopObservingElement(this.minimizeDiv);
            this.div.removeChild(this.minimizeDiv);
            this.minimizeDiv = null;
        }

        this.map.events.un({
            "moveend": this.update,
            "changebaselayer": this.baseLayerDraw,
            scope: this
        });

        SuperMap.Control.prototype.destroy.apply(this, arguments);    
    },

    /**
     * Method: draw
     * Render the control in the browser.
     */    
    draw: function(options) {
        SuperMap.Control.prototype.draw.apply(this);
        if(this.ovmap !== null) {
            return this.updateLayers();
        }
        //this.map.events.register("changebaselayer", this, this.baseLayerDraw);
        if(!(this.layers.length > 0)) {
            if (this.map.baseLayer) {
                var layer = this.map.baseLayer.clone();
                layer.isBaseLayer = true;
                this.layers = [layer];
            } else {
                //this.map.events.register("changebaselayer", this, this.baseLayerDraw);
                return this.div;
            }
        }

        //创建鹰眼DOM元素
        if(typeof this.element === "undefined" || this.element === null){
            this.element = document.createElement('div');
            this.element.className = this.displayClass + 'Element';
            this.element.style.display = 'none';

            this.mapDiv = document.createElement('div');
            this.mapDiv.style.width = this.size.w + 'px';
            this.mapDiv.style.height = this.size.h + 'px';
            this.mapDiv.style.position = 'relative';
            this.mapDiv.style.overflow = 'hidden';
            this.mapDiv.id = SuperMap.Util.createUniqueID('overviewMap');
            //当控件样式为白色样式时，改变边框颜色为灰色
            if(SuperMap.Control.SKIN!=="BLUE"){
                this.mapDiv.style.borderTopColor="#9e9e9e";
                this.mapDiv.style.borderLeftColor="#9e9e9e";
                this.element.style.borderTopColor="#9e9e9e";
                this.element.style.borderLeftColor="#9e9e9e";
            }

            this.extentRectangle = document.createElement('div');
            this.extentRectangle.style.position = 'absolute';
            this.extentRectangle.style.zIndex = 1000; 
            this.extentRectangle.className = this.displayClass+'ExtentRectangle';

            this.element.appendChild(this.mapDiv);  

            this.div.appendChild(this.element);

            if(!this.outsideViewport) {
                this.div.className += " " + this.displayClass + 'Container';
                var imgLocation = SuperMap.Util.getImagesLocation();
                var img;
                //最大按钮div
                if(SuperMap.Control.SKIN==="BLUE"){
                    img = imgLocation  +"controlSkinBlue/"+ 'overView.png';
                }
                else{
                    img = imgLocation  +"controlSkinWhite/"+ 'overView.png';
                }
                this.maximizeDiv = SuperMap.Util.createAlphaImageDiv(
                        this.displayClass + 'MaximizeButton', 
                        null, 
                        new SuperMap.Size(15,15), 
                        img, 
                        'absolute');
                this.maximizeDiv.style.display = 'none';
                this.maximizeDiv.className = this.displayClass + 'MaximizeButton';
                SuperMap.Event.observe(this.maximizeDiv, 'click', 
                        SuperMap.Function.bindAsEventListener(this.maximizeControl, this)
                        );
                this.div.appendChild(this.maximizeDiv);

                //最小按钮div
                if(SuperMap.Control.SKIN==="BLUE"){
                    img = imgLocation  +"controlSkinBlue/"+ 'minimize.png';
                }
                else{
                    img = imgLocation  +"controlSkinWhite/"+ 'minimize.png';
                }
                this.minimizeDiv = SuperMap.Util.createAlphaImageDiv(
                        'SuperMap_Control_minimizeDiv', 
                        null, 
                        new SuperMap.Size(15,15), 
                        img, 
                        'absolute');
                this.minimizeDiv.style.display = 'none';
                this.minimizeDiv.className = this.displayClass + 'MinimizeButton';
                SuperMap.Event.observe(this.minimizeDiv, 'click', 
                        SuperMap.Function.bindAsEventListener(this.minimizeControl, this)
                        );
                this.div.appendChild(this.minimizeDiv);

                var eventsToStop = ['dblclick','mousedown'];

                for (var i=0, len=eventsToStop.length; i<len; i++) {

                    SuperMap.Event.observe(this.maximizeDiv, 
                            eventsToStop[i], 
                            SuperMap.Event.stop);

                    SuperMap.Event.observe(this.minimizeDiv,
                            eventsToStop[i], 
                            SuperMap.Event.stop);
                }
        
                this.minimizeControl();
            } else {
                //显示鹰眼
                this.element.style.display = '';
            }
        }
        if(this.map.getExtent()) {
            this.update(options);
        }

        this.map.events.register('moveend', this, this.update);

        if (this.maximized) {
            this.maximizeControl();
        }
        return this.div;
    },
    
    /**
     * Method: baseLayerDraw
     * Draw the base layer - called if unable to complete in the initial draw
     */
    baseLayerDraw: function() {
        this.baseLayerChanged = true;
        this.draw({baseLayerChanged:true});
        //this.map.events.unregister("changebaselayer", this, this.baseLayerDraw);
    },

    /**
     * Method: rectDrag
     * Handle extent rectangle drag
     *
     * Parameters:
     * px - {<SuperMap.Pixel>} The pixel location of the drag.
     */
    rectDrag: function(px) {
        var deltaX = this.handlers.drag.last.x - px.x;
        var deltaY = this.handlers.drag.last.y - px.y;
        if(deltaX !== 0 || deltaY !== 0) {
            var rectTop = this.rectPxBounds.top;
            var rectLeft = this.rectPxBounds.left;
            var rectHeight = Math.abs(this.rectPxBounds.getHeight());
            var rectWidth = this.rectPxBounds.getWidth();
            // don't allow dragging off of parent element
            var newTop = Math.max(0, (rectTop - deltaY));
            newTop = Math.min(newTop,
                              this.ovmap.size.h - this.hComp - rectHeight);
            var newLeft = Math.max(0, (rectLeft - deltaX));
            newLeft = Math.min(newLeft,
                               this.ovmap.size.w - this.wComp - rectWidth);
            this.setRectPxBounds(new SuperMap.Bounds(newLeft,
                                                       newTop + rectHeight,
                                                       newLeft + rectWidth,
                                                       newTop));
        }
    },
    
    /**
     * Method: mapDivClick
     * Handle browser events
     *
     * Parameters:
     * evt - {<SuperMap.Event>} evt
     */
    mapDivClick: function(evt) {
        var pxCenter = this.rectPxBounds.getCenterPixel();
        var deltaX = evt.xy.x - pxCenter.x;
        var deltaY = evt.xy.y - pxCenter.y;
        var top = this.rectPxBounds.top;
        var left = this.rectPxBounds.left;
        var height = Math.abs(this.rectPxBounds.getHeight());
        var width = this.rectPxBounds.getWidth();
        var newTop = Math.max(0, (top + deltaY));
        newTop = Math.min(newTop, this.ovmap.size.h - height);
        var newLeft = Math.max(0, (left + deltaX));
        newLeft = Math.min(newLeft, this.ovmap.size.w - width);
        this.setRectPxBounds(new SuperMap.Bounds(newLeft,
                                                   newTop + height,
                                                   newLeft + width,
                                                   newTop));
        this.updateMapToRect();
    },

    /**
     * Method: maximizeControl
     * Unhide the control.  Called when the control is in the map viewport.
     *
     * Parameters:
     * e - {<SuperMap.Event>}
     */
    maximizeControl: function(e) {
        this.element.style.display = '';
        this.showToggle(false);
        if (e != null) {
            SuperMap.Event.stop(e);                                            
        }
        if(this.map && this.map.getExtent()){
            this.update();
            //ICL-855  关闭鹰眼后，切换底图，打开鹰眼后一片空白的bug
            if(this.baseLayerChanged === true){
                this.baseLayerChanged = false;
                this.redrawAllLayers();
            }
        }
    },

    redrawAllLayers:function(){
        var lyrs = this.layers;
        for(var i = 0, len = lyrs.length; i < len; i++) {
            lyrs[i].redraw();
        }
    },

    /**
     * Method: minimizeControl
     * Hide all the contents of the control, shrink the size, 
     * add the maximize icon
     * 
     * Parameters:
     * e - {<SuperMap.Event>}
     */
    minimizeControl: function(e) {
        this.element.style.display = 'none';
        this.showToggle(true);
        if (e != null) {
            SuperMap.Event.stop(e);                                            
        }
    },

    /**
     * Method: showToggle
     * Hide/Show the toggle depending on whether the control is minimized
     *
     * Parameters:
     * minimize - {Boolean} 
     */
    showToggle: function(minimize) {
        this.maximizeDiv.style.display = minimize ? '' : 'none';
        this.minimizeDiv.style.display = minimize ? 'none' : '';
    },

    /**
     * Method: update
     * Update the overview map after layers move.
     */
    update: function(options) {

        if(this.ovmap == null) {
            if(this.maximized)
            {
                this.createMap();
            }
            else
            {
                //这里做处理主要是为了解决初始化this.maximized=false时会导致createMap有问题，canvas没有宽高等属性
                //最终出不了图
                this.maximized = true;
                this.showToggle(false);
                this.element.style.display = "";
                this.createMap();
                this.maximized = false;
                this.showToggle(true);
                this.element.style.display = "none";
            }
        }
        if(this.maximizeDiv && this.maximizeDiv.style.display !== "none"){
            return;
        }
        if(this.autoPan || !this.isSuitableOverview()) {
            this.updateOverview(options);
        }
        
        // update extent rectangle
        this.updateRectToMap();
    },
    
    /**
     * Method: isSuitableOverview
     * Determines if the overview map is suitable given the extent and
     * resolution of the main map.
     */
    isSuitableOverview: function() {
        var mapExtent = this.map.getExtent();
        var maxExtent = this.map.maxExtent;
        var testExtent = new SuperMap.Bounds(
                                Math.max(mapExtent.left, maxExtent.left),
                                Math.max(mapExtent.bottom, maxExtent.bottom),
                                Math.min(mapExtent.right, maxExtent.right),
                                Math.min(mapExtent.top, maxExtent.top));        

        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            testExtent = testExtent.transform(
                this.map.getProjectionObject(),
                this.ovmap.getProjectionObject() );
        }

        var resRatio = this.ovmap.getResolution() / this.map.getResolution();
        return ((resRatio > this.minRatio) &&
                (resRatio <= this.maxRatio) &&
                (this.ovmap.getExtent().containsBounds(testExtent)));
    },
    
    /**
     * Method updateOverview
     * Called by <update> if <isSuitableOverview> returns true
     */
    updateOverview: function(options) {
        var mapRes = this.map.getResolution();
        var targetRes = this.ovmap.getResolution();
        var resRatio = targetRes / mapRes;
        if(resRatio > this.maxRatio) {
            // zoom in overview map
            targetRes = this.minRatio * mapRes;            
        } else if(resRatio <= this.minRatio) {
            // zoom out overview map
            targetRes = this.maxRatio * mapRes;
        }
        if(!options || !options.baseLayerChanged){
            var center;
            if (this.ovmap.getProjection() !== this.map.getProjection()) {
                center = this.map.center.clone();
                center.transform(this.map.getProjectionObject(),
                    this.ovmap.getProjectionObject() );
            } else {
                center = this.map.center;
            }
            this.ovmap.setCenter(center, this.ovmap.getZoomForResolution(
                targetRes * this.resolutionFactor));
        }
        this.updateRectToMap();
    },
    
    /**
     * Method: createMap
     * Construct the map that this control contains
     */
    createMap: function() {
        // create the overview map
        var options = SuperMap.Util.extend(
                        {controls: [], maxResolution: 'auto', 
                         fallThrough: false}, this.mapOptions);
        this.ovmap = new SuperMap.Map(this.mapDiv, options);
        this.ovmap.eventsDiv.appendChild(this.extentRectangle);
        
        // prevent ovmap from being destroyed when the page unloads, because
        // the OverviewMap control has to do this (and does it).
        SuperMap.Event.stopObserving(window, 'unload', this.ovmap.unloadDestroy);
        
        this.ovmap.addLayers(this.layers);
        this.ovmap.zoomToMaxExtent();
        // check extent rectangle border width
        this.wComp = parseInt(SuperMap.Element.getStyle(this.extentRectangle,
                                               'border-left-width')) +
                     parseInt(SuperMap.Element.getStyle(this.extentRectangle,
                                               'border-right-width'));
        this.wComp = (this.wComp) ? this.wComp : 2;
        this.hComp = parseInt(SuperMap.Element.getStyle(this.extentRectangle,
                                               'border-top-width')) +
                     parseInt(SuperMap.Element.getStyle(this.extentRectangle,
                                               'border-bottom-width'));
        this.hComp = (this.hComp) ? this.hComp : 2;

        this.handlers.drag = new SuperMap.Handler.Drag(
            this, {move: this.rectDrag, done: this.updateMapToRect},
            {map: this.ovmap}
        );
        this.handlers.click = new SuperMap.Handler.Click(
            this, {
                "click": this.mapDivClick
            },{
                "single": true, "double": false,
                "stopSingle": true, "stopDouble": true,
                "pixelTolerance": 1,
                map: this.ovmap
            }
        );
        this.handlers.click.activate();
        
        this.rectEvents = new SuperMap.Events(this, this.extentRectangle,
                                                null, true);
        this.rectEvents.register("mouseover", this, function(e) {
            if(!this.handlers.drag.active && !this.map.dragging) {
                this.handlers.drag.activate();
            }
        });
        this.rectEvents.register("mouseout", this, function(e) {
            if(!this.handlers.drag.dragging) {
                this.handlers.drag.deactivate();
            }
        });

        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            var sourceUnits = this.map.getProjectionObject().getUnits() ||
                this.map.units || this.map.baseLayer.units;
            var targetUnits = this.ovmap.getProjectionObject().getUnits() ||
                this.ovmap.units || this.ovmap.baseLayer.units;
            this.resolutionFactor = sourceUnits && targetUnits ?
                SuperMap.INCHES_PER_UNIT[sourceUnits] /
                SuperMap.INCHES_PER_UNIT[targetUnits] : 1;
        }
    },
        
    /**
     * Method: updateRectToMap
     * Updates the extent rectangle position and size to match the map extent
     */
    updateRectToMap: function() {
        // If the projections differ we need to reproject
        var bounds;
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            bounds = this.map.getExtent().transform(
                this.map.getProjectionObject(), 
                this.ovmap.getProjectionObject() );
        } else {
            bounds = this.map.getExtent();
        }
        var pxBounds = this.getRectBoundsFromMapBounds(bounds);
        if (pxBounds) {
            this.setRectPxBounds(pxBounds);
        }
    },
    
    /**
     * Method: updateMapToRect
     * Updates the map extent to match the extent rectangle position and size
     */
    updateMapToRect: function() {
        var lonLatBounds = this.getMapBoundsFromRectBounds(this.rectPxBounds);
        if (this.ovmap.getProjection() !== this.map.getProjection()) {
            lonLatBounds = lonLatBounds.transform(
                this.ovmap.getProjectionObject(),
                this.map.getProjectionObject() );
        }
        this.map.panTo(lonLatBounds.getCenterLonLat());
    },

    /**
     * Method: setRectPxBounds
     * Set extent rectangle pixel bounds.
     *
     * Parameters:
     * pxBounds - {<SuperMap.Bounds>}
     */
    setRectPxBounds: function(pxBounds) {
        var top = Math.max(pxBounds.top, 0);
        var left = Math.max(pxBounds.left, 0);
        var bottom = Math.min(pxBounds.top + Math.abs(pxBounds.getHeight()),
                              this.ovmap.size.h - this.hComp);
        var right = Math.min(pxBounds.left + pxBounds.getWidth(),
                             this.ovmap.size.w - this.wComp);
        var width = Math.max(right - left, 0);
        var height = Math.max(bottom - top, 0);
        if(width < this.minRectSize || height < this.minRectSize) {
            this.extentRectangle.className = this.displayClass +
                                             this.minRectDisplayClass;
            var rLeft = left + (width / 2) - (this.minRectSize / 2);
            var rTop = top + (height / 2) - (this.minRectSize / 2);
            if(!isNaN(rTop))this.extentRectangle.style.top = Math.round(rTop) + 'px';
            if(!isNaN(rLeft))this.extentRectangle.style.left = Math.round(rLeft) + 'px';
            this.extentRectangle.style.height = this.minRectSize + 'px';
            this.extentRectangle.style.width = this.minRectSize + 'px';
        } else {
            this.extentRectangle.className = this.displayClass +
                                             'ExtentRectangle';
            if(!isNaN(top))this.extentRectangle.style.top = Math.round(top) + 'px';
            if(!isNaN(left))this.extentRectangle.style.left = Math.round(left) + 'px';
            if(!isNaN(height))this.extentRectangle.style.height = Math.round(height) + 'px';
            if(!isNaN(width))this.extentRectangle.style.width = Math.round(width) + 'px';
        }
        this.rectPxBounds = new SuperMap.Bounds(
            Math.round(left), Math.round(bottom),
            Math.round(right), Math.round(top)
        );
    },

    /**
     * Method: getRectBoundsFromMapBounds
     * Get the rect bounds from the map bounds.
     *
     * Parameters:
     * lonLatBounds - {<SuperMap.Bounds>}
     *
     * Returns:
     * {<SuperMap.Bounds>}A bounds which is the passed-in map lon/lat extent
     * translated into pixel bounds for the overview map
     */
    getRectBoundsFromMapBounds: function(lonLatBounds) {
        var leftBottomPx = this.getOverviewPxFromLonLat({
            lon: lonLatBounds.left,
            lat: lonLatBounds.bottom
        });
        var rightTopPx = this.getOverviewPxFromLonLat({
            lon: lonLatBounds.right,
            lat: lonLatBounds.top
        });
        var bounds = null;
        if (leftBottomPx && rightTopPx) {
            bounds = new SuperMap.Bounds(leftBottomPx.x, leftBottomPx.y,
                                           rightTopPx.x, rightTopPx.y);
        }
        return bounds;
    },

    /**
     * Method: getMapBoundsFromRectBounds
     * Get the map bounds from the rect bounds.
     *
     * Parameters:
     * pxBounds - {<SuperMap.Bounds>}
     *
     * Returns:
     * {<SuperMap.Bounds>} Bounds which is the passed-in overview rect bounds
     * translated into lon/lat bounds for the overview map
     */
    getMapBoundsFromRectBounds: function(pxBounds) {
        var leftBottomLonLat = this.getLonLatFromOverviewPx({
            x: pxBounds.left,
            y: pxBounds.bottom
        });
        var rightTopLonLat = this.getLonLatFromOverviewPx({
            x: pxBounds.right,
            y: pxBounds.top
        });
        return new SuperMap.Bounds(leftBottomLonLat.lon, leftBottomLonLat.lat,
                                     rightTopLonLat.lon, rightTopLonLat.lat);
    },

    /**
     * Method: getLonLatFromOverviewPx
     * Get a map location from a pixel location
     *
     * Parameters:
     * overviewMapPx - {<SuperMap.Pixel>|Object} SuperMap.Pixel 对象或者是包含 'x' 与 'y' 属性的对象.
     *
     * Returns:
     * {Object} Location which is the passed-in overview map
     * OpenLayers.Pixel, translated into lon/lat by the overview
     * map. An object with a 'lon' and 'lat' properties.
     */
    getLonLatFromOverviewPx: function(overviewMapPx) {
        var size = this.ovmap.size;
        var res  = this.ovmap.getResolution();
        var center = this.ovmap.getExtent().getCenterLonLat();
    
        var deltaX = overviewMapPx.x - (size.w / 2);
        var deltaY = overviewMapPx.y - (size.h / 2);

        return {
            lon: center.lon + deltaX * res,
            lat: center.lat - deltaY * res
        };
    },

    /**
     * Method: getOverviewPxFromLonLat
     * Get a pixel location from a map location
     *
     * Parameters:
     * lonlat - {<SuperMap.LonLat>|Object} SuperMap.LonLat对象或是包含 'lon' 与 'lat' 属性的对象.
     * Returns:
     * {Object} Location which is the passed-in SuperMap.LonLat, 
     * translated into overview map pixels
     */
    getOverviewPxFromLonLat: function(lonlat) {
        var res  = this.ovmap.getResolution();
        var extent = this.ovmap.getExtent();
        if (extent) {
            return {
                x: Math.round(1/res * (lonlat.lon - extent.left)),
                y: Math.round(1/res * (extent.top - lonlat.lat))
            };
        } 
    },

    CLASS_NAME: 'SuperMap.Control.OverviewMap'
}); 
