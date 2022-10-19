import { initMap, viewOptionsFromMapJSON } from '../../../src/openlayers/mapping/InitMap';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import '../../resources/WebMapV5.js';

describe('openlayers_InitMap', () => {
  var testDiv;
  var originalTimeout;
  var defaultServeRequest = 'http://supermapiserver:8090/iserver/services/map-world/rest/maps/World';
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

  it('initialize', () => {
    spyOn(FetchRequest, 'get').and.callFake((url) => {
      if (url.indexOf('World') > -1) {
        return Promise.resolve(new Response(mapInfo));
      }
      return Promise.resolve();
    });
    initMap(defaultServeRequest).then(({ map }) => {
      expect(map).not.toBeNull();
    });
  });

  it('viewOptionsFromMapJSON', () => {
    let mapObj = JSON.parse(mapInfo);
    const res = viewOptionsFromMapJSON(mapObj);
    expect(res.center).toEqual([mapObj.center.x, mapObj.center.y]);
    expect(res.zoom).not.toBeNull();
  });
});
