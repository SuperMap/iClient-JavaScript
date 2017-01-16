/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Handler/Point.js
 * @requires SuperMap/Geometry/Point.js
 * @requires SuperMap/Geometry/LineString.js
 */

/**
 * Class: SuperMap.Handler.Path
 * 地图上绘制路径的控制事件处理器。当按下鼠标后路径开始显示，随着鼠标移动而变化，当松开鼠标时完成。
 *
 * Inherits from:
 *  - <SuperMap.Handler.Point>
 */
SuperMap.Handler.Path = SuperMap.Class(SuperMap.Handler.Point, {
    
    /**
     * Property: line
     * {<SuperMap.Feature.Vector>}
     */
    line: null,

    /**
     * APIProperty: maxVertices
     * {Number} 当前handler所能绘制路径的最大顶点数。如果当前路径顶点数达到限制值，则路径绘制自动完成。
     * 未设置有效值时该属性不起作用。默认值为 null。
     */
    maxVertices: null,

    /**
     * Property: doubleTouchTolerance
     * {Number} Maximum number of pixels between two touches for
     *     the gesture to be considered a "finalize feature" action.
     *     Default is 20.
     */
    doubleTouchTolerance: 20,

    /**
     * Property: freehand
     * {Boolean} In freehand mode, the handler starts the path on mouse down,
     * adds a point for every mouse move, and finishes the path on mouse up.
     * Outside of freehand mode, a point is added to the path on every mouse
     * click and double-click finishes the path.
     */
    freehand: false,
    
    /**
     * Property: freehandToggle
     * {String} If set, freehandToggle is checked on mouse events and will set
     * the freehand mode to the opposite of this.freehand.  To disallow
     * toggling between freehand and non-freehand mode, set freehandToggle to
     * null.  Acceptable toggle values are 'shiftKey', 'ctrlKey', and 'altKey'.
     */
    freehandToggle: 'shiftKey',

    /**
     * Property: timerId
     * {Integer} The timer used to test the double touch.
     */
    timerId: null,

    /**
     * Property: redoStack
     * {Array} Stack containing points removed with <undo>.
     */
    redoStack: null,

    /**
     * Constructor: SuperMap.Handler.Path
     * 构造函数。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 控件对象
     * callbacks - {Object} 回调函数对象。关于回调的具体描述参见下文。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     *
     * Named callbacks:
     * create - 当路径要素第一次创建的时候调用，回调函数需接收两个参数：当前几何点对象、当前路径要素。
     * modify - 顶点的每一次变化时调用，回调函数接受参数：几何点对象、当前路径要素。
     * point - 当每一个点被添加时调用，回调函数接收点的几何对象作为参数。
     * done - 当绘制操作完成时调用，回调函数接收一个参数——当前路径要素的几何线对象。
     * cancel - 绘制过程中关闭当前事件处理器的监听时调用，回调函数接收当前要素的几何对象作为参数。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.Point.prototype.initialize.apply(this, arguments);
    },
        
    /**
     * Method: createFeature
     * Add temporary geometries
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} The initial pixel location for the new
     *     feature.
     */
    createFeature: function(pixel) {
        var lonlat = this.map.getLonLatFromPixel(pixel);
        var geometry = new SuperMap.Geometry.Point(
            lonlat.lon, lonlat.lat
        );
        this.point = new SuperMap.Feature.Vector(geometry);
        this.line = new SuperMap.Feature.Vector(
            new SuperMap.Geometry.LineString([this.point.geometry])
        );
        this.callback("create", [this.point.geometry, this.getSketch()]);
        this.point.geometry.clearBounds();
        this.layer.addFeatures([this.line, this.point], {silent: true});
    },
        
    /**
     * Method: destroyFeature
     * Destroy temporary geometries
     *
     * Parameters:
     * force - {Boolean} Destroy even if persist is true.
     */
    destroyFeature: function(force) {
        SuperMap.Handler.Point.prototype.destroyFeature.call(
            this, force);
        this.line = null;
    },

    /**
     * Method: destroyPersistedFeature
     * Destroy the persisted feature.
     */
    destroyPersistedFeature: function() {
        var layer = this.layer;
        if(layer && layer.features.length > 2) {
            this.layer.features[0].destroy();
        }
    },

    /**
     * Method: removePoint
     * Destroy the temporary point.
     */
    removePoint: function() {
        if(this.point) {
            this.layer.removeFeatures([this.point]);
        }
    },
    
    /**
     * Method: addPoint
     * Add point to geometry.  Send the point index to override
     * the behavior of LinearRing that disregards adding duplicate points.
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} The pixel location for the new point.
     */
    addPoint: function(pixel) {
        this.layer.removeFeatures([this.point]);
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
        if(this.control.snap){
            lonlat=this.control.snap.beginSnap(lonlat);
        }
        this.point = new SuperMap.Feature.Vector(
            new SuperMap.Geometry.Point(lonlat.lon, lonlat.lat)
        );
        this.line.geometry.addComponent(
            this.point.geometry, this.line.geometry.components.length
        );
        this.layer.addFeatures([this.point]);
        this.callback("point", [this.point.geometry, this.getGeometry()]);
        this.callback("modify", [this.point.geometry, this.getSketch()]);
        this.drawFeature();
        delete this.redoStack;
    },
    
    /**
     * Method: insertXY
     * Insert a point in the current sketch given x & y coordinates.  The new
     *     point is inserted immediately before the most recently drawn point.
     *
     * Parameters:
     * x - {Number} The x-coordinate of the point.
     * y - {Number} The y-coordinate of the point.
     */
    insertXY: function(x, y) {
        this.line.geometry.addComponent(
            new SuperMap.Geometry.Point(x, y), 
            this.getCurrentPointIndex()
        );
        this.drawFeature();
        delete this.redoStack;
    },

    /**
     * Method: insertDeltaXY
     * Insert a point given offsets from the previously inserted point.
     *
     * Parameters:
     * dx - {Number} The x-coordinate offset of the point.
     * dy - {Number} The y-coordinate offset of the point.
     */
    insertDeltaXY: function(dx, dy) {
        var previousIndex = this.getCurrentPointIndex() - 1;
        var p0 = this.line.geometry.components[previousIndex];
        if (p0 && !isNaN(p0.x) && !isNaN(p0.y)) {
            this.insertXY(p0.x + dx, p0.y + dy);
        }
    },

    /**
     * Method: insertDirectionLength
     * Insert a point in the current sketch given a direction and a length.
     *
     * Parameters:
     * direction - {Number} Degrees clockwise from the positive x-axis.
     * length - {Number} Distance from the previously drawn point.
     */
    insertDirectionLength: function(direction, length) {
        direction *= Math.PI / 180;
        var dx = length * Math.cos(direction);
        var dy = length * Math.sin(direction);
        this.insertDeltaXY(dx, dy);
    },

    /**
     * Method: insertDeflectionLength
     * Insert a point in the current sketch given a deflection and a length.
     *     The deflection should be degrees clockwise from the previously 
     *     digitized segment.
     *
     * Parameters:
     * deflection - {Number} Degrees clockwise from the previous segment.
     * length - {Number} Distance from the previously drawn point.
     */
    insertDeflectionLength: function(deflection, length) {
        var previousIndex = this.getCurrentPointIndex() - 1;
        if (previousIndex > 0) {
            var p1 = this.line.geometry.components[previousIndex];
            var p0 = this.line.geometry.components[previousIndex-1];
            var theta = Math.atan2(p1.y - p0.y, p1.x - p0.x);
            this.insertDirectionLength(
                (theta * 180 / Math.PI) + deflection, length
            );
        }
    },

    /**
     * Method: getCurrentPointIndex
     * 
     * Returns:
     * {Number} The index of the most recently drawn point.
     */
    getCurrentPointIndex: function() {
        return this.line.geometry.components.length - 1;
    },
    
    
    /**
     * Method: undo
     * Remove the most recently added point in the sketch geometry.
     *
     * Returns: 
     * {Boolean} A point was removed.
     */
    undo: function() {
        var geometry = this.line.geometry;
        var components = geometry.components;
        var index = this.getCurrentPointIndex() - 1;
        var target = components[index];
        var undone = geometry.removeComponent(target);
        if (undone) {
            if (!this.redoStack) {
                this.redoStack = [];
            }
            this.redoStack.push(target);
            this.drawFeature();
        }
        return undone;
    },
    
    /**
     * Method: redo
     * Reinsert the most recently removed point resulting from an <undo> call.
     *     The undo stack is deleted whenever a point is added by other means.
     *
     * Returns: 
     * {Boolean} A point was added.
     */
    redo: function() {
        var target = this.redoStack && this.redoStack.pop();
        if (target) {
            this.line.geometry.addComponent(target, this.getCurrentPointIndex());
            this.drawFeature();
        }
        return !!target;
    },
    
    /**
     * Method: freehandMode
     * Determine whether to behave in freehand mode or not.
     *
     * Returns:
     * {Boolean}
     */
    freehandMode: function(evt) {
        return (this.freehandToggle && evt[this.freehandToggle]) ?
                    !this.freehand : this.freehand;
    },

    /**
     * Method: modifyFeature
     * Modify the existing geometry given the new point
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} The updated pixel location for the latest
     *     point.
     * drawing - {Boolean} Indicate if we're currently drawing.
     */
    modifyFeature: function(pixel, drawing) {
        if(!this.line) {
            this.createFeature(pixel);
        }
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
        if(this.control.snap){
            lonlat=this.control.snap.beginSnap(lonlat);
        }
        this.point.geometry.x = lonlat.lon;
        this.point.geometry.y = lonlat.lat;
        this.callback("modify", [this.point.geometry, this.getSketch(), drawing]);
        this.point.geometry.clearBounds();
        this.drawFeature();
    },

    /**
     * Method: drawFeature
     * Render geometries on the temporary layer.
     */
    drawFeature: function() {
        this.layer.drawFeature(this.line, this.style);
        this.layer.drawFeature(this.point, this.style);
    },

    /**
     * Method: getSketch
     * Return the sketch feature.
     *
     * Returns:
     * {<SuperMap.Feature.Vector>}
     */
    getSketch: function() {
        return this.line;
    },

    /**
     * Method: getGeometry
     * Return the sketch geometry.  If <multi> is true, this will return
     *     a multi-part geometry.
     *
     * Returns:
     * {<SuperMap.Geometry.LineString>}
     */
    getGeometry: function() {
        var geometry = this.line && this.line.geometry;
        if(geometry && this.multi) {
            geometry = new SuperMap.Geometry.MultiLineString([geometry]);
        }
        return geometry;
    },

    /**
     * method: touchstart
     * handle touchstart.
     *
     * parameters:
     * evt - {event} the browser event
     *
     * returns:
     * {boolean} allow event propagation
     */
    touchstart: function(evt) {
        if (this.timerId &&
            this.passesTolerance(this.lastTouchPx, evt.xy,
                                 this.doubleTouchTolerance)) {
            // double-tap, finalize the geometry
            this.finishGeometry();
            window.clearTimeout(this.timerId);
            this.timerId = null;
            return false;
        } else {
            if (this.timerId) {
                window.clearTimeout(this.timerId);
                this.timerId = null;
            }
            this.timerId = window.setTimeout(
                SuperMap.Function.bind(function() {
                    this.timerId = null;
                }, this), 300);
            return SuperMap.Handler.Point.prototype.touchstart.call(this, evt);
        }
    },

    /**
     * Method: down
     * Handle mousedown and touchstart.  Add a new point to the geometry and
     * render it. Return determines whether to propagate the event on the map.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    down: function(evt) {
        var stopDown = this.stopDown;
        if(this.freehandMode(evt)) {
            stopDown = true;
            if (this.touch) {
                this.modifyFeature(evt.xy, !!this.lastUp);
                SuperMap.Event.stop(evt);
            }
        }
        if (!this.touch && (!this.lastDown ||
                            !this.passesTolerance(this.lastDown, evt.xy,
                                                  this.pixelTolerance))) {
            this.modifyFeature(evt.xy, !!this.lastUp);
        }
        this.mouseDown = true;
        this.lastDown = evt.xy;
        this.stoppedDown = stopDown;
        return !stopDown;
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
        if(this.stoppedDown && this.freehandMode(evt)) {
            if(this.persist) {
                this.destroyPersistedFeature();
            }
            if(this.maxVertices && this.line &&
                    this.line.geometry.components.length === this.maxVertices) {
                this.removePoint();
                this.finalize();
            } else {
            this.addPoint(evt.xy);
            }
            return false;
        }
        if (!this.touch && (!this.mouseDown || this.stoppedDown)) {
            this.modifyFeature(evt.xy, !!this.lastUp);
        }
        return true;
    },
    
    /**
     * Method: up
     * Handle mouseup and touchend.  Send the latest point in the geometry to
     * the control. Return determines whether to propagate the event on the map.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    up: function (evt) {
        if (this.mouseDown && (!this.lastUp || !this.lastUp.equals(evt.xy))) {
            if(this.stoppedDown && this.freehandMode(evt)) {
                if (this.persist) {
                    this.destroyPersistedFeature();
                }
                this.removePoint();
                this.finalize();
            } else {
                if (this.passesTolerance(this.lastDown, evt.xy,
                                         this.pixelTolerance)) {
                    if (this.touch) {
                        this.modifyFeature(evt.xy);
                    }
                    if(this.lastUp == null && this.persist) {
                        this.destroyPersistedFeature();
                    }
                    this.addPoint(evt.xy);
                    this.lastUp = evt.xy;
                    if(this.line.geometry.components.length === this.maxVertices + 1) {
                        this.finishGeometry();
                    }
                }
            }
        }
        this.stoppedDown = this.stopDown;
        this.mouseDown = false;
        return !this.stopUp;
    },

    /**
     * APIMethod: finishGeometry
     * 完成几何对象绘制并将它发送给控件。
     */
    finishGeometry: function() {
        var index = this.line.geometry.components.length - 1;
        this.line.geometry.removeComponent(this.line.geometry.components[index]);
        this.removePoint();
        this.finalize();
    },
  
    /**
     * Method: dblclick 
     * Handle double-clicks.
     * 
     * Parameters:
     * evt - {Event} The browser event
     *
     * Returns: 
     * {Boolean} Allow event propagation
     */
    dblclick: function(evt) {
        if(!this.freehandMode(evt)) {
            this.finishGeometry();
        }
        return false;
    },

    CLASS_NAME: "SuperMap.Handler.Path"
});
