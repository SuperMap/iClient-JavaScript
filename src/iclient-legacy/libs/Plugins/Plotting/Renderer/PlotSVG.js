/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer/Elements.js
 * @requires SuperMap/Renderer/SVG.js
 */

/**
 * Class: SuperMap.Renderer.PlotSVG
 * 
 * Inherits:
 *  - <SuperMap.Renderer.SVG>
 */
SuperMap.Renderer.PlotSVG = SuperMap.Class(SuperMap.Renderer.SVG, {

    /**
     * Constructor: SuperMap.Renderer.PlotSVG
     * 
     * Parameters:
     * containerID - {String}
     */
    initialize: function(containerID) {
        SuperMap.Renderer.SVG.prototype.initialize.apply(this, arguments);
    },

    /**
     * Method: drawGeometry
     * Draw the geometry, creating new nodes, setting paths, setting style,
     *     setting featureId on the node.  This method should only be called
     *     by the renderer itself.
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>}
     * style - {Object}
     * featureId - {String}
     *
     * Returns:
     * {Boolean} true if the geometry has been drawn completely; null if
     *     incomplete; false otherwise
     */
    drawGeometry: function(geometry, style, featureId) {
        function reDrawSurroundLine(geometry, featureStyle){
            var reDrawSurroundLineFlag = false;

            if(geometry.symbolType !== SuperMap.Plot.SymbolType.DOTSYMBOL && (geometry.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.INNER || geometry.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.OUT)){
                for(var i = 0; i < geometry.components.length; i++){
                    if(geometry.components[i].style.surroundLineFlag || featureStyle.surroundLineWidth !== geometry.components[i].style.strokeWidth){
                        reDrawSurroundLineFlag = true;
                    } else if(!geometry.components[i].style.surroundLineFlag && featureStyle.strokeWidth !== geometry.components[i].style.strokeWidth){
                        reDrawSurroundLineFlag = true;
                    }
                }
            }

            if(reDrawSurroundLineFlag){
                geometry.dOffset = featureStyle.surroundLineWidth/2.0 + featureStyle.strokeWidth/2.0;

                for(var j = 0; j < geometry.components.length; j++) {
                    if(geometry.components[j].style.surroundLineFlag && geometry.components[j].originGeometry && geometry.components[j].originGeometry !== null){
                        var surroundLine = geometry.handleSurroundLine(geometry.components[j].originGeometry);
                        if(null === surroundLine){
                            continue;
                        }
                        geometry.components[j] = surroundLine;
                    }
                }
            }
        }

        function reDrawFill(geometry, style){
            if(geometry.isCanFill() === false){
                return;
            }

            if(style.fill === false && style.fillGradientMode === "NONE"){
                var nCount = geometry.components.length;
                for(var i = 0; i < nCount; i++) {
                    if(geometry.components[i].isHaveFill && geometry.components[i].isHaveFill === true){
                        geometry.components.splice(i, 1);
                        nCount--;
                    }
                }
                geometry.isHaveFill = false;
            }

            if(geometry.isCanFill() === true && (style.fill === true || (style.fillGradientMode&&style.fillGradientMode !== "NONE"))){
                var nCount = geometry.components.length;
                var fillFlag = false;
                for(var k = 0; k < nCount; k++){
                    if(geometry.components[k].isHaveFill && geometry.components[k].isHaveFill === true){
                        fillFlag = true;
                        break;
                    }
                }

                if(fillFlag === false){
                    var result = [];
                    for(var i=0;i<geometry.components.length; i++){
                        result.push(geometry.components[i].clone());
                    }
                    for(var j = 0; j < nCount; j++) {
                        if(geometry.components[j].style.surroundLineFlag === false){
                            var spatialData = SuperMap.Geometry.Primitives.getSpatialData(result[j]);
                            var geometryFill = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(32, spatialData);
                            if(geometryFill !== undefined){
                                geometryFill.style = {};
                                geometryFill.style = SuperMap.Util.copyAttributes(geometryFill.style, geometry.components[j].style);
                                geometryFill.style.strokeWidth = 0;
                                geometryFill.style.lineWidthLimit = true;
                                geometryFill.isHaveFill = true;
                                geometry.components.splice(j++, 0, geometryFill);
                            }
                        }
                    }
                }
            }
        }

        var rendered = true;
        if(geometry instanceof SuperMap.Geometry.GroupObject){
            for(var i = 0; i < geometry.components.length; i++){
                //geometry.components[i].geometry.scaleByMap = geometry.scaleByMap;
                //this.copyCellStyle(geometry.components[i].style, style, geometry);
                rendered = this.drawGeometry(geometry.components[i].geometry, geometry.components[i].style, geometry.components[i].id);
            }
        } else if(geometry instanceof SuperMap.Geometry.PlottingGeometry){
            reDrawSurroundLine(geometry, style);
            reDrawFill(geometry, style);

            for (var i = 0, len = geometry.components.length; i < len; i++) {
                this.copyCellStyle(geometry.components[i].style, style, geometry);

                //点标号注记显隐
                if(geometry instanceof SuperMap.Geometry.DotSymbol &&
                    i === geometry.annotationIndex && geometry.textDisplay === false){
                    geometry.components[i].style.display = "none";
                }

                if(geometry.components[i].CLASS_NAME === "SuperMap.Geometry.GeoText"){
                    var location = new SuperMap.Geometry.Point(geometry.components[i].x, geometry.components[i].y);
                    geometry.components[i].style.label = geometry.components[i].text.toString();
                    geometry.components[i].style.labelScaleByMap = geometry.scaleByMap;

                    //测试需要去掉
                    var oldResolution = geometry.resolution;
                    this.drawText(featureId + "_" + geometry.components[i].id, geometry.components[i].style, location, oldResolution, geometry, i);
                    rendered = true;
                }
                else{
                    rendered = this.drawGeometry(geometry.components[i], geometry.components[i].style, featureId) && rendered;
                }
            }

            return rendered;
        }
        else if(geometry instanceof SuperMap.Geometry.EditPoint){
            for (var m = 0; m < geometry.components.length; m++) {
                rendered = this.drawGeometry(geometry.components[m], style, featureId) && rendered;
            }
        }

        rendered = false;
        var removeBackground = false;
        if (style.display !== "none") {
            if (style.backgroundGraphic) {
                this.redrawBackgroundNode(geometry.id, geometry, style,
                    featureId);
            } else {
                removeBackground = true;
            }
            rendered = this.redrawNode(geometry.id, geometry, style,
                featureId);
        }
        if (rendered == false) {
            var node = document.getElementById(geometry.id);
            if (node) {
                if (node._style.backgroundGraphic) {
                    removeBackground = true;
                }
                node.parentNode.removeChild(node);
            }
        }
        if (removeBackground) {
            var node = document.getElementById(
                geometry.id + this.BACKGROUND_ID_SUFFIX);
            if (node) {
                node.parentNode.removeChild(node);
            }
        }
        return rendered;
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
    drawText: function(featureId, style, location, oldResolution, geometry, index) {
        var label = this.nodeFactory(featureId + this.LABEL_ID_SUFFIX, "text");
        if(label !== null && SuperMap.Util.indexOf(this.textRoot.childNodes, label) !== -1){
            this.textRoot.removeChild(label);
        }

        if(style.fontSize < 6){
            style.display = "none";
        } else {
            style.display = "display";
        }

        if(style.fontBackground === true){
            var node = this.nodeFactory(featureId + "_background", "path");

            var bounds = geometry.components[index].getBoundsByText(this.map, style);
            var arrPoints = [];
            arrPoints.push(new SuperMap.Geometry.Point(bounds.left, bounds.top));
            arrPoints.push(new SuperMap.Geometry.Point(bounds.right, bounds.top));
            arrPoints.push(new SuperMap.Geometry.Point(bounds.right, bounds.bottom));
            arrPoints.push(new SuperMap.Geometry.Point(bounds.left, bounds.bottom));
            arrPoints.push(new SuperMap.Geometry.Point(bounds.left, bounds.top));
            var pathString = " M" + this.getComponentsString(arrPoints, " ").path;
            node.setAttributeNS(null, "d", pathString);
            node.setAttributeNS(null, "stroke-width", 0);
            node.setAttributeNS(null, "fill", style.fontBackgroundColor);
            node.setAttributeNS(null, "fill-rule", "evenodd");
            if (node.parentNode !== this.vectorRoot){
                this.vectorRoot.appendChild(node);
            }
        } else {
            var node = document.getElementById(featureId + "_background");
            if(node !== null){
                this.vectorRoot.removeChild(node);
            }
        }

        if(style.fontShadow === true){
            var node = this.nodeFactory(featureId + "_shadow", "text");

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

            } else{
                y = (location.y / resolution - this.top);
            }

            if(style.fontShadowOffsetX){
                x = x + style.fontShadowOffsetX;
            }
            if(style.fontShadowOffsetY){
                y = -(-y + style.fontShadowOffsetY);
            }

            node.setAttributeNS(null, "x", x);
            node.setAttributeNS(null, "y", -y);

            //添加svg的属性值
            if (style.display) {
                node.setAttributeNS(null, "display", style.display);
            }

            if (style.labelRotation) {
                node.setAttributeNS(null, "transform", "rotate(" + style.labelRotation + " " + x + ","+ (-y) +")" );
            }

            if (style.fontColor) {
                node.setAttributeNS(null, "fill", style.fontShadowColor);
            }

            if (style.fontFamily) {
                node.setAttributeNS(null, "font-family", style.fontFamily);
            }
            if (style.fontSize) {
                node.setAttributeNS(null, "font-size", style.fontSize);
            }
            if (style.fontWeight) {
                node.setAttributeNS(null, "font-weight", style.fontWeight);
            }
            if (style.fontStyle) {
                node.setAttributeNS(null, "font-style", style.fontStyle);
            }
            if (style.labelSelect === true) {
                node.setAttributeNS(null, "pointer-events", "visible");
                node._featureId = featureId;
            } else {
                node.setAttributeNS(null, "pointer-events", "none");
            }
            var align = style.labelAlign || "cm";
            node.setAttributeNS(null, "text-anchor",
                SuperMap.Renderer.SVG.LABEL_ALIGN[align[0]] || "middle");

            if (SuperMap.IS_GECKO === true) {
                node.setAttributeNS(null, "dominant-baseline",
                    SuperMap.Renderer.SVG.LABEL_ALIGN[align[1]] || "central");
            }

            var labelRows = style.label.split('\n');
            var numRows = labelRows.length;
            while (node.childNodes.length > numRows) {
                node.removeChild(node.lastChild);
            }
            for (var i = 0; i < numRows; i++) {
                var tspan = this.nodeFactory(featureId + "_shadow" + "_tspan_" + i, "tspan");
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
                    node.appendChild(tspan);
                }
            }

            if (!node.parentNode) {
                this.textRoot.appendChild(node);
            }
        } else {
            var node = document.getElementById(featureId + "_shadow");
            if(node !== null){
                this.vectorRoot.removeChild(node);
            }
        }

        SuperMap.Renderer.SVG.prototype.drawText.apply(this, arguments);
    },

    /**
     * Method: copyCellStyle
     * Copy featureStyle to CellStyle.
     *
     * Parameters:
     * cellStyle - {Object}
     * featureStyle - {Object}
     * geometry - {<SuperMap.Geometry.GeoGraphicObject>}
     */
    copyCellStyle: function(cellStyle, featureStyle, geometry){
        if(featureStyle.display && featureStyle.display === "none"){
            cellStyle.display = featureStyle.display;
        } else {
            if(cellStyle.surroundLineFlag === true){
                if(geometry.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.ALL){
                    cellStyle.strokeWidth = featureStyle.surroundLineWidth * 2 + featureStyle.strokeWidth;
                } else {
                    cellStyle.strokeWidth = featureStyle.surroundLineWidth;
                }
                cellStyle.strokeColor = featureStyle.surroundLineColor;
                cellStyle.strokeOpacity = featureStyle.surroundLineColorOpacity;
            } else {
                if(!cellStyle.lineWidthLimit){
                    cellStyle.strokeWidth = featureStyle.strokeWidth;
                }
                if(!cellStyle.lineColorLimit){
                    cellStyle.strokeColor = featureStyle.strokeColor;
                    cellStyle.strokeOpacity = featureStyle.strokeOpacity;
                }
                if(!cellStyle.lineTypeLimit){
                    cellStyle.strokeDashstyle = featureStyle.strokeDashstyle;
                }
            }

            if(!cellStyle.strokeLinecap && featureStyle.strokeLinecap !== undefined){
                cellStyle.strokeLinecap = featureStyle.strokeLinecap;
            }

            if(!cellStyle.fillLimit){
                if(cellStyle.fillColor instanceof SuperMap.Style.Gradient){
                    cellStyle.fillColor.destroy();
                    cellStyle.fillColor = null;
                }

                if(featureStyle.fillGradientMode === "LINEAR" || featureStyle.fillGradientMode === "RADIAL"){
                    cellStyle.fill = true;

                    var colorStops = [];
                    colorStops.push({offset:0.0,color:featureStyle.fillColor, opacity:featureStyle.fillOpacity});
                    colorStops.push({offset:1.0,color:featureStyle.fillBackColor, opacity:featureStyle.fillBackOpacity});

                    if(featureStyle.fillGradientMode === "LINEAR"){
                        cellStyle.fillColor = new SuperMap.Style.LinearGradient(0.0, 0.0, 1.0, 0.0, colorStops);
                    } else if(featureStyle.fillGradientMode === "RADIAL"){
                        cellStyle.fillColor = new SuperMap.Style.RadialGradient(0.5, 0.5, 1.0, 0.5, 0.5, colorStops);
                    }
                } else {
                    cellStyle.fill = featureStyle.fill;
                    cellStyle.fillColor = featureStyle.fillColor;
                    cellStyle.fillOpacity = featureStyle.fillOpacity;
                }

            } else if(!cellStyle.fillColorLimit){
                cellStyle.fillColor = cellStyle.strokeColor;
                cellStyle.fillOpacity = cellStyle.strokeOpacity;
            }

            if(!cellStyle.fontSizeLimit || cellStyle.fontSizeLimit === false){
                cellStyle.fontSize = featureStyle.fontSize;
            }
            if(!cellStyle.fontColorLimit || cellStyle.fontColorLimit === false){
                cellStyle.fontColor = featureStyle.fontColor;
            }

            if(!featureStyle.fontOpacity || featureStyle.fontOpacity !== undefined){
                cellStyle.fontOpacity = featureStyle.fontOpacity;
            }

            if(!featureStyle.fontFamily || featureStyle.fontFamily !== undefined){
                cellStyle.fontFamily = featureStyle.fontFamily;
            }

            if(cellStyle.labelAlign === undefined && featureStyle.labelAlign !== undefined){
                cellStyle.labelAlign = featureStyle.labelAlign;
            }

            if(cellStyle.fontSizeLimit !== true && cellStyle.fontColorLimit !== true){
                if(featureStyle.fontWeight !== undefined){
                    cellStyle.fontWeight = featureStyle.fontWeight;
                }

                if(featureStyle.fontStyle !== undefined){
                    cellStyle.fontStyle = featureStyle.fontStyle;
                }

                if(featureStyle.fontStroke !== undefined){
                    cellStyle.fontStroke = featureStyle.fontStroke;
                }

                if(!featureStyle.fontStrokeColor !== undefined){
                    cellStyle.fontStrokeColor = featureStyle.fontStrokeColor;
                }

                if(featureStyle.fontStrokeWidth !== undefined){
                    cellStyle.fontStrokeWidth = featureStyle.fontStrokeWidth;
                }

                if(featureStyle.fontBackground !== undefined){
                    cellStyle.fontBackground = featureStyle.fontBackground;
                }

                if(featureStyle.fontBackgroundColor !== undefined){
                    cellStyle.fontBackgroundColor = featureStyle.fontBackgroundColor;
                }

                if(featureStyle.fontShadow !== undefined){
                    cellStyle.fontShadow = featureStyle.fontShadow;
                }

                if(featureStyle.fontShadowColor !== undefined){
                    cellStyle.fontShadowColor = featureStyle.fontShadowColor;
                }

                if(featureStyle.fontShadowOffsetX !== undefined){
                    cellStyle.fontShadowOffsetX = featureStyle.fontShadowOffsetX;
                }

                if(featureStyle.fontShadowOffsetY !== undefined){
                    cellStyle.fontShadowOffsetY = featureStyle.fontShadowOffsetY;
                }
            }

            if(featureStyle.display){
                cellStyle.display = featureStyle.display;
            }
        }
    },
	
    CLASS_NAME: "SuperMap.Renderer.PlotSVG"
});