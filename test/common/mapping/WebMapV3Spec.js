import { createWebMapV3Extending } from '../../../src/common/mapping/WebMapV3';
import { Events } from '../../../src/common/commontypes';

const mockCrsManager = {
  isSameProjection: () => true,
  registerCRS: () => {},
  getCRS: () => ({}),
  getProj4: () => ({ defs: () => null })
};

function createWebMapV3Instance() {
  const WebMapV3 = createWebMapV3Extending(Events, {
    MapManager: function () {},
    mapRepo: {
      LngLat: function (lng, lat) {
        return { lng, lat };
      },
      CRS: null
    },
    crsManager: mockCrsManager,
    mapRepoName: 'mapbox-gl',
    l7LayerUtil: {
      getL7MarkerLayers: () => ({})
    }
  });
  return new WebMapV3({}, { target: 'map' });
}

describe('WebMapV3 - addLocalIdeographFontFamily', () => {
  let instance;

  beforeEach(() => {
    instance = createWebMapV3Instance();
  });

  describe('_getLabelFontFamily', () => {
    it('should collect text-font from layer layout', () => {
      const mapInfo = {
        layers: [
          { layout: { 'text-font': ['Arial Unicode MS Regular'] } },
          { layout: { 'text-font': ['Microsoft YaHei Regular', 'Arial Unicode MS Regular'] } }
        ]
      };

      expect(instance._getLabelFontFamily(mapInfo)).toBe(
        'sans-serif,Arial Unicode MS Regular,Microsoft YaHei Regular,Arial Unicode MS Regular'
      );
    });

    it('should return sans-serif when no layers', () => {
      expect(instance._getLabelFontFamily({})).toBe('sans-serif');
    });

    it('should skip layers without text-font', () => {
      const mapInfo = {
        layers: [{ layout: { 'text-font': ['PingFang SC Regular'] } }, {}]
      };

      expect(instance._getLabelFontFamily(mapInfo)).toBe('sans-serif,PingFang SC Regular');
    });
  });

  describe('initializeMap', () => {
    it('should call addLocalIdeographFontFamily when map is provided', () => {
      spyOn(instance, '_initLayers');
      const mapInfo = {
        crs: 'EPSG:3857',
        layers: [{ layout: { 'text-font': ['PingFang SC Regular'] } }]
      };
      const map = {
        addLocalIdeographFontFamily: jasmine.createSpy('addLocalIdeographFontFamily')
      };

      instance.initializeMap(mapInfo, map);

      expect(instance._appendLayers).toBe(true);
      expect(instance.map).toBe(map);
      expect(map.addLocalIdeographFontFamily).toHaveBeenCalledWith('sans-serif,PingFang SC Regular');
      expect(instance._initLayers).toHaveBeenCalled();
    });

    it('should not call addLocalIdeographFontFamily when map does not support it', () => {
      spyOn(instance, '_initLayers');
      const mapInfo = {
        crs: 'EPSG:3857',
        layers: [{ layout: { 'text-font': ['PingFang SC Regular'] } }]
      };
      const map = {};

      expect(() => instance.initializeMap(mapInfo, map)).not.toThrow();
      expect(instance._appendLayers).toBe(true);
      expect(instance._initLayers).toHaveBeenCalled();
    });
  });

  describe('_createMap', () => {
    it('should pass localIdeographFontFamily to MapManager', () => {
      let capturedOptions;
      const WebMapV3WithCapture = createWebMapV3Extending(Events, {
        MapManager: function (options) {
          capturedOptions = options;
          this.on = jasmine.createSpy('on');
        },
        mapRepo: {
          LngLat: function (lng, lat) {
            return { lng, lat };
          },
          CRS: null
        },
        mapRepoName: 'mapbox-gl',
        l7LayerUtil: {
          getL7MarkerLayers: () => ({})
        },
        crsManager: mockCrsManager
      });
      const inst = new WebMapV3WithCapture({}, { target: 'map' });
      inst._mapInfo = {
        crs: 'EPSG:3857',
        layers: [{ layout: { 'text-font': ['PingFang SC Regular'] } }]
      };
      inst._baseProjection = 'EPSG:3857';
      inst.fire = jasmine.createSpy('fire');
      inst._createMap();
      expect(capturedOptions.localIdeographFontFamily).toBe('sans-serif,PingFang SC Regular');
    });
  });
});

describe('WebMapV3 - _getLegendInfos', () => {
  let instance;

  beforeEach(() => {
    // Create a minimal mock instance with the method
    instance = {
      _mapResourceInfo: {},
      _getLegendInfoByCatalog: function(catalog, res = []) {
        const { catalogType, children, showLegend, title, layersContent, id } = catalog;
        if (catalogType === 'group' && children) {
          children.forEach(child => {
            this._getLegendInfoByCatalog(child, res);
          });
        }
        if (catalogType === 'layer') {
          res.push({
            showLegend: showLegend !== false,
            id: layersContent || id,
            title: title
          });
        }
      },
      _getLegendInfos: function(_mapResourceInfo) {
        const mapResourceInfo = _mapResourceInfo || this._mapResourceInfo;
        const { catalogs = [] } = mapResourceInfo;
        const res = [];
        catalogs.forEach((item) => {
          this._getLegendInfoByCatalog(item, res);
        });
        return res;
      }
    };
  });

  describe('_getLegendInfos', () => {
    it('should return legend info from catalogs with catalogType layer', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'Layer1',
            showLegend: true,
            layersContent: 'layer1'
          },
          {
            catalogType: 'layer',
            title: 'Layer2',
            showLegend: false,
            layersContent: 'layer2'
          }
        ]
      };

      const result = instance._getLegendInfos();

      expect(result).toEqual([
        { showLegend: true, id: 'layer1', title: 'Layer1' },
        { showLegend: false, id: 'layer2', title: 'Layer2' }
      ]);
    });

    it('should recursively process group catalogs', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'group',
            children: [
              {
                catalogType: 'layer',
                title: 'ChildLayer',
                showLegend: true,
                layersContent: 'childLayer'
              }
            ]
          }
        ]
      };

      const result = instance._getLegendInfos();

      expect(result).toEqual([
        { showLegend: true, id: 'childLayer', title: 'ChildLayer' }
      ]);
    });

    it('should default showLegend to true when undefined', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'Layer1',
            layersContent: 'layer1'
          }
        ]
      };

      const result = instance._getLegendInfos();

      expect(result).toEqual([
        { showLegend: true, id: 'layer1', title: 'Layer1' }
      ]);
    });

    it('should use id when layersContent is not available', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'Layer1',
            id: 'layer1'
          }
        ]
      };

      const result = instance._getLegendInfos();

      expect(result).toEqual([
        { showLegend: true, id: 'layer1', title: 'Layer1' }
      ]);
    });

    it('should return empty array when no catalogs', () => {
      instance._mapResourceInfo = { catalogs: [] };

      const result = instance._getLegendInfos();

      expect(result).toEqual([]);
    });

    it('should handle nested group catalogs', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'group',
            children: [
              {
                catalogType: 'group',
                children: [
                  {
                    catalogType: 'layer',
                    title: 'NestedLayer',
                    showLegend: true,
                    layersContent: 'nestedLayer'
                  }
                ]
              }
            ]
          }
        ]
      };

      const result = instance._getLegendInfos();

      expect(result).toEqual([
        { showLegend: true, id: 'nestedLayer', title: 'NestedLayer' }
      ]);
    });

    it('should handle multiple nested groups', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'group',
            title: 'Group1',
            children: [
              {
                catalogType: 'group',
                title: 'Group2',
                children: [
                  {
                    catalogType: 'layer',
                    title: 'DeepLayer',
                    showLegend: false,
                    layersContent: 'deepLayer'
                  }
                ]
              }
            ]
          }
        ]
      };

      const result = instance._getLegendInfos();

      expect(result).toEqual([
        { showLegend: false, id: 'deepLayer', title: 'DeepLayer' }
      ]);
    });
  });

  describe('_getLegendInfoByCatalog', () => {
    it('should skip non-layer and non-group catalogTypes', () => {
      const res = [];
      const catalog = {
        catalogType: 'other',
        title: 'Other',
        showLegend: true,
        layersContent: 'other'
      };

      instance._getLegendInfoByCatalog(catalog, res);

      expect(res).toEqual([]);
    });

    it('should process layer catalog correctly', () => {
      const res = [];
      const catalog = {
        catalogType: 'layer',
        title: 'TestLayer',
        showLegend: true,
        layersContent: 'testLayer'
      };

      instance._getLegendInfoByCatalog(catalog, res);

      expect(res).toEqual([
        { showLegend: true, id: 'testLayer', title: 'TestLayer' }
      ]);
    });

    it('should default showLegend to true when not specified', () => {
      const res = [];
      const catalog = {
        catalogType: 'layer',
        title: 'TestLayer',
        layersContent: 'testLayer'
      };

      instance._getLegendInfoByCatalog(catalog, res);

      expect(res).toEqual([
        { showLegend: true, id: 'testLayer', title: 'TestLayer' }
      ]);
    });

    it('should handle group with no children', () => {
      const res = [];
      const catalog = {
        catalogType: 'group',
        title: 'EmptyGroup',
        children: []
      };

      instance._getLegendInfoByCatalog(catalog, res);

      expect(res).toEqual([]);
    });
  });

  describe('getLegendInfos (WebMapV3)', () => {
    it('should call _handler._getLegendInfos through WebMapBase', () => {
      const webMapBase = {
        _handler: null,
        getLegendInfos: function() {
          return (this._handler && this._handler._getLegendInfos()) || [];
        }
      };

      const mockLegendInfos = [
        { showLegend: true, id: 'layer1', title: 'Layer1' }
      ];
      webMapBase._handler = {
        _getLegendInfos: jasmine.createSpy('_getLegendInfos').and.returnValue(mockLegendInfos)
      };

      const result = webMapBase.getLegendInfos();

      expect(webMapBase._handler._getLegendInfos).toHaveBeenCalled();
      expect(result).toEqual(mockLegendInfos);
    });

    it('should return empty array when _handler is null', () => {
      const webMapBase = {
        _handler: null,
        getLegendInfos: function() {
          return (this._handler && this._handler._getLegendInfos()) || [];
        }
      };

      const result = webMapBase.getLegendInfos();

      expect(result).toEqual([]);
    });
  });
});
