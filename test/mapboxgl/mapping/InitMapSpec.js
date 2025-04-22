import mapboxgl from 'mapbox-gl';
import mbglmap from '../../tool/mock_mapboxgl_map';
import { initMap } from '../../../src/mapboxgl/mapping/InitMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { SecurityManager } from '../../../src/common/security/SecurityManager';

describe('mapboxgl_InitMap', () => {
  let originalTimeout, testDiv;
  const tokenQuery = 'token=opbFn8Nl5zUs2xhuCQ..';

  beforeEach(() => {
    spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
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
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('initMap plane coordinate system', async () => {
    const url = 'http:/fake:8090/iserver/iserver/services/map-china400/rest/maps/China';
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 0,
        type: 'PCS_NON_EARTH'
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    try {
      await initMap(url);
    } catch (error) {
      expect(error).toEqual(new Error('mapbox-gl cannot support plane coordinate system.'));
    }
  });

  it('initMap 4490, dynamicProjection false, non mapbox-gl-enhance', async () => {
    const url = 'http:/fake:8090/iserver/iserver/services/map-china400/rest/maps/China';
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 4490
      },
      bounds: {
        top: 20037508.342789087,
        left: -20037508.342789248,
        bottom: -20037508.34278914,
        leftBottom: {
          x: -20037508.342789248,
          y: -20037508.34278914
        },
        right: 20037508.342789244,
        rightTop: {
          x: 20037508.342789244,
          y: 20037508.342789087
        }
      },
      center: {
        x: -7.450580596923828e-9,
        y: -2.60770320892334e-8
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    try {
      await initMap(url);
    } catch (error) {
      expect(error).toEqual(
        new Error(
          'The EPSG code 4490 needs to include mapbox-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/mapboxgl/editor.html#mvtVectorTile_2362'
        )
      );
    }
  });

  it('initMap 3857, non mapbox-gl-enhance', async () => {
    const url = 'http:/fake:8090/iserver/iserver/services/map-china400/rest/maps/China';
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 3857
      },
      bounds: {
        top: 20037508.342789087,
        left: -20037508.342789248,
        bottom: -20037508.34278914,
        leftBottom: {
          x: -20037508.342789248,
          y: -20037508.34278914
        },
        right: 20037508.342789244,
        rightTop: {
          x: 20037508.342789244,
          y: 20037508.342789087
        }
      },
      center: {
        x: -7.450580596923828e-9,
        y: -2.60770320892334e-8
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url);
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.options.crs).toBe('EPSG:3857');
    expect(map.options.center).toEqual([-6.692970425781022e-14, -2.2899993706537323e-13]);
    expect(Object.values(map.options.style.sources).length).toBe(1);
    expect(map.options.style.layers.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles[0]).toBe(
      url + '/zxyTileImage.png?z={z}&x={x}&y={y}&width=256&height=256&transparent=true'
    );
  });
  it('initMap 3857, registerToken', async () => {
    const url = 'http:/fake:8090/iserver/iserver/services/map-china400/rest/maps/China';
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 3857
      },
      bounds: {
        top: 20037508.342789087,
        left: -20037508.342789248,
        bottom: -20037508.34278914,
        leftBottom: {
          x: -20037508.342789248,
          y: -20037508.34278914
        },
        right: 20037508.342789244,
        rightTop: {
          x: 20037508.342789244,
          y: 20037508.342789087
        }
      },
      center: {
        x: -7.450580596923828e-9,
        y: -2.60770320892334e-8
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    SecurityManager.registerToken(url, "test-token")
    const resData = await initMap(url);
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.options.crs).toBe('EPSG:3857');
    expect(map.options.style.layers.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles[0]).toBe(
      url + '/zxyTileImage.png?token=test-token&z={z}&x={x}&y={y}&width=256&height=256&transparent=true'
    );
    SecurityManager.destroyToken(url)
  });

  it('initMap 4326, dynamicProjection true, non mapbox-gl-enhance', async () => {
    const url = 'http:/fake:8090/iserver/iserver/services/map-china400/rest/maps/China';
    const mapServiceInfo = {
      dynamicProjection: true,
      prjCoordSys: {
        epsgCode: 4326
      },
      bounds: {
        top: 20037508.342789087,
        left: -20037508.342789248,
        bottom: -20037508.34278914,
        leftBottom: {
          x: -20037508.342789248,
          y: -20037508.34278914
        },
        right: 20037508.342789244,
        rightTop: {
          x: 20037508.342789244,
          y: 20037508.342789087
        }
      },
      center: {
        x: -7.450580596923828e-9,
        y: -2.60770320892334e-8
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url);
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.options.crs).toBe('EPSG:3857');
    expect(map.options.center).toEqual([-6.692970425781022e-14, -2.2899993706537323e-13]);
    expect(Object.values(map.options.style.sources).length).toBe(1);
    expect(map.options.style.layers.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles[0]).toBe(
      url + '/zxyTileImage.png?z={z}&x={x}&y={y}&width=256&height=256&transparent=true'
    );
  });

  it('initMap 4490, dynamicProjection false, mapbox-gl-enhance', async () => {
    const url = 'http:/fake:8090/iserver/services/map-mvt-landuse/rest/maps/landuse';
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 4490
      },
      center: {
        x: -7.450580596923828e-9,
        y: -2.60770320892334e-8
      },
      bounds: {
        top: 90.00000000000001,
        left: -180,
        bottom: -90.00000000003598,
        leftBottom: { x: -180, y: -90.00000000003598 },
        right: 180.00000000007202,
        rightTop: { x: 180.00000000007202, y: 90.00000000000001 }
      }
    };
    const vectorstylesInfo = {
      metadata: {
        indexbounds: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
      }
    };
    const vectorStyleUrl =
      'http:/fake:8090/iserver/services/map-mvt-landuse/rest/maps/landuse/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY';
    const WKT =
      'GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.includes('/prjCoordSys.wkt')) {
        return Promise.resolve(new Response(WKT));
      }
      if (url === vectorStyleUrl) {
        return Promise.resolve(new Response(JSON.stringify(vectorstylesInfo)));
      }
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    mapboxgl.CRS = function () {
      return {
        code: mapServiceInfo.prjCoordSys.epsgCode
      };
    };
    mapboxgl.proj4 = function () {
      return [0, 0];
    };
    const resData = await initMap(url, { type: 'vector-tile' });
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.options.crs.code).toBe(mapServiceInfo.prjCoordSys.epsgCode);
    expect(map.options.center).not.toEqual([mapServiceInfo.center.x, mapServiceInfo.center.y]);
    expect(map.options.style).toBe(vectorStyleUrl);
    delete mapboxgl.CRS;
    delete mapboxgl.proj4;
  });

  it('with tilesets', (done) => {
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 4326
      }
    };
    var tilesetServeRequest = 'http://supermapiserver:8090/iserver/services/map-world/rest/maps/Jinjing111';
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('Jinjing111') > -1 && url.indexOf('tilesets') === -1) {
        return Promise.resolve(new Response(mapInfo_2));
      }
      if (url.indexOf('Jinjing111/tilesets') > -1) {
        return Promise.resolve(new Response(tilesetInfo_1));
      }
      return Promise.resolve();
    });
    mapboxgl.CRS = function () {
      return {
        code: mapServiceInfo.prjCoordSys.epsgCode
      };
    };
    mapboxgl.proj4 = function () {
      return [0, 0];
    };
    initMap(tilesetServeRequest).then(({ map }) => {
      expect(map).not.toBeNull();
      delete mapboxgl.CRS;
      delete mapboxgl.proj4;
      done();
    });
  });

  it('initMap raster when carring on token', async () => {
    const restMapUrl = 'http:/fake:8090/iserver/iserver/services/map-china400/rest/maps/China';
    const url = `${restMapUrl}?${tokenQuery}`;
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 3857
      },
      bounds: {
        top: 20037508.342789087,
        left: -20037508.342789248,
        bottom: -20037508.34278914,
        leftBottom: {
          x: -20037508.342789248,
          y: -20037508.34278914
        },
        right: 20037508.342789244,
        rightTop: {
          x: 20037508.342789244,
          y: 20037508.342789087
        }
      },
      center: {
        x: -7.450580596923828e-9,
        y: -2.60770320892334e-8
      }
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      expect(url).toContain(tokenQuery);
      if (url.indexOf('/tilesets') > -1) {
        return Promise.resolve(new Response(tilesetInfo_1));
      }
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url);
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.options.crs).toBe(`EPSG:${mapServiceInfo.prjCoordSys.epsgCode}`);
    expect(map.options.center).toEqual([-6.692970425781022e-14, -2.2899993706537323e-13]);
    expect(Object.values(map.options.style.sources).length).toBe(1);
    expect(map.options.style.layers.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles.length).toBe(1);
    expect(Object.values(map.options.style.sources)[0].tiles[0]).toBe(
      `${restMapUrl}/zxyTileImage.png?${tokenQuery}&z={z}&x={x}&y={y}&width=256&height=256&transparent=true`
    );
  });

  it('initMap vector tile when carring on token', async () => {
    const restMapUrl = 'http:/fake:8090/iserver/services/map-mvt-landuse/rest/maps/landuse';
    const url = `${restMapUrl}?${tokenQuery}`;
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 4326
      },
      center: {
        x: 116,
        y: 39
      },
      bounds: {
        top: 90.00000000000001,
        left: -180,
        bottom: -90.00000000003598,
        leftBottom: { x: -180, y: -90.00000000003598 },
        right: 180.00000000007202,
        rightTop: { x: 180.00000000007202, y: 90.00000000000001 }
      }
    };
    const vectorStyleUrl =
      `${restMapUrl}/tileFeature/vectorstyles.json?${tokenQuery}&type=MapBox_GL&styleonly=true&tileURLTemplate=ZXY`;
    const WKT =
      'GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]';
    spyOn(FetchRequest, 'get').and.callFake((acceptUrl) => {
      if (acceptUrl === `${restMapUrl}/prjCoordSys.wkt?${tokenQuery}`) {
        return Promise.resolve(new Response(WKT));
      }
      if (acceptUrl === vectorStyleUrl) {
        return Promise.resolve(new Response(JSON.stringify({})));
      }
      if (acceptUrl === `${restMapUrl}/prjCoordSys/projection/extent.json?${tokenQuery}`) {
        return Promise.resolve(
          new Response(
            JSON.stringify({
              top: 2.0037508342789244e7,
              left: -2.0037508342789244e7,
              bottom: -2.0037508342789244e7,
              leftBottom: {
                x: -2.0037508342789244e7,
                y: -2.0037508342789244e7
              },
              right: 2.0037508342789244e7,
              rightTop: {
                x: 2.0037508342789244e7,
                y: 2.0037508342789244e7
              },
              center: [120, 39]
            })
          )
        );
      }
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    mapboxgl.CRS = function () {
      return {
        code: mapServiceInfo.prjCoordSys.epsgCode
      };
    };
    mapboxgl.proj4 = function () {
      return [0, 0];
    };
    const resData = await initMap(url, { type: 'vector-tile' });
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.options.crs.code).toBe(mapServiceInfo.prjCoordSys.epsgCode);
    expect(map.options.style).toBe(vectorStyleUrl);
    delete mapboxgl.CRS;
    delete mapboxgl.proj4;
  });
});
