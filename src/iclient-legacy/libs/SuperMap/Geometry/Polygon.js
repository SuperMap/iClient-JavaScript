/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Geometry/Collection.js
 * @requires SuperMap/Geometry/LinearRing.js
 */

/**
 * Class: SuperMap.Geometry.Polygon 
 * 多边形几何对象类。
 * 
 * Inherits from:
 *  - <SuperMap.Geometry.Collection> 
 *  - <SuperMap.Geometry> 
 */
SuperMap.Geometry.Polygon = SuperMap.Class(
  SuperMap.Geometry.Collection, {

    /**
     * Property: componentTypes
     * {Array(String)} An array of class names representing the types of
     * components that the collection can include.  A null value means the
     * component types are not restricted.
     */
    componentTypes: ["SuperMap.Geometry.LinearRing"],

    /**
     * Constructor: SuperMap.Geometry.Polygon
     * 实例化多边形对象。
     * (code)
     * var points =[new SuperMap.Geometry.Point(0,4010338),
     *      new SuperMap.Geometry.Point(1063524,4010338),
     *      new SuperMap.Geometry.Point(1063524,3150322),
     *      new SuperMap.Geometry.Point(0,3150322)
     *  ],   
     *    linearRings = new SuperMap.Geometry.LinearRing(points),
     *  region = new SuperMap.Geometry.Polygon([linearRings]);   
     * (end)
     *      
     * Parameters:
     * components - {Array(<SuperMap.Geometry.LinearRing>)} 
     */
     
     initialize: function(components) {
         SuperMap.Geometry.Collection.prototype.initialize.apply(this,
                                                                   arguments);
     },
    
    /** 
     * APIMethod: getArea
     * 获得区域面积，从区域的外部口径减去计此区域内部口径算所得的面积。
     * 
     * Returns:
     * {float} 几何对象的面积。
     */
    getArea: function() {
        var area = 0.0;
        if ( this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getArea());
            for (var i=1, len=this.components.length; i<len; i++) {
                area -= Math.abs(this.components[i].getArea());
            }
        }
        return area;
    },

    /** 
     * APIMethod: getGeodesicArea
     * 计算投影到球面上的多边形近似面积。
     *
     * Parameters:
     * projection - {<SuperMap.Projection>} 空间参考系统的几何坐标。如果没有设置，默认 WGS84。
     * 
     * Returns:
     * {float} 多边形近似测地面积。
     */
    getGeodesicArea: function(projection) {
        var area = 0.0;
        if(this.components && (this.components.length > 0)) {
            area += Math.abs(this.components[0].getGeodesicArea(projection));
            for(var i=1, len=this.components.length; i<len; i++) {
                area -= Math.abs(this.components[i].getGeodesicArea(projection));
            }
        }
        return area;
    },

    /**
     * Method: containsPoint
     * Test if a point is inside a polygon.  Points on a polygon edge are
     *     considered inside.
     *
     * Parameters:
     * point - {<SuperMap.Geometry.Point>}
     *
     * Returns:
     * {Boolean | Number} The point is inside the polygon.  Returns 1 if the
     *     point is on an edge.  Returns boolean otherwise.
     */
    containsPoint: function(point) {
        var numRings = this.components.length;
        var contained = false;
        if(numRings > 0) {
            // check exterior ring - 1 means on edge, boolean otherwise
            contained = this.components[0].containsPoint(point);
            if(contained !== 1) {
                if(contained && numRings > 1) {
                    // check interior rings
                    var hole;
                    for(var i=1; i<numRings; ++i) {
                        hole = this.components[i].containsPoint(point);
                        if(hole) {
                            if(hole === 1) {
                                // on edge
                                contained = 1;
                            } else {
                                // in hole
                                contained = false;
                            }                            
                            break;
                        }
                    }
                }
            }
        }
        return contained;
    },

    /**
     * APIMethod: intersects
     * 判断两个几何对象是否相交。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 任何类型的几何对象。
     *
     * Returns:
     * {Boolean} 两个几何对象是否相交。
     */
    intersects: function(geometry) {
        var intersect = false;
        var i, len;
        if(geometry.CLASS_NAME === "SuperMap.Geometry.Point") {
            intersect = this.containsPoint(geometry);
        } else if(geometry.CLASS_NAME === "SuperMap.Geometry.LineString" ||
                  geometry.CLASS_NAME === "SuperMap.Geometry.LinearRing") {
            // check if rings/linestrings intersect
            for(i=0, len=this.components.length; i<len; ++i) {
                intersect = geometry.intersects(this.components[i]);
                if(intersect) {
                    break;
                }
            }
            if(!intersect) {
                // check if this poly contains points of the ring/linestring
                for(i=0, len=geometry.components.length; i<len; ++i) {
                    intersect = this.containsPoint(geometry.components[i]);
                    if(intersect) {
                        break;
                    }
                }
            }
        } else {
            for(i=0, len=geometry.components.length; i<len; ++ i) {
                intersect = this.intersects(geometry.components[i]);
                if(intersect) {
                    break;
                }
            }
        }
        // check case where this poly is wholly contained by another
        if(!intersect && geometry.CLASS_NAME === "SuperMap.Geometry.Polygon") {
            // exterior ring points will be contained in the other geometry
            var ring = this.components[0];
            for(i=0, len=ring.components.length; i<len; ++i) {
                intersect = geometry.containsPoint(ring.components[i]);
                if(intersect) {
                    break;
                }
            }
        }
        return intersect;
    },

    /**
     * APIMethod: distanceTo
     * 计算两个几何对象间的最小距离（x-y平面坐标系下）。
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry>} 目标几何对象。
     * options - {Object} 距离计算需要设置的可选属性。
     *
     * Valid options:
     * details - {Boolean} 返回距离计算的细节。默认为false。
     * edge - {Boolean} 计算一个几何对象到目标几何对象边缘的最近距离。默认为true。 如果设为true，
     * 一个几何图形完全包含在目标几何对象中时，调用distanceTo返回非零结果，如果false，两个几何对象相交情况下
     * 调用distanceTo结果返回0，而且如果false，将不返距离。
     *
     * Returns:
     * {Number | Object} 返回一个几何对象到目标几何对象的距离。
     */
    distanceTo: function(geometry, options) {
        var edge = !(options && options.edge === false);
        var result;
        // this is the case where we might not be looking for distance to edge
        if(!edge && this.intersects(geometry)) {
            result = 0;
        } else {
            result = SuperMap.Geometry.Collection.prototype.distanceTo.apply(
                this, [geometry, options]
            );
        }
        return result;
    },

    CLASS_NAME: "SuperMap.Geometry.Polygon"
});

/**
 * APIMethod: createRegularPolygon
 * 创建 RegularPolygon 对象。
 *
 * Parameters:
 * origin - {<SuperMap.Geometry.Point>} 多边形的中心 。
 * radius - {Float} 半径。
 * sides - {Integer} 边数，20个近似一个圆。
 * rotation - {Float} 旋转角度，单位为degrees。
 *
 * (code)
 * var sides = 50;
 * var origin = new SuperMap.Geometry.Point(5,0);
 * var polygon = SuperMap.Geometry.Polygon.createRegularPolygon(origin,6,sides,270);
 *
 *
 * (end)
 */
SuperMap.Geometry.Polygon.createRegularPolygon = function(origin, radius, sides, rotation) {  
    var angle = Math.PI * ((1/sides) - (1/2));
    if(rotation) {
        angle += (rotation / 180) * Math.PI;
    }
    var rotatedAngle, x, y;
    var points = [];
    for(var i=0; i<sides; ++i) {
        rotatedAngle = angle + (i * 2 * Math.PI / sides);
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new SuperMap.Geometry.Point(x, y));
    }
    var ring = new SuperMap.Geometry.LinearRing(points);
    return new SuperMap.Geometry.Polygon([ring]);
};

/**
 * APIMethod: createRegularPolygonCurve
 * 创建扇形对象。
 *
 * Parameters:
 * origin - {<SuperMap.Geometry.Point>} 多边形的中心 。
 * radius - {Float} 半径。
 * sides - {Integer} 边数，50个近似一个扇形。
 * rotation - {Float} 旋转角度，单位为degrees。沿着x轴正方向的逆时针方向。
 * resolution - {Float} 当前地图的分辨率.,固定大小下输入，其他情况不需要此参数
 * 备注：Geometry内部单位均为地理单位，默认用户输入的参数也为地理单位，如果传入resolution，则半径则为
 * 为像素单位，内部会根据像素值和分辨率获取地理大小后在进行构造Geometry，但最终的Geometry均为地理单位。
 * Returns:
 * {SuperMap.Geometry.Polygon} 几何面对象。
 *
 * (code)
 * var sides = 50;
 * var origin = new SuperMap.Geometry.Point(5,0);
 * var polygon = SuperMap.Geometry.Polygon.createRegularPolygonCurve(origin,6,sides,270);
 *
 * (end)
 */
SuperMap.Geometry.Polygon.createRegularPolygonCurve = function(origin, radius, sides,r,angel,resolution) {
    if(resolution == undefined)
        resolution = 1;

    var rR = r*Math.PI/(180*sides);

    var rotatedAngle, x, y;
    var points = [];
    for(var i=0; i<sides; ++i) {
        rotatedAngle = rR*i;
        x = origin.x + (radius*resolution * Math.cos(rotatedAngle));
        y = origin.y + (radius*resolution * Math.sin(rotatedAngle));
        points.push(new SuperMap.Geometry.Point(x, y));
    }
    rotatedAngle = r*Math.PI/180;
    x = origin.x + (radius*resolution * Math.cos(rotatedAngle));
    y = origin.y + (radius*resolution * Math.sin(rotatedAngle));
    points.push(new SuperMap.Geometry.Point(x, y));

    points.push(origin);

    var ring = new SuperMap.Geometry.LinearRing(points);
    ring.rotate(parseFloat(angel),origin);
    var geo = new SuperMap.Geometry.Polygon([ring]);
    geo.origin = origin;
    geo.radius = radius;
    geo.r = r;
    geo.angel = angel;
    geo.sides = sides;
    geo.polygonType = "Curve";
    return geo;
};

/**
 * APIMethod: createRegularPolygonTriangle
 * 创建4G三角形,电信行业4G专业符号形容类似为：-▷。
 *
 * Parameters:
 * origin - {<SuperMap.Geometry.Point>} 三角形的原点 。
 * height - {Float} 外接矩形的高度。
 * width - {Float} 外接矩形的宽度。
 * lineLength - {Float} 线长度。
 * angel - {Float} 旋转角度，单位为degrees,沿着x轴正方向的逆时针方向.。
 * resolution - {Float} 当前地图的分辨率.,固定大小下输入，其他情况不需要此参数
 * 备注：Geometry内部单位均为地理单位，默认用户输入的参数也为地理单位，如果传入resolution，则height、width、lineLength则为
 * 为像素单位，内部会根据像素值和分辨率获取地理大小后在进行构造Geometry，但最终的Geometry均为地理单位。
 * Returns:
 * {SuperMap.Geometry.Collection} 几何对象集合，面对象&线对象。
 *
 * (code)
 *
 * (end)
 */
SuperMap.Geometry.Polygon.createRegularPolygonTriangle = function(origin, height, width,lineLength,angel,resolution) {
    if(resolution == undefined)
        resolution = 1;

    var lineList = [];
    lineList.push(origin);
    lineList.push(new SuperMap.Geometry.Point(origin.x+lineLength*resolution,origin.y));
    var geoline = new SuperMap.Geometry.LineString(lineList);
    geoline.rotate(parseFloat(angel),origin);

    var triangleList = [];
    triangleList.push(new SuperMap.Geometry.Point(origin.x+height*resolution,origin.y));
    triangleList.push(new SuperMap.Geometry.Point(origin.x+lineLength*resolution,origin.y+width*resolution/2));
    triangleList.push(new SuperMap.Geometry.Point(origin.x+lineLength*resolution,origin.y-width*resolution/2));
    var geoTriangle = new SuperMap.Geometry.LinearRing(triangleList);
    geoTriangle.rotate(parseFloat(angel),origin);
    var geo = new SuperMap.Geometry.Collection([geoline,geoTriangle]);
    geo.origin = origin;
    geo.height = height;
    geo.width = width;
    geo.lineLength = lineLength;
    geo.angel = angel;
    geo.polygonType = "Triangle";
    return geo;
};

/**
 * APIMethod: createBsplinesurface
 * 创建3G B样条曲面，电信3G专业符号，由B样条曲线模拟生成。
 *
 * Parameters:
 * origin - {<SuperMap.Geometry.Point>} 曲面的原点 。
 * height - {Float} 外接矩形的高度。
 * width - {Float} 外接矩形的宽度。
 * angel - {Float} 旋转角度，单位为degrees，沿着x轴正方向的逆时针方向。
 * resolution - {Float} 当前地图的分辨率，固定大小下输入，其他情况不需要此参数。
 * k - {Number} 递推次数，可以控制曲线的光滑度。
 * 备注：Geometry内部单位均为地理单位，默认用户输入的参数也为地理单位，如果传入resolution，则height、width
 * 为像素单位，内部会根据像素值和分辨率获取地理大小后在进行构造Geometry，但最终的Geometry均为地理单位。
 * Returns:
 * {SuperMap.Geometry.Polygon} 几何面对象。
 *
 * (code)
 *
 * (end)
 */
SuperMap.Geometry.Polygon.createBsplinesurface = function(origin, height, width,angel,resolution,k) {
    if(resolution == undefined)
        resolution = 1;

    if(k == undefined)
        k = 10;

    var pointList = [];
    pointList.push(origin);
    pointList.push(origin);

    pointList.push(new SuperMap.Geometry.Point(origin.x+height*resolution*2/3,origin.y+width*resolution/2));
    pointList.push(new SuperMap.Geometry.Point(origin.x+height*resolution,origin.y+width*resolution/2));
    pointList.push(new SuperMap.Geometry.Point(origin.x+height*resolution,origin.y-width*resolution/2));
    pointList.push(new SuperMap.Geometry.Point(origin.x+height*resolution*2/3,origin.y-width*resolution/2));

    pointList.push(origin);
    pointList.push(origin);

    var pointList2 = [];
    var i, j,a0,a1,a2,dt,t1,t2;
    var t_x,t_y;
    var n = pointList.length;
    dt=1.0/k;

    pointList2.push(new SuperMap.Geometry.Point((pointList[0].x+pointList[1].x)/2,(pointList[0].y+pointList[1].y)/2));

    for(i=1;i<n-1;i++)
    {
        for(j=0;j<=k;j++)
        {
            t1=j*dt;
            t2=t1*t1;

            a0=(t2-2*t1+1)/2.0;
            a1=(2*t1-2*t2+1)/2.0;
            a2=t2/2.0;

            t_x=a0*pointList[i-1].x+a1*pointList[i].x+a2*pointList[i+1].x;
            t_y=a0*pointList[i-1].y+a1*pointList[i].y+a2*pointList[i+1].y;
            pointList2.push(new SuperMap.Geometry.Point(t_x,t_y));
        }
    }

    var ring = new SuperMap.Geometry.LinearRing(pointList2);
    ring.rotate(parseFloat(angel),origin);
    var geo = new SuperMap.Geometry.Collection([ring]);
    geo.origin = origin;
    geo.height = height;
    geo.width = width;
    geo.angel = angel;
    geo.polygonType = "Bspline";
    return geo;
};