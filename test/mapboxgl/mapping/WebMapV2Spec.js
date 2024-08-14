import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
import * as MapManagerUtil from '../../../src/mapboxgl/mapping/webmap/MapManager';
import { createWebMapV2Extending } from '@supermapgis/iclient-common/mapping/WebMapV2';
import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';
import { createWebMapBaseExtending } from '@supermapgis/iclient-common/mapping/WebMapBase';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { WebMap } from '../../../src/mapboxgl/mapping/WebMap';
import { ArrayStatistic } from '../../../src/common/util/ArrayStatistic';
import '../../resources/WebMapV5.js';
window.jsonsql = { query: () => [{}] };

window.canvg = {
  default: {
    from: (ctx, url, callback) => Promise.resolve({ stop: jasmine.createSpy('stop'), start: jasmine.createSpy('start') })
  }
};

window.geostats = class {
  setSerie() {}
}

window.EchartsLayer = class {
  constructor() {
    this.chart = {
      setOption() {
      }
    }
  }
}

describe('mapboxgl_WebMap', () => {
    var originalTimeout, testDiv;
    var server = 'http://fack:8190/iportal/';
    var id = 1788054202;
    var datavizWebmap;
    var commonMap;
    var layerIdMapList = {};
    var sourceIdMapList = {};
    var commonOption = {
      accessKey: undefined,
      accessToken: undefined,
      excludePortalProxyUrl: undefined,
      iportalServiceProxyUrlPrefix: undefined,
      isSuperMapOnline: undefined,
      proxy: undefined,
      server: 'http://fack:8190/iportal/',
      target: 'map',
      tiandituKey: undefined,
      withCredentials: false
    };
    var commonMapOptions = {
      container: 'map',
      style: {
        version: 8,
        sources: {
          'raster-tiles': {
            type: 'raster',
            tiles: ['https://test'],
            tileSize: 256
          }
        },
        layers: [
          {
            id: 'simple-tiles',
            type: 'raster',
            source: 'raster-tiles',
            minzoom: 5,
            maxzoom: 20
          }
        ]
      },
      center: [120.143, 30.236],
      zoom: 3,
      bounds: {
        getEast: () => 2,
        getWest: () => -1,
        getSouth: () => 2,
        getNorth: () => -1
      }
    };
    const WebMapV2 = createWebMapV2Extending(
      createWebMapBaseExtending(createMapClassExtending(mapboxgl.Evented), 'fire'),
      {
        mapRepo: mapboxgl,
        MapManager: MapManagerUtil.default
      }
    );
    beforeEach(() => {
        spyOn(MapManagerUtil, 'default').and.callFake(mbglmap);
        mapboxgl.CRS = function () {};
        mapboxgl.CRS.set = function () {};
        mapboxgl.CRS.get = function() {
            return {
                unit: '',
                getExtent: () => {
                    return [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892];
                }
            };
        }
        commonMap = {
            style: {},
            resize: () => jasmine.createSpy('test'),
            getZoom: () => {
              return 2;
            },
            setZoom: () => jasmine.createSpy('test'),
            setCRS: () => jasmine.createSpy('test'),
            getCenter: () => {
              return {
                lng: 1,
                lat: 2
              };
            },
            setCenter: () => jasmine.createSpy('test'),
            getBearing: () => 2,
            setBearing: () => jasmine.createSpy('test'),
            getPitch: () => 2,
            setPitch: () => jasmine.createSpy('test'),
            getStyle: () => {
              let layers = [];
              if (layerIdMapList) {
                for (const key in layerIdMapList) {
                  layers.push(layerIdMapList[key]);
                }
              }
              return {
                sources: sourceIdMapList,
                layers
              };
            },
            addSource: (sourceId, sourceInfo) => {
              sourceIdMapList[sourceId] = sourceInfo;
              if (sourceInfo.type === 'geojson') {
                sourceIdMapList[sourceId]._data = sourceInfo.data;
                sourceIdMapList[sourceId].setData = (function (sourceId) {
                  return function (data) {
                    sourceIdMapList[sourceId]._data = data;
                  };
                })(sourceId);
              }
              if (sourceInfo.type === 'raster' && sourceInfo.rasterSource === 'iserver') {
                sourceIdMapList[sourceId].clearTiles = () => jasmine.createSpy('test');
                sourceIdMapList[sourceId].update = () => jasmine.createSpy('test');
              }
            },
            getSource: sourceId => {
              return sourceIdMapList[sourceId];
            },
            removeSource: sourceId => {
              delete sourceIdMapList[sourceId];
            },
            triggerRepaint: () => jasmine.createSpy('test'),
            style: {
              sourceCaches: sourceIdMapList
            },
            getLayer: layerId => {
              return layerIdMapList[layerId];
            },
            removeLayer: layerId => {
              delete layerIdMapList[layerId];
            },
            getCRS: () => {
              return {
                epsgCode: 'EPSG:3857',
                getExtent: () => jasmine.createSpy('test')
              };
            },
            getAppreciableLayers: () => {
              return Object.values(layerIdMapList);
            },
            addLayer: layerInfo => {
              layerIdMapList[layerInfo.id] = layerInfo;
              if (typeof layerInfo.source === 'object') {
                const source = Object.assign({}, layerInfo.source);
                layerIdMapList[layerInfo.id].source = layerInfo.id;
                commonMap.addSource(layerInfo.id, source);
              }
              if (commonMap.style) {
                if (!commonMap.style._layers) {
                  commonMap.style._layers = {};
                }
                commonMap.style._layers[layerInfo.id] = layerIdMapList[layerInfo.id];
              }
            },
            moveLayer: () => jasmine.createSpy('test'),
            overlayLayersManager: {},
            on: () => {},
            off: () => {},
            fire: () => {},
            setLayoutProperty: () => jasmine.createSpy('test'),
            setPaintProperty: jasmine.createSpy('test'),
            addStyle: () => jasmine.createSpy('test'),
            remove: () => jasmine.createSpy('test'),
            setRenderWorldCopies: () => jasmine.createSpy('test'),
            setStyle: () => jasmine.createSpy('test'),
            loadImage: function (src, callback) {
              callback(null, { width: 15 });
            },
            addImage: function () {},
            hasImage: function () {
              return false;
            }
          };
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
            datavizWebmap.clean && datavizWebmap.clean(true);
            datavizWebmap.map = null;
            datavizWebmap = null;
        }
        sourceIdMapList = {};
        layerIdMapList = {};
        commonMap.style.sourceCaches = sourceIdMapList;
        window.document.body.removeChild(testDiv);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    xit('test baseLayer layers count maploaded', done => {
      spyOn(FetchRequest, 'get').and.callFake((url) => {
        if (url.indexOf('portal.json') > -1) {
          return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
        } else if (url.indexOf('map.json') > -1) {
          return Promise.resolve(new Response(JSON.stringify(webmap_MAPBOXSTYLE_Tile)));
        } else if (url.indexOf('maps/China_4326/style.json') > -1) {
          return Promise.resolve(new Response(JSON.stringify({
            version: 8,
            sources: {
              'raster-tiles': {
                type: 'raster',
                tiles: [
                  'https://fake/iserver/services/map-china400/rest/maps/China/zxyTileImage.png?z={z}&x={x}&y={y}'
                ],
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
          })));
        }
        return Promise.resolve();
    });
      const datavizWebmap = new WebMapV2(
        id,
        {
          server: server
        }
      );
      let addStyleSpy;
      datavizWebmap.on('mapinitialized', (data) => {
        addStyleSpy = spyOn(data.map, 'addStyle');
      });
      datavizWebmap.on('addlayerssucceeded', (data) => {
        expect(addStyleSpy).toHaveBeenCalledTimes(1);
        expect(datavizWebmap.getAppreciableLayers().length).toBe(webmap_MAPBOXSTYLE_Tile.layers.length + 1);
        done();
      });
    });

    // it('add uniqueLayer with id is num', done => {
    //   spyOn(FetchRequest, 'get').and.callFake((url) => {
    //     if (url.indexOf('portal.json') > -1) {
    //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
    //     } else if (url.indexOf('map.json') > -1) {
    //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
    //     } else if (url.indexOf('datas/1960447494/content.json') > -1) {
    //       return Promise.resolve(new Response(layerData_CSV));
    //     } else if (url.indexOf('datas/144371940/content.json')) {
    //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
    //     }
    //   });
    //   const datavizWebmap = new WebMapV2(id, {
    //     server: server
    //   });
    //   const callback = function (data) {
    //     console.log('datavizWebmap.getAppreciableLayers()', datavizWebmap.getAppreciableLayers());
    //     expect(datavizWebmap.getAppreciableLayers().length).toBe(uniqueLayer_polygon.layers.length + 1);
    //     datavizWebmap.getAppreciableLayers().forEach(item => {
    //       expect(item.renderLayers.length).toBeGreaterThanOrEqual(1);
    //     })
    //     expect(datavizWebmap.map.getStyle().layers.find((item)=>{return item.type === 'fill'}).paint['fill-opacity']).toBe(1);
    //     expect(datavizWebmap.map.getStyle().layers.find((item)=>{return item.type === 'fill'}).paint['fill-color'][3]).toBe('rgba(213,62,79,0.9000)');
    //     done();
    //   };
    //   datavizWebmap.on('addlayerssucceeded', callback);
    // });

    // it('_getMapCenter 4490', done => {
    //     spyOn(FetchRequest, 'get').and.callFake((url) => {
    //       if (url.indexOf('portal.json') > -1) {
    //         return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
    //       }
    //       return Promise.resolve();
    //     });
    //     const datavizWebmap = new WebMapV2(
    //       '1791328696',
    //       {
    //         target: 'map',
    //         serverUrl: 'http://fake/fakeiportal',
    //         withCredentials: false
    //       },
    //       {
    //         style: {
    //           version: 8,
    //           sources: {},
    //           layers: []
    //         }
    //       }
    //     );
    //     datavizWebmap.initializeMap(JSON.parse(raster4490));
    //     datavizWebmap.on('mapinitialized', () => {
    //         const center = datavizWebmap.map.getCenter();
    //         expect(center.lat).toEqual(44);
    //         expect(center.lng).toEqual(129);
    //         done();
    //       }
    //     );
    //   });
  
    // it('add uniqueLayer point', (done) => {
    //   spyOn(FetchRequest, 'get').and.callFake((url) => {
    //     if (url.indexOf('datas/676516522/content.json') > -1) {
    //       return Promise.resolve(new Response(layerData_CSV));
    //     } else if (url.indexOf('datas/13136933/content.json')) {
    //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
    //     }
    //   });
    //   const id = {
    //     ...uniqueLayer_point,
    //     level: '',
    //     visibleExtent: [0, 1, 2, 3]
    //   };
    //   const datavizWebmap = new WebMapV2(id, {
    //     server: server
    //   });
    //   const callback = function (data) {
    //     expect(datavizWebmap.map).not.toBeUndefined();
    //     expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
    //     done();
    //   };
    //   datavizWebmap.on('addlayerssucceeded', callback);
    // });

    // it('add vectorLayer_polygon', done => {
    //     const id = vectorLayer_polygon;
    //     const datavizWebmap = new WebMapV2(id, { ...commonOption });
    //     const callback = function (data) {
    //       expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length);
    //       done();
    //     };
    //     datavizWebmap.on('addlayerssucceeded', callback);
    //   });

    //   it('add heatLayer', done => {
    //     spyOn(FetchRequest, 'get').and.callFake((url) => {
    //       if (url.indexOf('web/datas/1920557079/content.json') > -1) {
    //         return Promise.resolve(new Response(layerData_CSV));
    //       };
    //       return Promise.resolve();
    //     });
    //     const id = heatLayer;
    //     const datavizWebmap = new WebMapV2(id, { ...commonOption });
    //     const callback = function (data) {
    //       expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
    //       done();
    //     };
    //     datavizWebmap.on('addlayerssucceeded', callback );
    //   });

    //   it('add rangeLayer', done => {
    //     spyOn(FetchRequest, 'get').and.callFake((url) => {
    //       if (url.indexOf('web/datas/1171594968/content.json') > -1) {
    //         return Promise.resolve(new Response(layerData_CSV));
    //       };
    //       return Promise.resolve();
    //     });
    //     const id = rangeLayer;
    //     const callback = function (data) {
    //       datavizWebmap.setZoom(2);
    //       datavizWebmap.map.getZoom = function () {
    //         return 2;
    //       };
    //       datavizWebmap.map.fire('zoomend');
    //       datavizWebmap.setZoom(5);
    //       datavizWebmap.map.getZoom = function () {
    //         return 5;
    //       };
    //       datavizWebmap.map.fire('zoomend');
    //       expect(data).not.toBeUndefined();
    //       done();
    //     };
    //     const datavizWebmap = new WebMapV2(id, { ...commonOption });
    //     datavizWebmap.on('addlayerssucceeded', callback);
    //   });

      // it('setRenderWorldCopies', (done) => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      //     } else if (url.indexOf('datas/1960447494/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('datas/144371940/content.json')) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      //     }
      //   });
      //   const renderWorldCopies = true;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //   const spy = spyOn(datavizWebmap.map, 'setRenderWorldCopies');
      //   expect(spy).not.toHaveBeenCalled();
      //   datavizWebmap.setRenderWorldCopies(renderWorldCopies);
      //   expect(spy).toHaveBeenCalled();
      //   done();
      // });

      // it('getFilterFeatures 2020年人口总数', (done) => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('web/maps/test/map.json') > -1) {
      //       return Promise.resolve(new Response(raster4490));
      //     }
      //     return Promise.resolve();
      //   });
      //   const datavizWebmap = new WebMapV2(
      //     'test',
      //     {
      //       target: 'map',
      //       serverUrl: 'http://fake/fakeiportal',
      //       withCredentials: false
      //     },
      //     {
      //       style: {
      //         version: 8,
      //         sources: {},
      //         layers: []
      //       }
      //     }
      //   );
    
      //   datavizWebmap.on('mapinitialized', () => {
      //       datavizWebmap._handler._updateDataFlowFeature = jasmine.createSpy('test');
      //       datavizWebmap._handler._handleDataflowFeatures(
      //         {
      //           filterCondition: '2020年人口总数>10',
      //           pointStyle: {
      //             "fillColor": "#ee4d5a",
      //             "strokeWidth": 1,
      //             "fillOpacity": 0.9,
      //             "radius": 8,
      //             "strokeColor": "#ffffff",
      //             "type": "BASIC_POINT",
      //             "strokeOpacity": 1
      //           },
      //           layerID: 'test-empty'
      //         },
      //         { data: JSON.stringify({ properties: { '2020年人口总数': 15 } }) }
      //       );
      //       const res = datavizWebmap._handler.getFilterFeatures('2020年人口总数>10', [{ properties: { '2020年人口总数': 15 } }]);
      //       expect(res.length).toBe(1);
      //       const res1 = datavizWebmap._handler.getFilterFeatures('气压传感器海拔高度（米）>2000', [
      //         { properties: { '气压传感器海拔高度（米）': 15 } }
      //       ]);
      //       expect(res1.length).toBe(1);
      //       done();
      //     }
      //   );
      // });
      xit('request wkt info with EPSFG Prefix and test visibleExtend', (done) => {
        const epsgeCode = 'EPSG:1000';
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('datas/676516522/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('datas/13136933/content.json')) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
          } else if (url.indexOf('rest/maps/ChinaDark/prjCoordSys.wkt')) {
            return Promise.resolve(new Response(epsgeCode));
          } else if (url.indexOf('rest/maps/ChinaDark.json')) {
            return Promise.resolve(new Response(mapJson));
          }
        });
        const mapOptions = {
          ...commonMapOptions,
          bounds: undefined,
          interactive: true,
          minZoom: 22,
          maxZoom: 0
        };
        const errorSpy = spyOn(console, 'error').and.callFake(() => {});
        new WebMapV2(uniqueLayer_point, { ...commonOption, map: commonMap }, mapOptions);
        setTimeout(() => {
          expect(errorSpy.mock.calls).toEqual([]);
          done();
        }, 2000);
      });

      // it('request wkt info and visibleExtend without EPSFG Prefix ', (done) => {
      //   const epsgeCode =
      //     'PROJCS["Google Maps Global Mercator",GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563,AUTHORITY["EPSG","7030"]],AUTHORITY["EPSG","6326"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.01745329251994328,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4326"]],PROJECTION["Mercator_2SP"],PARAMETER["standard_parallel_1",0],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",0],PARAMETER["false_easting",0],PARAMETER["false_northing",0],AXIS["Northing", "NORTH"],AXIS["Easting", "EAST"],UNIT["Meter",1],EXTENSION["PROJ4","+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +wktext  +no_defs"],AUTHORITY["EPSG","900913"]]';
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/676516522/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('web/datas/13136933/content.json')) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      //     };
      //   });
      //   const id = { ...uniqueLayer_point, projection: epsgeCode };
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption });
      //   datavizWebmap.on('addlayerssucceeded', callback);
      // });

      // multi-coordinate 没有

      // it('layerType is VECTOR and multi style points', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/1920557079/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('web/datas/13136933/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      //     }
      //     return Promise.resolve();
      //   });
      //   const id = vectorLayer_point;
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, undefined);
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      // it('test getSource is empty', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/1920557079/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     };
      //     return Promise.resolve();
      //   });
      //   const style = vectorLayer_line.layers[0].style;
      //   const roadId = {
      //     ...vectorLayer_line,
      //     layers: [
      //       {
      //         ...vectorLayer_line.layers[0],
      //         style: [style, style]
      //       }
      //     ]
      //   };
      //   const mapOptions = undefined;
      //   const map = {
      //     ...commonMap,
      //     getSource: () => ''
      //   };
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(roadId.layers.length + 1);
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(roadId, { ...commonOption }, mapOptions, map);
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      // it('add vectorLayer_line subway and set dash style', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/1920557079/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     };
      //     return Promise.resolve();
      //   });
      //   const style = vectorLayer_line.layers[0].style;
      //   const subwayId = {
      //     ...vectorLayer_line,
      //     layers: [
      //       {
      //         ...vectorLayer_line.layers[0],
      //         style: [
      //           style,
      //           {
      //             ...style,
      //             lineDash: 'dash'
      //           }
      //         ]
      //       }
      //     ]
      //   };
      //   const callback = function (data) {
          
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(subwayId.layers.length + 1);
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(subwayId, { ...commonOption, map: commonMap }, undefined);
      //   datavizWebmap.on('addlayerssucceeded', callback);
      // });

      // it('add rangeLayer last end === fieldValue', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/1171594968/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     };
      //     return Promise.resolve();
      //   });
      //   const id = rangeLayer;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption });
      //   const callback = () => {
      //     const mockFun = spyOn(datavizWebmap._handler, '_addOverlayToMap');
      //     datavizWebmap._handler.getRangeStyleGroup = () => {
      //       return [
      //         {
      //           style: {
      //             strokeWidth: 1,
      //             fillColor: '#ffc6c4',
      //             fillOpacity: 0.9,
      //             lineDash: 'solid',
      //             strokeColor: '#ffffff',
      //             type: 'POLYGON',
      //             strokeOpacity: 1
      //           },
      //           color: '#ffc6c4',
      //           start: 20000000000.98,
      //           end: 333333350000000000
      //         },
      //         {
      //           style: {
      //             strokeWidth: 1,
      //             fillColor: '#f4a3a8',
      //             fillOpacity: 0.9,
      //             lineDash: 'solid',
      //             strokeColor: '#ffffff',
      //             type: 'POLYGON',
      //             strokeOpacity: 1
      //           },
      //           color: '#f4a3a8',
      //           start: 333333350000000000,
      //           end: 666666680000000000
      //         },
      //         {
      //           style: {
      //             strokeWidth: 1,
      //             fillColor: '#e38191',
      //             fillOpacity: 0.9,
      //             lineDash: 'solid',
      //             strokeColor: '#ffffff',
      //             type: 'POLYGON',
      //             strokeOpacity: 1
      //           },
      //           color: '#e38191',
      //           start: 666666680000000000,
      //           end: 1000000010000000000
      //         },
      //         {
      //           style: {
      //             strokeWidth: 1,
      //             fillColor: '#cc607d',
      //             fillOpacity: 0.9,
      //             lineDash: 'solid',
      //             strokeColor: '#ffffff',
      //             type: 'POLYGON',
      //             strokeOpacity: 1
      //           },
      //           color: '#cc607d',
      //           start: 1000000010000000000,
      //           end: 1333333340000000000
      //         },
      //         {
      //           style: {
      //             strokeWidth: 1,
      //             fillColor: '#ad466c',
      //             fillOpacity: 0.9,
      //             lineDash: 'solid',
      //             strokeColor: '#ffffff',
      //             type: 'POLYGON',
      //             strokeOpacity: 1
      //           },
      //           color: '#ad466c',
      //           start: 1333333340000000000,
      //           end: 1666666670000000000
      //         },
      //         {
      //           style: {
      //             strokeWidth: 1,
      //             fillColor: '#8b3058',
      //             fillOpacity: 0.9,
      //             lineDash: 'solid',
      //             strokeColor: '#ffffff',
      //             type: 'POLYGON',
      //             strokeOpacity: 1
      //           },
      //           color: '#8b3058',
      //           start: 1666666670000000000,
      //           end: 2000000000000000000
      //         }
      //       ];
      //     };
      //     const layerInfo = {
      //       layerType: 'RANGE',
      //       visible: 'visible',
      //       themeSetting: {
      //         themeField: 'TAX',
      //         customSettings: {},
      //         segmentMethod: 'offset',
      //         segmentCount: 6,
      //         colors: ['#ffc6c4', '#f4a3a8', '#e38191', '#cc607d', '#ad466c', '#8b3058', '#672044']
      //       },
      //       name: 'DataSource:DEMARCACION_TERRITORIAL_Tax',
      //       featureType: 'POLYGON',
      //       style: {
      //         strokeWidth: 1,
      //         fillColor: '#8b3058',
      //         fillOpacity: 0.9,
      //         lineDash: 'solid',
      //         strokeColor: '#ffffff',
      //         type: 'POLYGON',
      //         strokeOpacity: 1
      //       },
      //       projection: 'EPSG:4326',
      //       enableFields: ['TAX'],
      //       dataSource: {
      //         type: 'REST_DATA',
      //         url: 'http://test:8090/iserver/services/data-JSON_test/rest/data',
      //         dataSourceName: 'DataSource:DEMARCACION_TERRITORIAL_Tax'
      //       },
      //       layerID: 'DataSource:DEMARCACION_TERRITORIAL_Tax'
      //     };
      //     const features = [
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.0E18',
      //           index: '0'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 1
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.00000000000098E12',
      //           index: '1'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 2
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '2'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 3
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '3'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 4
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '4'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 5
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '5'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 6
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '6'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 7
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '7'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 8
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '8'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 9
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '9'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 10
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '10'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 11
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '11'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 12
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '12'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 13
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '13'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 14
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '14'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 15
      //       },
      //       {
      //         type: 'Feature',
      //         properties: {
      //           TAX: '2.000000000098E10',
      //           index: '15'
      //         },
      //         geometry: {
      //           type: 'MultiPolygon'
      //         },
      //         id: 16
      //       }
      //     ];
      //     datavizWebmap._handler._createRangeLayer(layerInfo, features);
      //     expect(mockFun).toHaveBeenCalledTimes(2);
      //     done();
      //   }
      //   datavizWebmap.on('mapinitialized', callback);
      // });

      xit('add markerLayer correctly', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('web/datas/123456/content.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
          };
          return Promise.resolve();
        });
        const id = markerLayer;
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBeGreaterThan(id.layers.length + 1);
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      // it('add markerLayer layerOrder correctly', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/123456/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
      //     };
      //     return Promise.resolve();
      //   });
      //   const id = markerLayer;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBeGreaterThanOrEqual(id.layers.length + 1);
      //     const layers = data.map.getStyle().layers;
      //     expect(layers[layers.length - 2].id).toBe('民航数-TEXT-7');
      //     expect(layers[layers.length - 1].type).toBe('circle');
      //     expect(layers[layers.length - 1].paint['circle-color']).toBe('#de2b41');
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded', callback);
      // });
    
      // it('markerLayer url is error', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/123456/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify({
      //         ...layerData_geojson['MARKER_GEOJSON'],
      //         content:
      //           '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"fillColor":"#FFF","fillOpacity":"0.6","strokeColor":"#fff","strokeOpacity":"0,6","strokeWidth":"400","src":"apps/dataviz/static/imgs/markers/mark_red.svg","scale":1,"anchor":[0.5,0.5],"imgWidth":48,"imgHeight":43},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[103.59008789062496,30.31598771855792]}}]}'
      //       })));
      //     };
      //     return Promise.resolve();
      //   });
      //   const id = markerLayer;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption });
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      xit('markerLayer point linstring and text', done => {
        const content = '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"strokeColor":"#0081E2","strokeOpacity":1,"strokeWidth":5,"lineCap":"round","lineDash":"solid"},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"LineString","coordinates":[[103.21230856170534,35.93252826339496],[96.80142450317665,31.772281946203208]]}},{"type":"Feature","properties":{"dataViz_title":"这是文字"},"dv_v5_markerStyle":{"text":"这是文字","font":"33px 宋体","placement":"point","textAlign":"right","fillColor":"#595959","backgroundFill":"#ee8b8b","borderColor":"rgba(255,255,255,0)","borderWidth":4,"padding":[8,8,8,8],"maxWidth":358},"dv_v5_markerInfo":{"dataViz_title":"这是文字"},"geometry":{"type":"Point","coordinates":[101.56249999999991,26.728112105878537]}},{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"src":"http://172.16.14.44:8190/iportal/apps/dataviz/static/imgs/markers/mark_red.png","scale":1,"anchor":[0.5,0.5],"imgWidth":48,"imgHeight":43},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[93.72012106170533,30.646288585669723]}},{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"src":"http://172.16.14.44:8190/iportal/apps/dataviz/static/imgs/markers//ktv_red.png","scale":1,"anchor":[0.5,0.5],"imgWidth":48,"imgHeight":43},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[95.91738668670534,35.145840549134476]}},{"type":"Feature","properties":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"dv_v5_markerStyle":{"radius":10,"fillColor":"#53C41A","fillOpacity":0.73,"strokeColor":"#e20057","strokeOpacity":1,"strokeWidth":4},"dv_v5_markerInfo":{"dataViz_title":"","dataViz_description":"","dataViz_imgUrl":"","dataViz_url":"","dataViz_videoUrl":""},"geometry":{"type":"Point","coordinates":[101.36660543670533,38.107643862311676]}}]}';
        const newLayerData_geojson = {
          ...layerData_geojson['MARKER_GEOJSON'],
          content 
        };
        const contentData = JSON.parse(content);
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('web/datas/123456/content.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(newLayerData_geojson)));
          };
          return Promise.resolve();
        });
        const layers = [{
          layerType: 'MARKER',
          visible: true,
          name: '未命名标注图层1',
          serverId: '1795361105'
        }];
        const id = {
          ...markerLayer,
          layers
        };
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        const callback = function (data) {
          const appreciableLayers = datavizWebmap.getAppreciableLayers();
          expect(appreciableLayers.length).toBe(contentData.features.length + 1);
          const layerID = layers[0].name;
          const firstMarkerLayer = appreciableLayers.find(item => item.id === layerID);
          expect(firstMarkerLayer).toBeTruthy();
          expect(firstMarkerLayer.type).toBe('line');
          expect(appreciableLayers.some(item => item.id.includes(`${layerID}-LINESTRING`))).toBeFalsy();
          expect(appreciableLayers.some(item => item.id.includes(`${layerID}-TEXT`))).toBeTruthy();
          expect(appreciableLayers.filter(item => item.id.includes(`${layerID}-POINT-`))).toHaveLength(3);
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      // it('add migrationLayer', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/1184572358/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     };
      //     return Promise.resolve();
      //   });
      //   const id = migrationLayer;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption });
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toEqual(data.layers.length);
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded', callback);
      // });
    
      xit('add ranksymbolLayer', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('web/datas/676516522/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          };
          return Promise.resolve();
        });
        const id = ranksymbolLayer;
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      xit('add dataflow and update', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('web/datas/676516522/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('iserver/services/dataflowTest/dataflow.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.dataflow)));
          } else if (url.indexOf('iserver/services/dataflowTest/dataflow/broadcast') > -1) {
            return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.broadcast)));
          } else if (url.indexOf('iserver/services/dataflowTest/dataflow/subscribe') > -1) {
            return Promise.resolve(new Response(JSON.stringify(dataflowLayerData.subscribe)));
          }
          return Promise.resolve();
        });
        const datavizWebmap = new WebMapV2(dataflowLayer, { ...commonOption, map: commonMap }, undefined);
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBeGreaterThanOrEqual(data.layers.length);
          datavizWebmap.updateOverlayLayer({ ...dataflowLayer.layers[0], id: dataflowLayer.layers[0].name } );
          expect(() => {
            datavizWebmap.updateOverlayLayer({ ...dataflowLayer.layers[0], id: dataflowLayer.layers[0].name } );
          }).not.toThrow();
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });

      // it('setBearing', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      //     } else if (url.indexOf('datas/1960447494/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('datas/144371940/content.json')) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      //     }
      //   });
      //   const bearing = 0;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
        
      //   const spy = spyOn(datavizWebmap.map, 'setBearing');
      //   expect(datavizWebmap.mapOptions.bearing).toBeUndefined();
      //   datavizWebmap.setBearing();
      //   expect(datavizWebmap.mapOptions.bearing).toBeUndefined();
      //   expect(spy).not.toHaveBeenCalled();
      //   datavizWebmap.setBearing(bearing);
      //   expect(datavizWebmap.mapOptions.bearing).not.toBeUndefined();
      //   expect(spy).toHaveBeenCalled();
      //   done();
      // });
    
      // it('setPitch', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      //     } else if (url.indexOf('datas/1960447494/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('datas/144371940/content.json')) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      //     }
      //   });
      //   const pitch = 0;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //   const spy = spyOn(datavizWebmap.map, 'setPitch');
      //   expect(datavizWebmap.mapOptions.pitch).toBeUndefined();
      //   datavizWebmap.setPitch();
      //   expect(spy).not.toHaveBeenCalled();
      //   datavizWebmap.setPitch(pitch);
      //   expect(datavizWebmap.mapOptions.pitch).not.toBeUndefined();
      //   expect(spy).toHaveBeenCalled();
      //   done();
      // });
    
      xit('setStyle', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
          } else if (url.indexOf('datas/1960447494/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('datas/144371940/content.json')) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
          }
        });
        const style = {
          layers: [{id: 'test'}],
          color: '#fff'
        };
        const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
        
        const spy = spyOn(datavizWebmap, '_initWebMap');
        datavizWebmap.on({
          addlayerssucceeded: e => {
            expect(e.map).not.toBeNull();
            done();
          }
        });
        datavizWebmap.setMapId('');
        datavizWebmap.setStyle(style);
        expect(spy).toHaveBeenCalled();
        expect(datavizWebmap.mapOptions.style).toEqual(style);
      });
    
      xit('setRasterTileSize', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
          } else if (url.indexOf('datas/1960447494/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('datas/144371940/content.json')) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
          }
        });
        const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
        datavizWebmap.on(
          'addlayerssucceeded', () => {
            const spy = spyOn(datavizWebmap._handler, '_updateRasterSource');
            datavizWebmap.setRasterTileSize(-1);
            expect(spy).not.toHaveBeenCalled();
            datavizWebmap.setRasterTileSize(2);
            expect(spy).toHaveBeenCalled();
            done();
          }
        );
      });
    
      xit('setLayersVisible', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
          } else if (url.indexOf('datas/1960447494/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('datas/144371940/content.json')) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
          }
        });
        const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
        const callback = function (data) {
          const appreciableLayers = datavizWebmap.getAppreciableLayers();
          const renderLayersLen = appreciableLayers.reduce((sum, item) => {
            return sum + item.renderLayers.length;
          }, 0);
          expect(appreciableLayers.length).toBe(uniqueLayer_polygon.layers.length + 1);
          expect(datavizWebmap.cacheLayerIds.length).toBe(renderLayersLen);
          const ignoreIds = ['China'];
          const spy1 = spyOn(datavizWebmap.map, 'setLayoutProperty');
          datavizWebmap.setLayersVisible(false, ignoreIds);
          expect(spy1.mock.calls.length).toBe(renderLayersLen - 1);
          spy1.mockClear();
          const spy2 = spyOn(datavizWebmap.map, 'setLayoutProperty');
          datavizWebmap.setLayersVisible(true);
          expect(spy2.mock.calls.length).toBe(renderLayersLen);
          spy1.mockClear();
          spy2.mockClear();
          const viewModel2 = new WebMapV2(
            id,
            { ...commonOption, checkSameLayer: true },
            { ...commonMapOptions },
            data.map
          );
          viewModel2.on(
            'addlayerssucceeded', () => {
              const appreciableLayers = viewModel2.getAppreciableLayers();
              expect(appreciableLayers.length).toBe(uniqueLayer_polygon.layers.length);
              const renderLayersLen = appreciableLayers.reduce((sum, item) => {
                return sum + item.renderLayers.length;
              }, 0) + 1;
              expect(viewModel2.cacheLayerIds.length).toBe(renderLayersLen);
              const ignoreIds = ['China'];
              const spy1 = spyOn(viewModel2.map, 'setLayoutProperty');
              viewModel2.setLayersVisible(false, ignoreIds);
              expect(spy1.mock.calls.length).toBe(renderLayersLen - 1);
              spy1.mockClear();
              const spy2 = spyOn(viewModel2.map, 'setLayoutProperty');
              viewModel2.setLayersVisible(true);
              expect(spy2.mock.calls.length).toBe(renderLayersLen);
              done();
            });
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      xit('cleanLayers', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
          } else if (url.indexOf('datas/1960447494/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('datas/144371940/content.json')) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
          }
        });
        const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBe(uniqueLayer_polygon.layers.length + 1);
          expect(datavizWebmap._cacheCleanLayers.length).not.toBe(0);
          datavizWebmap.cleanLayers();
          expect(datavizWebmap._cacheCleanLayers.length).toBe(0);
          const getSourceSpy = spyOn(data.map, 'getSource').and.callFake(() => true);
          const removeSourceSpy = spyOn(data.map, 'removeSource');
          datavizWebmap._cacheCleanLayers = [{
            renderLayers: ['layer1'],
            renderSource: { id: 'source1' },
            l7Layer: true
          }, {
            renderLayers: ['layer2'],
            renderSource: { id: 'source2' }
          }];
          datavizWebmap.cleanLayers();
          expect(getSourceSpy).toHaveBeenCalledTimes(2);
          expect(removeSourceSpy).toHaveBeenCalledTimes(1);
          expect(datavizWebmap._cacheCleanLayers.length).toBe(0);
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });

      // it('updateOverlayLayer unique', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      //     } else if (url.indexOf('datas/1960447494/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('datas/144371940/content.json')) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      //     }
      //   });
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //   const callback = function (data) {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(uniqueLayer_polygon.layers.length + 1);
      //     const layerInfo = { ...uniqueLayer_polygon.layers[0], id: uniqueLayer_polygon.layers[0].name };
      //     const features = [{
      //       type: "Feature",
      //       geometry: {
      //         type: "Point",
      //         coordinates: [
      //           116.588918,
      //           40.07108,
      //         ],
      //       },
      //       properties: {
      //         latitude: "40.07108",
      //         longitude: "116.588918",
      //         altitude: "",
      //         geometry: "Point",
      //         "机场": "北京/首都",
      //         "X坐标": "116.588918",
      //         "Y坐标": "40.07108",
      //         "名次": "1",
      //         "2017旅客吞吐量（人次）": "95786296 ",
      //         "2016旅客吞吐量（人次）": "94393454 ",
      //         "同比增速%": "-1.5",
      //         "张家界": "94393454 ",
      //         index: "0",
      //       },
      //     }];
      //     const spy = spyOn(datavizWebmap._handler, '_initOverlayLayer');
      //     datavizWebmap.updateOverlayLayer(layerInfo, features);
      //     expect(spy).toHaveBeenCalled();
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      xit('updateOverlayLayer GraphicLayer', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('web/datas/1920557079/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('web/datas/13136933/content.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
          }
          return Promise.resolve();
        });
        const id = vectorLayer_point;
        const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, undefined);
        const callback = function (data) {
          const sourceData1 = data.map.getSource('浙江省高等院校(3)')._data.features;
          expect(sourceData1.length).toBe(2);
          const layerInfo = { ...vectorLayer_point.layers[0], id: vectorLayer_point.layers[0].name };
          const features = [
            {
              type: 'Feature',
              properties: {
                '机场': '上海/浦东',
                'X坐标': '121.812361 ',
                'Y坐标': '31.093992 ',
                '名次': '2',
                '2017旅客吞吐量（人次）': '70,001,237 ',
                '2016旅客吞吐量（人次）': '66,002,414 ',
                '同比增速%': '3.5 ',
                '2017货邮吞吐量（吨）': '3,824,279.9 ',
                '2016货邮吞吐量（吨）': '3,440,279.7 ',
                '2017起降架次（架次）': '496,774 ',
                '2016起降架次（架次）': '479,902 ',
                index: 1
              },
              geometry: { type: 'Point', coordinates: [Array] }
            }
          ]
          const spy = spyOn(datavizWebmap._handler, '_createGraphicLayer');
          datavizWebmap.updateOverlayLayer(layerInfo, features);
          expect(spy).toHaveBeenCalled();
          const sourceData2 = data.map.getSource('浙江省高等院校(3)')._data.features;
          expect(sourceData2.length).toBe(1);
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      // it('add baselayer which is baidu', done => {
      //   const callback = function (data) {
      //     expect(data).not.toBeUndefined();
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(baseLayers['BAIDU']);
      //   datavizWebmap.on('notsupportbaidumap', callback);
      // });

      // it('isvj-5215', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('web/maps/test/map.json') > -1) {
      //       return Promise.resolve(new Response(raster4490));
      //     }
      //     return Promise.resolve();
      //   });
      //   const datavizWebmap = new WebMapV2(
      //     'test',
      //     {
      //       target: 'map',
      //       serverUrl: 'http://fake/fakeiportal',
      //       withCredentials: false
      //     },
      //     {
      //       style: {
      //         version: 8,
      //         sources: {},
      //         layers: []
      //       }
      //     }
      //   );
      //   const parameters = {
      //     layerType: 'UNIQUE',
      //     visible: true,
      //     themeSetting: {
      //       themeField: 'UserID',
      //       customSettings: {
      //         0: {
      //           fillColor: '#D53E4F',
      //           strokeWidth: 1,
      //           offsetX: 0,
      //           offsetY: 0,
      //           fillOpacity: 0.9,
      //           type: 'BASIC_POINT',
      //           radius: 15,
      //           strokeColor: '#ffffff',
      //           strokeOpacity: 1
      //         },
      //         1: {
      //           fillColor: '#3288BD',
      //           strokeWidth: 1,
      //           offsetX: 0,
      //           offsetY: 0,
      //           fillOpacity: 0.9,
      //           type: 'BASIC_POINT',
      //           radius: 15,
      //           strokeColor: '#ffffff',
      //           strokeOpacity: 1
      //         },
      //         2: {
      //           fillColor: '#FC8D59',
      //           strokeWidth: 1,
      //           offsetX: 0,
      //           offsetY: 0,
      //           fillOpacity: 0.9,
      //           type: 'BASIC_POINT',
      //           radius: 15,
      //           strokeColor: '#ffffff',
      //           strokeOpacity: 1
      //         },
      //         3: {
      //           fillColor: '#99D594',
      //           strokeWidth: 1,
      //           offsetX: 0,
      //           offsetY: 0,
      //           fillOpacity: 0.9,
      //           type: 'BASIC_POINT',
      //           radius: 15,
      //           strokeColor: '#ffffff',
      //           strokeOpacity: 1
      //         },
      //         5: {
      //           fillColor: '#FEE08B',
      //           strokeWidth: 1,
      //           offsetX: 0,
      //           offsetY: 0,
      //           fillOpacity: 0.9,
      //           type: 'BASIC_POINT',
      //           radius: 15,
      //           strokeColor: '#ffffff',
      //           strokeOpacity: 1
      //         },
      //         8: {
      //           fillColor: '#E6F598',
      //           strokeWidth: 1,
      //           offsetX: 0,
      //           offsetY: 0,
      //           fillOpacity: 0.9,
      //           type: 'BASIC_POINT',
      //           radius: 15,
      //           strokeColor: '#ffffff',
      //           strokeOpacity: 1
      //         }
      //       },
      //       colors: ['#D53E4F', '#FC8D59', '#FEE08B', '#FFFFBF', '#E6F598', '#99D594', '#3288BD']
      //     },
      //     name: 'isvj-5215',
      //     featureType: 'POINT',
      //     labelStyle: {
      //       offsetX: 0,
      //       textBaseline: 'bottom',
      //       fontFamily: '黑体',
      //       offsetY: -19,
      //       outlineWidth: 0,
      //       textAlign: 'center',
      //       outlineColor: '#000000',
      //       fontSize: '14px',
      //       fill: '#333',
      //       backgroundFill: [255, 255, 255, 0.8],
      //       labelField: 'UserID'
      //     },
      //     style: {
      //       strokeWidth: 1,
      //       offsetX: 0,
      //       fillColor: '#E6F598',
      //       offsetY: 0,
      //       fillOpacity: 0.9,
      //       radius: 15,
      //       strokeColor: '#ffffff',
      //       type: 'BASIC_POINT',
      //       strokeOpacity: 1
      //     },
      //     projection: 'EPSG:4326',
      //     enableFields: ['UserID']
      //   };
      //   datavizWebmap.on(
      //     'mapinitialized', () => {
      //       datavizWebmap._updateDataFlowFeature = jasmine.createSpy();
      //       const res = datavizWebmap._handler.getUniqueStyleGroup(parameters, [
      //         { properties: { UserID: 30 } },
      //         { properties: { UserID: 0 } }
      //       ]);
      //       expect(res.length).toBe(2);
      //       done();
      //     });
      // });
      xit('crs not support', done => {
        const datavizWebmap = new WebMapV2(baseLayers['BAIDU']);
        const callback = ({ error }) => {
          expect(error.message).toBe('webmap.crsNotSupport');
          done();
        };
        datavizWebmap.on('getmapinfofailed', callback);
      });
    
      // it('add baselayer which is bing', done => {
      //   const metaInfo = {
      //     resourceSets: [
      //       {
      //           "resources": [
      //               {
      //                   "__type": "ImageryMetadata:http://schemas.microsoft.com/search/local/ws/rest/v1",
      //                   "imageHeight": 256,
      //                   "imageUrl": "https://{subdomain}.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&it=G,L&shading=hill&og=2505&n=z",
      //                   "imageUrlSubdomains": [
      //                       "t0",
      //                       "t1",
      //                       "t2",
      //                       "t3"
      //                   ],
      //                   "imageWidth": 256,
      //               }
      //           ]
      //       }
      //   ],
      //     statusCode: 200,
      //     statusDescription: "OK"
      //   }
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('Imagery/Metadata/RoadOnDemand') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(metaInfo)));
      //     }
      //     return Promise.resolve();
      //   });
      //   const callback = function (data) {
      //     expect(data).not.toBeUndefined();
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(baseLayers['BING'], {
      //     bingMapsKey: 'AhOVlIlR89XkNyDsXBAb7TjabrEokPoqhjk4ncLm9cQkJ5ae_JyhgV1wMcWnVrko'
      //   });
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      // it('add baselayer which is goole_cn', done => {
      //   const callback = function (data) {
      //     expect(data).not.toBeUndefined();
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2(baseLayers['GOOGLE']);
      //   datavizWebmap.on('addlayerssucceeded', callback);
      // });

      xit('add wmsLayer with correct url and version is less than 1.3', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map-world/wms130') > -1) {
            return Promise.resolve(new Response(wmsCapabilitiesText));
          }
          return Promise.resolve();
        });
        const mapData = {
          ...wmsLayer,
          layers: [
            {
              ...wmsLayer.layers[0],
              url: 'http://fake/iserver/services/map-world/wms130/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day'
            }
          ]
        };
        const datavizWebmap = new WebMapV2(mapData);
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBe(mapData.layers.length + 1);
          expect(data).not.toBeUndefined();
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      xit('add wmsLayer with correct url and version is 1.3.0', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map-world/wms130') > -1) {
            return Promise.resolve(new Response(wmsCapabilitiesTextWith130));
          }
          return Promise.resolve();
        });
        const callback = function (data) {
          expect(data).not.toBeUndefined();
          expect(data.map.getSource('世界地图_Day').tiles[0].indexOf('{bbox-wms-1.3.0}')).toBeGreaterThan(
            -1
          );
          done();
        };
        const datavizWebmap = new WebMapV2({
          ...wmsLayer,
          projection: 'EPSG:4326',
          center: { x: 0, y: 0 },
          layers: [
            {
              ...wmsLayer.layers[0],
              url: 'http://fack/iserver/services/map-world/wms130/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day?'
            }
          ]
        });
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      xit('add wmtsLayer with correct url', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map-china400/wmts100') > -1) {
            return Promise.resolve(new Response(wmtsCapabilitiesText));
          }
          return Promise.resolve();
        });
        const datavizWebmap = new WebMapV2(baseLayers['WMTS'], { ...commonOption });
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBe(baseLayers['WMTS'].layers.length + 1);
          expect(data).not.toBeUndefined();
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      // it('add wmtsLayer with error url', done => {
      //   const callback = function (data) {
      //     expect(data).not.toBeUndefined();
      //     done();
      //   };
      //   const datavizWebmap = new WebMapV2({
      //     ...wmtsLayer,
      //     layers: [{ ...wmtsLayer.layers[0], url: '/iserver/services/map-china400/wmts100' }]
      //   });
      //   datavizWebmap.on('getmapinfofailed', callback);
      // });

      // it('tile layer', done => {
      //   const datavizWebmap = new WebMapV2(
      //     restmapLayer,
      //     { ...commonOption, ignoreBaseProjection: true, map: commonMap },
      //     { ...commonMapOptions }
      //   );
      //   setTimeout(() => {
      //     expect(datavizWebmap._handler._layerTimerList.length).not.toBe(0);
      //     done();
      //   }, 2000);
      // });

      // it('other layer except tile layer', done => {
      //   const datavizWebmap = new WebMapV2(heatLayer, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //  setTimeout(() => {
      //     expect(datavizWebmap._handler._layerTimerList.length).not.toBe(0);
      //     done();
      //  }, 2000);
      // });

      // it('different projection', done => {
      //   const callback = function (data) {
      //     expect(data).not.toBeUndefined();
      //     done();
      //   };
      //   const map = {
      //     ...commonMap,
      //     getCRS: () => {
      //       return {
      //         epsgCode: 'EPSG:4326',
      //         getExtent: () => jasmine.createSpy('getExtent')
      //       };
      //     }
      //   };
      //   const datavizWebmap = new WebMapV2(restmapLayer, { ...commonOption, map: map }, {});
      //   datavizWebmap.on('projectionisnotmatch', callback);
      // });

      xit('add online map', done => {
        const datavizWebmap = new WebMapV2(baseLayers['TILE'], {
          isSuperMapOnline: true,
          serverUrl: 'https://www.supermapol.com'
        });
        const {
          baseLayer: { url }
        } = baseLayers['TILE'];
        const mockTileUrl =
          `${url}/tileimage.png?scale=3.380327143205318e-9&x=1&y=0&width=256&height=256&transparent=true&redirect=false&cacheEnabled=true&origin=%7B%22x%22%3A-20037508.3427892%2C%22y%22%3A20037508.3427892%7D`.replace(
            'https://',
            'http://'
          );
        setTimeout(() => {
          const transformed = datavizWebmap.map.options.transformRequest(mockTileUrl, 'Tile');
          expect(transformed.url).toMatch('https://www.supermapol.com/apps/viewer/getUrlResource.png?url=');
          done();
        }, 1000);
      });
      // it('add iportal map', done => {
      //   const datavizWebmap = new WebMapV2(baseLayers['BAIDU']);
      //   const mockTileUrl = '';
      //   setTimeout(() => {
      //     const transformed = datavizWebmap.map.options.transformRequest(mockTileUrl);
      //     expect(transformed.url).toBe(mockTileUrl);
      //     done();
      //   }, 1000);
      // });
   
      // it('test fadeDuration', done => {
      //   const tiles = [
      //     'https://t0.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t1.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t2.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t3.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t4.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t5.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t6.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t7.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}'
      //   ];
      //   const mapOptions = {
      //     style: {
      //       version: 8,
      //       sources: {
      //         baseLayer: {
      //           type: 'raster',
      //           tiles,
      //           tileSize: 256
      //         }
      //       },
      //       layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
      //     },
      //     center: [107.7815, 39.9788],
      //     zoom: 5,
      //     renderWorldCopies: false,
      //     crs: {
      //       epsgCode: 'EPSG:3857'
      //     },
      //     minzoom: 0,
      //     maxzoom: 22
      //   };
      //   const datavizWebmap = new WebMapV2('', { ...commonOption }, { ...mapOptions, fadeDuration: 300 });
      //   setTimeout(() => {
      //     expect(datavizWebmap.map).not.toBeUndefined();
      //     done();
      //   }, 1000);
      // });
      xit('test transformRequest when proxy is string', done => {
        const proxyStr = 'http://localhost:8080/iportal/apps/viewer/getUrlResource.png?url=';
        const tiles = [
          'https://t0.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t1.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t2.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t3.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t4.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t5.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t6.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
          'https://t7.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}'
        ];
        const mapOptions = {
          style: {
            version: 8,
            sources: {
              baseLayer: {
                type: 'raster',
                tiles,
                tileSize: 256
              }
            },
            layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
          },
          center: [107.7815, 39.9788],
          zoom: 5,
          renderWorldCopies: false,
          crs: {
            epsgCode: 'EPSG:3857'
          },
          minzoom: 0,
          maxzoom: 22
        };
        const datavizWebmap = new WebMapV2('', { ...commonOption, proxy: proxyStr }, { ...mapOptions });
        setTimeout(() => {
          const mockTileUrl = tiles[0].replace('{x}', 6).replace('{y}', 8).replace('{z}', 10);
          const transformed = datavizWebmap._handler.mapOptions.transformRequest(mockTileUrl, 'Tile');
          expect(transformed.url).toMatch(proxyStr);
          done();
        }, 1000);
      });
      // it('test transformRequest when proxy is false', done => {
      //   const tiles = [
      //     'https://t0.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t1.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t2.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t3.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t4.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t5.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t6.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}',
      //     'https://t7.tianditu.gov.cn/ter_w/wmts?tk=1d109683f4d84198e37a38c442d68311&service=WMTS&request=GetTile&version=1.0.0&style=default&tilematrixSet=w&format=tiles&width=256&height=256&layer=ter&tilematrix={z}&tilerow={y}&tilecol={x}'
      //   ];
      //   const mapOptions = {
      //     style: {
      //       version: 8,
      //       sources: {
      //         baseLayer: {
      //           type: 'raster',
      //           tiles,
      //           tileSize: 256
      //         }
      //       },
      //       layers: [{ id: 'baseLayer', type: 'raster', source: 'baseLayer' }]
      //     },
      //     center: [107.7815, 39.9788],
      //     zoom: 5,
      //     renderWorldCopies: false,
      //     crs: {
      //       epsgCode: 'EPSG:3857'
      //     },
      //     minzoom: 0,
      //     maxzoom: 22
      //   };
      //   const datavizWebmap = new WebMapV2('', { ...commonOption }, { ...mapOptions });
      //   setTimeout(() => {
      //     const mockTileUrl = tiles[0].replace('{x}', 6).replace('{y}', 8).replace('{z}', 10);
      //     const transformed = datavizWebmap._handler.mapOptions.transformRequest(mockTileUrl, 'Tile');
      //     expect(transformed.url).toBe(mockTileUrl);
      //     done();
      //   }, 1000);
      // });
      // it('layerFilter', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/1920557079/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     };
      //     return Promise.resolve();
      //   });
      //   const datavizWebmap = new WebMapV2(vectorLayer_line, { layerFilter: function (layer) {
      //     return layer.name === '浙江省高等院校(3)';
      //   }}, undefined, null);
      //   const callback = function () {
      //     expect(datavizWebmap.getAppreciableLayers().length).toBe(1);
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      xit('check label layer repeat and labelField', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('web/datas/676516522/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('web/datas/13136933/content.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
          }
          return Promise.resolve();
        });
        const id = {
          ...uniqueLayer_point,
          level: '',
          visibleExtent: [0, 1, 2, 3]
        };
        const callback = function (data) {
          expect(datavizWebmap.getAppreciableLayers().length).toBe(id.layers.length + 1);
          expect(data.map.getLayer('jiuzhaigou2-label')).toBeUndefined();
          expect(data.map.getLayer('jiuzhaigou2-1-label')).toBeUndefined();
          expect(data.map.getLayer('jiuzhaigou2-2-label')).not.toBeUndefined();
          expect(datavizWebmap._handler).not.toBeUndefined();
          const spy = spyOn(datavizWebmap._handler, '_addLayer');
          datavizWebmap._handler._addLabelLayer({ layerID: 'jiuzhaigou2-2' });
          expect(spy).not.toHaveBeenCalled();
          done();
        };
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      xit('sourcelist overlayLayersManager and extra layers', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
          } else if (url.indexOf('web/datas/1960447494/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('web/datas/144371940/content.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
          }
        });
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        const callback = function (data) {
          const appreciableLayers1 = datavizWebmap.getAppreciableLayers();
          expect(appreciableLayers1.length).toBe(uniqueLayer_polygon.layers.length + 1);
          expect(appreciableLayers1.length).toBeGreaterThanOrEqual(data.layers.length);
          data.map.overlayLayersManager = {
            GraticuleLayer: {
              id: 'GraticuleLayer',
              overlay: true,
              sourceId: 'GraticuleLayer',
              visible: true
            },
            EchartLayer: {
              id: 'EchartLayer',
              visibility: 'visible',
              source: {
                type: 'geoJSON',
                data: null
              }
            },
            GraticuleLayer1: {
              id: 'GraticuleLayer',
              overlay: true,
              sourceId: 'GraticuleLayer'
            }
          };
          expect(data.map).toEqual(datavizWebmap._handler.map);
          datavizWebmap._styleDataUpdatedHandler();
          const appreciableLayers2 = datavizWebmap.getAppreciableLayers();
          expect(appreciableLayers2.length).toBe(uniqueLayer_polygon.layers.length + 1 + 2);
          data.map.addLayer({
            paint: {},
            id: '北京市',
            source: {
              tiles: [
                'http://localhost:8190/iportal/services/../web/datas/435608982/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22parent%22%2C%22adcode%22%2C%22level%22%2C%22centroid%22%2C%22childrenNum%22%2C%22center%22%2C%22subFeatureIndex%22%2C%22name%22%2C%22acroutes%22%2C%22geometry%22%5D&geometryFieldName=geometry'
              ],
              bounds: [115.423411, 39.442758, 117.514583, 41.0608],
              type: 'vector'
            },
            'source-layer': '435608982$geometry',
            type: 'fill'
          });
          datavizWebmap._styleDataUpdatedHandler();
          const appreciableLayers3 = datavizWebmap.getAppreciableLayers();
          expect(appreciableLayers3.length).toBe(uniqueLayer_polygon.layers.length + 1 + 2 + 1);
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });

      // it('layer order', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      //     } else if (url.indexOf('web/datas/1960447494/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('web/datas/144371940/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      //     }
      //   });
      //   const map = {
      //     ...commonMap,
      //     getStyle: () => {
      //       let layers = [];
      //       if (layerIdMapList) {
      //         for (const key in layerIdMapList) {
      //           layers.push(layerIdMapList[key]);
      //         }
      //       }
      //       // 模拟图层加载顺序
      //       const delayerLayerIds = ['市级行政区划_1_2', '市级行政区划_1_2-strokeLine'];
      //       delayerLayerIds.forEach(id => {
      //         const index = layers.findIndex(layer => layer.id === id);
      //         if (index !== -1) {
      //           const delayerLayer = layers.splice(index, 1)[0];
      //           layers.push(delayerLayer);
      //         }
      //       });
      //       return {
      //         sources: sourceIdMapList,
      //         layers
      //       };
      //     }
      //   };
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption }, {}, map);
      //   const callback = function (data) {
      //     const appreciableLayers = datavizWebmap.getAppreciableLayers();
      //     expect(appreciableLayers[1].id).toBe('市级行政区划_1_2');
      //     expect(appreciableLayers[2].id).toBe('北京市轨道交通线路(2)');
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });

      // it('tdt label order', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify({
      //         ...tiandituLayer,
      //         layers: [    
      //           {
      //             "layerType": "MARKER",
      //             "visible": true,
      //             "name": "民航数",
      //             "serverId": 123456,
      //             "layerStyle": {
      //               "labelField": "minghang"
      //             }
      //           }
      //         ]
      //       })));
      //     } else if (url.indexOf('web/datas/123456/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
      //     }
      //     return Promise.resolve();
      //   });
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption });
      //   datavizWebmap.on('addlayerssucceeded', (data) => {
      //     const appreciableLayers = datavizWebmap.getAppreciableLayers();
      //     console.log('appreciableLayers', appreciableLayers);
      //     expect(appreciableLayers[0].id).toBe('天地图地形');
      //     expect(appreciableLayers[0].renderLayers[1]).toBe('天地图地形-tdt-label');
      //     done();
      //   });
      // });

      xit('MAPBOXSTYLE layer order', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(mvtLayer)));
          } else if (url.indexOf('web/datas/676516522/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('ChinaqxAlberts_4548%40fl-new/style.json') > -1) {
            return Promise.resolve(new Response(styleJson));
          }
        });
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        const callback = function (data) {
          const appreciableLayers = datavizWebmap.getAppreciableLayers();
          console.log('appreciableLayers', appreciableLayers);
          expect(appreciableLayers[1].id).toBe('ChinaqxAlberts_4548@fl-new');
          expect(appreciableLayers[2].id).toBe('民航数据');
          done();
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
    
      xit('MAPBOXSTYLE layer repeat', done => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(mvtLayer)));
          } else if (url.indexOf('web/datas/676516522/content.json') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('ChinaqxAlberts_4548%40fl-new/style.json') > -1) {
            return Promise.resolve(new Response(styleJson));
          }
        });
        const datavizWebmap = new WebMapV2(id, { ...commonOption });
        const callback = function (data) {
          const appreciableLayers = datavizWebmap.getAppreciableLayers();
          console.log('appreciableLayers', appreciableLayers);
          expect(appreciableLayers.length).toBe(3);
          expect(appreciableLayers[0].id).toBe('China');
          expect(appreciableLayers[1].id).toBe('ChinaqxAlberts_4548@fl-new');
          expect(appreciableLayers[2].id).toBe('民航数据');
          expect(datavizWebmap.cacheLayerIds.length).toBe(4);
          const WebMap = new WebMapV2(id, { ...commonOption }, undefined, data.map);
          WebMap.on(
            'addlayerssucceeded', () => {
              const appreciableLayers = WebMap.getAppreciableLayers();
              console.log('appreciableLayers1', appreciableLayers);
              expect(appreciableLayers.length).toBe(2);
              expect(appreciableLayers[0].id).toBe('China-1');
              expect(appreciableLayers[1].id).toBe('民航数据-1');
              done();
            }
          );
        };
        datavizWebmap.on('addlayerssucceeded',callback);
      });
  
      // it('exclude source and layer', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('portal.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
      //     } else if (url.indexOf('1788054202/map.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
      //     } else if (url.indexOf('web/datas/1960447494/content.json') > -1) {
      //       return Promise.resolve(new Response(layerData_CSV));
      //     } else if (url.indexOf('web/datas/144371940/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['LINE_GEOJSON'])));
      //     }
      //   });
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption });
      //   const callback = function (data) {
      //     const appreciableLayers1 = datavizWebmap.getAppreciableLayers();
      //     console.log('appreciableLayers1', appreciableLayers1);
      //     expect(appreciableLayers1.length).toBe(uniqueLayer_polygon.layers.length + 1);
      //     expect(appreciableLayers1.length).toBeGreaterThanOrEqual(data.layers.length);
      //     data.map.addLayer({
      //       paint: {},
      //       id: '北京市-identify-SM-highlighted',
      //       source: {
      //         tiles: [
      //           'http://localhost:8190/iportal/services/../web/datas/435608982/structureddata/tiles/{z}/{x}/{y}.mvt?epsgCode=3857&returnedFieldNames=%5B%22smpid%22%2C%22parent%22%2C%22adcode%22%2C%22level%22%2C%22centroid%22%2C%22childrenNum%22%2C%22center%22%2C%22subFeatureIndex%22%2C%22name%22%2C%22acroutes%22%2C%22geometry%22%5D&geometryFieldName=geometry'
      //         ],
      //         bounds: [115.423411, 39.442758, 117.514583, 41.0608],
      //         type: 'vector'
      //       },
      //       type: 'fill'
      //     })
      //     data.map.addSource('mapbox-gl-draw-hot', {
      //       type: 'geojson',
      //       data: {
      //         type: 'FeatureCollection',
      //         features: []
      //       }
      //     });
      //     data.map.addLayer({
      //       metadata: {},
      //       paint: {
      //         'circle-color': "#f75564"
      //       },
      //       id: 'draw-vertex-active.hot',
      //       source: 'mapbox-gl-draw-hot',
      //       type: 'circle'
      //     });
      //     const appreciableLayers2 = datavizWebmap.getAppreciableLayers();
      //     expect(appreciableLayers2.length).toBe(uniqueLayer_polygon.layers.length + 1);
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });
    
      xit ('layersupdated event', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('portal.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          } else if (url.indexOf('1788054202/map.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(webmap_MAPBOXSTYLE_Tile)));
          } else if (url.indexOf('vectortile/maps/China_4326/style.json') > -1) {
            return Promise.resolve(new Response({
              version: 8,
              sources: {
                'raster-tiles': {
                  type: 'raster',
                  tiles: [
                    'http://fakeiportal.supermap.io/iserver/services/map-china400/rest/maps/China/zxyTileImage.png?z={z}&x={x}&y={y}'
                  ],
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
            }));
          }
        });
        const datavizWebmap = new WebMapV2(
          id,
          { ...commonOption },
          {
            style: {
              version: 8,
              sources: {},
              layers: []
            },
            center: [117.0514, 40.0387],
            zoom: 7,
            bearing: 0,
            pitch: 0,
            rasterTileSize: 256,
            preserveDrawingBuffer: true,
            container: 'map',
            tileSize: 256
          }
        );
        datavizWebmap.on({
          layersupdated: data => {
            expect(data.appreciableLayers.length).toBeGreaterThan(0);
            expect(data.layerCatalogs.length).toBeGreaterThan(0);
            done();
          }
        });
      })
    
      // it('switch map and reset center zoom', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('datas/123456/content.json') > -1) {
      //         return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
      //     };
      //     return Promise.resolve();
      //   });
      //   const id = markerLayer;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //   const callback = function (data) {
      //     let zoom = datavizWebmap.mapOptions.zoom;
      //     let center = datavizWebmap.mapOptions.center;
      //     expect(zoom).toBe(commonMapOptions.zoom);
      //     expect(center).toEqual(commonMapOptions.center);
      //     datavizWebmap.setStyle({});
      //     expect(datavizWebmap.mapOptions.zoom).toBeNull();
      //     expect(datavizWebmap.mapOptions.center).toBeNull();
      //     datavizWebmap.map = data.map;
      //     center = [116, 30];
      //     zoom = 16;
      //     datavizWebmap.setCenter(center);
      //     expect(datavizWebmap.mapOptions.center).toEqual(center);
      //     datavizWebmap.setZoom(zoom);
      //     expect(datavizWebmap.mapOptions.zoom).toBe(zoom);
      //     datavizWebmap.setMapId('');
      //     datavizWebmap.setStyle({});
      //     expect(datavizWebmap.mapOptions.zoom).toBe(zoom);
      //     expect(datavizWebmap.mapOptions.center).toEqual(center);
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });

      // it('copy layer', done => {
      //   spyOn(FetchRequest, 'get').and.callFake((url) => {
      //     if (url.indexOf('web/datas/123456/content.json') > -1) {
      //       return Promise.resolve(new Response(JSON.stringify(layerData_geojson['MARKER_GEOJSON'])));
      //     };
      //   });
      //   const id = markerLayer;
      //   const datavizWebmap = new WebMapV2(id, { ...commonOption, map: commonMap }, { ...commonMapOptions });
      //   const callback = function (data) {
      //     expect(() => {
      //       datavizWebmap.copyLayer('layer1');
      //     }).not.toThrow();
      //     done();
      //   };
      //   datavizWebmap.on('addlayerssucceeded',callback);
      // });

      it('initial_serverUrl', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(uniqueLayer_point)));
          } else if (url.indexOf('content.json?') > -1) {
              return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', () => {
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          done();
        });
      });
  
      it('initial_markerLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(markerLayer)));
          } else if (url.indexOf('123456/content.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(markerData2)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(123456, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(datavizWebmap.mapId).toEqual(123456);
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(2);
          const markerLayer = layers[1];
          expect(markerLayer.type).toBe('symbol');
          expect(markerLayer.layout['icon-image']).toBe(
            'http://fakeiportal/iportal/apps/dataviz/static/imgs/markers/ktv_red.png'
          );
          done();
        });
      });
  
      it('initial_heatLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(heatLayer)));
          } else if (url.indexOf('1920557079/content.json?') > -1) {
              return Promise.resolve(new Response(JSON.stringify(chart_content)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(2);
          const heatLayer = layers[1];
          expect(heatLayer.type).toBe('heatmap');
          expect(heatLayer.paint['heatmap-radius']).toBe(30);
          done();
        });
      });
  
      it('initial_vectorLayer_point', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(vectorLayer_point)));
          } else if (url.indexOf('1920557079/content.json?') > -1) {
              return Promise.resolve(new Response(JSON.stringify(chart_content)));
          } else if (url.indexOf('13136933/content.json?') > -1) {
              return Promise.resolve(new Response(JSON.stringify(layerData_geojson['POINT_GEOJSON'])));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(5);
          const vectorLayerPoint = layers[1];
          expect(vectorLayerPoint.type).toBe('circle');
          expect(vectorLayerPoint.paint['circle-radius']).toBe(6);
          done();
        });
      });
  
      it('initial_vectorLayer_line', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(vectorLayer_line)));
          } else if (url.indexOf('content.json?') > -1) {
              return Promise.resolve(new Response(JSON.stringify(chart_content)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(datavizWebmap.mapId).toBe(id);
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(2);
          const vectorLayerLine = layers[1];
          expect(vectorLayerLine.type).toBe('line');
          expect(vectorLayerLine.paint['line-width']).toBe(7);
          
          done();
        });
      });
  
      it('initial_ranksymbolLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(ranksymbolLayer)));
          } else if (url.indexOf('content.json?') > -1) {
              return Promise.resolve(new Response(JSON.stringify(chart_content)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        spyOn(ArrayStatistic, 'getArraySegments').and.callFake(function (array, type, segNum) {
          return [
            0.406820286455,
            2.6944246004791665,
            4.982028914503333,
            7.2696332285275,
            9.557237542551666,
            11.844841856575833,
            14.1324461706
          ];
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(3);
          const vectorLayerPoint = layers[1];
          expect(vectorLayerPoint.type).toBe('circle');
          expect(vectorLayerPoint.paint['circle-radius'].length).toBeGreaterThan(0);
          const labelLayer = layers[2];
          expect(labelLayer.type).toBe('symbol');
          expect(labelLayer.paint['text-color']).toBe('#333');
          expect(labelLayer.layout['text-field']).toBe('{机场}');
          
          done();
        });
      });
  
      it('initial_uniqueLayer_polygon', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(uniqueLayer_polygon)));
          } else if (url.indexOf('content.json?') > -1) {
              return Promise.resolve(new Response(JSON.stringify(chart_content)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(4);
          const vectorLayerPoint = layers[1];
          const id = vectorLayerPoint.id;
          expect(vectorLayerPoint.type).toBe('fill');
          expect(vectorLayerPoint.paint['fill-color'].length).toBeGreaterThan(0);
          const strokeLayer = layers[2];
          expect(strokeLayer.id).toBe(`${id}-strokeLine`);
          expect(strokeLayer.type).toBe('line');
          expect(strokeLayer.paint['line-color']).toBe('#ffffff');
          
          done();
        });
      });
  
      it('initial_wmsLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(wmsLayer)));
          } else if (url.indexOf('REQUEST=GetCapabilities&SERVICE=WMS') > -1) {
              return Promise.resolve(new Response(wmsCapabilitiesText));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          
          setTimeout(function () {
            done();
          }, 2000);
          // done();
        });
      });
  
      it('initial_TiandituLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(tiandituLayer)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(2);
          const tiandituLayer = layers[0];
          expect(tiandituLayer.id).toBe('天地图地形');
          expect(tiandituLayer.type).toBe('raster');
          const labelLayer = layers[1];
          expect(labelLayer.id).toBe('天地图地形-tdt-label');
          
          done();
        });
      });
  
      it('initial_xyzLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(xyzLayer)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(1);
          const xyzLayer = layers[0];
          expect(xyzLayer.id).toBe('OpenStreetMap');
          expect(xyzLayer.type).toBe('raster');
          
          done();
        });
      });
  
      it('initial_mapboxstyleLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(mapboxstyleLayer)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(datavizWebmap.options.serverUrl).toBe('http://fack:8190/iportal/');
          
          done();
        });
      });
  
      it('initial_migrationLayer', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(migrationLayer));
          } else if (url.indexOf('content.json?') > -1) {
            return Promise.resolve(new Response(layerData_CSV));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          done();
        });
      });
  
      it('initial-rangeLayer-point', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(webmap_rangeLayer)));
          } else if (url.indexOf('content.json') > -1) {
            return Promise.resolve(new Response(JSON.stringify(chart_content)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          const layers = map.getStyle().layers;
          expect(layers.length).toBe(2);
          const rangeLayerPoint = layers[1];
          const id = rangeLayerPoint.id;
          expect(id).toBe('北京市轨道交通站点(9)');
          expect(rangeLayerPoint.type).toBe('circle');
          expect(rangeLayerPoint.paint['circle-radius']).toBe(8);
          expect(rangeLayerPoint.paint['circle-color'].length).toBeGreaterThan(0);
          
          done();
        });
      });
  
      it('ISVJ-7952 CSV nullXY', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(uniqueLayer_point)));
          } else if (url.indexOf('content.json?') > -1) {
            return Promise.resolve(new Response(JSON.stringify(csv_nullxy_Data)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server
        });
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(map.getSource('民航数据')).not.toBeNull();
          expect(map.getSource('民航数据')._data.features.length).toBe(1);
          done();
        });
      });
  
      it('bing map', (done) => {
        const metaInfo = {
          resourceSets: [
            {
              resources: [
                {
                  __type: 'ImageryMetadata:http://schemas.microsoft.com/search/local/ws/rest/v1',
                  imageHeight: 256,
                  imageUrl:
                    'https://{subdomain}.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&xit=G,L&shading=hill&og=2505&n=z',
                  imageUrlSubdomains: ['t0', 't1', 't2', 't3'],
                  imageWidth: 256
                }
              ]
            }
          ],
          statusCode: 200,
          statusDescription: 'OK'
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
          if (url.indexOf('map.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(baseLayers['BING'])));
          } else if (url.indexOf('https://dev.virtualearth.net/REST/v1/Imagery/Metadata/RoadOnDemand?uriScheme=https&include=ImageryProviders&key=AhOVlIlR89XkNyDsXBAb7TjabrEokPoqhjk4ncLm9cQkJ5ae_JyhgV1wMcWnVrko&c=zh-cn') > -1) {
            return Promise.resolve(new Response(JSON.stringify(metaInfo)));
          } else if (url.indexOf('portal.json') > -1) {
              return Promise.resolve(new Response(JSON.stringify(iportal_serviceProxy)));
          }
          return Promise.resolve();
        });
        var datavizWebmap = new WebMap(id, {
          server: server,
          bingMapsKey: 'AhOVlIlR89XkNyDsXBAb7TjabrEokPoqhjk4ncLm9cQkJ5ae_JyhgV1wMcWnVrko'
        });
  
        datavizWebmap.on('addlayerssucceeded', ({ map }) => {
          expect(map.getSource('必应地图').tiles).toEqual([
            'https://t0.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&xit=G,L&shading=hill&og=2505&n=z',
            'https://t1.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&xit=G,L&shading=hill&og=2505&n=z',
            'https://t2.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&xit=G,L&shading=hill&og=2505&n=z',
            'https://t3.ssl.ak.dynamic.tiles.virtualearth.net/comp/ch/{quadkey}?mkt=zh-CN&xit=G,L&shading=hill&og=2505&n=z'
          ]);
          done();
        });
      });
    });
