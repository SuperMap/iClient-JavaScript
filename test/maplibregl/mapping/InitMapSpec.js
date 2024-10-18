import maplibregl from 'maplibre-gl';
import mbglmap from '../../tool/mock_maplibregl_map';
import { initMap } from '../../../src/maplibregl/mapping/InitMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

describe('maplibregl_InitMap', () => {
  let originalTimeout, testDiv;
  const tokenQuery = 'token=opbFn8Nl5zUs2xhuCQ..';

  beforeEach(() => {
    spyOn(maplibregl, 'Map').and.callFake(mbglmap);
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
    const url = GlobeParameter.ChinaURL;
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
      expect(error).toEqual(new Error('maplibre-gl cannot support plane coordinate system.'));
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
          'The EPSG code 4490 needs to include maplibre-gl-enhance.js. Refer to the example: https://iclient.supermap.io/examples/maplibregl/editor.html#mvtVectorTile_2362'
        )
      );
    }
  });

  it('initMap 3857', async () => {
    const url = GlobeParameter.ChinaURL;
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
    expect(map.getCenter().toArray()).not.toEqual([mapServiceInfo.center.x, mapServiceInfo.center.y]);
  });

  it('initMap 4326, dynamicProjection true', async () => {
    const url = GlobeParameter.ChinaURL;
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
        x: 108,
        y: 28
      }
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url);
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.getCenter().toArray()).not.toEqual([mapServiceInfo.center.x, mapServiceInfo.center.y]);
  });

  it('initMap 3857, vector-tile', async () => {
    const url = 'http:/fake:8090/iserver/services/map-mvt-landuse/rest/maps/landuse';
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 3857
      },
      center: {
        x: 12124158.777882982,
        y: 2732247.310535573
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
    };
    spyOn(FetchRequest, 'get').and.callFake(() => {
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url, { type: 'vector-tile' });
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.getCenter()).not.toEqual([mapServiceInfo.center.x, mapServiceInfo.center.y]);
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
    maplibregl.CRS = function () {
      return {
        code: mapServiceInfo.prjCoordSys.epsgCode
      };
    };
    maplibregl.proj4 = function () {
      return [0, 0];
    };
    initMap(tilesetServeRequest).then(({ map }) => {
      expect(map).not.toBeNull();
      delete maplibregl.CRS;
      delete maplibregl.proj4;
      done();
    });
  });

  it('initMap raster when carring on token', async () => {
    const url = `${GlobeParameter.ChinaURL}?${tokenQuery}`;
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
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url);
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.getCenter().toArray()).not.toEqual([mapServiceInfo.center.x, mapServiceInfo.center.y]);
  });

  it('initMap vector-tile when carring on token', async () => {
    const url = `http:/fake:8090/iserver/services/map-mvt-landuse/rest/maps/landuse?${tokenQuery}`;
    const mapServiceInfo = {
      dynamicProjection: false,
      prjCoordSys: {
        epsgCode: 3857
      },
      center: {
        x: 12124158.777882982,
        y: 2732247.310535573
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
    };
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      expect(url).toContain(tokenQuery);
      return Promise.resolve(new Response(JSON.stringify(mapServiceInfo)));
    });
    const resData = await initMap(url, { type: 'vector-tile' });
    const map = resData.map;
    expect(map).not.toBeUndefined();
    expect(map.getCenter()).not.toEqual([mapServiceInfo.center.x, mapServiceInfo.center.y]);
  });
});
