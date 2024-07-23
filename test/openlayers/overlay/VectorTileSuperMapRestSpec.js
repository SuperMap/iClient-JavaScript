import { VectorTileSuperMapRest } from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { EncryptRequest } from '@supermapgis/iclient-common/util/EncryptRequest';
import { MapService } from '../../../src/openlayers/services/MapService';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import Feature from 'ol/Feature';
import VectorTileLayer from 'ol/layer/VectorTile';

var url = GlobeParameter.ChinaURL;
const mapObject = {
  viewBounds: {
    top: 1.0018754171380693e7,
    left: -1.0018754171380727e7,
    bottom: -1.0018754171380745e7,
    leftBottom: {
      x: -1.0018754171380727e7,
      y: -1.0018754171380745e7
    },
    right: 1.0018754171380712e7,
    rightTop: {
      x: 1.0018754171380712e7,
      y: 1.0018754171380693e7
    }
  },
  bounds: {
    top: 2.0037508342789087e7,
    left: -2.0037508342789248e7,
    bottom: -2.003750834278914e7,
    leftBottom: {
      x: -2.0037508342789248e7,
      y: -2.003750834278914e7
    },
    right: 2.0037508342789244e7,
    rightTop: {
      x: 2.0037508342789244e7,
      y: 2.0037508342789087e7
    }
  },
  viewer: {
    leftTop: {
      x: 0,
      y: 0
    },
    top: 0,
    left: 0,
    bottom: 256,
    rightBottom: {
      x: 256,
      y: 256
    },
    width: 256,
    right: 256,
    height: 256
  },
  coordUnit: 'METER',
  visibleScales: []
};
describe('openlayers_VectorTileSuperMapRest', () => {
  var testDiv, map, vectorTileOptions, vectorTileSource, originalTimeout, vectorLayer, spyGet, spyPost, spyCommit;
  const encrptSpec = {
    keyLength: 256,
    attributes: 'abcd',
    version: '1.1',
    algorithm: 'AES'
  };
  const mockCallback = (testUrl) => {
    if ((url.match(/.+(?=(\/restjsr\/v1\/vectortile\/|\/rest\/maps\/))/) || [])[0] === testUrl) {
      return Promise.resolve(
        new Response(
          JSON.stringify([
            {
              serviceEncryptInfo: {
                encrptSpec,
                updateTime: 'Fri Mar 15 08:52:15 CST 2024',
                encrptKeyID: 'keyIDNAME'
              },
              name: 'map-china400/rest'
            }
          ])
        )
      );
    }
    return Promise.resolve(new Response(JSON.stringify(mapObject)));
  };
  beforeAll(() => {
    testDiv = window.document.createElement('div');
    testDiv.setAttribute('id', 'map');
    testDiv.style.styleFloat = 'left';
    testDiv.style.marginLeft = '8px';
    testDiv.style.marginTop = '50px';
    testDiv.style.width = '500px';
    testDiv.style.height = '500px';
    window.document.body.appendChild(testDiv);
  });
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

    spyGet = spyOn(FetchRequest, 'get').and.callFake((url) => mockCallback(url, 'GET'));
    spyPost = spyOn(FetchRequest, 'post').and.callFake((url) => mockCallback(url, 'POST'));
    spyCommit = spyOn(FetchRequest, 'commit').and.callFake((method, url) => mockCallback(url, method));
  });
  afterEach(() => {
    if (vectorLayer) {
      map.removeLayer(vectorLayer);
    }
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    spyGet.calls.reset();
    spyPost.calls.reset();
    spyCommit.calls.reset();
  });
  afterAll(() => {
    window.document.body.removeChild(testDiv);
  });

  it('initialize', (done) => {
    new MapService(url).getMapInfo((serviceResult) => {
      map = new Map({
        target: 'map',
        view: new View({
          center: [12957388, 4853991],
          zoom: 11
        })
      });
      vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
      vectorTileOptions.tileLoadFunction = (tile) => {
        tile.setLoader(() => {
          tile.setFeatures([]);
        });
      };
      vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
      vectorTileSource.once('tileloadend', () => {
        expect(vectorTileOptions).not.toBeNull();
        expect(vectorTileOptions.crossOrigin).toBe('anonymous');
        expect(vectorTileSource).not.toBeNull();
        done();
      });
      vectorLayer = new VectorTileLayer({
        source: vectorTileSource
      });
      map.addLayer(vectorLayer);
    });
  });
  it('custom_tileLoadFunction', (done) => {
    var spy = jasmine.createSpy('test');
    var tileLoadFunction = (tile) => {
      tile.setLoader(() => {
        spy();
        tile.setFeatures([]);
      });
    };
    new MapService(url).getMapInfo((serviceResult) => {
      map = new Map({
        target: 'map',
        view: new View({
          center: [12957388, 4853991],
          zoom: 11
        })
      });
      vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
      vectorTileOptions.tileLoadFunction = tileLoadFunction;
      vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
      vectorLayer = new VectorTileLayer({
        source: vectorTileSource
      });
      map.addLayer(vectorLayer);
      vectorLayer.getSource().once('tileloadend', () => {
        expect(vectorTileOptions).not.toBeNull();
        expect(spy).toHaveBeenCalled();
        done();
      });
    });
  });

  it('mvt_decrypt ', (done) => {
    const spy = jasmine.createSpy('test');
    const serviceKey = 'l3nQtAUM4li87qMfO68exInHVFQ5gS3a6pb8ySIbib8=';
    const spyEncrypt = spyOn(EncryptRequest.prototype, 'request').and.callFake(() => ({ json: () => Promise.resolve(serviceKey)}));
    new MapService(url).getMapInfo((serviceResult) => {
      map = new Map({
        target: 'map',
        view: new View({
          center: [12957388, 4853991],
          zoom: 11
        })
      });
      vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
      vectorTileOptions.format = new MVT({
        featureClass: Feature
      });
      vectorTileOptions.decrypt = function() { return []};
      vectorTileOptions.decryptCompletedFunction = function() {};
      vectorTileOptions.tileLoadFunction = (tile) => {
        tile.setLoader(() => {
          spy();
          tile.setFeatures([]);
        });
      };
      vectorTileSource = new VectorTileSuperMapRest(vectorTileOptions);
      vectorLayer = new VectorTileLayer({
        source: vectorTileSource
      });
      map.addLayer(vectorLayer);
      vectorLayer.getSource().once('tileloadend', () => {
        expect(vectorTileOptions).not.toBeNull();
        expect(spy.calls.count()).toBe(1);
        expect(spyEncrypt).toHaveBeenCalled();
        expect(vectorTileSource.decryptOptions).not.toBeUndefined();
        expect(vectorTileSource.decryptOptions.key).toBe(serviceKey);
        expect(vectorTileSource.decryptOptions.algorithm).toEqual(encrptSpec.algorithm);
        expect(vectorTileSource.decryptOptions.decrypt).not.toBeUndefined();
        expect(vectorTileSource.decryptOptions.decryptCompletedFunction).not.toBeUndefined();
        let testData = new Uint8Array();
        let resultData = vectorTileSource._decryptMvt(testData);
        expect(resultData.slice(0).join(',')).toEqual(testData.slice(0).join(','));
        vectorTileSource.decryptOptions = null;
        testData = new Uint8Array([5, 10]);
        resultData = vectorTileSource._decryptMvt(testData);
        expect(resultData.slice(0).join(',')).toEqual(testData.slice(0).join(','));
        spy.calls.reset();
        spyEncrypt.calls.reset();
        done();
      });
    });
  });
});
