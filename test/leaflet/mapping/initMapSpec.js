import { initMap, crsFromMapJSON } from '../../../src/leaflet/mapping/initMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { mockCreateTile } from '../../tool/mock_leaflet';
import proj4 from 'proj4';

var map;
var def4490 = `GEOGCS["GCS_China_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101,AUTHORITY["EPSG","7044"]]],PRIMEM["Greenwich",0.0,AUTHORITY["EPSG","8901"]],UNIT["DEGREE",0.017453292519943295],AUTHORITY["EPSG","4490"]]`;

describe('initMap', () => {
  var originalTimeout;
  var testDiv;
  beforeAll(() => {
    mockCreateTile();
  });
  beforeEach(() => {
    testDiv = document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    document.body.removeChild(testDiv);
    map = null;
  });
  afterAll(() => {});

  it('initMap 3857', async () => {
    var url = 'http:/fake:8090/iserver/services/map-Population/rest/maps/PopulationDistribution';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 3857,
        coordUnit: 'METER',
        projection: {
          name: 'SPHERE_MERCATOR',
          type: 'PRJ_SPHERE_MERCATOR'
        },
        type: 'PCS_WGS_1984_WEB_MERCATOR'
      },
      visibleScales: [],
      dpi: 96,
      scale: 2.455671966265e-8,
      maxScale: 1.0e12,
      center: {
        x: 1.152349617829781e7,
        y: 3735091.5117932605
      },
      bounds: {
        top: 7087311.00490398,
        left: 8009146.115071949,
        bottom: 382872.01868254057,
        leftBottom: {
          x: 8009146.115071949,
          y: 382872.01868254057
        },
        right: 1.5037846241523674e7,
        rightTop: {
          x: 1.5037846241523674e7,
          y: 7087311.00490398
        }
      },
      coordUnit: 'METER'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url);
    map = res.map;
    expect(map.options.crs.code).toBe('EPSG:3857');
    expect(map.options.crs.resolutions.length).toEqual(22);
    expect(map.options.zoom).toBe(1);
    expect(map.options.maxZoom).toBe(21);
    expect(res.layer).not.toBeNull();
  });

  it('initMap 4326', async () => {
    var url = 'http://fake:8090/iserver/services/map-jinjing/rest/maps/jinjing';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 4326,
        coordUnit: 'DEGREE',
        type: 'PCS_EARTH_LONGITUDE_LATITUDE'
      },
      visibleScales: [],
      dpi: 96,
      scale: 5.080888406217531e-7,
      maxScale: 1.000000000000032e12,
      center: {
        x: 116.84538255155,
        y: 39.7881922283
      },
      bounds: {
        top: 42.31307532235788,
        left: 114.58902605452259,
        bottom: 37.76434929128856,
        leftBottom: {
          x: 114.58902605452259,
          y: 37.76434929128856
        },
        right: 119.51371730073062,
        rightTop: {
          x: 119.51371730073062,
          y: 42.31307532235788
        }
      },
      coordUnit: 'DEGREE'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url);
    map = res.map;
    expect(map.options.crs.code).toBe('EPSG:4326');
    expect(map.options.crs.resolutions.length).toEqual(22);
    expect(map.options.zoom).toBe(2);
    expect(map.options.maxZoom).toBe(21);
    expect(res.layer).not.toBeNull();
  });

  it('initMap -1000', async () => {
    var url = 'http:/fake:8090/iserver/services/map-changchun/rest/maps/changchun';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: -1000,
        coordUnit: 'METER',
        type: 'PCS_NON_EARTH'
      },
      visibleScales: [],
      dpi: 96,
      scale: 2.013718885290289e-5,
      maxScale: 1.0e12,
      customParams: '',
      center: {
        x: 4503.624032152586,
        y: -3861.9114721924716
      },
      bounds: {
        top: -55.577652310411075,
        left: 48.39718933631297,
        bottom: -7668.245292074532,
        leftBottom: {
          x: 48.39718933631297,
          y: -7668.245292074532
        },
        right: 8958.850874968857,
        rightTop: {
          x: 8958.850874968857,
          y: -55.577652310411075
        }
      },
      coordUnit: 'METER'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url);
    map = res.map;
    expect(map.options.crs.code).toBe(undefined);
    expect(map.options.crs.resolutions).toEqual(undefined);
    expect(map.options.zoom).toBe(1);
    expect(map.options.maxZoom).toBe(21);
    expect(res.layer).not.toBeNull();
  });

  it('initMap 3857 visibleScales', async () => {
    var url = 'http:/fake:8090/iserver/services/map-china/rest/maps/china3857';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 3857,
        coordUnit: 'METER',
        projection: {
          name: 'SPHERE_MERCATOR',
          type: 'PRJ_SPHERE_MERCATOR'
        },
        type: 'PCS_WGS_1984_WEB_MERCATOR'
      },
      visibleScales: [1.0e-8, 2.0e-8, 4.0e-8],
      dpi: 96,
      scale: 1.0e-8,
      maxScale: 1.0e12,
      center: {
        x: -2004194.8400538266,
        y: 4051449.8992825206
      },
      bounds: {
        top: 7087311.00490398,
        left: 8009146.115071949,
        bottom: 382872.01868254057,
        leftBottom: {
          x: 8009146.115071949,
          y: 382872.01868254057
        },
        right: 1.5037846241523674e7,
        rightTop: {
          x: 1.5037846241523674e7,
          y: 7087311.00490398
        }
      },
      coordUnit: 'METER'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url);
    map = res.map;
    expect(map.options.crs.code).toBe('EPSG:3857');
    expect(map.options.crs.resolutions.length).toEqual(3);
    expect(map.options.zoom).toBe(0);
    expect(map.options.maxZoom).toBe(2);
    expect(res.layer).not.toBeNull();
  });

  it('initMap 4326 visibleScales', async () => {
    var url = 'http:/fake:8090/iserver/services/map-china/rest/maps/china4326';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 4326,
        coordUnit: 'DEGREE',
        name: 'GCS_WGS_1984',
        type: 'PCS_EARTH_LONGITUDE_LATITUDE'
      },
      visibleScales: [1.0e-8, 2.0e-8, 4.0e-8],
      dpi: 96,
      scale: 1.0000000000000002e-8,
      maxScale: 1.0e12,
      center: {
        x: -2004194.8400538266,
        y: 4051449.8992825206
      },
      bounds: {
        top: 42.31307532235788,
        left: 114.58902605452259,
        bottom: 37.76434929128856,
        leftBottom: {
          x: 114.58902605452259,
          y: 37.76434929128856
        },
        right: 119.51371730073062,
        rightTop: {
          x: 119.51371730073062,
          y: 42.31307532235788
        }
      },
      coordUnit: 'DEGREE'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url);
    map = res.map;
    expect(map.options.crs.code).toBe('EPSG:4326');
    expect(map.options.crs.resolutions.length).toEqual(3);
    expect(map.options.zoom).toBe(0);
    expect(map.options.maxZoom).toBe(2);
    expect(res.layer).not.toBeNull();
  });

  it('initMap 4490', async () => {
    var url = 'http://fake:8090/iserver/services/map-china/rest/maps/chian4490';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 4490,
        coordUnit: 'DEGREE',
        name: 'GCS_China_2000',
        type: 'PCS_EARTH_LONGITUDE_LATITUDE'
      },
      visibleScales: [
        1.6901635716026555e-9, 3.3803271432053056e-9, 6.760654286410611e-9, 1.3521308572821242e-8,
        2.7042617145642484e-8, 5.408523429128511e-8, 1.0817046858256998e-7, 2.1634093716513974e-7,
        4.3268187433028044e-7, 8.653637486605571e-7, 1.7307274973211203e-6, 3.4614549946422405e-6, 6.9229099892844565e-6
      ],
      dpi: 96,
      scale: 6.76065428641061e-9,
      maxScale: 1.000000000000032e12,
      center: {
        x: 0.8789062350988956,
        y: 0.7031249701974502
      },
      bounds: {
        top: 85.05112877996834,
        left: -180,
        bottom: -85.05112877996838,
        leftBottom: {
          x: -180,
          y: -85.05112877996838
        },
        right: 180,
        rightTop: {
          x: 180,
          y: 85.05112877996834
        }
      },
      coordUnit: 'DEGREE'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      if (testUrl.includes('prjCoordSys.wkt')) {
        return Promise.resolve(new Response(def4490));
      }
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url);
    map = res.map;
    expect(map.options.crs.code).toBe('EPSG:4490');
    expect(map.options.crs.resolutions.length).toEqual(13);
    expect(map.options.zoom).toBe(2);
    expect(map.options.maxZoom).toBe(12);
    expect(res.layer).not.toBeNull();
  });

  it('initMap mapOptions', async () => {
    var url = 'http:/fake:8090/iserver/services/map-Population/rest/maps/PopulationDistribution';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 3857,
        coordUnit: 'METER',
        projection: {
          name: 'SPHERE_MERCATOR',
          type: 'PRJ_SPHERE_MERCATOR'
        },
        type: 'PCS_WGS_1984_WEB_MERCATOR'
      },
      visibleScales: [],
      dpi: 96,
      scale: 2.455671966265e-8,
      maxScale: 1.0e12,
      center: {
        x: 1.152349617829781e7,
        y: 3735091.5117932605
      },
      bounds: {
        top: 7087311.00490398,
        left: 8009146.115071949,
        bottom: 382872.01868254057,
        leftBottom: {
          x: 8009146.115071949,
          y: 382872.01868254057
        },
        right: 1.5037846241523674e7,
        rightTop: {
          x: 1.5037846241523674e7,
          y: 7087311.00490398
        }
      },
      coordUnit: 'METER',
      overlapDisplayedOptions: false
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });

    var res = await initMap(url, { mapOptions: { center: [0, 0], zoom: 1, maxZoom: 10 } });
    map = res.map;
    expect(map.options.crs.code).toBe('EPSG:3857');
    expect(map.options.crs.resolutions.length).toEqual(10);
    expect(map.options.zoom).toBe(1);
    expect(map.options.maxZoom).toBe(10);
    expect(res.layer).not.toBeNull();
  });

  it('crsFromMapJSON ', async () => {
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 3857,
        coordUnit: 'METER',
        projection: {
          name: 'SPHERE_MERCATOR',
          type: 'PRJ_SPHERE_MERCATOR'
        },
        type: 'PCS_WGS_1984_WEB_MERCATOR'
      },
      visibleScales: [],
      dpi: 96,
      scale: 2.455671966265e-8,
      maxScale: 1.0e12,
      center: {
        x: 1.152349617829781e7,
        y: 3735091.5117932605
      },
      bounds: {
        top: 7087311.00490398,
        left: 8009146.115071949,
        bottom: 382872.01868254057,
        leftBottom: {
          x: 8009146.115071949,
          y: 382872.01868254057
        },
        right: 1.5037846241523674e7,
        rightTop: {
          x: 1.5037846241523674e7,
          y: 7087311.00490398
        }
      },
      coordUnit: 'METER',
      overlapDisplayedOptions: false
    };
    var crs = await crsFromMapJSON(mapInfo);
    expect(crs.code).toBe('EPSG:3857');
    expect(crs.resolutions.length).toEqual(22);
  });

  xit('crsFromMapJSON 4490 noProjDef', async () => {
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 4490,
        coordUnit: 'DEGREE',
        name: 'GCS_China_2000',
        type: 'PCS_EARTH_LONGITUDE_LATITUDE'
      },
      visibleScales: [
        1.6901635716026555e-9, 3.3803271432053056e-9, 6.760654286410611e-9, 1.3521308572821242e-8,
        2.7042617145642484e-8, 5.408523429128511e-8, 1.0817046858256998e-7, 2.1634093716513974e-7,
        4.3268187433028044e-7, 8.653637486605571e-7, 1.7307274973211203e-6, 3.4614549946422405e-6, 6.9229099892844565e-6
      ],
      dpi: 96,
      scale: 6.76065428641061e-9,
      maxScale: 1.000000000000032e12,
      center: {
        x: 0.8789062350988956,
        y: 0.7031249701974502
      },
      bounds: {
        top: 85.05112877996834,
        left: -180,
        bottom: -85.05112877996838,
        leftBottom: {
          x: -180,
          y: -85.05112877996838
        },
        right: 180,
        rightTop: {
          x: 180,
          y: 85.05112877996834
        }
      },
      coordUnit: 'DEGREE'
    };
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      if (testUrl.includes('prjCoordSys.wkt')) {
        return Promise.resolve(new Response(''));
      }
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });
    var res = await crsFromMapJSON(mapInfo);
    expect(res).toBe(undefined);
  });

  it('crsFromMapJSON 4490', async () => {
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 4490,
        coordUnit: 'DEGREE',
        name: 'GCS_China_2000',
        type: 'PCS_EARTH_LONGITUDE_LATITUDE'
      },
      visibleScales: [
        1.6901635716026555e-9, 3.3803271432053056e-9, 6.760654286410611e-9, 1.3521308572821242e-8,
        2.7042617145642484e-8, 5.408523429128511e-8, 1.0817046858256998e-7, 2.1634093716513974e-7,
        4.3268187433028044e-7, 8.653637486605571e-7, 1.7307274973211203e-6, 3.4614549946422405e-6, 6.9229099892844565e-6
      ],
      dpi: 96,
      scale: 6.76065428641061e-9,
      maxScale: 1.000000000000032e12,
      center: {
        x: 0.8789062350988956,
        y: 0.7031249701974502
      },
      bounds: {
        top: 85.05112877996834,
        left: -180,
        bottom: -85.05112877996838,
        leftBottom: {
          x: -180,
          y: -85.05112877996838
        },
        right: 180,
        rightTop: {
          x: 180,
          y: 85.05112877996834
        }
      },
      coordUnit: 'DEGREE'
    };
    proj4.defs('EPSG:4490', def4490);
    spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
      return Promise.resolve(new Response(JSON.stringify(mapInfo)));
    });
    var crs = await crsFromMapJSON(mapInfo);
    expect(crs.code).toBe('EPSG:4490');
    expect(crs.resolutions.length).toEqual(13);
  });

  it('crsFromMapJSON maxZoom', async () => {
    var url = 'http:/fake:8090/iserver/services/map-Population/rest/maps/PopulationDistribution';
    var mapInfo = {
      prjCoordSys: {
        distanceUnit: 'METER',
        epsgCode: 3857,
        coordUnit: 'METER',
        projection: {
          name: 'SPHERE_MERCATOR',
          type: 'PRJ_SPHERE_MERCATOR'
        },
        type: 'PCS_WGS_1984_WEB_MERCATOR'
      },
      visibleScales: [],
      dpi: 96,
      scale: 2.455671966265e-8,
      maxScale: 1.0e12,
      center: {
        x: 1.152349617829781e7,
        y: 3735091.5117932605
      },
      bounds: {
        top: 7087311.00490398,
        left: 8009146.115071949,
        bottom: 382872.01868254057,
        leftBottom: {
          x: 8009146.115071949,
          y: 382872.01868254057
        },
        right: 1.5037846241523674e7,
        rightTop: {
          x: 1.5037846241523674e7,
          y: 7087311.00490398
        }
      },
      coordUnit: 'METER',
      overlapDisplayedOptions: false
    };
    var crs = await crsFromMapJSON(mapInfo, { maxZoom: 10 });
    expect(crs.code).toBe('EPSG:3857');
    expect(crs.resolutions.length).toEqual(10);
  });
});
