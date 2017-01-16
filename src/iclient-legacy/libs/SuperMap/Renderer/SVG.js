/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer/Elements.js
 */

/**
 * Class: SuperMap.Renderer.SVG
 * 
 * Inherits:
 *  - <SuperMap.Renderer.Elements>
 */
SuperMap.Renderer.SVG = SuperMap.Class(SuperMap.Renderer.Elements, {

    /** 
     * Property: xmlns
     * {String}
     */
    xmlns: "http://www.w3.org/2000/svg",
    
    /**
     * Property: xlinkns
     * {String}
     */
    xlinkns: "http://www.w3.org/1999/xlink",

    /**
     * Constant: MAX_PIXEL
     * {Integer} Firefox has a limitation where values larger or smaller than  
     *           about 15000 in an SVG document lock the browser up. This 
     *           works around it.
     */
    MAX_PIXEL: 15000,

    /**
     * Property: translationParameters
     * {Object} Hash with "x" and "y" properties
     */
    translationParameters: null,
    
    /**
     * Property: symbolMetrics
     * {Object} Cache for symbol metrics according to their svg coordinate
     *     space. This is an object keyed by the symbol's id, and values are
     *     an array of [width, centerX, centerY].
     */
    symbolMetrics: null,
    
    /**
     * Constructor: SuperMap.Renderer.SVG
     * 
     * Parameters:
     * containerID - {String}
     */
    initialize: function(containerID) {
        if (!this.supported()) { 
            return; 
        }
        SuperMap.Renderer.Elements.prototype.initialize.apply(this, 
                                                                arguments);
        this.translationParameters = {x: 0, y: 0};
        
        this.symbolMetrics = {};
        if(SuperMap.Browser.name!=="firefox"){
            this.MAX_PIXEL=Infinity;
        }
        this.element = document.createElement('span');
    },

    /**
     * APIMethod: supported
     * 
     * Returns:
     * {Boolean} Whether or not the browser supports the SVG renderer
     */
    supported: function() {
        var svgFeature = "http://www.w3.org/TR/SVG11/feature#";
        return (document.implementation && 
           (document.implementation.hasFeature("org.w3c.svg", "1.0") || 
            document.implementation.hasFeature(svgFeature + "SVG", "1.1") || 
            document.implementation.hasFeature(svgFeature + "BasicStructure", "1.1") ));
    },

    clear:function(){
        SuperMap.Renderer.Elements.prototype.clear.call(this);
        if(this.defs){
            var child;
            while (child = this.defs.firstChild) {
                this.defs.removeChild(child);
            }
        }
    },

    /**
     * Method: inValidRange
     * See #669 for more information
     *
     * Parameters:
     * x      - {Integer}
     * y      - {Integer}
     * xyOnly - {Boolean} whether or not to just check for x and y, which means
     *     to not take the current translation parameters into account if true.
     * 
     * Returns:
     * {Boolean} Whether or not the 'x' and 'y' coordinates are in the  
     *           valid range.
     */ 
    inValidRange: function(x, y, xyOnly) {
        var left = x + (xyOnly ? 0 : this.translationParameters.x);
        var top = y + (xyOnly ? 0 : this.translationParameters.y);
        return (left >= -this.MAX_PIXEL && left <= this.MAX_PIXEL &&
                top >= -this.MAX_PIXEL && top <= this.MAX_PIXEL);
    },

    /**
     * Method: setExtent
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
        SuperMap.Renderer.Elements.prototype.setExtent.apply(this, 
                                                               arguments);
        
        var resolution = this.getResolution();
        var left = -extent.left / resolution;
        var top = extent.top / resolution;

        // If the resolution has changed, start over changing the corner, because
        // the features will redraw.
        if (resolutionChanged) {
            this.left = left;
            this.top = top;
            // Set the viewbox
            var extentString = "0 0 " + this.size.w + " " + this.size.h;

            this.rendererRoot.setAttributeNS(null, "viewBox", extentString);
            this.translate(0, 0);
            return true;
        } else {
            var inRange = this.translate(left - this.left, top - this.top);
            if (!inRange) {
                // recenter the coordinate system
                this.setExtent(extent, true);
            }
            return inRange;
        }
    },
    
    /**
     * Method: translate
     * Transforms the SVG coordinate system
     * 
     * Parameters:
     * x - {Float}
     * y - {Float}
     * 
     * Returns:
     * {Boolean} true if the translation parameters are in the valid coordinates
     *     range, false otherwise.
     */
    translate: function(x, y) {
        if (!this.inValidRange(x, y, true)) {
            return false;
        } else {
            var transformString = "";
            if (x || y) {
                transformString = "translate(" + x + "," + y + ")";
            }
            this.root.setAttributeNS(null, "transform", transformString);
            this.translationParameters = {x: x, y: y};
            return true;
        }
    },

    /**
     * Method: setSize
     * Sets the size of the drawing surface.
     * 
     * Parameters:
     * size - {<SuperMap.Size>} The size of the drawing surface
     */
    setSize: function(size) {
        SuperMap.Renderer.prototype.setSize.apply(this, arguments);
        
        this.rendererRoot.setAttributeNS(null, "width", this.size.w);
        this.rendererRoot.setAttributeNS(null, "height", this.size.h);
    },

    /** 
     * Method: getNodeType 
     * 
     * Parameters:
     * geometry - {<SuperMap.Geometry>}
     * style - {Object}
     * 
     * Returns:
     * {String} The corresponding node type for the specified geometry
     */
    getNodeType: function(geometry, style) {
        var nodeType = null;
        if(SuperMap.Geometry.LinearRing && (geometry instanceof SuperMap.Geometry.LinearRing)){
            nodeType = "polygon";
        }
//        else if(SuperMap.REST.Route && (geometry instanceof SuperMap.REST.Route)){
//            nodeType = "polyline";
//        }
        else if(SuperMap.Geometry.LineString && (geometry instanceof SuperMap.Geometry.LineString)){
            nodeType = "polyline";
        }
        else if(SuperMap.Geometry.Curve && (geometry instanceof SuperMap.Geometry.Curve)){
            nodeType = "path";
        }
        else if(SuperMap.Geometry.Polygon && (geometry instanceof SuperMap.Geometry.Polygon)){
            nodeType = "path";
        }
        else if(SuperMap.Geometry.Point && (geometry instanceof SuperMap.Geometry.Point)){
            if (style.externalGraphic) {
                nodeType = "image";
            } else if (this.isComplexSymbol(style.graphicName)) {
                nodeType = "svg";
            } else {
                nodeType = "circle";
            }
        }
        else if(SuperMap.Geometry.Rectangle && (geometry instanceof SuperMap.Geometry.Rectangle)){
            nodeType = "rect";
        }

        return nodeType;
    },

    /** 
     * Method: setStyle
     * Use to set all the style attributes to a SVG node.
     * 
     * Takes care to adjust stroke width and point radius to be
     * resolution-relative
     *
     * Parameters:
     * node - {SVGDomElement} An SVG element to decorate
     * style - {Object}
     * options - {Object} Currently supported options include 
     *                              'isFilled' {Boolean} and
     *                              'isStroked' {Boolean}
     */
    setStyle: function(node, style, options,geometry) {
        style = style  || node._style;
        options = options || node._options;
        //面对象style为false是也可以被选中
        if(node._geometryClass == "SuperMap.Geometry.Polygon" && options.isFilled == false) {
            var fillOpacity = style.fillOpacity;
            style.fillOpacity = 0;
            options.isFilled = true;
        }
        var r = parseFloat(node.getAttributeNS(null, "r"));
        var widthFactor = 1;
        var pos;
        if (node._geometryClass === "SuperMap.Geometry.Point" && r) {
            node.style.visibility = "";
            if (style.graphic === false) {
                node.style.visibility = "hidden";
            } else if (style.externalGraphic) {
                pos = this.getPosition(node);
                
                if (style.graphicTitle) {
                    node.setAttributeNS(null, "title", style.graphicTitle);
                    //Standards-conformant SVG
                    var label = this.nodeFactory(null, "title");
                    label.textContent = style.graphicTitle;
                    node.appendChild(label);
                }
                if (style.graphicWidth && style.graphicHeight) {
                  node.setAttributeNS(null, "preserveAspectRatio", "none");
                }
                var width = style.graphicWidth || style.graphicHeight;
                var height = style.graphicHeight || style.graphicWidth;
                width = width ? width : style.pointRadius*2;
                height = height ? height : style.pointRadius*2;
                var xOffset = (style.graphicXOffset != undefined) ?
                    style.graphicXOffset : -(0.5 * width);
                var yOffset = (style.graphicYOffset != undefined) ?
                    style.graphicYOffset : -(0.5 * height);

                var opacity = style.graphicOpacity || style.fillOpacity;
                
                node.setAttributeNS(null, "x", (pos.x + xOffset).toFixed());
                node.setAttributeNS(null, "y", (pos.y + yOffset).toFixed());
                node.setAttributeNS(null, "width", width);
                node.setAttributeNS(null, "height", height);
                node.setAttributeNS(this.xlinkns, "href", style.externalGraphic);
                node.setAttributeNS(null, "style", "opacity: "+opacity);
                node.onclick = SuperMap.Renderer.SVG.preventDefault;
            } else if (this.isComplexSymbol(style.graphicName)) {
                // the symbol viewBox is three times as large as the symbol
                var offset = style.pointRadius * 3;
                var size = offset * 2;
                var src = this.importSymbol(style.graphicName);
                pos = this.getPosition(node);
                widthFactor = this.symbolMetrics[src.id][0] * 3 / size;
                
                // remove the node from the dom before we modify it. This
                // prevents various rendering issues in Safari and FF
                var parent = node.parentNode;
                var nextSibling = node.nextSibling;
                if(parent) {
                    parent.removeChild(node);
                }
                
                // The more appropriate way to implement this would be use/defs,
                // but due to various issues in several browsers, it is safer to
                // copy the symbols instead of referencing them. 
                // See e.g. ticket http://trac.osgeo.org/SuperMap/ticket/2985 
                // and this email thread
                // http://osgeo-org.1803224.n2.nabble.com/Select-Control-Ctrl-click-on-Feature-with-a-graphicName-opens-new-browser-window-tc5846039.html
                node.firstChild && node.removeChild(node.firstChild);
                node.appendChild(src.firstChild.cloneNode(true));
                node.setAttributeNS(null, "viewBox", src.getAttributeNS(null, "viewBox"));
                
                node.setAttributeNS(null, "width", size);
                node.setAttributeNS(null, "height", size);
                node.setAttributeNS(null, "x", pos.x - offset);
                node.setAttributeNS(null, "y", pos.y - offset);
                
                // now that the node has all its new properties, insert it
                // back into the dom where it was
                if(nextSibling) {
                    parent.insertBefore(node, nextSibling);
                } else if(parent) {
                    parent.appendChild(node);
                }
            } else {
                node.setAttributeNS(null, "r", style.pointRadius);
            }

            var rotation = style.rotation;
            
            if ((rotation !== undefined || node._rotation !== undefined) && pos) {
                node._rotation = rotation;
                rotation |= 0;
                if (node.nodeName !== "svg") { 
                    node.setAttributeNS(null, "transform", 
                        "rotate(" + rotation + " " + pos.x + " " + 
                        pos.y + ")"); 
                } else {
                    var metrics = this.symbolMetrics[src.id];
                    node.firstChild.setAttributeNS(null, "transform", "rotate(" 
                        + rotation + " " 
                        + metrics[1] + " "
                        + metrics[2] + ")");
                }
            }
        }
        
        if (options.isFilled) {
            var fillColor=style.fillColor;
            if(fillColor instanceof SuperMap.Style.Gradient){
                var gradientId=this.createGradient(fillColor,geometry.id);
                if(gradientId){
                    fillColor="url(#"+gradientId+")";
                    node.setAttributeNS(null, "style", "fill:"+fillColor);
                    node.style.fill=fillColor;
                }
            }else{
                node.setAttributeNS(null, "fill", fillColor);
				node.setAttributeNS(null, "fill-opacity", style.fillOpacity);
            }
        } else {
            node.setAttributeNS(null, "fill", "none");
        }

        if (options.isStroked) {
            var strokeColor=style.strokeColor;
            if(strokeColor instanceof SuperMap.Style.Gradient) {
                var gradientId=this.createGradient(strokeColor, geometry.id);
                if(gradientId){
                    strokeColor = "url(#" + gradientId + ")";
                    node.setAttributeNS(null, "style", "stroke:" + strokeColor);
                    node.style.stroke = strokeColor;
                }
            }else{
                node.setAttributeNS(null, "stroke", style.strokeColor);
            }
            node.setAttributeNS(null, "stroke-opacity", style.strokeOpacity);
            node.setAttributeNS(null, "stroke-width", style.strokeWidth * widthFactor);
            node.setAttributeNS(null, "stroke-linecap", style.strokeLinecap || "round");
            // Hard-coded linejoin for now, to make it look the same as in VML.
            // There is no strokeLinejoin property yet for symbolizers.
            node.setAttributeNS(null, "stroke-linejoin", "round");
            style.strokeDashstyle && node.setAttributeNS(null,
                "stroke-dasharray", this.dashStyle(style, widthFactor));
        } else {
            node.setAttributeNS(null, "stroke", "none");
        }
        
        if (style.pointerEvents) {
            node.setAttributeNS(null, "pointer-events", style.pointerEvents);
            node.style.pointerEvents = style.pointerEvents;
        }
        else{
            node.setAttributeNS(null, "pointer-events","visiblepainted");
            node.style.pointerEvents = "visiblepainted";
        }
                
        if (style.cursor != null) {
            node.setAttributeNS(null, "cursor", style.cursor);
        }
        if(fillOpacity) {
            style.fillOpacity = fillOpacity;
            options.isFilled = false;
            fillOpacity = "";
        }
        return node;
    },

    /**
     * Method: dashStyle
     *
     * Parameters:
     * style - {Object}
     * widthFactor - {Number}
     *
     * Returns:
     * {String} A SVG compliant 'stroke-dasharray' value
     */
    dashStyle: function(style, widthFactor) {
        var w = style.strokeWidth * widthFactor;
        var str = style.strokeDashstyle;
        switch (str) {
            case 'solid':
                return 'none';
            case 'dot':
                return [1, 4 * w].join();
            case 'dash':
                return [4 * w, 4 * w].join();
            case 'dashdot':
                return [4 * w, 4 * w, 1, 4 * w].join();
            case 'longdash':
                return [8 * w, 4 * w].join();
            case 'longdashdot':
                return [8 * w, 4 * w, 1, 4 * w].join();
            default:
                return SuperMap.String.trim(str).replace(/\s+/g, ",");
        }
    },

    /**
     * Method: createNode
     *
     * Parameters:
     * type - {String} Kind of node to draw
     * id - {String} Id for node
     *
     * Returns:
     * {DOMElement} A new node of the given type and id
     */
    createNode: function(type, id) {
        var node = document.createElementNS(this.xmlns, type);
        if (id) {
            node.setAttributeNS(null, "id", id);
        }
        return node;    
    },
    
    /** 
     * Method: nodeTypeCompare
     * 
     * Parameters:
     * node - {SVGDomElement} An SVG element
     * type - {String} Kind of node
     * 
     * Returns:
     * {Boolean} Whether or not the specified node is of the specified type
     */
    nodeTypeCompare: function(node, type) {
        return (type === node.nodeName);
    },
   
    /**
     * Method: createRenderRoot
     * 
     * Returns:
     * {DOMElement} The specific render engine's root element
     */
    createRenderRoot: function() {
        var svg = this.nodeFactory(this.container.id + "_svgRoot", "svg");
        svg.style.display = "block";
        return svg;
    },

    /**
     * Method: createRoot
     * 
     * Parameter:
     * suffix - {String} suffix to append to the id
     * 
     * Returns:
     * {DOMElement}
     */
    createRoot: function(suffix) {
        return this.nodeFactory(this.container.id + suffix, "g");
    },

    /**
     * Method: createDefs
     *
     * Returns:
     * {DOMElement} The element to which we'll add the symbol definitions
     */
    createDefs: function() {
        var defs = this.nodeFactory(this.container.id + "_defs", "defs");
        this.rendererRoot.appendChild(defs);
        return defs;
    },

    /**************************************
     *                                    *
     *     GEOMETRY DRAWING FUNCTIONS     *
     *                                    *
     **************************************/

    /**
     * Method: drawPoint
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the point
     */ 
    drawPoint: function(node, geometry) {
        return this.drawCircle(node, geometry, 1);
    },

    /**
     * Method: drawCircle
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * radius - {Float}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the circle
     */
    drawCircle: function(node, geometry, radius) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - geometry.y / resolution);

        if (this.inValidRange(x, y)) { 
            node.setAttributeNS(null, "cx", x);
            node.setAttributeNS(null, "cy", y);
            node.setAttributeNS(null, "r", radius);
            return node;
        } else {
            return false;
        }    
            
    },
    
    /**
     * Method: drawLineString
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components of
     *     the linestring, or false if nothing could be drawn
     */ 
    drawLineString: function(node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null);  
        } else {
            return false;
        }
    },
    
    /**
     * Method: drawLinearRing
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components
     *     of the linear ring, or false if nothing could be drawn
     */ 
    drawLinearRing: function(node, geometry) {
        var componentsResult = this.getComponentsString(geometry.components);
        if (componentsResult.path) {
            node.setAttributeNS(null, "points", componentsResult.path);
            return (componentsResult.complete ? node : null);  
        } else {
            return false;
        }
    },
    
    /**
     * Method: drawPolygon
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * 
     * Returns:
     * {DOMElement} or null if the renderer could not draw all components
     *     of the polygon, or false if nothing could be drawn
     */ 
    drawPolygon: function(node, geometry) {
        var d = "";
        var draw = true;
        var complete = true;
        var linearRingResult, path;
        for (var j=0, len=geometry.components.length; j<len; j++) {
            d += " M";
            linearRingResult = this.getComponentsString(
                geometry.components[j].components, " ");
            path = linearRingResult.path;
            if (path) {
                d += " " + path;
                complete = linearRingResult.complete && complete;
            } else {
                draw = false;
            }
        }
        d += " z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            node.setAttributeNS(null, "fill-rule", "evenodd");
            return complete ? node : null;
        } else {
            return false;
        }    
    },
    
    /**
     * Method: drawRectangle
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the rectangle
     */ 
    drawRectangle: function(node, geometry) {
        var resolution = this.getResolution();
        var x = (geometry.x / resolution + this.left);
        var y = (this.top - (geometry.y + geometry.height)/ resolution);

        if (this.inValidRange(x, y)) { 
            node.setAttributeNS(null, "x", x);
            node.setAttributeNS(null, "y", y);
            node.setAttributeNS(null, "width", geometry.width / resolution);
            node.setAttributeNS(null, "height", geometry.height / resolution);
            return node;
        } else {
            return false;
        }
    },
    
    /**
     * Method: drawSurface
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * node - {DOMElement}
     * geometry - {<SuperMap.Geometry>}
     * 
     * Returns:
     * {DOMElement} or false if the renderer could not draw the surface
     */ 
    drawSurface: function(node, geometry) {

        // create the svg path string representation
        var d = null;
        var draw = true;
        for (var i=0, len=geometry.components.length; i<len; i++) {
            if ((i%3) == 0 && (i/3) == 0) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) { draw = false; }
                d = "M " + component;
            } else if ((i%3) === 1) {
                var component = this.getShortString(geometry.components[i]);
                if (!component) { draw = false; }
                d += " C " + component;
            } else {
                var component = this.getShortString(geometry.components[i]);
                if (!component) { draw = false; }
                d += " " + component;
            }
        }
        d += " Z";
        if (draw) {
            node.setAttributeNS(null, "d", d);
            return node;
        } else {
            return false;
        }    
    },
    
    /**
     * Method: drawText
     * This method is only called by the renderer itself.
     *
     * Parameters:
     * featureId - {String}
     * style -
     * location - {<SuperMap.Geometry.Point>}
     */
    drawText: function(featureId, style, location) {
        var resolution = this.getResolution();

        var x = (location.x / resolution + this.left);

        //IE 浏览器，SVG渲染方式下baseline-shift属性不起效，导致文本位置有向上偏移的效果，
        //为了使标签的位置正确，当浏览器为ie时，在y轴上进行一个下偏移。
        var y,
            browerName = SuperMap.Browser.name;
        if (browerName === "msie") {
            if(!style.fontSize)style.fontSize = 12;
            var baseline_shift_offset = parseFloat(style.fontSize)*0.35;
            y = (location.y / resolution - this.top) - baseline_shift_offset;

        }
        else{
            y = (location.y / resolution - this.top);
        }
        //var y = (location.y / resolution - this.top);

        var label = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX, "text");

        label.setAttributeNS(null, "x", x);
        label.setAttributeNS(null, "y", -y);

        //添加svg的属性值
        if (style.display) {
            label.setAttributeNS(null, "display", style.display);
        }

        if (style.fontStroke === true) {
            if (style.fontStrokeColor) {
                label.setAttributeNS(null, "stroke", style.fontStrokeColor);
            }
            if (style.fontStrokeWidth) {
                label.setAttributeNS(null, "stroke-width", style.fontStrokeWidth);
            }
        }

        if (style.labelRotation) {
            label.setAttributeNS(null, "transform", "rotate(" + style.labelRotation + " " + x + ","+ (-y) +")" );
        }

        if (style.fontColor) {
            label.setAttributeNS(null, "fill", style.fontColor);
        }
        if (style.fontOpacity) {
            label.setAttributeNS(null, "opacity", style.fontOpacity);
        }
        if (style.fontFamily) {
            label.setAttributeNS(null, "font-family", style.fontFamily);
        }
        if (style.fontSize) {
            label.setAttributeNS(null, "font-size", style.fontSize);
        }
        if (style.fontWeight) {
            label.setAttributeNS(null, "font-weight", style.fontWeight);
        }
        if (style.fontStyle) {
            label.setAttributeNS(null, "font-style", style.fontStyle);
        }
        if (style.labelSelect === true) {
            label.setAttributeNS(null, "pointer-events", "visible");
            label._featureId = featureId;
        } else {
            label.setAttributeNS(null, "pointer-events", "none");
        }
        var align = style.labelAlign || "cm";
        label.setAttributeNS(null, "text-anchor",
            SuperMap.Renderer.SVG.LABEL_ALIGN[align[0]] || "middle");

        if (SuperMap.IS_GECKO === true) {
            label.setAttributeNS(null, "dominant-baseline",
                SuperMap.Renderer.SVG.LABEL_ALIGN[align[1]] || "central");
        }

        var labelRows = style.label.split('\n');
        var numRows = labelRows.length;
        while (label.childNodes.length > numRows) {
            label.removeChild(label.lastChild);
        }
        for (var i = 0; i < numRows; i++) {
            var tspan = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX + "_tspan_" + i, "tspan");
            if (style.labelSelect === true) {
                tspan._featureId = featureId;
                tspan._geometry = location;
                tspan._geometryClass = location.CLASS_NAME;
            }
            if (SuperMap.IS_GECKO === false) {
                tspan.setAttributeNS(null, "baseline-shift",
                    SuperMap.Renderer.SVG.LABEL_VSHIFT[align[1]] || "-35%");
            }
            tspan.setAttribute("x", x);
            if (i == 0) {
                var vfactor = SuperMap.Renderer.SVG.LABEL_VFACTOR[align[1]];
                if (vfactor == null) {
                     vfactor = -.5;
                }
                tspan.setAttribute("dy", (vfactor*(numRows-1)) + "em");
            } else {
                tspan.setAttribute("dy", "1em");
            }
            var labelContent=(labelRows[i] === '') ? ' ' : labelRows[i];
            if(style.isUnicode){
                if(browerName == 'msie') {
                    this.element.innerHTML = labelContent;
                    tspan.textContent = this.element.innerHTML;
                } else {
                    tspan.innerHTML = labelContent;
                }

            }else{
                tspan.textContent = labelContent;
            }
            if (!tspan.parentNode) {
                label.appendChild(tspan);
            }
        }

        if (!label.parentNode) {
            this.textRoot.appendChild(label);
        }
    },
    
    /** 
     * Method: getComponentString
     * 
     * Parameters:
     * components - {Array(<SuperMap.Geometry.Point>)} Array of points
     * separator - {String} character between coordinate pairs. Defaults to ","
     * 
     * Returns:
     * {Object} hash with properties "path" (the string created from the
     *     components and "complete" (false if the renderer was unable to
     *     draw all components)
     */
    getComponentsString: function(components, separator) {
        var renderCmp = [];
        var complete = true;
        var len = components.length;
        var strings = [];
        var str, component;
        for(var i=0; i<len; i++) {
            component = components[i];
            renderCmp.push(component);
            str = this.getShortString(component);
            if (str) {
                strings.push(str);
            } else {
                // The current component is outside the valid range. Let's
                // see if the previous or next component is inside the range.
                // If so, add the coordinate of the intersection with the
                // valid range bounds.
                if (i > 0) {
                    if (this.getShortString(components[i - 1])) {
                        strings.push(this.clipLine(components[i],
                            components[i-1]));
                    }
                }
                if (i < len - 1) {
                    if (this.getShortString(components[i + 1])) {
                        strings.push(this.clipLine(components[i],
                            components[i+1]));
                    }
                }
                complete = false;
            }
        }

        return {
            path: strings.join(separator || ","),
            complete: complete
        };
    },
    
    /**
     * Method: clipLine
     * Given two points (one inside the valid range, and one outside),
     * clips the line betweeen the two points so that the new points are both
     * inside the valid range.
     * 
     * Parameters:
     * badComponent - {<SuperMap.Geometry.Point>} original geometry of the
     *     invalid point
     * goodComponent - {<SuperMap.Geometry.Point>} original geometry of the
     *     valid point
     * Returns
     * {String} the SVG coordinate pair of the clipped point (like
     *     getShortString), or an empty string if both passed componets are at
     *     the same point.
     */
    clipLine: function(badComponent, goodComponent) {
        if (goodComponent.equals(badComponent)) {
            return "";
        }
        var resolution = this.getResolution();
        var maxX = this.MAX_PIXEL - this.translationParameters.x;
        var maxY = this.MAX_PIXEL - this.translationParameters.y;
        var x1 = goodComponent.x / resolution + this.left;
        var y1 = this.top - goodComponent.y / resolution;
        var x2 = badComponent.x / resolution + this.left;
        var y2 = this.top - badComponent.y / resolution;
        var k;
        if (x2 < -maxX || x2 > maxX) {
            k = (y2 - y1) / (x2 - x1);
            x2 = x2 < 0 ? -maxX : maxX;
            y2 = y1 + (x2 - x1) * k;
        }
        if (y2 < -maxY || y2 > maxY) {
            k = (x2 - x1) / (y2 - y1);
            y2 = y2 < 0 ? -maxY : maxY;
            x2 = x1 + (y2 - y1) * k;
        }
        return x2 + "," + y2;
    },

    /** 
     * Method: getShortString
     * 
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}
     * 
     * Returns:
     * {String} or false if point is outside the valid range
     */
    getShortString: function(point) {
        var resolution = this.getResolution();
        var x = (point.x / resolution + this.left);
        var y = (this.top - point.y / resolution);

        if (this.inValidRange(x, y)) { 
            return x + "," + y;
        } else {
            return false;
        }
    },
    
    /**
     * Method: getPosition
     * Finds the position of an svg node.
     * 
     * Parameters:
     * node - {DOMElement}
     * 
     * Returns:
     * {Object} hash with x and y properties, representing the coordinates
     *     within the svg coordinate system
     */
    getPosition: function(node) {
        return({
            x: parseFloat(node.getAttributeNS(null, "cx")),
            y: parseFloat(node.getAttributeNS(null, "cy"))
        });
    },

    /**
     * Method: importSymbol
     * add a new symbol definition from the rendererer's symbol hash
     * 
     * Parameters:
     * graphicName - {String} name of the symbol to import
     * 
     * Returns:
     * {DOMElement} - the imported symbol
     */      
    importSymbol: function (graphicName)  {
        if (!this.defs) {
            // create svg defs tag
            this.defs = this.createDefs();
        }
        var id = this.container.id + "-" + graphicName;
        
        // check if symbol already exists in the defs
        var existing = document.getElementById(id)
        if (existing != null) {
            return existing;
        }
        
        var symbol = SuperMap.Renderer.symbol[graphicName];
        if (!symbol) {
            throw new Error(graphicName + ' is not a valid symbol name');
        }

        var symbolNode = this.nodeFactory(id, "symbol");
        var node = this.nodeFactory(null, "polygon");
        symbolNode.appendChild(node);
        var symbolExtent = new SuperMap.Bounds(
                                    Number.MAX_VALUE, Number.MAX_VALUE, 0, 0);

        var points = [];
        var x,y;
        for (var i=0; i<symbol.length; i=i+2) {
            x = symbol[i];
            y = symbol[i+1];
            symbolExtent.left = Math.min(symbolExtent.left, x);
            symbolExtent.bottom = Math.min(symbolExtent.bottom, y);
            symbolExtent.right = Math.max(symbolExtent.right, x);
            symbolExtent.top = Math.max(symbolExtent.top, y);
            points.push(x, ",", y);
        }
        
        node.setAttributeNS(null, "points", points.join(" "));
        
        var width = symbolExtent.getWidth();
        var height = symbolExtent.getHeight();
        // create a viewBox three times as large as the symbol itself,
        // to allow for strokeWidth being displayed correctly at the corners.
        var viewBox = [symbolExtent.left - width,
                        symbolExtent.bottom - height, width * 3, height * 3];
        symbolNode.setAttributeNS(null, "viewBox", viewBox.join(" "));
        this.symbolMetrics[id] = [
            Math.max(width, height),
            symbolExtent.getCenterLonLat().lon,
            symbolExtent.getCenterLonLat().lat
        ];
        
        this.defs.appendChild(symbolNode);
        return symbolNode;
    },

    createGradient:function(fill,geometryId){
        if (!this.defs) {
            // create svg defs tag
            this.defs = this.createDefs();
        }
        var node,nodeId;

        if(fill instanceof SuperMap.Style.LinearGradient){
            nodeId=geometryId+"_linearGradient";
            node = SuperMap.Util.getElement(nodeId);
            if(node){
				for(var i= 0,len = fill.colorStops.length;i<len;i++){
                    var colorStop = fill.colorStops[i];
                    var stopNode = node.childNodes[i];
                    var style = "stop-color:"+colorStop.color+";stop-opacity:"+colorStop.opacity;
                    stopNode.style.StopColor = colorStop.color;
                    stopNode.style.StopOpacity = colorStop.opacity;
                    stopNode.setAttributeNS(null,"style",style);
                }

                return nodeId;
            }
            node=this.nodeFactory(nodeId, "linearGradient");
            node.setAttributeNS(null,"x1",fill.x1);
            node.setAttributeNS(null,"y1",fill.y1);
            node.setAttributeNS(null,"x2",fill.x2);
            node.setAttributeNS(null,"y2",fill.y2);
        }else if(fill instanceof SuperMap.Style.RadialGradient){
            nodeId=geometryId+"_radialGradient";
            node = SuperMap.Util.getElement(nodeId);
            if(node){
				for(var i= 0,len = fill.colorStops.length;i<len;i++){
                    var colorStop = fill.colorStops[i];
                    var stopNode = node.childNodes[i];
                    var style = "stop-color:"+colorStop.color+";stop-opacity:"+colorStop.opacity;
                    stopNode.style.StopColor = colorStop.color;
                    stopNode.style.StopOpacity = colorStop.opacity;
                    stopNode.setAttributeNS(null,"style",style);
                }
                return nodeId;
            }
            node=this.nodeFactory(nodeId, "radialGradient");
            node.setAttributeNS(null,"cx",fill.cx);
            node.setAttributeNS(null,"cy",fill.cy);
            node.setAttributeNS(null,"r",fill.radius);
            node.setAttributeNS(null,"fx",fill.fx);
            node.setAttributeNS(null,"fy",fill.fy);
        }else{
            return;
        }
        var colorStops=fill.colorStops;
        for(var i= 0,len=colorStops.length;i<len;i++){
            var colorStop=colorStops[i];
            var stopNode=this.nodeFactory(null,"stop");
            stopNode.setAttributeNS(null,"offset",colorStop.offset);
            var style="stop-color:"+colorStop.color+";stop-opacity:"+colorStop.opacity;
            stopNode.style.StopColor=colorStop.color;
            stopNode.style.StopOpacity=colorStop.opacity;
            stopNode.setAttributeNS(null,"style",style);
            node.appendChild(stopNode);
        }
        this.defs.appendChild(node);
        return nodeId;
    },
    
    /**
     * Method: getFeatureIdFromEvent
     * 
     * Parameters:
     * evt - {Object} An <SuperMap.Event> object
     *
     * Returns:
     * {<SuperMap.Geometry>} A geometry from an event that 
     *     happened on a layer.
     */
    getFeatureIdFromEvent: function(evt) {
        var featureId = SuperMap.Renderer.Elements.prototype.getFeatureIdFromEvent.apply(this, arguments);
        if(!featureId) {
            var target = evt.target;
            featureId = target.parentNode && target !== this.rendererRoot &&
                target.parentNode._featureId;
        }
        return featureId;
    },
	
    CLASS_NAME: "SuperMap.Renderer.SVG"
});

/**
 * Constant: SuperMap.Renderer.SVG.LABEL_ALIGN
 * {Object}
 */
SuperMap.Renderer.SVG.LABEL_ALIGN = {
    "l": "start",
    "r": "end",
    "b": "bottom",
    "t": "hanging"
};

/**
 * Constant: SuperMap.Renderer.SVG.LABEL_VSHIFT
 * {Object}
 */
SuperMap.Renderer.SVG.LABEL_VSHIFT = {
    // according to
    // http://www.w3.org/Graphics/SVG/Test/20061213/htmlObjectHarness/full-text-align-02-b.html
    // a baseline-shift of -70% shifts the text exactly from the
    // bottom to the top of the baseline, so -35% moves the text to
    // the center of the baseline.
    "t": "-70%",
    "b": "0"    
};

/**
 * Constant: SuperMap.Renderer.SVG.LABEL_VFACTOR
 * {Object}
 */
SuperMap.Renderer.SVG.LABEL_VFACTOR = {
    "t": 0,
    "b": -1
};

/**
 * Function: SuperMap.Renderer.SVG.preventDefault
 * Used to prevent default events (especially opening images in a new tab on
 * ctrl-click) from being executed for externalGraphic symbols
 */
SuperMap.Renderer.SVG.preventDefault = function(e) {
    e.preventDefault && e.preventDefault();
};
