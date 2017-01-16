/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

// TRASH THIS
SuperMap.State = {
    /** states */
    UNKNOWN: 'Unknown',
    INSERT: 'Insert',
    UPDATE: 'Update',
    DELETE: 'Delete'
};

/**
 * @requires SuperMap/Feature.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Feature.Vector
 * 矢量要素类。该类具有 Geometry 属性存放几何信息，
 * attributes 属性存放非几何信息，另外还包含了 style 属性，用来定义矢量要素的样式，
 * 其中，默认的样式在 <SuperMap.Feature.Vector.style> 类中定义，如果没有特别的指定将使用默认的样式， 
 * 
 * Inherits from:
 *  - <SuperMap.Feature>
 */
SuperMap.Feature.Vector = SuperMap.Class(SuperMap.Feature, {

    /** 
     * Property: fid 
     * {String} 
     */
    fid: null,
    
    /** 
     * APIProperty: geometry 
     * {<SuperMap.Geometry>} 该属性用于存放几何信息。
     */
    geometry: null,

    /** 
     * APIProperty: attributes 
     * {Object} 描述要素的任意的可序列化属性。
     */
    attributes: null,

    /**
     * Property: bounds
     * {<SuperMap.Bounds>} The box bounding that feature's geometry, that
     *     property can be set by an <SuperMap.Format> object when
     *     deserializing the feature, so in most cases it represents an
     *     information set by the server. 
     */
    bounds: null,

    /** 
     * Property: state 
     * {String} 
     */
    state: null,
    
    /** 
     * APIProperty: style 
     * {Object} 要素的样式属性，地图查询返回的feature的style，8C变为null。
     */
    style: null,

    /**
     * APIProperty: url
     * {String} 如果设置了这个属性，在更新或者删除要素时需要考虑 <SuperMap.HTTP> 。
     */
    url: null,
    
    /**
     * APIProperty: renderIntent
     * {String} Feature要素即被被渲染的样式状态，对应StyleMap中的状态定义的可选值。
     */
    renderIntent: "default",
    
    /**
     * APIProperty: modified
     * {Object} 一个具有可以被改变的原始几何形状和属性，被 <SuperMap.Control.ModifyFeature> 写入。
     * 应用程序可以在attributes中设置原始的能被修改的属性，需要注意的是，
     * 应用程序需要在使用某个对象及其属性前检测这个对象及其 attributes 属性是否创建，用 ModifyFeature  
	 * 改变之后，这个对象如下所示：
     *
     * (code)
     * {
     *     geometry: >Object
     * }
     * (end)
     *
     * 当应用程序需要对要素的 attributes 进行修改，则需要如下设置 attributes：
     *
     * (code)
     * {
     *     attributes: {
     *         myAttribute: "original"
     *     }
     * }
     * (end)
     *
     */
    modified: null,

    /** 
     * Constructor: SuperMap.Feature.Vector
     * 实例化矢量要素。
     * (code)
     *  var geometry = new SuperMap.Geometry.Point(-115,10);
     *  var style = {
     *      strokeColor:"#339933",
     *      strokeOpacity:1,
     *      strokeWidth:3,
     *      pointRadius:6
     *  }
     *  var pointFeature = new SuperMap.Feature.Vector(geometry,null,style);
     *  vectorLayer.addFeatures(pointFeature);
     * (end)
     *	 
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 代表要素的几何形状。
     * attributes - {Object} 描述要素的任意的可序列化属性，将要映射到 attributes 属性中的可选对象。
     * style - {Object} 一个可选的样式对象。
     */
    initialize: function(geometry, attributes, style) {
        SuperMap.Feature.prototype.initialize.apply(this,
                                                      [null, null, attributes]);
        this.lonlat = null;
        this.geometry = geometry ? geometry : null;
        this.state = null;
        this.attributes = {};
        if (attributes) {
            this.attributes = SuperMap.Util.extend(this.attributes,
                                                     attributes);
        }
        this.style = style ? style : null;
    },
    
    /** 
     * Method: destroy
     * nullify references to prevent circular references and memory leaks
     */
    destroy: function() {
        if (this.layer) {
            this.layer.removeFeatures(this);
            this.layer = null;
        }
            
        this.geometry = null;
        this.modified = null;
        SuperMap.Feature.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: clone
     * Create a clone of this vector feature.  Does not set any non-standard
     *     properties.
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} An exact clone of this vector feature.
     */
    clone: function () {
        return new SuperMap.Feature.Vector(
            this.geometry ? this.geometry.clone() : null,
            this.attributes,
            this.style);
    },

    /**
     * Method: onScreen
     * Determine whether the feature is within the map viewport.  This method
     *     tests for an intersection between the geometry and the viewport
     *     bounds.  If a more effecient but less precise geometry bounds
     *     intersection is desired, call the method with the boundsOnly
     *     parameter true.
     *
     * Parameters:
     * boundsOnly - {Boolean} Only test whether a feature's bounds intersects
     *     the viewport bounds.  Default is false.  If false, the feature's
     *     geometry must intersect the viewport for onScreen to return true.
     * 
     * Returns:
     * {Boolean} The feature is currently visible on screen (optionally
     *     based on its bounds if boundsOnly is true).
     */
    onScreen:function(boundsOnly) {
        var onScreen = false;
        if(this.layer && this.layer.map) {
            var screenBounds = this.layer.map.getExtent();
            if(boundsOnly) {
                var featureBounds = this.geometry.getBounds();
                onScreen = screenBounds.intersectsBounds(featureBounds);
            } else {
                var screenPoly = screenBounds.toGeometry();
                onScreen = screenPoly.intersects(this.geometry);
            }
        }    
        return onScreen;
    },

    /**
     * Method: getVisibility
     * Determine whether the feature is displayed or not. It may not displayed
     *     because:
     *     - its style display property is set to 'none',
     *     - it doesn't belong to any layer,
     *     - the styleMap creates a symbolizer with display property set to 'none'
     *          for it,
     *     - the layer which it belongs to is not visible.
     * 
     * Returns:
     * {Boolean} The feature is currently displayed.
     */
    getVisibility: function() {
        return !(this.style && this.style.display === 'none' ||
                 !this.layer ||
                 this.layer && this.layer.styleMap &&
                 this.layer.styleMap.createSymbolizer(this, this.renderIntent).display === 'none' ||
                 this.layer && !this.layer.getVisibility());
    },
    
    /**
     * Method: createMarker
     * HACK - we need to decide if all vector features should be able to
     *     create markers
     * 
     * Returns:
     * {<SuperMap.Marker>} For now just returns null
     */
    createMarker: function() {
        return null;
    },

    /**
     * Method: destroyMarker
     * HACK - we need to decide if all vector features should be able to
     *     delete markers
     * 
     * If user overrides the createMarker() function, s/he should be able
     *   to also specify an alternative function for destroying it
     */
    destroyMarker: function() {
        // pass
    },

    /**
     * Method: createPopup
     * HACK - we need to decide if all vector features should be able to
     *     create popups
     * 
     * Returns:
     * {<SuperMap.Popup>} For now just returns null
     */
    createPopup: function() {
        return null;
    },

    /**
     * Method: atPoint
     * Determins whether the feature intersects with the specified location.
     * 
     * Parameters: 
     * lonlat - {<SuperMap.LonLat>} 
     * toleranceLon - {float} Optional tolerance in Geometric Coords
     * toleranceLat - {float} Optional tolerance in Geographic Coords
     * 
     * Returns:
     * {Boolean} Whether or not the feature is at the specified location
     */
    atPoint: function(lonlat, toleranceLon, toleranceLat) {
        var atPoint = false;
        if(this.geometry) {
            atPoint = this.geometry.atPoint(lonlat, toleranceLon, 
                                                    toleranceLat);
        }
        return atPoint;
    },

    /**
     * Method: destroyPopup
     * HACK - we need to decide if all vector features should be able to
     * delete popups
     */
    destroyPopup: function() {
        // pass
    },

    /**
     * Method: move
     * Moves the feature and redraws it at its new location
     *
     * Parameters:
     * state - {SuperMap.LonLat or SuperMap.Pixel} the
     *         location to which to move the feature.
     */
    move: function(location) {

        if(!this.layer || !this.geometry.move){
            //do nothing if no layer or immoveable geometry
            return undefined;
        }

        var pixel;
        if (location.CLASS_NAME === "SuperMap.LonLat") {
            pixel = this.layer.getViewPortPxFromLonLat(location);
        } else {
            pixel = location;
        }
        
        var lastPixel = this.layer.getViewPortPxFromLonLat(this.geometry.getBounds().getCenterLonLat());
        var res = this.layer.map.getResolution();
        this.geometry.move(res * (pixel.x - lastPixel.x),
                           res * (lastPixel.y - pixel.y));
        this.layer.drawFeature(this);
        return lastPixel;
    },
    
    /**
     * Method: toState
     * Sets the new state
     *
     * Parameters:
     * state - {String} 
     */
    toState: function(state) {
        if (state === SuperMap.State.UPDATE) {
            switch (this.state) {
                case SuperMap.State.UNKNOWN:
                case SuperMap.State.DELETE:
                    this.state = state;
                    break;
                case SuperMap.State.UPDATE:
                case SuperMap.State.INSERT:
                    break;
            }
        } else if (state === SuperMap.State.INSERT) {
            switch (this.state) {
                case SuperMap.State.UNKNOWN:
                    break;
                default:
                    this.state = state;
                    break;
            }
        } else if (state === SuperMap.State.DELETE) {
            switch (this.state) {
                case SuperMap.State.INSERT:
                    // the feature should be destroyed
                    break;
                case SuperMap.State.DELETE:
                    break;
                case SuperMap.State.UNKNOWN:
                case SuperMap.State.UPDATE:
                    this.state = state;
                    break;
            }
        } else if (state === SuperMap.State.UNKNOWN) {
            this.state = state;
        }
    },
    
    CLASS_NAME: "SuperMap.Feature.Vector"
});


/**
 * Constant: SuperMap.Feature.Vector.style
 * SuperMap.features有大量的样式属性，如果没有特别的指定将使用默认的样式， 
 * 大部分样式通过SVG标准定义属性。
 *  fill properties资料介绍: http://www.w3.org/TR/SVG/painting.html#FillProperties
 *  stroke properties资料介绍: http://www.w3.org/TR/SVG/painting.html#StrokeProperties
 *
 * Symbolizer properties:
 * fill - {Boolean} 不需要填充则设置为false。
 * fillColor - {String} 十六进制填充颜色，默认为"#ee9900"。 
 * fillOpacity - {Number} 填充不透明度。默认为0.4。
 * stroke - {Boolean} 不需要描边则设为false。
 * strokeColor - {String} 十六进制描边颜色。 
 * strokeOpacity - {Number} 描边的不透明度(0-1),默认为0.4。
 * strokeWidth - {Number} 像素描边宽度，默认为1。
 * strokeLinecap - {String} strokeLinecap有三种类型butt，round，square，默认为"round"。
 * strokeDashstyle - {String} 有dot,dash,dashot,longdash,longdashdot,solid几种样式，默认为"solid"。
 * graphic - {Boolean} 不需要则设置为false。
 * pointRadius - {Number} 像素点半径，默认为6
 * pointerEvents - {String}  默认为"visiblePainted"。
 * cursor - {String} 默认为""。
 * allowRotate -{String} 是否允许图标随着运行方向旋转，默认为false。用于时空数据图层
 * externalGraphic - {String} 连接到用来渲染点的外部的图形。
 * graphicWidth - {Number} 外部图表的像素宽度。
 * graphicHeight - {Number} 外部图表的高宽度。
 * graphicOpacity - {Number} 外部图表的不透明度(0-1)。
 * graphicXOffset - {Number} 外部图表沿着x方向的偏移量。
 * graphicYOffset - {Number} 外部图表沿着y方向的偏移量Pixel。
 * rotation - {Number} 一个图表沿着其中心点（或者偏移中心指定点）在顺时针方向旋转。
 * graphicZIndex - {Number} 渲染时使用的索引值。The integer z-index value to use in rendering。
 * graphicName - {String} 渲染点时图标使用的名字。支持"circle" , "square", "star", "x", "cross", "triangle"，
 * 默认为"circle"。
 * graphicTitle - {String} 外部图表的提示框。
 * backgroundGraphic - {String} 外部图表的背景。
 * backgroundGraphicZIndex - {Number} 背景图渲染时使用的索引值。
 * backgroundXOffset - {Number} 背景图在x轴的偏移量。
 * backgroundYOffset - {Number} 背景图在x轴的偏移量。
 * backgroundHeight - {Number} 背景图的高度。如果没有设置，将用graphicHeight。
 * backgroundWidth - {Number} 背景图的宽度。如果没有设置，将用graphicWidth。
 * isUnicode - {Boolean} 这个属性要配合label属性来用，当为true时，label就可以使用unicode编码，
 * 比如"a"的unicode十六进制编码为61，则label属性可以为"&#x61;",其中"&#"为前缀，标志这个为unicode编码，
 * "x"是指16进制,这时页面显示的是"a"；当此值为false的时候，label的内容会被直接输出，
 * 比如，label为"&#x61;"，这时页面显示的也是"&#x61;"。默认为false。
 * label - {String} 可选的标签文本。
 * labelAlign - {String} 标签对齐，是由两个字符组成的字符串，如："lt", "cm", "rb"，
 * 其中第一个字符代表水平方向上的对齐，"l"=left, "c"=center, "r"=right；
 * 第二个字符代表垂直方向上的对齐，"t"=top, "m"=middle, "b"=bottom。
 * labelXOffset - {Number} 标签在x轴方向的偏移量。
 * labelYOffset - {Number} 标签在y轴方向的偏移量。
 * labelSelect - {Boolean} 如果设为true，标签可以选用SelectFeature或者similar控件，默认为false。
 * fontColor - {String} 标签字体颜色。
 * fontOpacity - {Number} 标签透明度 (0-1)。 
 * fontFamily - {String} 标签的字体类型。
 * fontSize - {String} 标签的字体大小。
 * fontStyle - {String} 标签的字体样式。
 * fontWeight - {String} 标签的字体粗细。
 * display - {String} 如果display属性设置为“none”，符号将没有任何效果。
 * (start code)
 *  // label的用法如下：
 *  function addGeoTest(){
 *  var geometry = new SuperMap.Geometry.Point(105, 35);
 *  var pointFeature = new SuperMap.Feature.Vector(geometry);
 *  var styleTest = {
 *        label:"supermap",
 *        fontColor:"#0000ff",
 *        fontOpacity:"0.5",
 *        fontFamily:"隶书",
 *        fontSize:"8em",
 *        fontWeight:"bold",
 *        fontStyle:"italic",
 *        labelSelect:"true",
 *     }
 *           pointFeature.style = styleTest;
 *          vectorLayer.addFeatures([pointFeature]);
 *         }
 * (end)
 */ 
SuperMap.Feature.Vector.style = {
    'default': {
        fillColor: "#ee9900",
        fillOpacity: 0.4, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#ee9900",
        strokeOpacity: 1,
        strokeWidth: 1,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "inherit",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3
    },
    'select': {
        fillColor: "blue",
        fillOpacity: 0.4, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "blue",
        strokeOpacity: 1,
        strokeWidth: 2,
        strokeLinecap: "round",
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        cursor: "pointer",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3

    },
    'temporary': {
        fillColor: "#66cccc",
        fillOpacity: 0.2, 
        hoverFillColor: "white",
        hoverFillOpacity: 0.8,
        strokeColor: "#66cccc",
        strokeOpacity: 1,
        strokeLinecap: "round",
        strokeWidth: 2,
        strokeDashstyle: "solid",
        hoverStrokeColor: "red",
        hoverStrokeOpacity: 1,
        hoverStrokeWidth: 0.2,
        pointRadius: 6,
        hoverPointRadius: 1,
        hoverPointUnit: "%",
        pointerEvents: "visiblePainted",
        //cursor:"inherit",
        cursor: "default",
        fontColor: "#000000",
        labelAlign: "cm",
        labelOutlineColor: "white",
        labelOutlineWidth: 3

    },
    'delete': {
        display: "none"
    }
};    
