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
import * as olProj from 'ol/proj';

window.jsonsql = { query: () => {} };

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
        var datavizWebmap = new WebMap(id, options);
    });

    it('initialize_BAIDU', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () {}
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
          errorCallback: function () {}
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
    it('initialize_OPENSTREET', (done) => {
        let options = {
            server: server,
            successCallback,
            errorCallback: function () {}
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
            errorCallback: function () {}
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
            errorCallback: function () {}
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
            errorCallback: function () {}
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
            errorCallback: function () {}
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_RestData;
                return Promise.resolve(new Response(mapJson));
            } else if(ur === 'https://www.supermapol.com/iserver/services/map-jingjin/rest/maps/京津地区土地利用现状图.json') {
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
            errorCallback: function () {}
        };
        let wmtsData = '<Capabilities xmlns="http://www.opengis.net/wmts/1.0" xmlns:gml="http://www.opengis.net/gml" xmlns:ows="http://www.opengis.net/ows/1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/wmts/1.0 http://localhost:9876/iserver/services/map-world/wmts100/wmts,1.0,wmtsGetCapabilities_response.xsd"><<ows:OperationsMetadata><<ows:Operation name="GetCapabilities"></ows:Operation></ows:OperationsMetadata></Capabilities>';
        // let requestUrl = `${proxy}${encodeURIComponent('http://localhost:9876/iserver/services/map-world/wms130/World?MAP=World&&SERVICE=WMS&REQUEST=GetCapabilities')}`
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf('map.json') > -1) {
                var mapJson = datavizWebMap_WMS;
                return Promise.resolve(new Response(mapJson));
            } else if (url.indexOf('GetCapabilities')) {
                return Promise.resolve(new Response(wmtsData));
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
        var datavizWebmap = new WebMap(id, {});
        var layerInfo = JSON.parse(wmtsInfo);
        datavizWebmap.baseProjection = "EPSG:4326";
        datavizWebmap.createWMTSSource(layerInfo);

        setTimeout(()=>{
          expect(datavizWebmap.server).toBe(defaultServer);
          done();
        }, 0);
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
        var datavizWebmap = new WebMap(id, {});
        var layerInfo = JSON.parse(wmtsInfo1);
        datavizWebmap.baseProjection = "EPSG:4326";
        datavizWebmap.createWMTSSource(layerInfo);

        setTimeout(()=>{
            expect(datavizWebmap.server).toBe(defaultServer);
            done();
        }, 0);
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
    //     var datavizWebmap = new WebMap(id, { successCallback });
    //     var canvas = document.createElement('canvas');
    //     var params = {
    //         fillColor: '#0083cb',
    //         fillOpacity: '1',
    //         strokeColor: '#56b781',
    //         strokeOpacity: '0.2',
    //         strokeWidth: '6'
    //     };
    //     function successCallback() {
    //         expect(datavizWebmap.setColorToCanvas(canvas, params)).toBeDefined();
    //         done();
    //     }
    // });

    // it('getSymbolStyle', (done) => {
    //     spyOn(FetchRequest, 'get').and.callFake((url) => {
    //         if (url.indexOf('map.json')>-1) {
    //             var mapJson = datavizWebMap_WMTS;
    //             return Promise.resolve(new Response(mapJson));
    //         }
    //         return Promise.resolve();
    //     });
    //     var datavizWebmap = new WebMap(id, { successCallback });
    //     var params = {
    //         unicode: "&#xe694",
    //         fillColor: '#ffffff',
    //         fillOpacity: '1',
    //         strokeColor: '#56b781',
    //         strokeOpacity: '0.2',
    //         strokeWidth: '6'
    //     };
    //     function successCallback() {
    //         expect(datavizWebmap.getSymbolStyle(params)).toBeDefined();
    //         done();
    //     }
    // });

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
        var datavizWebmap = new WebMap(id, {});
        var features = [];
        var feature = new Feature();
        feature.setProperties({
            field: '10'
        });
        features.push(feature);
        setTimeout(()=>{
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
        var datavizWebmap = new WebMap(id, {successCallback, errorCallback});
        function successCallback(){}
        setTimeout(()=>{
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
        var datavizWebmap = new WebMap(id, {});
        spyOn(datavizWebmap, "isValidResponse").and.callFake(() => {
            return true;
        });
        setTimeout(() => {
          var layerInfo = {
            url: 'http://localhost:9876/iserver/services/maps/wmts100'
          };
          const successCallback = function () {};
          datavizWebmap.getWmtsInfo(layerInfo, successCallback);
          expect(datavizWebmap.isValidResponse).toHaveBeenCalled();
          done();
        }, 1000);
    });

    it('isValidResponse', (done) => {
        var datavizWebmap = new WebMap(id, {webMap: JSON.parse(datavizWebMap_BAIDU), successCallback});
        function successCallback() {
            var response = {};
            expect(datavizWebmap.isValidResponse(response)).toBe(false);
            done();
        }
    });

    it('getReslutionsFromScales', (done) => {
        var datavizWebmap = new WebMap({webMap: JSON.parse(datavizWebMap_BAIDU), successCallback});
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
        var datavizWebmap = new WebMap({webMap: webMapObj, successCallback});
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
        var datavizWebmap = new WebMap({webMap: webMapObj, successCallback});
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
            errorCallback: function () {}
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
            errorCallback: function () {}
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
      var datavizWebmap = new WebMap(id, {});
      var layerInfo = JSON.parse(wmtsInfo);
      datavizWebmap.baseProjection = 'EPSG:1';
      datavizWebmap.getScales({...layerInfo, projection:'EPSG:1'});

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
      var datavizWebmap = new WebMap(id, {});
      var layerInfo = JSON.parse(wmtsInfo);
      datavizWebmap.baseProjection = 'EPSG:3857';
      datavizWebmap.getScales({...layerInfo, projection:'EPSG:1'});

      setTimeout(() => {
        expect(datavizWebmap.scales[0]).toBe('1:591658710.9091312');
        done();
      }, 0);
    });
    it('svg canvg', (done) => {
      let options = {
        server: server,
        successCallback,
        errorCallback: function () {}
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
});
