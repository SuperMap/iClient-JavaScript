/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Point } from '../commontypes/geometry/Point';
import { MultiPoint } from '../commontypes/geometry/MultiPoint';
import { LinearRing } from '../commontypes/geometry/LinearRing';
import { LineString } from '../commontypes/geometry/LineString';
import { MultiLineString } from '../commontypes/geometry/MultiLineString';
import { Polygon } from '../commontypes/geometry/Polygon';
import { MultiPolygon } from '../commontypes/geometry/MultiPolygon';
import { Collection } from '../commontypes/geometry/Collection';
import { ServerStyle } from './ServerStyle';
import { Route } from './Route';
import { Util } from '../commontypes/Util';
import { GeometryType } from '../REST';

/**
 * @class ServerGeometry
 * @deprecatedclass SuperMap.ServerGeometry
 * @category  iServer Data Feature
 * @classdesc 服务端几何对象类。该类描述几何对象（矢量）的特征数据（坐标点对、几何对象的类型等）。基于服务端的空间分析、空间关系运算、查询等 GIS 服务功能使用服务端几何对象。
 * @param {Object} options - 参数。
 * @param {string} options.id - 服务端几何对象唯一标识符。
 * @param {Array.<number>} options.parts - 服务端几何对象中各个子对象所包含的节点个数。
 * @param {Array.<GeometryPoint>} options.points - 组成几何对象的节点的坐标对数组。
 * @param {GeometryType} options.type - 几何对象的类型。
 * @param {ServerStyle} [options.style] - 服务端几何对象的风格。
 * @usage
 */
export class ServerGeometry {
    constructor(options) {
        /**
         * @member {string} ServerGeometry.prototype.id
         * @description 服务端几何对象唯一标识符。
         */
        this.id = 0;

        /**
         * @member {ServerStyle} [ServerGeometry.prototype.style]
         * @description 服务端几何对象的风格（ServerStyle）。
         */
        this.style = null;

        /**
         * @member {Array.<number>} ServerGeometry.prototype.parts
         * @description 服务端几何对象中各个子对象所包含的节点个数。<br>
         * 1.几何对象从结构上可以分为简单几何对象和复杂几何对象。
         * 简单几何对象与复杂几何对象的区别：简单的几何对象一般为单一对象，
         * 而复杂的几何对象由多个简单对象组成或经过一定的空间运算之后产生，
         * 如：矩形为简单的区域对象，而中空的矩形为复杂的区域对象。<br>
         * 2.通常情况，一个简单几何对象的子对象就是它本身，
         * 因此对于简单对象来说的该字段为长度为1的整型数组，
         * 该字段的值就是这个简单对象节点的个数。
         * 如果一个几何对象是由几个简单对象组合而成的，
         * 例如，一个岛状几何对象由 3 个简单的多边形组成而成，
         * 那么这个岛状的几何对象的 Parts 字段值就是一个长度为 3 的整型数组，
         * 数组中每个成员的值分别代表这三个多边形所包含的节点个数。
         */
        this.parts = null;

        /**
         * @member {Array.<GeometryPoint>} ServerGeometry.prototype.points
         * @description 组成几何对象的节点的坐标对数组。<br>
         * 1.所有几何对象（点、线、面）都是由一些简单的点坐标组成的，
         * 该字段存放了组成几何对象的点坐标的数组。
         * 对于简单的面对象，他的起点和终点的坐标点相同。<br>
         * 2.对于复杂的几何对象，根据 Parts 属性来确定每一个组成复杂几何对象的简单对象所对应的节点的个数，
         * 从而确定 Points 字段中坐标对的分配归属问题。
         */
        this.points = null;

        /**
         * @member {GeometryType} ServerGeometry.prototype.type
         * @description 几何对象的类型（GeometryType）。
         */
        this.type = null;

        /**
         * @member {Object} ServerGeometry.prototype.prjCoordSys
         * @description 投影坐标参数，现仅在缓冲区分析中有效。
         */
        this.prjCoordSys = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = 'SuperMap.ServerGeometry';
    }

    /**
     * @function ServerGeometry.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.id = null;
        me.style = null;
        me.parts = null;
        me.partTopo = null;
        me.points = null;
        me.type = null;
        me.prjCoordSys = null;
    }

    /**
     * @function ServerGeometry.prototype.toGeometry
     * @description 将服务端几何对象 ServerGeometry 转换为客户端几何对象 Geometry。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeometry() {
        var me = this,
            geoType = me.type;
        switch (geoType.toUpperCase()) {
            case GeometryType.POINT:
                return me.toGeoPoint();
            case GeometryType.LINE:
                return me.toGeoLine();
            case GeometryType.LINEM:
                return me.toGeoLinem();
            case GeometryType.REGION:
                return me.toGeoRegion();
            case GeometryType.POINTEPS:
                return me.toGeoPoint();
            case GeometryType.LINEEPS:
                return me.toGeoLineEPS();
            case GeometryType.REGIONEPS:
                return me.toGeoRegionEPS();
            case GeometryType.GEOCOMPOUND:
                return me.transformGeoCompound();
        }
    }

    /**
     * @function ServerGeometry.prototype.toGeoPoint
     * @description 将服务端的点几何对象转换为客户端几何对象。包括 Point、MultiPoint。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeoPoint() {
        var me = this,
            geoParts = me.parts || [],
            geoPoints = me.points || [],
            len = geoParts.length;
        if (len > 0) {
            if (len === 1) {
                return new Point(geoPoints[0].x, geoPoints[0].y);
            } else {
                var pointList = [];
                for (let i = 0; i < len; i++) {
                    pointList.push(new Point(geoPoints[i].x, geoPoints[i].y));
                }
                return new MultiPoint(pointList);
            }
        } else {
            return null;
        }
    }

    /**
     * @function ServerGeometry.prototype.toGeoLine
     * @description 将服务端的线几何对象转换为客户端几何对象。包括 GeometryLinearRing、GeometryLineString、GeometryMultiLineString。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeoLine() {
        var me = this,
            geoParts = me.parts || [],
            geoPoints = me.points || [],
            len = geoParts.length;
        if (len > 0) {
            if (len === 1) {
                let pointList = [];
                for (let i = 0; i < geoParts[0]; i++) {
                    pointList.push(new Point(geoPoints[i].x, geoPoints[i].y));
                }
                //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
                if (pointList[0].equals(pointList[geoParts[0] - 1])) {
                    return new LinearRing(pointList);
                } else {
                    return new LineString(pointList);
                }
            } else {
                let lineList = [];
                for (let i = 0; i < len; i++) {
                    let pointList = [];
                    for (let j = 0; j < geoParts[i]; j++) {
                        pointList.push(new Point(geoPoints[j].x, geoPoints[j].y));
                    }
                    lineList.push(new LineString(pointList));
                    geoPoints.splice(0, geoParts[i]);
                }
                return new MultiLineString(lineList);
            }
        } else {
            return null;
        }
    }

    /**
     * @function ServerGeometry.prototype.toGeoLineEPS
     * @description 将服务端的线几何对象转换为客户端几何对象。包括 GeometryLinearRing、GeometryLineString、GeometryMultiLineString。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeoLineEPS() {
        var me = this,
            geoParts = me.parts || [],
            geoPoints = me.points || [],
            i,
            j,
            pointList,
            lineList,
            lineEPS,
            len = geoParts.length;
        if (len > 0) {
            if (len === 1) {
                for (i = 0, pointList = []; i < geoParts[0]; i++) {
                    pointList.push(new Point(geoPoints[i].x, geoPoints[i].y, geoPoints[i].type));
                }
                //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
                if (pointList[0].equals(pointList[geoParts[0] - 1])) {
                    lineEPS = LineString.createLineEPS(pointList);
                    return new LinearRing(lineEPS);
                } else {
                    lineEPS = LineString.createLineEPS(pointList);
                    return new LineString(lineEPS);
                }
            } else {
                for (i = 0, lineList = []; i < len; i++) {
                    for (j = 0, pointList = []; j < geoParts[i]; j++) {
                        pointList.push(new Point(geoPoints[j].x, geoPoints[j].y));
                    }
                    lineEPS = LineString.createLineEPS(pointList);
                    lineList.push(new LineString(lineEPS));
                    geoPoints.splice(0, geoParts[i]);
                }
                return new MultiLineString(lineList);
            }
        } else {
            return null;
        }
    }

    /**
     * @function ServerGeometry.prototype.toGeoLinem
     * @description 将服务端的路由线几何对象转换为客户端几何对象。包括 LinearRing、LineString、MultiLineString。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeoLinem() {
        var me = this;
        return Route.fromJson(me);
    }

    /**
     * @function ServerGeometry.prototype.toGeoRegion
     * @description 将服务端的面几何对象转换为客户端几何对象。类型为 GeometryPolygon。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeoRegion() {
        var me = this,
            geoParts = me.parts || [],
            geoTopo = me.partTopo || [],
            geoPoints = me.points || [],
            len = geoParts.length;
        if (len <= 0) {
            return null;
        }
        var polygonArray = [];
        var pointList = [];
        if (len == 1) {
            for (let i = 0; i < geoPoints.length; i++) {
                pointList.push(new Point(geoPoints[i].x, geoPoints[i].y));
            }
            polygonArray.push(new Polygon([new LinearRing(pointList)]));
            return new MultiPolygon(polygonArray);
        }
        //处理复杂面
        var CCWArray = [];
        var areaArray = [];
        var polygonArrayTemp = [];
        var polygonBounds = [];
        //polyon岛洞标识数组，初始都是岛。
        var CCWIdent = [];
        for (let i = 0, pointIndex = 0; i < len; i++) {
            for (let j = 0; j < geoParts[i]; j++) {
                pointList.push(new Point(geoPoints[pointIndex + j].x, geoPoints[pointIndex + j].y));
            }
            pointIndex += geoParts[i];
            var polygon = new Polygon([new LinearRing(pointList)]);
            pointList = [];
            polygonArrayTemp.push(polygon);
            if (geoTopo.length === 0) {
                polygonBounds.push(polygon.getBounds());
            }
            CCWIdent.push(1);
            areaArray.push(polygon.getArea());
        }
        //iServer 9D新增字段
        if (geoTopo.length === 0) {
            //根据面积排序
            ServerGeometry.bubbleSort(areaArray, polygonArrayTemp, geoTopo, polygonBounds);
            //岛洞底层判断原则：将所有的子对象按照面积排序，面积最大的直接判定为岛（1），从面积次大的开始处理，
            // 如果发现该对象在某个面积大于它的对象之中（即被包含），则根据包含它的对象的标识（1 or -1），指定其标识（-1 or 1），
            // 依次处理完所有对象，就得到了一个标识数组，1表示岛，-1表示洞
            //目标polygon索引列表 -1标示没有被任何polygon包含，
            var targetArray = [];
            for (let i = 1; i < polygonArrayTemp.length; i++) {
                for (let j = i - 1; j >= 0; j--) {
                    targetArray[i] = -1;
                    if (polygonBounds[j].containsBounds(polygonBounds[i])) {
                        CCWIdent[i] = CCWIdent[j] * -1;
                        if (CCWIdent[i] < 0) {
                            targetArray[i] = j;
                        }
                        break;
                    }
                }
            }
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (CCWIdent[i] > 0) {
                    polygonArray.push(polygonArrayTemp[i]);
                } else {
                    polygonArray[targetArray[i]].components = polygonArray[targetArray[i]].components.concat(
                        polygonArrayTemp[i].components
                    );
                    //占位
                    polygonArray.push('');
                }
            }
        } else {
            polygonArray = new Array();
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (geoTopo[i] && geoTopo[i] == -1) {
                    CCWArray = CCWArray.concat(polygonArrayTemp[i].components);
                } else {
                    if (CCWArray.length > 0 && polygonArray.length > 0) {
                        polygonArray[polygonArray.length - 1].components =
                            polygonArray[polygonArray.length - 1].components.concat(CCWArray);
                        CCWArray = [];
                    }
                    polygonArray.push(polygonArrayTemp[i]);
                }
                if (i == len - 1) {
                    var polyLength = polygonArray.length;
                    if (polyLength) {
                        polygonArray[polyLength - 1].components =
                            polygonArray[polyLength - 1].components.concat(CCWArray);
                    } else {
                        for (let k = 0, length = CCWArray.length; k < length; k++) {
                            polygonArray.push(new Polygon(CCWArray));
                        }
                    }
                }
            }
        }
        return new MultiPolygon(polygonArray);
    }

    /**
     * @function ServerGeometry.prototype.toGeoRegionEPS
     * @description 将服务端的面几何对象转换为客户端几何对象。类型为 Polygon。
     * @returns {Geometry} 转换后的客户端几何对象。
     */
    toGeoRegionEPS() {
        var me = this,
            geoParts = me.parts || [],
            geoTopo = me.partTopo || [],
            geoPoints = me.points || [],
            len = geoParts.length;

        if (len <= 0) {
            return null;
        }
        var polygonArray = [];
        var pointList = [];
        var lineEPS;
        if (len == 1) {
            for (var i = 0; i < geoPoints.length; i++) {
                pointList.push(new Point(geoPoints[i].x, geoPoints[i].y));
            }

            lineEPS = LineString.createLineEPS(pointList);
            polygonArray.push(new Polygon([new LinearRing(lineEPS)]));
            return new MultiPolygon(polygonArray);
        }
        //处理复杂面
        var CCWArray = [];
        var areaArray = [];
        var polygonArrayTemp = [];
        var polygonBounds = [];
        //polyon岛洞标识数组，初始都是岛。
        var CCWIdent = [];
        for (let i = 0, pointIndex = 0; i < len; i++) {
            for (let j = 0; j < geoParts[i]; j++) {
                pointList.push(new Point(geoPoints[pointIndex + j].x, geoPoints[pointIndex + j].y));
            }
            pointIndex += geoParts[i];

            lineEPS = LineString.createLineEPS(pointList);
            var polygon = new Polygon([new LinearRing(lineEPS)]);
            pointList = [];
            polygonArrayTemp.push(polygon);
            if (geoTopo.length === 0) {
                polygonBounds.push(polygon.getBounds());
            }
            CCWIdent.push(1);
            areaArray.push(polygon.getArea());
        }
        //iServer 9D新增字段
        if (geoTopo.length === 0) {
            //根据面积排序
            ServerGeometry.bubbleSort(areaArray, polygonArrayTemp, geoTopo, polygonBounds);
            //岛洞底层判断原则：将所有的子对象按照面积排序，面积最大的直接判定为岛（1），从面积次大的开始处理，
            // 如果发现该对象在某个面积大于它的对象之中（即被包含），则根据包含它的对象的标识（1 or -1），指定其标识（-1 or 1），
            // 依次处理完所有对象，就得到了一个标识数组，1表示岛，-1表示洞
            //目标polygon索引列表 -1标示没有被任何polygon包含，
            var targetArray = [];
            for (let i = 1; i < polygonArrayTemp.length; i++) {
                for (let j = i - 1; j >= 0; j--) {
                    targetArray[i] = -1;
                    if (polygonBounds[j].containsBounds(polygonBounds[i])) {
                        CCWIdent[i] = CCWIdent[j] * -1;
                        if (CCWIdent[i] < 0) {
                            targetArray[i] = j;
                        }
                        break;
                    }
                }
            }
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (CCWIdent[i] > 0) {
                    polygonArray.push(polygonArrayTemp[i]);
                } else {
                    polygonArray[targetArray[i]].components = polygonArray[targetArray[i]].components.concat(
                        polygonArrayTemp[i].components
                    );
                    //占位
                    polygonArray.push('');
                }
            }
        } else {
            polygonArray = new Array();
            for (let i = 0; i < polygonArrayTemp.length; i++) {
                if (geoTopo[i] && geoTopo[i] == -1) {
                    CCWArray = CCWArray.concat(polygonArrayTemp[i].components);
                } else {
                    if (CCWArray.length > 0 && polygonArray.length > 0) {
                        polygonArray[polygonArray.length - 1].components =
                            polygonArray[polygonArray.length - 1].components.concat(CCWArray);
                        CCWArray = [];
                    }
                    polygonArray.push(polygonArrayTemp[i]);
                }
                if (i == len - 1) {
                    var polyLength = polygonArray.length;
                    if (polyLength) {
                        polygonArray[polyLength - 1].components =
                            polygonArray[polyLength - 1].components.concat(CCWArray);
                    } else {
                        for (let k = 0, length = CCWArray.length; k < length; k++) {
                            polygonArray.push(new Polygon(CCWArray));
                        }
                    }
                }
            }
        }
        return new MultiPolygon(polygonArray);
    }
    transformGeoCompound() {
        const me = this,
            geoParts = me.geoParts || [],
            len = geoParts.length;
        if (len <= 0) {
            return null;
        }
        const geometryList = [];
        for (let index = 0; index < len; index++) {
            const geometry = geoParts[index];
            geometryList.push(new ServerGeometry(geometry).toGeometry());
        }
        return new Collection(geometryList);
    }

    /**
     * @function ServerGeometry.prototype.fromJson
     * @description 将 JSON 对象表示服务端几何对象转换为 ServerGeometry。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     * @returns {ServerGeometry} 转换后的 ServerGeometry 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new ServerGeometry({
            id: jsonObject.id,
            style: ServerStyle.fromJson(jsonObject.style),
            parts: jsonObject.parts,
            partTopo: jsonObject.partTopo,
            points: jsonObject.points,
            center: jsonObject.center,
            length: jsonObject.length,
            maxM: jsonObject.maxM,
            minM: jsonObject.minM,
            type: jsonObject.type
        });
    }

    /**
     * @function ServerGeometry.prototype.fromGeometry
     * @description 将客户端 Geometry 转换成服务端 ServerGeometry。
     * @param {Geometry} geometry - 要转换的客户端 Geometry 对象。
     * @returns {ServerGeometry} 转换后的 ServerGeometry 对象。
     */
    static fromGeometry(geometry) {
        if (!geometry) {
            return;
        }
        var id = 0,
            parts = [],
            points = [],
            type = null,
            icomponents = geometry.components,
            className = geometry.CLASS_NAME,
            prjCoordSys = { epsgCode: geometry.SRID };

        if (!isNaN(geometry.id)) {
            id = geometry.id;
        }
        //坑爹的改法，没法，为了支持态势标绘，有时间就得全改
        if (
            className != 'SuperMap.Geometry.LinearRing' &&
            className != 'SuperMap.Geometry.LineString' &&
            (geometry instanceof MultiPoint || geometry instanceof MultiLineString)
        ) {
            let ilen = icomponents.length;
            for (let i = 0; i < ilen; i++) {
                const vertices = icomponents[i].getVertices();
                let partPointsCount = vertices.length;
                parts.push(partPointsCount);
                for (let j = 0; j < partPointsCount; j++) {
                    points.push(new Point(vertices[j].x, vertices[j].y));
                }
            }
            //这里className不是多点就全部是算线
            type = className == 'SuperMap.Geometry.MultiPoint' ? GeometryType.POINT : GeometryType.LINE;
        } else if (geometry instanceof MultiPolygon) {
            let ilen = icomponents.length;
            for (let i = 0; i < ilen; i++) {
                let polygon = icomponents[i],
                    linearRingOfPolygon = polygon.components,
                    linearRingOfPolygonLen = linearRingOfPolygon.length;
                for (let j = 0; j < linearRingOfPolygonLen; j++) {
                    const vertices = linearRingOfPolygon[j].getVertices();
                    const partPointsCount = vertices.length + 1;
                    parts.push(partPointsCount);
                    for (let k = 0; k < partPointsCount - 1; k++) {
                        points.push(new Point(vertices[k].x, vertices[k].y));
                    }
                    points.push(
                        new Point(vertices[0].x, vertices[0].y)
                    );
                }
            }
            type = GeometryType.REGION;
        } else if (geometry instanceof Polygon) {
            let ilen = icomponents.length;
            for (let i = 0; i < ilen; i++) {
                const vertices = icomponents[i].getVertices();
                let partPointsCount = vertices.length + 1;
                parts.push(partPointsCount);
                for (let j = 0; j < partPointsCount - 1; j++) {
                  points.push(new Point(vertices[j].x, vertices[j].y));
                }
                points.push(new Point(vertices[0].x, vertices[0].y));
            }
            type = GeometryType.REGION;
        } else {
            const vertices = geometry.getVertices();
            let geometryVerticesCount = vertices.length;
            for (let j = 0; j < geometryVerticesCount; j++) {
                points.push(new Point(vertices[j].x, vertices[j].y));
            }
            if (geometry instanceof LinearRing) {
                points.push(new Point(vertices[0].x, vertices[0].y));
                geometryVerticesCount++;
            }
            parts.push(geometryVerticesCount);
            type = geometry instanceof Point ? GeometryType.POINT : GeometryType.LINE;
        }

        return new ServerGeometry({
            id: id,
            style: null,
            parts: parts,
            points: points,
            type: type,
            prjCoordSys: prjCoordSys
        });
    }

    /**
     * @function ServerGeometry.prototype.IsClockWise
     * @description 判断 linearRing 中的点的顺序。返回值大于 0，逆时针；小于 0，顺时针。
     * @param {Geometry} geometry - 要转换的客户端 Geometry 对象。
     * @returns {number} 返回值大于 0，逆时针；小于 0，顺时针。
     */
    static IsClockWise(points) {
        var length = points.length;
        if (length < 3) {
            return 0.0;
        }
        var s = points[0].y * (points[length - 1].x - points[1].x);
        points.push(points[0]);
        for (var i = 1; i < length; i++) {
            s += points[i].y * (points[i - 1].x - points[i + 1].x);
        }
        return s * 0.5;
    }

    static bubbleSort(areaArray, pointList, geoTopo, polygonBounds) {
        for (var i = 0; i < areaArray.length; i++) {
            for (var j = 0; j < areaArray.length; j++) {
                if (areaArray[i] > areaArray[j]) {
                    var d = areaArray[j];
                    areaArray[j] = areaArray[i];
                    areaArray[i] = d;
                    var b = pointList[j];
                    pointList[j] = pointList[i];
                    pointList[i] = b;
                    if (geoTopo && geoTopo.length > 0) {
                        var c = geoTopo[j];
                        geoTopo[j] = geoTopo[i];
                        geoTopo[i] = c;
                    }
                    if (polygonBounds && polygonBounds.length > 0) {
                        var f = polygonBounds[j];
                        polygonBounds[j] = polygonBounds[i];
                        polygonBounds[i] = f;
                    }
                }
            }
        }
    }
}

