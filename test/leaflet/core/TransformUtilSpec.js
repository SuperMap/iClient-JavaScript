import {transform} from '../../../src/leaflet/core/Transform';

describe('L.Util.transform', () => {
    it("Point", () => {
        const point = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [116.41, 39.93]
                }
            }]
        };
        const point3857 = transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.features[0].geometry.coordinates[0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.features[0].geometry.coordinates[1] * 100) / 100).toEqual(39.93);
    });
    it("MultiPoint", () => {
        const point = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "MultiPoint",
                    'coordinates': [[116.41, 39.93], [114.16, 38.32], [115.12, 37.37]]
                }
            }]
        };
        const point3857 = transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.features[0].geometry.coordinates[0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.features[0].geometry.coordinates[0][1] * 100) / 100).toEqual(39.93);
    });
    it("LineString", () => {
        const lineString = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "LineString",
                    'coordinates': [[116.41, 39.93], [114.16, 38.32], [115.12, 37.37]]
                }
            }]
        };
        const lineString3857 = transform(lineString, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const lineString4326 = transform(lineString3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(lineString4326.features[0].geometry.coordinates[0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(lineString4326.features[0].geometry.coordinates[0][1] * 100) / 100).toEqual(39.93);
    });
    it("MultiLineString", () => {
        const lineString = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "MultiLineString",
                    'coordinates': [[[116.41, 39.93], [114.16, 38.32]], [[115.12, 37.37], [102.12, 35.26]]]
                }
            }]
        };
        const lineString3857 = transform(lineString, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const lineString4326 = transform(lineString3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(lineString4326.features[0].geometry.coordinates[0][0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(lineString4326.features[0].geometry.coordinates[0][0][1] * 100) / 100).toEqual(39.93);
        expect(Math.round(lineString4326.features[0].geometry.coordinates[1][0][0] * 100) / 100).toEqual(115.12);
        expect(Math.round(lineString4326.features[0].geometry.coordinates[1][0][1] * 100) / 100).toEqual(37.37);
    });
    it("Polygon", () => {
        const polygon = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "Polygon",
                    'coordinates': [[[116.41, 39.93], [114.16, 38.32], [115.12, 37.37]]]
                }
            }]
        };
        const polygon3857 = transform(polygon, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const polygon4326 = transform(polygon3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(polygon4326.features[0].geometry.coordinates[0][0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(polygon4326.features[0].geometry.coordinates[0][0][1] * 100) / 100).toEqual(39.93);
    });
    it("MultiPolygon", () => {
        const polygon = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "MultiPolygon",
                    'coordinates': [[[[116.41, 39.93], [114.16, 38.32]], [[115.12, 37.37], [102.12, 35.26]]],
                        [[[106.41, 39.11], [114.16, 38.32]], [[115.12, 37.37], [102.12, 35.26]]]
                    ]
                }
            }]
        };
        const polygon3857 = transform(polygon, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const polygon4326 = transform(polygon3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(polygon4326.features[0].geometry.coordinates[0][0][0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(polygon4326.features[0].geometry.coordinates[0][0][0][1] * 100) / 100).toEqual(39.93);
        expect(Math.round(polygon4326.features[0].geometry.coordinates[1][0][0][0] * 100) / 100).toEqual(106.41);
        expect(Math.round(polygon4326.features[0].geometry.coordinates[1][0][0][1] * 100) / 100).toEqual(39.11);
    });
    it("L.circle", () => {
        const point = L.circle([39.93, 116.41]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.geometry.coordinates[1] * 100) / 100).toEqual(39.93);
    });
    it("L.marker", () => {
        const point = L.marker([39.93, 116.41]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.geometry.coordinates[1] * 100) / 100).toEqual(39.93);
    });
    it("L.circleMarker", () => {
        const point = L.circleMarker([39.93, 116.41]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.geometry.coordinates[1] * 100) / 100).toEqual(39.93);
    });
    it("L.polyline", () => {
        const point = L.polyline([[39.93, 116.41], [38.32, 114.16], [37.37, 115.12]]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.geometry.coordinates[0][1] * 100) / 100).toEqual(39.93);

    });
    it("L.polygon", () => {
        const point = L.polygon([[[39.93, 116.41], [38.32, 114.16], [37.37, 115.12]]]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0][0][0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.geometry.coordinates[0][0][1] * 100) / 100).toEqual(39.93);
    });
    it("L.rectangle", () => {
        const point = L.rectangle([[39.93, 116.41], [38.32, 114.16]]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0][0][0] * 100) / 100).toEqual(114.16);
        expect(Math.round(point4326.geometry.coordinates[0][0][1] * 100) / 100).toEqual(38.32);
    });
    it("L.bounds", () => {
        const point = L.bounds([[39.93, 116.41], [38.32, 114.16]]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0][0][0] * 100) / 100).toEqual(114.16);
        expect(Math.round(point4326.geometry.coordinates[0][0][1] * 100) / 100).toEqual(38.32);
    });
    it("L.LatLngBounds", () => {
        const point = L.latLngBounds([[39.93, 116.41], [38.32, 114.16]]);
        const point3857 = L.Util.transform(point, L.CRS.EPSG4326, L.CRS.EPSG3857);
        const point4326 = L.Util.transform(point3857, L.CRS.EPSG3857, L.CRS.EPSG4326);
        expect(Math.round(point4326.geometry.coordinates[0][0][0] * 100) / 100).toEqual(114.16);
        expect(Math.round(point4326.geometry.coordinates[0][0][1] * 100) / 100).toEqual(38.32);
    });

    //其他投影：
    it("WGS_1984 EPSG:3395", () => {
        const point = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [116.41, 39.93]
                }
            }]
        };
        const point3857 = transform(point, L.CRS.EPSG4326, L.CRS.EPSG3395);
        const point4326 = transform(point3857, L.CRS.EPSG3395, L.CRS.EPSG4326);
        expect(Math.round(point4326.features[0].geometry.coordinates[0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.features[0].geometry.coordinates[1] * 100) / 100).toEqual(39.93);
    });
    it("beijing54 EPSG:4214", () => {
        L.CRS.EPSG4214 = L.Proj.CRS("EPSG:4214", {
            bounds: [73.6600, 7.1600, 134.8500, 53.5900],
            def: "+proj=longlat +ellps=krass +no_defs"
        });
        const point = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [116.41, 39.93]
                }
            }]
        };
        const point3857 = transform(point, L.CRS.EPSG4326, L.CRS.EPSG4214);
        const point4326 = transform(point3857, L.CRS.EPSG4214, L.CRS.EPSG4326);
        expect(Math.round(point4326.features[0].geometry.coordinates[0] * 100) / 100).toEqual(116.41);
        expect(Math.round(point4326.features[0].geometry.coordinates[1] * 100) / 100).toEqual(39.93);
    });
    it("beijing54 EPSG:2412", () => {
        L.CRS.EPSG2412 = L.Proj.CRS("EPSG:2412", {
            bounds: [36341359.6189, 2020446.0409, 36658640.3811, 4705016.9869],
            def: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +ellps=krass +units=m +no_defs "
        });
        const point = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [108.00, 30.38]
                }
            }]
        };
        const point3857 = transform(point, L.CRS.EPSG4326, L.CRS.EPSG2412);
        const point4326 = transform(point3857, L.CRS.EPSG2412, L.CRS.EPSG4326);
        expect(Math.round(point4326.features[0].geometry.coordinates[0] * 100) / 100).toEqual(108.00);
        expect(Math.round(point4326.features[0].geometry.coordinates[1] * 100) / 100).toEqual(30.38);
    });
    it("beijing54 EPSG:2412 to EPSG:4326", () => {
        L.CRS.EPSG2412 = L.Proj.CRS("EPSG:2412", {
            bounds: [36341359.6189, 2020446.0409, 36658640.3811, 4705016.9869],
            def: "+proj=tmerc +lat_0=0 +lon_0=108 +k=1 +x_0=36500000 +y_0=0 +ellps=krass +units=m +no_defs "
        });
        const point = {
            'type': "FeatureCollection",
            'features': [{
                'type': "Feature",
                'geometry': {
                    'type': "Point",
                    'coordinates': [36500000.00, 3362731.51]
                }
            }]
        };
        const point3857 = transform(point, L.CRS.EPSG2412, L.CRS.EPSG4326);
        const point4326 = transform(point3857, L.CRS.EPSG4326, L.CRS.EPSG2412);
        expect(Math.round(point4326.features[0].geometry.coordinates[0] * 100) / 100).toEqual(36500000.00);
        expect(Math.round(point4326.features[0].geometry.coordinates[1] * 100) / 100).toEqual(3362731.51);
    })
});