/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
 
/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Geometry
 * 几何对象类，描述地理对象的几何图形。
 */
SuperMap.Geometry = SuperMap.Class({

    /**
     * Property: id
     * {String} A unique identifier for this geometry.
     * 此几何对象的唯一标示符。
     */
    id: null,

    /**
     * Property: parent
     * {<SuperMap.Geometry>}This is set when a Geometry is added as component
     * of another geometry
     */
    parent: null,

    /**
     * Property: bounds 
     * {<SuperMap.Bounds>} The bounds of this geometry
     * 几何对象的范围
     */
    bounds: null,

    /**
     * APIProperty: SRID
     * {Interger}投影坐标参数。通过该参数，服务器判断Geometry对象的坐标参考系是否与数据集相同，如果不同，则在数据入库前进行投影变换。
     *
     * (code)
     *   var geometry= new SuperMap.Geometry();
     *    geometry. SRID=4326;
     *  (end)
     *
     */
    SRID:null,

    /**
     * Constructor: SuperMap.Geometry
     * 创建一个几何图形的对象.  
     */
    initialize: function() {
        this.id = SuperMap.Util.createUniqueID(this.CLASS_NAME+ "_");
    },
    
    /**
     * Method: destroy
     * Destroy this geometry.
     * 解构Geometry类，释放资源。
     */
    destroy: function() {
        this.id = null;
        this.bounds = null;
        this.SRID=null;
    },
    
    /**
     * APIMethod: clone
     * 创建克隆的几何图形。克隆的几何图形不设置非标准的属性。
     * 
     * Returns:
     * {<SuperMap.Geometry>} 克隆的几何图形。
     */
    clone: function() {
        return new SuperMap.Geometry();
    },
    
    /**
     * Set the bounds for this Geometry.
     * 设置此几何对象的bounds。
     * Parameters:
     * object - {<SuperMap.Bounds>} 
     */
    setBounds: function(bounds) {
        if (bounds) {
            this.bounds = bounds.clone();
        }
    },
    
    /**
     * Method: clearBounds
     * Nullify this components bounds and that of its parent as well.
     * 清除几何对象的bounds。
     * 如果该对象有父类，也会清除父类几何对象的bounds。
     */
    clearBounds: function() {
        this.bounds = null;
        if (this.parent) {
            this.parent.clearBounds();
        }    
    },
    
    /**
     * Method: extendBounds
     * Extend the existing bounds to include the new bounds. 
     * If geometry's bounds is not yet set, then set a new Bounds.
     * 
     * Parameters:
     * newBounds - {<SuperMap.Bounds>} 
     */
    extendBounds: function(newBounds){
        var bounds = this.getBounds();
        if (!bounds) {
            this.setBounds(newBounds);
        } else {
            this.bounds.extend(newBounds);
        }
    },
    
    /**
     * APIMethod: getBounds
     * 获得几何图形的边界。如果没有设置边界，可通过计算获得。
     * 
     * Returns:
     * {<SuperMap.Bounds>}返回的几何对象的边界。
     */
    getBounds: function() {
        if (this.bounds == null) {
            this.calculateBounds();
        }
        return this.bounds;
    },
    
    /** 
     * APIMethod: calculateBounds
     * 重新计算几何图形的边界。（需要在子类中实现此方法）
     */
    calculateBounds: function() {
        //
        // This should be overridden by subclasses.
        //
    },
    
    /**
     * APIMethod: distanceTo
     * 计算两个几个图形间的最小距离（x-y平面坐标系下）。
     * （需要在子类中实现此方法）
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 目标几何图形.
     * options - {Object} 距离计算需要设计的可选属性。有效的选项取决于特定的几何类型。
     * 
     * Returns:
     * {Number | Object} 两个几个图形间的距离。
     */
    distanceTo: function(geometry, options) {
    },
    
    /**
     * APIMethod: getVertices
     * 返回几何图形的所有顶点的列表。
     * （需要在子类中实现此方法）
     * Parameters:
     * nodes - {Boolean} 如果是true，线则只返回线的末端点，如果false，仅仅返回顶点，如果没有设置，则返回顶点。
     *
     * Returns:
     * {Array} 几何图形的顶点列表。
     */
    getVertices: function(nodes) {
    },

    /**
     * Method: atPoint
     * Note - This is only an approximation based on the bounds of the 
     * geometry.
     * 确定坐标是否在几何对象的范围内。
     * 
     * Parameters:
     * lonlat - {<SuperMap.LonLat>} 
     * toleranceLon - {float} Optional tolerance in Geometric Coords
     * 可选参数，经度的偏移 。
     * toleranceLat - {float} Optional tolerance in Geographic Coords
     * 可选参数，纬度的偏移。
     *
     * Returns:
     * {Boolean} Whether or not the geometry is at the specified location
     *    判断传入的坐标是否在指定的范围内 。
     */
    atPoint: function(lonlat, toleranceLon, toleranceLat) {
        var atPoint = false;
        var bounds = this.getBounds();
        if ((bounds != null) && (lonlat != null)) {

            var dX = (toleranceLon != null) ? toleranceLon : 0;
            var dY = (toleranceLat != null) ? toleranceLat : 0;
    
            var toleranceBounds = 
                new SuperMap.Bounds(this.bounds.left - dX,
                                      this.bounds.bottom - dY,
                                      this.bounds.right + dX,
                                      this.bounds.top + dY);

            atPoint = toleranceBounds.containsLonLat(lonlat);
        }
        return atPoint;
    },
    
    /**
     * Method: getLength
     * Calculate the length of this geometry. This method is defined in
     * subclasses.
     * 计算几何对象的长度 ，此方法需要在子类中定义  。
     * 
     * Returns:
     * {Float} The length of the collection by summing its parts
     */
    getLength: function() {
        //to be overridden by geometries that actually have a length
        //
        return 0.0;
    },

    /**
     * Method: getArea
     * Calculate the area of this geometry. This method is defined in subclasses.
     *     计算几何对象的面积 ，此方法需要在子类中定义  。
     *
     * Returns:
     * {Float} The area of the collection by summing its parts
     */
    getArea: function() {
        //to be overridden by geometries that actually have an area
        //
        return 0.0;
    },
    
    /**
     * APIMethod: getCentroid
     * 计算几何图形的质心。
     * （需要在子类中实现此方法）
     * Returns:
     * {<SuperMap.Geometry.Point>} 采集的质心。
     */
    getCentroid: function() {
        return null;
    },

    /**
     * Method: toString
     * 返回geometry对象的字符串表述，需要引入SuperMap.Format.WKT.(Returns the Well-Known Text representation of a geometry.If the WKT format is
     *     included in a build, this will be the Well-Known Text
     *     representation.)此方法只能在子类实现，在父类使用会报错。
     *
     * Returns:
     * {String} geometry对象的字符串表述(Well-Known Text)
     */
    toString: function() {
        var string;
        if (SuperMap.Format && SuperMap.Format.WKT) {
            string = SuperMap.Format.WKT.prototype.write(
                new SuperMap.Feature.Vector(this)
            );
        } else {
            string = Object.prototype.toString.call(this);
        }
        return string;
    },

    CLASS_NAME: "SuperMap.Geometry"
});

/**
 * Function: SuperMap.Geometry.fromWKT
 * 从一个给定的字符串生成一个geometry对象，需要引入SuperMap.Format.WKT，该方法方可生效。
 * (Generate a geometry given a Well-Known Text string.For this method to
 *     work, you must include the SuperMap.Format.WKT in your build
 *     explicitly.)
 *
 * (code)
 *     var geometry= new SuperMap.Geometry.fromWKT("POINT(0 0)");
 *     geometry.x=0;
 * (end)
 *
 * Parameters:
 * wkt - {String} 描述geometry信息的字符串(A string representing the geometry in Well-Known Text.)
 *
 * Returns:
 * {<SuperMap.Geometry>} 适当类型的geometry对象(A geometry of the appropriate class).
 */
SuperMap.Geometry.fromWKT = function(wkt) {
    var geom;
    if (SuperMap.Format && SuperMap.Format.WKT) {
        var format = SuperMap.Geometry.fromWKT.format;
        if(!format) {
            format = new SuperMap.Format.WKT();
            SuperMap.Geometry.fromWKT.format = format;
        }
        var result = format.read(wkt);
        if(result instanceof SuperMap.Feature.Vector) {
            geom = result.geometry;
        } else if(SuperMap.Util.isArray(result)) {
            var len = result.length;
            var components = new Array(len);
            for(var i=0; i<len; ++i) {
                components[i] = result[i].geometry;
            }
            geom = new SuperMap.Geometry.Collection(components);
        }
    }
    return geom;
};
    
/**
 * Method: SuperMap.Geometry.segmentsIntersect
 *  线段相交
 * Determine whether two line segments intersect.  Optionally calculates
 *     and returns the intersection point.  This function is optimized for
 *     cases where seg1.x2 >= seg2.x1 || seg2.x2 >= seg1.x1.  In those
 *     obvious cases where there is no intersection, the function should
 *     not be called.
 *    该方法是判断两条线段是否相交。计算并返回相交的point。如果seg1.x2 >= seg2.x1 || seg2.x2 >= seg1.x1 ，该方法明显不会被调用。
 *
 * Parameters:
 * seg1 - {Object} Object representing a segment with properties x1, y1, x2,
 *     and y2.  The start point is represented by x1 and y1.  The end point
 *     is represented by x2 and y2.  Start and end are ordered so that x1 < x2.
 *     该对象包含的属性是 x1, y1, x2,和y2。
 *     起始点是 由x1 and y1构成，终点是有x2 and y2组成，必须满足的是x1 < x2。
 *
 * seg2 - {Object} Object representing a segment with properties x1, y1, x2,
 *     and y2.  The start point is represented by x1 and y1.  The end point
 *     is represented by x2 and y2.  Start and end are ordered so that x1 < x2.
 *     该对象包含的属性是 x1, y1, x2,和y2。
 *     起始点是 由x1 and y1构成，终点是有x2 and y2组成，必须满足的是x1 < x2。
 * options - {Object} Optional properties for calculating the intersection.
 *  该对象是判断是否计算相交的点。
 *
 * Valid options:
 * point - {Boolean} Return the intersection point.  If false, the actual
 *     intersection point will not be calculated.  If true and the segments
 *     intersect, the intersection point will be returned.  If true and
 *     the segments do not intersect, false will be returned.  If true and
 *     the segments are coincident, true will be returned.
 *     返回相交点。如果设置为false，说明实际的相交点不需要计算出来。如果设置为true,并且这两条线段相交，返回相交的点 。
 *     如果设置为true，但是两条线段不相交，返回false。如果设置为true，但是两条线段平行，则返回true。
 * tolerance - {Number} If a non-null value is provided, if the segments are
 *     within the tolerance distance, this will be considered an intersection.
 *     In addition, if the point option is true and the calculated intersection
 *     is within the tolerance distance of an end point, the endpoint will be
 *     returned instead of the calculated intersection.  Further, if the
 *     intersection is within the tolerance of endpoints on both segments, or
 *     if two segment endpoints are within the tolerance distance of eachother
 *     (but no intersection is otherwise calculated), an endpoint on the
 *     first segment provided will be returned.
 *     如果设置该值不为空，两条线段在容线的范围内，则会被当作相交。此外，如果point这个属性为true，计算相交的容线距离终点,端点将返回而不是计算相交。
 *
 *
 *
 * Returns:
 * {Boolean | <SuperMap.Geometry.Point>}  The two segments intersect.
 *     If the point argument is true, the return will be the intersection
 *     point or false if none exists.  If point is true and the segments
 *     are coincident, return will be true (and the instersection is equal
 *     to the shorter segment).
 *     返回线之间是否相交，如果设置点属性为true的话，会返回相交的点坐标。如果点为true，线重合，将会返回true（相交的等于最短的线）。
 */
SuperMap.Geometry.segmentsIntersect = function(seg1, seg2, options) {
    var point = options && options.point;
    var tolerance = options && options.tolerance;
    var intersection = false;
    var x11_21 = seg1.x1 - seg2.x1;
    var y11_21 = seg1.y1 - seg2.y1;
    var x12_11 = seg1.x2 - seg1.x1;
    var y12_11 = seg1.y2 - seg1.y1;
    var y22_21 = seg2.y2 - seg2.y1;
    var x22_21 = seg2.x2 - seg2.x1;
    var d = (y22_21 * x12_11) - (x22_21 * y12_11);
    var n1 = (x22_21 * y11_21) - (y22_21 * x11_21);
    var n2 = (x12_11 * y11_21) - (y12_11 * x11_21);
    if(d == 0) {
        // parallel
        if(n1 == 0 && n2 == 0) {
            // coincident
            intersection = true;
        }
    } else {
        var along1 = n1 / d;
        var along2 = n2 / d;
        if(along1 >= 0 && along1 <= 1 && along2 >=0 && along2 <= 1) {
            // intersect
            if(!point) {
                intersection = true;
            } else {
                // calculate the intersection point
                var x = seg1.x1 + (along1 * x12_11);
                var y = seg1.y1 + (along1 * y12_11);
                intersection = new SuperMap.Geometry.Point(x, y);
            }
        }
    }
    if(tolerance) {
        var dist;
        if(intersection) {
            if(point) {
                var segs = [seg1, seg2];
                var seg, x, y;
                // check segment endpoints for proximity to intersection
                // set intersection to first endpoint within the tolerance
                outer: for(var i=0; i<2; ++i) {
                    seg = segs[i];
                    for(var j=1; j<3; ++j) {
                        x = seg["x" + j];
                        y = seg["y" + j];
                        dist = Math.sqrt(
                            Math.pow(x - intersection.x, 2) +
                            Math.pow(y - intersection.y, 2)
                        );
                        if(dist < tolerance) {
                            intersection.x = x;
                            intersection.y = y;
                            break outer;
                        }
                    }
                }
                
            }
        } else {
            // no calculated intersection, but segments could be within
            // the tolerance of one another
            var segs = [seg1, seg2];
            var source, target, x, y, p, result;
            // check segment endpoints for proximity to intersection
            // set intersection to first endpoint within the tolerance
            outer: for(var i=0; i<2; ++i) {
                source = segs[i];
                target = segs[(i+1)%2];
                for(var j=1; j<3; ++j) {
                    p = {x: source["x"+j], y: source["y"+j]};
                    result = SuperMap.Geometry.distanceToSegment(p, target);
                    if(result.distance < tolerance) {
                        if(point) {
                            intersection = new SuperMap.Geometry.Point(p.x, p.y);
                        } else {
                            intersection = true;
                        }
                        break outer;
                    }
                }
            }
        }
    }
    return intersection;
};

/**
 * Function: SuperMap.Geometry.distanceToSegment
 * 计算点到直线的距离
 *
 * Parameters:
 * point - {Object} An object with x and y properties representing the
 *     point coordinates.
 *     一个点包含x和y坐标。
 * segment - {Object} An object with x1, y1, x2, and y2 properties
 *     representing endpoint coordinates.
 *     一个对象包含 x1, y1, x2, and y2坐标。
 *     (code)
 *        var point={
 *         x:0,
 *          y:13
*          } ,
*            seg1={
*             x1:6,
*             y1:5,
*            x2:6,
*            y2:12
*       } ;
 *       var geo=SuperMap.Geometry.distanceToSegment(point,seg1);
 *     (end)
 *
 * Returns:
 * {Object} An object with distance, x, and y properties.  The distance
 *     will be the shortest distance between the input point and segment.
 *     The x and y properties represent the coordinates along the segment
 *     where the shortest distance meets the segment.
 *     返回的是点到直线的最短距离，以及点与直线最短距离相交的点坐标（x,y）。
 */
SuperMap.Geometry.distanceToSegment = function(point, segment) {
    var x0 = point.x;
    var y0 = point.y;
    var x1 = segment.x1;
    var y1 = segment.y1;
    var x2 = segment.x2;
    var y2 = segment.y2;
    var dx = x2 - x1;
    var dy = y2 - y1;
    var along = ((dx * (x0 - x1)) + (dy * (y0 - y1))) /
                (Math.pow(dx, 2) + Math.pow(dy, 2));
    var x, y;
    if(along <= 0.0) {
        x = x1;
        y = y1;
    } else if(along >= 1.0) {
        x = x2;
        y = y2;
    } else {
        x = x1 + along * dx;
        y = y1 + along * dy;
    }
    return {
        distance: Math.sqrt(Math.pow(x - x0, 2) + Math.pow(y - y0, 2)),
        x: x, y: y
    };
};
