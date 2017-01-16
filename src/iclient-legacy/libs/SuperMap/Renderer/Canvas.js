/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer.js
 */

/**
 * SuperMap.Renderer.Canvas 
 * A renderer based on the 2D 'canvas' drawing element.
 * 
 * Inherits:
 *  - <SuperMap.Renderer>
 */
SuperMap.Renderer.Canvas = SuperMap.Class(SuperMap.Renderer, {
    //{src:src, img:img}
    //srcArr:[],
   // imgArr: {},
    /**
     * APIProperty: hitDetection
     * {Boolean} Allow for hit detection of features.  Default is true.
     */
    hitDetection: true,
    
    /**
     * Property: hitOverflow
     * {Number} The method for converting feature identifiers to color values
     *     supports 16777215 sequential values.  Two features cannot be 
     *     predictably detected if their identifiers differ by more than this
     *     value.  The hitOverflow allows for bigger numbers (but the 
     *     difference in values is still limited).
     */
    hitOverflow: 0,

    /**
     * Property: canvas
     * {Canvas} The canvas context object.
     */
    canvas: null, 
    
    /**
     * Property: features
     * {Object} Internal object of feature/style pairs for use in redrawing the layer.
     */
    features: null,
    
    /**
     * Property: pendingRedraw
     * {Boolean} The renderer needs a redraw call to render features added while
     *     the renderer was locked.
     */
    pendingRedraw: false,

    /**
     * Property: cachedSymbolBounds
     * {Object} Internal cache of calculated symbol extents.
     */
    cachedSymbolBounds: {},

    /**
     * Property: londingimgs
     * {Object} 处于下载中的图片
     */
    londingimgs:{},
    
    /**
     * Constructor: SuperMap.Renderer.Canvas
     *
     * Parameters:
     * containerID - {<String>}
     * options - {Object} Optional properties to be set on the renderer.
     */
    initialize: function(containerID, options) {
        SuperMap.Renderer.prototype.initialize.apply(this, arguments);
        this.root = document.createElement("canvas");
        this.container.appendChild(this.root);
        this.canvas = this.root.getContext("2d");
        this.features = {};
        if (this.hitDetection) {
            this.hitCanvas = document.createElement("canvas");
            this.hitContext = this.hitCanvas.getContext("2d");
        }
    },
    
    /**
     * Method: setExtent
     * Set the visible part of the layer.
     *
     * Parameters:
     * extent - {<SuperMap.Bounds>}
     * resolutionChanged - {Boolean}
     *
     * Returns:
     * {Boolean} true to notify the layer that the new extent does not exceed
     *     the coordinate range, and the features will not need to be redrawn.
     *     False otherwise.
     */
    setExtent: function(extent, resolutionChanged) { 
        SuperMap.Renderer.prototype.setExtent.apply(this, arguments);
        // always redraw features
        return false;
    },
    
    /** 
     * Method: eraseGeometry
     * Erase a geometry from the renderer. Because the Canvas renderer has
     *     'memory' of the features that it has drawn, we have to remove the
     *     feature so it doesn't redraw.   
     * 
     * Parameters:
     * geometry - {<SuperMap.Geometry>}
     * featureId - {String}
     */
    eraseGeometry: function(geometry, featureId) {
        this.eraseFeatures(this.features[featureId][0]);
    },

    /**
     * APIMethod: supported
     * 
     * Returns:
     * {Boolean} Whether or not the browser supports the renderer class
     */
    supported: function() {
        var canvas = document.createElement("canvas");
        return !!canvas.getContext;
    },    
    
    /**
     * Method: setSize
     * Sets the size of the drawing surface.
     *
     * Once the size is updated, redraw the canvas.
     *
     * Parameters:
     * size - {<SuperMap.Size>} 
     */
    setSize: function(size) {
        this.size = size.clone();
        var root = this.root;
        root.style.width = size.w + "px";
        root.style.height = size.h + "px";
        root.width = size.w;
        root.height = size.h;
        this.resolution = null;
        if (this.hitDetection) {
            var hitCanvas = this.hitCanvas;
            hitCanvas.style.width = size.w + "px";
            hitCanvas.style.height = size.h + "px";
            hitCanvas.width = size.w;
            hitCanvas.height = size.h;
        }
    },
    
    /**
     * Method: drawFeature
     * Draw the feature. Stores the feature in the features list,
     * then redraws the layer. 
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 
     * style - {<Object>} 
     *
     * Returns:
     * {Boolean} The feature has been drawn completely.  If the feature has no
     *     geometry, undefined will be returned.  If the feature is not rendered
     *     for other reasons, false will be returned.
     */
    drawFeature: function(feature, style) {
        var rendered;
        if (feature.geometry) {
            style = this.applyDefaultSymbolizer(style || feature.style);
            // don't render if display none or feature outside extent
            var bounds = feature.geometry.getBounds();
            rendered = (style.display !== "none") && !!bounds && 
                bounds.intersectsBounds(this.extent);
            if (rendered) {
                // keep track of what we have rendered for redraw
                this.features[feature.id] = [feature, style];
            }
            else {
                // remove from features tracked for redraw
                delete(this.features[feature.id]);
            }
            this.pendingRedraw = true;
        }
        if (this.pendingRedraw && !this.locked) {
            this.redraw();
            this.pendingRedraw = false;
        }
        return rendered;
    },

	/**
     * Method: drawGeometry
     * Used when looping (in redraw) over the features; draws
     * the canvas. 
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 
     * style - {Object} 
     */
    drawGeometry: function(geometry, style, featureId) {

        var className = geometry.CLASS_NAME;
        if ((className === "SuperMap.Geometry.Collection") ||
            (className === "SuperMap.Geometry.MultiPoint") ||
            (className === "SuperMap.Geometry.MultiLineString") ||
            (className === "SuperMap.Geometry.MultiPolygon")||
            (className === "SuperMap.REST.Route")) {
            for (var i = 0; i < geometry.components.length; i++) {
                this.drawGeometry(geometry.components[i], style, featureId);
            }
            return;
        }
        if(SuperMap.Geometry.LinearRing && (geometry instanceof SuperMap.Geometry.LinearRing)){
            this.drawLinearRing(geometry, style, featureId);
        }
        else if(SuperMap.Geometry.LineString && (geometry instanceof SuperMap.Geometry.LineString)){
            this.drawLineString(geometry, style, featureId);
        }
        else if(SuperMap.Geometry.Polygon && (geometry instanceof SuperMap.Geometry.Polygon)){
            if(style.fill == false) {
                var fillOpacity = style.fillOpacity;
                style.fill = true;
                style.fillOpacity = 0;
            }
            this.drawPolygon(geometry, style, featureId);
        }
        else if(SuperMap.Geometry.Point && (geometry instanceof SuperMap.Geometry.Point)){
            this.drawPoint(geometry, style, featureId);
        }
        else if(SuperMap.Geometry.Rectangle && (geometry instanceof SuperMap.Geometry.Rectangle)){
            this.drawRectangle(geometry, style, featureId);
        }
        if(fillOpacity) {
            style.fill = false;
            style.fillOpacity = fillOpacity;
            fillOpacity = "";
        }
    },

    /**
     * Method: drawExternalGraphic
     * Called to draw External graphics. 
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawExternalGraphic: function(geometry, style, featureId) {

        var t = this;
        if(this.londingimgs[featureId]){
            this.londingimgs[featureId].onload = function(){return false;}
        }
        var onLoad = function () {
            var featureId = this.featureId;
            var geometry = this.geometry;
            var style = this.style;
            var img = this.img;
            t.londingimgs[featureId] = null;
            if (!t.features[featureId]) {
                return;
            }
            var width = style.graphicWidth || style.graphicHeight;
            var height = style.graphicHeight || style.graphicWidth;
            width = width ? width : style.pointRadius * 2;
            height = height ? height : style.pointRadius * 2;
            var xOffset = (style.graphicXOffset != undefined) ?
                style.graphicXOffset : -(0.5 * width);
            var yOffset = (style.graphicYOffset != undefined) ?
                style.graphicYOffset : -(0.5 * height);
            var opacity = style.graphicOpacity || style.fillOpacity;
            var pt = t.getLocalXY(geometry);
            var p0 = pt[0];
            var p1 = pt[1];
            if (!isNaN(p0) && !isNaN(p1)) {
                var canvas = t.canvas;
                //Canvas添加旋转图片的功能
                canvas.save();
                var rotation;
                if (style.rotation) {
                    rotation = style.rotation / 180 * Math.PI;
                }
                canvas.translate(p0, p1);
                if (rotation) {
                    canvas.rotate(rotation);
                }
                canvas.translate(xOffset, yOffset);
                canvas.globalAlpha = opacity;
                var factor = SuperMap.Renderer.Canvas.drawImageScaleFactor ||
                    (SuperMap.Renderer.Canvas.drawImageScaleFactor =
                            /android 2.1/.test(navigator.userAgent.toLowerCase()) ?
                                // 320 is the screen width of the G1 phone, for
                                // which drawImage works out of the box.
                            320 / window.screen.width : 1
                    );
                canvas.drawImage(
                    img, 0, 0, width * factor, height * factor
                );
                canvas.restore();
                if (t.hitDetection) {
                    t.setHitContextStyle("fill", featureId);
                    t.hitContext.save();
                    t.hitContext.translate(p0, p1);
                    if (rotation) {
                        t.hitContext.rotate(rotation);
                    }
                    t.hitContext.translate(xOffset, yOffset);
                    t.hitContext.fillRect(0, 0, width, height);
                    t.hitContext.restore();
                }
            }
        };

        if(this.features[featureId][0].img) {
            var img =  this.features[featureId][0].img;
            img.src = style.externalGraphic;
            //覆盖上次的 onload，防止不一致(暂时没发现不一致有什么影响，如果没有影响可以直接onload.call)
            img.onload = function() {
                onLoad.call({
                    featureId : featureId,
                    geometry :geometry,
                    style : style,
                    img:img
                });
            };
            //由于重绘时不再加载图片配置(不再new Image(),将Img存在了feature上)，手动调用onload方法绘制图象
            img.onload();
        }
        else {
            var img = new Image();
            img.src = style.externalGraphic;
            this.londingimgs[featureId] = img;
            this.features[featureId][0].img = img;
            if (style.graphicTitle) {
                img.title = style.graphicTitle;
            }
            img.onload = function() {
                onLoad.call({
                    featureId : featureId,
                    geometry :geometry,
                    style : style,
                    img:img
                });
            };
        }
        t.canvas.globalCompositeOperation = "destination-over";
    },

    /**
     * Method: setCanvasStyle
     * Prepare the canvas for drawing by setting various global settings.
     *
     * Parameters:
     * type - {String} one of 'stroke', 'fill', or 'reset'
     * style - {Object} Symbolizer hash
     */
    setCanvasStyle: function(type, style) {
        if (type === "fill") {     
			if(style.fillColor instanceof CanvasGradient){
                this.canvas.globalAlpha = 1;
                this.canvas.fillStyle = style['fillColor'];
            } else {
                this.canvas.globalAlpha = style['fillOpacity'];
                this.canvas.fillStyle = style['fillColor'];
            }
        } else if (type === "stroke") {  
            this.canvas.globalAlpha = style['strokeOpacity'];
            this.canvas.lineCap = style['strokeLinecap'];
            this.canvas.strokeStyle = style['strokeColor'];
            this.canvas.lineWidth = style['strokeWidth'];
        } else {
            this.canvas.globalAlpha = 0;
            this.canvas.lineWidth = 1;
        }
    },
    
    /**
     * Method: featureIdToHex
     * Convert a feature ID string into an RGB hex string.
     *
     * Parameters:
     * featureId - {String} Feature id
     *
     * Returns:
     * {String} RGB hex string.
     */
    featureIdToHex: function(featureId) {
        var id = Number(featureId.split("_").pop()) + 1; // zero for no feature
        if (id >= 16777216) {
            this.hitOverflow = id - 16777215;
            id = id % 16777216 + 1;
        }
        var hex = "000000" + id.toString(16);
        var len = hex.length;
        hex = "#" + hex.substring(len-6, len);
        return hex;
    },
    
    /**
     * Method: setHitContextStyle
     * Prepare the hit canvas for drawing by setting various global settings.
     *
     * Parameters:
     * type - {String} one of 'stroke', 'fill', or 'reset'
     * featureId - {String} The feature id.
     * symbolizer - {<SuperMap.Symbolizer>} The symbolizer.
     */
    setHitContextStyle: function(type, featureId, symbolizer) {
        var hex = this.featureIdToHex(featureId);
        if (type === "fill") {
            this.hitContext.globalAlpha = 1.0;
            this.hitContext.fillStyle = hex;
        } else if (type === "stroke") {  
            this.hitContext.globalAlpha = 1.0;
            this.hitContext.strokeStyle = hex;
            // bump up stroke width to deal with antialiasing
            this.hitContext.lineWidth = symbolizer.strokeWidth + 2;
        } else {
            this.hitContext.globalAlpha = 0;
            this.hitContext.lineWidth = 1;
        }
    },

    /**
     * Method: drawPoint
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawPoint: function(geometry, style, featureId) {
        if(style.graphic !== false) {
            if(style.externalGraphic) {
                this.drawExternalGraphic(geometry, style, featureId);
            }else if (style.graphicName && (style.graphicName != "circle")) {
                this.drawNamedSymbol(geometry, style, featureId);
            } else {
                var pt = this.getLocalXY(geometry);
                var p0 = pt[0];
                var p1 = pt[1];
                if(!isNaN(p0) && !isNaN(p1)) {
                    var twoPi = Math.PI*2;
                    var radius = style.pointRadius;
                    if(style.fill !== false) {
                        this.setCanvasStyle("fill", style);
                        this.canvas.beginPath();
                        this.canvas.arc(p0, p1, radius, 0, twoPi, true);
                        this.canvas.fill();
                        if (this.hitDetection) {
                            this.setHitContextStyle("fill", featureId, style);
                            this.hitContext.beginPath();
                            this.hitContext.arc(p0, p1, radius, 0, twoPi, true);
                            this.hitContext.fill();
                        }
                    }

                    if(style.stroke !== false) {
                        this.setCanvasStyle("stroke", style);
                        this.canvas.beginPath();
                        this.canvas.arc(p0, p1, radius, 0, twoPi, true);
                        this.canvas.stroke();
                        if (this.hitDetection) {
                            this.setHitContextStyle("stroke", featureId, style);
                            this.hitContext.beginPath();
                            this.hitContext.arc(p0, p1, radius, 0, twoPi, true);
                            this.hitContext.stroke();
                        }
                        this.setCanvasStyle("reset");
                    }
                }
            }
        }
    },

    /**
     * Method: drawNamedSymbol
     * 根据符号号来绘制特定的几种符号，是一个私有方法
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */
    drawNamedSymbol: function(geometry, style, featureId) {
        var x, y, cx, cy, i, symbolBounds, scaling, angle;
        var unscaledStrokeWidth;
        var deg2rad = Math.PI / 180.0;

        var symbol = SuperMap.Renderer.symbol[style.graphicName];

        if (!symbol) {
            throw new Error(style.graphicName + ' is not a valid symbol name');
        }

        if (!symbol.length || symbol.length < 2) return;

        var pt = this.getLocalXY(geometry);
        var p0 = pt[0];
        var p1 = pt[1];

        if (isNaN(p0) || isNaN(p1)) return;

        // Use rounded line caps
        this.canvas.lineCap = "round";
        this.canvas.lineJoin = "round";

        if (this.hitDetection) {
            this.hitContext.lineCap = "round";
            this.hitContext.lineJoin = "round";
        }

        // Scale and rotate symbols, using precalculated bounds whenever possible.
        if (style.graphicName in this.cachedSymbolBounds) {
            symbolBounds = this.cachedSymbolBounds[style.graphicName];
        } else {
            symbolBounds = new SuperMap.Bounds();
            if(style.graphicName === 'sector'){

            }else{
                for(i = 0; i < symbol.length; i+=2) {
                    symbolBounds.extend(new SuperMap.LonLat(symbol[i], symbol[i+1]));
                }
            }
            this.cachedSymbolBounds[style.graphicName] = symbolBounds;
        }

        // Push symbol scaling, translation and rotation onto the transformation stack in reverse order.
        // Don't forget to apply all canvas transformations to the hitContext canvas as well(!)
        this.canvas.save();
        if (this.hitDetection) { this.hitContext.save(); }

        // Step 3: place symbol at the desired location
        this.canvas.translate(p0,p1);
        if (this.hitDetection) { this.hitContext.translate(p0,p1); }

        // Step 2a. rotate the symbol if necessary
        angle = deg2rad * style.rotation; // will be NaN when style.rotation is undefined.
        if (!isNaN(angle)) {
            this.canvas.rotate(angle);
            if (this.hitDetection) { this.hitContext.rotate(angle); }
        }

        // // Step 2: scale symbol such that pointRadius equals half the maximum symbol dimension.
        scaling = 2.0 * style.pointRadius / Math.max(symbolBounds.getWidth(), symbolBounds.getHeight());
        if(style.graphicName === 'sector'){
            scaling = style.pointRadius / 10;
        }
        this.canvas.scale(scaling,scaling);
        if (this.hitDetection) { this.hitContext.scale(scaling,scaling); }

        // Step 1: center the symbol at the origin
        cx = symbolBounds.getCenterLonLat().lon;
        cy = symbolBounds.getCenterLonLat().lat;
        if(style.graphicName !== 'sector'){
            this.canvas.translate(-cx,-cy);
        }
        if (this.hitDetection && style.graphicName !== 'sector') { this.hitContext.translate(-cx,-cy); }

        // Don't forget to scale stroke widths, because they are affected by canvas scale transformations as well(!)
        // Alternative: scale symbol coordinates manually, so stroke width scaling is not needed anymore.
        unscaledStrokeWidth = style.strokeWidth;
        style.strokeWidth = unscaledStrokeWidth / scaling;

        if (style.fill !== false) {
            this.setCanvasStyle("fill", style);
            this.canvas.beginPath();
            for (i=0; i<symbol.length; i=i+2) {
                x = symbol[i];
                y = symbol[i+1];
                if (i == 0) this.canvas.moveTo(x,y);
                this.canvas.lineTo(x,y);
            }
            this.canvas.closePath();
            this.canvas.fill();

            if (this.hitDetection) {
                this.setHitContextStyle("fill", featureId, style);
                this.hitContext.beginPath();
                for (i=0; i<symbol.length; i=i+2) {
                    x = symbol[i];
                    y = symbol[i+1];
                    if (i == 0) this.canvas.moveTo(x,y);
                    this.hitContext.lineTo(x,y);
                }
                this.hitContext.closePath();
                this.hitContext.fill();
            }
        }

        if (style.stroke !== false) {
            this.setCanvasStyle("stroke", style);
            this.canvas.beginPath();
            for (i=0; i<symbol.length; i=i+2) {
                x = symbol[i];
                y = symbol[i+1];
                if (i == 0) this.canvas.moveTo(x,y);
                this.canvas.lineTo(x,y);
            }
            this.canvas.closePath();
            this.canvas.stroke();


            if (this.hitDetection) {
                this.setHitContextStyle("stroke", featureId, style);
                this.hitContext.beginPath();
                for (i=0; i<symbol.length; i=i+2) {
                    x = symbol[i];
                    y = symbol[i+1];
                    if (i == 0) this.canvas.moveTo(x,y);
                    this.hitContext.lineTo(x,y);
                }
                this.hitContext.closePath();
                this.hitContext.stroke();
            }

        }

        style.strokeWidth = unscaledStrokeWidth;
        this.canvas.restore();
        if (this.hitDetection) {
            this.hitContext.restore();
        }
    },
    
    /**
     * Method: drawLineString
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawLineString: function(geometry, style, featureId) {
        style = SuperMap.Util.applyDefaults({fill: false}, style);
        this.drawLinearRing(geometry, style, featureId);
    },    
    
    /**
     * Method: drawLinearRing
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawLinearRing: function(geometry, style, featureId) {
        //绘制面填充
        if (style.fill !== false) {
            this.setCanvasStyle("fill", style);
            this.renderPath(this.canvas, geometry, style, featureId, "fill");
            if (this.hitDetection) {
                this.setHitContextStyle("fill", featureId, style);
                this.renderPath(this.hitContext, geometry, style, featureId, "fill");
            }
        }
        //绘制边缘线
        if (style.stroke !== false) {
            this.setCanvasStyle("stroke", style);
            this.renderPath(this.canvas, geometry, style, featureId, "stroke");
            if (this.hitDetection) {
                this.setHitContextStyle("stroke", featureId, style);
                this.renderPath(this.hitContext, geometry, style, featureId, "stroke");
            }
        }
        this.setCanvasStyle("reset");
    },
    
    /**
     * Method: renderPath
     * Render a path with stroke and optional fill.
     */
    renderPath: function(context, geometry, style, featureId, type) {
        var widthFactor=1;
        if(typeof context.setLineDash==="function"){
            var dasharray=this.dashStyle(style,widthFactor);
            context.setLineDash(dasharray);
        }
        var components = geometry.components;
        var len = components.length;
        context.beginPath();
        var start = this.getLocalXY(components[0]);
        var x = start[0];
        var y = start[1];
        if (!isNaN(x) && !isNaN(y)) {
            context.moveTo(start[0], start[1]);
            for (var i=1; i<len; ++i) {
                var pt = this.getLocalXY(components[i]);
                context.lineTo(pt[0], pt[1]);
            }
            if (type === "fill") {
                context.fill();
            } else {
                context.stroke();
            }
        }
        if(typeof context.setLineDash==="function"){
            context.setLineDash([]);
        }
    },
    
    /**
     * Method: drawPolygon
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */ 
    drawPolygon: function(geometry, style, featureId) {
        var components = geometry.components;
        var len = components.length;
        this.drawLinearRing(components[0], style, featureId);
        // erase inner rings
        for (var i=1; i<len; ++i) {
            /** 
             * Note that this is overly agressive.  Here we punch holes through 
             * all previously rendered features on the same canvas.  A better 
             * solution for polygons with interior rings would be to draw the 
             * polygon on a sketch canvas first.  We could erase all holes 
             * there and then copy the drawing to the layer canvas. 
             * TODO: http://trac.osgeo.org/SuperMap/ticket/3130 
             */
            //此处是为了实现导洞多边形的效果，由此可见
            //polygon.components 使用来做导洞多边形的，如果要使用多面，需要使用
            //MultiPolygon，同理因为线和线环不存在导洞，所以他们的 components 直接是点数组
            //多线可以使用 MultiLineString， 多点对应也存在 MultiPoint
            this.canvas.globalCompositeOperation = "destination-out";
            if (this.hitDetection) {
                this.hitContext.globalCompositeOperation = "destination-out";
            }
            this.drawLinearRing(
                components[i], 
                SuperMap.Util.applyDefaults({stroke: false, fillOpacity: 1.0}, style),
                featureId
            );
            this.canvas.globalCompositeOperation = "source-over";
            if (this.hitDetection) {
                this.hitContext.globalCompositeOperation = "source-over";
            }
            this.drawLinearRing(
                components[i], 
                SuperMap.Util.applyDefaults({fill: false}, style),
                featureId
            );
        }
    },
    /**
     * Method: drawRectangle
     * 该方法用于绘制矩形
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>}  这里传进来的是矩形
     * style    - {Object}  用户设置的style
     * featureId - {String}  当前绘制的feature的id
     */
    drawRectangle:function(geometry, style, featureId){
        //绘制矩形我们可以将其创建为一个矩形的面环，就可以重复利用以前的代码
        var geo = (new SuperMap.Geometry.LinearRing([
            new SuperMap.Geometry.Point(geometry.x, geometry.y),
            new SuperMap.Geometry.Point(geometry.x+geometry.width, geometry.y),
            new SuperMap.Geometry.Point(geometry.x+geometry.width, geometry.y+geometry.height),
            new SuperMap.Geometry.Point(geometry.x, geometry.y+geometry.height)
        ]));

        this.drawLinearRing(geo, style, featureId);
    },
    /**
     * Method: drawText
     * This method is only called by the renderer itself.
     *
     * Parameters:
     * location - {<SuperMap.Point>}
     * style    - {Object}
     */
    drawText: function(location, style) {
        style = SuperMap.Util.extend({
            fontColor: "#000000",
            labelAlign: "cm"
        }, style);
        var pt = this.getLocalXY(location);

        if (style.labelXOffset  || style.labelYOffset ) {
            var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
            var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
            pt[0] += xOffset;
            pt[1] -= yOffset;
        }

        this.setCanvasStyle("reset");
        this.canvas.fillStyle = style.fontColor;
        this.canvas.globalAlpha = style.fontOpacity || 1.0;
        var fontStyle = [style.fontStyle ? style.fontStyle : "normal",
                         "normal", // "font-variant" not supported
                         style.fontWeight ? style.fontWeight : "normal",
                         style.fontSize ? style.fontSize : "1em",
                         style.fontFamily ? style.fontFamily : "sans-serif"].join(" ");
        var labelRows = style.label.split('\n');
        var numRows = labelRows.length;
        if (this.canvas.fillText) {
            // HTML5
            this.canvas.font = fontStyle;
            this.canvas.textAlign =
                SuperMap.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[0]] ||
                "center";
            this.canvas.textBaseline =
                SuperMap.Renderer.Canvas.LABEL_ALIGN[style.labelAlign[1]] ||
                "middle";
            var vfactor =
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            var lineHeight =
                this.canvas.measureText('Mg').height ||
                this.canvas.measureText('xx').width;
            pt[1] += lineHeight*vfactor*(numRows-1);
            for (var i = 0; i < numRows; i++) {
                if(style.labelRotation != 0)
                {
                    this.canvas.save();
                    this.canvas.translate(pt[0], pt[1]);
                    this.canvas.rotate(style.labelRotation*Math.PI/180);
                    this.canvas.fillText(labelRows[i], 0,  (lineHeight*i));
                    this.canvas.restore();
                }else{
                    this.canvas.fillText(labelRows[i], pt[0], pt[1] + (lineHeight*i));
                }
            }
        } else if (this.canvas.mozDrawText) {
            // Mozilla pre-Gecko1.9.1 (<FF3.1)
            this.canvas.mozTextStyle = fontStyle;
            // No built-in text alignment, so we measure and adjust the position
            var hfactor =
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[0]];
            if (hfactor == null) {
                hfactor = -.5;
            }
            var vfactor =
                SuperMap.Renderer.Canvas.LABEL_FACTOR[style.labelAlign[1]];
            if (vfactor == null) {
                vfactor = -.5;
            }
            var lineHeight = this.canvas.mozMeasureText('xx');
            pt[1] += lineHeight*(1 + (vfactor*numRows));
            for (var i = 0; i < numRows; i++) {
                var x = pt[0] + (hfactor*this.canvas.mozMeasureText(labelRows[i]));
                var y = pt[1] + (i*lineHeight);
                this.canvas.translate(x, y);
                this.canvas.mozDrawText(labelRows[i]);
                this.canvas.translate(-x, -y);
            }
        }
        this.setCanvasStyle("reset");
    },

    /**
     * Method: dashStyle
     *
     * Parameters:
     * style - {Object}
     * widthFactor - {Number}
     *
     * Returns:
     * {String} A Canvas Parameters of setLineDash Method 'strokeDasharray' value
     */
    dashStyle: function(style, widthFactor) {
        if(!style)return [];
        var w = style.strokeWidth * widthFactor;
        var str = style.strokeDashstyle;
        switch (str) {
            case 'solid':
                return [];
            case 'dot':
                return [1, 4 * w];
            case 'dash':
                return [4 * w, 4 * w];
            case 'dashdot':
                return [4 * w, 4 * w, 1, 4 * w];
            case 'longdash':
                return [8 * w, 4 * w];
            case 'longdashdot':
                return [8 * w, 4 * w, 1, 4 * w];
            default:
                if(!str)return [];
                if(SuperMap.Util.isArray(str))return str;
                str=SuperMap.String.trim(str).replace(/\s+/g, ",");
                return str.replace(/\[|\]/gi,"").split(",");
        }
    },

    /**
     * Method: getLocalXY
     * transform geographic xy into pixel xy
     *
     * Parameters: 
     * point - {<SuperMap.Geometry.Point>}
     */
    getLocalXY: function(point) {
        var resolution = this.getResolution();
        var extent = this.extent;
        var x = (point.x / resolution + (-extent.left / resolution));
        var y = ((extent.top / resolution) - point.y / resolution);
        return [x, y];
    },

    /**
     * Method: clear
     * Clear all vectors from the renderer.
     */    
    clear: function() {
        var height = this.root.height;
        var width = this.root.width;
        this.canvas.clearRect(0, 0, width, height);
        this.features = {};
        if (this.hitDetection) {
            this.hitContext.clearRect(0, 0, width, height);
        }
    },

    /**
     * Method: getFeatureIdFromEvent
     * 返回通过事件获取的要素。
     *
     * Parameters:
     * evt - {<SuperMap.Event>}
     *
     * Returns:
     * {<SuperMap.Feature.Vector} feature 或者 null.  直接返回要素，以避免从图层上再次查询此feature。.
     */
    getFeatureIdFromEvent: function(evt) {
        var feature = null;
        if (this.hitDetection) {
            // this dragging check should go in the feature handler
            if (!this.map.dragging) {
                var xy = evt.xy;
                var x = xy.x | 0;
                var y = xy.y | 0;
                var data = this.hitContext.getImageData(x, y, 1, 1).data;
                if (data[3] === 255) { // antialiased
                    var id = data[2] + (256 * (data[1] + (256 * data[0])));
                    if (id) {
                        var featureInfo = this.features["SuperMap.Feature.Vector_" + (id - 1 + this.hitOverflow)];
                        feature = featureInfo && featureInfo[0];
                    }
                }
            }
        }
        return feature;
    },
    
    /**
     * Method: eraseFeatures 
     * This is called by the layer to erase features; removes the feature from
     *     the list, then redraws the layer.
     * 
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 
     */
    eraseFeatures: function(features) {
        if(!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        for(var i=0; i<features.length; ++i) {
            delete this.features[features[i].id];
        }
        this.redraw();
    },

    /**
     * Method: redraw
     * The real 'meat' of the function: any time things have changed,
     *     redraw() can be called to loop over all the data and (you guessed
     *     it) redraw it.  Unlike Elements-based Renderers, we can't interact
     *     with things once they're drawn, to remove them, for example, so
     *     instead we have to just clear everything and draw from scratch.
     */
    redraw: function() {
        if (!this.locked) {
            var height = this.root.height;
            var width = this.root.width;
            this.canvas.clearRect(0, 0, width, height);
            if (this.hitDetection) {
                this.hitContext.clearRect(0, 0, width, height);
            }
            var labelMap = [];
            var feature, style;
            for (var id in this.features) {
                if (!this.features.hasOwnProperty(id)) { continue; }
                feature = this.features[id][0];
                style = this.features[id][1];
                //console.log("redraw,id:"+id+",style:"+style.externalGraphic);
                this.drawGeometry(feature.geometry, style, feature.id);
                if(style.label) {
                    labelMap.push([feature, style]);
                }
            }
            var item;
            for (var i=0, len=labelMap.length; i<len; ++i) {
                item = labelMap[i];
                //如果获取标签位置失败，不绘制该标签。
                var location = item[0].geometry.getCentroid();
                if(location == null)
                {
                    continue;
                }
                this.drawText(location, item[1]);
            }
        }    
    },

    CLASS_NAME: "SuperMap.Renderer.Canvas"
});

/**
 * Constant: SuperMap.Renderer.Canvas.LABEL_ALIGN
 * {Object}
 */
SuperMap.Renderer.Canvas.LABEL_ALIGN = {
    "l": "left",
    "r": "right",
    "t": "top",
    "b": "bottom"
};

/**
 * Constant: SuperMap.Renderer.Canvas.LABEL_FACTOR
 * {Object}
 */
SuperMap.Renderer.Canvas.LABEL_FACTOR = {
    "l": 0,
    "r": -1,
    "t": 0,
    "b": -1
};

/**
 * Constant: SuperMap.Renderer.Canvas.drawImageScaleFactor
 * {Number} Scale factor to apply to the canvas drawImage arguments. This
 *     is always 1 except for Android 2.1 devices, to work around
 *     http://code.google.com/p/android/issues/detail?id=5141.
 */
SuperMap.Renderer.Canvas.drawImageScaleFactor = null;
