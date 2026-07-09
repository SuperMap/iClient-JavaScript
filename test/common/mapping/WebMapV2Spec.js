import { createWebMapV2Extending } from '../../../src/common/mapping/WebMapV2';
import { createWebMapV2BaseExtending } from '../../../src/common/mapping/WebMapV2Base';
import { Events } from '../../../src/common/commontypes';

const mockCrsManager = {
  isSameProjection: () => true,
  registerCRS: () => {},
  getCRS: () => ({}),
  getProj4: () => ({ defs: () => null })
};

function createWebMapV2Instance() {
  const WebMapV2 = createWebMapV2Extending(
    createWebMapV2BaseExtending(Events, 'fire'),
    {
      MapManager: function (options) {
        this.options = options;
      },
      mapRepo: {
        LngLat: function (lng, lat) {
          return { lng, lat };
        },
        CRS: {
          get: () => ({
            getExtent: () => [0, 0, 1, 1]
          })
        }
      },
      crsManager: mockCrsManager,
      DataFlowService: function () {},
      GraticuleLayer: {}
    }
  );
  return new WebMapV2({}, { target: 'map' });
}

describe('WebMapV2 - addLocalIdeographFontFamily', () => {
  let instance;

  beforeEach(() => {
    instance = createWebMapV2Instance();
  });

  describe('_getLabelFontFamily', () => {
    it('should collect fontFamily from labelStyle and append supermapol-icons', () => {
      const mapInfo = {
        layers: [
          { labelStyle: { fontFamily: 'Arial' } },
          { labelStyle: { fontFamily: 'Microsoft YaHei' } }
        ]
      };

      expect(instance._getLabelFontFamily(mapInfo)).toBe('sans-serif,Arial,Microsoft YaHei,supermapol-icons');
    });

    it('should return default fonts when no layers', () => {
      expect(instance._getLabelFontFamily({})).toBe('sans-serif,supermapol-icons');
    });

    it('should skip layers without labelStyle', () => {
      const mapInfo = {
        layers: [{ labelStyle: { fontFamily: '黑体' } }, {}]
      };

      expect(instance._getLabelFontFamily(mapInfo)).toBe('sans-serif,黑体,supermapol-icons');
    });
  });

  describe('initializeMap', () => {
    it('should call addLocalIdeographFontFamily when map is provided', async () => {
      spyOn(instance, '_registerMapCRS').and.returnValue(Promise.resolve('EPSG:3857'));
      spyOn(instance, '_loadLayers');
      const mapInfo = {
        layers: [{ labelStyle: { fontFamily: '微软雅黑' } }]
      };
      const map = {
        getCRS: () => ({ epsgCode: 'EPSG:3857' }),
        addLocalIdeographFontFamily: jasmine.createSpy('addLocalIdeographFontFamily')
      };

      await instance.initializeMap(mapInfo, map);

      expect(instance._appendLayers).toBe(true);
      expect(instance.map).toBe(map);
      expect(map.addLocalIdeographFontFamily).toHaveBeenCalledWith('sans-serif,微软雅黑,supermapol-icons');
      expect(instance._loadLayers).toHaveBeenCalledWith(mapInfo, instance._taskID);
    });

    it('should not call addLocalIdeographFontFamily when map does not support it', async () => {
      spyOn(instance, '_registerMapCRS').and.returnValue(Promise.resolve('EPSG:3857'));
      spyOn(instance, '_loadLayers');
      const mapInfo = {
        layers: [{ labelStyle: { fontFamily: '微软雅黑' } }]
      };
      const map = {
        getCRS: () => ({ epsgCode: 'EPSG:3857' })
      };

      await expectAsync(instance.initializeMap(mapInfo, map)).toBeResolved();
      expect(instance._appendLayers).toBe(true);
      expect(instance._loadLayers).toHaveBeenCalledWith(mapInfo, instance._taskID);
    });
  });

  describe('_createMap', () => {
    it('should pass localIdeographFontFamily to MapManager', async () => {
      let capturedOptions;
      const WebMapV2WithCapture = createWebMapV2Extending(
        createWebMapV2BaseExtending(Events, 'fire'),
        {
          MapManager: function (options) {
            capturedOptions = options;
            this.on = jasmine.createSpy('on');
          },
          mapRepo: {
            LngLat: function (lng, lat) {
              return { lng, lat };
            },
            CRS: {
              get: () => ({
                getExtent: () => [0, 0, 1, 1],
                unit: 'degree'
              })
            }
          },
          DataFlowService: function () {},
          GraticuleLayer: {},
          crsManager: mockCrsManager
        }
      );
      const inst = new WebMapV2WithCapture({}, { target: 'map' });
      const mapInfo = {
        projection: 'EPSG:3857',
        extent: { leftBottom: { x: 0, y: 0 }, rightTop: { x: 1, y: 1 } },
        baseLayer: { tileSize: 256 },
        layers: [{ labelStyle: { fontFamily: '微软雅黑' } }]
      };
      inst.baseProjection = 'EPSG:3857';
      inst.fire = jasmine.createSpy('fire');
      spyOn(inst, '_getMapCenter').and.returnValue({ lng: 0, lat: 0 });
      await inst._createMap(mapInfo);
      expect(capturedOptions.localIdeographFontFamily).toBe('sans-serif,微软雅黑,supermapol-icons');
      await inst.clean(false);
    });
  });
});

describe('WebMapV2 - _getLegendInfos', () => {
  let instance;

  beforeEach(() => {
    instance = createWebMapV2Instance();
  });

  it('should return showLegend true when isShow is true', () => {
    instance._mapInfo = {
      layers: [{ name: 'Layer1', layerID: 'layer1', legendSetting: { isShow: true } }]
    };
    expect(instance._getLegendInfos()).toEqual([
      { showLegend: true, id: 'layer1', title: 'Layer1' }
    ]);
  });

  it('should return showLegend false when isShow is false', () => {
    instance._mapInfo = {
      layers: [{ name: 'Layer2', layerID: 'layer2', legendSetting: { isShow: false } }]
    };
    expect(instance._getLegendInfos()).toEqual([
      { showLegend: false, id: 'layer2', title: 'Layer2' }
    ]);
  });

  it('should return showLegend false when legendSetting exists without isShow', () => {
    instance._mapInfo = {
      layers: [{ name: 'Layer3', layerID: 'layer3', legendSetting: {} }]
    };
    expect(instance._getLegendInfos()).toEqual([
      { showLegend: false, id: 'layer3', title: 'Layer3' }
    ]);
  });

  it('should return showLegend false when legendSetting is absent', () => {
    instance._mapInfo = {
      layers: [{ name: 'Layer4', layerID: 'layer4' }]
    };
    expect(instance._getLegendInfos()).toEqual([
      { showLegend: false, id: 'layer4', title: 'Layer4' }
    ]);
  });

  it('should return empty array when no layers', () => {
    instance._mapInfo = {};
    expect(instance._getLegendInfos()).toEqual([]);
  });
});
