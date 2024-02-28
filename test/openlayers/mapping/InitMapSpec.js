import { initMap, viewOptionsFromMapJSON } from '../../../src/openlayers/mapping/InitMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import '../../resources/WebMapV5.js';

describe('openlayers_InitMap', () => {
  var testDiv;
  var originalTimeout;
  var defaultServeRequest = 'http://supermapiserver:8090/iserver/services/map-world/rest/maps/World';
  var tilesetServeRequest = 'http://supermapiserver:8090/iserver/services/map-world/rest/maps/Jinjing111';
  beforeEach(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    window.document.body.appendChild(testDiv);
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    window.document.body.removeChild(testDiv);
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('initialize', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('World') > -1 && url.indexOf('tilesets') === -1) {
        return Promise.resolve(new Response(mapInfo_1));
      }
      return Promise.resolve();
    });
    initMap(defaultServeRequest).then(({ map }) => {
      expect(map).not.toBeNull();
      done();
    });
  });

  it('viewOptionsFromMapJSON', () => {
    let mapObj = JSON.parse(mapInfo_1);
    const res = viewOptionsFromMapJSON(mapObj);
    expect(res.center).toEqual([mapObj.center.x, mapObj.center.y]);
    expect(res.zoom).not.toBeNull();
  });

  it('with tilesets', (done) => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('Jinjing111') > -1 && url.indexOf('tilesets') === -1) {
        return Promise.resolve(new Response(mapInfo_2));
      }
      if (url.indexOf('Jinjing111/tilesets') > -1) {
        return Promise.resolve(new Response(tilesetInfo_1));
      }
      return Promise.resolve();
    });
    initMap(tilesetServeRequest).then(({ map }) => {
      expect(map).not.toBeNull();
      done();
    });
  });
});
