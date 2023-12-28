import {
    WebMap
} from '../../../src/openlayers/mapping/WebMap';
import {
    FetchRequest
} from '../../../src/common/util/FetchRequest';
import { Util as CommonUtil } from '../../../src/common/commontypes/Util';
import '../../resources/WebMapV5.js';
import {
    ArrayStatistic
} from "../../../src/common/util/ArrayStatistic";
import {
    Util
} from '../../../src/openlayers/core/Util';
import {
    StyleUtils
} from "../../../src/openlayers/core/StyleUtils";

import { Object as obj } from 'ol';
import Overlay from 'ol/Overlay';
import * as olControl from 'ol/control';
import Feature from 'ol/Feature';
import * as olProj from 'ol/proj';
import proj4 from 'proj4';
import * as olLayer from 'ol/layer';

window.jsonsql = { query: () => { } };

describe('openlayers_WebMap', () => {
    var originalTimeout, testDiv, webMap;
    var server = "http://127.0.0.1:8090/iportal/";
    var defaultServer = "https://www.supermapol.com/";
    var defaultServeRequest = 'https://www.supermapol.com/web/maps/1788054202/map';
    var proxy = `${server}apps/viewer/getUrlResource.json?url=`;
    var id = 1788054202;
    beforeEach(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        window.document.body.appendChild(testDiv);
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        webMap = null;
        window.document.body.removeChild(testDiv);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('initialize_TIANDITU_VEC', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_VEC;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        const successCallback = () => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.callBack).toBeUndefined();
            expect(datavizWebmap.errorCallback).toBeUndefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getCenter()).toEqual([0, -7.081154551613622e-10]);
            expect(datavizWebmap.mapParams.title).toBe('tianditu');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        }
        var datavizWebmap = new WebMap(id, {
            server: server,
            successCallback
        });
    });

    it('initialize_TIANDITU_IMAGE', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_IMAGE;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var overlayDiv = window.document.createElement("div");
        overlayDiv.setAttribute("id", "marker-pop");
        window.document.body.appendChild(overlayDiv);

        const successCallback = () => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('image_tianditu');
            expect(datavizWebmap.mapParams.description).toBe('This is a image');
            /*spyOn(options.mapSetting, 'mapClickCallback');
            datavizWebmap.map.trigger('click');
            expect(options.mapSetting.mapClickCallback).toHaveBeenCalled();*/
            done();
        }
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { },
            mapSetting: {
                overlays: [
                    new Overlay({
                        id: 'marker-pop',
                        positioning: 'bottom-center'
                    })
                ],
                controls: olControl.defaults({
                    attributionOptions: {
                        collapsed: false
                    },
                    zoom: true,
                    attribution: false
                }),
                mapClickCallback: function (evt) { }
            }
        };

        var datavizWebmap = new WebMap(id, options);

    });

    it('initialize_TIANDITU_TER', (done) => {
        const successCallback = () => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBe('key');
            expect(datavizWebmap.credentialValue).toBe('keyValue');

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('ter');
            expect(datavizWebmap.mapParams.description).toBe('tianditu_ter');
            done();
        };
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { },
            credentialKey: 'key',
            credentialValue: 'keyValue'
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_TIANDITU_TER;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
    });

    it('initialize_BAIDU', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_BAIDU;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('百度');
            expect(datavizWebmap.mapParams.description).toBe('');

            done();
        }
    });

    it('jsonsql', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_BAIDU;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            datavizWebmap.getFiterFeatures('2020年人口数> 20', [{ get: () => ({ '2020年人口数': 30 }) }]);
            datavizWebmap.getFiterFeatures('观测场海拔高度（米）>150', [{ get: () => ({ '观测场海拔高度（米）': 30 }) }]);
            // datavizWebmap.createDataflowLayer({filterCondition:'2020年人口数> 20', pointStyle:{}, wsUrl: 'ws://test/iserver/services/dataflow/dataflow/subscribe'}, [{ get: () => ({ '2020年人口数': 30 }) }]);
            done();
        }
    });
    it('isvj-5215', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_BAIDU;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        async function successCallback() {
            const parameters = {
                "layerType": "UNIQUE",
                "visible": true,
                "themeSetting": {
                    "themeField": "UserID",
                    "customSettings": {
                        "0": {
                            "fillColor": "#D53E4F",
                            "strokeWidth": 1,
                            "offsetX": 0,
                            "offsetY": 0,
                            "fillOpacity": 0.9,
                            "type": "BASIC_POINT",
                            "radius": 15,
                            "strokeColor": "#ffffff",
                            "strokeOpacity": 1
                        },
                        "1": {
                            "fillColor": "#3288BD",
                            "strokeWidth": 1,
                            "offsetX": 0,
                            "offsetY": 0,
                            "fillOpacity": 0.9,
                            "type": "BASIC_POINT",
                            "radius": 15,
                            "strokeColor": "#ffffff",
                            "strokeOpacity": 1
                        },
                        "2": {
                            "fillColor": "#FC8D59",
                            "strokeWidth": 1,
                            "offsetX": 0,
                            "offsetY": 0,
                            "fillOpacity": 0.9,
                            "type": "BASIC_POINT",
                            "radius": 15,
                            "strokeColor": "#ffffff",
                            "strokeOpacity": 1
                        },
                        "3": {
                            "fillColor": "#99D594",
                            "strokeWidth": 1,
                            "offsetX": 0,
                            "offsetY": 0,
                            "fillOpacity": 0.9,
                            "type": "BASIC_POINT",
                            "radius": 15,
                            "strokeColor": "#ffffff",
                            "strokeOpacity": 1
                        },
                        "5": {
                            "fillColor": "#FEE08B",
                            "strokeWidth": 1,
                            "offsetX": 0,
                            "offsetY": 0,
                            "fillOpacity": 0.9,
                            "type": "BASIC_POINT",
                            "radius": 15,
                            "strokeColor": "#ffffff",
                            "strokeOpacity": 1
                        },
                        "8": {
                            "fillColor": "#E6F598",
                            "strokeWidth": 1,
                            "offsetX": 0,
                            "offsetY": 0,
                            "fillOpacity": 0.9,
                            "type": "BASIC_POINT",
                            "radius": 15,
                            "strokeColor": "#ffffff",
                            "strokeOpacity": 1
                        }
                    },
                    "colors": [
                        "#D53E4F",
                        "#FC8D59",
                        "#FEE08B",
                        "#FFFFBF",
                        "#E6F598",
                        "#99D594",
                        "#3288BD"
                    ]
                },
                "name": "isvj-5215",
                "featureType": "POINT",
                "labelStyle": {
                    "offsetX": 0,
                    "textBaseline": "bottom",
                    "fontFamily": "黑体",
                    "offsetY": -19,
                    "outlineWidth": 0,
                    "textAlign": "center",
                    "outlineColor": "#000000",
                    "fontSize": "14px",
                    "fill": "#333",
                    "backgroundFill": [
                        255,
                        255,
                        255,
                        0.8
                    ],
                    "labelField": "UserID"
                },
                "style": {
                    "strokeWidth": 1,
                    "offsetX": 0,
                    "fillColor": "#E6F598",
                    "offsetY": 0,
                    "fillOpacity": 0.9,
                    "radius": 15,
                    "strokeColor": "#ffffff",
                    "type": "BASIC_POINT",
                    "strokeOpacity": 1
                },
                "projection": "EPSG:4326",
                "enableFields": [
                    "UserID"
                ]
            }
            const res = await datavizWebmap.getUniqueStyleGroup(parameters, [{ get: () => ({ 'UserID': 30, 'UserID': 0 }) }]);
            expect(res.length).toBe(1);
            done();
        }
    });
    it('initialize_OPENSTREET', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_OPENSTREET;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.mapParams.title).toBe('openstreet');
            expect(datavizWebmap.mapParams.description).toBe('');

            done();
        }
    });

    it('initialize_FAILD', (done) => {
        let options = {
            server: server,
            errorCallback
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.reject();
        });
        var datavizWebmap = new WebMap(id, options);

        function errorCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            // expect(options.successCallback).not.toHaveBeenCalled();
            done();
        }
    });

    it('initialize_CLOUD', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('GAOD');
            expect(datavizWebmap.mapParams.description).toBe('');

            done();
        }
    });

    it('initialize_UNDEFIED', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_UNDEFIED;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.mapParams.title).toBe('undefinedMap');
            expect(datavizWebmap.mapParams.description).toBe('');

            done();
        }
    });

    it('createThemeLayer_Vector_Basis', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/675746998/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Theme_base;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(csvData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(7);
            expect(view.getCenter()).toEqual([13428717.554131005, 3553719.2183414707]);
            expect(datavizWebmap.mapParams.title).toBe('theme_base');
            expect(datavizWebmap.mapParams.description).toBe('base style');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('浙江省高等院校(3)');
            done();
        }
    });

    it('createThemeLayer_Vector_Basis_Line', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/374284777/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Theme_base_Line;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(10);
            expect(view.getCenter()).toEqual([12957099.912590493, 4857107.635483593]);
            expect(datavizWebmap.mapParams.title).toBe('Line_basis');
            expect(datavizWebmap.mapParams.description).toBe('');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道交通线路');
            done();
        }
    });

    it('createThemeLayer_Vector_IMAGE', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/675746998/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Image;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            expect(datavizWebmap.mapParams.title).toBe('Image');
            expect(datavizWebmap.mapParams.description).toBe('');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('浙江省高等院校(3)');
            done();
        }
    });

    it('createThemeLayer_Vector_SVG', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/1782454383/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);
        spyOn(datavizWebmap, 'createGraphicLayer');

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            expect(datavizWebmap.mapParams.title).toBe("无标题");
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(datavizWebmap.createGraphicLayer).toHaveBeenCalled();

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            done();
        }
    });

    it('createThemeLayer_Unique', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/658963918/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Unique;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(xlsData));
            }
            return Promise.resolve();
        });


        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(12);
            expect(view.getCenter()).toEqual([12949175.717869252, 4864340.473197712]);
            expect(datavizWebmap.mapParams.title).toBe('Unique');
            expect(datavizWebmap.mapParams.description).toBe('');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('住宅_Lite(10)');
            done();
        }
    });

    it('createThemeLayer_Range', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/1236941499/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Range;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(10);
            expect(view.getCenter()).toEqual([12957697.597143793, 4851476.112683487]);
            expect(datavizWebmap.mapParams.title).toBe('RANGE_LABEL');
            expect(datavizWebmap.mapParams.description).toBe('');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道交通线路(2)');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(3);
            done();
        }
    });

    it('createThemeLayer_Heat', (done) => {
        //插件里面i未定义报错
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/675746998/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Heat;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(csvData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(7);
            expect(view.getCenter()).toEqual([13428717.554131005, 3553719.2183414707]);
            expect(datavizWebmap.mapParams.title).toBe('Heat');
            expect(datavizWebmap.mapParams.description).toBe('');
            done();
        }
    });

    it('createThemeLayer_Marker', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let requestUrl = `${proxy}${encodeURIComponent(`${server}web/datas/579431262/content.json?pageSize=9999999&currentPage=1`)}`;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_Marker;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(markerData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(Math.floor(view.getZoom())).toBe(2);
            expect(datavizWebmap.mapParams.title).toBe('标注图层');
            expect(datavizWebmap.mapParams.description).toBe('');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('未命名标注图层1');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }
    });

    it('createThemeLayer_SUPERMAP_MAP', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestMap;
                return Promise.resolve(new Response(mapJson));
            } else {
                return Promise.resolve(new Response(jinJingMap))
            }
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(7);
            expect(view.getCenter()).toEqual([13010199.082679197, 4882852.518868368]);
            expect(datavizWebmap.mapParams.title).toBe('RestMap');
            expect(datavizWebmap.mapParams.description).toBe('restMap from jingjin');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('京津地区土地利用现状图');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }
    });

    it('createThemeLayer_SUPERMAPREST_DATA', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestData;
                return Promise.resolve(new Response(mapJson));
            } else if (ur === 'https://www.supermapol.com/iserver/services/map-jingjin/rest/maps/京津地区土地利用现状图.json') {
                return Promise.resolve(new Response(jingjinData));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            return Promise.resolve(new Response(supermapData));
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(9);
            expect(view.getCenter()).toEqual([13013201.402643811, 4822518.728777889]);
            expect(datavizWebmap.mapParams.title).toBe('RestData');
            expect(datavizWebmap.mapParams.description).toBe('');

            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('Jingjin:BaseMap_P');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
            datavizWebmap.map = null;
            datavizWebmap = null;
        }
    });

    it('WMS', (done) => {
        //插件里面i未定义报错
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('GetCapabilities')) {
                return Promise.resolve(new Response(wms_capabilities));
            }
            return Promise.resolve();
        });
        //
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getCenter()).toEqual([0, -7.081154551613622e-10]);
            expect(datavizWebmap.mapParams.title).toBe('wms');
            expect(datavizWebmap.mapParams.description).toBe('');
            //

            // expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            // expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('World');
            // expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }
    });

    /*    it('WMTS', (done) => {
            //第二次请求wmts参数值太大
            let options = {
                target:'map',
                server: server,
                errorCallback: function () {},
                callback: function () {}
            };
            let wmtsData ='<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
  
            spyOn(FetchRequest, 'get').and.callFake((url) => {
                if (url.indexOf('map.json')>-1) {
                    var mapJson = datavizWebMap_WMTS;
                    return Promise.resolve(new Response(mapJson));
                } else if(url === 'http://localhost:9876/iserver/services/maps/wmts100?') {
                    return Promise.resolve(new Response(wmtsData));
                }
                return Promise.resolve();
            });
            spyOn(options, 'callback');
            var datavizWebmap = new WebMap(id, options);
  
            function successCallback() {
                expect(datavizWebmap.server).toBe(server);
                expect(datavizWebmap.errorCallback).toBeDefined();
                expect(datavizWebmap.credentialKey).toBeUndefined();
                expect(datavizWebmap.credentialValue).toBeUndefined();
  
                var view = datavizWebmap.map.getView();
                expect(view.getZoom()).toBe(1);
                expect(view.getCenter()).toEqual([0, 0]);
                expect(datavizWebmap.mapParams.title).toBe('wmts');
                expect(datavizWebmap.mapParams.description).toBe('');
                expect(options.callback).toHaveBeenCalled();
                expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
                expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('World_AirLine_Part');
                expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
                done();
            }
        });*/

    it('createWMTSSource', (done) => {
        let options = {
            server: defaultServer,
            successCallback,
            errorCallback: function () { }
        };

        function successCallback() {
            expect(datavizWebmap.server).toBe(defaultServer);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.mapParams.projection).toBe('EPSG:3857');
            expect(datavizWebmap.map.getLayers().getArray()[1].getSource().getUrls()[0] ).toBe('https://fake/iserver/services/map-china400/wmts100?');
            done();
        }
        spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
            return true;
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf("iserver/services/maps/wmts100?&SERVICE=WMTS&VERSION=1.0.0&REQUEST=GetCapabilities")>-1) {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
    });

    it('createWMTSSource1', (done) => {
        //第二次请求wmts参数值太大
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.includes("/iserver/services/maps/wmts100?")) {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { server: defaultServer });
        var layerInfo = JSON.parse(wmtsInfo1);
        datavizWebmap.baseProjection = "EPSG:4326";
        datavizWebmap.createWMTSSource(layerInfo);
 
        setTimeout(() => {
            expect(datavizWebmap.server).toBe(defaultServer);
            done();
        }, 0);
    });

    it('changeWeight', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.includes("/iserver/services/maps/wmts100?")) {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { server: defaultServer });
        var features = [];
        var feature = new Feature();
        feature.setProperties({
            field: '10'
        });
        features.push(feature);
        setTimeout(() => {
            datavizWebmap.fieldMaxValue = {
                field: 10
            };
            datavizWebmap.changeWeight(features, 'field');
            // expect(feature.get('weight')).toBe(1);
            done();
        }, 0);
    });

    it('createBaseLayer-wmts', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.includes("/iserver/services/maps/wmts100?")) {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { successCallback, errorCallback, server: defaultServer });
        function successCallback() { }
        setTimeout(() => {
            var layerInfo = {
                layerType: 'WMTS',
                zIndex: 1,
                visible: true,
                projection: "EPSG:4326",
                tileMatrixSet: "c"
            }
            spyOn(datavizWebmap, "createWMTSSource");
            datavizWebmap.createBaseLayer(layerInfo);
            expect(datavizWebmap.createWMTSSource).toHaveBeenCalled();
            done();
        }, 0);
        function errorCallback(error) {
            console.log(error);
        }
    });

    it('getWmtsInfo', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            let requestUrl = `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(`${defaultServeRequest}.json`)}`;
            if (url === requestUrl) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.includes("/iserver/services/maps/wmts100?")) {
                return Promise.resolve(new Response(wmtsInfo2));
            } else {
                let wmtsData = '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
                return Promise.resolve(new Response(wmtsData));
            }
        });
        var datavizWebmap = new WebMap(id, { server: defaultServer });
        spyOn(datavizWebmap, "isValidResponse").and.callFake(() => {
            return true;
        });
        setTimeout(() => {
            var layerInfo = {
                url: 'http://localhost:9876/iserver/services/maps/wmts100'
            };
            const successCallback = function () { };
            datavizWebmap.getWmtsInfo(layerInfo, successCallback);
            expect(datavizWebmap.isValidResponse).toHaveBeenCalled();
            done();
        }, 1000);
    });

    it('isValidResponse', (done) => {
        var datavizWebmap = new WebMap(id, { webMap: JSON.parse(datavizWebMap_BAIDU), successCallback });
        function successCallback() {
            var response = {};
            expect(datavizWebmap.isValidResponse(response)).toBe(false);
            done();
        }
    });

    it('getReslutionsFromScales', (done) => {
        var datavizWebmap = new WebMap({ webMap: JSON.parse(datavizWebMap_BAIDU), successCallback });
        function successCallback() {
            var scales = {
                TileMatrix: [{
                    Identifier: ''
                }]
            };
            expect(datavizWebmap.getReslutionsFromScales(scales, 96, 'degrees', 1000)).toBeDefined();
            done();
        }
    });

    it('getRangeStyleGroup', (done) => {
        let webMapObj = JSON.parse(datavizWebMap_BAIDU);
        var datavizWebmap = new WebMap({ webMap: webMapObj, successCallback });
        function successCallback() {
            var params = '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
            var features = [];
            var feature = new Feature();
            feature.set("Properties", {
                field: 10
            });
            features.push(feature);
            spyOn(ArrayStatistic, "getArraySegments").and.callFake(() => {
                return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
            });
            datavizWebmap.getRangeStyleGroup(JSON.parse(params), features);
            expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
            done();
        };
    });

    it('getRangeStyleGroup1', (done) => {
        spyOn(ArrayStatistic, "getArraySegments").and.callFake(() => {
            return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
        });
        let webMapObj = JSON.parse(datavizWebMap_BAIDU);
        var datavizWebmap = new WebMap({ webMap: webMapObj, successCallback });
        function successCallback() {
            var params = '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
            var features = [];
            var feature = new Feature();
            feature.set("field", 10);
            features.push(feature);
            datavizWebmap.getRangeStyleGroup(JSON.parse(params), features);
            expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
            done();
        }
    });

    it('refresh', (done) => {
        let refresh = false;
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = refresh ? datavizWebMap_BAIDU : datavizWebMap_TIANDITU_VEC;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
            server: server,
            successCallback: callback
        });

        function callback() {
            if (!refresh) {
                expect(datavizWebmap.baseLayer.name).toEqual('天地图');
                refresh = true;
                datavizWebmap.refresh();
            } else {
                expect(datavizWebmap.baseLayer.name).toEqual('百度地图');
                done();
            }
        }
    })
    it('webMapUrl', (done) => {
        let options = {
            server: server,
            webMap: defaultServeRequest,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_BAIDU;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            expect(datavizWebmap.mapParams.title).toBe('百度');
            expect(datavizWebmap.mapParams.description).toBe('');

            done();
        }
    })
    it('webMapObject', (done) => {
        let options = {
            server: server,
            webMap: JSON.parse(datavizWebMap_BAIDU),
            successCallback,
            errorCallback: function () { }
        };

        var datavizWebmap = new WebMap(options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            done();
        }
    })

    it('getScales EPSG:1', (done) => {
        //第二次请求wmts参数值太大
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.includes("/iserver/services/maps/wmts100?")) {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        let proj = new olProj.Projection({
            units: '',
            code: 'EPSG:1'
        });
        olProj.addProjection(proj);
        var datavizWebmap = new WebMap(id, { server: defaultServer });
        var layerInfo = JSON.parse(wmtsInfo);
        datavizWebmap.baseProjection = 'EPSG:1';
        datavizWebmap.getScales({ ...layerInfo, projection: 'EPSG:1' });

        setTimeout(() => {
            expect(datavizWebmap.scales[0]).toBe('1:65789415978977.37');
            done();
        }, 0);
    });
    it('getScales EPSG:3857', (done) => {
        //第二次请求wmts参数值太大
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.includes("/iserver/services/maps/wmts100?")) {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        let proj = new olProj.Projection({
            units: '',
            code: 'EPSG:1'
        });
        olProj.addProjection(proj);
        var datavizWebmap = new WebMap(id, { server: defaultServer });
        var layerInfo = JSON.parse(wmtsInfo);
        datavizWebmap.baseProjection = 'EPSG:3857';
        datavizWebmap.getScales({ ...layerInfo, projection: 'EPSG:1' });

        setTimeout(() => {
            expect(datavizWebmap.scales[0]).toBe('1:591658710.9091312');
            done();
        }, 0);
    });
    it('svg canvg', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(markerData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);
        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            datavizWebmap.stop
            done();
        }
    });

    it('vector_svg', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG1;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { server, successCallback });
        function successCallback() {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        }
    });

    it('vector_svg refresh', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG1;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { server, successCallback });
        let count = 1;
        function successCallback() {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            if (count === 1) {
                datavizWebmap.refresh();
            }
            count === 2 && done();
            count += 1;
        }
    });

    it('server is end of iportal', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG1;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { server: server.slice(0, -1), successCallback });

        function successCallback() {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        }
    });

    it('specify webmap url', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_SVG1;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { webMap: `${server}web/maps/${id}/map`, successCallback });
        function successCallback() {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        }
    })

    it('get mapInfo error', (done) => {
        var mapJsonData = JSON.parse(datavizWebMap_SVG1);
        mapJsonData.succeed = false;
        mapJsonData.error = 'sorry';
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { webMap: mapJsonData, errorCallback });
        function errorCallback(error, type) {
            expect(error).toBe(mapJsonData.error);
            expect(type).toBe('getMapFaild');
            done();
        }
    })

    it('center empty', (done) => {
        var mapJsonData = JSON.parse(datavizWebMap_SVG1);
        mapJsonData.center = [];
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, { webMap: mapJsonData, successCallback });
        function successCallback() {
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        }
    })

    it('layer auto refrsh', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        let wmtsData = '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
        // let requestUrl = `${proxy}${encodeURIComponent('http://localhost:9876/iserver/services/map-world/wms130/World?MAP=World&&SERVICE=WMS&REQUEST=GetCapabilities')}`
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = wmsAutoUpdate;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('GetCapabilities')) {
                return Promise.resolve(new Response(wmtsData));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);
        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            done();
        }
    })

    it('getMapInfoSuccess -1000', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestMap_1000;
                return Promise.resolve(new Response(JSON.stringify(mapJson)));
            }
            if (url.indexOf('prjCoordSys.wkt') > -1) {
                return Promise.resolve(new Response('PROJCS["Xian 1980 / 3-degree Gauss-Kruger zone 38",GEOGCS["Xian 1980",DATUM["Xian_1980",SPHEROID["IAG 1975",6378140,298.257,AUTHORITY["EPSG","7049"]],AUTHORITY["EPSG","6610"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4610"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",114],PARAMETER["scale_factor",1],PARAMETER["false_easting",38500000],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","2362"]]'));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.mapParams.projection).toBe('EPSG:-1000');
            done();
        }
    });
    it('getMapInfoSuccess BrowseMap', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        CommonUtil
        spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
            return true;
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestMap_100;
                return Promise.resolve(new Response(JSON.stringify(mapJson)));
            }
            if (url.indexOf('prjCoordSys.wkt') > -1) {
                return Promise.resolve(new Response('PROJCS["Xian 1980 / 3-degree Gauss-Kruger zone 38",GEOGCS["Xian 1980",DATUM["Xian_1980",SPHEROID["IAG 1975",6378140,298.257,AUTHORITY["EPSG","7049"]],AUTHORITY["EPSG","6610"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4610"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",114],PARAMETER["scale_factor",1],PARAMETER["false_easting",38500000],PARAMETER["false_northing",0],UNIT["metre",1,AUTHORITY["EPSG","9001"]],AUTHORITY["EPSG","2362"]]'));
            }
            if (url.indexOf('https://fake/iserver/services/map-100/rest/maps/map-100') > -1) {
                return Promise.resolve(new Response(mapInfo_1));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.baseProjection.getCode()).toBe('EPSG:0');
            done();
        }
    });

    it('initialize_MVT', (done) => {
        window.olmsbak =  window.olms;
        window.olms = { applyBackground: function () { }, stylefunction: function () { return function () { } } }
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
            return true;
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(datavizWebMap_MVT)));
            }
            if (url.indexOf('vectorstyles.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(vectorTile_style)));
            }
            if (url.indexOf('http://fake/iserver/services/map-China100/rest/maps/China.json') > -1) {
                return Promise.resolve(new Response(JSON.stringify(mapInfo2)));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            window.olms =  window.olmsbak;
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.map.getLayers().getArray()[0] instanceof olLayer.VectorTile).toBeTrue();
            done();
        }
    });

    it('createThemeLayer_RANK_SYMBOL', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
            return true;
        });
        spyOn(ArrayStatistic, "getArraySegments").and.callFake(() => {
            return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RANK_SYMBOL;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('web/datas/1236941499/content.json') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('省级政府');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }
    });
    it('createLayer_geojson', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
            return true;
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_geojson;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('marker.geojson') > -1) {
                return Promise.resolve(new Response(geojsonData));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道');
            expect(datavizWebmap.map.getLayers().getArray()[1].getSource().getFeatures().length).toBe(1);
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }
    });
    it('createLayer_migration', (done) => {
        let add = false;
        class ol3Echarts extends obj{
            appendTo(){add = true;return true }
        }
        window.ol3Echarts = ol3Echarts;
        let options = {
            server: server,
            successCallback,
            errorCallback: function () { }
        };
        spyOn(CommonUtil, 'isInTheSameDomain').and.callFake((url) => {
            return true;
        });
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = migrationLayer;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('1184572358') > -1) {
                return Promise.resolve(new Response(csvData_migration));
            }
            return Promise.resolve();
        });

        var datavizWebmap = new WebMap(id, options);

        function successCallback() {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('中国暗色地图');
            expect(add).toBeTrue()
            done();
        }
    });

    it('createBaseLayer-SUPERMAP_REST-token', (done) => {
      spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
        if (url.indexOf('map.json') > -1) {
            var mapJson = datavizWebMap_RestMap_token;
            return Promise.resolve(new Response(mapJson));
        } else if (url.indexOf('content.json') > -1) {
            expect(url.indexOf('testtoken')).toBe(-1);
            return Promise.resolve(new Response(geojsonData));
        } else {
            expect(url.indexOf('testtoken')).not.toBe(-1);
            return Promise.resolve()
        }
      });
      var datavizWebmap = new WebMap(id, {successCallback, errorCallback, server: defaultServer });
      function successCallback(map, mapInfo, layers, baseLayer){
        expect(baseLayer.credential).toEqual({token: 'testtoken'});
        done();
      }
      function errorCallback(error) {
        console.log(error);
      }
    });
});
