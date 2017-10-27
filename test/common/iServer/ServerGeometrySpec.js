require('../../../src/common/iServer/ServerGeometry');
describe('ServerGeometry', function () {
    it('constructor, destroy', function () {
        var options = {
            id: 1,
            parts: [1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: SuperMap.GeometryType.POINT
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        expect(serverGeometry).not.toBeNull();
        expect(serverGeometry.CLASS_NAME).toBe("SuperMap.ServerGeometry");
        expect(serverGeometry.id).toEqual(1);
        expect(serverGeometry.parts.length).toEqual(1);
        expect(serverGeometry.points.length).toEqual(1);
        expect(serverGeometry.type).toBe("POINT");
        expect(serverGeometry.style).toBeNull();
        expect(serverGeometry.prjCoordSys).toBeNull();
        serverGeometry.destroy();
        expect(serverGeometry.id).toBeNull();
        expect(serverGeometry.parts).toBeNull();
        expect(serverGeometry.points).toBeNull();
        expect(serverGeometry.type).toBeNull();
    });

    it('toGeometry', function () {
        var options_POINT = {
            type: SuperMap.GeometryType.POINT
        };
        var serverGeometry_POINT = new SuperMap.ServerGeometry(options_POINT);
        var toGeometry_POINT = serverGeometry_POINT.toGeometry();
        expect(toGeometry_POINT).toBeNull();
        serverGeometry_POINT.destroy();
        var options_LINE = {
            type: SuperMap.GeometryType.LINE
        };
        var serverGeometry_LINE = new SuperMap.ServerGeometry(options_LINE);
        var toGeometry_LINE = serverGeometry_LINE.toGeometry();
        expect(toGeometry_LINE).toBeNull();
        serverGeometry_LINE.destroy();
        var options_LINEM = {
            type: SuperMap.GeometryType.LINEM
        };
        var serverGeometry_LINEM = new SuperMap.ServerGeometry(options_LINEM);
        var toGeometry_LINEM = serverGeometry_LINEM.toGeometry();
        expect(toGeometry_LINEM).not.toBeNull();
        serverGeometry_LINEM.destroy();
        var options_REGION = {
            type: SuperMap.GeometryType.REGION
        };
        var serverGeometry_REGION = new SuperMap.ServerGeometry(options_REGION);
        var toGeometry_REGION = serverGeometry_REGION.toGeometry();
        expect(toGeometry_REGION).toBeNull();
        serverGeometry_REGION.destroy();
    });

    it('toGeoPoint_Null', function () {
        var options = {
            id: 1,
            parts: [],
            points: [],
            type: SuperMap.GeometryType.POINT
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var geoPointNull = serverGeometry.toGeoPoint();
        expect(geoPointNull).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoPoint', function () {
        var options = {
            id: 1,
            parts: [1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: SuperMap.GeometryType.POINT
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var toGeoPoint = serverGeometry.toGeoPoint();
        expect(toGeoPoint).not.toBeNull();
        expect(toGeoPoint.CLASS_NAME).toBe("SuperMap.Geometry.Point");
        expect(toGeoPoint.id).toContain("SuperMap.Geometry_");
        expect(toGeoPoint.x).toEqual(4020.0045221720466);
        expect(toGeoPoint.y).toEqual(-4377.027184298267);
        serverGeometry.destroy();
    });

    it('toGeoPoint_MultiPoint', function () {
        var options = {
            id: 1,
            parts: [1, 1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642}],
            type: SuperMap.GeometryType.POINT
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var toGeoPointMulti = serverGeometry.toGeoPoint();
        expect(toGeoPointMulti).not.toBeNull();
        expect(toGeoPointMulti.CLASS_NAME).toBe("SuperMap.Geometry.MultiPoint");
        expect(toGeoPointMulti.id).toContain("SuperMap.Geometry_");
        var components = toGeoPointMulti.components;
        expect(components.length).toEqual(2);
        expect(components[0].CLASS_NAME).toBe("SuperMap.Geometry.Point");
        expect(components[0].id).toContain("SuperMap.Geometry_");
        expect(components[0].x).toEqual(4020.0045221720466);
        expect(components[0].y).toEqual(-4377.027184298267);
        expect(components[1].CLASS_NAME).toBe("SuperMap.Geometry.Point");
        expect(components[1].id).toContain("SuperMap.Geometry_");
        expect(components[1].x).toEqual(4057.0600591960642);
        expect(components[1].y).toEqual(-4381.569363260499);
        serverGeometry.destroy();
    });

    it('toGeoLine_Null', function () {
        var serverGeometry = new SuperMap.ServerGeometry({parts: []});
        var geoLine_Null = serverGeometry.toGeoLine();
        expect(geoLine_Null).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoLine_LineRing', function () {
        var options = {
            id: 1,
            parts: [4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: SuperMap.GeometryType.LINE
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var geoLine_LineRing = serverGeometry.toGeoLine();
        expect(geoLine_LineRing).not.toBeNull();
        expect(geoLine_LineRing.CLASS_NAME).toBe("SuperMap.Geometry.LinearRing");
        expect(geoLine_LineRing.id).toContain("SuperMap.Geometry_");
        var components = geoLine_LineRing.components;
        expect(components.length).toEqual(4);
        for (var i = 0; i < components.length; i++) {
            expect(components[i].CLASS_NAME).toBe("SuperMap.Geometry.Point");
            expect(components[i].id).toContain("SuperMap.Geometry_");
        }
        expect(components[0].x).toEqual(4020.0045221720466);
        expect(components[0].y).toEqual(-4377.027184298267);
        expect(components[1].x).toEqual(4057.0600591960642);
        expect(components[1].y).toEqual(-4381.569363260499);
        expect(components[2].x).toEqual(4064.595810063362);
        expect(components[2].y).toEqual(-4382.60877717323);
        expect(components[3].x).toEqual(4020.0045221720466);
        expect(components[3].y).toEqual(-4377.027184298267);
        serverGeometry.destroy();
    });

    it('toGeoLine_LineString', function () {
        var options = {
            id: 1,
            parts: [4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4382.939424428795, "x": 4076.2655245045335}],
            type: SuperMap.GeometryType.LINE
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var geoLine_LineString = serverGeometry.toGeoLine();
        expect(geoLine_LineString).not.toBeNull();
        expect(geoLine_LineString.CLASS_NAME).toBe("SuperMap.Geometry.LineString");
        expect(geoLine_LineString.id).toContain("SuperMap.Geometry_");
        var components = geoLine_LineString.components;
        expect(components.length).toEqual(4);
        for (var i = 0; i < components.length; i++) {
            expect(components[i].CLASS_NAME).toBe("SuperMap.Geometry.Point");
            expect(components[i].id).toContain("SuperMap.Geometry_");
        }
        expect(components[0].x).toEqual(4020.0045221720466);
        expect(components[0].y).toEqual(-4377.027184298267);
        expect(components[1].x).toEqual(4057.0600591960642);
        expect(components[1].y).toEqual(-4381.569363260499);
        expect(components[2].x).toEqual(4064.595810063362);
        expect(components[2].y).toEqual(-4382.60877717323);
        expect(components[3].x).toEqual(4076.2655245045335);
        expect(components[3].y).toEqual(-4382.939424428795);
        serverGeometry.destroy();
    });

    it('toGeoLine_MultiLineString', function () {
        var options = {
            id: 1,
            parts: [4, 4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4382.939424428795, "x": 4076.2655245045335},
                {"y": -4382.333381109672, "x": 4215.049444583775},
                {"y": -4382.389670274902, "x": 4247.756955878764},
                {"y": -4382.285032149534, "x": 4428.153084011883},
                {"y": -4383.017499027105, "x": 4647.579232906979}],
            type: SuperMap.GeometryType.LINE
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var geoLine_MultiLineString = serverGeometry.toGeoLine();
        expect(geoLine_MultiLineString).not.toBeNull();
        expect(geoLine_MultiLineString.CLASS_NAME).toBe("SuperMap.Geometry.MultiLineString");
        expect(geoLine_MultiLineString.id).toContain("SuperMap.Geometry_");
        var components1 = geoLine_MultiLineString.components;
        expect(components1.length).toEqual(2);
        for (var i = 0; i < components1.length; i++) {
            expect(components1[i].CLASS_NAME).toBe("SuperMap.Geometry.LineString");
            expect(components1[i].id).toContain("SuperMap.Geometry_");
            expect(components1[i].components.length).toEqual(4);
            for (var j = 0; j < components1[i].components.length; j++) {
                expect(components1[i].components[j].CLASS_NAME).toBe("SuperMap.Geometry.Point");
                expect(components1[i].components[j].id).toContain("SuperMap.Geometry_");
            }
        }
        serverGeometry.destroy();
    });

    it('toGeoLineEPS_Null', function () {
        var serverGeometry = new SuperMap.ServerGeometry({parts: []});
        var geoLineEPS_Null = serverGeometry.toGeoLineEPS();
        expect(geoLineEPS_Null).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoLinem', function () {
        var options = {
            id: 1,
            parts: [3],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362}],
            type: SuperMap.GeometryType.LINEM
        };
        var serverGeometry = new SuperMap.ServerGeometry(options);
        var geoLinem = serverGeometry.toGeoLinem();
        expect(geoLinem).not.toBeNull();
        expect(geoLinem.CLASS_NAME).toBe("SuperMap.Route");
        expect(geoLinem.id).toEqual(1);
        expect(geoLinem.type).toBe("LINEM");
        expect(geoLinem.components.length).toEqual(1);
        expect(geoLinem.components[0].CLASS_NAME).toBe("SuperMap.Geometry.LineString");
        expect(geoLinem.components[0].components.length).toEqual(3);
        serverGeometry.destroy();
    });
});
