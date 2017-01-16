/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Renderer 
 * 这是所有渲染类的基类.
 *
 *
 */
SuperMap.Renderer = SuperMap.Class({

    /**
     * Property:
     * This is based on a merger code written by Paul Spencer and Bertil Chapuis.
     * It is largely composed of virtual functions that are to be implemented
     * in technology-specific subclasses, but there is some generic code too.
     *
     * The functions that *are* implemented here merely deal with the maintenance
     *  of the size and extent variables, as well as the cached 'resolution'
     *  value.
     *
     * A note to the user that all subclasses should use getResolution() instead
     *  of directly accessing this.resolution in order to correctly use the
     *  cacheing system.
     */

    /** 
     * Property: container
     * {DOMElement} 
     */
    container: null,
    
    /**
     * Property: root
     * {DOMElement}
     */
    root: null,

    /** 
     * Property: extent
     * {<SuperMap.Bounds>}
     */
    extent: null,

    /**
     * Property: locked
     * {Boolean} If the renderer is currently in a state where many things
     *     are changing, the 'locked' property is set to true. This means 
     *     that renderers can expect at least one more drawFeature event to be
     *     called with the 'locked' property set to 'true': In some renderers,
     *     this might make sense to use as a 'only update local information'
     *     flag. 
     */  
    locked: false,
    
    /** 
     * Property: size
     * {<SuperMap.Size>} 
     */
    size: null,
    
    /**
     * Property: resolution
     * {Float} cache of current map resolution
     */
    resolution: null,
    
    /**
     * Property: map  
     * {<SuperMap.Map>} Reference to the map -- this is set in Vector's setMap()
     */
    map: null,
    
    /**
     * Property: featureDx
     * {Number} Feature offset in x direction. Will be calculated for and
     * applied to the current feature while rendering (see
     * <calculateFeatureDx>).
     */
    featureDx: 0,
    
    /**
     * Constructor: SuperMap.Renderer 
     * 渲染基类，不允许初始化
     *
     * Parameters:
     * containerID - {String} 渲染容器id号
     * options - {Object} 当前渲染的内部参数
     *
     */
    initialize: function(containerID, options) {
        this.container = SuperMap.Util.getElement(containerID);
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 销毁当前对象
     */
    destroy: function() {
        this.container = null;
        this.extent = null;
        this.size =  null;
        this.resolution = null;
        this.map = null;
    },

    /**
     * APIMethod: supported
     * 需要在子类中重写此方法，用于判定当前浏览器是否支持当前的渲染方式
     * 
     * Returns:
     * {Boolean} 返回是否支持
     */
    supported: function() {
        return false;
    },    
    
    /**
     * Method: setExtent
     * Set the visible part of the layer.
     *
     * Resolution has probably changed, so we nullify the resolution 
     * cache (this.resolution) -- this way it will be re-computed when 
     * next it is needed.
     * We nullify the resolution cache (this.resolution) if resolutionChanged
     * is set to true - this way it will be re-computed on the next
     * getResolution() request.
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
        this.extent = extent.clone();
        if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
            this.extent = extent.wrapDateLine(this.map.getMaxExtent());
        }
        if (resolutionChanged) {
            this.resolution = null;
        }
        return true;
    },
    
    /**
     * Method: setSize
     * Sets the size of the drawing surface.
     * 
     * Resolution has probably changed, so we nullify the resolution 
     * cache (this.resolution) -- this way it will be re-computed when 
     * next it is needed.
     *
     * Parameters:
     * size - {<SuperMap.Size>} 
     */
    setSize: function(size) {
        this.size = size.clone();
        this.resolution = null;
    },
    
    /** 
     * Method: getResolution
     * Uses cached copy of resolution if available to minimize computing
     * 
     * Returns:
     * The current map's resolution
     */
    getResolution: function() {
        this.resolution = this.resolution || this.map.getResolution();
        return this.resolution;
    },
    
    /**
     * Method: drawFeature
     * Draw the feature.  The optional style argument can be used
     * to override the feature's own style.  This method should only
     * be called from layer.drawFeature().
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} 
     * style - {<Object>}
     * 
     * Returns:
     * {Boolean} true if the feature has been drawn completely, false if not,
     *     undefined if the feature had no geometry
     */
    drawFeature: function(feature, style) {
        if(style == null) {
            style = feature.style;
        }
        if (feature.geometry) {
            var bounds = feature.geometry.getBounds();
            if(bounds) {
                var worldBounds;
                if (this.map.baseLayer && this.map.baseLayer.wrapDateLine) {
                    worldBounds = this.map.getMaxExtent();
                }
                if (!bounds.intersectsBounds(this.extent, {worldBounds: worldBounds})) {
                    style = {display: "none"};
                } else {
                    this.calculateFeatureDx(bounds, worldBounds);
                }

                var rendered = this.drawGeometry(feature.geometry, style, feature.id);

                //新增军标符号的  应对Geotext 中的文本信息
                if(feature.geometry.isPlottingGeometry && feature.geometry.isPlottingGeometry === true){
                    return true;
                }
                //if((feature.geometry.CLASS_NAME === "SuperMap.Geometry.DotSymbol") ||
                //    (feature.geometry.CLASS_NAME === "SuperMap.Geometry.AlgoSymbol")){
                //    return true;
                //}
				
                if(style.display !== "none" && style.label && rendered !== false) {

                    //var location = feature.geometry.getCentroid();
                    var location;
                    if(style._isGeoTextStrategyStyle){
                        var boundsCenter =  feature.geometry.bounds.getCenterLonLat();
                        location = new SuperMap.Geometry.Point(boundsCenter.lon, boundsCenter.lat);
                    }
                    else{
                        location = feature.geometry.getCentroid();
                    }

                    //如果获取标签位置失败，不绘制该标签。
                    if(location == null)
                    {
                        return null;
                    }
                    if(style.labelXOffset || style.labelYOffset) {
                        var xOffset = isNaN(style.labelXOffset) ? 0 : style.labelXOffset;
                        var yOffset = isNaN(style.labelYOffset) ? 0 : style.labelYOffset;
                        var res = this.getResolution();
                        location.move(xOffset*res, yOffset*res);
                    }
                    this.drawText(feature.id, style, location);
                } else {
                    this.removeText(feature.id);
                }
                return rendered;
            }
        }
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
     * Method: drawGeometry
     * 
     * Draw a geometry.  This should only be called from the renderer itself.
     * Use layer.drawFeature() from outside the renderer.
     * virtual function
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 
     * style - {Object} 
     * featureId - {<String>} 
     */
    drawGeometry: function(geometry, style, featureId) {},
        
    /**
     * Method: drawText
     * Function for drawing text labels.
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * featureId - {String}
     * style -
     * location - {<SuperMap.Geometry.Point>}
     */
    drawText: function(featureId, style, location) {},

    /**
     * Method: removeText
     * Function for removing text labels.
     * This method is only called by the renderer itself.
     * 
     * Parameters: 
     * featureId - {String}
     */
    removeText: function(featureId) {},
    
    /**
     * Method: clear
     * Clear all vectors from the renderer.
     * virtual function.
     */    
    clear: function() {},

    /**
     * Method: getFeatureIdFromEvent
     * Returns a feature id from an event on the renderer.  
     * How this happens is specific to the renderer.  This should be
     * called from layer.getFeatureFromEvent().
     * Virtual function.
     * 
     * Parameters:
     * evt - {<SuperMap.Event>} 
     *
     * Returns:
     * {String} A feature id or null.
     */
    getFeatureIdFromEvent: function(evt) {},
    
    /**
     * Method: eraseFeatures 
     * This is called by the layer to erase features
     * 
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 
     */
    eraseFeatures: function(features) {
        if(!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        for(var i=0, len=features.length; i<len; ++i) {
            var feature = features[i];
            this.eraseGeometry(feature.geometry, feature.id);
            this.removeText(feature.id);
        }
    },
    
    /**
     * Method: eraseGeometry
     * Remove a geometry from the renderer (by id).
     * virtual function.
     * 
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 
     * featureId - {String}
     */
    eraseGeometry: function(geometry, featureId) {},
    
    /**
     * Method: moveRoot
     * moves this renderer's root to a (different) renderer.
     * To be implemented by subclasses that require a common renderer root for
     * feature selection.
     * 
     * Parameters:
     * renderer - {<SuperMap.Renderer>} target renderer for the moved root
     */
    moveRoot: function(renderer) {},

    /**
     * Method: getRenderLayerId
     * Gets the layer that this renderer's output appears on. If moveRoot was
     * used, this will be different from the id of the layer containing the
     * features rendered by this renderer.
     * 
     * Returns:
     * {String} the id of the output layer.
     */
    getRenderLayerId: function() {
        return this.container.id;
    },
    
    /**
     * Method: applyDefaultSymbolizer
     * 
     * Parameters:
     * symbolizer - {Object}
     * 
     * Returns:
     * {Object}
     */
    applyDefaultSymbolizer: function(symbolizer) {
        var result = SuperMap.Util.extend({},
            SuperMap.Renderer.defaultSymbolizer);
        if(symbolizer.stroke === false) {
            delete result.strokeWidth;
            delete result.strokeColor;
        }
        if(symbolizer.fill === false) {
            delete result.fillColor;
        }
        SuperMap.Util.extend(result, symbolizer);
        return result;
    },

    CLASS_NAME: "SuperMap.Renderer"
});



//  Properties from this symbolizer will be applied to symbolizers
//   with missing properties. This can also be used to set a global
//  symbolizer default in SuperMap. To be SLD 1.x compliant, add the
//   following code before rendering any vector features:



/**
 * Constant: SuperMap.Renderer.defaultSymbolizer
 * {Object}
 * 默认的渲染风格
 * (code)
 * SuperMap.Renderer.defaultSymbolizer = {
 *     fillColor: "#000000",
 *     strokeColor: "#000000",
 *     strokeWidth: 1,
 *     fillOpacity: 1,
 *     strokeOpacity: 1,
 *     pointRadius: 0
 * };
 * (end)
 */
SuperMap.Renderer.defaultSymbolizer = {
    fillColor: "#000000",
    strokeColor: "#000000",
    strokeWidth: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    pointRadius: 0
};

/**
 * Constant: SuperMap.Renderer.symbol
 * 几种带名字的符号的坐标集，包括：'star' 'cross' 'x' 'square' 'triangle' 'sector'
 */
SuperMap.Renderer.symbol = {
    "star": [350,75, 379,161, 469,161, 397,215, 423,301, 350,250, 277,301,
        303,215, 231,161, 321,161, 350,75],
    "cross": [4,0, 6,0, 6,4, 10,4, 10,6, 6,6, 6,10, 4,10, 4,6, 0,6, 0,4, 4,4,
        4,0],
    "x": [0,0, 25,0, 50,35, 75,0, 100,0, 65,50, 100,100, 75,100, 50,65, 25,100, 0,100, 35,50, 0,0],
    "square": [0,0, 0,1, 1,1, 1,0, 0,0],
    "triangle": [0,10, 10,10, 5,0, 0,10],
    "sector": [0, 0, 9.537, -3.007, 9.833, -1.822, 9.981, -0.61, 9.981, 0.61, 9.833, 1.822, 9.537, 3.007, 0, 0],
    "clover": [0, 0, -3.007, -9.537, -1.822, -9.833, -0.61, -9.981, 0.61, -9.981, 1.822, -9.833, 3.007, -9.537, 0, 0,9.763, 2.164, 9.426, 3.338, 8.949, 4.462, 8.339, 5.519, 7.604, 6.494, 6.756, 7.373, 0, 0,-6.756, 7.373, -7.604, 6.494, -8.339, 5.519, -8.949, 4.462, -9.426, 3.338, -9.763, 2.164, 0, 0]
};
    
