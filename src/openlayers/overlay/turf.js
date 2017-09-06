import ol from 'openlayers/dist/ol-debug';
import turf from 'turf';

/**
 * @class ol.source.Turf
 * @classdesc 对接Turf.js
 * @param opt_options -{Object} 参数
 * @extends ol.source.Vector{@linkdoc-openlayers/ol.source.Vector}
 */
export default class Turf extends ol.source.Vector {

    turfMap = {
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
    }

    constructor(opt_options) {
        var options = opt_options ? opt_options : {};
        super({
            attributions: options.attributions || new ol.Attribution({
                html: "<span>© <a href='http://turfjs.org/' target='_blank'>turfjs</a></span> with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
            }),
            features: options.features,
            format: options.format,
            extent: options.extent,
            logo: options.logo,
            projection: options.projection,
            wrapX: options.wrapX
        });
    }

    /**
     * @function ol.source.turf.prototype.process
     * @description 执行Turf.js提供的相关空间分析方法
     * @param type Turf.js提供的空间分析方法名
     * @param args Turf.js提供的空间分析方法对应的参数对象
     * @param callback 空间分析完成执行的回调函数
     */
    process(type, args, callback) {
        var result = turf[type].apply(this, this.parse(type, args));
        var features = null;
        try {
            features = (new ol.format.GeoJSON()).readFeatures(result);
        } catch (e) {
            callback(result);
            return;
        }
        this.addFeatures(features);
        callback(result);
    }

    parse(type, args) {
        var result = [];
        var tempArgs = this.turfMap[type];
        if (tempArgs) {
            tempArgs.map(function (key) {
                result.push(args[key]);
            });
        }
        return result;
    }

}
ol.source.Turf = Turf;