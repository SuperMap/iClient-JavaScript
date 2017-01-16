module("GeoJSON");
var featureGeojson = {
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [102.0, 0.5]},
    "properties": {"prop0": "value0"}
};

var featureCollectionGeojson = {
    "type": "FeatureCollection",
    "crs": {"type": "name", "properties": {"name": "urn:ogc:def:crs:OGC:1.3:CRS84"}},

    "features": [
        {
            "type": "Feature",
            "properties": {"name": "Saguenay (Arrondissement Latterière)"},
            "geometry": {"type": "Point", "coordinates": [-75.849253579389796, 47.6434349837781]}
        },
        {
            "type": "Feature",
            "properties": {"name": "Canton Tremblay"},
            "geometry": {"type": "Point", "coordinates": [-75.840218528338056, 47.971115165183342]}
        }
    ]
};

var pointGeojson = {"type": "Point", "coordinates": [100.0, 0.0]};

var polygonGeojson = {
    "type": "Polygon",
    "coordinates": [
        [[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]]
    ]
};

var geometryCollectionGeojson = {
    "type": "GeometryCollection",
    "geometries": [
        {
            "type": "Point",
            "coordinates": [100.0, 0.0]
        },
        {
            "type": "LineString",
            "coordinates": [[101.0, 0.0], [102.0, 1.0]]
        }
    ]
};

var lineStringGeojson = {
    "type": "LineString",
    "coordinates": [[100.0, 0.0], [101.0, 1.0]]
};

var multiPointGeojson = {
    "type": "MultiPoint",
    "coordinates": [[100.0, 0.0], [101.0, 1.0]]
};

var multiPolygonGeojson = {
    "type": "MultiPolygon",
    "coordinates": [
        [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
        [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
            [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
    ]
};

var multiLineStringGeojson = {
    "type": "MultiLineString",
    "coordinates": [
        [[100.0, 0.0], [101.0, 1.0]],
        [[102.0, 2.0], [103.0, 3.0]]
    ]
};

test("GeoJSON_constructorDefault", function () {
    expect(2);
    var geoJSON = new SuperMap.Format.GeoJSON();
    ok(geoJSON instanceof SuperMap.Format.GeoJSON, "geoJSON  instanceof  SuperMap.Format.GeoJSON");
    equals(geoJSON.ignoreExtraDims, false, "Property:ignoreExtraDims");
});

test("test_GeoJSON_createCRSObject", function () {
    expect(2);
    var geoJSON = new SuperMap.Format.GeoJSON();
    var origion = new SuperMap.Geometry.Point(0, 30);
    var sides = 30;
    var cuvre = SuperMap.Geometry.Polygon.createRegularPolygonCurve(origion, 50, sides, 80, 220);
    var feature = new SuperMap.Feature.Vector(cuvre);
    feature.layer = new SuperMap.Layer.Vector("vector layer1");
    feature.layer.projection = "EPSG:3857";
    var crs = {
        "type": "name",
        "properties": {
            "name": "EPSG:" + 3857
        }
    };
    equals(geoJSON.createCRSObject(feature).type, crs.type, "验证创建CRS对象");
    equals(geoJSON.createCRSObject(feature).properties.name, crs.properties.name, "验证创建CRS对象");
});

test("test_GeoJSON_isValidType", function () {
    expect(9);
    var geoJSON = new SuperMap.Format.GeoJSON();
    ok(geoJSON.isValidType(featureGeojson, "Feature"), "检查一个GeoJSON对象是Feature类型的对象");
    ok(geoJSON.isValidType(featureCollectionGeojson, "FeatureCollection"), "检查一个GeoJSON对象是FeatureCollection类型的对象");
    ok(geoJSON.isValidType(geometryCollectionGeojson, "GeometryCollection"), "检查一个GeoJSON对象是geometryCollection类型的对象");
    ok(geoJSON.isValidType(pointGeojson, "Geometry"), "检查一个GeoJSON对象是Point类型的对象");
    ok(geoJSON.isValidType(polygonGeojson, "Geometry"), "检查一个GeoJSON对象是Polygon类型的对象");
    ok(geoJSON.isValidType(lineStringGeojson, "Geometry"), "检查一个GeoJSON对象是LineString类型的对象");
    ok(geoJSON.isValidType(multiPointGeojson, "Geometry"), "检查一个GeoJSON对象是MultiPoint类型的对象");
    ok(geoJSON.isValidType(multiPolygonGeojson, "Geometry"), "检查一个GeoJSON对象是MultiPolygon类型的对象");
    ok(geoJSON.isValidType(multiLineStringGeojson, "Geometry"), "检查一个GeoJSON对象是MultiLineString类型的对象");
});

test("test_GeoJSON_parseFeature", function () {
    expect(2);
    var geoJSON = new SuperMap.Format.GeoJSON();
    ok(geoJSON.parseFeature(featureCollectionGeojson) instanceof SuperMap.Feature.Vector, "将一个GeoJSON中的featureCollection转化成SuperMap.Feature.Vector对象");
    ok(geoJSON.parseFeature(featureGeojson) instanceof SuperMap.Feature.Vector, "将一个GeoJSON中的feature转化成SuperMap.Feature.Vector对象");
});

test("test_GeoJSON_parseGeometry", function () {
    expect(7);
    var geoJSON = new SuperMap.Format.GeoJSON();
    ok(geoJSON.parseGeometry(geometryCollectionGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
    ok(geoJSON.parseGeometry(pointGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
    ok(geoJSON.parseGeometry(polygonGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
    ok(geoJSON.parseGeometry(lineStringGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
    ok(geoJSON.parseGeometry(multiPointGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
    ok(geoJSON.parseGeometry(multiPolygonGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
    ok(geoJSON.parseGeometry(multiLineStringGeojson) instanceof SuperMap.Geometry, "将一个GeoJSON中的几何要素转化成SuperMap.Geometry对象");
});

test("test_GeoJSON_read", function () {
    expect(8);
    var geoJSON = new SuperMap.Format.GeoJSON();
    ok(geoJSON.read(featureGeojson, "Feature") instanceof SuperMap.Feature.Vector, "反序列化一个GeoJSON字符串为SuperMap.Geometry对象");
    ok(geoJSON.read(featureCollectionGeojson, "FeatureCollection")[0] instanceof SuperMap.Feature.Vector, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象集合");
    ok(geoJSON.read(pointGeojson, "Geometry") instanceof SuperMap.Geometry, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象");
    ok(geoJSON.read(polygonGeojson, "Geometry") instanceof SuperMap.Geometry, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象");
    ok(geoJSON.read(lineStringGeojson, "Geometry") instanceof SuperMap.Geometry, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象");
    ok(geoJSON.read(multiPointGeojson, "Geometry") instanceof SuperMap.Geometry, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象");
    ok(geoJSON.read(multiPolygonGeojson, "Geometry") instanceof SuperMap.Geometry, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象");
    ok(geoJSON.read(multiLineStringGeojson, "Geometry") instanceof SuperMap.Geometry, "反序列化一个GeoJSON字符串为SuperMap.Feature.Vector对象");
});

test("test_GeoJSON_write", function () {
    expect(8);
    var geoJSON = new SuperMap.Format.GeoJSON();
    var geometry = geoJSON.read(polygonGeojson, "Geometry");
    var feature = geoJSON.read(featureGeojson, "Feature");
    var featureCollection = geoJSON.read(featureCollectionGeojson, "FeatureCollection");
    var point = geoJSON.read(pointGeojson, "Geometry");
    var polygon = geoJSON.read(polygonGeojson, "Geometry");
    var lineString = geoJSON.read(lineStringGeojson, "Geometry");
    var multiPoint = geoJSON.read(multiPointGeojson, "Geometry");
    var multiPolygon = geoJSON.read(multiPolygonGeojson, "Geometry");
    var multiLineString = geoJSON.read(multiLineStringGeojson, "Geometry");
    equals(JSON.parse(geoJSON.write(feature)).type, featureGeojson.type, "序列化一个SuperMap.Geometry对象为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(featureCollection)).type, featureCollectionGeojson.type, "序列化一个SuperMap.Feature.Vector对象集合为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(point)).type, pointGeojson.type, "序列化一个要素对象一个SuperMap.Feature.Vector对象为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(polygon)).type, polygonGeojson.type, "序列化一个要素对象一个SuperMap.Feature.Vector对象为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(lineString)).type, lineStringGeojson.type, "序列化一个要素对象一个SuperMap.Feature.Vector对象为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(multiPoint)).type, multiPointGeojson.type, "序列化一个要素对象一个SuperMap.Feature.Vector对象为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(multiPolygon)).type, multiPolygonGeojson.type, "序列化一个要素对象一个SuperMap.Feature.Vector对象为GeoJSON字符串");
    equals(JSON.parse(geoJSON.write(multiLineString)).type, multiLineStringGeojson.type, "序列化一个要素对象一个SuperMap.Feature.Vector对象为GeoJSON字符串");
});