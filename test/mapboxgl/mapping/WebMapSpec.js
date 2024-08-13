import mapboxgl from 'mapbox-gl';
import mbglmap, { CRS } from '../../tool/mock_mapboxgl_map';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import * as MapManagerUtil from '../../../src/mapboxgl/mapping/webmap/MapManager'
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { Lang } from '@supermapgis/iclient-common/lang/Lang';
import { ArrayStatistic } from '../../../src/common/util/ArrayStatistic';
import '../../resources/WebMapV5.js';
window.jsonsql = { query: () => { } };

describe('mapboxgl_WebMap', () => {
    var originalTimeout, testDiv;
    var server = 'http://fack:8190/iportal/';
    var id = 1788054202;
    var datavizWebmap;
    beforeEach(() => {
        spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
        mapboxgl.CRS = CRS;
        
        testDiv = window.document.createElement('div');
        testDiv.setAttribute('id', 'map');
        testDiv.style.styleFloat = 'left';
        testDiv.style.marginLeft = '8px';
        testDiv.style.marginTop = '50px';
        testDiv.style.width = '500px';
        testDiv.style.height = '500px';
        window.document.body.appendChild(testDiv);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        if (datavizWebmap && datavizWebmap.map) {
            datavizWebmap.map.remove();
            datavizWebmap.map = null;
            datavizWebmap = null;
        }
        window.document.body.removeChild(testDiv);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        mapboxgl.CRS = undefined;
    });
    it('initialize_TIANDITU_VEC', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_VEC1;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
            server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
            expect(datavizWebmap.callBack).toBeUndefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            var map = datavizWebmap.map;

            expect(map).not.toBe(null);
            expect(map.getZoom()).toBeCloseTo(1, 0.001)
            var center = map.getCenter();
            expect(+center.lat.toFixed(4)).toEqual(34);
            expect(+center.lng.toFixed(4)).toEqual(110);
            expect(datavizWebmap.mapParams.title).toBe('tianditu');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('resize', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
            datavizWebmap.resize();
            expect(map.resize).toHaveBeenCalledTimes(1);
            done();
        });

    });
    it('setMapId', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        datavizWebmap = new WebMap(id, options);
        datavizWebmap.once('addlayerssucceeded', () => {
            datavizWebmap.setMapId('testID');
            expect(datavizWebmap.mapId).toEqual('testID');
            datavizWebmap.on('addlayerssucceeded', () => {
                done();
            });
        });
    });
    it('jsonsql', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            const webMapV2 = datavizWebmap._getWebMapInstance();
            webMapV2.getFilterFeatures('2020年人口数>20', [{ properties: { '2020年人口数': 30 } }]);
            webMapV2.getFilterFeatures('观测场海拔高度（米）>150', [{ properties: { '观测场海拔高度（米）': 150 } }]);
            done();
        });
    });
    it('setWebMapOptions', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        datavizWebmap = new WebMap(id, options);
        datavizWebmap.once('addlayerssucceeded', () => {
            const nextUrl = 'http://www.test.com';
            datavizWebmap.setServerUrl('http://www.test.com');
            expect(datavizWebmap.options.server).toBe(`${nextUrl}/`);
            expect(datavizWebmap.options.serverUrl).toBe(datavizWebmap.options.server);
            done();
        })
    });
    it('setMapOptions', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_VEC1;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        datavizWebmap = new WebMap(id, {
            server: server
        });
        let mapOptions = {
            center: [20, 0],
            zoom: 10,
            minZoom: 10,
            maxZoom: 12,
            isWorldCopy: true
        };
        datavizWebmap.on('addlayerssucceeded', () => {
            datavizWebmap.setCenter(mapOptions.center);
            expect(datavizWebmap.mapOptions.center).toEqual(mapOptions.center);
            datavizWebmap.setZoom(mapOptions.zoom);
            expect(datavizWebmap.mapOptions.zoom).toBe(mapOptions.zoom);
            datavizWebmap.setMinZoom(mapOptions.minZoom);
            expect(datavizWebmap.mapOptions.minZoom).toBe(mapOptions.minZoom);
            datavizWebmap.setMaxZoom(mapOptions.maxZoom);
            expect(datavizWebmap.mapOptions.maxZoom).toBe(mapOptions.maxZoom);
            datavizWebmap.setRenderWorldCopies(mapOptions.isWorldCopy);
            expect(datavizWebmap.mapOptions.renderWorldCopies).toBe(mapOptions.isWorldCopy);
            done();
        });
    });
    it('initialize_TIANDITU_IMAGE', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_IMAGE1;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });

        let options = {
            server: server
        };
        datavizWebmap = new WebMap(id, options);

        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(2, 0.001);
            expect(datavizWebmap.mapParams.title).toBe('image_tianditu');
            expect(datavizWebmap.mapParams.description).toBe('This is a image');
            done();
        })
    });

    it('initialize_TIANDITU_TER', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_TER;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.mapParams.description).toBe('tianditu_ter');
            done();
        });
    });

    it('initialize_OPENSTREET', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_OPENSTREET;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(2, 0.001);
            // expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
            expect(datavizWebmap.mapParams.title).toBe('openstreet');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('initialize_FAILD', (done) => {
        let options = {
            server: server
        };
        const errorMsg = 'test error';
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            return Promise.reject('test error');
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('getmapinfofailed', ({ error }) => {
            expect(error).toBe(errorMsg);
            expect(datavizWebmap.mapParams).toBeUndefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        });
    });

    it('initialize_CLOUD', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBe(1);
            //expect(map.getCenter()).toEqual([0, -7.081154551613622e-10]);
            expect(datavizWebmap.mapParams.title).toBe('GAOD');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('initialize_GOOGLE', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_GOOGLE;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(1, 0.001)
            //expect(map.getCenter()).toEqual([0, -7.081154551613622e-10]);
            expect(datavizWebmap.mapParams.title).toBe('google_map');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('createThemeLayer_Vector_Basis', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Theme_base;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(csvData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(7, 0.001)
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
            expect(datavizWebmap.mapParams.title).toBe('theme_base');
            expect(datavizWebmap.mapParams.description).toBe('base style');
            done();
        });
    });

    it('createThemeLayer_Vector_Basis_Line', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Theme_base_Line;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(10, 0.001)
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.39560889343755, 39.93917738600353));
            expect(datavizWebmap.mapParams.title).toBe('Line_basis');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('createThemeLayer_Vector_IMAGE', (done) => {
        let options = {
            server: server
        };

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Image;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            spyOn(datavizWebmap.map, 'loadImage').and.callFake((url, cb) => {
                let img = new Image();
                img.onload = () => {
                    isLoaded = true;
                    load.emxit(url);
                };
                img.src = url;
                cb(img);
            });
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.mapParams.title).toBe('Image');
            expect(datavizWebmap.mapParams.description).toBe('');
            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(7, 0.001);
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
            done();
        });

    });

    it('createThemeLayer_Unique', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Unique;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(xlsData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(12, 0.001);
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.32442464111327, 39.98897628932847));
            expect(datavizWebmap.mapParams.title).toBe('Unique');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });

    });

    it('createThemeLayer_Range', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Range;
                return Promise.resolve(new Response(mapJson));
            } 
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
            return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', function () {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(10, 0.001);
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.40097798513067, 39.900378604132094));
            expect(datavizWebmap.mapParams.title).toBe('RANGE_LABEL');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('createThemeLayer_Heat', (done) => {
        //插件里面i未定义报错
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Heat;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(csvData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(7, 0.001);
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(120.63222224999998, 30.389530096727963));
            expect(datavizWebmap.mapParams.title).toBe('Heat');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('createThemeLayer_Marker', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Marker;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(markerData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(2, 0.001);
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(8.437500000000002, -7.710991655433243));
            expect(datavizWebmap.mapParams.title).toBe('标注图层');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('createThemeLayer_SUPERMAP_MAP_datasource', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestMap1;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (url.indexOf('queryResults') > -1) {
                return Promise.resolve(new Response(supermapRestData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(9, 0.001);
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.46675928388, 40.15816517545865));
            expect(datavizWebmap.mapParams.title).toBe('RestMap');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('createThemeLayer_SUPERMAP_MAP', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestMap;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', function () {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(7, 0.001)
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.87260685408502, 40.11626853496025));
            expect(datavizWebmap.mapParams.title).toBe('RestMap');
            expect(datavizWebmap.mapParams.description).toBe('restMap from jingjin');
            done();
        });
    });

    it('createThemeLayer_SUPERMAPREST_DATA', (done) => {
        let options = {
            server: server
        };
        const REST_DATA_SQL_RESULT = {
            datasetInfos: [
              {
                fieldInfos: [
                  {
                    name: 'SmID',
                    caption: 'SmID',
                    type: 'INT32'
                  },
                  {
                    name: 'NAME',
                    caption: '名称',
                    type: 'WTEXT'
                  }
                ]
              }
            ],
            features: [
              {
                fieldNames: ['SMID', 'NAME'],
                geometry: {
                  center: {
                    x: 101.84004968,
                    y: 26.0859968692659
                  },
                  type: 'POINT',
                  parts: [1],
                  points: [
                    {
                      x: 101.84004968,
                      y: 26.0859968692659
                    }
                  ]
                },
                fieldValues: ['1', '四川省']
              }
            ]
          };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestData;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (
                url ===
                'http://fakeiserver/iserver/services/data-jingjin/rest/data/featureResults?returnContent=true&fromIndex=0&toIndex=100000'
            ) {
                return Promise.resolve(new Response(supermapData));
            }
            return Promise.resolve(new Response(JSON.stringify(REST_DATA_SQL_RESULT)));
        });
        var datavizWebmap = new WebMap(id, options);

        datavizWebmap.on('addlayerssucceeded', function () {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map.getZoom()).toBeCloseTo(9, 0.001)
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(116.8995771532053, 39.700527641334965));
            expect(datavizWebmap.mapParams.title).toBe('RestData');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('WMS', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMS;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve(new Response(wmsCapabilitiesTextWith130));
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var map = datavizWebmap.map;
            expect(map).not.toBe(null);
            expect(map.getZoom()).toBeCloseTo(1, 0.001)
            expect(map.getCenter()).toEqual(new mapboxgl.LngLat(0, 0));
            expect(datavizWebmap.mapParams.title).toBe('wms');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        });
    });

    it('getRangeStyleGroup', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_VEC;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(ArrayStatistic, 'getArraySegments').and.callFake(() => {
            return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
        });
        var datavizWebmap = new WebMap(id, {
            server: server
        });
        datavizWebmap.on('addlayerssucceeded', () => {
            var params =
                '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
            var features = [];
            let feature = {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [116, 39]
                },
                properties: {
                    field: 10
                }
            };
            features.push(feature);
            const webMapV2 = datavizWebmap._getWebMapInstance();
            webMapV2.getRangeStyleGroup(JSON.parse(params), features);
            expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
            done();
        });
    });

    it('dashStyle', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_VEC1;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
            server: server
        });
        let style = [
            { strokeDashstyle: 'solid' },
            { strokeDashstyle: 'dot' },
            { strokeDashstyle: 'dashdot' },
            { strokeDashstyle: 'dash' },
            { strokeDashstyle: '' },
            { strokeDashstyle: 'longdash' },
            { strokeDashstyle: 'longdashdot' }
        ];
        
        datavizWebmap.on('mapinitialized', () => {
          const webMapV2 = datavizWebmap._getWebMapInstance();
          expect(webMapV2.getDashStyle(style[0].strokeDashstyle).length).toBe(0);
          expect(webMapV2.getDashStyle(style[1].strokeDashstyle).length).toBe(2);
          expect(webMapV2.getDashStyle(style[2].strokeDashstyle).length).toBe(4);
          expect(webMapV2.getDashStyle(style[4].strokeDashstyle)).toEqual([]);
          expect(webMapV2.getDashStyle(style[3].strokeDashstyle).length).toBe(2);
          expect(webMapV2.getDashStyle(style[5].strokeDashstyle).length).toBe(2);
          expect(webMapV2.getDashStyle(style[6].strokeDashstyle).length).toBe(4);
          done();
      });
    });

    it('vector_svg', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG1;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            // spyOn(datavizWebmap, '_getCanvasFromSVG').and.callFake((svg_url, svgDiv, cb) => {
            //     let canvas = document.createElement('canvas');
            //     canvas.width = '150px';
            //     cb(canvas);
            // });
            spyOn(datavizWebmap.map, 'loadImage').and.callFake((url, cb) => {
                let img = new Image();
                img.onload = () => {
                    isLoaded = true;
                    load.emxit(url);
                };
                img.src = url;
                cb(img);
            });
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        });
    });
    it('vector_symbol', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_symbol;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        });
    });
    it('_getFiterFeatures', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_VEC1;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            const webMapV2 = datavizWebmap._getWebMapInstance();
            webMapV2.getFilterFeatures('SmID>20', geojsonData);
            let feature =
                '[{ "type" : "Feature", "properties" : { "name" : "aaaa" }, "geometry" : { "type" : "Polygon", "coordinates" : [ [[92.6806640625, 35.9957853864], [92.548828125, 29.8025179058], [99.9755859375, 33.541394669], [92.6806640625, 35.9957853864]], [[110.830078125, 34.5246614718], [103.6326255336, 36.859947123], [109.7218666539, 40.599259339], [110.830078125, 34.5246614718]] ] } } ]';
            webMapV2._handleMultyPolygon(JSON.parse(feature));
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        });
    });
    it('datavizWebMap_WMTS', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                return Promise.resolve(new Response(datavizWebMap_WMTS3));
            }
            return Promise.resolve(new Response(wmtsCapabilitiesText));
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        });
    });
    it('datavizWebMap_WMTS_Custom', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS2;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('wmts') > -1) {
                return Promise.resolve(new Response(wmtsInfoCustom));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        datavizWebmap.on('addlayerssucceeded', function () {
            setTimeout(() => {
                expect(datavizWebmap.map.getStyle().layers.length).toBe(2);
                done();
            }, 100);
        });
    });

    it('initialize_MVT', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_MVT;
                return Promise.resolve(new Response(JSON.stringify(mapJson)));
            }
            if (url.indexOf('tileFeature/vectorstyles.json') > -1) {
                var stye = {
                    version: 8,
                    sources: {
                      'raster-tiles': {
                        type: 'raster',
                        tiles: ['base/resources/img/baiduTileTest.png'],
                        tileSize: 256
                      }
                    },
                    layers: [
                      {
                        id: 'simple-tiles',
                        type: 'raster',
                        source: 'raster-tiles',
                        minzoom: 0,
                        maxzoom: 22
                      }
                    ]
                  };
                return Promise.resolve(new Response(JSON.stringify(stye)));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
            server: server
        });
        datavizWebmap.on('addlayerssucceeded', () => {
          var map = datavizWebmap.map;
          expect(map).not.toBe(null);
          setTimeout(() => {
            expect(map.getStyle().sources['raster-tiles']).not.toBe(undefined);
            done();
          }, 1000);
        });
    });
    it('createMarkerLayer_svg', (done) => {
        let options = {
            server: server
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('web/config/portal.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
            }
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Marker;
                return Promise.resolve(new Response(mapJson));
            }
            if (url.indexOf('content.json?') > -1) {
                return Promise.resolve(new Response(JSON.stringify(svgmarker)));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        datavizWebmap.on('addlayerssucceeded', () => {
            var map = datavizWebmap.map;
            setTimeout(()=>{
                expect(map._layers['未命名标注图层1']).not.toBe(undefined);
                done();
            },1000)
        });
    });
});
