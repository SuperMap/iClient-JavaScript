/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry/LineString.js
 */

/**
 * Class: SuperMap.Geometry.LinearRing
 * 
 * 几何对象线环类，是一个特殊的封闭的线串，在每次addPoint/removePoint之后会通过添加一个点（此点是复制的第一个点得到的）
 * 作为最后的一个点来自动关闭线环。
 * 
 * Inherits:
 *  - <SuperMap.Geometry.LineString>
 */
SuperMap.Geometry.LinearRing = SuperMap.Class(
  SuperMap.Geometry.LineString, {

    /**
     * Property: componentTypes
     * {Array(String)} An array of class names representing the types of 
     *                 components that the collection can include.  A null 
     *                 value means the component types are not restricted.
     */
    componentTypes: ["SuperMap.Geometry.Point"],

    /**
     * Constructor: SuperMap.Geometry.LinearRing
     * 实例化线性环对象。例如：
     *
     * Parameters:
     * points - {Array(<SuperMap.Geometry.Point>)} 组成线性环的点。
     * 
     * (code)
     *  var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
     *      new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
     *      new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
     *      new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
     *      new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)],     
     *  linearRing = new SuperMap.Geometry.LinearRing(points);
     * (end)
     */
     
     initialize: function(points) {
         SuperMap.Geometry.LineString.prototype.initialize.apply(this,
                                                                   arguments);
     },

    /**
     * APIMethod: addComponent
     * 添加一个点到几何图形数组中，如果这个点将要被添加到组件数组的末端，并且与数组中已经存在的最后一个点相同，
     * 重复的点是不能被添加的。这将影响未关闭环的关闭。
     * 这个方法可以通过将非空索引（组件数组的下标）作为第二个参数重写。
     *
     * Parameter:
     * point - {<SuperMap.Geometry.Point>} 点对象。
     * index - {Integer} 插入组件数组的下标。
     * 
     * Returns:
     * {Boolean} 点对象是否添加成功。
     */
    addComponent: function(point, index) {
        var added = false;

        //remove last point
        var lastPoint = this.components.pop();

        // given an index, add the point
        // without an index only add non-duplicate points
        if(index != null || !point.equals(lastPoint)) {
            added = SuperMap.Geometry.Collection.prototype.addComponent.apply(this, 
                                                                    arguments);
        }

        //append copy of first point
        var firstPoint = this.components[0];
        SuperMap.Geometry.Collection.prototype.addComponent.apply(this, 
                                                                [firstPoint]);
        
        return added;
    },
    
    /**
     * APIMethod: removeComponent
     * 从几何组件中删除一个点。
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>} 点对象。
     *
     * Returns: 
     * {Boolean} 点对象是否删除。
     */
    removeComponent: function(point) {
        var removed = this.components && (this.components.length > 3);
        if (removed) {
            //remove last point
            this.components.pop();
            
            //remove our point
            SuperMap.Geometry.Collection.prototype.removeComponent.apply(this, 
                                                                    arguments);
            //append copy of first point
            var firstPoint = this.components[0];
            SuperMap.Geometry.Collection.prototype.addComponent.apply(this, 
                                                                [firstPoint]);
        }
        return removed;
    },
    
    /**
     * APIMethod: move
     * 沿着给定的x、y轴正方向按照给定的位移移动一个几何图形，move 不仅改变了几何图形的位置并且清理了边界缓存。
     *
     * Parameters:
     * x - {Float} x轴正方向上的偏移量。
     * y - {Float} y轴正方向上的偏移量。
     */
    move: function(x, y) {
        for(var i = 0, len=this.components.length; i<len - 1; i++) {
            this.components[i].move(x, y);
        }
    },

    /**
     * APIMethod: rotate
     * 围绕中心点旋转几何图形。
     *
     * Parameters:
     * angle - {Float} 旋转角的度数（沿着x轴正方向的逆时针方向）。
     * origin - {<SuperMap.Geometry.Point>} 旋转中心点。
     */
    rotate: function(angle, origin) {
        for(var i=0, len=this.components.length; i<len - 1; ++i) {
            this.components[i].rotate(angle, origin);
        }
    },

    /**
     * APIMethod: resize
     * 调整几何对象的大小。
     *
     * Parameters:
     * scale - {Float} 几何图形缩放的比例系数，是几何图形维数的两倍。
     * （如：对于线来说将以线2倍的长度拉长，对于多边形来说，将以面积的4倍变化）。
     * origin - {<SuperMap.Geometry.Point>} 调整大小选定的起始原点。
     * ratio - {Float} 可选的x,y的比例，默认的比例为1。
     * 
     * Returns:
     * {SuperMap.Geometry} - 当前的几何对象。
     */
    resize: function(scale, origin, ratio) {
        for(var i=0, len=this.components.length; i<len - 1; ++i) {
            this.components[i].resize(scale, origin, ratio);
        }
        return this;
    },
    
    /**
     * APIMethod: transform
     * 投影转换。
     *
     * Parameters:
     * source - {<SuperMap.Projection>} 源对象投影。
     * dest - {<SuperMap.Projection>} 目标对象投影。
     * 
     * Returns:
     * {<SuperMap.Geometry>} 
     */
    transform: function(source, dest) {
        if (source && dest) {
            for (var i=0, len=this.components.length; i<len - 1; i++) {
                var component = this.components[i];
                component.transform(source, dest);
            }
            this.bounds = null;
        }
        return this;
    },
    
    /**
     * APIMethod: getCentroid
     * 获取几何对象的质心。
     * Returns:
     * {<SuperMap.Geometry.Point>} 几何图形的质心。
     */
    getCentroid: function() {
        if (this.components && (this.components.length > 2)) {
            var sumX = 0.0;
            var sumY = 0.0;
            for (var i = 0; i < this.components.length - 1; i++) {
                var b = this.components[i];
                var c = this.components[i+1];
                sumX += (b.x + c.x) * (b.x * c.y - c.x * b.y);
                sumY += (b.y + c.y) * (b.x * c.y - c.x * b.y);
            }
            var area = -1 * this.getArea();
            var x = sumX / (6 * area);
            var y = sumY / (6 * area);
            return new SuperMap.Geometry.Point(x, y);
        } else {
            return null;
        }
    },

    /**
     * APIMethod: getArea
     * 获得当前几何对象区域大小，如果是沿顺时针方向的环则是正值，否则为负值。
     * 
     * Returns:
     * {Float} 环的面积。
     */
    getArea: function() {
        var area = 0.0;
        if ( this.components && (this.components.length > 2)) {
            var sum = 0.0;
            for (var i=0, len=this.components.length; i<len - 1; i++) {
                var b = this.components[i];
                var c = this.components[i+1];
                sum += (b.x + c.x) * (c.y - b.y);
            }
            area = - sum / 2.0;
        }
        return area;
    },
    
    /**
     * APIMethod: getGeodesicArea
     * 计算投影到球面上的几何对象的近似面积。 如果是沿顺时针方向的环则是正值，否则为负值。
     *
     * Parameters:
     * projection - {<SuperMap.Projection>} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     * 
     * Returns:
     * {float} 几何图形的近似测地面积。
     */
    getGeodesicArea: function(projection) {
        var ring = this;  // so we can work with a clone if needed
        if(projection) {
            var gg = new SuperMap.Projection("EPSG:4326");
            if(!gg.equals(projection)) {
                ring = this.clone().transform(projection, gg);
            }
        }
        var area = 0.0;
        var len = ring.components && ring.components.length;
        if(len > 2) {
            var p1, p2;
            for(var i=0; i<len-1; i++) {
                p1 = ring.components[i];
                p2 = ring.components[i+1];
                area += SuperMap.Util.rad(p2.x - p1.x) *
                        (2 + Math.sin(SuperMap.Util.rad(p1.y)) +
                        Math.sin(SuperMap.Util.rad(p2.y)));
            }
            area = area * 6378137.0 * 6378137.0 / 2.0;
        }
        return area;
    },
    
    /**
     * Method: containsPoint
     * Test if a point is inside a linear ring.  For the case where a point
     *     is coincident with a linear ring edge, returns 1.  Otherwise,
     *     returns boolean.
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}
     *
     * Returns:
     * {Boolean | Number} The point is inside the linear ring.  Returns 1 if
     *     the point is coincident with an edge.  Returns boolean otherwise.
     */
    containsPoint: function(point) {
        var approx = SuperMap.Number.limitSigDigs;
        var digs = 14;
        var px = approx(point.x, digs);
        var py = approx(point.y, digs);
        function getX(y, x1, y1, x2, y2) {
            return (y - y2) * ((x2 - x1) / (y2 - y1)) + x2;
        }
        var numSeg = this.components.length - 1;
        var start, end, x1, y1, x2, y2, cx, cy;
        var crosses = 0;
        for(var i=0; i<numSeg; ++i) {
            start = this.components[i];
            x1 = approx(start.x, digs);
            y1 = approx(start.y, digs);
            end = this.components[i + 1];
            x2 = approx(end.x, digs);
            y2 = approx(end.y, digs);
            
            /**
             * The following conditions enforce five edge-crossing rules:
             *    1. points coincident with edges are considered contained;
             *    2. an upward edge includes its starting endpoint, and
             *    excludes its final endpoint;
             *    3. a downward edge excludes its starting endpoint, and
             *    includes its final endpoint;
             *    4. horizontal edges are excluded; and
             *    5. the edge-ray intersection point must be strictly right
             *    of the point P.
             */
            if(y1 === y2) {
                // horizontal edge
                if(py === y1) {
                    // point on horizontal line
                    if(x1 <= x2 && (px >= x1 && px <= x2) || // right or vert
                       x1 >= x2 && (px <= x1 && px >= x2)) { // left or vert
                        // point on edge
                        crosses = -1;
                        break;
                    }
                }
                // ignore other horizontal edges
                continue;
            }
            cx = approx(getX(py, x1, y1, x2, y2), digs);
            if(cx === px) {
                // point on line
                if(y1 < y2 && (py >= y1 && py <= y2) || // upward
                   y1 > y2 && (py <= y1 && py >= y2)) { // downward
                    // point on edge
                    crosses = -1;
                    break;
                }
            }
            if(cx <= px) {
                // no crossing to the right
                continue;
            }
            if(x1 !== x2 && (cx < Math.min(x1, x2) || cx > Math.max(x1, x2))) {
                // no crossing
                continue;
            }
            if(y1 < y2 && (py >= y1 && py < y2) || // upward
               y1 > y2 && (py < y1 && py >= y2)) { // downward
                ++crosses;
            }
        }
        var contained = (crosses === -1) ?
            // on edge
            1 :
            // even (out) or odd (in)
            !!(crosses & 1);

        return contained;
    },

    /**
     * APIMethod: intersects
     * 判断输入的几何图形是否与当前几何图形相交。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 任意的几何对象。
     *
     * Returns:
     * {Boolean} 输入几何图形与当前的目标几何图形相交。
     */
    intersects: function(geometry) {
        var intersect = false;
        if(geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
            intersect = this.containsPoint(geometry);
        } else if(geometry.CLASS_NAME === "SuperMap.Geometry.LineString") {
            intersect = geometry.intersects(this);
        } else if(geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") {
            intersect = SuperMap.Geometry.LineString.prototype.intersects.apply(
                this, [geometry]
            );
        } else {
            // check for component intersections
            for(var i=0, len=geometry.components.length; i<len; ++ i) {
                intersect = geometry.components[i].intersects(this);
                if(intersect) {
                    break;
                }
            }
        }
        return intersect;
    },

    /**
     * APIMethod: getVertices
     * 返回几何图形的所有点的列表。
     *
     * Parameters:
     * nodes - {Boolean} 对于线来说，仅仅返回作为端点的顶点，如果设为false，则返回非端点的顶点
     * 如果没有设置此参数，则返回所有顶点。
     *
     * Returns:
     * {Array} 几何对象所有点的列表。
     */
    getVertices: function(nodes) {
        return (nodes === true) ? [] : this.components.slice(0, this.components.length-1);
    },

    CLASS_NAME: "SuperMap.Geometry.LinearRing"
});
