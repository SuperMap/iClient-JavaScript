import {WKT} from '../../../src/common/format/WKT';

describe('WKT', () => {
    //point的read、write方法
    it('read, write_point', () => {
        var wkt = new WKT({keepData: true});
        var data = "POINT(6 10)";
        var feature = wkt.read(data);
        expect(feature).not.toBeNull();
        expect(feature.CLASS_NAME).toEqual("SuperMap.Feature.Vector");
        expect(feature.id).toContain("SuperMap.Feature");
        expect(feature.geometry.id).toContain("SuperMap.Geometry");
        expect(feature.geometry.type).toEqual("Point");
        expect(feature.geometry.x).toEqual(6);
        expect(feature.geometry.y).toEqual(10);
        var pointWkt = wkt.write(feature);
        expect(pointWkt).toEqual("POINT(6 10)");
    });

    //multipoint的read、write方法
    it('read, write_multipoint的read', () => {
        var wkt = new WKT({keepData: true});
        var data = "MULTIPOINT((3.5 5.6),(4.8 10.5))";
        var feature = wkt.read(data);
        expect(feature).not.toBeNull();
        expect(feature.geometry.componentTypes.length).toEqual(1);
        expect(feature.geometry.componentTypes[0]).toEqual("SuperMap.Geometry.Point");
        expect(feature.geometry.components.length).toEqual(2);
        expect(feature.geometry.components[0].type).toEqual("Point");
        expect(feature.geometry.components[0].x).toEqual(3.5);
        expect(feature.geometry.components[0].y).toEqual(5.6);
        expect(feature.geometry.components[1].type).toEqual("Point");
        expect(feature.geometry.components[1].x).toEqual(4.8);
        expect(feature.geometry.components[1].y).toEqual(10.5);
        var newWkt = wkt.write(feature);
        expect(newWkt).toEqual("MULTIPOINT((3.5 5.6),(4.8 10.5))");
    });

    //multilinestring 的read、write方法
    it('read, write_multilinestring', () => {
        var wkt = new WKT({keepData: true});
        var data = "MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))";
        var feature = wkt.read(data);
        expect(feature).not.toBeNull();
        expect(feature.id).not.toBeNull();
        expect(feature.geometry.CLASS_NAME).toEqual("SuperMap.Geometry.MultiLineString");
        expect(feature.geometry.componentTypes[0]).toEqual("SuperMap.Geometry.LineString");
        expect(feature.geometry.components[0].components.length).toEqual(3);
        for (var i = 0; i < feature.geometry.components[0].components.length; i++) {
            expect(feature.geometry.components[0].components[i].type).toEqual("Point");
        }
        expect(feature.geometry.components[0].components[0].x).toEqual(3);
        expect(feature.geometry.components[0].components[0].y).toEqual(4);
        expect(feature.geometry.components[0].components[1].x).toEqual(10);
        expect(feature.geometry.components[0].components[1].y).toEqual(50);
        expect(feature.geometry.components[0].components[2].x).toEqual(20);
        expect(feature.geometry.components[0].components[2].y).toEqual(25);
        var newWkt = wkt.write(feature);
        expect(newWkt).toEqual("MULTILINESTRING((3 4,10 50,20 25),(-5 -8,-10 -8,-15 -4))");
    });

    //polygon 的read、write方法
    it('read, write_polygon', () => {
        var wkt = new WKT({keepData: true});
        var data = "POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))";
        var feature = wkt.read(data);
        expect(feature).not.toBeNull();
        expect(feature.id).not.toBeNull();
        expect(feature.geometry.componentTypes[0]).toEqual("SuperMap.Geometry.LinearRing");
        expect(feature.geometry.components.length).toEqual(2);
        for (var i = 0; i < feature.geometry.components.length; i++) {
            expect(feature.geometry.components[i].components.length).toEqual(5);
            for (var j = 0; j < 5; j++) {
                expect(feature.geometry.components[i].components[j].type).toEqual("Point");
            }
        }
        var newWkt = wkt.write(feature);
        expect(newWkt).toEqual("POLYGON((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2))");
    });

    //multipolygon 的read、write方法
    it('read, write_multipolygon', () => {
        var wkt = new WKT({keepData: true});
        var data = "MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2)),((6 3,9 2,9 4,6 3)))";
        var feature = wkt.read(data);
        expect(feature).not.toBeNull();
        expect(feature.id).not.toBeNull();
        expect(feature.geometry.componentTypes[0]).toEqual("SuperMap.Geometry.Polygon");
        expect(feature.geometry.components.length).toEqual(2);
        expect(feature.geometry.components[0].components.length).toEqual(2);
        for (var i = 0; i < 2; i++) {
            expect(feature.geometry.components[0].components[i].CLASS_NAME).toEqual("SuperMap.Geometry.LinearRing");
            var pointComponents = feature.geometry.components[0].components[i].components;
            expect(pointComponents.length).toEqual(5);
            for (var j = 0; j < pointComponents.length; j++) {
                expect(pointComponents[i].type).toEqual("Point");
            }
        }
        var newWkt = wkt.write(feature);
        expect(newWkt).toEqual("MULTIPOLYGON(((1 1,5 1,5 5,1 5,1 1),(2 2,2 3,3 3,3 2,2 2)),((6 3,9 2,9 4,6 3)))");
    });

    //geometrycollection的read、write方法
    it('read, write_geometrycollection', () => {
        var wkt = new WKT({keepData: true});
        var data = "GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))";
        var feature = wkt.read(data);
        expect(feature).not.toBeNull();
        expect(feature.length).toEqual(2);
        expect(feature[0].id).toContain("SuperMap.Feature");
        expect(feature[0].geometry.id).toContain("SuperMap.Geometry");
        expect(feature[0].geometry.type).toEqual("Point");
        expect(feature[0].geometry.x).toEqual(4);
        expect(feature[0].geometry.y).toEqual(6);
        expect(feature[1].id).toContain("SuperMap.Feature");
        expect(feature[1].geometry.id).toContain("SuperMap.Geometry");
        expect(feature[1].geometry.componentTypes[0]).toEqual("SuperMap.Geometry.Point");
        expect(feature[1].geometry.componentTypes[1]).toEqual("SuperMap.PointWithMeasure");
        expect(feature[1].geometry.components.length).toEqual(2);
        expect(feature[1].geometry.components[0].type).toEqual("Point");
        expect(feature[1].geometry.components[0].x).toEqual(4);
        expect(feature[1].geometry.components[0].y).toEqual(6);
        expect(feature[1].geometry.components[1].type).toEqual("Point");
        expect(feature[1].geometry.components[1].x).toEqual(7);
        expect(feature[1].geometry.components[1].y).toEqual(10);
        var newWkt = wkt.write(feature);
        expect(newWkt).toEqual("GEOMETRYCOLLECTION(POINT(4 6),LINESTRING(4 6,7 10))");
    });
});
