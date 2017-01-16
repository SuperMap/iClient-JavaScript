/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry/Curve.js
 */

/**
 * Class: SuperMap.Geometry.LineString
 * 几何对象线串类。
 * 
 * Inherits from:
 *  - <SuperMap.Geometry.Curve>
 */
SuperMap.Geometry.LineString = SuperMap.Class(SuperMap.Geometry.Curve, {

    /**
     * Constructor: SuperMap.Geometry.LineString
     * 创建新的线串几何对象。
     * 
     * Parameters:
     * points - {Array(<SuperMap.Geometry.Point>)} 用来生成线串的点数组。
     * 
     * (code)
     * var points = [new SuperMap.Geometry.Point(4933.319287022352, -3337.3849141502124),
     *     new SuperMap.Geometry.Point(4960.9674060199022, -3349.3316322355736),
     *     new SuperMap.Geometry.Point(5006.0235999418364, -3358.8890067038628),
     *     new SuperMap.Geometry.Point(5075.3145648369318, -3378.0037556404409),
     *     new SuperMap.Geometry.Point(5305.19551436013, -3376.9669111768926)],
     *  roadLine = new SuperMap.Geometry.LineString(points)；
     * (end)
     */
     
     initialize: function(points) {
         SuperMap.Geometry.Curve.prototype.initialize.apply(this, arguments);
     },

    /**
     * APIMethod: removeComponent
     * 只有在线串上有三个或更多的点的时候，才会允许移除点（否则结果将会是单一的点）。
     *
     * Parameters: 
     * point - {<SuperMap.Geometry.Point>} 将被删除的点。
     *
     * Returns: 
     * {Boolean} 删除的点。
     */
    removeComponent: function(point) {
        var removed = this.components && (this.components.length > 2);
        if (removed) {
            SuperMap.Geometry.Collection.prototype.removeComponent.apply(this, 
                                                                  arguments);
        }
        return removed;
    },
    
    /**
     * APIMethod: intersects
     * 判断两个几何图形是否相交。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 任意的几何类型。
     *
     * Returns:
     * {Boolean} 输入几何图形与当前几何图形是否相交。
     */
    intersects: function(geometry) {
        var intersect = false;
        var type = geometry.CLASS_NAME;
        if(type === "SuperMap.Geometry.LineString" ||
           type === "SuperMap.Geometry.LinearRing" ||
           type === "SuperMap.Geometry.Point") {
            var segs1 = this.getSortedSegments();
            var segs2;
            if(type === "SuperMap.Geometry.Point") {
                segs2 = [{
                    x1: geometry.x, y1: geometry.y,
                    x2: geometry.x, y2: geometry.y
                }];
            } else {
                segs2 = geometry.getSortedSegments();
            }
            var seg1, seg1x1, seg1x2, seg1y1, seg1y2,
                seg2, seg2y1, seg2y2;
            // sweep right
            outer: for(var i=0, len=segs1.length; i<len; ++i) {
                seg1 = segs1[i];
                seg1x1 = seg1.x1;
                seg1x2 = seg1.x2;
                seg1y1 = seg1.y1;
                seg1y2 = seg1.y2;
                inner: for(var j=0, jlen=segs2.length; j<jlen; ++j) {
                    seg2 = segs2[j];
                    if(seg2.x1 > seg1x2) {
                        // seg1 still left of seg2
                        break;
                    }
                    if(seg2.x2 < seg1x1) {
                        // seg2 still left of seg1
                        continue;
                    }
                    seg2y1 = seg2.y1;
                    seg2y2 = seg2.y2;
                    if(Math.min(seg2y1, seg2y2) > Math.max(seg1y1, seg1y2)) {
                        // seg2 above seg1
                        continue;
                    }
                    if(Math.max(seg2y1, seg2y2) < Math.min(seg1y1, seg1y2)) {
                        // seg2 below seg1
                        continue;
                    }
                    if(SuperMap.Geometry.segmentsIntersect(seg1, seg2)) {
                        intersect = true;
                        break outer;
                    }
                }
            }
        } else {
            intersect = geometry.intersects(this);
        }
        return intersect;
    },
    
    /**
     * Method: getSortedSegments
     *
     * Returns:
     * {Array} An array of segment objects.  Segment objects have properties
     *     x1, y1, x2, and y2.  The start point is represented by x1 and y1.
     *     The end point is represented by x2 and y2.  Start and end are
     *     ordered so that x1 < x2.
     */
    getSortedSegments: function() {
        var numSeg = this.components.length - 1;
        var segments = new Array(numSeg), point1, point2;
        for(var i=0; i<numSeg; ++i) {
            point1 = this.components[i];
            point2 = this.components[i + 1];
            if(point1.x < point2.x) {
                segments[i] = {
                    x1: point1.x,
                    y1: point1.y,
                    x2: point2.x,
                    y2: point2.y
                };
            } else {
                segments[i] = {
                    x1: point2.x,
                    y1: point2.y,
                    x2: point1.x,
                    y2: point1.y
                };
            }
        }
        // more efficient to define this somewhere static
        function byX1(seg1, seg2) {
            return seg1.x1 - seg2.x1;
        }
        return segments.sort(byX1);
    },
    
    /**
     * Method: splitWithSegment
     * Split this geometry with the given segment.
     *
     * Parameters:
     * seg - {Object} An object with x1, y1, x2, and y2 properties referencing
     *     segment endpoint coordinates.
     * options - {Object} Properties of this object will be used to determine
     *     how the split is conducted.
     *
     * Valid options:
     * edge - {Boolean} Allow splitting when only edges intersect.  Default is
     *     true.  If false, a vertex on the source segment must be within the
     *     tolerance distance of the intersection to be considered a split.
     * tolerance - {Number} If a non-null value is provided, intersections
     *     within the tolerance distance of one of the source segment's
     *     endpoints will be assumed to occur at the endpoint.
     *
     * Returns:
     * {Object} An object with *lines* and *points* properties.  If the given
     *     segment intersects this linestring, the lines array will reference
     *     geometries that result from the split.  The points array will contain
     *     all intersection points.  Intersection points are sorted along the
     *     segment (in order from x1,y1 to x2,y2).
     */
    splitWithSegment: function(seg, options) {
        var edge = !(options && options.edge === false);
        var tolerance = options && options.tolerance;
        var lines = [];
        var verts = this.getVertices();
        var points = [];
        var intersections = [];
        var split = false;
        var vert1, vert2, point;
        var node, vertex, target;
        var interOptions = {point: true, tolerance: tolerance};
        var result = null;
        for(var i=0, stop=verts.length-2; i<=stop; ++i) {
            vert1 = verts[i];
            points.push(vert1.clone());
            vert2 = verts[i+1];
            target = {x1: vert1.x, y1: vert1.y, x2: vert2.x, y2: vert2.y};
            point = SuperMap.Geometry.segmentsIntersect(
                seg, target, interOptions
            );
            if(point instanceof SuperMap.Geometry.Point) {
                if((point.x === seg.x1 && point.y === seg.y1) ||
                   (point.x === seg.x2 && point.y === seg.y2) ||
                   point.equals(vert1) || point.equals(vert2)) {
                    vertex = true;
                } else {
                    vertex = false;
                }
                if(vertex || edge) {
                    // push intersections different than the previous
                    if(!point.equals(intersections[intersections.length-1])) {
                        intersections.push(point.clone());
                    }
                    if(i === 0) {
                        if(point.equals(vert1)) {
                            continue;
                        }
                    }
                    if(point.equals(vert2)) {
                        continue;
                    }
                    split = true;
                    if(!point.equals(vert1)) {
                        points.push(point);
                    }
                    lines.push(new SuperMap.Geometry.LineString(points));
                    points = [point.clone()];
                }
            }
        }
        if(split) {
            points.push(vert2.clone());
            lines.push(new SuperMap.Geometry.LineString(points));
        }
        if(intersections.length > 0) {
            // sort intersections along segment
            var xDir = seg.x1 < seg.x2 ? 1 : -1;
            var yDir = seg.y1 < seg.y2 ? 1 : -1;
            result = {
                lines: lines,
                points: intersections.sort(function(p1, p2) {
                    return (xDir * p1.x - xDir * p2.x) || (yDir * p1.y - yDir * p2.y);
                })
            };
        }
        return result;
    },

    /**
     * Method: split
     * Use this geometry (the source) to attempt to split a target geometry.
     * 
     * Parameters:
     * target - {<SuperMap.Geometry>} The target geometry.
     * options - {Object} Properties of this object will be used to determine
     *     how the split is conducted.
     *
     * Valid options:
     * mutual - {Boolean} Split the source geometry in addition to the target
     *     geometry.  Default is false.
     * edge - {Boolean} Allow splitting when only edges intersect.  Default is
     *     true.  If false, a vertex on the source must be within the tolerance
     *     distance of the intersection to be considered a split.
     * tolerance - {Number} If a non-null value is provided, intersections
     *     within the tolerance distance of an existing vertex on the source
     *     will be assumed to occur at the vertex.
     * 
     * Returns:
     * {Array} A list of geometries (of this same type as the target) that
     *     result from splitting the target with the source geometry.  The
     *     source and target geometry will remain unmodified.  If no split
     *     results, null will be returned.  If mutual is true and a split
     *     results, return will be an array of two arrays - the first will be
     *     all geometries that result from splitting the source geometry and
     *     the second will be all geometries that result from splitting the
     *     target geometry.
     */
    split: function(target, options) {
        var results = null;
        var mutual = options && options.mutual;
        var sourceSplit, targetSplit, sourceParts, targetParts;
        if(target instanceof SuperMap.Geometry.LineString) {
            var verts = this.getVertices();
            var vert1, vert2, seg, splits, lines, point;
            var points = [];
            sourceParts = [];
            for(var i=0, stop=verts.length-2; i<=stop; ++i) {
                vert1 = verts[i];
                vert2 = verts[i+1];
                seg = {
                    x1: vert1.x, y1: vert1.y,
                    x2: vert2.x, y2: vert2.y
                };
                targetParts = targetParts || [target];
                if(mutual) {
                    points.push(vert1.clone());
                }
                for(var j=0; j<targetParts.length; ++j) {
                    splits = targetParts[j].splitWithSegment(seg, options);
                    if(splits) {
                        // splice in new features
                        lines = splits.lines;
                        if(lines.length > 0) {
                            lines.unshift(j, 1);
                            Array.prototype.splice.apply(targetParts, lines);
                            j += lines.length - 2;
                        }
                        if(mutual) {
                            for(var k=0, len=splits.points.length; k<len; ++k) {
                                point = splits.points[k];
                                if(!point.equals(vert1)) {
                                    points.push(point);
                                    sourceParts.push(new SuperMap.Geometry.LineString(points));
                                    if(point.equals(vert2)) {
                                        points = [];
                                    } else {
                                        points = [point.clone()];
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if(mutual && sourceParts.length > 0 && points.length > 0) {
                points.push(vert2.clone());
                sourceParts.push(new SuperMap.Geometry.LineString(points));
            }
        } else {
            results = target.splitWith(this, options);
        }
        if(targetParts && targetParts.length > 1) {
            targetSplit = true;
        } else {
            targetParts = [];
        }
        if(sourceParts && sourceParts.length > 1) {
            sourceSplit = true;
        } else {
            sourceParts = [];
        }
        if(targetSplit || sourceSplit) {
            if(mutual) {
                results = [sourceParts, targetParts];
            } else {
                results = targetParts;
            }
        }
        return results;
    },

    /**
     * Method: splitWith
     * Split this geometry (the target) with the given geometry (the source).
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} A geometry used to split this
     *     geometry (the source).
     * options - {Object} Properties of this object will be used to determine
     *     how the split is conducted.
     *
     * Valid options:
     * mutual - {Boolean} Split the source geometry in addition to the target
     *     geometry.  Default is false.
     * edge - {Boolean} Allow splitting when only edges intersect.  Default is
     *     true.  If false, a vertex on the source must be within the tolerance
     *     distance of the intersection to be considered a split.
     * tolerance - {Number} If a non-null value is provided, intersections
     *     within the tolerance distance of an existing vertex on the source
     *     will be assumed to occur at the vertex.
     * 
     * Returns:
     * {Array} A list of geometries (of this same type as the target) that
     *     result from splitting the target with the source geometry.  The
     *     source and target geometry will remain unmodified.  If no split
     *     results, null will be returned.  If mutual is true and a split
     *     results, return will be an array of two arrays - the first will be
     *     all geometries that result from splitting the source geometry and
     *     the second will be all geometries that result from splitting the
     *     target geometry.
     */
    splitWith: function(geometry, options) {
        return geometry.split(this, options);

    },

    /**
     * APIMethod: getVertices
     * 返回几何图形的所有顶点的列表。
     *
     * Parameters:
     * nodes - {Boolean} 对于线来说，仅仅返回作为端点的顶点，如果设为false，则返回非端点的顶点
     * 如果没有设置此参数，则返回所有顶点。
     *
     * Returns:
     * {Array} 几何图形的顶点列表。
     */
    getVertices: function(nodes) {
        var vertices;
        if(nodes === true) {
            vertices = [
                this.components[0],
                this.components[this.components.length-1]
            ];
        } else if (nodes === false) {
            vertices = this.components.slice(1, this.components.length-1);
        } else {
            vertices = this.components.slice();
        }
        return vertices;
    },

    /**
     * APIMethod: distanceTo
     * 计算两个几个图形间的最小距离（x-y平面坐标系下）。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 目标几何图形。
     * options - {Object}距离计算需要设置的可选属性。有效的选项取决于特定的几何类型。
     *
     * Valid options:
     * details - {Boolean} 返回距离计算的细节，默认为false。
     * edge - {Boolean} 计算一个几何图形到目标几何图形边缘的最近距离，默认为true。 如果设为true，
     * 一个几何图形完全包含在目标几何图形中时，调用distanceTo返回非零结果，如果false，两个几何图形相交情况下
     * 调用distanceTo结果返回0，而且如果false，将不返距离。
     *
     * Returns:
     * {Number | Object} 返回一个几何图形到目标几何图形的距离。
     */
    distanceTo: function(geometry, options) {
        var edge = !(options && options.edge === false);
        var details = edge && options && options.details;
        var result, best = {};
        var min = Number.POSITIVE_INFINITY;
        if(geometry instanceof SuperMap.Geometry.Point) {
            var segs = this.getSortedSegments();
            var x = geometry.x;
            var y = geometry.y;
            var seg;
            for(var i=0, len=segs.length; i<len; ++i) {
                seg = segs[i];
                result = SuperMap.Geometry.distanceToSegment(geometry, seg);
                if(result.distance < min) {
                    min = result.distance;
                    best = result;
                    if(min === 0) {
                        break;
                    }
                } else {
                    // if distance increases and we cross y0 to the right of x0, no need to keep looking.
                    if(seg.x2 > x && ((y > seg.y1 && y < seg.y2) || (y < seg.y1 && y > seg.y2))) {
                        break;
                    }
                }
            }
            if(details) {
                best = {
                    distance: best.distance,
                    x0: best.x, y0: best.y,
                    x1: x, y1: y
                };
            } else {
                best = best.distance;
            }
        } else if(geometry instanceof SuperMap.Geometry.LineString) { 
            var segs0 = this.getSortedSegments();
            var segs1 = geometry.getSortedSegments();
            var seg0, seg1, intersection, x0, y0;
            var len1 = segs1.length;
            var interOptions = {point: true};
            outer: for(var i=0, len=segs0.length; i<len; ++i) {
                seg0 = segs0[i];
                x0 = seg0.x1;
                y0 = seg0.y1;
                for(var j=0; j<len1; ++j) {
                    seg1 = segs1[j];
                    intersection = SuperMap.Geometry.segmentsIntersect(seg0, seg1, interOptions);
                    if(intersection) {
                        min = 0;
                        best = {
                            distance: 0,
                            x0: intersection.x, y0: intersection.y,
                            x1: intersection.x, y1: intersection.y
                        };
                        break outer;
                    } else {
                        result = SuperMap.Geometry.distanceToSegment({x: x0, y: y0}, seg1);
                        if(result.distance < min) {
                            min = result.distance;
                            best = {
                                distance: min,
                                x0: x0, y0: y0,
                                x1: result.x, y1: result.y
                            };
                        }
                    }
                }
            }
            if(!details) {
                best = best.distance;
            }
            if(min !== 0) {
                // check the final vertex in this line's sorted segments
                if(seg0) {
                    result = geometry.distanceTo(
                        new SuperMap.Geometry.Point(seg0.x2, seg0.y2),
                        options
                    );
                    var dist = details ? result.distance : result;
                    if(dist < min) {
                        if(details) {
                            best = {
                                distance: min,
                                x0: result.x1, y0: result.y1,
                                x1: result.x0, y1: result.y0
                            };
                        } else {
                            best = dist;
                        }
                    }
                }
            }
        } else {
            best = geometry.distanceTo(this, options);
            // swap since target comes from this line
            if(details) {
                best = {
                    distance: best.distance,
                    x0: best.x1, y0: best.y1,
                    x1: best.x0, y1: best.y0
                };
            }
        }
        return best;
    },
    
    /**
     * APIMethod: simplify
     * 这个函数返回一个简化的线串，基于道格拉斯 - 普克简化算法进行简化。
     *
     * Parameters:
     * tolerance - {number} 地图单位上的简化的阈值。
     *
     * Returns:
     * {SuperMap.Geometry.LineString} 被简化的线串。
     */
    simplify: function(tolerance){
        if (this && this !== null) {
            var points = this.getVertices();
            if (points.length < 3) {
                return this;
            }
    
            var compareNumbers = function(a, b){
                return (a-b);
            };

            var firstPoint = 0;
            var lastPoint = points.length - 1;
            var pointIndexsToKeep = [];

            /**
             * Private function calculating the perpendicular distance
             * TODO: check whether SuperMap.Geometry.LineString::distanceTo() is faster or slower
             */
            var perpendicularDistance = function(point1, point2, point){
                //Area = |(1/2)(x1y2 + x2y3 + x3y1 - x2y1 - x3y2 - x1y3)|   *Area of triangle
                //Base = v((x1-x2)²+(x1-x2)²)                               *Base of Triangle*
                //Area = .5*Base*H                                          *Solve for height
                //Height = Area/.5/Base

                var area = Math.abs(0.5 * (point1.x * point2.y + point2.x * point.y + point.x * point1.y - point2.x * point1.y - point.x * point2.y - point1.x * point.y));
                var bottom = Math.sqrt(Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2));
                var height = area / bottom * 2;

                return height;
            };

            /**
             * Private function doing the Douglas-Peucker reduction
             */
            var douglasPeuckerReduction = function(points, firstPoint, lastPoint, tolerance){
                var maxDistance = 0;
                var indexFarthest = 0;
    
                for (var index = firstPoint, distance; index < lastPoint; index++) {
                    distance = perpendicularDistance(points[firstPoint], points[lastPoint], points[index]);
                    if (distance > maxDistance) {
                        maxDistance = distance;
                        indexFarthest = index;
                    }
                }
    
                if (maxDistance > tolerance && indexFarthest !== firstPoint) {
                    //Add the largest point that exceeds the tolerance
                    pointIndexsToKeep.push(indexFarthest);
                    douglasPeuckerReduction(points, firstPoint, indexFarthest, tolerance);
                    douglasPeuckerReduction(points, indexFarthest, lastPoint, tolerance);
                }
            };
    
            //Add the first and last index to the keepers
            pointIndexsToKeep.push(firstPoint);
            pointIndexsToKeep.push(lastPoint);
    
            //The first and the last point cannot be the same
            while (points[firstPoint].equals(points[lastPoint])) {
                lastPoint--;
                //Addition: the first point not equal to first point in the LineString is kept as well
                pointIndexsToKeep.push(lastPoint);
            }
    
            douglasPeuckerReduction(points, firstPoint, lastPoint, tolerance);
            var returnPoints = [];
            pointIndexsToKeep.sort(compareNumbers);
            for (var index = 0; index < pointIndexsToKeep.length; index++) {
                returnPoints.push(points[pointIndexsToKeep[index]]);
            }
            return new SuperMap.Geometry.LineString(returnPoints);
    
        }
        else {
            return this;
        }
    },

    CLASS_NAME: "SuperMap.Geometry.LineString"
});

/**
 * APIMethod: createCurve
 * 创建扇形对象。
 *
 * Parameters:
 * points - {Array(<SuperMap.Geometry.Point>)} 曲线经过的点串。
 * method - {String} 曲线类型，目前支持的有："lanczos","cubic","linear",默认为"lanczos"。
 * filterSize - {Number} 曲线平滑曲度，在2~10之间的数值，默认为10，不支持method为"linear"的类型。
 * lineNum - {Number} 曲线拟合的线数目，默认是80。
 * 备注：需要依赖Smooth.js
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(11983722.7315,3942864.5449));
 * points.push(new SuperMap.Geometry.Point(11986722.7315, 3946864.5449));
 * points.push(new SuperMap.Geometry.Point(11989722.7315, 3949864.5449));
 *
 * var curve = SuperMap.Geometry.LineString.createCurve(points);
 * (end)
 */
SuperMap.Geometry.LineString.createCurve = function(points,method,filterSize,lineLength) {
    var methodCurve = "lanczos";
    if(method != undefined)
        methodCurve = method;

    var filterSizeCurve = 10;
    if(filterSize != undefined)
        filterSizeCurve = filterSize;

    var smoothConfig = {
        method: methodCurve,
        clip: 'mirror',
        lanczosFilterSize: filterSizeCurve,
        cubicTension: 0
    };

    var pp = [];
    for(var i=0;i<points.length;i++)
    {
        pp.push([points[i].x,points[i].y]);
    }

    var distance = function(a, b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
    }

    var averageLineLengthCurve = 80;
    if(lineLength != undefined)
        averageLineLengthCurve = lineLength;

    var pointList = [];
    var averageLineLength, du, end, pieceCount, pieceLength, s, start, t, u, _ref, _ref2, _ref3;
    averageLineLength = distance(pp[0],pp[pp.length-1])/averageLineLengthCurve;
    pieceCount = 2;
    s = Smooth(pp, smoothConfig);
    for (t = 0, _ref = 1 / pieceCount; t < 1; t += _ref) {
        _ref2 = [s(i + t), s(i + t + 1 / pieceCount)], start = _ref2[0], end = _ref2[1];
        pieceLength = distance(start, end);
        du = averageLineLength / pieceLength;
        for (u = 0, _ref3 = 1 / pieceCount; 0 <= _ref3 ? u < _ref3 : u > _ref3; u += du) {
            var p = s(i + t + u)
            pointList.push(new SuperMap.Geometry.Point(p[0],p[1]));
        }
    }

    var p = s(i+1);
    pointList.push(new SuperMap.Geometry.Point(p[0],p[1]));

    return new SuperMap.Geometry.LineString(pointList)

};
/**
 * APIMethod: createBspline
 * 创建B样条曲线。
 * 此曲线会穿过所有的点。
 *
 * Parameters:
 * points - {Array(<SuperMap.Geometry.Point>)} 曲线经过的点串。
 * filterSize - {Number} 曲线平滑曲度，默认为10。
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(116, 39.4));
 * points.push(new SuperMap.Geometry.Point(118, 39.8));
 * points.push(new SuperMap.Geometry.Point(119, 39));
 *
 * var curve = SuperMap.Geometry.LineString.createBspline(points,5);
 * (end)
 */
SuperMap.Geometry.LineString.createBspline=  function(points,filterSize){
    //一个点无效，至少需要两个点
    if(points.length<2)
    {
        return null;
    }
    //曲线内部的所有点数组
    var pointListDraw = [];
    //设置曲线平滑曲度
    var k=10;
    if(filterSize!=undefined)
    {
        k=filterSize;
    }
    var i, j,a0,a1,a2,dt,t1,t2;
    var t_x,t_y;
    dt=1.0/k;
    //计算起始点，
    var value=Math.sqrt((Math.pow(points[1].x-points[0].x, 2) + Math.pow(points[1].y-points[0].y, 2))/2);   //取的点数组中前两个点粗略计算出的一个值
    //此为第一个控制点，此点以后可能会开放出来
    var pointFirst=new SuperMap.Geometry.Point(points[0].x-value,points[0].y-value);
    //初始化一个点数组，存放所有的控制点
    var pointListControl=[];
    //第一个控制点也就是起始点pointFirst
    pointListControl[0]=pointFirst;
    //循环用户传进的点数组
    for(i=0;i<points.length-1;i++)
    {
        //定义一个零时数组，只需要三个元素，后期用于调用贝茨曲线划线（由首尾两个挤出点和中间的控制点组成的）
        var  pointList=[];
        //
        pointList[0]=points[i];
        //由前一个控制点和当前的点生成的后一个控制点
        var point=new SuperMap.Geometry.Point(points[i].x*2-pointListControl[i].x,points[i].y*2-pointListControl[i].y);
        pointList[1]=point;
        pointListControl[i+1]=point;
        pointList[2]=points[i+1];
        //将此控制点存起来
        pointListDraw.push(pointList[0]);
        //生成当前曲线中的所有点
        for(j=0;j<=k;j++)
        {
            t1=j*dt;
            t2=t1*t1;

            a0=(t2-2*t1+1)/2.0;
            a1=(2*t1-2*t2+1)/2.0;
            a2=t2/2.0;

            t_x=a0*pointList[0].x+a1*pointList[1].x+a2*pointList[2].x;
            t_y=a0*pointList[0].y+a1*pointList[1].y+a2*pointList[2].y;
            pointListDraw.push(new SuperMap.Geometry.Point(t_x,t_y));
        }
    }
    //将最后一个用户的点存进去才能达到曲线通过所有的点
    pointListDraw.push(points[points.length-1]);
    return new SuperMap.Geometry.LineString(pointListDraw);
}

/**
 * Method: createBezier1
 * 创建1次贝塞尔曲线。
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * precision -{Number} 拆分精度，表示贝塞尔曲线上任意两点间横向或纵向的最大距离。
 *                     决定贝塞尔曲线的平滑程度。取值越小曲线越平滑。取值为大于1的整数。
 * part -{Number} 平滑度。取值越大，曲线越平滑。取值为大于1的整数。
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var bezier = SuperMap.Geometry.LineString.createBezier1(points, 20);
 * (end)
 */
SuperMap.Geometry.LineString.createBezier1 =  function(points, precision, part){
    if(part)
    {
        return SuperMap.Geometry.LineString.createBezier3(points,part);
    }
    //获取待拆分的点
    var bezierPts = [];
    for(var m = 0; m < points.length; m++){
        bezierPts[m]= points[m];
    }
    //获取输入点的数量
    var i;
    var k;
    var j = 0;
    var bExit;
    var count = bezierPts.length;
    var ptBuffer = [];
    var ok = true;
    while(ok){
        bExit= true;
        //贝塞尔分解是按4个点为一组进行的，所以小于4个点就再不进行分解
        for(i=0;i<count-3;i+=3){
            //对输入点数组进行分解
            //判断bezierPts[i]到bezierPts[i+4]是否达到精度
            if(GetBezierGap(bezierPts,i)>precision){
                bExit= false;
                //对未达到精度的bezierPts[i]到bezierPts[i+4]进行计算，得到新的ptBuffer点数组
                InciseBezier(bezierPts,i,ptBuffer);
                //去除已使用过的2个控制点
                bezierPts.splice(i+1,2);
                //将本次计算得到的5个新的点插入到bezierPts[i]位置之后，得到新的bezierPts点数组
                for(k=0;k<5;k++){
                    bezierPts.splice(i+1+k,0,ptBuffer[k+1]);
                }
                //bezierPts[i]到bezierPts[i+4]没有达到精度，所以不能跳过，i需回归初始
                i-=3;
                count= bezierPts.length;
            }
            if(bExit)
                break;
        }
        //对分解得出的新bezierPts点数组进行优化，除去相同的点
        while(j<count-1){
            if(bezierPts[j]===bezierPts[j+1]){
                bezierPts.splice(j+1,1);
                count--;
            }
            j++;
        }
        ok = false;
    }

    return new SuperMap.Geometry.LineString(bezierPts);
}

/**
 * Method: calculatePointsFBZ2
 * 计算2次贝塞尔曲线的点
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串（必须为三个点）。
 * part -{Number} 平滑度。取值越大，曲线越平滑。取值为大于1的整数。
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 2次贝塞尔曲线的所有点
 */
SuperMap.Geometry.LineString.calculatePointsFBZ2 = function (points, part) {
    if (!part) part = 20;

    //获取待拆分的点
    var bezierPts = [];
    var scale = 0.05;
    if (part > 0) {
        scale = 1 / part;
    }

    for (var i = 0; i < points.length - 2;) {
        //起始点
        var pointS = points[i];
        //控制点
        var pointC = points[i + 1];
        //结束点
        var pointE = points[i + 2];

        bezierPts.push(pointS);
        for (var t = 0; t < 1;) {
            //二次贝塞尔曲线公式
            var x = (1 - t) * (1 - t) * pointS.x + 2 * t * (1 - t) * pointC.x + t * t * pointE.x;
            var y = (1 - t) * (1 - t) * pointS.y + 2 * t * (1 - t) * pointC.y + t * t * pointE.y;
            var point = new SuperMap.Geometry.Point(x, y);
            bezierPts.push(point);
            t += scale;
        }

        i += 2;
        if (i >= points.length) {
            bezierPts.push(pointS);
        }
    }

    //需要判定一下最后一个点是否存在
    var poRE = bezierPts[bezierPts.length - 1];
    var popE = points[points.length - 1];
    if (!poRE.equals(popE)) {
        bezierPts.push(popE.clone());
    }

    return bezierPts;
}

/**
 * Method: calculatePointsFBZ3
 * 计算3次贝塞尔曲线的点
 *
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串(四个)。
 * part -{Number} 平滑度。取值越大，曲线越平滑。取值为大于1的整数。
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 3次贝塞尔曲线的所有点
 */
SuperMap.Geometry.LineString.calculatePointsFBZ3 = function (points, part) {
    if (!part) part = 20;
    //获取待拆分的点
    var bezierPts = [];
    var scale = 0.05;

    if (part > 0) {
        scale = 1 / part;
    }

    for (var i = 0; i < points.length - 3;) {
        //起始点
        var pointS = points[i];
        //第一个控制点
        var pointC1 = points[i + 1];
        //第二个控制点
        var pointC2 = points[i + 2];
        //结束点
        var pointE = points[i + 3];

        bezierPts.push(pointS);
        for (var t = 0; t < 1;) {
            //三次贝塞尔曲线公式
            var x = (1 - t) * (1 - t) * (1 - t) * pointS.x + 3 * t * (1 - t) * (1 - t) * pointC1.x + 3 * t * t * (1 - t) * pointC2.x + t * t * t * pointE.x;
            var y = (1 - t) * (1 - t) * (1 - t) * pointS.y + 3 * t * (1 - t) * (1 - t) * pointC1.y + 3 * t * t * (1 - t) * pointC2.y + t * t * t * pointE.y;
            var point = new SuperMap.Geometry.Point(x, y);
            bezierPts.push(point);
            t += scale;
        }

        i += 3;
        if (i >= points.length) {
            bezierPts.push(pointS);
        }
    }

    //需要判定一下最后一个点是否存在
    var poRE = bezierPts[bezierPts.length - 1];
    var popE = points[points.length - 1];
    if (!poRE.equals(popE)) {
        bezierPts.push(popE.clone());
    }
    return bezierPts;

}

/**
 * Method: calculatePointsFBZN
 * 计算N次贝塞尔曲线的插值点
 * 计算N次贝塞尔曲线需要N+1个点
 * 也就是传入 points ，得到的是points.length-1次贝塞尔曲线
 *
 *
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * part -{Number} 平滑度。取值越大，曲线越平滑。取值为大于1的整数。
 *
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} N次贝塞尔曲线的所有点
 */
SuperMap.Geometry.LineString.calculatePointsFBZN = function (points, part) {
    if (!part) part =points.length*8 ;

    //获取待拆分的点
    var bezierPts = [];
    var scale = 0.05;
    if (part > 0) {
        scale = 1 / part;
    }
    for (var t = 0; t <= 1;) {
        var x = 0;
        var y = 0;
        var n = points.length;
        for (var i = 0; i < points.length; i++) {
            var b = SuperMap.Geometry.LineString.BEZ(n - 1, i, t);
            x += points[i].x * b;
            y += points[i].y * b;
        }
        var point = new SuperMap.Geometry.Point(x, y);
        bezierPts.push(point);
        t += scale;
    }
    //需要判定一下最后一个点是否存在
    var poRE = bezierPts[bezierPts.length - 1];
    var popE = points[points.length - 1];
    if (!poRE.equals(popE)) {
        bezierPts.push(popE.clone());
    }
    return bezierPts;
}

/**
 * APIMethod: createBezier2
 * 创建2次贝塞尔曲线。
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串（必须为三个点）。
 * part -{Number} 平滑度。取值越大，曲线越平滑。取值为大于1的整数。
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 *
 * var bezier = SuperMap.Geometry.LineString.createBezier2(points, 20);
 * (end)
 */
SuperMap.Geometry.LineString.createBezier2 = function (points, part) {

    var bezierPts = SuperMap.Geometry.LineString.calculatePointsFBZ2(points, part);
    return new SuperMap.Geometry.LineString(bezierPts);
}

/**
 * APIMethod: createBezier3
 * 创建3次贝塞尔曲线。
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。(必须为四个点)
 * precision -{Number} 拆分精度，表示贝塞尔曲线上任意两点间横向或纵向的最大距离。
 *                     决
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var bezier = SuperMap.Geometry.LineString.createBezier3(points, 20);
 * (end)
 */
SuperMap.Geometry.LineString.createBezier3 = function (points, part) {

    var bezierPts = SuperMap.Geometry.LineString.calculatePointsFBZ3(points, part);
    return new SuperMap.Geometry.LineString(bezierPts);
}


/**
 * Method: createBezier
 * 创建3次贝塞尔曲线。
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * precision -{Number} 拆分精度，表示贝塞尔曲线上任意两点间横向或纵向的最大距离。
 *                     决定贝塞尔曲线的平滑程度。取值越小曲线越平滑。取值为大于1的整数。
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var bezier = SuperMap.Geometry.LineString.createBezier(points,1);
 * (end)
 */
SuperMap.Geometry.LineString.createBezier = function (points, precision) {
    //获取待拆分的点
    var bezierPts = [];
    for (var m = 0; m < points.length; m++) {
        bezierPts[m] = points[m];
    }
    //获取输入点的数量
    var i, k, j = 0, bExit, count = bezierPts.length;
    var ptBuffer = [];
    while (true) {
        bExit = true;
        //贝塞尔分解是按4个点为一组进行的，所以小于4个点就再不进行分解
        for (i = 0; i < count - 3; i += 3) {
            //对输入点数组进行分解
            //判断bezierPts[i]到bezierPts[i+4]是否达到精度
            if (GetBezierGap(bezierPts, i) > precision) {
                bExit = false;
                //对未达到精度的bezierPts[i]到bezierPts[i+4]进行计算，得到新的ptBuffer点数组
                InciseBezier(bezierPts, i, ptBuffer);
                //去除已使用过的2个控制点
                bezierPts.splice(i + 1, 2);
                //将本次计算得到的5个新的点插入到bezierPts[i]位置之后，得到新的bezierPts点数组
                for (k = 0; k < 5; k++) {
                    bezierPts.splice(i + 1 + k, 0, ptBuffer[k + 1]);
                }
                //bezierPts[i]到bezierPts[i+4]没有达到精度，所以不能跳过，i需回归初始
                i -= 3;
                count = bezierPts.length;
            }
            if (bExit)
                break;
        }
        //对分解得出的新bezierPts点数组进行优化，除去相同的点
        while (j < count - 1) {
            if (bezierPts[j] === bezierPts[j + 1]) {
                bezierPts.splice(j + 1, 1);
                count--;
            }
            j++;
        }
        //返回分解完成的新的bezierPts点数组
        return new SuperMap.Geometry.LineString(bezierPts);
    }
}

/**
 * Method: InciseBezier
 * 拆分贝赛尔曲线单元
 *
 * pSrcPt -{Array(<SuperMap.Geometry.Point>)} 传入的待拆分点数组。
 * j - {Number} 本次拆分的首点位置，从pSrcPt[j]（包括此点）点向后取4个点进行本次拆分。
 * pDstPt -{Array(<SuperMap.Geometry.Point>)} 将4个点拆分成7个点，pDstPt是包含此7个点的结果点数组。
 */
function InciseBezier(pSrcPt, j, pDstPt) {
    var buffer = [];
    buffer[0] = [];
    buffer[1] = [];
    buffer[2] = [];
    var i;
    for (i = 0; i < 3; i++) {
        buffer[0][i] = new SuperMap.Geometry.Point;
        buffer[0][i].x = (pSrcPt[j + i].x + pSrcPt[j + i + 1].x) / 2;
        buffer[0][i].y = (pSrcPt[j + i].y + pSrcPt[j + i + 1].y) / 2;
    }
    for (i = 0; i < 2; i++) {
        buffer[1][i] = new SuperMap.Geometry.Point;
        buffer[1][i].x = (buffer[0][i].x + buffer[0][i + 1].x) / 2;
        buffer[1][i].y = (buffer[0][i].y + buffer[0][i + 1].y) / 2;
    }

    buffer[2][0] = new SuperMap.Geometry.Point;
    buffer[2][0].x = (buffer[1][0].x + buffer[1][1].x) / 2;
    buffer[2][0].y = (buffer[1][0].y + buffer[1][1].y) / 2;
    //将输入的四个点拆分成7个点
    pDstPt[0] = pSrcPt[j];
    pDstPt[1] = buffer[0][0];
    pDstPt[2] = buffer[1][0];
    pDstPt[3] = buffer[2][0];
    pDstPt[4] = buffer[1][1];
    pDstPt[5] = buffer[0][2];
    pDstPt[6] = pSrcPt[j + 3];
    return true;

}

/**
 * Method: GetBezierGap
 * 计算贝赛尔曲线两个顶点的纵向和横向的最大距离，结果用来判断是否达到拆分精度
 *
 * pSrcPt -{Array(<SuperMap.Geometry.Point>)} 传入的待拆分点数组。
 * j - {Number} 本次拆分的首点位置，从pSrcPt[j]（包括此点）点向后取4个点进行距离计算
 */
function GetBezierGap(pSrcPt, j) {
    var gap = 0;
    for (var i = 1; i < 4; i++) {
        if (Math.abs(pSrcPt[j + i].x - pSrcPt[j + i - 1].x) > gap)
            gap = Math.abs(pSrcPt[j + i].x - pSrcPt[j + i - 1].x);
        if (Math.abs(pSrcPt[j + i].y - pSrcPt[j + i - 1].y) > gap)
            gap = Math.abs(pSrcPt[j + i].y - pSrcPt[j + i - 1].y);
    }
    return gap;
}
/**
 * APIMethod: createBezierN
 * 创建N次贝塞尔曲线。
 * 创建N次贝塞尔曲线需要N+1个点
 * 也就是传入 points ，得到的是points.length-1次贝塞尔曲线
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * part -{Number} 平滑度。取值越大，曲线越平滑。取值为大于1的整数，默认为20。
 * Returns:
 * {SuperMap.Geometry.LineString} 几何线对象
 *
 * (code)
 * //创建3次贝塞尔曲线
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var bezier = SuperMap.Geometry.LineString.createBezierN(points, 20);
 * //创建4次贝塞尔曲线
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 * points.push(new SuperMap.Geometry.Point(50,20));
 *
 * var bezier = SuperMap.Geometry.LineString.createBezierN(points, 30);
 * ......
 * (end)
 */
SuperMap.Geometry.LineString.createBezierN = function (points, part) {
    var bezierPts = SuperMap.Geometry.LineString.calculatePointsFBZN(points, part);
    return new SuperMap.Geometry.LineString(bezierPts);
}


/**
 * Method: BEZ
 * 基函数
 *
 * Parameters:
 * n -{Number}
 * k -{Number}
 * t -{Number} 0-1之间的一个数，
 * Returns:
 * {Number} 基函数的值
 *
 */
SuperMap.Geometry.LineString.BEZ = function (n, k, t) {
    return SuperMap.Geometry.LineString.combSort(n, k) * Math.pow(t, k) * Math.pow(1 - t, n - k);
}
/**
 * Method: combSort
 * 组合排序
 * 计算从1*2*...*n/(1*2*...*k*1*2*...*(n-k))的值
 *
 * Parameters:
 * n -{Number} 贝塞尔曲线的次数n
 * k -{Number} 小于N的一个数k
 * Returns:
 * {Number} 组合排序的值
 *
 */
SuperMap.Geometry.LineString.combSort = function (n, k) {
    var son = SuperMap.Geometry.LineString.factorial(n);
    var mother = SuperMap.Geometry.LineString.factorial(k) * SuperMap.Geometry.LineString.factorial(n - k);
    return son / mother;
}
/**
 * Method: factorial
 * 阶乘
 * 计算从1*2*3*4*...*n的值
 *
 * Parameters:
 * n -{Number}
 * Returns:
 * {Number} 阶乘的值
 *
 */
SuperMap.Geometry.LineString.factorial = function (n) {
    var result = 1;
    for (var i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

/**
 * Method: calculateCardinalPoints
 * 创建Cardinal控制点。
 * 利用输入的点数组计算出相应的Cardinal控制点，再使用贝塞尔曲线3创建经过所有Cardinal控制点的圆滑曲线。
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 计算出相应的Cardinal控制点。
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var cardinal = SuperMap.Geometry.LineString.createCloseCardinal(points);
 * (end)
 */
SuperMap.Geometry.LineString.calculateCardinalPoints = function (points) {
    if (points == null || points.length < 3) {
        return points;
    }
    //定义传入的点数组，将在点数组中央（每两个点）插入两个控制点
    var cPoints = points;
    //包含输入点和控制点的数组
    var cardinalPoints = [];

    //这些都是相关资料测出的经验数值
    //定义张力系数，取值在0<t<0.5
    var t = 0.4;
    //为端点张力系数因子，取值在0<b<1
    var b = 0.5;
    //误差控制，是一个大于等于0的数，用于三点非常趋近与一条直线时，减少计算量
    var e = 0.005;

    //传入的点数量，至少有三个，n至少为2
    var n = cPoints.length - 1;
    //从开始遍历到倒数第二个，其中倒数第二个用于计算起点（终点）的插值控制点

    for (var k = 0; k <= n + 1 - 3; k++) {
        //三个基础输入点
        var p0 = cPoints[k];
        var p1 = cPoints[k + 1];
        var p2 = cPoints[k + 2];
        //定义p1的左控制点和右控制点
        var p1l = new SuperMap.Geometry.Point();
        var p1r = new SuperMap.Geometry.Point();
        //通过p0、p1、p2计算p1点的做控制点p1l和又控制点p1r
        //计算向量p0_p1和p1_p2
        var p0_p1 = new SuperMap.Geometry.Point(p1.x - p0.x, p1.y - p0.y);
        var p1_p2 = new SuperMap.Geometry.Point(p2.x - p1.x, p2.y - p1.y);
        //并计算模
        var d01 = Math.sqrt(p0_p1.x * p0_p1.x + p0_p1.y * p0_p1.y);
        var d12 = Math.sqrt(p1_p2.x * p1_p2.x + p1_p2.y * p1_p2.y);
        //向量单位化
        var p0_p1_1 = new SuperMap.Geometry.Point(p0_p1.x / d01, p0_p1.y / d01);
        var p1_p2_1 = new SuperMap.Geometry.Point(p1_p2.x / d12, p1_p2.y / d12);
        //计算向量p0_p1和p1_p2的夹角平分线向量
        var p0_p1_p2 = new SuperMap.Geometry.Point(p0_p1_1.x + p1_p2_1.x, p0_p1_1.y + p1_p2_1.y);
        //计算向量 p0_p1_p2 的模
        var d012 = Math.sqrt(p0_p1_p2.x * p0_p1_p2.x + p0_p1_p2.y * p0_p1_p2.y);
        //单位化向量p0_p1_p2
        var p0_p1_p2_1 = new SuperMap.Geometry.Point(p0_p1_p2.x / d012, p0_p1_p2.y / d012);
        //判断p0、p1、p2是否共线，这里判定向量p0_p1和p1_p2的夹角的余弦和1的差值小于e就认为三点共线
        var cosE_p0p1p2 = (p0_p1_1.x * p1_p2_1.x + p0_p1_1.y * p1_p2_1.y) / 1;
        //共线
        if (Math.abs(1 - cosE_p0p1p2) < e) {
            //计算p1l的坐标
            p1l.x = p1.x - p1_p2_1.x * d01 * t;
            p1l.y = p1.y - p1_p2_1.y * d01 * t;
            //计算p1r的坐标
            p1r.x = p1.x + p0_p1_1.x * d12 * t;
            p1r.y = p1.y + p0_p1_1.y * d12 * t;
        }
        //非共线
        else {
            //计算p1l的坐标
            p1l.x = p1.x - p0_p1_p2_1.x * d01 * t;
            p1l.y = p1.y - p0_p1_p2_1.y * d01 * t;
            //计算p1r的坐标
            p1r.x = p1.x + p0_p1_p2_1.x * d12 * t;
            p1r.y = p1.y + p0_p1_p2_1.y * d12 * t;
        }
        //记录下这三个控制点
        cardinalPoints[k * 3 + 2 + 0] = p1l;
        cardinalPoints[k * 3 + 2 + 1] = p1;
        cardinalPoints[k * 3 + 2 + 2] = p1r;

        //当为起始点时需要计算第一个点的右控制点
        if (k == 0) {
            //定义p0的右控制点
            var p0r = new SuperMap.Geometry.Point();

            //计算向量p0_p1l
            var po_p1l = new SuperMap.Geometry.Point(p1l.x - p0.x, p1l.y - p0.y);
            //计算模
            var d01l = Math.sqrt(po_p1l.x * po_p1l.x + po_p1l.y * po_p1l.y);
            //单位化
            var po_p1l_1 = new SuperMap.Geometry.Point(po_p1l.x / d01l, po_p1l.y / d01l);
            //计算p0r
            p0r.x = p0.x + po_p1l_1.x * d01 * t * b;
            p0r.y = p0.y + po_p1l_1.y * d01 * t * b;

            cardinalPoints[k * 3 + 0] = p0;
            cardinalPoints[k * 3 + 1] = p0r;
        }
        //当为倒数第三个点时需要计算最后点的左控制点
        if (k == n + 1 - 3) {
            //定义 p2的做控制点p2l
            var p2l = new SuperMap.Geometry.Point();

            //计算向量p2_p1r
            var p2_p1r = new SuperMap.Geometry.Point(p1r.x - p2.x, p1r.y - p2.y);
            //并取模
            var d21r = Math.sqrt(p2_p1r.x * p2_p1r.x + p2_p1r.y * p2_p1r.y);
            //单位化
            var p2_p1r_1 = new SuperMap.Geometry.Point(p2_p1r.x / d21r, p2_p1r.y / d21r);
            //计算p2l
            p2l.x = p2.x + p2_p1r_1.x * d12 * t * b;
            p2l.y = p2.y + p2_p1r_1.y * d12 * t * b;

            cardinalPoints[k * 3 + 2 + 3] = p2l;
            cardinalPoints[k * 3 + 2 + 4] = p2;
        }
    }
    return cardinalPoints;
}
/**
 * Method: createCloseCardinal
 * 创建闭合Cardinal的控制点。
 * 利用输入的点数组计算出相应的Cardinal控制点，再使用贝塞尔曲线3创建经过所有Cardinal控制点的圆滑闭合曲线。
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 计算出相应的Cardinal控制点。
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var cardinal = SuperMap.Geometry.LineString.createCloseCardinal(points);
 * (end)
 */
SuperMap.Geometry.LineString.createCloseCardinal = function (points) {
    if (points == null || points.length < 3) {
        return points;
    }
    //获取起点，作为终点，以闭合曲线。
    var lastP = points[0];
    points.push(lastP);

    //定义传入的点数组，将在点数组中央（每两个点）插入两个控制点
    var cPoints = points;
    //包含输入点和控制点的数组
    var cardinalPoints = [];

    //至少三个点以上
    //这些都是相关资料测出的经验数值
    //定义张力系数，取值在0<t<0.5
    var t = 0.4;
    //为端点张力系数因子，取值在0<b<1
    var b = 0.5;
    //误差控制，是一个大于等于0的数，用于三点非常趋近与一条直线时，减少计算量
    var e = 0.005;

    //传入的点数量，至少有三个，n至少为2
    var n = cPoints.length - 1;
    //从开始遍历到倒数第二个，其中倒数第二个用于计算起点（终点）的插值控制点
    for (var k = 0; k <= n - 1; k++) {
        //计算起点（终点）的左右控制点
        if (k == n - 1) {
            //三个基础输入点
            var p0 = cPoints[n - 1];
            var p1 = cPoints[0];
            var p2 = cPoints[1];
        }
        else {
            var p0 = cPoints[k];
            var p1 = cPoints[k + 1];
            var p2 = cPoints[k + 2];
        }

        //定义p1的左控制点和右控制点
        var p1l = new SuperMap.Geometry.Point();
        var p1r = new SuperMap.Geometry.Point();
        //通过p0、p1、p2计算p1点的做控制点p1l和又控制点p1r
        //计算向量p0_p1和p1_p2
        var p0_p1 = new SuperMap.Geometry.Point(p1.x - p0.x, p1.y - p0.y);
        var p1_p2 = new SuperMap.Geometry.Point(p2.x - p1.x, p2.y - p1.y);
        //并计算模
        var d01 = Math.sqrt(p0_p1.x * p0_p1.x + p0_p1.y * p0_p1.y);
        var d12 = Math.sqrt(p1_p2.x * p1_p2.x + p1_p2.y * p1_p2.y);
        //向量单位化
        var p0_p1_1 = new SuperMap.Geometry.Point(p0_p1.x / d01, p0_p1.y / d01);
        var p1_p2_1 = new SuperMap.Geometry.Point(p1_p2.x / d12, p1_p2.y / d12);
        //计算向量p0_p1和p1_p2的夹角平分线向量
        var p0_p1_p2 = new SuperMap.Geometry.Point(p0_p1_1.x + p1_p2_1.x, p0_p1_1.y + p1_p2_1.y);
        //计算向量 p0_p1_p2 的模
        var d012 = Math.sqrt(p0_p1_p2.x * p0_p1_p2.x + p0_p1_p2.y * p0_p1_p2.y);
        //单位化向量p0_p1_p2
        var p0_p1_p2_1 = new SuperMap.Geometry.Point(p0_p1_p2.x / d012, p0_p1_p2.y / d012);
        //判断p0、p1、p2是否共线，这里判定向量p0_p1和p1_p2的夹角的余弦和1的差值小于e就认为三点共线
        var cosE_p0p1p2 = (p0_p1_1.x * p1_p2_1.x + p0_p1_1.y * p1_p2_1.y) / 1;
        //共线
        if (Math.abs(1 - cosE_p0p1p2) < e) {
            //计算p1l的坐标
            p1l.x = p1.x - p1_p2_1.x * d01 * t;
            p1l.y = p1.y - p1_p2_1.y * d01 * t;
            //计算p1r的坐标
            p1r.x = p1.x + p0_p1_1.x * d12 * t;
            p1r.y = p1.y + p0_p1_1.y * d12 * t;
        }
        //非共线
        else {
            //计算p1l的坐标
            p1l.x = p1.x - p0_p1_p2_1.x * d01 * t;
            p1l.y = p1.y - p0_p1_p2_1.y * d01 * t;
            //计算p1r的坐标
            p1r.x = p1.x + p0_p1_p2_1.x * d12 * t;
            p1r.y = p1.y + p0_p1_p2_1.y * d12 * t;
        }

        //记录起点（终点）的左右插值控制点及倒数第二个控制点
        if (k == n - 1) {
            cardinalPoints[0] = p1;
            cardinalPoints[1] = p1r;
            cardinalPoints[(n - 2) * 3 + 2 + 3] = p1l;
            cardinalPoints[(n - 2) * 3 + 2 + 4] = cPoints[n];
        }
        else {
            //记录下这三个控制点
            cardinalPoints[k * 3 + 2 + 0] = p1l;
            cardinalPoints[k * 3 + 2 + 1] = p1;
            cardinalPoints[k * 3 + 2 + 2] = p1r;

        }

    }
    return cardinalPoints;
}

/**
 * Method: calculateCircle
 * 三点画圆弧
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 计算出相应的圆弧控制点。
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50));
 * points.push(new SuperMap.Geometry.Point(2,60));
 *
 * var circle = SuperMap.Geometry.LineString.calculateCircle(points);
 * (end)
 */
SuperMap.Geometry.LineString.calculateCircle = function(points) {
    if(points.length < 3) {
        return points
    }
    var len = points.length,
        centerPoint = {},
        p1 = points[0],
        p2 = points[1],
        p3 = points[2];
    var R = 0,
        dStep = 0,
        direc = true,
        dRotation = 0,
        dRotationBegin = 0,
        dRotationAngle = 0,
        nSegmentCount = 72,
        centerPoint = {},
        circlePoints = [];

    var KTan13 = (p3.y - p1.y) / (p3.x - p1.x);
    var B13 = p3.y - KTan13 * p3.x;
    if((((p3.x != p1.x) && (p3.y != p1.y)) && (p2.y == KTan13 * p2.x + B13)) ||
      ((p3.x == p1.x) && (p2.x == p1.x)) || ((p3.y == p1.y) && (p2.y == p1.y)) ||       
      ((p3.x == p1.x) && (p3.y == p1.y)) || ((p3.x == p2.x) && (p3.y == p2.y)) || ((p1.x == p2.x) && (p1.y == p2.y))) {
        circlePoints.push(p1);
        circlePoints.push(p2);
        circlePoints.push(p3);
    } else {
        var D = ((p2.x * p2.x + p2.y * p2.y) - (p1.x * p1.x + p1.y * p1.y)) * (2 * (p3.y - p1.y)) - ((p3.x * p3.x + p3.y * p3.y) - 
                (p1.x * p1.x + p1.y * p1.y)) * (2 * (p2.y - p1.y));
        var E = (2 * (p2.x - p1.x)) * ((p3.x * p3.x + p3.y * p3.y) - (p1.x * p1.x + p1.y * p1.y)) - 
                (2 * (p3.x - p1.x)) * ((p2.x * p2.x + p2.y * p2.y) - (p1.x * p1.x + p1.y * p1.y));
        var F = 4 * ((p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y));
        centerPoint.x = D / F;
        centerPoint.y = E / F;
        R = Math.sqrt((p1.x - centerPoint.x) * (p1.x - centerPoint.x) + (p1.y - centerPoint.y) * (p1.y - centerPoint.y));       

        var dis = (p1.x - p3.x) * (p1.x - p3.x) + (p1.y - p3.y) * (p1.y - p3.y);
        var cons = (2 * R * R - dis) / (2 * R * R);
        cons = cons >= 1 ? 1 : cons;
        cons = cons <= -1 ? -1 : cons;
        dRotationAngle = Math.acos(cons) * 180 / Math.PI;
        
        if(p3.x == p1.x) {
            dRotationAngle = ((centerPoint.x > p1.x && p2.x > p1.x) || (centerPoint.x < p1.x && p2.x < p1.x)) ? (360 - dRotationAngle) : dRotationAngle;
        } else {
            dRotationAngle = ((centerPoint.y > (KTan13 * centerPoint.x + B13) && p2.y > (KTan13 * p2.x + B13)) || 
                    (centerPoint.y < (KTan13 * centerPoint.x + B13) && p2.y < (KTan13 * p2.x + B13))) ? (360 - dRotationAngle) : dRotationAngle;
        }                 
        dStep = dRotationAngle / 72;

        if(p3.y != p1.y) {
            if(p3.x == p1.x) {
                if(p3.y > p1.y) {
                    if(p2.x < p1.x) {
                        direc = false;
                    }
                } else {
                    if(p2.x > p1.x) {
                        direc = false;
                    }
                }
            } else if(p3.x < p1.x) {
                if(p2.y < KTan13 * p2.x + B13) {
                    direc = false;
                }
            } else {
                if(p2.y > KTan13 * p2.x + B13) {
                    direc = false;
                }
            }
        } else {
            if(p3.x > p1.x) {
                if(p2.y > p1.y) {
                    direc = false;
                }
            } else {
                if(p2.y < p1.y) {
                    direc = false;
                }
            }
        }

        var K10 = (p1.y - centerPoint.y) / (p1.x - centerPoint.x);
        var atan10 = K10 >= 0 ? Math.atan(K10) * 180 / Math.PI : Math.abs(Math.atan(K10) * 180 / Math.PI) + 90;

        var CY = Math.abs(centerPoint.y);
        if((p1.y == CY) && (CY == p3.y)) {
            if(p1.x < p3.x) {
                atan10 = atan10 + 180; 
            }
        }

        var newPY = p1.y - centerPoint.y;
        circlePoints.push(p1);
        for(var i = 1; i < nSegmentCount; i ++) {
            dRotation = dStep * i;
            dRotationBegin = atan10;    
        
            if(direc) {
                if(newPY >= 0) {
                    if(K10 >= 0) {
                        dRotationBegin = dRotationBegin + dRotation;
                    } else {
                        dRotationBegin = (180 - (dRotationBegin - 90)) + dRotation;
                    }         
                } else {
                    if(K10 > 0) {
                        dRotationBegin = (dRotationBegin - 180) + dRotation;
                    } else {
                        dRotationBegin = (90 - dRotationBegin) + dRotation;
                    }
                }
            } else {
                if(newPY >= 0) {
                    if(K10 >= 0) {
                        dRotationBegin = dRotationBegin - dRotation;
                    } else {
                        dRotationBegin = (180 - (dRotationBegin - 90)) - dRotation;
                    }     
                } else {
                    if(K10 >= 0) {
                        dRotationBegin = (dRotationBegin - 180) - dRotation;
                    } else {
                        dRotationBegin = (90 - dRotationBegin) - dRotation;
                    }
                }
            }

            dRotationBegin = dRotationBegin * Math.PI / 180;
            var x = centerPoint.x + R * Math.cos(dRotationBegin);
            var y = centerPoint.y + R * Math.sin(dRotationBegin);
            circlePoints.push(new SuperMap.Geometry.Point(x, y));
        }
        circlePoints.push(p3);
    }
    return circlePoints;
}

/**
 * Method: createLineEPS
 * 根据点的类型画出不同类型的曲线
 * 点的类型有三种, LTypeArc, LTypeCurve, NONE
 *
 * Parameters:
 * points -{Array(<SuperMap.Geometry.Point>)} 传入的待计算的初始点串。
 * Returns:
 * {Array(<SuperMap.Geometry.Point>)} 计算出相应的lineEPS控制点。
 *
 * (code)
 * var points = [];
 * points.push(new SuperMap.Geometry.Point(-50,30));
 * points.push(new SuperMap.Geometry.Point(-30,50,"LTypeArc"));
 * points.push(new SuperMap.Geometry.Point(2,60));
 * points.push(new SuperMap.Geometry.Point(8,20));
 *
 * var lineEPS = SuperMap.Geometry.LineString.createLineEPS(points);
 * (end)
 */
SuperMap.Geometry.LineString.createLineEPS = function(points) {    
     var list = [],
         part = 0,
         len = points.length;
    if(points == null || len < 2) {
        return points;
    }  
    for(var i = 0; i < len; ) {
        var type = points[i].type;
        if(type == 'LTypeArc') {
        	var listObj = SuperMap.Geometry.LineString.createLineArc(list, i, len, points);
                list = listObj[0];
                i = listObj[1];
        } else {
        	list.push(points[i]);
            i ++;
        }
//      switch(type) {
//          // case 'LTypeCurve':
//          //     var listObj = SuperMap.Geometry.LineString.createLineCurve(list, i, len, points);
//          //     list = listObj[0];
//          //     i = listObj[1];
//          //     break;
//          case 'LTypeArc':
//              var listObj = SuperMap.Geometry.LineString.createLineArc(list, i, len, points);
//              list = listObj[0];
//              i = listObj[1];
//              break;
//          default:
//              list.push(points[i]);
//              i ++;
//              break;
//      }
    }
    return list;
},

SuperMap.Geometry.LineString.createLineArc = function(list, i, len, points) {
    if(i == 0) {
        var bezierPtsObj = SuperMap.Geometry.LineString.addPointEPS(points, i, len, 'LTypeArc');
        Array.prototype.push.apply(list, bezierPtsObj[0]);
        i = bezierPtsObj[1] + 1;
    } else if(i == len - 1) {
        var bezierP = [points[i - 1], points[i]],
            bezierPts = SuperMap.Geometry.LineString.calculateCircle(bezierP);
        Array.prototype.push.apply(list, bezierPts);
        i ++;
    } else {
        var bezierPtsObj = SuperMap.Geometry.LineString.addPointEPS(points, i, len, 'LTypeArc');               
        list.pop();
        Array.prototype.push.apply(list, bezierPtsObj[0]);
        i = bezierPtsObj[1] + 1;
    }
    return [list, i];
},

SuperMap.Geometry.LineString.createLineCurve = function(list, i, len, points) {
        if(i == 0) {
            var bezierPtsObj = SuperMap.Geometry.LineString.addPointEPS(points, i, len, 'LTypeCurve');
            Array.prototype.push.apply(list, bezierPtsObj[0]);
            i = bezierPtsObj[1] + 1;
        } else if(i == len - 1) {
            var bezierP = [points[i - 1], points[i]],
                bezierPts = SuperMap.Geometry.LineString.calculatePointsFBZN(bezierP);
            Array.prototype.push.apply(list, bezierPts);
            i ++;
        } else {
            var bezierPtsObj = SuperMap.Geometry.LineString.addPointEPS(points, i, len, 'LTypeCurve');               
            list.pop();
            Array.prototype.push.apply(list, bezierPtsObj[0]);
            i = bezierPtsObj[1] + 1;
        }
        return [list, i];
},

SuperMap.Geometry.LineString.addPointEPS = function(points, i, len, type) {
    var bezierP = [], j = i + 1;
    if(i == 0) {
        Array.prototype.push.apply(bezierP, [points[i], points[i + 1]]);
    } else if(i == len - 1) {
        Array.prototype.push.apply(bezierP, [points[i - 1], points[i]]);
    } else {
        Array.prototype.push.apply(bezierP, [points[i - 1], points[i], points[i + 1]]);
    }   
//  for(var j = i + 1; j < len - 1; j ++) {
//      if(points[j].type == type) {
//          bezierP.push(points[j + 1]);
//      } else {
//          //bezierP.push(points[j + 1]);
//          break;
//      }
//  }
    if(type == 'LTypeCurve') {
        var bezierPts = SuperMap.Geometry.LineString.calculatePointsFBZN(bezierP);
    } else if(type == 'LTypeArc') {
        var bezierPts = SuperMap.Geometry.LineString.calculateCircle(bezierP);
    }       
    return [bezierPts, j];
}