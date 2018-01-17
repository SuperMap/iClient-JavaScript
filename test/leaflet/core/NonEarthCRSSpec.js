require('../../../src/leaflet/core/NonEarthCRS');

describe('leaflet_NonEarthCRS', function () {
    it('initialize', function () {
        var bounds = L.bounds([-180, -90], [180, 90]);
        var nonProjection = L.Projection.NonProjection(bounds);
        expect(nonProjection).not.toBeNull();
        expect(nonProjection.bounds).not.toBeNull();
        expect(nonProjection.bounds.max.x).toEqual(180);
        expect(nonProjection.bounds.max.y).toEqual(90);
        expect(nonProjection.bounds.min.x).toEqual(-180);
        expect(nonProjection.bounds.min.y).toEqual(-90);
    });

    it('project, unproject', function () {
        var bounds = L.bounds([-180, -90], [180, 90]);
        var latlng = L.latLng(50.5, 30.5);
        var nonProjection = L.Projection.NonProjection(bounds);
        var point = nonProjection.project(latlng);
        expect(point).not.toBeNull();
        expect(point.x).toEqual(30.5);
        expect(point.y).toEqual(50.5);
        var newLatlng = nonProjection.unproject(point);
        expect(newLatlng).not.toBeNull();
        expect(newLatlng.lat).toEqual(50.5);
        expect(newLatlng.lng).toEqual(30.5);
    });

    it('CRS_initialize', function () {
        var options = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [1000, 100000]
        };
        var nonEarthCRS = L.CRS.NonEarthCRS(options);
        expect(nonEarthCRS).not.toBeNull();
        expect(nonEarthCRS.bounds).not.toBeNull();
        expect(nonEarthCRS.origin).toEqual(options.origin);
        expect(nonEarthCRS.projection.bounds).toEqual(nonEarthCRS.bounds);
        expect(nonEarthCRS.resolutions[0]).toEqual(1000);
        expect(nonEarthCRS.resolutions[1]).toEqual(100000);
        expect(nonEarthCRS.transformation).not.toBeNull();
        expect(nonEarthCRS._initHooksCalled).toBeTruthy();
    });

    it('CRS_scale', function () {
        var options = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [100, 100000]
        };
        var nonEarthCRS = L.CRS.NonEarthCRS(options);
        var scale1 = nonEarthCRS.scale(0);
        expect(scale1).toEqual(0.01);
        nonEarthCRS.resolutions = [];
        var scale2 = nonEarthCRS.scale(1);
        expect(scale2).not.toBeNaN();
    });

    it('CRS_zoom', function () {
        var options1 = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [100, 100000]
        };
        var nonEarthCRS1 = L.CRS.NonEarthCRS(options1);
        var bound1 = nonEarthCRS1.zoom(0.1);
        expect(bound1).toEqual(-1);

        //此处待开发修改后打开
        // var options2 = {
        //     origin: {x: 30, y: 50},
        //     bounds: L.bounds([-180, -90], [180, 90]),
        //     resolutions: [100, 100000]
        // };
        // var nonEarthCRS2 = L.CRS.NonEarthCRS(options2);
        // var bound2 = nonEarthCRS2.zoom(0.01);
        // expect(bound2).toEqual(0);

        var options3 = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-128, -90], [128, 90]),
        };
        var nonEarthCRS3 = L.CRS.NonEarthCRS(options3);
        var bound3 = nonEarthCRS3.zoom(10);
        expect(bound3).toEqual(10);
    });

    it('CRS_distance', function () {
        var latlng1 = L.latLng(50.5, 30.5);
        var latlng2 = L.latLng(40, 60.5);
        var options = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [100, 100000]
        };
        var nonEarthCRS = L.CRS.NonEarthCRS(options);
        var distance = nonEarthCRS.distance(latlng1, latlng2);
        expect(distance).not.toBeNaN();
    });
});