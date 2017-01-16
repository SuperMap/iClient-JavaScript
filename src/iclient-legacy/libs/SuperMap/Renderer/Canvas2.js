/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer.js
 */

/**
 * Class: SuperMap.Renderer.Canvas
 * A renderer based on the 2D 'canvas' drawing element.
 *
 * Inherits:
 *  - <SuperMap.Renderer>
 */
SuperMap.Renderer.Canvas2 = SuperMap.Class(SuperMap.Renderer, {

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

    //一下几个属性代表保存绘图状态的canvas。
    backCanvas: null,

    backCanvasContext: null,

    lastBounds: null,

    backCanvasPosition: null,

    hitCanvasBack: null,

    hitContextBack: null,

    //需要绘制的featureid数组。
    featuresIds: [],

    //这个表示所有的feature。
    selectFeatures: null,

    //对layer的引用。
    layer: null,

    //缩放动画对象
    transitionObj:null,

    //记录有图片替代点的样式。
    externalGraphicCount: null,

    //labelmap集合。
    labelMap: null,

    //如下两个属性用于处理岛洞多边形情况
    polygonCanvas: null,

    polygonContext: null,

    /**
     * Constructor: SuperMap.Renderer.Canvas
     *
     * Parameters:
     * containerID - {<String>}
     * options - {Object} Optional properties to be set on the renderer.
     */
    initialize: function(containerID, options, layer) {
        SuperMap.Renderer.prototype.initialize.apply(this, arguments);
        this.root = document.createElement("canvas");
        this.canvas = this.root.getContext("2d");
        this.container.appendChild(this.root);
        this.backCanvas = document.createElement("canvas");
        this.backCanvasContext = this.backCanvas.getContext("2d");

        this.polygonCanvas = document.createElement("canvas");
        this.polygonContext = this.polygonCanvas.getContext("2d");

        this.features = {};
        this.selectFeatures = {};
        if(layer) {
            this.layer = layer;
        }

        //总是使用缩放动画
        this.transitionObj = new SuperMap.Animal2(this.layer);
        if (this.hitDetection) {
            this.hitCanvas = document.createElement("canvas");
            this.hitContext = this.hitCanvas.getContext("2d");
            this.hitCanvasBack = document.createElement("canvas");
            this.hitContextBack = this.hitCanvasBack.getContext("2d");
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
        //保存上次的视图范围。
        this.lastBounds = !!this.extent? this.extent.clone(): extent.clone();
        resolutionChanged && this.resetCanvas();
        SuperMap.Renderer.prototype.setExtent.apply(this, arguments);
        // always redraw features
        return false;
    },

    //设置当前的分辨率。
    setResolution: function(resolution){
        this.resolution = resolution;
    },

    restoreCanvas: function(){
        //保存原始状态。
        //this.backCanvasPosition = this.map.getLonLatFromLayerPx
        //                        (new SuperMap.Pixel(parseInt(this.container.style.left), parseInt(this.container.style.top)));
        this.backCanvasPosition = new SuperMap.Pixel(parseInt(this.container.style.left), parseInt(this.container.style.top));
        this.backCanvasContext.clearRect(0, 0, this.size.w, this.size.h);
        this.backCanvasContext.drawImage(this.root, 0, 0);
        if (this.hitDetection){
            this.hitContextBack.clearRect(0, 0, this.size.w, this.size.h);
            this.hitContextBack.drawImage(this.hitCanvas, 0, 0);
        }
    },

    //清楚前一个视图状态。
    resetCanvas: function() {
        this.backCanvasContext.clearRect(0, 0, this.size.w, this.size.h);
        if (this.hitDetection){
            this.hitContextBack.clearRect(0, 0, this.size.w, this.size.h);
        }
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
     * Method: calculateFeatureDx
     * {Number} Calculates the feature offset in x direction. Looking at the
     * center of the feature bounds and the renderer extent, we calculate how
     * many world widths the two are away from each other. This distance is
     * used to shift the feature as close as possible to the center of the
     * current enderer extent, which ensures that the feature is visible in the
     * current viewport.
     *
     * Parameters:
     * bounds - {<SuperMap.Bounds>} Bounds of the feature
     * worldBounds - {<SuperMap.Bounds>} Bounds of the world
     */
    calculateFeatureDx: function(bounds, worldBounds) {
        this.featureDx = 0;
        if (worldBounds) {
            var worldWidth = worldBounds.getWidth(),
                rendererCenterX = (this.extent.left + this.extent.right) / 2,
                featureCenterX = (bounds.left + bounds.right) / 2,
                worldsAway = Math.round((featureCenterX - rendererCenterX) / worldWidth);
            this.featureDx = worldsAway * worldWidth;
        }
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
        this.backCanvas.width = size.w;
        this.backCanvas.height = size.h;
        this.backCanvas.style.width = size.w + "px";
        this.backCanvas.style.height = size.h + "px";
        this.resolution = null;
        this.toClearFeatures = {};
        if (this.hitDetection) {
            var hitCanvas = this.hitCanvas;
            hitCanvas.style.width = size.w + "px";
            hitCanvas.style.height = size.h + "px";
            hitCanvas.width = size.w;
            hitCanvas.height = size.h;
            this.hitCanvasBack.style.width = size.w + "px";
            this.hitCanvasBack.style.height = size.h + "px";
            this.hitCanvasBack.width = size.w;
            this.hitCanvasBack.height = size.h;
        }

        this.polygonCanvas.width = size.w;
        this.polygonCanvas.height = size.h;
        this.polygonCanvas.style.width = size.w + "px";
        this.polygonCanvas.style.height = size.h + "px";
    },

    /**
     * Method: getPointBounds
     * 获取一个点的bounds，其中考虑了点是图片的情况。
     */
    getPointBounds: function(feature, style, resolution) {
        resolution = resolution || this.map.getResolution();
        var geometry = feature.geometry;
        var geometryBounds;
        if(style.externalGraphic) {
            //bounds计算考虑旋转和偏移
            var picWidth = style.graphicWidth || style.graphicHeight;
            var picHeight = style.graphicHeight || style.graphicWidth;
            picWidth = picWidth ? picWidth : style.pointRadius*2;
            picHeight = picHeight ? picHeight : style.pointRadius*2;
            var xOffset = (style.graphicXOffset != undefined) ? style.graphicXOffset : -(0.5 * picWidth);
            var yOffset = (style.graphicYOffset != undefined) ? style.graphicYOffset : -(0.5 * picHeight);
            var left, right, top, bottom, sinAngle, cosAngle, rotation;

            if(style.rotation){
                rotation = style.rotation/180 * Math.PI;
                sinAngle = Math.sin(rotation);
                cosAngle = Math.cos(rotation);
            }
            //旋转引发的偏移
            if(rotation){
                //分别对四个顶点计算旋转和偏移，计算最终的bounds
                var newX, newY, point, points = [];
                points.push({x: xOffset, y: -yOffset});
                points.push({x: xOffset, y: -yOffset - picHeight});
                points.push({x: xOffset + picWidth, y: -yOffset - picHeight});
                points.push({x: xOffset + picWidth, y: -yOffset});
                //旋转，计算最后坐标
                for(var i = 0; i < 4; i++){
                    point = points[i];
                    newX = cosAngle * point.x + sinAngle * point.y;
                    newY = sinAngle * point.x - cosAngle * point.y;
                    points[i] = {x: newX, y: newY};
                }
                //计算边界值
                left = right = points[0].x;
                top = bottom = points[0].y;
                for(var j = 1; j < 4; j++){
                    if(left > points[j].x){
                        left = points[j].x;
                    }
                    if(points[j].x > right){
                        right = points[j].x;
                    }
                    if(top > points[j].y){
                        top = points[j].y;
                    }
                    if(points[j].y > bottom){
                        bottom = points[j].y;
                    }
                }
                //计算最终的地理坐标值
                left = geometry.x + left * resolution;
                right = geometry.x + right * resolution;
                top = geometry.y - top * resolution;
                bottom = geometry.y - bottom * resolution;

            }
            else{
                left = geometry.x + xOffset * resolution;
                right = left + picWidth * resolution;
                top = geometry.y - yOffset * resolution;
                bottom = top - picHeight * resolution;

            }
            geometryBounds = new SuperMap.Bounds(left, bottom, right, top);

        }else{
            //取得圆半径的地理半径.
            var pointWidth = 0;
            if(style.strokeWidth){pointWidth += style.strokeWidth;}
            if(style.pointRadius){pointWidth += style.pointRadius;}
            geometryBounds = new SuperMap.Bounds(geometry.x + (-pointWidth * resolution),
                geometry.y + (-pointWidth * resolution),
                geometry.x + (pointWidth * resolution),
                geometry.y + (pointWidth * resolution));
        }
        return geometryBounds;
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
    drawFeature: function(feature, style, option) {
        var rendered, renderedSelect, selectedFeature;
        //将option中的属性，变成局部变量。
        var isSelected = !!option && !!option.isSelected;
        var isNewAdd = !!option && !!option.isNewAdd;
        var isModify = !!option && !!option.isModify;

        if(feature.geometry == null || !feature.geometry.getBounds()) {
            return false;
        }

        if (feature.geometry) {
            //我们现在不让他跟默认的样式做叠加，因为这样太影响效率。
            //style = this.applyDefaultSymbolizer(style || feature.style);
            var bounds;
            if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
                bounds = this.getPointBounds(feature, style);
            } else {
                var bounds = feature.geometry.getBounds();
            }

            //intersects 描述是否和当前视图范围有相交。
            var worldBounds;
            if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
                worldBounds = this.map.getMaxExtent();
            }
            var intersects = bounds && bounds.intersectsBounds(this.extent, {worldBounds: worldBounds});

            //如果是新添加的当然就不需要判断是否要先清除了。
            //contains 描述是否当前feature包含于上一个视图范围。
            var contains = false;
            var clearFeature = false;
            if(!isNewAdd){
                contains = this.lastBounds.containsBounds(bounds);
                //需要重绘的是相交，但是非包含的feature。
                clearFeature = !contains && this.lastBounds.intersectsBounds(bounds) || isSelected;
            }

            //这个rendered变量是这样判断的：必须满足的条件是renderedSelect，在满足renderedSelect的前提下：
            //1.必须不包含于lastbounds; 2.isSelected(被选中的feature)；2.isNewAdd(新添加的feature)。
            renderedSelect = (style.display !== "none") && !!bounds && intersects;
            rendered = renderedSelect && !contains || (isSelected && renderedSelect) || (isNewAdd && renderedSelect);

            //如果是新加入的feature则加入到selectFeatures。
            //我们这个selectfeature对象在渲染器中一直保存着所有的feature，为了选择等功能使用。
            if(isNewAdd) {
                this.selectFeatures[feature.id] = [feature, style];
            }

            //我们这个features对象在渲染器中的作用是保存当前需要绘制的features
            //当绘制完成后就会清空。
            if (rendered) {
                this.features[feature.id] = [feature, style, clearFeature];
            } else {
                delete(this.features[feature.id]);
            }
            this.pendingRedraw = true;
        }
        if (this.pendingRedraw && !this.locked) {
            this.redraw(option);
            this.pendingRedraw = false;
        }
        return rendered;
    },

    /**
     * Method: setCanvasStyle
     * Prepare the canvas for drawing by setting various global settings.
     *
     * Parameters:
     * context-{Canvas} The canvas context object.
     * type - {String} one of 'stroke', 'fill', or 'reset'
     * style - {Object} Symbolizer hash
     */
    setCanvasStyle: function(context,type, style) {
        if (type === "fill") {
			if(style.fillColor instanceof CanvasGradient){
                context.globalAlpha = 1;
                context.fillStyle = style['fillColor'];
            } else {
                context.globalAlpha = style['fillOpacity'];
                context.fillStyle = style['fillColor'];
            }
        } else if (type === "stroke") {
            context.globalAlpha = style['strokeOpacity']||1;
            context.lineCap = style['strokeLinecap']||"butt";
            context.strokeStyle = style['strokeColor'];
            context.lineWidth = style['strokeWidth'];
        } else if (type === "clear") {
            context.globalAlpha = 1;
            context.fillStyle = "rgb(255, 255, 255)";
        } else{
            context.globalAlpha = 1;
            context.lineWidth = 1;
        }
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
        } else if (type === "stroke" && symbolizer) {
            this.hitContext.globalAlpha = 1.0;
            this.hitContext.strokeStyle = hex;
            // bump up stroke width to deal with antialiasing
            this.hitContext.lineWidth = symbolizer.strokeWidth + 2;
        } else {
            this.hitContext.globalAlpha = 1;
            this.hitContext.lineWidth = 1;
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
     * Method: drawGeometry
     * 在redraw中调用，用来遍历绘制每一个geometry。
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
     * 绘制点的扩展图片。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>}
     * style    - {Object}
     * featureId - {String}
     */
    drawExternalGraphic: function(geometry, style, featureId) {
        var img = new Image();

        if (style.graphicTitle) {
            img.title = style.graphicTitle;
        }

        var width = style.graphicWidth || style.graphicHeight;
        var height = style.graphicHeight || style.graphicWidth;
        width = width ? width : style.pointRadius * 2;
        height = height ? height : style.pointRadius * 2;
        var xOffset = (style.graphicXOffset != undefined) ?
            style.graphicXOffset : -(0.5 * width);
        var yOffset = (style.graphicYOffset != undefined) ?
            style.graphicYOffset : -(0.5 * height);

        var opacity = 1;
        var onLoad = function() {
            if(!this.selectFeatures[featureId]) {
                return;
            }
            var pt = this.getLocalXY(geometry);
            var p0 = pt[0];
            var p1 = pt[1];
            if(!isNaN(p0) && !isNaN(p1)) {
                var canvas = this.canvas;
                canvas.save();
                canvas.translate(p0, p1);
                var rotation;
                if(style.rotation){
                    rotation = style.rotation/180*Math.PI;
                }
                if(rotation) {
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
                    img, 0, 0, width*factor, height*factor
                );
                if (this.hitDetection) {
                    this.setHitContextStyle("fill", featureId);
                    this.hitContext.save();
                    this.hitContext.translate(p0, p1);
                    if(rotation) {
                        this.hitContext.rotate(rotation);
                    }
                    this.hitContext.translate(xOffset, yOffset);
                    this.hitContext.fillRect(0, 0, width, height);
                }
            }
            canvas.restore();
            this.hitContext.restore();

            this.setCanvasStyle(this.canvas,"reset");
            if(!style.externalGraphicSource){
                //因为这里我们的调用图片是异步地，所以要重新保存画布。
                this.externalGraphicCount--;
                if(this.externalGraphicCount == 0) this.restoreCanvas();
            }
            //style.externalGraphicSource = img;
        };
        if(style.externalGraphicSource){
            img = style.externalGraphicSource;
            onLoad.apply(this);
        }
        else{
            img.onload = SuperMap.Function.bind(onLoad, this);			
            img.src = style.externalGraphic;
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
            if(style.externalGraphic || style.externalGraphicSource) {
                this.drawExternalGraphic(geometry, style, featureId);
            }else if (style.graphicName && (style.graphicName != "circle")) {
                this.drawNamedSymbol(geometry, style, featureId);
            } else {
                var pt = this.getLocalXY(geometry);
                var p0 = parseInt(pt[0]);
                var p1 = parseInt(pt[1]);
                if(!isNaN(p0) && !isNaN(p1)) {
                    var radius = style.pointRadius;
                    var canvas = this.canvas;
                    canvas.beginPath();
                    canvas.arc(p0, p1, radius, 0, 6.283185307179586, true);
                    if(style.stroke !== false){
                        this.setCanvasStyle(this.canvas,"stroke", style);
                        canvas.stroke();
                    }
                    if(style.fill !== false) {
                        this.setCanvasStyle(this.canvas,"fill", style);
                        canvas.fill();
                    }
                    if (this.hitDetection) {
                        this.setHitContextStyle("fill", featureId, style);
                        var hitContext = this.hitContext;
                        hitContext.beginPath();
                        hitContext.arc(p0, p1, radius, 0, 6.283185307179586, true);
                        if(style.stroke !== false){
                            hitContext.stroke();
                        }
                        if(style.fill !== false) {
                            hitContext.fill();
                        }
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
            this.setCanvasStyle(this.canvas,"fill", style);
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
            this.setCanvasStyle(this.canvas,"stroke", style);
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
                this.setHitContextStyle("stroke", featureId, style, scaling);
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
        var fill = (style.fill !== false);
        var stroke = (style.stroke !== false);
        this.renderPath(this.canvas, geometry, style, featureId, {fill: fill, stroke: stroke});
        if (this.hitDetection) {
            this.renderPath(this.hitContext, geometry, style, featureId, {fill: fill, stroke: stroke},true);
        }
    },

    /**
     * Method: renderPath
     * Render a path with stroke and optional fill.
     */
    renderPath: function(context, geometry, style, featureId, type, hitDetection) {
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
            if (type.fill) {
                if(hitDetection){
                    this.setHitContextStyle('fill',featureId,style);
                }else{
                    if(style) {
                        this.setCanvasStyle(context,"fill", style);
                    }
                }
                context.fill();
            }
            if (type.stroke) {
                if(hitDetection){
                    this.setHitContextStyle('stroke',featureId,style);
                }else{
                    if(style) {
                        this.setCanvasStyle(context,"stroke", style);
                    }
                }
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
        if(len === 1)
        {
            this.drawLinearRing(components[0], style, featureId);
        }
        else
        {
            this.polygonContext.clearRect(0, 0, this.size.w, this.size.h);

            var fill = (style.fill !== false);
            var stroke = (style.stroke !== false);
            if(fill){
                this.renderPath(this.polygonContext, components[0],
                    SuperMap.Util.applyDefaults({ stroke:false,fillOpacity: 1.0}, style),
                    featureId, {fill: true});

                this.polygonContext.globalCompositeOperation = "xor";
                for(var i=1;i<len;++i)
                {
                    this.renderPath(this.polygonContext, components[i],
                        SuperMap.Util.applyDefaults({ stroke:false,fillOpacity: 1.0}, style),
                        featureId, {fill: true});
                }
                this.polygonContext.globalCompositeOperation = "source-over";

                var alpha = this.canvas.globalAlpha;
                this.canvas.globalAlpha = style.fillOpacity;
                this.canvas.drawImage(this.polygonCanvas, 0, 0);
                this.canvas.globalAlpha = alpha;
            }

            if(stroke){
                this.drawLinearRing(components[0], SuperMap.Util.applyDefaults({fill: false}, style), featureId);
                for(var i=1;i<len;++i)
                {
                    this.drawLinearRing(
                        components[i],
                        SuperMap.Util.applyDefaults({fill: false}, style),
                        featureId
                    );
                }
            }

            if (this.hitDetection) {
                for(var i=0;i<len;++i){
                    this.renderPath(this.hitContext, components[i], style, featureId, {fill: fill, stroke: stroke},true);
                }
            }
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
            pt[1] -=yOffset;
        }

        this.setCanvasStyle(this.canvas,"reset");
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
                    //this.canvas.fillText(labelRows[i], 0,  (lineHeight*i));
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
        this.setCanvasStyle(this.canvas,"reset");
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
        var x = ((point.x - this.featureDx) / resolution + (-extent.left / resolution));
        var y = ((extent.top / resolution) - point.y / resolution);
        return [x, y];
    },

    /**
     * Method: getLocalXY
     * 将本地像素坐标转换为地理坐标
     *
     * Parameters:
     * x - {Number} 本地像素坐标x值。
     * y - {Number} 本地像素坐标y值。
     *
     * Returns:
     * {<SuperMap.Geometry.Point} 地理坐标。
     */
    localToMap: function(x, y){
        var resolution = this.getResolution();
        var extent = this.extent;
        var pointX = x * resolution + this.featureDx + extent.left;
        var pointY = extent.top - y * resolution;
        return new SuperMap.Geometry.Point(pointX, pointY);
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
        this.selectFeatures = {};
        if (this.hitDetection) {
            this.hitContext.clearRect(0, 0, width, height);
            this.hitContextBack.clearRect(0, 0, width, height);
        }
        this.backCanvasContext.clearRect(0, 0, width, height);
        if (this.hitDetection){
            this.hitContextBack.clearRect(0, 0, width, height);
        }
    },

    clearFeatures: function(features) {
        this.features = {};
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
        var tempFeature = null;
        var feature = null;
        if (this.hitDetection) {
            // this dragging check should go in the feature handler
            if ( this.map && !this.map.dragging) {
                var xy = evt.xy;
                var x = xy.x | 0;
                var y = xy.y | 0;
                var data = this.hitContext.getImageData(x, y, 1, 1).data;
                if (data[3] === 255) { // antialiased
                    var id = data[2] + (256 * (data[1] + (256 * data[0])));
                    if (id) {
                        tempFeature = this.selectFeatures["SuperMap.Feature.Vector_" + (id - 1 + this.hitOverflow)];
                        if(tempFeature) {
                            feature = tempFeature[0];
                            //针对feature做判断,主要是因为叠加之后元素边缘颜色值不稳定导致选择出错
                            var bounds;
                            if(feature.geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
                                bounds = this.getPointBounds(feature, tempFeature[1]);
                            } else {
                                bounds = feature.geometry.getBounds();
                            }
                            var point = this.localToMap(x,y);

                            if(!bounds.contains(point.x,point.y)){
                                feature = null;
                            }
                        }
                        //这里认为不需要将选中的feature加入到features列表中。
                        //因为在调用drawfeature会自己加入。
                        // if(tempFeature){
                        // this.features[tempFeature[0].id] = [tempFeature[0], tempFeature[1]];
                        // }
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
    eraseFeatures: function(features, option) {
        if(!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        this.canvas.globalCompositeOperation = "destination-out";
        var toClearFeatures = {};
        for(var i=0, len=features.length; i<len; ++i) {
            var bounds = features[i].geometry.getBounds();
            //计算当前做清除的geometry的范围是否和当前视图相交。
            var intersects = bounds && bounds.intersectsBounds(this.extent);
            //如果这个geometry没有和当前视图有任何相交则我们不需要做任何清除的工作。
            if(intersects) {
                //获取这个feature的信息等。
                var feature = this.selectFeatures[features[i].id];
                var geometry = feature[0].geometry;
                var style = feature[1];

                var p1 = this.getLocalXY(new SuperMap.Geometry.Point(bounds.left, bounds.top));
                var p2 = this.getLocalXY(new SuperMap.Geometry.Point(bounds.right, bounds.bottom));

                this.canvas.clearRect(p1[0], p1[1], Math.abs(p2[0] - p1[0]), Math.abs(p2[1] - p1[1]));

                for(var hex in this.layer.features){
                    var feature2 = this.layer.features[hex];
                    //如果要清除/重绘的feature2已经在toClearFeatures对象中了，我们就不判断也不添加了。
                    if(!toClearFeatures[feature2.id]){
                        if(bounds.intersectsBounds(feature2.geometry.getBounds())) {
                            //因为这里我们已经把需要删除的features数组从featureGridList对象数组中删除了，
                            //所以我们就不用判断feature2是否在被清除的数组里面了。
                            //将要重新绘制的features
                            this.features[feature2.id] = [feature2, this.selectFeatures[feature2.id][1]];
                            //要清除的features
                            toClearFeatures[feature2.id] = [feature2, this.selectFeatures[feature2.id][1]];
                        }
                    }
                }

                //在查询出的分组中遍历所要重绘的。
                for(var row=startRow; row<=endRow; row++){
                    for(var col=startCol; col<=endCol; col++){
                        var key = row * layer.featuresGridColumn + col;
                        var featuresList = layer.featureGridList[key];
                        if(featuresList){
                            for(var id in featuresList) {
                                //feature2为要计算是否需要清除/重绘的feature。
                                var feature2 = featuresList[id];
                            }
                        }
                    }
                }

                if(!(option && option.forDisplay)){
                    delete this.selectFeatures[feature[0].id];
                }
            }
        }
        //清除重叠的feature
        for(var id in toClearFeatures) {
            var clearFeature = toClearFeatures[id];
            this.drawGeometry(clearFeature[0].geometry,
                SuperMap.Util.applyDefaults({fillOpacity: 1.0, stroke:false},  clearFeature[1]), clearFeature[0].id);
        }
        //还原canvas的混合绘制模式。
        this.canvas.globalCompositeOperation = "source-over";
        this.restoreCanvas();
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
    redraw: function(option) {
        if (this.locked) {
            return;
        }
        this.setCanvasStyle(this.canvas,"reset");
        var height = this.root.height;
        var width = this.root.width;
        this.canvas.clearRect(0, 0, width, height);
        if (this.hitDetection) {
            this.hitContext.clearRect(0, 0, width, height);
        }

        if(this.lastBounds){
            //var viewPortPx = this.map.getPixelFromLonLat(this.backCanvasPosition);       //getPixelFromLonLat改为getViewPortPxFromLayerPx，因为getPixelFromLonLat计算量大且有误差
            if(option&&option.isSelected){                                                 //当hover操作和平移同时发生的条件下，getViewPortPxFromLayerPx计算不准确，需强制置为0，0
                var viewPortPx = new SuperMap.Pixel(0,0);
            }
            else{
                var viewPortPx = this.map.getViewPortPxFromLayerPx(this.backCanvasPosition);
            }
            this.canvas.drawImage(this.backCanvas,viewPortPx.x, viewPortPx.y, this.size.w, this.size.h);
            if (this.hitDetection) {this.hitContext.drawImage(this.hitCanvasBack, viewPortPx.x, viewPortPx.y, this.size.w, this.size.h);}
        }

        this.labelMap = [];
        var feature, geometry, style, featureStyle;
        var worldBounds = (this.map.baseLayer && this.map.baseLayer.wrapDateLine) && this.map.getMaxExtent();
        this.externalGraphicCount = 0;
        var features = this.features;
        for(var id in features) {
            featureStyle = features[id];
            feature = featureStyle[0];
            style = featureStyle[1];

            geometry = feature.geometry;
            this.calculateFeatureDx(geometry.getBounds(), worldBounds);

            //bug 重现 examples_bug/vector_clover_ICL-786  三叶草性能优化时发现   1.绘制Canvas2图形 2.拖动绘制（图形部分）到视野外 3.再拖回来
            //if(featureStyle[2] && !style.externalGraphic && style.graphicName !== "clover" && style.graphicName !== "sector") {
            //    this.canvas.globalCompositeOperation = "destination-out";
            //    this.drawGeometry(geometry, SuperMap.Util.applyDefaults({fillOpacity: 1.0, strokeWidth: style.strokeWidth + 2},  style), feature.id);
            //    this.canvas.globalCompositeOperation = "source-over";
            //}

            if(style.externalGraphic && !style.externalGraphicSource && geometry.CLASS_NAME === "SuperMap.Geometry.Point"){
                this.externalGraphicCount++;
            }
            this.drawGeometry(geometry, style, feature.id);
            if(style.label) {
                this.labelMap.push([feature, style]);
            }

            if(style.stroke == true)
            {
                var className = geometry.CLASS_NAME;
                if ((className === "SuperMap.Geometry.Collection") ||
                    (className === "SuperMap.Geometry.MultiPolygon")) {
                    for (var i = 0; i < geometry.components.length; i++) {
                        this.drawLinearRing(geometry.components[i],SuperMap.Util.applyDefaults({fill: false},  style),feature.id);
                    }

                }
                switch (geometry.CLASS_NAME) {
                    case "SuperMap.Geometry.Polygon":
                        this.drawLinearRing(geometry.components[0],SuperMap.Util.applyDefaults({fill: false},  style),feature.id);
                        break;
                    default:
                        break;
                }

            }
            delete features[id];
        }
        this.addLabel(this.labelMap);
        this.restoreCanvas();
        this.canvas.globalCompositeOperation = "source-over";
		//this.canvas.globalCompositeOperation = "destination-over";
    },

    addLabel: function(labelMap) {
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
    },

    destroy: function() {
        this.transitionObj.destroy();
        this.transitionObj = null;
        SuperMap.Renderer.prototype.destroy.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.Renderer.Canvas2"
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
