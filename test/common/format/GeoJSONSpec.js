import {
    GeoJSON
} from '../../../src/common/format/GeoJSON';
import {
    GeometryType
} from '../../../src/common/REST';

describe('GeoJSON', () => {
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });


    it('toGeoPoint', () => {
        var obj = {
            id: 1,
            parts: [1],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            }],
            type: GeometryType.POINT
        };

        var geojson = new GeoJSON().toGeoJSON(obj);
        expect(geojson).not.toBeNull();
        expect(geojson.type).toEqual("Feature");
        expect(geojson.geometry).not.toBeNull();
        expect(geojson.geometry.type).toEqual("Point");
        expect(geojson.geometry.coordinates).not.toBeNull();
        expect(geojson.geometry.coordinates[0]).toEqual(4020.0045221720466);
        expect(geojson.geometry.coordinates[1]).toEqual(-4377.027184298267);
    });

    it('toGeoPoint_MultiPoint', () => {
        var obj = {
            id: 1,
            parts: [1, 1],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            }
            ],
            type: GeometryType.POINT
        };
        var toGeoPointMulti = new GeoJSON().toGeoJSON(obj);
        expect(toGeoPointMulti).not.toBeNull();
        expect(toGeoPointMulti.type).toEqual("Feature");
        expect(toGeoPointMulti.geometry).not.toBeNull();
        expect(toGeoPointMulti.geometry.type).toEqual("MultiPoint");
        expect(toGeoPointMulti.geometry.coordinates).not.toBeNull();
        expect(toGeoPointMulti.geometry.coordinates.length).toEqual(2);
        expect(toGeoPointMulti.geometry.coordinates[0][0]).toEqual(4020.0045221720466);
        expect(toGeoPointMulti.geometry.coordinates[0][1]).toEqual(-4377.027184298267);
        expect(toGeoPointMulti.geometry.coordinates[1][0]).toEqual(4057.0600591960642);
        expect(toGeoPointMulti.geometry.coordinates[1][1]).toEqual(-4381.569363260499);
    });

    it('toGeoLine_LineRing', () => {
        var obj = {
            parts: [4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            }
            ],
            type: GeometryType.LINE
        };
        var geoLine_LineRing = new GeoJSON().toGeoJSON(obj);
        expect(geoLine_LineRing).not.toBeNull();
        expect(geoLine_LineRing.type).toEqual("Feature");
        expect(geoLine_LineRing.geometry).not.toBeNull();
        expect(geoLine_LineRing.geometry.type).toEqual("LineString");
        expect(geoLine_LineRing.geometry.coordinates).not.toBeNull();
        expect(geoLine_LineRing.geometry.coordinates.length).toEqual(4);
        expect(geoLine_LineRing.geometry.coordinates[1][0]).toEqual(4057.0600591960642);
        expect(geoLine_LineRing.geometry.coordinates[1][1]).toEqual(-4381.569363260499);
    });

    it('toGeoLine_LineString', () => {
        var obj = {
            id: 1,
            parts: [4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4382.939424428795,
                "x": 4076.2655245045335
            }
            ],
            type: GeometryType.LINE
        };
        var geoLine_LineString = new GeoJSON().toGeoJSON(obj);
        expect(geoLine_LineString).not.toBeNull();
        expect(geoLine_LineString.type).toEqual("Feature");
        expect(geoLine_LineString.geometry).not.toBeNull();
        expect(geoLine_LineString.geometry.type).toEqual("LineString");
        expect(geoLine_LineString.geometry.coordinates).not.toBeNull();
        expect(geoLine_LineString.geometry.coordinates.length).toEqual(4);
        expect(geoLine_LineString.geometry.coordinates[1][0]).toEqual(4057.0600591960642);
        expect(geoLine_LineString.geometry.coordinates[1][1]).toEqual(-4381.569363260499);
    });

    it('toGeoLine_MultiLineString', () => {
        var obj = {
            id: 1,
            parts: [4, 4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4382.939424428795,
                "x": 4076.2655245045335
            },
            {
                "y": -4382.333381109672,
                "x": 4215.049444583775
            },
            {
                "y": -4382.389670274902,
                "x": 4247.756955878764
            },
            {
                "y": -4382.285032149534,
                "x": 4428.153084011883
            },
            {
                "y": -4383.017499027105,
                "x": 4647.579232906979
            }
            ],
            type: GeometryType.LINE
        };
        var geoLine_MultiLineString = new GeoJSON().toGeoJSON(obj);
        expect(geoLine_MultiLineString).not.toBeNull();
        expect(geoLine_MultiLineString.type).toEqual("Feature");
        expect(geoLine_MultiLineString.geometry).not.toBeNull();
        expect(geoLine_MultiLineString.geometry.type).toEqual("MultiLineString");
        expect(geoLine_MultiLineString.geometry.coordinates).not.toBeNull();
        expect(geoLine_MultiLineString.geometry.coordinates.length).toEqual(2);
        expect(geoLine_MultiLineString.geometry.coordinates[1][0][0]).toEqual(4215.049444583775);
        expect(geoLine_MultiLineString.geometry.coordinates[1][0][1]).toEqual(-4382.333381109672);
    });

    it('toGeoLineEPS_LinearRing', () => {
        var obj = {
            id: 1,
            parts: [4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            }
            ],
            type: GeometryType.LINEEPS
        };
        var toGeoLineEPS_LinearRing = new GeoJSON().toGeoJSON(obj);
        expect(toGeoLineEPS_LinearRing).not.toBeNull();
        expect(toGeoLineEPS_LinearRing.type).toEqual("Feature");
        expect(toGeoLineEPS_LinearRing.geometry).not.toBeNull();
        expect(toGeoLineEPS_LinearRing.geometry.type).toEqual("LineString");
        expect(toGeoLineEPS_LinearRing.geometry.coordinates).not.toBeNull();
        expect(toGeoLineEPS_LinearRing.geometry.coordinates.length).toEqual(4);
        expect(toGeoLineEPS_LinearRing.geometry.coordinates[1][0]).toEqual(4057.0600591960642);
        expect(toGeoLineEPS_LinearRing.geometry.coordinates[1][1]).toEqual(-4381.569363260499);
    });

    it('toGeoLineEPS_LineString', () => {
        var obj = {
            id: 1,
            parts: [4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466,
                "z": 1
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642,
                "z": 2
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362,
                "z": 3
            },
            {
                "y": -4382.939424428795,
                "x": 4076.2655245045335,
                "z": 4
            }
            ],
            type: GeometryType.LINEEPS
        };
        var geoLine_LineString = new GeoJSON().toGeoJSON(obj);
        expect(geoLine_LineString).not.toBeNull();
        expect(geoLine_LineString.type).toEqual("Feature");
        expect(geoLine_LineString.geometry).not.toBeNull();
        expect(geoLine_LineString.geometry.type).toEqual("LineString");
        expect(geoLine_LineString.geometry.coordinates).not.toBeNull();
        expect(geoLine_LineString.geometry.coordinates.length).toEqual(4);
        expect(geoLine_LineString.geometry.coordinates[1][0]).toEqual(4057.0600591960642);
        expect(geoLine_LineString.geometry.coordinates[1][1]).toEqual(-4381.569363260499);
    });

    it('toGeoLineEPS_MultiLineString', () => {
        var obj = {
            id: 1,
            parts: [4, 4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4382.939424428795,
                "x": 4076.2655245045335
            },
            {
                "y": -4382.333381109672,
                "x": 4215.049444583775
            },
            {
                "y": -4382.389670274902,
                "x": 4247.756955878764
            },
            {
                "y": -4382.285032149534,
                "x": 4428.153084011883
            },
            {
                "y": -4383.017499027105,
                "x": 4647.579232906979
            }
            ],
            type: GeometryType.LINEEPS
        };
        var geoLine_MultiLineString = new GeoJSON().toGeoJSON(obj);
        expect(geoLine_MultiLineString).not.toBeNull();
        expect(geoLine_MultiLineString.type).toEqual("Feature");
        expect(geoLine_MultiLineString.geometry).not.toBeNull();
        expect(geoLine_MultiLineString.geometry.type).toEqual("MultiLineString");
        expect(geoLine_MultiLineString.geometry.coordinates).not.toBeNull();
        expect(geoLine_MultiLineString.geometry.coordinates.length).toEqual(2);
        expect(geoLine_MultiLineString.geometry.coordinates[1][0][0]).toEqual(4215.049444583775);
        expect(geoLine_MultiLineString.geometry.coordinates[1][0][1]).toEqual(-4382.333381109672);
    });

    it('toGeoLinem', () => {
        var obj = {
            id: 1,
            parts: [3],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466,
                "measure": 1
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642,
                "measure": 2
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362,
                "measure": 3
            }
            ],
            type: GeometryType.LINEM
        };
        var geoLinem = new GeoJSON().toGeoJSON(obj);
        expect(geoLinem).not.toBeNull();
        expect(geoLinem.type).toEqual("Feature");
        expect(geoLinem.geometry).not.toBeNull();
        expect(geoLinem.geometry.type).toEqual("MultiLineString");
        expect(geoLinem.geometry.coordinates).not.toBeNull();
        expect(geoLinem.geometry.coordinates.length).toEqual(1);
        expect(geoLinem.geometry.coordinates[0][1][0]).toEqual(4057.0600591960642);
        expect(geoLinem.geometry.coordinates[0][1][1]).toEqual(-4381.569363260499);
        expect(geoLinem.geometry.coordinates[0][1][2]).toEqual(2);
    });

    it('toGeoRegion', () => {
        var obj = {
            id: 'test',
            parts: [4, 4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4382.939424428795,
                "x": 4076.2655245045335
            },
            {
                "y": -4382.333381109672,
                "x": 4215.049444583775
            },
            {
                "y": -4382.389670274902,
                "x": 4247.756955878764
            },
            {
                "y": -4382.285032149534,
                "x": 4428.153084011883
            },
            {
                "y": -4383.017499027105,
                "x": 4647.579232906979
            }
            ],
            type: GeometryType.REGION
        };
        var geoRegion = new GeoJSON().toGeoJSON(obj);
        expect(geoRegion).not.toBeNull();
        expect(geoRegion.type).toEqual("Feature");
        expect(geoRegion.geometry).not.toBeNull();
        expect(geoRegion.geometry.type).toEqual("MultiPolygon");
        expect(geoRegion.geometry.coordinates).not.toBeNull();
        expect(geoRegion.geometry.coordinates.length).toEqual(2);
        //转换时经过排序面积排序 所以第一个要素的第2个坐标变成了第二的要素的第2个坐标
        expect(geoRegion.geometry.coordinates[1][0][1][0]).toEqual(4057.0600591960642);
        expect(geoRegion.geometry.coordinates[1][0][1][1]).toEqual(-4381.569363260499);
    });


    it('toGeoRegionEPS_parts =[1]', () => {
        var obj = {
            id: 'test',
            parts: [1],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            }
            ],
            type: GeometryType.REGIONEPS
        };
        var geoRegionEPS = new GeoJSON().toGeoJSON(obj);
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS.type).toEqual("Feature");
        expect(geoRegionEPS.geometry).not.toBeNull();
        expect(geoRegionEPS.geometry.type).toEqual("MultiPolygon");
        expect(geoRegionEPS.geometry.coordinates).not.toBeNull();
        expect(geoRegionEPS.geometry.coordinates.length).toEqual(1);
        expect(geoRegionEPS.geometry.coordinates[0][0][1][0]).toEqual(4057.0600591960642);
        expect(geoRegionEPS.geometry.coordinates[0][0][1][1]).toEqual(-4381.569363260499);
    });

    it('toGeoRegionEPS_parts = [4, 4]', () => {
        var obj = {
            id: 'test',
            parts: [4, 4],
            points: [{
                "y": -4377.027184298267,
                "x": 4020.0045221720466
            },
            {
                "y": -4381.569363260499,
                "x": 4057.0600591960642
            },
            {
                "y": -4382.60877717323,
                "x": 4064.595810063362
            },
            {
                "y": -4382.939424428795,
                "x": 4076.2655245045335
            },
            {
                "y": -4382.333381109672,
                "x": 4215.049444583775
            },
            {
                "y": -4382.389670274902,
                "x": 4247.756955878764
            },
            {
                "y": -4382.285032149534,
                "x": 4428.153084011883
            },
            {
                "y": -4383.017499027105,
                "x": 4647.579232906979
            }
            ],
            type: GeometryType.REGIONEPS
        };
        var geoRegionEPS = new GeoJSON().toGeoJSON(obj);
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS.type).toEqual("Feature");
        expect(geoRegionEPS.geometry).not.toBeNull();
        expect(geoRegionEPS.geometry.type).toEqual("MultiPolygon");
        expect(geoRegionEPS.geometry.coordinates).not.toBeNull();
        expect(geoRegionEPS.geometry.coordinates.length).toEqual(2);
        expect(geoRegionEPS.geometry.coordinates[1][0][1][0]).toEqual(4057.0600591960642);
        expect(geoRegionEPS.geometry.coordinates[1][0][1][1]).toEqual(-4381.569363260499);
    });

    it('fromGeoJson_MultiPolygon', () => {
        var json = {
            "type": "Feature",
            "properties": { "SMID": "1" },
            "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                    [
                        [
                            [
                                4215.04944458377,
                                -4382.33338110967
                            ],
                            [
                                4247.75695587876,
                                -4382.3896702749
                            ],
                            [
                                4428.15308401188,
                                -4382.28503214953
                            ],
                            [
                                4647.57923290698,
                                -4383.01749902711
                            ],
                            [
                                4215.04944458377,
                                -4382.33338110967
                            ],
                            [
                                -4382.389670274902,
                                4247.756955878764
                            ],
                            [
                                -4382.285032149534,
                                4428.153084011883
                            ],
                            [
                                -4383.017499027105,
                                4647.579232906979
                            ]
                        ]
                    ]
                ]
            }
        }
        var geoRegionEPS = new GeoJSON().fromGeoJSON(json, "Feature", new function () { });
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS.fieldNames[0]).toEqual("SMID");
        expect(geoRegionEPS.fieldValues[0]).toEqual("1");
        expect(geoRegionEPS.geometry.type).toEqual("REGION");
        expect(geoRegionEPS.geometry.points[0].x).toEqual(4215.04944458377);
        expect(geoRegionEPS.geometry.points[0].y).toEqual(-4382.33338110967);
    });

    it('fromGeoJson_FeatureCollection_Attribute', () => {
        var features = {
            "type": "FeatureCollection",
            "features": [{
                "geometry": {
                    "type": "Point",
                    "coordinates": [117.399930020897631, 40.0590434404585]
                },
                "id": 1,
                "properties": {
                    "SMID": "1",
                    "SMX": "117.39993002089763",
                    "SMY": "40.0590434404585",
                    "SMLIBTILEID": "1",
                    "SMUSERID": "21"
                },
                "type": "Feature"
            }]
        };
        var geoRegionEPS = new GeoJSON().fromGeoJSON(features, "FeatureCollection", new function () { });
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS[0].fieldNames.length).toEqual(5);
        expect(geoRegionEPS[0].fieldNames[0]).toEqual("SMID");
        expect(geoRegionEPS[0].fieldValues.length).toEqual(5);
        expect(geoRegionEPS[0].fieldValues[0]).toEqual("1");
        expect(geoRegionEPS[0].geometry.type).toEqual("POINT");
        expect(geoRegionEPS[0].geometry.points[0].x).toEqual(117.39993002089763);
        expect(geoRegionEPS[0].geometry.points[0].y).toEqual(40.0590434404585);
    });

    it('toGeoJson_Feature_Attribute', () => {
        var obj = {
            fieldValues: [
                "127",
                "利伯维尔"
            ],
            fieldNames: [
                "SMID",
                "CAPITAL"
            ],
            geometry: {
                id: 1,
                parts: [1],
                points: [{
                    "y": -4377.027184298267,
                    "x": 4020.0045221720466
                }],
                type: GeometryType.POINT
            }
        };

        var geoRegionEPS = new GeoJSON().toGeoJSON(obj);
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS.type).toEqual("Feature");
        expect(geoRegionEPS.geometry).not.toBeNull();
        expect(geoRegionEPS.geometry.type).toEqual("Point");
        expect(geoRegionEPS.geometry.coordinates).not.toBeNull();
        expect(geoRegionEPS.geometry.coordinates[0]).toEqual(4020.0045221720466);
        expect(geoRegionEPS.geometry.coordinates[1]).toEqual(-4377.027184298267);
    });
});