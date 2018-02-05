import L from "leaflet";
import '../core/Base';
import * as turf from '@turf/turf';

/**
 * @class L.supermap.turfLayer
 * @classdesc Turf图层
 * @category Visualization Turf
 * @extends L.Layer{@linkdoc-leaflet/#geojson}
 * @param options - {Object} 可选参数。如：<br>
 *        attribution - {string} 版权信息。
 */
export var TurfLayer = L.GeoJSON.extend({

    turfMap: {
        "Measurement.along": ["line", "distance", "units"],
        "Measurement.area": ["geojson"],
        "Measurement.bbox": ["geojson"],
        "Measurement.bboxPolygon": ["bbox"],
        "Measurement.bearing": ["start", "end", "final"],
        "Measurement.center": ["geojson", "properties"],
        "Measurement.centerOfMass": ["geojson", "properties"],
        "Measurement.centroid": ["geojson", "properties"],
        "Measurement.destination": ["origin", "distance", "bearing", "units"],
        "Measurement.distance": ["from", "to", "units"],
        "Measurement.envelope": ["geojson"],
        "Measurement.lineDistance": ["geojson", "units"],
        "Measurement.midpoint": ["point1", "point2"],
        "Measurement.pointOnSurface": ["fc"],
        "Measurement.polygonTangents": ["point", "polygon"],
        "Measurement.rhumbBearing": ["start", "end", "final"],
        "Measurement.rhumbDestination": ["origin", "distance", "bearing", "units"],
        "Measurement.rhumbDistance": ["from", "to", "units"],
        "Measurement.square": ["bbox"],
        "Measurement.greatCircle": ["start", "end", "properties", "npoints", "offset"],
        "CoordinateMutation.flip": ["geojson", "mutate"],
        "CoordinateMutation.rewind": ["geojson", "reverse", "mutate"],
        "CoordinateMutation.round": ["num", "precision"],
        "CoordinateMutation.truncate": ["geojson", "precision", "coordinates", "mutate"],
        "Transformation.bboxClip": ["feature", "bbox"],
        "Transformation.bezier": ["line", "resolution", "sharpness"],
        "Transformation.buffer": ["geojson", "radius", "units", "steps"],
        "Transformation.circle": ["center", "radius", "steps", "units", "properties"],
        "Transformation.clone": ["geojson", "cloneAll"],
        "Transformation.concave": ["points", "maxEdge", "units"],
        "Transformation.convex": ["feature"],
        "Transformation.difference": ["polygon1", "polygon2"],
        "Transformation.dissolve": ["featureCollection", "propertyName"],
        "Transformation.intersect": ["poly1", "poly2"],
        "Transformation.lineOffset": ["geojson", "distance", "units"],
        "Transformation.simplify": ["feature", "tolerance", "highQuality"],
        "Transformation.tesselate": ["poly"],
        "Transformation.transformRotate": ["geojson", "angle", "pivot", "mutate"],
        "Transformation.transformTranslate": ["geojson", "distance", "direction", "units", "zTranslation", "mutate"],
        "Transformation.transformScale": ["geojson", "factor", "origin", "mutate"],
        "Transformation.union": ["A"],
        "featureConversion.combine": ["fc"],
        "featureConversion.explode": ["geojson"],
        "featureConversion.flatten": ["geojson"],
        "featureConversion.lineStringToPolygon": ["lines", "properties", "autoComplete", "orderCoords"],
        "featureConversion.polygonize": ["geojson"],
        "featureConversion.polygonToLineString": ["polygon", "properties"],
        "Misc.kinks": ["featureIn"],
        "Misc.lineArc": ["center", "radius", "bearing1", "bearing2", "steps", "units"],
        "Misc.lineChunk": ["geojson", "segmentLength", "units", "reverse"],
        "Misc.lineIntersect": ["line1", "line2"],
        "Misc.lineOverlap": ["line1", "line2"],
        "Misc.lineSegment": ["geojson"],
        "Misc.lineSlice": ["startPt", "stopPt", "line"],
        "Misc.lineSliceAlong": ["line", "startDist", "stopDist", "units"],
        "Misc.lineSplit": ["line", "splitter"],
        "Misc.mask": ["polygon", "mask"],
        "Misc.pointOnLine": ["lines", "pt", "units"],
        "Misc.sector": ["center", "radius", "bearing1", "bearing2", "steps", "units"],
        "Misc.unkinkPolygon": ["geojson"],
        "Helper.featureCollection": ["features"],
        "Helper.feature": ["geometry", "properties"],
        "Helper.geometryCollection": ["geometries", "properties"],
        "Helper.lineString": ["coordinates", "properties"],
        "Helper.multiLineString": ["coordinates", "properties"],
        "Helper.multiPoint": ["coordinates", "properties"],
        "Helper.multiPolygon": ["coordinates", "properties"],
        "Helper.point": ["coordinates", "properties"],
        "Helper.polygon": ["coordinates", "properties"],
        "Data.random": ["type", "count", "options"],
        "Data.sample": ["featurecollection", "num"],
        "Interpolation.interpolate": ["points", "cellSize", "gridType", "property", "units", "weight"],
        "Interpolation.isobands": ["pointGrid", "breaks", "zProperty", "options"],
        "Interpolation.isolines": ["pointGrid", "breaks", "zProperty", "propertiesToAllIsolines", "propertiesPerIsoline"],
        "Interpolation.planepoint": ["point", "triangle"],
        "Interpolation.tin": ["points", "z"],
        "Interpolation.idw": ["controlPoints", "valueField", "weight", "cellWidth", "units"],
        "Joins.inside": ["point", "polygon", "ignoreBoundary"],
        "Joins.within": ["points", "polygons"],
        "Joins.tag": ["points", "polygons", "field", "outField"],
        "Grids.hexGrid": ["bbox", "cellDiameter", "units", "triangles"],
        "Grids.pointGrid": ["bbox", "cellSide", "units", "centered", "bboxIsMask"],
        "Grids.squareGrid": ["bbox", "cellSize", "units", "completelyWithin"],
        "Grids.triangleGrid": ["bbox", "cellSize", "units"],
        "Classification.nearest": ["targetPoint", "points"],
        "Aggregation.collect": ["polygons", "points", "inProperty", "outProperty"],
        "Aggregation.clustersDbscan": ["points", "maxDistance", "units", "minPoints"],
        "Aggregation.clustersKmeans": ["points", "numberOfClusters", "mutate"],
        "Meta.coordAll": ["geojson"],
        "Meta.coordEach": ["geojson", "callback", "excludeWrapCoord"],
        "Meta.coordReduce": ["geojson", "callback", "initialValue", "excludeWrapCoord"],
        "Meta.featureEach": ["geojson", "callback"],
        "Meta.featureReduce": ["geojson", "callback", "initialValue"],
        "Meta.flattenEach": ["geojson", "callback"],
        "Meta.flattenReduce": ["geojson", "callback", "initialValue"],
        "Meta.getCoord": ["obj"],
        "Meta.getCoords": ["obj"],
        "Meta.getGeom": ["obj"],
        "Meta.getGeomType": ["obj"],
        "Meta.geomEach": ["geojson", "callback"],
        "Meta.geomReduce": ["geojson", "callback", "initialValue"],
        "Meta.propEach": ["geojson", "callback"],
        "Meta.propReduce": ["geojson", "callback", "initialValue"],
        "Meta.segmentEach": ["geojson", "callback"],
        "Meta.segmentReduce": ["geojson", "callback", "initialValue"],
        "Meta.getCluster": ["geojson", "filter"],
        "Meta.clusterEach": ["geojson", "property", "callback"],
        "Meta.clusterReduce": ["geojson", "property", "callback", "initialValue"],
        "Assertions.collectionOf": ["featureCollection", "type", "name"],
        "Assertions.containsNumber": ["coordinates"],
        "Assertions.geojsonType": ["value", "type", "name"],
        "Assertions.featureOf": ["feature", "type", "name"],
        "Booleans.booleanClockwise": ["line"],
        "Booleans.booleanContains": ["feature1", "feature2"],
        "Booleans.booleanCrosses": ["feature1", "feature2"],
        "Booleans.booleanDisjoint": ["feature1", "feature2"],
        "Booleans.booleanOverlap": ["feature1", "feature2"],
        "Booleans.booleanPointOnLine": ["point", "linestring", "ignoreEndVertices"],
        "UnitConversion.bearingToAngle": ["bearing"],
        "UnitConversion.convertArea": ["area", "originalUnit", "finalUnit"],
        "UnitConversion.convertDistance": ["distance", "originalUnit", "finalUnit"],
        "UnitConversion.degrees2radians": ["degrees"],
        "UnitConversion.distanceToRadians": ["distance", "units"],
        "UnitConversion.distanceToDegrees": ["distance", "units"],
        "UnitConversion.radiansToDistance": ["radians", "units"],
        "UnitConversion.radians2degrees": ["radians"]
    },

    options: {
        attribution: "<span>© <a href='http://turfjs.org/' target='_blank'>turfjs</a></span> with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
    },

    initialize: function (options) {
        options = options || {};
        L.Util.setOptions(this, options);
        L.stamp(this);
        this._layers = {};
    },

    /**
     * @function L.supermap.turfLayer.prototype.process
     * @description 执行Turf.js提供的相关空间分析方法
     * @param type -{string} Turf.js提供的空间分析方法名
     * @param args -{Object} Turf.js提供的空间分析方法对应的参数对象
     * @param callback -{function} 空间分析完成执行的回调函数，返回执行的结果
     * @param addFeaturesToMap -{boolean} 是否添加到map
     */
    process: function (type, args, callback, addFeaturesToMap) {
        var result = turf[type.split('.')[1]].apply(this, this.parse(type, args));
        addFeaturesToMap = addFeaturesToMap == null ? true : addFeaturesToMap;
        if (addFeaturesToMap) {
            this.addData([result]);
        }
        if (callback) {
            callback(result);
        }
    },

    parse: function (type, args) {
        if (type === 'Transformation.union') {
            return args['A'];
        }
        var result = [];
        var tempArgs = this.turfMap[type];
        if (tempArgs) {
            tempArgs.map(function (key) {
                result.push(args[key]);
                return args[key];
            });
        }
        return result;
    }
});

export var turfLayer = function (options) {
    return new TurfLayer(options);
};

L.supermap.turfLayer = turfLayer;