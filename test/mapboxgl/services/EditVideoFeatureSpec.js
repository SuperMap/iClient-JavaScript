import { FeatureService } from '../../../src/mapboxgl/services/FeatureService';
import { EditFeaturesParameters } from '../../../src/common/iServer/EditFeaturesParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';
import { VideoFeature } from '../../../src/common/iServer/VideoFeature';

var url = GlobeParameter.dataServiceURL;
describe('mapboxgl_EditVideoFeature', () => {
  var originalTimeout;
  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
  });
  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('update video feature', done => {
    const geometry = {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [116.75, 39.75],
            [117.25, 39.75],
            [117.25, 40.75],
            [116.75, 40.75],
            [116.75, 39.75]
          ]
        ]
      }
    };
    let params = new EditFeaturesParameters({
      dataSourceName: "World",
      dataSetName: "Countries",
      features: [
        new VideoFeature({
          id: 1,
          name: 'newTest.mp4',
          geometry: geometry,
          address:
            'http://localhost:9876/iserver/services/video/restjsr/hls/stream/test/index.m3u8'
        })
      ],
      editType: 'update'
    });
    let myService = new FeatureService(url)
    spyOn(FetchRequest, 'commit').and.callFake((method, url, params, options) => {
      expect(method).toEqual('PUT');
      expect(url).toEqual('http://localhost:9876/iserver/services/data-world/rest/data/datasources/World/datasets/Countries/features');
      expect(params.indexOf('VideoFeature') > -1).toBeTruthy();
      expect(params.indexOf('http://localhost:9876/iserver/services/video/restjsr/hls/stream/test/index.m3u8') > -1).toBeTruthy();
      expect(params.indexOf('newTest.mp4') > -1).toBeTruthy();
      return Promise.resolve(
        new Response(`{"succeed": true}`)
      )
    })
    myService.editFeatures(params).then(res => {
      let serviceResult = res;
      expect(serviceResult.result.succeed).toBeTruthy();
      done();
    });
  })
});
