import {ServerGeometry} from '../../../src/common/iServer/ServerGeometry';
import {GeometryType} from '../../../src/common/REST';

describe('ServerGeometry', () => {
    it('constructor, destroy', () => {
        var options = {
            id: 1,
            parts: [1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: GeometryType.POINT
        };
        var serverGeometry = new ServerGeometry(options);
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

    it('toGeometry', () => {
        var options_POINT = {
            type: GeometryType.POINT
        };
        var serverGeometry_POINT = new ServerGeometry(options_POINT);
        var toGeometry_POINT = serverGeometry_POINT.toGeometry();
        expect(toGeometry_POINT).toBeNull();
        serverGeometry_POINT.destroy();
        var options_LINE = {
            type: GeometryType.LINE
        };
        var serverGeometry_LINE = new ServerGeometry(options_LINE);
        var toGeometry_LINE = serverGeometry_LINE.toGeometry();
        expect(toGeometry_LINE).toBeNull();
        serverGeometry_LINE.destroy();
        var options_LINEM = {
            type: GeometryType.LINEM
        };
        var serverGeometry_LINEM = new ServerGeometry(options_LINEM);
        var toGeometry_LINEM = serverGeometry_LINEM.toGeometry();
        expect(toGeometry_LINEM).not.toBeNull();
        serverGeometry_LINEM.destroy();
        var options_REGION = {
            type: GeometryType.REGION
        };
        var serverGeometry_REGION = new ServerGeometry(options_REGION);
        var toGeometry_REGION = serverGeometry_REGION.toGeometry();
        expect(toGeometry_REGION).toBeNull();
        serverGeometry_REGION.destroy();
    });

    it('toGeoPoint_Null', () => {
        var options = {
            id: 1,
            parts: [],
            points: [],
            type: GeometryType.POINT
        };
        var serverGeometry = new ServerGeometry(options);
        var geoPointNull = serverGeometry.toGeoPoint();
        expect(geoPointNull).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoPoint', () => {
        var options = {
            id: 1,
            parts: [1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: GeometryType.POINT
        };
        var serverGeometry = new ServerGeometry(options);
        var toGeoPoint = serverGeometry.toGeoPoint();
        expect(toGeoPoint).not.toBeNull();
        expect(toGeoPoint.CLASS_NAME).toBe("SuperMap.Geometry.Point");
        expect(toGeoPoint.id).toContain("SuperMap.Geometry_");
        expect(toGeoPoint.x).toEqual(4020.0045221720466);
        expect(toGeoPoint.y).toEqual(-4377.027184298267);
        serverGeometry.destroy();
    });

    it('toGeoPoint_MultiPoint', () => {
        var options = {
            id: 1,
            parts: [1, 1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642}],
            type: GeometryType.POINT
        };
        var serverGeometry = new ServerGeometry(options);
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

    it('toGeoLine_Null', () => {
        var serverGeometry = new ServerGeometry({parts: []});
        var geoLine_Null = serverGeometry.toGeoLine();
        expect(geoLine_Null).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoLine_LineRing', () => {
        var options = {
            id: 1,
            parts: [4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
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

    it('toGeoLine_LineString', () => {
        var options = {
            id: 1,
            parts: [4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4382.939424428795, "x": 4076.2655245045335}],
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
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

    it('toGeoLine_MultiLineString', () => {
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
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
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

    it('toGeoLineEPS_Null', () => {
        var serverGeometry = new ServerGeometry({parts: []});
        var geoLineEPS_Null = serverGeometry.toGeoLineEPS();
        expect(geoLineEPS_Null).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoLineEPS_LinearRing', () => {
        var options = {
            id: 1,
            parts: [4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4377.027184298267, "x": 4020.0045221720466}],
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
        var toGeoLineEPS_LinearRing = serverGeometry.toGeoLineEPS();
        expect(toGeoLineEPS_LinearRing).not.toBeNull();
        expect(toGeoLineEPS_LinearRing.CLASS_NAME).toEqual("SuperMap.Geometry.LinearRing");
        expect(toGeoLineEPS_LinearRing.id).toContain("SuperMap.Geometry_");
        expect(toGeoLineEPS_LinearRing.componentTypes[0]).toEqual("SuperMap.Geometry.Point");
        var components = toGeoLineEPS_LinearRing.components;
        expect(components.length).toEqual(4);
        for (var i = 0; i < components.length; i++) {
            expect(components[i].CLASS_NAME).toEqual("SuperMap.Geometry.Point");
            expect(components[i].id).toContain("SuperMap.Geometry_");
            expect(components[i].type).toEqual("Point");
            expect(components[i].parent.CLASS_NAME).toEqual("SuperMap.Geometry.LinearRing");
            expect(components[i].x).not.toBeNaN();
            expect(components[i].y).not.toBeNaN();
        }
        serverGeometry.destroy();
    });

    it('toGeoLineEPS_LineString', () => {
        var options = {
            id: 1,
            parts: [4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4382.939424428795, "x": 4076.2655245045335}],
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
        var geoLine_LineString = serverGeometry.toGeoLineEPS();
        expect(geoLine_LineString).not.toBeNull();
        expect(geoLine_LineString.CLASS_NAME).toEqual("SuperMap.Geometry.LineString");
        expect(geoLine_LineString.id).toContain("SuperMap.Geometry_");
        expect(geoLine_LineString.componentTypes[0]).toEqual("SuperMap.Geometry.Point");
        expect(geoLine_LineString.componentTypes[1]).toEqual("SuperMap.PointWithMeasure");
        var components = geoLine_LineString.components;
        expect(components.length).toEqual(4);
        for (var i = 0; i < components.length; i++) {
            expect(components[i].CLASS_NAME).toEqual("SuperMap.Geometry.Point");
            expect(components[i].id).toContain("SuperMap.Geometry_");
            expect(components[i].type).toEqual("Point");
            expect(components[i].parent.CLASS_NAME).toEqual("SuperMap.Geometry.LineString");
            expect(components[i].x).not.toBeNaN();
            expect(components[i].y).not.toBeNaN();
        }
        serverGeometry.destroy();
    });

    it('toGeoLineEPS_MultiLineString', () => {
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
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
        var geoLine_MultiLineString = serverGeometry.toGeoLineEPS();
        expect(geoLine_MultiLineString).not.toBeNull();
        expect(geoLine_MultiLineString.CLASS_NAME).toEqual("SuperMap.Geometry.MultiLineString");
        expect(geoLine_MultiLineString.id).toContain("SuperMap.Geometry_");
        expect(geoLine_MultiLineString.componentTypes[0]).toEqual("SuperMap.Geometry.LineString");
        var components = geoLine_MultiLineString.components;
        expect(components.length).toEqual(2);
        for (var i = 0; i < components.length; i++) {
            expect(components[i].CLASS_NAME).toEqual("SuperMap.Geometry.LineString");
            expect(components[i].id).toContain("SuperMap.Geometry_");
            expect(components[i].componentTypes[0]).toEqual("SuperMap.Geometry.Point");
            expect(components[i].componentTypes[1]).toEqual("SuperMap.PointWithMeasure");
            expect(components[i].components.length).toEqual(4);
        }
        serverGeometry.destroy();
    });

    it('toGeoLinem', () => {
        var options = {
            id: 1,
            parts: [3],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362}],
            type: GeometryType.LINEM
        };
        var serverGeometry = new ServerGeometry(options);
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

    //将服务端的面几何对象转换为客户端几何对象。
    it('toGeoRegion', () => {
        var options = {
            id: 'test',
            parts: [4, 4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4382.939424428795, "x": 4076.2655245045335},
                {"y": -4382.333381109672, "x": 4215.049444583775},
                {"y": -4382.389670274902, "x": 4247.756955878764},
                {"y": -4382.285032149534, "x": 4428.153084011883},
                {"y": -4383.017499027105, "x": 4647.579232906979}],
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
        var geoRegion = serverGeometry.toGeoRegion();
        expect(geoRegion).not.toBeNull();
        expect(geoRegion.CLASS_NAME).toEqual("SuperMap.Geometry.MultiPolygon");
        expect(geoRegion.componentTypes[0]).toEqual("SuperMap.Geometry.Polygon");
        expect(geoRegion.components.length).toEqual(2);
        for (var i = 0; i < geoRegion.components.length; i++) {
            expect(geoRegion.components[i].CLASS_NAME).toEqual("SuperMap.Geometry.Polygon");
            var components = geoRegion.components[i].components[0].components;
            expect(components.length).toEqual(5);
            for (var j = 0; j < components.length; j++) {
                expect(components[j].type).toEqual("Point");
                expect(components[j].x).not.toBeNaN();
                expect(components[j].y).not.toBeNaN();
            }
        }
        serverGeometry.destroy();
    });

    //将服务端的面几何对象转换为客户端几何对象
    it('toGeoRegionEPS_Null', () => {
        var serverGeometry = new ServerGeometry({parts: []});
        var geoRegionEPS_Null = serverGeometry.toGeoRegionEPS();
        expect(geoRegionEPS_Null).toBeNull();
        serverGeometry.destroy();
    });

    it('toGeoRegionEPS_parts =[1]', () => {
        var options = {
            id: 'test',
            parts: [1],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362}],
        };
        var serverGeometry = new ServerGeometry(options);
        var geoRegionEPS = serverGeometry.toGeoRegionEPS();
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS.CLASS_NAME).toEqual("SuperMap.Geometry.MultiPolygon");
        expect(geoRegionEPS.componentTypes[0]).toEqual("SuperMap.Geometry.Polygon");
        expect(geoRegionEPS.components.length).toEqual(1);
        var component = geoRegionEPS.components[0].components[0];
        expect(component.CLASS_NAME).toEqual("SuperMap.Geometry.LinearRing");
        expect(component.componentTypes[0]).toEqual("SuperMap.Geometry.Point");
        var components = component.components;
        expect(components.length).toEqual(4);
        for (var i = 0; i < components.length; i++) {
            expect(components[i].type).toEqual("Point");
            expect(components[i].x).not.toBeNaN();
            expect(components[i].y).not.toBeNaN();
            expect(components[0]).toEqual(components[3]);
        }
        serverGeometry.destroy();
    });

    it('toGeoRegionEPS_parts = [4, 4]', () => {
        var options = {
            id: 'test',
            parts: [4, 4],
            points: [{"y": -4377.027184298267, "x": 4020.0045221720466},
                {"y": -4381.569363260499, "x": 4057.0600591960642},
                {"y": -4382.60877717323, "x": 4064.595810063362},
                {"y": -4382.939424428795, "x": 4076.2655245045335},
                {"y": -4382.333381109672, "x": 4215.049444583775},
                {"y": -4382.389670274902, "x": 4247.756955878764},
                {"y": -4382.285032149534, "x": 4428.153084011883},
                {"y": -4383.017499027105, "x": 4647.579232906979}],
            type: GeometryType.LINE
        };
        var serverGeometry = new ServerGeometry(options);
        var geoRegionEPS = serverGeometry.toGeoRegionEPS();
        expect(geoRegionEPS).not.toBeNull();
        expect(geoRegionEPS.CLASS_NAME).toEqual("SuperMap.Geometry.MultiPolygon");
        expect(geoRegionEPS.componentTypes[0]).toEqual("SuperMap.Geometry.Polygon");
        expect(geoRegionEPS.components.length).toEqual(2);
        for (var i = 0; i < geoRegionEPS.components.length; i++) {
            expect(geoRegionEPS.components[i].CLASS_NAME).toEqual("SuperMap.Geometry.Polygon");
            expect(geoRegionEPS.components[i].bounds).not.toBeNull();
            expect(geoRegionEPS.components[i].components[0].CLASS_NAME).toEqual("SuperMap.Geometry.LinearRing");
            var components = geoRegionEPS.components[i].components[0].components;
            expect(components.length).toEqual(5);
            for (var j = 0; j < components.length; j++) {
                expect(components[j].type).toEqual("Point");
                expect(components[j].x).not.toBeNaN();
                expect(components[j].y).not.toBeNaN();
            }
        }
        serverGeometry.destroy();
    });

    it('IsClockWise', () => {
        var points1 = [{"y": -4377.027184298267, "x": 4020.0045221720466},
            {"y": -4381.569363260499, "x": 4057.0600591960642},
            {"y": -4382.60877717323, "x": 4064.595810063362},
            {"y": -4382.939424428795, "x": 4076.2655245045335},
            {"y": -4377.027184298267, "x": 4020.0045221720466}];
        var result1 = ServerGeometry.IsClockWise(points1);
        expect(result1).toEqual(23.052148170943838);
        var points2 = [{"y": -4377.027184298267, "x": 4020.0045221720466},
            {"y": -4381.569363260499, "x": 4057.0600591960642}];
        var result2 = ServerGeometry.IsClockWise(points2);
        expect(result2).toEqual(0);
    });
});
