/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Handler/Drag.js
 */

/**
 * Class: SuperMap.Handler.RegularPolygon
 * 地图上绘制规则多边形的处理事件类。多边形在按下鼠标的时候开始显示，然后跟随鼠标移动和方位修改做出变化，最后在鼠标
 * 松开的时候完成绘制。该处理事件会触发"done"和"cancel"标记的回调函数。
 * 使用 <SuperMap.Handler.RegularPolygon> 构造方法可以创建一个新的handler实例。
 * 
 * Inherits from:
 *  - <SuperMap.Handler.Drag>
 */
SuperMap.Handler.RegularPolygon = SuperMap.Class(SuperMap.Handler.Drag, {
    
    /**
     * APIProperty: sides
     * {Integer} 规则多边形的边的数量，要求必须大于2。默认的值为4
     */
    sides: 4,

    /**
     * APIProperty: radius
     * {Float} 以地图单位标记的规则多边形半径。如果设置为非零有效值，则在鼠标移动和拖拽过程中将会绘制一个固定半径的
     * 规则多边形。如果这个属性没有设置，可以通过鼠标拖拽来改变多边形的大小。默认值为 null。
     */
    radius: null,
    
    /**
     * APIProperty: snapAngle
     * {Float} 如果设置了非零值，则操作过程中会按照snapAngle值整倍数来旋转多边形。
     * 这个值是沿x轴正方向逆时针旋转的角度。
     */
    snapAngle: null,
    
    /**
     * APIProperty: snapToggle
     * {String} 如果设置，则对应设置的键盘key事件会在鼠标事件过程中得到捕获，并且设置snap模式为与当前相反的模式。
     * 可以通过设置freehandToggle为null来阻止snap和none-snap模式之间的切换。允许设置的snapToggle值为:"shiftKey"、 "ctrlKey"、"altKey"。
     * 在snapAngle设置为非零值的情况下只有snap模式可用。默认值为 "shiftKey"。
     */
    snapToggle: 'shiftKey',
    
    /**
     * Property: layerOptions
     * {Object} Any optional properties to be set on the sketch layer.
     */
    layerOptions: null,

    /**
     * APIProperty: persist
     * {Boolean}  保留要素呈现直到清理方法被调用。默认值是 false。
     * 如果设置为true，则会保留要素呈现，直到关闭当前处理器激活状态或者开启另个绘制时，调用clear方法实施清理。
     */
    persist: false,

    /**
     * APIProperty: irregular
     * {Boolean} 绘制一个不规则的多边形来代替一个规则的多边形。默认为false。
     * 如果设置为true，则在第一次鼠标按下时标明多边形边界的一个角，并且随着鼠标的移动绘制其对角点，进而拉伸多边形。
     * 该属性优先级高于radius属性，如果设置为true，radius则会被忽略。
     */
    irregular: false,

    /**
     * Property: angle
     * {Float} The angle from the origin (mouse down) to the current mouse
     *     position, in radians.  This is measured counterclockwise from the
     *     positive x-axis.
     */
    angle: null,

    /**
     * Property: fixedRadius
     * {Boolean} The polygon has a fixed radius.  True if a radius is set before
     *     drawing begins.  False otherwise.
     */
    fixedRadius: false,

    /**
     * Property: feature
     * {<SuperMap.Feature.Vector>} The currently drawn polygon feature
     */
    feature: null,

    /**
     * Property: layer
     * {<SuperMap.Layer.Vector>} The temporary drawing layer
     */
    layer: null,

    /**
     * Property: origin
     * {<SuperMap.Geometry.Point>} Location of the first mouse down
     */
    origin: null,

    /**
     * Constructor: SuperMap.Handler.RegularPolygon
     * 构造方法，返回一个绘制规则多边形的处理器。
     *
     * Parameters:
     * control - {<SuperMap.Control>} 当前处理器所属的控件对象。
     * callbacks - {Object} 回调函数对象，详细描述参见下文。
     * options - {Object} 一个可选对象，其属性将会赋值到处理器对象上。如果side属性没有设置特定值，则默认为4。
     *
     * Named callbacks:
     * create - 要素被初次创建时候调用，回调函数接收创建的集合点对象和多边形要素作为参数。
     * done - 多边形要素完成绘制时调用，回调函数接收多边形要素的几何对象作为唯一参数。
     * cancel - 当前处理器激活状态在绘制过程中被关闭时调用。回调函数接收当前要素的几何对象作为参数。
     */
    initialize: function(control, callbacks, options) {
        if(!(options && options.layerOptions && options.layerOptions.styleMap)) {
            this.style = SuperMap.Util.extend(SuperMap.Feature.Vector.style['default'], {});
        }

        SuperMap.Handler.Drag.prototype.initialize.apply(this,
                                                [control, callbacks, options]);
        this.options = (options) ? options : {};
    },
    
    /**
     * APIMethod: setOptions
     * 设置可选属性。
     * 
     * Parameters:
     * newOptions - {Object} 为当前处理器设置可选属性。
     */
    setOptions: function (newOptions) {
        SuperMap.Util.extend(this.options, newOptions);
        SuperMap.Util.extend(this, newOptions);
    },
    
    /**
     * APIMethod: activate
     * 激活处理器对象上的监听处理，如果当前处理器对象已经激活，则返回false.
     * 
     * Returns: 
     * {Boolean} 处理器对象监听激活成功.
     */
    activate: function() {
        var activated = false;
        if(SuperMap.Handler.Drag.prototype.activate.apply(this, arguments)) {
            // create temporary vector layer for rendering geometry sketch
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
            activated = true;
           //设置绘制时的鼠标样式为默认样式
            SuperMap.Element.addClass(
                this.map.viewPortDiv, "smDefault" );

        }
        return activated;
    },

     /**
     * APIMethod: deactivate
     * 关闭处理器对象上的监听处理，如果当前处理器已经是关闭状态，则返回false
     * 
     * Returns:
     * {Boolean} 处理器对象监听已经成功关闭。
     */
    deactivate: function() {
        var deactivated = false;
        if(SuperMap.Handler.Drag.prototype.deactivate.apply(this, arguments)) {
            // call the cancel callback if mid-drawing
            if(this.dragging) {
                this.cancel();
            }
            // If a layer's map property is set to null, it means that that
            // layer isn't added to the map. Since we ourself added the layer
            // to the map in activate(), we can assume that if this.layer.map
            // is null it means that the layer has been destroyed (as a result
            // of map.destroy() for example.
            if (this.layer.map != null) {
                this.layer.destroy(false);
                if (this.feature) {
                    this.feature.destroy();
                }
            }
            this.layer = null;
            this.feature = null;
            deactivated = true;
            //移除绘制时所设置的鼠标样式
            SuperMap.Element.removeClass(
               this.map.viewPortDiv, "smDefault" );
        }
        return deactivated;
    },
    
    /**
     * Method: down
     * Start drawing a new feature
     *
     * Parameters:
     * evt - {Event} The drag start event
     */
    down: function(evt) {
        this.fixedRadius = !!(this.radius);
        var maploc = this.layer.getLonLatFromViewPortPx(evt.xy); 
        this.origin = new SuperMap.Geometry.Point(maploc.lon, maploc.lat);
        //移除拖动鼠标时（drag）所设置的样式
         SuperMap.Element.removeClass(
            this.map.viewPortDiv, "smDragDown" );
        this.map.viewPortDiv.style.cursor="";
        // create the new polygon
        if(!this.fixedRadius || this.irregular) {
            // smallest radius should not be less one pixel in map units
            // VML doesn't behave well with smaller
            this.radius = this.map.getResolution();
        }
        if(this.persist) {
            this.clear();
        }
        this.feature = new SuperMap.Feature.Vector();
        this.createGeometry();
        this.callback("create", [this.origin, this.feature]);
        this.layer.addFeatures([this.feature], {silent: true});
        this.layer.drawFeature(this.feature, this.style);
    },
    
    /**
     * Method: move
     * Respond to drag move events
     *
     * Parameters:
     * evt - {Evt} The move event
     */
    move: function(evt) {
        var maploc = this.layer.getLonLatFromViewPortPx(evt.xy); 
        var point = new SuperMap.Geometry.Point(maploc.lon, maploc.lat);
        if(this.irregular) {
            var ry = Math.sqrt(2) * Math.abs(point.y - this.origin.y) / 2;
            this.radius = Math.max(this.map.getResolution() / 2, ry);
        } else if(this.fixedRadius) {
            this.origin = point;
        } else {
            this.calculateAngle(point, evt);
            this.radius = Math.max(this.map.getResolution() / 2,
                                   point.distanceTo(this.origin));
        }
        this.modifyGeometry();
        if(this.irregular) {
            var dx = point.x - this.origin.x;
            var dy = point.y - this.origin.y;
            var ratio;
            if(dy == 0) {
                ratio = dx / (this.radius * Math.sqrt(2));
            } else {
                ratio = dx / dy;
            }
            this.feature.geometry.resize(1, this.origin, ratio);
            this.feature.geometry.move(dx / 2, dy / 2);
        }
        this.layer.drawFeature(this.feature, this.style);
    },

    /**
     * Method: up
     * Finish drawing the feature
     *
     * Parameters:
     * evt - {Event} The mouse up event
     */
    up: function(evt) {
        this.finalize();
        // the mouseup method of superclass doesn't call the
        // "done" callback if there's been no move between
        // down and up
        if (this.start === this.last) {
            this.callback("done", [evt.xy]);
        }
    },

    /**
     * Method: out
     * Finish drawing the feature.
     *
     * Parameters:
     * evt - {Event} The mouse out event
     */
    out: function(evt) {
        this.finalize();
    },

    /**
     * Method: createGeometry
     * Create the new polygon geometry.  This is called at the start of the
     *     drag and at any point during the drag if the number of sides
     *     changes.
     */
    createGeometry: function() {
        this.angle = Math.PI * ((1/this.sides) - (1/2));
        if(this.snapAngle) {
            this.angle += this.snapAngle * (Math.PI / 180);
        }
        this.feature.geometry = SuperMap.Geometry.Polygon.createRegularPolygon(
            this.origin, this.radius, this.sides, this.snapAngle
        );
    },
    
    /**
     * Method: modifyGeometry
     * Modify the polygon geometry in place.
     */
    modifyGeometry: function() {
        var angle, point;
        var ring = this.feature.geometry.components[0];
        // if the number of sides ever changes, create a new geometry
        if(ring.components.length !== (this.sides + 1)) {
            this.createGeometry();
            ring = this.feature.geometry.components[0];
        }
        for(var i=0; i<this.sides; ++i) {
            point = ring.components[i];
            angle = this.angle + (i * 2 * Math.PI / this.sides);
            point.x = this.origin.x + (this.radius * Math.cos(angle));
            point.y = this.origin.y + (this.radius * Math.sin(angle));
            point.clearBounds();
        }
    },
    
    /**
     * Method: calculateAngle
     * Calculate the angle based on settings.
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}
     * evt - {Event}
     */
    calculateAngle: function(point, evt) {
        var alpha = Math.atan2(point.y - this.origin.y,
                               point.x - this.origin.x);
        if(this.snapAngle && (this.snapToggle && !evt[this.snapToggle])) {
            var snapAngleRad = (Math.PI / 180) * this.snapAngle;
            this.angle = Math.round(alpha / snapAngleRad) * snapAngleRad;
        } else {
            this.angle = alpha;
        }
    },

    /**
     * APIMethod: cancel
     * 结束多边形绘制并调用cancel回调。
     */
    cancel: function() {
        // the polygon geometry gets cloned in the callback method
        this.callback("cancel", null);
        this.finalize();
    },

    /**
     * Method: finalize
     * Finish the geometry and call the "done" callback.
     */
    finalize: function() {
        this.origin = null;
        this.radius = this.options.radius;
    },

    /**
     * APIMethod: clear
     * 清理临时图层上呈现的要素。方法会在处理器激活状态被关闭、取消、或者完成操作（persist为true的情况）时调用。
     */
    clear: function() {
        if (this.layer) {
            this.layer.renderer.clear();
            this.layer.destroyFeatures();
        }
    },
    
    /**
     * Method: callback
     * Trigger the control's named callback with the given arguments
     *
     * Parameters:
     * name - {String} The key for the callback that is one of the properties
     *     of the handler's callbacks object.
     * args - {Array} An array of arguments with which to call the callback
     *     (defined by the control).
     */
    callback: function (name, args) {
        // override the callback method to always send the polygon geometry
        if (this.callbacks[name]) {
            this.callbacks[name].apply(this.control,
                                       [this.feature.geometry.clone()]);
        }
        // since sketch features are added to the temporary layer
        // they must be cleared here if done or cancel
        if(!this.persist && (name === "done" || name === "cancel")) {
            this.clear();
        }
    },

    CLASS_NAME: "SuperMap.Handler.RegularPolygon"
});
