/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer.js
 */

/**
 * Class: SuperMap.Renderer.PlotCanvas2
 * A renderer based on the 2D 'canvas' drawing element.
 *
 * Inherits:
 *  - <SuperMap.Renderer.Canvas2>
 */
SuperMap.Renderer.PlotCanvas2 = SuperMap.Class(SuperMap.Renderer.Canvas2, {

    /**
     * Constructor: SuperMap.Renderer.PlotCanvas2
     *
     * Parameters:
     * containerID - {<String>}
     * options - {Object} Optional properties to be set on the renderer.
     */
    initialize: function(containerID, options, layer) {
        SuperMap.Renderer.Canvas2.prototype.initialize.apply(this, arguments);
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
        function colorRGBA(color, alpha){
            var hexStringR = color.substring(1, 3);
            var red = parseInt(hexStringR, 16);
            var hexStringG = color.substring(3, 5);
            var green = parseInt(hexStringG, 16);
            var hexStringB = color.substring(5);
            var blue = parseInt(hexStringB, 16);

            return "rgba(" + red + "," + green +"," + blue + "," + alpha + ")";
        }

        if(featureStyle.display && featureStyle.display === "none"){
            cellStyle.display = featureStyle.display;
        } else {
            if(cellStyle.surroundLineFlag){
                if(geometry.surroundLineType === SuperMap.Plot.AlgoSurroundLineType.ALL){
                    cellStyle.strokeWidth = featureStyle.surroundLineWidth*2 + featureStyle.strokeWidth;
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

            if(!cellStyle.fillLimit){
                if(featureStyle.fillGradientMode === "LINEAR" || featureStyle.fillGradientMode === "RADIAL"){
                    var bounds = geometry.getBounds();
                    var pt1 = this.getLocalXY(new SuperMap.Geometry.Point(bounds.left, bounds.top));
                    var pt2 = this.getLocalXY(new SuperMap.Geometry.Point(bounds.right, bounds.bottom));
                    var ptCenter = this.getLocalXY(new SuperMap.Geometry.Point((bounds.left+bounds.right)/2, (bounds.top+bounds.bottom)/2));
                    var dRadius = Math.abs(pt1[0]-pt2[0]) > Math.abs(pt1[1]-pt2[1]) ? Math.abs(pt1[0]-pt2[0]) : Math.abs(pt1[1]-pt2[1]);
                    cellStyle.fill = true;

                    if(featureStyle.fillGradientMode === "LINEAR"){
                        cellStyle.fillColor = this.canvas.createLinearGradient(pt1[0], pt1[1], pt2[0], pt1[1]);
                    } else if(featureStyle.fillGradientMode === "RADIAL"){
                        cellStyle.fillColor = this.canvas.createRadialGradient(ptCenter[0], ptCenter[1], 0, ptCenter[0], ptCenter[1], dRadius);
                    }
                    cellStyle.fillColor.addColorStop(0, colorRGBA(featureStyle.fillColor, featureStyle.fillOpacity));
                    cellStyle.fillColor.addColorStop(1, colorRGBA(featureStyle.fillBackColor, featureStyle.fillBackOpacity));
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

            if(featureStyle.display){
                cellStyle.display = featureStyle.display;
            }

            cellStyle.strokeOpacity = cellStyle.strokeOpacity.toString();
        }
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
                        geometry.components[j] = geometry.handleSurroundLine(geometry.components[j].originGeometry);
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

            if(geometry.isCanFill() === true && (style.fill === true || (style.fillGradientMode && style.fillGradientMode !== "NONE"))){
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
                    for(var j = 0; j < geometry.components.length; j++) {
                        if(geometry.components[j].style.surroundLineFlag === false){
                            var spatialData = SuperMap.Geometry.Primitives.getSpatialData(result[j]);
                            var geometryFill = SuperMap.Geometry.Primitives.transformSymbolCellToGeometry(32, spatialData);
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
        if(geometry instanceof SuperMap.Geometry.GroupObject){
            for(var i = 0; i < geometry.components.length; i++){
                this.drawGeometry(geometry.components[i].geometry, geometry.components[i].style, geometry.components[i].id);
            }
        } else if(geometry instanceof SuperMap.Geometry.GeoGraphicObject){
            reDrawSurroundLine(geometry, style);
            reDrawFill(geometry,style);
            this.canvas.lineCap = "round";
            this.canvas.lineJoin = "round";

            if (this.hitDetection) {
                this.hitContext.lineCap = "round";
                this.hitContext.lineJoin = "round";
            }

            for (var i = 0, len = geometry.components.length; i < len; i++) {
                this.copyCellStyle(geometry.components[i].style, style, geometry);

                if(geometry.components[i].CLASS_NAME === "SuperMap.Geometry.GeoText"){
                    var location = new SuperMap.Geometry.Point(geometry.components[i].x, geometry.components[i].y);
                    geometry.components[i].style.label = geometry.components[i].text.toString();
                    this.drawText(location,geometry.components[i].style);
                }
                else{
                    this.drawGeometry(geometry.components[i], geometry.components[i].style, featureId);
                }
            }

            return;
        }
        else if(geometry instanceof SuperMap.Geometry.EditPoint){
            for (var m = 0; m < geometry.components.length; m++) {
                this.drawGeometry(geometry.components[m], style, featureId) && rendered;
            }
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

    CLASS_NAME: "SuperMap.Renderer.PlotCanvas2"
});