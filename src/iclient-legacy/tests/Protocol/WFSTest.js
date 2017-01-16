module("WFS");

test("TestWFS_constructor",function () {
    expect(8);
    var version = "1.1.0",
        srsName = "EPSG:4326",
        url = "http://localhost:6080/arcgis/services/China/MapServer/WFSServer",
        featureType="Countries",
        featurePrefix="China",
        maxFeatures=null,
        schema=null,
        geometryName="Shape";
    var wfs = new SuperMap.Protocol.WFS({
        version: version,
        srsName: srsName,
        url: url,
        featureType: featureType,
        featurePrefix: featurePrefix,
        maxFeatures: maxFeatures,
        schema: schema,
        geometryName: geometryName
    });
    equals(wfs.version, version, "1.1.0");
    equals(wfs.srsName, srsName, "EPSG:4326");
    equals(wfs.url, url, "http://localhost:6080/arcgis/services/China/MapServer/WFSServer");
    equals(wfs.featureType, featureType, "Countries");
    equals(wfs.featurePrefix, featurePrefix, "China");
    equals(wfs.maxFeatures, maxFeatures, null);
    equals(wfs.schema, schema, null);
    equals(wfs.geometryName, geometryName, "Shape");
});
