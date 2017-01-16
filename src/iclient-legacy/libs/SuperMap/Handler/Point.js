/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Handler.js
 * @requires SuperMap/Geometry/Point.js
 */

/**
 * Class: SuperMap.Handler.Point
 * 在地图上绘制点要素的事件处理器。绘制点在激活后显示，随着鼠标移动而移动，在鼠标松开后完成绘制。
 * 该处理器会触发标记为"done"、"cancel"和“modify"的事件回调。其中modify回调会在每一次变化时被调用并传入最近一次绘制的点。
 * 使用 <SuperMap.Handler.Point> 构造函数可以创建一个新的绘制点的事件处理器实例。
 *
 * Inherits from:
 *  - <SuperMap.Handler>
 */
SuperMap.Handler.Point = SuperMap.Class(SuperMap.Handler, {
    
    /**
     * Property: point
     * {<SuperMap.Feature.Vector>} The currently drawn point
     */
    point: null,

    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>} The temporary drawing layer
     */
    layer: null,
    
    /**
     * APIProperty: multi
     * {Boolean} 在传递事件到图层leyer之前，为多个节点的几何对象创建feature要素实例。默认值是false。
     */
    multi: false,
    
    /**
     * Property: mouseDown
     * {Boolean} The mouse is down
     */
    mouseDown: false,

    /**
     * Property: stoppedDown
     * {Boolean} Indicate whether the last mousedown stopped the event
     * propagation.
     */
    stoppedDown: null,

    /**
     * Property: lastDown
     * {<SuperMap.Pixel>} Location of the last mouse down
     */
    lastDown: null,

    /**
     * Property: lastUp
     * {<SuperMap.Pixel>}
     */
    lastUp: null,

    /**
     * APIProperty: persist
     * {Boolean} 保留呈现的feature要素直到destroyFeature方法被调用。默认为false。
     * 如果设置为true，那么feature会保持呈现，直到handler被设置为无效或者开启另一次绘制的时候调用destroyFeature方法来清除。
     */
    persist: false,

    /**
     * APIProperty: stopDown
     * {Boolean} 停止鼠标mousedown事件的传播。在允许"绘制过程中平移"的时候必须设置为false。默认值为false。
     */
    stopDown: false,

    /**
     * APIPropery: stopUp
     * {Boolean} 停止鼠标事件的传播。在允许"拖拽过程中平移"的时候必须设置为false。默认值为false。
     */
    stopUp: false,

    /**
     * APIProperty: layerOptions
     * {Object} 临时绘制图层的可选属性，可用来设置图层的样式。
     */
    layerOptions: null,
    
    /**
     * APIProperty: pixelTolerance
     * {Number} 绘制点像素容差。绘制点操作所允许的鼠标down和up（包括普通的mousedown、mouseup和touchstart、touchend）
     * 事件之间的最大像素间隔。
     * 如果设置为有效的integer值，则当鼠标down和up之间间隔超过该值时将被忽略，不会添加点要素。默认值是 5。
     */
    pixelTolerance: 5,

    /**
     * Property: touch
     * {Boolean} Indcates the support of touch events.
     */
    touch: false,

    /**
     * Property: lastTouchPx
     * {<SuperMap.Pixel>} The last pixel used to know the distance between
     * two touches (for double touch).
     */
    lastTouchPx: null,

    /**
     * Constructor: SuperMap.Handler.Point
     * 构造函数，创建一个新的绘制点要素的事件处理器。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 构建当前事件处理器的控件对象。
     * callbacks - {Object} 回调函数对象。关于回调的具体描述参见下文。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     *
     * Named callbacks:
     * create - 当要素草图第一次创建的时候调用，回调函数需接收两个参数：当前点几何对象、当前要素。
     * modify - 顶点的每一次变化时调用，回调函数接受参数：几何点对象、当前要素。
     * done - 当绘制点操作完成时调用，回调函数接收一个参数，当前点的几何对象。
     * cancel - 绘制过程中关闭当前事件处理器的监听时调用，回调函数接收当前要素的几何对象作为参数。
     */
    initialize: function(control, callbacks, options) {
        if(!(options && options.layerOptions && options.layerOptions.styleMap)) {
            this.style = SuperMap.Util.extend(SuperMap.Feature.Vector.style['default'], {});
        }

        SuperMap.Handler.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: activate
     * 激活事件处理器对象上的监听处理，如果这个事件处理器对象已经激活，则返回false.
     * 
     * Returns: 
     * {Boolean} 事件处理器对象监听激活成功.
     */
    activate: function() {
        if(!SuperMap.Handler.prototype.activate.apply(this, arguments)) {
            return false;
        }
        // create temporary vector layer for rendering geometry sketch
        // TBD: this could be moved to initialize/destroy - setting visibility here
        var options = SuperMap.Util.extend({
            displayInLayerSwitcher: false,
            // indicate that the temp vector layer will never be out of range
            // without this, resolution properties must be specified at the
            // map-level for this temporary layer to init its resolutions
            // correctly
            calculateInRange: SuperMap.Function.True
        }, this.layerOptions);
        this.layer = new SuperMap.Layer.Vector(this.CLASS_NAME, options);
        this.map.addLayer(this.layer);
        //绘制点时，鼠标样式为箭头
        SuperMap.Element.addClass(
            this.map.viewPortDiv, "smDefault");
        return true;
    },
    
    /**
     * Method: createFeature
     * Add temporary features
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} A pixel location on the map.
     */
    createFeature: function(pixel) {
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel); 
        var geometry = new SuperMap.Geometry.Point(
            lonlat.lon, lonlat.lat
        );
        this.point = new SuperMap.Feature.Vector(geometry);
        this.callback("create", [this.point.geometry, this.point]);
        this.point.geometry.clearBounds();
        this.layer.addFeatures([this.point], {silent: true});
    },

    /**
     * APIMethod: deactivate
     * 关闭事件处理器对象上的监听处理，如果这个事件处理器已经是关闭状态，则返回false
     * 
     * Returns:
     * {Boolean} 事件处理器对象监听已经成功关闭。
     */
    deactivate: function() {
        if(!SuperMap.Handler.prototype.deactivate.apply(this, arguments)) {
            return false;
        }
        this.cancel();
        // If a layer's map property is set to null, it means that that layer
        // isn't added to the map. Since we ourself added the layer to the map
        // in activate(), we can assume that if this.layer.map is null it means
        // that the layer has been destroyed (as a result of map.destroy() for
        // example.
        if (this.layer.map != null) {
            //deactivate后，移除绘制时的鼠标样式
            SuperMap.Element.removeClass(
                this.map.viewPortDiv, "smDefault");
            this.destroyFeature(true);
            this.layer.destroy(false);
        }
        this.layer = null;
        this.touch = false;
        return true;
    },
    
    /**
     * Method: destroyFeature
     * Destroy the temporary geometries
     *
     * Parameters:
     * force - {Boolean} Destroy even if persist is true.
     */
    destroyFeature: function(force) {
        if(this.layer && (force || !this.persist)) {
            this.layer.destroyFeatures();
        }
        this.point = null;
    },

    /**
     * Method: destroyPersistedFeature
     * Destroy the persisted feature.
     */
    destroyPersistedFeature: function() {
        var layer = this.layer;
        if(layer && layer.features.length > 1) {
            this.layer.features[0].destroy();
        }
    },

    /**
     * Method: finalize
     * Finish the geometry and call the "done" callback.
     *
     * Parameters:
     * cancel - {Boolean} Call cancel instead of done callback.  Default
     *          is false.
     */
    finalize: function(cancel) {
        var key = cancel ? "cancel" : "done";
        this.mouseDown = false;
        this.lastDown = null;
        this.lastUp = null;
        this.lastTouchPx = null;
        this.callback(key, [this.geometryClone()]);
        this.destroyFeature(cancel);
    },

    /**
     * APIMethod: cancel
     * 结束绘制操作并且调用cancel回调
     */
    cancel: function() {
        this.finalize(true);
    },

    /**
     * Method: click
     * Handle clicks.  Clicks are stopped from propagating to other listeners
     *     on map.events or other dom elements.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    click: function(evt) {
        SuperMap.Event.stop(evt);
        return false;
    },

    /**
     * Method: dblclick
     * Handle double-clicks.  Double-clicks are stopped from propagating to other
     *     listeners on map.events or other dom elements.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    dblclick: function(evt) {
        SuperMap.Event.stop(evt);
        return false;
    },
    
    /**
     * Method: modifyFeature
     * Modify the existing geometry given a pixel location.
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} A pixel location on the map.
     */
    modifyFeature: function(pixel) {
        if(!this.point) {
            this.createFeature(pixel);
        }
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
        if(this.control.snap){
            lonlat=this.control.snap.beginSnap(lonlat);
        }
        this.point.geometry.x = lonlat.lon;
        this.point.geometry.y = lonlat.lat;
        this.callback("modify", [this.point.geometry, this.point, false]);
        this.point.geometry.clearBounds();
        this.drawFeature();
    },

    /**
     * Method: drawFeature
     * Render features on the temporary layer.
     */
    drawFeature: function() {
        this.layer.drawFeature(this.point, this.style);
    },
    
    /**
     * Method: getGeometry
     * Return the sketch geometry.  If <multi> is true, this will return
     *     a multi-part geometry.
     *
     * Returns:
     * {<SuperMap.Geometry.Point>}
     */
    getGeometry: function() {
        var geometry = this.point && this.point.geometry;
        if(geometry && this.multi) {
            geometry = new SuperMap.Geometry.MultiPoint([geometry]);
        }
        return geometry;
    },

    /**
     * Method: geometryClone
     * Return a clone of the relevant geometry.
     *
     * Returns:
     * {<SuperMap.Geometry>}
     */
    geometryClone: function() {
        var geom = this.getGeometry();
        return geom && geom.clone();
    },

    /**
     * Method: mousedown
     * Handle mousedown.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    mousedown: function(evt) {
        return this.down(evt);
    },

    /**
     * Method: touchstart
     * Handle touchstart.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    touchstart: function(evt) {
        if (!this.touch) {
            this.touch = true;
            // unregister mouse listeners
            this.map.events.un({
                mousedown: this.mousedown,
                mouseup: this.mouseup,
                mousemove: this.mousemove,
                click: this.click,
                dblclick: this.dblclick,
                scope: this
            });
        }
        this.lastTouchPx = evt.xy;
        return this.down(evt);
    },

    /**
     * Method: mousemove
     * Handle mousemove.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    mousemove: function(evt) {
        return this.move(evt);
    },

    /**
     * Method: touchmove
     * Handle touchmove.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    touchmove: function(evt) {
        this.lastTouchPx = evt.xy;
        return this.move(evt);
    },

    /**
     * Method: mouseup
     * Handle mouseup.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    mouseup: function(evt) {
        return this.up(evt);
    },

    /**
     * Method: touchend
     * Handle touchend.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    touchend: function(evt) {
        evt.xy = this.lastTouchPx;
        return this.up(evt);
    },
  
    /**
     * Method: down
     * Handle mousedown and touchstart.  Adjust the geometry and redraw.
     * Return determines whether to propagate the event on the map.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    down: function(evt) {
        this.mouseDown = true;
        this.lastDown = evt.xy;
        if(!this.touch) { // no point displayed until up on touch devices
            this.modifyFeature(evt.xy);
        }
        this.stoppedDown = this.stopDown;
        return !this.stopDown;
    },

    /**
     * Method: move
     * Handle mousemove and touchmove.  Adjust the geometry and redraw.
     * Return determines whether to propagate the event on the map.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    move: function (evt) {
        if(!this.touch // no point displayed until up on touch devices
           && (!this.mouseDown || this.stoppedDown)) {
            this.modifyFeature(evt.xy);
        }
        return true;
    },

    /**
     * Method: up
     * Handle mouseup and touchend.  Send the latest point in the geometry to the control.
     * Return determines whether to propagate the event on the map.
     *
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    up: function (evt) {
        this.mouseDown = false;
        this.stoppedDown = this.stopDown;

        // check keyboard modifiers
        if(!this.checkModifiers(evt)) {
            return true;
        }
        // ignore double-clicks
        if (this.lastUp && this.lastUp.equals(evt.xy)) {
            return true;
        }
        if (this.lastDown && this.passesTolerance(this.lastDown, evt.xy,
                                                  this.pixelTolerance)) {
            if (this.touch) {
                this.modifyFeature(evt.xy);
            }
            if(this.persist) {
                this.destroyPersistedFeature();
            }
            this.lastUp = evt.xy;
            this.finalize();
            return !this.stopUp;
        } else {
            return true;
        }
    },

    /**
     * Method: mouseout
     * Handle mouse out.  For better user experience reset mouseDown
     * and stoppedDown when the mouse leaves the map viewport.
     *
     * Parameters:
     * evt - {Event} The browser event
     */
    mouseout: function(evt) {
        if(SuperMap.Util.mouseLeft(evt, this.map.eventsDiv)) {
            this.stoppedDown = this.stopDown;
            this.mouseDown = false;
        }
    },

    /**
     * Method: passesTolerance
     * Determine whether the event is within the optional pixel tolerance.
     *
     * Returns:
     * {Boolean} The event is within the pixel tolerance (if specified).
     */
    passesTolerance: function(pixel1, pixel2, tolerance) {
        var passes = true;

        if (tolerance != null && pixel1 && pixel2) {
            var dist = pixel1.distanceTo(pixel2);
            if (dist > tolerance) {
                passes = false;
            }
        }
        return passes;
    },
    
    CLASS_NAME: "SuperMap.Handler.Point"
});
