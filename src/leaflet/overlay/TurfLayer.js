import L from "leaflet";
import turf from 'turf';

/**
 * @class L.supermap.turfLayer
 * @classdesc Turf图层
 * @extends L.Layer{@linkdoc-leaflet/#geojson}
 * @param options - {Object} 可选参数。如：<br>
 *        attribution - {string} 版权信息。
 */
export var TurfLayer = L.GeoJSON.extend({

    turfMap: {
        //Measurement
        "along": ["line", "distance", "units"],
        "area": ["geojson"],
        "bbox": ["geojson"],
        "bboxPolygon": ["bbox"],
        "bearing": ["start", "end", "final"],
        "center": ["geojson", "properties"],
        "centroid": ["geojson", "properties"],
        "destination": ["origin", "distance", "bearing", "units"],
        "distance": ["from", "to", "units"],
        "envelope": ["geojson"],
        "lineDistance": ["geojson", "units"],
        "midpoint": ["point1", "point2"],
        "pointOnSurface": ["fc"],
        "square": ["bbox"],
        //Coordinate Mutation
        "flip": ["geojson", "mutate"],
        //Transformation
        "bezier": ["line", "resolution", "sharpness"],
        "buffer": ["geojson", "radius", "units", "steps"],
        "concave": ["points", "maxEdge", "units"],
        "convex": ["feature"],
        "difference": ["polygon1", "polygon2"],
        "intersect": ["poly1", "poly2"],
        "simplify": ["feature", "tolerance", "highQuality"],
        "tesselate": ["poly"],
        "union": ["A"],
        //Feature Conversion
        "combine": ["fc"],
        "explode": ["geojson"],
        //Misc
        "kinks": ["featureIn"],
        "lineSlice": ["startPt", "stopPt", "line"],
        "pointOnLine": ["lines", "pt", "units"],
        //INTERPOLATION
        "isolines": ["pointGrid", "breaks", "zProperty", "propertiesToAllIsolines", "propertiesPerIsoline"],
        "planepoint": ["point", "triangle"],
        "tin": ["points", "z"],
        //JOINS
        "within": ["points", "polygons"],
        "tag": ["points", "polygons", "field", "outField"],
        "inside": ["point", "polygon", "ignoreBoundary"],
        //AGGREGATION
        "collect": ["polygons", "points", "inProperty", "outProperty"],
        //DATA
        "sample": ["featurecollection", "num"],
        "random": ["type", "count", "options"],
        //CLASSIFICATION
        "nearest": ["targetPoint", "points"],
        //GRIDS
        "pointGrid": ["bbox", "cellSide", "units", "centered", "bboxIsMask"],
        "squareGrid": ["bbox", "cellSize", "units", "completelyWithin"],
        "triangleGrid": ["bbox", "cellSize", "units"],
        "hexGrid": ["bbox", "cellDiameter", "units", "triangles"],
        //HELPERS
        "point": ["coordinates", "properties"],
        "polygon": ["coordinates", "properties"],
        "lineString": ["coordinates", "properties"],
        "multiPoint": ["coordinates", "properties"],
        "multiPolygon": ["coordinates", "properties"],
        "feature": ["geometry", "properties"],
        "multiLineString": ["coordinates", "properties"],
        "featureCollection": ["features"],
        "geometryCollection": ["geometries", "properties"],
    },

    options: {
        attribution: "<span>© <a href='http://turfjs.org/' target='_blank'>turfjs</a></span> with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
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
     * @param type Turf.js提供的空间分析方法名
     * @param args Turf.js提供的空间分析方法对应的参数对象
     * @param callback 空间分析完成执行的回调函数
     */
    process: function (type, args, callback) {
        var result = turf[type].apply(this, this.parse(type, args));
        this.addData([result]);
        callback(result);
    },

    parse: function (type, args) {
        var result = [];
        var tempArgs = this.turfMap[type];
        if (tempArgs) {
            tempArgs.map(function (key) {
                result.push(args[key]);
            });
        }
        return result;
    }
});

export var turfLayer = function (options) {
    return new TurfLayer(options);
};
L.supermap.turfLayer = turfLayer;