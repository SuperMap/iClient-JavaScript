import {nonEarthCRS} from '../../../src/leaflet/core/NonEarthCRS';
import {nonProjection} from '../../../src/leaflet/core/NonEarthCRS';

describe('leaflet_NonEarthCRS', () => {
    it('initialize', () => {
        var bounds = L.bounds([-180, -90], [180, 90]);
        var nonProjectionObject = nonProjection(bounds);
        expect(nonProjectionObject).not.toBeNull();
        expect(nonProjectionObject.bounds).not.toBeNull();
        expect(nonProjectionObject.bounds.max.x).toEqual(180);
        expect(nonProjectionObject.bounds.max.y).toEqual(90);
        expect(nonProjectionObject.bounds.min.x).toEqual(-180);
        expect(nonProjectionObject.bounds.min.y).toEqual(-90);
    });

    it('project, unproject', () => {
        var bounds = L.bounds([-180, -90], [180, 90]);
        var latlng = L.latLng(50.5, 30.5);
        var nonProjectionObject = nonProjection(bounds);
        var point = nonProjectionObject.project(latlng);
        expect(point).not.toBeNull();
        expect(point.x).toEqual(30.5);
        expect(point.y).toEqual(50.5);
        var newLatlng = nonProjectionObject.unproject(point);
        expect(newLatlng).not.toBeNull();
        expect(newLatlng.lat).toEqual(50.5);
        expect(newLatlng.lng).toEqual(30.5);
    });

    it('CRS_initialize', () => {
        var options = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [1000, 100000]
        };
        var nonEarthCRSObject = nonEarthCRS(options);
        expect(nonEarthCRSObject).not.toBeNull();
        expect(nonEarthCRSObject.bounds).not.toBeNull();
        expect(nonEarthCRSObject.origin).toEqual(options.origin);
        expect(nonEarthCRSObject.projection.bounds).toEqual(nonEarthCRSObject.bounds);
        expect(nonEarthCRSObject.resolutions[0]).toEqual(1000);
        expect(nonEarthCRSObject.resolutions[1]).toEqual(100000);
        expect(nonEarthCRSObject.transformation).not.toBeNull();
        expect(nonEarthCRSObject._initHooksCalled).toBeTruthy();
    });

    it('CRS_scale', () => {
        var options = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [100, 100000]
        };
        var nonEarthCRSObject = nonEarthCRS(options);
        var scale1 = nonEarthCRSObject.scale(0);
        expect(scale1).toEqual(0.01);
        nonEarthCRSObject.resolutions = [];
        var scale2 = nonEarthCRSObject.scale(1);
        expect(scale2).not.toBeNaN();
    });

    it('CRS_zoom', () => {
        var options1 = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [100, 100000]
        };
        var nonEarthCRS1 = nonEarthCRS(options1);
        var bound1 = nonEarthCRS1.zoom(0.1);
        expect(bound1).toEqual(-1);

        //此处待开发修改后打开
        // var options2 = {
        //     origin: {x: 30, y: 50},
        //     bounds: L.bounds([-180, -90], [180, 90]),
        //     resolutions: [100, 100000]
        // };
        // var nonEarthCRS2 = nonEarthCRS(options2);
        // var bound2 = nonEarthCRS2.zoom(0.01);
        // expect(bound2).toEqual(0);

        var options3 = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-128, -90], [128, 90]),
        };
        var nonEarthCRS3 = nonEarthCRS(options3);
        var bound3 = nonEarthCRS3.zoom(10);
        expect(bound3).toEqual(10);
    });

    it('CRS_distance', () => {
        var latlng1 = L.latLng(50.5, 30.5);
        var latlng2 = L.latLng(40, 60.5);
        var options = {
            origin: {x: 30, y: 50},
            bounds: L.bounds([-180, -90], [180, 90]),
            resolutions: [100, 100000]
        };
        var nonEarthCRSObject = nonEarthCRS(options);
        var distance = nonEarthCRSObject.distance(latlng1, latlng2);
        expect(distance).not.toBeNaN();
    });
});