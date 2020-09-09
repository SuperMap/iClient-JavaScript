import {
    WebMap
} from '../../../src/openlayers/mapping/WebMap';
import {
    FetchRequest
} from '../../../src/common/util/FetchRequest';
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


import Overlay from 'ol/Overlay';
import * as olControl from 'ol/control';
import Feature from 'ol/Feature';

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
        var datavizWebmap = new WebMap(id, {
            server: server
        });

        setTimeout(() => {
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
        }, 1000)
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
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {},
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
                mapClickCallback: function (evt) {}
            }
        };
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('image_tianditu');
            expect(datavizWebmap.mapParams.description).toBe('This is a image');
            expect(options.successCallback).toHaveBeenCalled();

            /*spyOn(options.mapSetting, 'mapClickCallback');
            datavizWebmap.map.trigger('click');
            expect(options.mapSetting.mapClickCallback).toHaveBeenCalled();*/
            done();
        }, 1000)
    });

    it('initialize_TIANDITU_TER', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {},
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBe('key');
            expect(datavizWebmap.credentialValue).toBe('keyValue');

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('ter');
            expect(datavizWebmap.mapParams.description).toBe('tianditu_ter');
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    });

    it('initialize_BAIDU', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_BAIDU;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('百度');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    });
    it('initialize_OPENSTREET', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_OPENSTREET;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.mapParams.title).toBe('openstreet');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    });

    it('initialize_FAILD', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            return Promise.reject();
        });
        spyOn(options, 'successCallback');
        spyOn(options, 'errorCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(options.successCallback).not.toHaveBeenCalled();
            expect(options.errorCallback).toHaveBeenCalled();
            done();
        }, 1000)
    });

    it('initialize_CLOUD', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_CLOUD;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(datavizWebmap.mapParams.title).toBe('GAOD');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    });

    it('initialize_UNDEFIED', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_UNDEFIED;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(datavizWebmap.mapParams.title).toBe('undefinedMap');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    });

    it('createThemeLayer_Vector_Basis', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(7);
            expect(view.getCenter()).toEqual([13428717.554131005, 3553719.2183414707]);
            expect(datavizWebmap.mapParams.title).toBe('theme_base');
            expect(datavizWebmap.mapParams.description).toBe('base style');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('浙江省高等院校(3)');
            done();
        }, 1000)
    });

    it('createThemeLayer_Vector_Basis_Line', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(10);
            expect(view.getCenter()).toEqual([12957099.912590493, 4857107.635483593]);
            expect(datavizWebmap.mapParams.title).toBe('Line_basis');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道交通线路');
            done();
        }, 1000)
    });

    it('createThemeLayer_Vector_IMAGE', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            expect(datavizWebmap.mapParams.title).toBe('Image');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('浙江省高等院校(3)');
            done();
        }, 1000)
    });
    it('createThemeLayer_Vector_SVG', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);
        spyOn(datavizWebmap, 'createGraphicLayer');

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            expect(datavizWebmap.mapParams.title).toBe("无标题");
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(datavizWebmap.createGraphicLayer).toHaveBeenCalled();
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            done();
        }, 1000)
    });

    it('createThemeLayer_Unique', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');

        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(12);
            expect(view.getCenter()).toEqual([12949175.717869252, 4864340.473197712]);
            expect(datavizWebmap.mapParams.title).toBe('Unique');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('住宅_Lite(10)');
            done();
        }, 1000)
    });

    it('createThemeLayer_Range', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(10);
            expect(view.getCenter()).toEqual([12957697.597143793, 4851476.112683487]);
            expect(datavizWebmap.mapParams.title).toBe('RANGE_LABEL');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('北京市轨道交通线路(2)');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(3);
            done();
        }, 1000)
    });
    it('createThemeLayer_Heat', (done) => {
        //插件里面i未定义报错
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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

        setTimeout(() => {
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
        }, 1000)
    });

    it('createThemeLayer_Marker', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
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
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(Math.floor(view.getZoom())).toBe(2);
            expect(datavizWebmap.mapParams.title).toBe('标注图层');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('未命名标注图层1');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }, 1000)
    });

    it('createThemeLayer_SUPERMAP_MAP', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestMap;
                return Promise.resolve(new Response(mapJson));
            } else {
                return Promise.resolve(new Response(jinJingMap))
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(7);
            expect(view.getCenter()).toEqual([13010199.082679197, 4882852.518868368]);
            expect(datavizWebmap.mapParams.title).toBe('RestMap');
            expect(datavizWebmap.mapParams.description).toBe('restMap from jingjin');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('京津地区土地利用现状图');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }, 1000)
    });

    it('createThemeLayer_SUPERMAPREST_DATA', (done) => {
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestData;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            return Promise.resolve(new Response(supermapData));
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getZoom()).toBe(9);
            expect(view.getCenter()).toEqual([13013201.402643811, 4822518.728777889]);
            expect(datavizWebmap.mapParams.title).toBe('RestData');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('Jingjin:BaseMap_P');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
            datavizWebmap.map = null;
            datavizWebmap = null;
        }, 1000)
    });

    it('WMS', (done) => {
        //插件里面i未定义报错
        let options = {
            server: server,
            successCallback: function () {},
            errorCallback: function () {}
        };
        let wmtsData = '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://support.supermap.com:8090/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
        let requestUrl = `${proxy}${encodeURIComponent('http://support.supermap.com:8090/iserver/services/map-world/wms130/World?MAP=World&&SERVICE=WMS&REQUEST=GetCapabilities')}`
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMS;
                return Promise.resolve(new Response(mapJson));
            } else if (url === requestUrl) {
                return Promise.resolve(new Response(wmtsData));
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(id, options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            var view = datavizWebmap.map.getView();
            expect(view.getCenter()).toEqual([0, -7.081154551613622e-10]);
            expect(datavizWebmap.mapParams.title).toBe('wms');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            expect(datavizWebmap.map.getLayers().getArray()[0].getProperties().name).toBe('高德地图');
            expect(datavizWebmap.map.getLayers().getArray()[1].getProperties().name).toBe('World');
            expect(datavizWebmap.map.getLayers().getArray().length).toBe(2);
            done();
        }, 1000)
    });

    /*    it('WMTS', (done) => {
            //第二次请求wmts参数值太大
            let options = {
                target:'map',
                server: server,
                errorCallback: function () {},
                callback: function () {}
            };
            let wmtsData ='<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://support.supermap.com:8090/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';

            spyOn(FetchRequest, 'get').and.callFake((url) => {
                if (url.indexOf('map.json')>-1) {
                    var mapJson = datavizWebMap_WMTS;
                    return Promise.resolve(new Response(mapJson));
                } else if(url === 'http://support.supermap.com:8090/iserver/services/maps/wmts100?') {
                    return Promise.resolve(new Response(wmtsData));
                }
                return Promise.resolve();
            });
            spyOn(options, 'callback');
            var datavizWebmap = new WebMap(id, options);

            setTimeout(() => {
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
            }, 1000)
        });*/

    it('createWMTSSource', (done) => {
        //第二次请求wmts参数值太大
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {});
        var layerInfo = JSON.parse(wmtsInfo);
        datavizWebmap.baseProjection = "EPSG:4326";
        datavizWebmap.createWMTSSource(layerInfo);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(defaultServer);
            done();
        }, 1000)
    });

    it('createWMTSSource1', (done) => {
        //第二次请求wmts参数值太大
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {});
        var layerInfo = JSON.parse(wmtsInfo1);
        datavizWebmap.baseProjection = "EPSG:4326";
        datavizWebmap.createWMTSSource(layerInfo);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(defaultServer);
            done();
        }, 1000)
    });

    // 被写在styleUtils
    // it('setColorToCanvas', (done) => {
    //     spyOn(FetchRequest, 'get').and.callFake((url) => {
    //         if (url.indexOf('map.json')>-1) {
    //             var mapJson = datavizWebMap_WMTS;
    //             return Promise.resolve(new Response(mapJson));
    //         }
    //         return Promise.resolve();
    //     });
    //     var datavizWebmap = new WebMap(id, {});
    //     var canvas = document.createElement('canvas');
    //     var params = {
    //         fillColor: '#0083cb',
    //         fillOpacity: '1',
    //         strokeColor: '#56b781',
    //         strokeOpacity: '0.2',
    //         strokeWidth: '6'
    //     };
    //     setTimeout(() => {
    //         expect(datavizWebmap.setColorToCanvas(canvas, params)).toBeDefined();
    //         done();
    //     }, 1000)
    // });

    // it('getSymbolStyle', (done) => {
    //     spyOn(FetchRequest, 'get').and.callFake((url) => {
    //         if (url.indexOf('map.json')>-1) {
    //             var mapJson = datavizWebMap_WMTS;
    //             return Promise.resolve(new Response(mapJson));
    //         }
    //         return Promise.resolve();
    //     });
    //     var datavizWebmap = new WebMap(id, {});
    //     var params = {
    //         unicode: "&#xe694",
    //         fillColor: '#ffffff',
    //         fillOpacity: '1',
    //         strokeColor: '#56b781',
    //         strokeOpacity: '0.2',
    //         strokeWidth: '6'
    //     };
    //     setTimeout(() => {
    //         expect(datavizWebmap.getSymbolStyle(params)).toBeDefined();
    //         done();
    //     }, 1000)
    // });

    it('changeWeight', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {});
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
        }, 1000)
    });

    it('createBaseLayer-wmts', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else if (url === "http://support.supermap.com:8090/iserver/services/maps/wmts100?") {
                return Promise.resolve(new Response(wmtsInfo2));
            }
            return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {});
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
        }, 1000)
    });

    it('getWmtsInfo', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            let requestUrl = `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(`${defaultServeRequest}.json`)}`;
            if (url === requestUrl) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            } else {
                let wmtsData = '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://support.supermap.com:8090/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
                return Promise.resolve(new Response(wmtsData));
            }
        });
        var datavizWebmap = new WebMap(id, {});
        spyOn(datavizWebmap, "isValidResponse").and.callFake(() => {
            return true;
        });
        setTimeout(() => {
            var layerInfo = {
                url: 'http://support.supermap.com:8090/iserver/services/maps/wmts100'
            };
            var successCallback = function () {};
            datavizWebmap.getWmtsInfo(layerInfo, successCallback);
            expect(datavizWebmap.isValidResponse).toHaveBeenCalled();
            done();
        }, 1000)
    });

    it('isValidResponse', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(`${defaultServeRequest}.json`)}`) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
        });
        var datavizWebmap = new WebMap(id, {});
        setTimeout(() => {
            var response = {};
            expect(datavizWebmap.isValidResponse(response)).toBe(false);
            done();
        }, 1000)
    });

    it('getReslutionsFromScales', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(`${defaultServeRequest}.json`)}`) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
        });
        var datavizWebmap = new WebMap(id, {});
        setTimeout(() => {
            var scales = {
                TileMatrix: [{
                    Identifier: ''
                }]
            };
            expect(datavizWebmap.getReslutionsFromScales(scales, 96, 'degrees', 1000)).toBeDefined();
            done();
        }, 1000)
    });

    it('getRangeStyleGroup', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(`${defaultServeRequest}.json`)}`) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
        });
        var datavizWebmap = new WebMap(id, {});
        setTimeout(() => {
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
        }, 1000);
    });

    it('getRangeStyleGroup1', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url === `https://www.supermapol.com/apps/viewer/getUrlResource.json?url=${encodeURIComponent(`${defaultServeRequest}.json`)}`) {
                var mapJson = datavizWebMap_WMTS;
                return Promise.resolve(new Response(mapJson));
            }
        });
        spyOn(ArrayStatistic, "getArraySegments").and.callFake(() => {
            return [4133010335, 4133011647, 4133013294, 4133014535, 4133016408, 4233051885, 9233063036];
        });
        var datavizWebmap = new WebMap(id, {});
        setTimeout(() => {
            var params = '{"layerType":"RANGE","visible":true,"themeSetting":{"themeField":"field","customSettings":{"0":{"color":"#bd10e0","segment":{"start":1, "end": 10}}},"segmentMethod":"square","segmentCount":6,"colors":["#D53E4F","#FC8D59","#FEE08B","#FFFFBF","#E6F598","#99D594","#3288BD"]},"name":"上海市可校外学习中心","featureType":"POINT","xyField":{"xField":"经度","yField":"纬度"},"style":{"strokeWidth":1,"fillColor":"#99D594","fillOpacity":0.9,"radius":5,"strokeColor":"#ffffff","type":"BASIC_POINT","strokeOpacity":1},"projection":"EPSG:4326","dataSource":{"type":"PORTAL_DATA","serverId":"1132407305"}}';
            var features = [];
            var feature = new Feature();
            feature.set("field", 10);
            features.push(feature);
            datavizWebmap.getRangeStyleGroup(JSON.parse(params), features);
            expect(ArrayStatistic.getArraySegments).toHaveBeenCalled();
            done();
        }, 1000)
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
            server: server
        });

        setTimeout(() => {
            expect(datavizWebmap.baseLayer.name).toEqual('天地图');
            refresh = true;
            datavizWebmap.refresh();
            setTimeout(() => {
                expect(datavizWebmap.baseLayer.name).toEqual('百度地图');
                done();
            }, 1000);            
        }, 1000)
    })
    it('webMapUrl', (done) => {
        let options = {
            server: server,
            webMap: defaultServeRequest,
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_BAIDU;
                return Promise.resolve(new Response(mapJson));
            }
            return Promise.resolve();
        });
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();

            expect(datavizWebmap.mapParams.title).toBe('百度');
            expect(datavizWebmap.mapParams.description).toBe('');
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    })
    it('webMapObject', (done) => {
        let options = {
            server: server,
            webMap: JSON.parse(datavizWebMap_BAIDU),
            successCallback: function () {},
            errorCallback: function () {}
        };
        spyOn(options, 'successCallback');
        var datavizWebmap = new WebMap(options);

        setTimeout(() => {
            expect(datavizWebmap.server).toBe(server);
            expect(datavizWebmap.errorCallback).toBeDefined();
            expect(datavizWebmap.credentialKey).toBeUndefined();
            expect(datavizWebmap.credentialValue).toBeUndefined();
            expect(options.successCallback).toHaveBeenCalled();
            done();
        }, 1000)
    })
});
