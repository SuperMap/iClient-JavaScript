/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Handler/Path.js
 * @requires SuperMap/Geometry/Polygon.js
 */

/**
 * Class: SuperMap.Handler.Polygon
 * 地图上绘制多边形的事件处理器。多边形在鼠标按下时开始显示，随着鼠标移动而发生变化，最后再松开鼠标的时候完成绘制。
 *
 * Inherits from:
 *  - <SuperMap.Handler.Path>
 *  - <SuperMap.Handler>
 */
SuperMap.Handler.Polygon = SuperMap.Class(SuperMap.Handler.Path, {
    
    /** 
     * APIProperty: holeModifier
     * {String} 触发能够绘制岛洞多边形的功能键，按住此键同时在已有矢量多
     * 边形上绘制多边形，即可绘制岛洞多边形，允许设置"altKey"、"shiftKey"、"ctrlKey"。
     * 如果没设置，则不会绘制岛洞多边形，默认值为 null。
     *
     * 设置方法如下：
     * (code)
     * var draw = new SuperMap.Control.DrawFeature(vectorLayer,SuperMap.Handler.Polygon, {
     *      handlerOptions: {holeModifier: "altKey"}
     *  });
     * map.addControl(draw);
     * draw.activate();
     * (end)
     *
     */
    holeModifier: null,
    
    /**
     * Property: drawingHole
     * {Boolean} Currently drawing an interior ring.
     */
    drawingHole: false,
    
    /**
     * Parameter: polygon
     * {<SuperMap.Feature.Vector>}
     */
    polygon: null,

    /**
     * Constructor: SuperMap.Handler.Polygon
     * 构造函数，然后绘制一个新的多边形绘制事件处理器。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 拥有当前处理器的控件对象。
     * callbacks - {Object} 回调函数对象，关于回调的具体详细说明参见下文。
     *     当路径绘制完成时，一个对象用done属性值作为一个函数回调。回调得
     *     到多边形的几何图形的单个参数。如果这个回调对象包含一个point属性，
     *     这个函数将会添加发送到每个点，如果这个回调对象包含cancel属性，当
     *     绘制时处理事件是关闭的时候，这个函数将会调用，得到一个几何图形。
     * options - {Object} 一个可选对象，其属性将会赋值到事件处理器对象上。
     *
     * Named callbacks:
     * create - 要素被初次创建时调用，回调函数接收当前创建几何点对象和要素对象做为参数。
     * modify - 每次要素顶点发生变化时调用，回调函数接收引起变化的点对象和要素对象作为参数。
     * point - 每次添加新的顶点时调用，回调函数接收新顶点的几何对象作为参数。
     * done - 多边形绘制完成后调用，回调函数接收当前绘制的多边形几何对象作为唯一参数。
     * cancel - 绘制过程中关闭事件处理器激活状态是调用，回调函数接收当前要素的几何对象作为参数。
     */
    initialize: function(control, callbacks, options) {
        SuperMap.Handler.Path.prototype.initialize.apply(this, arguments);
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
        var lonlat = this.layer.getLonLatFromViewPortPx(pixel);
        var geometry = new SuperMap.Geometry.Point(
            lonlat.lon, lonlat.lat
        );
        this.point = new SuperMap.Feature.Vector(geometry);
        this.line = new SuperMap.Feature.Vector(
            new SuperMap.Geometry.LinearRing([this.point.geometry])
        );
        this.polygon = new SuperMap.Feature.Vector(
            new SuperMap.Geometry.Polygon([this.line.geometry])
        );
        this.callback("create", [this.point.geometry, this.getSketch()]);
        this.point.geometry.clearBounds();
        this.layer.addFeatures([this.polygon, this.point], {silent: true});
    },

    /**
     * Method: addPoint
     * Add point to geometry.
     *
     * Parameters:
     * pixel - {<SuperMap.Pixel>} The pixel location for the new point.
     */
    addPoint: function(pixel) {
        if(!this.drawingHole && this.holeModifier &&
           this.evt && this.evt[this.holeModifier]) {
            var geometry = this.point.geometry;
            var features = this.control.layer.features;
            var candidate, polygon;
            // look for intersections, last drawn gets priority
            for (var i=features.length-1; i>=0; --i) {
                candidate = features[i].geometry;
                if ((candidate instanceof SuperMap.Geometry.Polygon || 
                    candidate instanceof SuperMap.Geometry.MultiPolygon) && 
                    candidate.intersects(geometry)) {
                    polygon = features[i];
                    this.control.layer.removeFeatures([polygon], {silent: true});
                    this.control.layer.events.registerPriority(
                        "sketchcomplete", this, this.finalizeInteriorRing
                    );
                    this.control.layer.events.registerPriority(
                        "sketchmodified", this, this.enforceTopology
                    );
                    polygon.geometry.addComponent(this.line.geometry);
                    this.polygon = polygon;
                    this.drawingHole = true;
                    break;
                }
            }
        }
        SuperMap.Handler.Path.prototype.addPoint.apply(this, arguments);
    },

    /**
     * Method: getCurrentPointIndex
     * 
     * Returns:
     * {Number} The index of the most recently drawn point.
     */
    getCurrentPointIndex: function() {
        return this.line.geometry.components.length - 2;
    },

    /**
     * Method: enforceTopology
     * Simple topology enforcement for drawing interior rings.  Ensures vertices
     *     of interior rings are contained by exterior ring.  Other topology 
     *     rules are enforced in <finalizeInteriorRing> to allow drawing of 
     *     rings that intersect only during the sketch (e.g. a "C" shaped ring
     *     that nearly encloses another ring).
     */
    enforceTopology: function(event) {
        var point = event.vertex;
        var components = this.line.geometry.components;
        // ensure that vertices of interior ring are contained by exterior ring
        if (!this.polygon.geometry.intersects(point)) {
            var last = components[components.length-3];
            point.x = last.x;
            point.y = last.y;
        }
    },

    /**
     * Method: finishGeometry
     * Finish the geometry and send it back to the control.
     */
    finishGeometry: function() {
        var index = this.line.geometry.components.length - 2;
        this.line.geometry.removeComponent(this.line.geometry.components[index]);
        this.removePoint();
        this.finalize();
    },

    /**
     * Method: finalizeInteriorRing
     * Enforces that new ring has some area and doesn't contain vertices of any
     *     other rings.
     */
    finalizeInteriorRing: function() {
        var ring = this.line.geometry;
        // ensure that ring has some area
        var modified = (ring.getArea() !== 0);
        if (modified) {
            // ensure that new ring doesn't intersect any other rings
            var rings = this.polygon.geometry.components;
            for (var i=rings.length-2; i>=0; --i) {
                if (ring.intersects(rings[i])) {
                    modified = false;
                    break;
                }
            }
            if (modified) {
                // ensure that new ring doesn't contain any other rings
                var target;
                outer: for (var i=rings.length-2; i>0; --i) {
                    var points = rings[i].components;
                    for (var j=0, jj=points.length; j<jj; ++j) {
                        if (ring.containsPoint(points[j])) {
                            modified = false;
                            break outer;
                        }
                    }
                }
            }
        }
        if (modified) {
            if (this.polygon.state !== SuperMap.State.INSERT) {
                this.polygon.state = SuperMap.State.UPDATE;
            }
        } else {
            this.polygon.geometry.removeComponent(ring);
        }
        this.restoreFeature();
        return false;
    },

    /**
     * APIMethod: cancel
     * 结束绘制操作并调用cancel回调。
     */
    cancel: function() {
        if (this.drawingHole) {
            this.polygon.geometry.removeComponent(this.line.geometry);
            this.restoreFeature(true);
        }
        return SuperMap.Handler.Path.prototype.cancel.apply(this, arguments);
    },
    
    /**
     * Method: restoreFeature
     * Move the feature from the sketch layer to the target layer.
     *
     * Properties: 
     * cancel - {Boolean} Cancel drawing.  If falsey, the "sketchcomplete" event
     *     will be fired.
     */
    restoreFeature: function(cancel) {
        this.control.layer.events.unregister(
            "sketchcomplete", this, this.finalizeInteriorRing
        );
        this.control.layer.events.unregister(
            "sketchmodified", this, this.enforceTopology
        );
        this.layer.removeFeatures([this.polygon], {silent: true});
        this.control.layer.addFeatures([this.polygon], {silent: true});
        this.drawingHole = false;
        if (!cancel) {
            // Re-trigger "sketchcomplete" so other listeners can do their
            // business.  While this is somewhat sloppy (if a listener is 
            // registered with registerPriority - not common - between the start
            // and end of a single ring drawing - very uncommon - it will be 
            // called twice).
            // TODO: In 3.0, collapse sketch handlers into geometry specific
            // drawing controls.
            this.control.layer.events.triggerEvent(
                "sketchcomplete", {feature : this.polygon}
            );
        }
    },

    /**
     * Method: destroyFeature
     * Destroy temporary geometries
     *
     * Parameters:
     * force - {Boolean} Destroy even if persist is true.
     */
    destroyFeature: function(force) {
        SuperMap.Handler.Path.prototype.destroyFeature.call(
            this, force);
        this.polygon = null;
    },

    /**
     * Method: drawFeature
     * Render geometries on the temporary layer.
     */
    drawFeature: function() {
        this.layer.drawFeature(this.polygon, this.style);
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
        return this.polygon;
    },

    /**
     * Method: getGeometry
     * Return the sketch geometry.  If <multi> is true, this will return
     *     a multi-part geometry.
     *
     * Returns:
     * {<SuperMap.Geometry.Polygon>}
     */
    getGeometry: function() {
        var geometry = this.polygon && this.polygon.geometry;
        if(geometry && this.multi) {
            geometry = new SuperMap.Geometry.MultiPolygon([geometry]);
        }
        return geometry;
    },

    CLASS_NAME: "SuperMap.Handler.Polygon"
});
