/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import * as turf from '@turf/turf';
import Attributions from '../core/Attributions'

/**
 * @class L.supermap.turfLayer
 * @classdesc Turf 图层。
 * @category Visualization Turf
 * @extends {L.Layer}
 * @param {Object} options - 可选参数。
 * @param {string} [options.attribution='<span>© <a href='http://turfjs.org/' title='turfjs' target='_blank'>turfjs</a></span>'] - 版权信息。
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
        "Measurement.length": ["geojson", "units"],
        "Measurement.midpoint": ["point1", "point2"],
        "Measurement.pointOnFeature": ["geojson"],
        "Measurement.polygonTangents": ["point", "polygon"],
        "Measurement.rhumbBearing": ["start", "end", "final"],
        "Measurement.rhumbDestination": ["origin", "distance", "bearing", "units"],
        "Measurement.rhumbDistance": ["from", "to", "units"],
        "Measurement.square": ["bbox"],
        "Measurement.greatCircle": ["start", "end", "properties", "npoints", "offset"],
        "CoordinateMutation.cleanCoords": ["geojson", "mutate"],
        "CoordinateMutation.flip": ["geojson", "mutate"],
        "CoordinateMutation.rewind": ["geojson", "reverse", "mutate"],
        "CoordinateMutation.round": ["num", "precision"],
        "CoordinateMutation.truncate": ["geojson", "precision", "coordinates", "mutate"],
        "Transformation.bboxClip": ["feature", "bbox"],
        "Transformation.bezierSpline": ["line", "resolution", "sharpness"],
        "Transformation.buffer": ["geojson", "radius", "units", "steps"],
        "Transformation.circle": ["center", "radius", "steps", "units", "properties"],
        "Transformation.clone": ["geojson"],
        "Transformation.concave": ["points", "maxEdge", "units"],
        "Transformation.convex": ["geojson", "concavity"],
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
        "Transformation.voronoi": ["points", "bbox"],
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
        "Misc.shortestPath": ["start", "end", "obstacles", "units", "resolution"],
        "Misc.unkinkPolygon": ["geojson"],
        "Helper.featureCollection": ["features", "bbox", "id"],
        "Helper.feature": ["geometry", "properties", "bbox", "id"],
        "Helper.geometryCollection": ["geometries", "properties", "bbox", "id"],
        "Helper.lineString": ["coordinates", "properties", "bbox", "id"],
        "Helper.multiLineString": ["coordinates", "properties", "bbox", "id"],
        "Helper.multiPoint": ["coordinates", "properties", "bbox", "id"],
        "Helper.multiPolygon": ["coordinates", "properties", "bbox", "id"],
        "Helper.point": ["coordinates", "properties", "bbox", "id"],
        "Helper.polygon": ["coordinates", "properties", "bbox", "id"],
        "Data.sample": ["featurecollection", "num"],
        "Interpolation.interpolate": ["points", "cellSize", "gridType", "property", "units", "weight"],
        "Interpolation.isobands": ["pointGrid", "breaks", "zProperty", "commonProperties", "breaksProperties"],
        "Interpolation.isolines": ["pointGrid", "breaks", "zProperty", "commonProperties", "breaksProperties"],
        "Interpolation.planepoint": ["point", "triangle"],
        "Interpolation.tin": ["points", "z"],
        "Joins.pointsWithinPolygon": ["points", "polygons"],
        "Joins.tag": ["points", "polygons", "field", "outField", "mask", "properties"],
        "Grids.hexGrid": ["bbox", "cellSide", "units", "triangles"],
        "Grids.pointGrid": ["bbox", "cellSide", "units", "mask", "properties"],
        "Grids.squareGrid": ["bbox", "cellSide", "units", "mask", "properties"],
        "Grids.triangleGrid": ["bbox", "cellSide", "units", "mask", "properties"],
        "Classification.nearestPoint": ["targetPoint", "points"],
        "Aggregation.collect": ["polygons", "points", "inProperty", "outProperty"],
        "Aggregation.clustersDbscan": ["points", "maxDistance", "units", "minPoints", "mutate"],
        "Aggregation.clustersKmeans": ["points", "numberOfClusters", "mutate"],
        "Meta.coordAll": ["geojson"],
        "Meta.coordEach": ["geojson", "callback", "excludeWrapCoord"],
        "Meta.coordReduce": ["geojson", "callback", "initialValue", "excludeWrapCoord"],
        "Meta.featureEach": ["geojson", "callback"],
        "Meta.featureReduce": ["geojson", "callback", "initialValue"],
        "Meta.flattenEach": ["geojson", "callback"],
        "Meta.flattenReduce": ["geojson", "callback", "initialValue"],
        "Meta.getCoord": ["coord"],
        "Meta.getCoords": ["coords"],
        "Meta.getGeom": ["geojson"],
        "Meta.getGeomType": ["geojson", "name"],
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
        "Booleans.booleanEqual": ["feature1", "feature2"],
        "Booleans.booleanOverlap": ["feature1", "feature2"],
        "Booleans.booleanParallel": ["feature1", "feature2"],
        "Booleans.booleanPointInPolygon": ["point", "polygon", "ignoreBoundary"],
        "Booleans.booleanPointOnLine": ["point", "linestring", "ignoreEndVertices"],
        "UnitConversion.bearingToAngle": ["bearing"],
        "UnitConversion.convertArea": ["area", "originalUnit", "finalUnit"],
        "UnitConversion.convertLength": ["length", "originalUnit", "finalUnit"],
        "UnitConversion.degreesToradians": ["degrees"],
        "UnitConversion.lengthToRadians": ["distance", "units"],
        "UnitConversion.lengthToDegrees": ["distance", "units"],
        "UnitConversion.radiansToLength": ["radians", "units"],
        "UnitConversion.radiansToDegrees": ["radians"],
        "UnitConversion.toMercator": ["geojson", "mutate"],
        "UnitConversion.toWgs84": ["geojson", "mutate"]
    },
    options: {
        attribution: Attributions.Turf.attribution
    },

    initialize: function (options) {
        options = options || {};
        L.Util.setOptions(this, options);
        L.stamp(this);
        this._layers = {};
    },
    // 5.0.0 及以上版本参数配置
    turfOptionMap: {
        "Measurement.along": ["line", "distance", {units: ""}],
        "Measurement.bboxPolygon": ["bbox", {properties: "", id: ""}],
        "Measurement.bearing": ["start", "end", {final: ""}],
        "Measurement.center": ["geojson", {properties: ""}],
        "Measurement.destination": ["origin", "distance", "bearing", {units: "", properties: ""}],
        "Measurement.distance": ["from", "to", {units: ""}],
        "Measurement.length": ["geojson", {units: ""}],
        "Measurement.rhumbBearing": ["start", "end", {final: ""}],
        "Measurement.rhumbDestination": ["origin", "distance", "bearing", {units: "", properties: ""}],
        "Measurement.rhumbDistance": ["from", "to", {units: ""}],
        "Measurement.greatCircle": ["start", "end", {properties: "", npoints: "", offset: ""}],
        "CoordinateMutation.cleanCoords": ["geojson", {mutate: ""}],
        "CoordinateMutation.flip": ["geojson", {mutate: ""}],
        "CoordinateMutation.rewind": ["geojson", {mutate: "", reverse: ""}],
        "CoordinateMutation.truncate": ["geojson", {precision: "", coordinates: "", mutate: ""}],
        "Transformation.bezierSpline": ["line", {resolution: "", sharpness: ""}],
        "Transformation.buffer": ["geojson", "radius", {units: "", steps: ""}],
        "Transformation.circle": ["center", "radius", {units: "", steps: "", properties: ""}],
        "Transformation.concave": ["points", {maxEdge: "", units: ""}],
        "Transformation.convex": ["geojson", {concavity: ""}],
        "Transformation.dissolve": ["featureCollection", {propertyName: ""}],
        "Transformation.lineOffset": ["geojson", "distance", {units: ""}],
        "Transformation.simplify": ["geojson", {tolerance: "", highQuality: ""}],
        "Transformation.transformRotate": ["geojson", "angle", {pivot: "", mutate: ""}],
        "Transformation.transformTranslate": ["geojson", "distance", "direction", {
            units: "",
            zTranslation: "",
            mutate: ""
        }],
        "Transformation.transformScale": ["geojson", "factor", {origin: "", mutate: ""}],
        "Transformation.voronoi": ["points", {bbox: ""}],
        "featureConversion.lineStringToPolygon": ["lines", {properties: "", autoComplete: "", orderCoords: ""}],
        "featureConversion.polygonToLineString": ["polygon", {properties: ""}],
        "Misc.lineArc": ["center", "radius", "bearing1", "bearing2", {steps: "", units: ""}],
        "Misc.lineChunk": ["geojson", "segmentLength", {units: "", reverse: ""}],
        "Misc.lineOverlap": ["line1", "line2", {tolerance: ""}],
        "Misc.lineSliceAlong": ["line", "startDist", "stopDist", {units: ""}],
        "Misc.pointOnLine": ["lines", "pt", {units: ""}],
        "Misc.sector": ["center", "radius", "bearing1", "bearing2", {units: "", steps: "", properties: ""}],
        "Misc.shortestPath": ["start", "end", {obstacles: "", units: "", resolution: ""}],
        "Helper.feature": ["geometry", "properties", {bbox: "", id: ""}],
        "Helper.geometryCollection": ["geometries", "properties", {bbox: "", id: ""}],
        "Helper.lineString": ["coordinates", "properties", {bbox: "", id: ""}],
        "Helper.multiLineString": ["coordinates", "properties", {bbox: "", id: ""}],
        "Helper.multiPoint": ["coordinates", "properties", {bbox: "", id: ""}],
        "Helper.multiPolygon": ["coordinates", "properties", {bbox: "", id: ""}],
        "Helper.point": ["coordinates", "properties", {bbox: "", id: ""}],
        "Helper.polygon": ["coordinates", "properties", {bbox: "", id: ""}],
        "Interpolation.interpolate": ["points", "cellSize", {gridType: "", property: "", units: "", weight: ""}],
        "Interpolation.isobands": ["pointGrid", "breaks", {zProperty: "", commonProperties: "", breaksProperties: ""}],
        "Interpolation.isolines": ["pointGrid", "breaks", {zProperty: "", commonProperties: "", breaksProperties: ""}],
        "Grids.hexGrid": ["bbox", "cellSide", {units: "", triangles: "", properties: "", mask: ""}],
        "Grids.pointGrid": ["bbox", "cellSide", {units: "", mask: "", properties: ""}],
        "Grids.squareGrid": ["bbox", "cellSide", {units: "", mask: "", properties: ""}],
        "Grids.triangleGrid": ["bbox", "cellSide", {units: "", mask: "", properties: ""}],
        "Aggregation.clustersDbscan": ["points", "maxDistance", {units: "", minPoints: "", mutate: ""}],
        "Aggregation.clustersKmeans": ["points", {numberOfClusters: "", mutate: ""}],
        "Booleans.booleanPointInPolygon": ["point", "polygon", {ignoreBoundary: ""}],
        "Booleans.booleanPointOnLine": ["point", "linestring", {ignoreEndVertices: ""}],
        "UnitConversion.toMercator": ["geojson", {mutate: ""}],
        "UnitConversion.toWgs84": ["geojson", {mutate: ""}]
    },

    /**
     * @function L.supermap.turfLayer.prototype.process
     * @description 执行 Turf.js 提供的相关空间分析方法。
     * @param {string} type - Turf.js 提供的空间分析方法名。
     * @param {Object} args - Turf.js 提供的空间分析方法对应的参数对象。
     * @param {Function} callback - 空间分析完成执行的回调函数，返回执行的结果。
     * @param {boolean} [addFeaturesToMap=true] - 是否添加到 map。
     */
    process: function (type, args, callback, addFeaturesToMap) {
        // 兼容版本4到5
        var result;
        try {
            result = turf[type.split('.')[1]].apply(this, this.parse(type, args));
        } catch (e) {
            result = turf[type.split('.')[1]].apply(this, this.parseOption(type, args));
        }
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
    },
    parseOption(type, args) {
        var result = [];
        var tempArgs = this.turfOptionMap[type];
        tempArgs.map(function (key) {
            if (key instanceof Object) {
                var options = key;
                Object.keys(options).forEach(function (k) {
                    options[k] = args[k]
                })
                result.push(options);
            } else {
                result.push(args[key])
            }
            return args;
        })
        return result;
    }
});

export var turfLayer = function (options) {
    return new TurfLayer(options);
};

L.supermap.turfLayer = turfLayer;