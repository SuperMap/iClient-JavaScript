import { VectorTileSuperMapRest } from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import { FetchRequest } from '@supermap/iclient-common/util/FetchRequest';
import * as RequestcryptUtil from '@supermap/iclient-common/util/RequestcryptUtil';
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
  const mockCallback = (testUrl, method) => {
    if ((url.match(/.+(?=(\/restjsr\/v1\/vectortile\/|\/rest\/maps\/))/) || [])[0] === testUrl) {
      return Promise.resolve(
        new Response(
          JSON.stringify([
            {
              serviceEncryptInfo: {
                encrptSpec: {
                  keyLength: 256,
                  attributes: 'abcd',
                  version: '1.1',
                  algorithm: 'AES'
                },
                updateTime: 'Fri Mar 15 08:52:15 CST 2024',
                encrptKeyID: 'keyIDNAME'
              },
              name: 'map-china400/rest'
            }
          ])
        )
      );
    } else if (testUrl.includes('/security/tunnel/v1/publickey')) {
      return Promise.resolve(
        new Response(
          JSON.stringify({
            keyLength: 2048,
            publicKey:
              'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2BQweGm/+YpzPn/QaRvkOYQQOwO0LI52NSdtJDehARLvFLfKfpaXs2Qks2VISYX8bl1aBRtS5m5/Z8mdo41k2XM9sRUKldF5M0gTUqKWUnDkS6INnNfsW4VsHNizIiZY7YvQA2cwl/4eYm4YF5Qy3KugPGrxt5KxZvh8O7b6si9JwLwIx53Y5oRbFttCHdjWR4mqFTzTR/yD4K1xYo/fizdvqUmWLhfpirHQsWv3WLaUOdEj36nDGBxuqahQ5JbH3VeASdbJQRTp+0QQcfpZ1x0GxXJWstemCrCUETQIQczYtj98qxSqknC8HZQhDz8F31NFV4341vrGKgOzrsq5HQIDAQAB',
            keyScheme: 'PKCS#8'
          })
        )
      );
    } else if (testUrl.includes('/services/security/tunnel/v1/tunnels/')) {
      const response =
        'HAsHE/ok/jROEySWBxWSr2FTLXcnIkeFAYzig+V7NGalR0f/VnBorkAOyOnbCSq9nM3YWrhEUFaWwAouSDeEVqe+BLuIA+7KmCBfD7hh+qyM0lC5cvZ8vOIjsI3eqhHhiPOi+IQLGHQsRbFl8hSkE0XU1GIojqjppSEAxW5jhFC2bH5hdCt/+PKuHPhATElgJqOI6FJHpVpbLWiqoP7WMYVYvZm7wubYCQIG77LUSivbUQ61gjW0mevsKRdoiRl8fafV8Zq5D+QBbCy+Mn4rWXDC+gjwvyyYxEdOixALJgfnjWL48RRHxvITPapzbEsEkcnZiu+INSULcT60BeuduKzxp+hUg6Q8sn2Bu//CNk0NlGMeT5hqTON72iI4GBgfEOnGrcBHjsT/N2jX0NnVz1bgR6B9O6TpQQr3zkjVPidw8ElSO+lM8P5AuRqtNH9ajYt2uDwWBhbG+OfyR4hKIJ9V5aDhAwkIzkUerRP78Colsg==';
      return Promise.resolve({ text: () => Promise.resolve(response) });
    } else if (testUrl.includes('/services/security/tunnel/v1/tunnels')) {
      const response = {
        blockedUrlRegex: {
          DELETE: [],
          POST: [],
          GET: ['.*/services/security/svckeys/[a-zA-Z]+\\.json'],
          PUT: []
        },
        tunnelUrl:
          'http://fake.iserver.com/iserver/services/security/tunnel/v1/tunnels/UUV6U25KNkVSNHhnQTYzcFVOTnZlNm9KVEVWZE4yeXVPNHlEVHAzeEZ2UnQ3WmtxS29qZURXQi9HcDBDYjNtM1FaOHFabGQwclduNGNzNjFjck1PbmFyakdOcGxQR25id2dQZ2ljY1NWdU5lMWg3dzV4UUtDQktyQ3doc3MzWnhmTkdNNWU3V01FZ21XNWJsR3pVdEtJenRpQXRTQ2RYQVBkN1oxRGNhNTh1a2pGSG1rUUZBeStjYVZPMXJ3NXFJcUdxN05ack1SNEEzNWRwNEZVNWV6ME96anYwN0tQempHZVl2U2VHa3YxRlc1R3ZXUW9KNmgwb290MjE1cEVZT2xNdzAwdXBidWpNOTQ2ck1iR1FFajFVUEtpeSt0OU9xdzdON0ZpZnhkTjEvRlF2cFpHN3ZBalVPV0ovVkNDdU9nN3RyU081SlhRMlZVQXhsbDlkMHZnPT0=.json'
      };
      return Promise.resolve(new Response(JSON.stringify(response)));
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
    // originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;

    spyGet = spyOn(FetchRequest, 'get').and.callFake((url) => mockCallback(url, 'GET'));
    spyPost = spyOn(FetchRequest, 'post').and.callFake((url) => mockCallback(url, 'POST'));
    spyCommit = spyOn(FetchRequest, 'commit').and.callFake((method, url) => mockCallback(url, method));
  });
  afterEach(() => {
    if (vectorLayer) {
      map.removeLayer(vectorLayer);
    }
    // jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    spyGet.calls.reset();
    spyPost.calls.reset();
    spyCommit.calls.reset();
  });
  afterAll(() => {
    window.document.body.removeChild(testDiv);
  });

  xit('initialize', (done) => {
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
  xit('custom_tileLoadFunction', (done) => {
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
    // function EncryptRequestTest() {}
    // EncryptRequestTest.prototype.request = function (options) {
    //   console.log(111111111111111111111111111, optios.url);
    //   spy();
    //   return Promise.resolve({ json: () => Promise.resolve('l3nQtAUM4li87qMfO68exInHVFQ5gS3a6pb8ySIbib8=') });
    // };
    // const spyEncrypt = spyOn(EncryptRequestHelper, 'EncryptRequest').and.returnValue(EncryptRequestTest);
    // RequestcryptUtil.generateAESRandomKey = () => 'SLbsaRbf4Rou8Bju';
    // RequestcryptUtil.generateAESRandomIV = () => 'rzLM7Z4RJGFd';
    const spyEncrypt = spyOn(RequestcryptUtil, 'AESGCMDecrypt').and.returnValue(true);
    new MapService(url).getMapInfo((serviceResult) => {
      map = new Map({
        target: 'map',
        view: new View({
          center: [12957388, 4853991],
          zoom: 11
        })
      });
      vectorTileOptions = VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
      vectorTileOptions.decrypt = true;
      vectorTileOptions.format = new MVT({
        featureClass: Feature
      });
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
        expect(vectorTileSource.serviceKey).not.toBeUndefined();
        spy.calls.reset();
        spyEncrypt.calls.reset();
        done();
      });
    });
  });
});
