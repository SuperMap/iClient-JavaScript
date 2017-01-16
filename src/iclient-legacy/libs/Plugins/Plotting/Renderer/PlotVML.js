/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Renderer/Elements.js
 */

/**
 * Class: SuperMap.Renderer.PlotVML
 * Render vector features in browsers with VML capability.  Construct a new
 * VML renderer with the <SuperMap.Renderer.VML> constructor.
 * 
 * Note that for all calculations in this class, we use (num | 0) to truncate a 
 * float value to an integer. This is done because it seems that VML doesn't 
 * support float values.
 *
 * Inherits from:
 *  - <SuperMap.Renderer.VML>
 */
SuperMap.Renderer.PlotVML = SuperMap.Class(SuperMap.Renderer.VML, {
    
    /**
     * Constructor: SuperMap.Renderer.PlotVML
     * Create a new VML renderer.
     *
     * Parameters:
     * containerID - {String} The id for the element that contains the renderer
     */
    initialize: function(containerID) {
        SuperMap.Renderer.VML.prototype.initialize.apply(this,
                                                                arguments);
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
                        geometry.components[j] = geometry.handleSurroundLine(geometry.components[j].originGeometry);
                    }
                }
            }
        }

        var rendered = true;
        if(geometry instanceof SuperMap.Geometry.GroupObject){
            for(var i = 0; i < geometry.components.length; i++){
                rendered = this.drawGeometry(geometry.components[i].geometry, geometry.components[i].style, geometry.components[i].id);
            }
        } else if(geometry instanceof SuperMap.Geometry.GeoGraphicObject){
            reDrawSurroundLine(geometry, style);

            for (var i = 0, len = geometry.components.length; i < len; i++) {
                this.copyCellStyle(geometry.components[i].style, style, geometry);

                if(geometry.components[i].CLASS_NAME === "SuperMap.Geometry.GeoText"){
                    var location = new SuperMap.Geometry.Point(geometry.components[i].x, geometry.components[i].y);
                    geometry.components[i].style.label = geometry.components[i].text.toString();
                    this.drawText(featureId + i.toString(),geometry.components[i].style,location);
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
                    cellStyle.fill = true;

                    cellStyle.fillColor = featureStyle.fillColor;
                    cellStyle.fillColor2 = featureStyle.fillBackColor;
                    cellStyle.fillGradientMode = featureStyle.fillGradientMode;
                    cellStyle.fillOpacity = featureStyle.fillOpacity;
                    cellStyle.fillOpacity2 = featureStyle.fillBackOpacity;
                } else {
                    cellStyle.fillGradientMode = featureStyle.fillGradientMode;
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
        }
    },

    CLASS_NAME: "SuperMap.Renderer.VML"
});

/**
 * Constant: SuperMap.Renderer.VML.LABEL_SHIFT
 * {Object}
 */
SuperMap.Renderer.VML.LABEL_SHIFT = {
    "l": 0,
    "c": .5,
    "r": 1,
    "t": 0,
    "m": .5,
    "b": 1
};
