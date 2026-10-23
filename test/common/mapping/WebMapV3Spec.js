import { createWebMapV3Extending } from '../../../src/common/mapping/WebMapV3';
import { createMapClassExtending } from '../../../src/common/mapping/MapBase';
import { createSpriteLoadHandler, flipImageVertically, isMapVersionGreaterThan } from '../../../src/common/mapping';
import {
  createSpriteLoadHandler as createPublicSpriteLoadHandler,
  flipImageVertically as flipPublicImageVertically,
  isMapVersionGreaterThan as isPublicMapVersionGreaterThan
} from '../../../src/common/index.common';
import { createWebMapBaseExtending } from '../../../src/common/mapping/WebMapBase';
import { Events } from '../../../src/common/commontypes';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

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

// 带 fire 方法的事件基类（mapboxgl.Evented 风格），供被测类内部 this.fire 使用
class TestEvents extends Events {
  fire(type, params) {
    return this.triggerEvent(type, params);
  }
}

// 构造带完整 mock 依赖的测试上下文
function createTestContext({ SuperClass, withMapBase, ...optionOverrides } = {}) {
  const l7LayerUtil = {
    getL7MarkerLayers: jasmine.createSpy('getL7MarkerLayers').and.returnValue({}),
    removeL7MarkerLayer: jasmine.createSpy('removeL7MarkerLayer'),
    isL7Layer: jasmine.createSpy('isL7Layer').and.returnValue(false),
    addL7Layers: jasmine.createSpy('addL7Layers').and.resolveTo(),
    getRestDataGeojsonByWebMap: jasmine.createSpy('getRestDataGeojsonByWebMap').and.resolveTo({})
  };
  const mapRepo = {
    LngLat: function (lng, lat) {
      return { lng, lat };
    },
    CRS: null,
    convertFilter: jasmine.createSpy('convertFilter').and.callFake((filter) => filter)
  };
  const webMapService = {
    handleUrlWithCredentials: jasmine.createSpy('handleUrlWithCredentials').and.returnValue(true)
  };
  const options = {
    MapManager: function () {},
    mapRepo,
    crsManager: mockCrsManager,
    l7LayerUtil,
    webMapService,
    ...optionOverrides
  };
  const ParentClass = SuperClass || (withMapBase ? createMapClassExtending(TestEvents) : TestEvents);
  const WebMapV3Class = createWebMapV3Extending(ParentClass, options);
  const instance = new WebMapV3Class({}, { target: 'map' });
  // Events 需先注册事件类型才能监听，预先注册被测类会触发的全部事件
  [
    'mapinitialized',
    'projectionnotmatch',
    'mapcreatefailed',
    'mapcreatesucceeded',
    'layercreatefailed',
    'layerupdatechanged'
  ].forEach((type) => instance.addEventType(type));
  return { instance, l7LayerUtil, mapRepo, webMapService, options };
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
        center: { lng: 0, lat: 0 },
        layers: [{ layout: { 'text-font': ['PingFang SC Regular'] } }]
      };
      inst._baseProjection = 'EPSG:3857';
      inst.fire = jasmine.createSpy('fire');
      inst._createMap();
      expect(capturedOptions).toBeDefined();
      expect(capturedOptions.localIdeographFontFamily).toBe('sans-serif,PingFang SC Regular');
      expect(capturedOptions.linePatternOrientation).toBe('west-to-east');
      expect(capturedOptions.onSpriteLoad).toEqual(jasmine.any(Function));
    });
  });

  describe('_getSpriteLoad', () => {
    it('should be exported for external WebApps', () => {
      expect(createSpriteLoadHandler('3.3.7')).toEqual(jasmine.any(Function));
      expect(createSpriteLoadHandler('3.3.8')).toBeUndefined();
      expect(createPublicSpriteLoadHandler).toBe(createSpriteLoadHandler);
      expect(flipImageVertically).toBe(flipPublicImageVertically);
      expect(isMapVersionGreaterThan).toBe(isPublicMapVersionGreaterThan);
    });

    it('should flip line sprites for maps at version 3.3.7', () => {
      instance._mapInfo = { version: '3.3.7' };
      const onSpriteLoad = instance._getSpriteLoad();
      const imageData = new Uint8Array([
        1, 2, 3, 4,
        5, 6, 7, 8
      ]);

      expect(onSpriteLoad('line-pattern', imageData, 1, 2)).toEqual(new Uint8Array([
        5, 6, 7, 8,
        1, 2, 3, 4
      ]));
      expect(onSpriteLoad('point-pattern', imageData, 1, 2)).toBeNull();
    });

    it('should not add a sprite callback for maps newer than version 3.3.7', () => {
      instance._mapInfo = { version: '3.3.8' };

      expect(instance._getSpriteLoad()).toBeUndefined();
    });

    it('should compare version components numerically', () => {
      instance._mapInfo = { version: '3.3.10' };

      expect(instance._getSpriteLoad()).toBeUndefined();
    });

    it('should disable the callback for higher major and minor versions', () => {
      ['4.0.0', '3.4.0'].forEach(version => {
        instance._mapInfo = { version };
        expect(instance._getSpriteLoad()).toBeUndefined();
      });
    });

    it('should keep the callback when the map version is missing', () => {
      instance._mapInfo = {};
      const onSpriteLoad = instance._getSpriteLoad();

      expect(onSpriteLoad).toEqual(jasmine.any(Function));
      expect(onSpriteLoad(null, new Uint8Array(4), 1, 1)).toBeNull();
    });
  });
});

describe('WebMapV3 - _getLegendInfos', () => {
  let instance;

  beforeEach(() => {
    instance = createWebMapV3Instance();
  });

  describe('_getLegendInfos', () => {
    it('should return legend info from catalogs with catalogType layer', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'Layer1',
            showLegend: true,
            id: 'layer1'
          },
          {
            catalogType: 'layer',
            title: 'Layer2',
            showLegend: false,
            id: 'layer2'
          }
        ]
      };

      expect(instance._getLegendInfos()).toEqual([
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
                id: 'childLayer'
              }
            ]
          }
        ]
      };

      expect(instance._getLegendInfos()).toEqual([
        { showLegend: true, id: 'childLayer', title: 'ChildLayer' }
      ]);
    });

    it('should default showLegend to false when undefined', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'Layer1',
            id: 'layer1'
          }
        ]
      };

      expect(instance._getLegendInfos()).toEqual([
        { showLegend: false, id: 'layer1', title: 'Layer1' }
      ]);
    });

    it('should use id from catalog', () => {
      instance._mapResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'Layer1',
            id: 'layer1'
          }
        ]
      };

      expect(instance._getLegendInfos()).toEqual([
        { showLegend: false, id: 'layer1', title: 'Layer1' }
      ]);
    });

    it('should return empty array when no catalogs', () => {
      instance._mapResourceInfo = { catalogs: [] };

      expect(instance._getLegendInfos()).toEqual([]);
    });

    it('should accept custom mapResourceInfo argument', () => {
      instance._mapResourceInfo = { catalogs: [] };
      const customResourceInfo = {
        catalogs: [
          {
            catalogType: 'layer',
            title: 'CustomLayer',
            id: 'customLayer'
          }
        ]
      };

      expect(instance._getLegendInfos(customResourceInfo)).toEqual([
        { showLegend: false, id: 'customLayer', title: 'CustomLayer' }
      ]);
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
                    id: 'nestedLayer'
                  }
                ]
              }
            ]
          }
        ]
      };

      expect(instance._getLegendInfos()).toEqual([
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
                    id: 'deepLayer'
                  }
                ]
              }
            ]
          }
        ]
      };

      expect(instance._getLegendInfos()).toEqual([
        { showLegend: false, id: 'deepLayer', title: 'DeepLayer' }
      ]);
    });
  });

  describe('_getLegendInfoByCatalog', () => {
    it('should skip non-layer and non-group catalogTypes', () => {
      const res = [];
      instance._getLegendInfoByCatalog({
        catalogType: 'other',
        title: 'Other',
        showLegend: true,
        id: 'other'
      }, res);

      expect(res).toEqual([]);
    });

    it('should process layer catalog correctly', () => {
      const res = [];
      instance._getLegendInfoByCatalog({
        catalogType: 'layer',
        title: 'TestLayer',
        showLegend: true,
        id: 'testLayer'
      }, res);

      expect(res).toEqual([
        { showLegend: true, id: 'testLayer', title: 'TestLayer' }
      ]);
    });

    it('should default showLegend to false when not specified', () => {
      const res = [];
      instance._getLegendInfoByCatalog({
        catalogType: 'layer',
        title: 'TestLayer',
        id: 'testLayer'
      }, res);

      expect(res).toEqual([
        { showLegend: false, id: 'testLayer', title: 'TestLayer' }
      ]);
    });

    it('should handle group with no children', () => {
      const res = [];
      instance._getLegendInfoByCatalog({
        catalogType: 'group',
        title: 'EmptyGroup',
        children: []
      }, res);

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

describe('WebMapV3 - legend symbol/style helpers', () => {
  let instance;

  beforeEach(() => {
    instance = createWebMapV3Instance();
  });

  describe('_isAllPictureSymbolSaved', () => {
    it('should return false when symbolsContent type is custom for line symbol', () => {
      // custom 为表达式类型，图例暂不支持，直接返回 false
      const symbolsContent = {
        type: 'custom',
        value: { style: { 'line-pattern': 'some-image' } }
      };

      expect(instance._isAllPictureSymbolSaved('line', symbolsContent, {})).toBe(false);
    });

    it('should return false when symbolsContent type is custom for polygon symbol', () => {
      const symbolsContent = {
        type: 'custom',
        values: [{ value: { style: { 'fill-pattern': 'some-image' } } }],
        defaultValue: { style: { 'fill-pattern': 'default-image' } }
      };

      expect(instance._isAllPictureSymbolSaved('polygon', symbolsContent, {})).toBe(false);
    });
  });

  describe('_isShowLegendSingleItem', () => {
    it('无数据驱动时显示单项', () => {
      expect(instance._isShowLegendSingleItem([], false)).toBe(true);
    });

    it('color 为线性数据驱动时显示单项', () => {
      expect(instance._isShowLegendSingleItem(['color'], true)).toBe(true);
    });

    it('color 非线性数据驱动时不显示单项', () => {
      expect(instance._isShowLegendSingleItem(['color'], false)).toBe(false);
    });

    it('面与轮廓都数据驱动时不显示单项，避免重复的面图例', () => {
      expect(instance._isShowLegendSingleItem(['color', 'outlineColor'], true)).toBe(false);
    });

    it('只有轮廓色数据驱动时需要显示面的单项（面 + 轮廓色专题图）', () => {
      expect(instance._isShowLegendSingleItem(['outlineColor'], false)).toBe(true);
    });

    it('只有轮廓符号或轮廓宽/透明度数据驱动时需要显示面的单项', () => {
      expect(instance._isShowLegendSingleItem(['outlineSymbolsContent'], false)).toBe(true);
      expect(instance._isShowLegendSingleItem(['outlineWidth'], false)).toBe(true);
      expect(instance._isShowLegendSingleItem(['outlineOpacity'], false)).toBe(true);
    });

    it('填充符号数据驱动时不显示单项，符号分组本身即为面图例', () => {
      expect(instance._isShowLegendSingleItem(['symbolsContent'], false)).toBe(false);
    });

    it('轮廓属性与非轮廓属性混合驱动时不显示单项', () => {
      expect(instance._isShowLegendSingleItem(['symbolsContent', 'outlineColor'], false)).toBe(false);
    });
  });

  describe('_createLayerLegendList 面 + 轮廓色', () => {
    it('轮廓色为单值专题图时，图例同时包含面单项与轮廓色分组', () => {
      const layer = { id: 'beijing', title: 'beijing', type: 'fill' };
      const styleSetting = {
        type: 'fill',
        color: { type: 'simple', value: '#826DBA' },
        opacity: { type: 'simple', value: 0.9 },
        outline: { type: 'simple', value: true },
        outlineWidth: { type: 'simple', value: 0.5 },
        outlineColor: {
          type: 'unique',
          field: ['smpid'],
          defaultValue: '#ffffff',
          values: [
            { value: '#d53e4f', key: 1 },
            { value: '#3288bd', key: 18 }
          ]
        },
        styleRenderMode: 'mapboxgl'
      };

      const result = instance._createLayerLegendList(layer, styleSetting);

      // 第一项为面：带上填充底色与轮廓
      expect(result.length).toBe(2);
      expect(result[0].styleField).toBeUndefined();
      expect(result[0].styleGroup.length).toBe(1);
      expect(result[0].styleGroup[0].style.backgroundColor).toBe('#826DBA');
      expect(result[0].styleGroup[0].style.outlineStyle).toBe('solid');
      expect(result[0].styleGroup[0].style.shape).toBe('RECTANGLE');

      // 第二项为轮廓色专题图分组，且每个分组样式保留面的填充底色
      expect(result[1].styleField).toBe('outlineColor');
      expect(result[1].styleGroup.length).toBeGreaterThan(1);
      expect(result[1].styleGroup[0].style.outlineColor).toBe('#d53e4f');
      expect(result[1].styleGroup[0].style.backgroundColor).toBe('#826DBA');
    });
  });

  describe('_getLegendStyleType', () => {
    it('should return CUSTOM when currentType is custom', () => {
      const result = instance._getLegendStyleType({
        styleField: 'color',
        currentType: 'custom',
        custom: [],
        interpolateInfo: {}
      });

      expect(result).toBe('CUSTOM');
    });

    it('should return CUSTOM for non-color styleField when currentType is custom', () => {
      const result = instance._getLegendStyleType({
        styleField: 'width',
        currentType: 'custom',
        custom: [{ key: 'expr' }],
        interpolateInfo: { type: 'custom' }
      });

      expect(result).toBe('CUSTOM');
    });
  });

  describe('_parseLegendtyle FILL outline symbol', () => {
    it('纯色面填充 + 图片轮廓符号时返回矢量样式，并附带雪碧图地址与轮廓图块元数据', () => {
      instance._sprite = 'http://localhost:8190/iportal/web/maps/1/sprites/sprite';
      instance._spriteDatas = {
        'line-texture': { x: 20, y: 0, width: 8, height: 4, pixelRatio: 1 }
      };
      const result = instance._parseLegendtyle({
        legendRenderType: 'FILL',
        customValue: {
          outlineSymbolsContent: {
            symbolId: 'line-outline',
            style: { paint: { 'line-pattern': 'line-texture' } }
          }
        }
      });

      // 面填充不是图片符号，不能把轮廓符号整体当成填充预览图（原 bug：中间也显示轮廓符号）
      expect(result.type).toBe('style');
      expect(result.sprite).toBeUndefined();
      expect(result.url).toBe('http://localhost:8190/iportal/web/maps/1/sprites/sprite.png');
      expect(result.outlineSymbolsContent.symbolId).toBe('line-outline');
      // 轮廓纹理的雪碧图块元数据按图片 id 附带，供图例组件直接裁剪
      expect(result.outlineSprites['line-texture']).toEqual({
        x: 20,
        y: 0,
        width: 8,
        height: 4,
        pixelRatio: 1
      });
    });

    it('面填充与轮廓都为图片符号时，预览仍取面填充符号的 symbolId', () => {
      const fillSprite = { x: 0, y: 0, width: 20, height: 20, pixelRatio: 1 };
      const outlineSprite = { x: 40, y: 0, width: 8, height: 4, pixelRatio: 1 };
      instance._sprite = 'http://localhost:8190/iportal/web/maps/3/sprites/sprite';
      instance._spriteDatas = {
        'fill-symbol': fillSprite,
        'line-outline': outlineSprite
      };
      const result = instance._parseLegendtyle({
        legendRenderType: 'FILL',
        customValue: {
          symbolsContent: {
            symbolId: 'fill-symbol',
            style: { paint: { 'fill-pattern': 'fill-texture' } }
          },
          outlineSymbolsContent: {
            symbolId: 'line-outline',
            style: { paint: { 'line-pattern': 'line-texture' } }
          }
        }
      });

      expect(result.type).toBe('image');
      // 预览图必须是面填充符号而不是轮廓符号
      expect(result.sprite).toEqual(fillSprite);
      expect(result.outlineSymbolsContent.symbolId).toBe('line-outline');
    });

    it('轮廓图块元数据缺失时返回矢量样式与雪碧图地址，由图例组件请求 sprite.json 兜底', () => {
      instance._sprite = 'http://localhost:8190/iportal/web/maps/2/sprites/sprite';
      instance._spriteDatas = {};
      const result = instance._parseLegendtyle({
        legendRenderType: 'FILL',
        customValue: {
          outlineSymbolsContent: {
            symbolId: 'line-outline',
            style: { paint: { 'line-pattern': 'line-texture' } }
          }
        }
      });

      expect(result.type).toBe('style');
      expect(result.url).toBe('http://localhost:8190/iportal/web/maps/2/sprites/sprite.png');
      expect(result.outlineSprites).toBeUndefined();
    });
  });
});

describe('WebMapV3 - constructor', () => {
  it('should initialize default properties', () => {
    const WebMapV3 = createWebMapV3Extending(TestEvents, {
      MapManager: function () {},
      mapRepo: { LngLat: function () {} },
      crsManager: mockCrsManager,
      l7LayerUtil: { getL7MarkerLayers: () => ({}) },
      webMapService: {}
    });
    const inst = new WebMapV3(123, { target: 'map', relatedInfo: { description: 'desc' } }, { zoom: 5 });

    expect(inst.mapId).toBe(123);
    expect(inst.options.target).toBe('map');
    expect(inst.mapOptions).toEqual({ zoom: 5 });
    expect(inst._relatedInfo).toEqual({ description: 'desc' });
    expect(inst._mapResourceInfo).toEqual({});
    expect(inst._sprite).toBe('');
    expect(inst._spriteDatas).toEqual({});
    expect(inst._appendLayers).toBe(false);
    expect(inst._baseProjection).toBe('');
  });

  it('should default relatedInfo to empty object', () => {
    const { instance } = createTestContext();
    expect(instance._relatedInfo).toEqual({});
  });
});

describe('WebMapV3 - initializeMap extra paths', () => {
  it('should fire projectionnotmatch and return when projection differs', () => {
    const crsManager = {
      isSameProjection: () => false,
      registerCRS: () => {}
    };
    const { instance } = createTestContext({ crsManager });
    spyOn(instance, 'fire');
    spyOn(instance, '_initLayers');

    instance.initializeMap({ crs: 'EPSG:4326' }, {});

    expect(instance.fire).toHaveBeenCalledWith('projectionnotmatch');
    expect(instance._appendLayers).toBe(false);
    expect(instance._initLayers).not.toHaveBeenCalled();
  });

  it('should add sprite style when map info has sprite', () => {
    const { instance } = createTestContext();
    spyOn(instance, '_initLayers');
    const map = {
      addStyle: jasmine.createSpy('addStyle'),
      addLocalIdeographFontFamily: jasmine.createSpy('addLocalIdeographFontFamily')
    };

    instance.initializeMap({ crs: 'EPSG:3857', sprite: 'http://x/sprite' }, map);

    expect(map.addStyle).toHaveBeenCalledWith({ sprite: 'http://x/sprite' });
    expect(instance._sprite).toBe('http://x/sprite');
  });

  it('should call _createMap when no map is provided', () => {
    const { instance } = createTestContext();
    spyOn(instance, '_createMap');

    instance.initializeMap({ crs: 'EPSG:3857' });

    expect(instance._createMap).toHaveBeenCalled();
  });

  it('should register object crs and use crs.name as base projection', () => {
    const registerCRS = jasmine.createSpy('registerCRS');
    const crsManager = { isSameProjection: () => true, registerCRS };
    const { instance } = createTestContext({ crsManager });
    spyOn(instance, '_initLayers');

    instance.initializeMap({ crs: { name: 'EPSG:9999' } }, { addLocalIdeographFontFamily: () => {} });

    expect(registerCRS).toHaveBeenCalledWith({ name: 'EPSG:9999' });
    expect(instance._baseProjection).toBe('EPSG:9999');
  });
});

describe('WebMapV3 - cleanLayers and clean', () => {
  it('cleanLayers should call super.cleanLayers and remove l7 marker layers', () => {
    const getL7MarkerLayers = jasmine
      .createSpy('getL7MarkerLayers')
      .and.returnValue({ marker1: {}, marker2: {} });
    const { instance, l7LayerUtil } = createTestContext({ withMapBase: true });
    l7LayerUtil.getL7MarkerLayers = getL7MarkerLayers;
    instance.map = { $l7scene: { id: 'scene' } };

    instance.cleanLayers([]);

    expect(l7LayerUtil.removeL7MarkerLayer).toHaveBeenCalledWith('marker1', { id: 'scene' });
    expect(l7LayerUtil.removeL7MarkerLayer).toHaveBeenCalledWith('marker2', { id: 'scene' });
  });

  it('clean should destroy source model and remove map when removeMap is true', () => {
    const { instance } = createTestContext({ withMapBase: true });
    const removeAllLayer = jasmine.createSpy('removeAllLayer');
    const remove = jasmine.createSpy('remove');
    const destroy = jasmine.createSpy('destroy');
    instance.map = { $l7scene: { removeAllLayer }, remove };
    instance._sourceListModel = { destroy };

    instance.clean(true);

    expect(destroy).toHaveBeenCalled();
    expect(removeAllLayer).toHaveBeenCalled();
    expect(remove).toHaveBeenCalled();
    expect(instance.map).toBeNull();
    expect(instance._legendList).toEqual([]);
    expect(instance._mapResourceInfo).toEqual({});
    expect(instance._sprite).toBe('');
    expect(instance._spriteDatas).toEqual({});
    expect(instance.mapOptions).toEqual({});
    expect(instance.options).toEqual({});
  });

  it('clean should not remove the map instance when removeMap is false but still detach it', () => {
    const { instance } = createTestContext({ withMapBase: true });
    const map = { $l7scene: undefined, remove: jasmine.createSpy('remove') };
    const destroy = jasmine.createSpy('destroy');
    instance.map = map;
    instance._sourceListModel = { destroy };

    expect(() => instance.clean(false)).not.toThrow();

    expect(destroy).toHaveBeenCalled();
    // removeMap 仅控制是否调用 map.remove()，this.map 仍会被置空
    expect(map.remove).not.toHaveBeenCalled();
    expect(instance.map).toBeNull();
  });

  it('clean should do nothing when map is null', () => {
    const { instance } = createTestContext({ withMapBase: true });
    instance.map = null;
    expect(() => instance.clean()).not.toThrow();
  });
});

describe('WebMapV3 - copyLayer', () => {
  it('should return undefined when source layer does not exist in map info', async () => {
    const { instance } = createTestContext();
    instance._mapInfo = { layers: [{ id: 'l1' }] };

    const result = await instance.copyLayer('missing');

    expect(result).toBeUndefined();
  });

  it('should return undefined when target layer id is already on map', async () => {
    const { instance } = createTestContext();
    instance._mapInfo = { layers: [{ id: 'l1' }] };
    instance.map = { overlayLayersManager: { newId: {} } };

    const result = await instance.copyLayer('l1', { id: 'newId' });

    expect(result).toBeUndefined();
  });

  it('should copy non-L7 layer with object source by adding source then layer', async () => {
    const { instance } = createTestContext();
    instance._mapInfo = { layers: [{ id: 'l1', source: { type: 'geojson' } }] };
    const addSource = jasmine.createSpy('addSource');
    const addLayer = jasmine.createSpy('addLayer');
    instance.map = { overlayLayersManager: {}, getLayer: () => undefined, addSource, addLayer };

    const result = await instance.copyLayer('l1');

    expect(result.id).toBe('l1_copy');
    expect(addSource).toHaveBeenCalledWith('l1_copy', { type: 'geojson' });
    expect(result.source).toBe('l1_copy');
    expect(addLayer).toHaveBeenCalledWith(result);
  });

  it('should copy non-L7 layer with string source directly', async () => {
    const { instance } = createTestContext();
    instance._mapInfo = { layers: [{ id: 'l1', source: 's1' }] };
    const addLayer = jasmine.createSpy('addLayer');
    instance.map = { overlayLayersManager: {}, getLayer: () => undefined, addLayer };

    const result = await instance.copyLayer('l1', { id: 'l1_clone' });

    expect(result.id).toBe('l1_clone');
    expect(result.source).toBe('s1');
    expect(addLayer).toHaveBeenCalledWith(result);
  });

  it('should add copied layer through l7LayerUtil when it is an L7 layer', async () => {
    const { instance, l7LayerUtil } = createTestContext();
    instance._mapInfo = { layers: [{ id: 'l1', source: 's1' }], sources: { s1: {} } };
    instance.map = { overlayLayersManager: {}, getLayer: () => undefined };
    l7LayerUtil.isL7Layer.and.returnValue(true);

    const result = await instance.copyLayer('l1');

    expect(l7LayerUtil.addL7Layers).toHaveBeenCalled();
    expect(result.id).toBe('l1_copy');
  });
});

describe('WebMapV3 - updateOverlayLayer', () => {
  it('should merge features and set source data for geojson render source', () => {
    const { instance } = createTestContext();
    const setData = jasmine.createSpy('setData');
    instance.map = { getSource: () => ({ setData }) };
    const features = [{ type: 'Feature', properties: {}, geometry: { type: 'Point', coordinates: [0, 0] } }];

    instance.updateOverlayLayer({ renderSource: { type: 'geojson', id: 's1' } }, features);

    expect(setData).toHaveBeenCalled();
    const arg = setData.calls.mostRecent().args[0];
    expect(arg.type).toBe('FeatureCollection');
    expect(arg.features[0].properties.index).toBe(0);
  });

  it('should do nothing for non-geojson render source', () => {
    const { instance } = createTestContext();
    instance.map = { getSource: jasmine.createSpy('getSource') };

    instance.updateOverlayLayer({ renderSource: { type: 'vector', id: 's1' } }, []);

    expect(instance.map.getSource).not.toHaveBeenCalled();
  });
});

describe('WebMapV3 - _getTransformRequest', () => {
  it('should return custom transformRequest from mapOptions', () => {
    const { instance } = createTestContext();
    const custom = () => {};
    instance.mapOptions = { transformRequest: custom };

    expect(instance._getTransformRequest()).toBe(custom);
  });

  it('default request should return url and undefined credentials for non tile resource', () => {
    const { instance } = createTestContext();

    const result = instance._getTransformRequest()('http://x/a', 'Source');

    expect(result.url).toBe('http://x/a');
    expect(result.credentials).toBeUndefined();
  });

  it('default request should include credentials when url matches iportal proxy prefix', () => {
    const { instance } = createTestContext();
    instance.options.iportalServiceProxyUrlPrefix = 'http://x/proxy/';

    const result = instance._getTransformRequest()('http://x/proxy/a', 'Source');

    expect(result.credentials).toBe('include');
  });

  it('default request should spread tileTransformRequest for Tile resource', () => {
    const { instance } = createTestContext();
    instance.options.tileTransformRequest = (url) => ({ url: url + '?token=1' });

    const result = instance._getTransformRequest()('http://x/tile', 'Tile');

    expect(result.url).toBe('http://x/tile?token=1');
    expect(result.credentials).toBeUndefined();
  });

  it('default request should handle Image resource like Tile', () => {
    const { instance } = createTestContext();

    const result = instance._getTransformRequest()('http://x/img', 'Image');

    expect(result.url).toBe('http://x/img');
  });
});

describe('WebMapV3 - _registerMapCRS', () => {
  it('should return string crs directly', () => {
    const registerCRS = jasmine.createSpy('registerCRS');
    const crsManager = { registerCRS };
    const { instance } = createTestContext({ crsManager });

    expect(instance._registerMapCRS({ crs: 'EPSG:3857' })).toBe('EPSG:3857');
    expect(registerCRS).not.toHaveBeenCalled();
  });

  it('should register object crs and return its name', () => {
    const registerCRS = jasmine.createSpy('registerCRS');
    const crsManager = { registerCRS };
    const { instance } = createTestContext({ crsManager });

    expect(instance._registerMapCRS({ crs: { name: 'CRS_X' } })).toBe('CRS_X');
    expect(registerCRS).toHaveBeenCalledWith({ name: 'CRS_X' });
  });
});

describe('WebMapV3 - popup info', () => {
  it('_getFieldCaption should return field captions of matching dataset', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = {
      datas: [
        { datasets: [{ msDatasetId: 1, fieldsCaptions: { NAME: '名称' } }] },
        { datasets: [{ msDatasetId: 2, fieldsCaptions: { AGE: '年龄' } }] }
      ]
    };

    expect(instance._getFieldCaption(2)).toEqual({ AGE: '年龄' });
  });

  it('_getFieldCaption should return null when no match', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = { datas: [{ datasets: [{ msDatasetId: 1 }] }] };

    expect(instance._getFieldCaption(99)).toBeNull();
  });

  it('_getFieldCaption should handle data without datasets and empty datas', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = { datas: [{}] };
    expect(instance._getFieldCaption(1)).toBeNull();

    instance._mapResourceInfo = {};
    expect(instance._getFieldCaption(1)).toBeNull();
  });

  it('_getPopupInfoContent should map FIELD element captions', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = {
      datas: [{ datasets: [{ msDatasetId: 1, fieldsCaptions: { NAME: '名称' } }] }]
    };
    const data = {
      elements: [
        { type: 'FIELD', fieldName: 'NAME' },
        { type: 'FIELD', fieldName: 'OTHER' },
        { type: 'TEXT' }
      ]
    };

    const result = instance._getPopupInfoContent(data, 1);

    expect(result.elements[0].fieldCaption).toBe('名称');
    expect(result.elements[1].fieldCaption).toBe('OTHER');
    expect(result.elements[2]).toEqual({ type: 'TEXT' });
    // 原数据不应被修改
    expect(data.elements[0].fieldCaption).toBeUndefined();
  });

  it('_getPopupInfoContent should return clone unchanged when no field captions', () => {
    const { instance } = createTestContext();
    const data = { elements: [{ type: 'FIELD', fieldName: 'NAME' }] };

    const result = instance._getPopupInfoContent(data, 1);

    expect(result).not.toBe(data);
    expect(result.elements[0].fieldCaption).toBeUndefined();
  });

  it('_getPopupInfoContent should empty elements when captions exist but elements missing', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = {
      datas: [{ datasets: [{ msDatasetId: 1, fieldsCaptions: { NAME: '名称' } }] }]
    };

    const result = instance._getPopupInfoContent({}, 1);

    expect(result.elements).toEqual([]);
  });

  it('_getPopupInfoByCatalog should collect popup info from layer and recurse groups', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = {
      datas: [{ datasets: [{ msDatasetId: 1, fieldsCaptions: {} }] }]
    };
    const catalog = {
      catalogType: 'group',
      children: [
        {
          catalogType: 'layer',
          id: 'l1',
          title: 'Layer1',
          msDatasetId: 1,
          layersContent: ['l1'],
          popupInfo: { elements: [] }
        },
        { catalogType: 'layer', id: 'l2' }
      ]
    };
    const res = [];

    instance._getPopupInfoByCatalog(catalog, res);

    expect(res.length).toBe(1);
    expect(res[0].layerId).toEqual(['l1']);
    expect(res[0].title).toBe('Layer1');
  });

  it('_getPopupInfos should walk catalogs of map resource info', () => {
    const { instance } = createTestContext();
    instance._mapResourceInfo = {
      datas: [],
      catalogs: [
        {
          catalogType: 'layer',
          id: 'l1',
          title: 'Layer1',
          msDatasetId: 1,
          layersContent: ['l1'],
          popupInfo: { elements: [] }
        }
      ]
    };

    expect(instance._getPopupInfos().length).toBe(1);
  });
});

describe('WebMapV3 - _initLayers', () => {
  it('object mapId with projectInfo should parse resource and add layers', async () => {
    const { instance } = createTestContext();
    instance.mapId = { id: 'x' };
    instance._mapInfo = { name: 'Map' };
    instance._relatedInfo = { description: 'd', projectInfo: '{"catalogs":[]}' };
    const changeMapInfoFilter = spyOn(instance, '_changeMapInfoFilter');
    const createMapRelatedInfo = spyOn(instance, '_createMapRelatedInfo');
    const addLayersToMap = spyOn(instance, '_addLayersToMap');

    await instance._initLayers();

    expect(instance._mapResourceInfo).toEqual({ catalogs: [] });
    expect(instance.mapParams).toEqual({ title: 'Map', description: 'd' });
    expect(changeMapInfoFilter).toHaveBeenCalled();
    expect(createMapRelatedInfo).toHaveBeenCalled();
    expect(addLayersToMap).toHaveBeenCalled();
  });

  it('object mapId without projectInfo should skip filter change', async () => {
    const { instance } = createTestContext();
    instance.mapId = { id: 'x' };
    instance._mapInfo = { name: 'Map' };
    instance._relatedInfo = {};
    const changeMapInfoFilter = spyOn(instance, '_changeMapInfoFilter');
    spyOn(instance, '_createMapRelatedInfo');
    spyOn(instance, '_addLayersToMap');

    await instance._initLayers();

    expect(changeMapInfoFilter).not.toHaveBeenCalled();
  });

  it('string mapId should fetch related info and add layers', async () => {
    const { instance } = createTestContext();
    instance.mapId = 100;
    instance.options.server = 'http://localhost:8190/iportal/';
    instance._mapInfo = { name: 'Map' };
    spyOn(FetchRequest, 'get').and.resolveTo(
      new Response(JSON.stringify({ description: 'desc', projectInfo: '{"catalogs":[]}' }))
    );
    spyOn(instance, '_changeMapInfoFilter');
    spyOn(instance, '_createMapRelatedInfo');
    spyOn(instance, '_addLayersToMap');

    await instance._initLayers();
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(instance.mapParams).toEqual({ title: 'Map', description: 'desc' });
    expect(instance._mapResourceInfo).toEqual({ catalogs: [] });
    expect(instance._addLayersToMap).toHaveBeenCalled();
  });

  it('string mapId fetch failure should fire mapcreatefailed', async () => {
    const { instance } = createTestContext();
    instance.mapId = 101;
    instance.options.server = 'http://localhost:8190/iportal/';
    instance._mapInfo = { name: 'Map' };
    spyOn(FetchRequest, 'get').and.rejectWith(new Error('network'));
    spyOn(console, 'error');
    const fire = spyOn(instance, 'fire');

    await instance._initLayers();
    await new Promise((resolve) => setTimeout(resolve, 10));

    expect(fire).toHaveBeenCalledWith('mapcreatefailed', { error: jasmine.any(Error) });
  });
});

describe('WebMapV3 - _changeMapInfoFilter', () => {
  it('should convert filters of layers that have one', () => {
    const { instance, mapRepo } = createTestContext();
    instance._mapInfo = {
      layers: [{ id: 'l1', filter: ['==', 'Ctype', ''] }, { id: 'l2' }]
    };

    instance._changeMapInfoFilter();

    expect(mapRepo.convertFilter).toHaveBeenCalledWith(['==', 'Ctype', '']);
    expect(instance._mapInfo.layers[1]).toEqual({ id: 'l2' });
  });

  it('should do nothing when mapRepo has no convertFilter', () => {
    const { instance } = createTestContext();
    instance.mapRepo = {};
    instance._mapInfo = { layers: [{ filter: ['x'] }] };

    expect(() => instance._changeMapInfoFilter()).not.toThrow();
    expect(instance._mapInfo.layers[0].filter).toEqual(['x']);
  });
});

describe('WebMapV3 - _createMapRelatedInfo', () => {
  it('should add each glyph entry to map style', () => {
    const { instance } = createTestContext();
    const addGlyphs = jasmine.createSpy('addGlyphs');
    instance.map = { style: { addGlyphs } };
    instance._mapInfo = { glyphs: { 'supermap-font': 'http://x/font', other: 'http://x/other' } };

    instance._createMapRelatedInfo();

    expect(addGlyphs).toHaveBeenCalledWith('supermap-font', 'http://x/font');
    expect(addGlyphs).toHaveBeenCalledWith('other', 'http://x/other');
  });

  it('should not throw when glyphs is undefined', () => {
    const { instance } = createTestContext();
    instance.map = { style: {} };
    instance._mapInfo = {};
    expect(() => instance._createMapRelatedInfo()).not.toThrow();
  });
});

describe('WebMapV3 - _getMapRelatedInfo', () => {
  it('should request map resource and parse json', async () => {
    const { instance } = createTestContext();
    instance.mapId = 200;
    instance.options = { server: 'http://localhost:8190/iportal/' };
    const json = jasmine.createSpy('json').and.resolveTo({ description: '' });
    spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
      expect(url).toBe('http://localhost:8190/iportal/web/maps/200.json');
      expect(params).toBeNull();
      expect(options).toEqual({ withCredentials: true });
      return Promise.resolve({ json });
    });

    const result = await instance._getMapRelatedInfo();

    expect(json).toHaveBeenCalled();
    expect(result).toEqual({ description: '' });
  });
});

describe('WebMapV3 - _addLayersToMap', () => {
  function setupAddLayers() {
    const ctx = createTestContext();
    const { instance, l7LayerUtil } = ctx;
    const addSource = jasmine.createSpy('addSource');
    const addLayer = jasmine.createSpy('addLayer');
    instance.map = {
      getSource: () => undefined,
      addSource,
      addLayer,
      getLayer: () => undefined,
      overlayLayersManager: {}
    };
    instance._mapInfo = {
      sources: {
        s1: { type: 'geojson', data: { type: 'supermap-rest-data' } },
        s2: { type: 'vector' }
      },
      layers: [
        { id: 'l1', source: 's1' },
        { id: 'l2', source: 's2', metadata: { reused: true } },
        { id: 'l3', source: 's2' }
      ],
      metadata: { layerCatalog: [] }
    };
    instance._mapResourceInfo = { catalogs: [] };
    instance.options = { server: 'http://localhost:8190/iportal/' };
    l7LayerUtil.isL7Layer.and.callFake((layer) => layer.id === 'l3');
    l7LayerUtil.getRestDataGeojsonByWebMap.and.resolveTo({ converted: true });
    spyOn(instance, '_createLegendInfo');
    spyOn(instance, '_sendMapToUser');
    return ctx;
  }

  it('should convert rest data, add new layers and add L7 layers', async () => {
    const { instance, l7LayerUtil } = setupAddLayers();

    await instance._addLayersToMap();

    expect(l7LayerUtil.getRestDataGeojsonByWebMap).toHaveBeenCalled();
    expect(instance._mapInfo.sources.s1.data).toEqual({ converted: true });
    // 只有 l1 上图，reused 的 l2 跳过，l3 走 L7
    expect(instance.map.addSource).toHaveBeenCalledTimes(1);
    expect(instance.map.addSource).toHaveBeenCalledWith('s1', { type: 'geojson', data: { converted: true } });
    expect(instance.map.addLayer).toHaveBeenCalledTimes(1);
    expect(instance.map.addLayer).toHaveBeenCalledWith(instance._mapInfo.layers[0]);
    expect(l7LayerUtil.addL7Layers).toHaveBeenCalled();
    expect(instance._createLegendInfo).toHaveBeenCalled();
    expect(instance._sendMapToUser).toHaveBeenCalled();
  });

  it('should fire mapcreatefailed when an error is thrown', async () => {
    const { instance } = createTestContext();
    instance.map = {};
    instance._mapInfo = {};
    spyOn(console, 'error');
    const fire = spyOn(instance, 'fire');

    await instance._addLayersToMap();

    expect(fire).toHaveBeenCalledWith('mapcreatefailed', { error: jasmine.any(Error), map: instance.map });
  });
});

describe('WebMapV3 - _getAddL7LayersParams', () => {
  it('should assemble params with bound emitter and transform request', () => {
    const { instance } = createTestContext();
    instance.map = { id: 'map' };
    instance._mapInfo = { name: 'm' };
    instance._spriteDatas = { icon: {} };
    const layers = [{ id: 'l1' }];
    const sources = { s1: {} };
    const l7Layers = [{ id: 'l1' }];

    const params = instance._getAddL7LayersParams(layers, sources, l7Layers);

    expect(params.map).toBe(instance.map);
    expect(params.webMapInfo).toEqual({ name: 'm', layers, sources });
    expect(params.l7Layers).toBe(l7Layers);
    expect(params.spriteDatas).toEqual({ icon: {} });
    expect(params.options.emitterEvent).toEqual(jasmine.any(Function));
    expect(params.options.transformRequest).toEqual(jasmine.any(Function));
  });
});

describe('WebMapV3 - _setUniqueId', () => {
  function buildSetUniqueContext(existingSources = {}, existingLayers = {}) {
    const ctx = createTestContext();
    const { instance } = ctx;
    instance.map = {
      getSource: jasmine.createSpy('getSource').and.callFake((id) => existingSources[id]),
      getLayer: jasmine.createSpy('getLayer').and.callFake((id) => existingLayers[id]),
      overlayLayersManager: {}
    };
    return ctx;
  }

  function baseMapInfo() {
    return {
      sources: { s1: { type: 'geojson' } },
      layers: [{ id: 'l1', source: 's1' }],
      metadata: { layerCatalog: [{ id: 'l1', type: 'layer', parts: ['l1'] }] }
    };
  }

  it('should keep ids when nothing exists on map', () => {
    const { instance } = buildSetUniqueContext();
    const result = instance._setUniqueId(baseMapInfo(), { catalogs: [] });

    expect(Object.keys(result.sources)).toEqual(['s1']);
    expect(result.layers[0].id).toBe('l1');
    expect(result.layers[0].source).toBe('s1');
    expect(result.layerCatalog[0].id).toBe('l1');
    expect(result.layerCatalog[0].parts).toEqual(['l1']);
    expect(result.catalogs).toEqual([]);
  });

  it('should rename source and update layer source when source exists', () => {
    const { instance } = buildSetUniqueContext({ s1: {} });
    const result = instance._setUniqueId(baseMapInfo(), {});

    const sourceId = Object.keys(result.sources)[0];
    expect(sourceId).toMatch(/^s1_\d+$/);
    expect(result.layers[0].source).toBe(sourceId);
  });

  it('should rename layer when layer exists', () => {
    const { instance } = buildSetUniqueContext({}, { l1: {} });
    const result = instance._setUniqueId(baseMapInfo(), {
      catalogs: [{ id: 'l1', catalogType: 'layer', layersContent: ['l1'] }]
    });

    expect(result.layers[0].id).toMatch(/^l1_\d+$/);
    expect(result.layerCatalog[0].id).toMatch(/^l1_\d+$/);
    expect(result.layerCatalog[0].parts[0]).toMatch(/^l1_\d+$/);
    expect(result.catalogs[0].id).toMatch(/^l1_\d+$/);
    expect(result.catalogs[0].layersContent[0]).toMatch(/^l1_\d+$/);
  });

  it('should mark layer reused when checkSameLayer and raster sources match', () => {
    const { instance } = buildSetUniqueContext({ existSource: { type: 'raster', tiles: ['http://localhost:8190/t/a/{z}/{x}/{y}.png'] } }, { l1: { source: 'existSource' } });
    instance.options.checkSameLayer = true;
    const mapInfo = baseMapInfo();
    mapInfo.sources.s1 = { type: 'raster', tiles: ['http://localhost:8190/t/a/{z}/{x}/{y}.png?x=1'] };

    const result = instance._setUniqueId(mapInfo, { catalogs: [] });

    expect(result.layers[0].metadata.reused).toBe(true);
    expect(result.layers[0].source).toBe('s1');
    expect(result.layers[0].id).toBe('l1');
  });
});

describe('WebMapV3 - _getLayerOnMap', () => {
  it('should return overlay layer from overlayLayersManager first', () => {
    const { instance } = createTestContext();
    instance.map = {
      overlayLayersManager: { l1: { id: 'overlay' } },
      getLayer: jasmine.createSpy('getLayer')
    };

    expect(instance._getLayerOnMap('l1')).toEqual({ id: 'overlay' });
    expect(instance.map.getLayer).not.toHaveBeenCalled();
  });

  it('should return l7 marker layer when not in overlay manager', () => {
    const getL7MarkerLayers = jasmine.createSpy().and.returnValue({ l1: { id: 'marker' } });
    const { instance, l7LayerUtil } = createTestContext();
    l7LayerUtil.getL7MarkerLayers = getL7MarkerLayers;
    instance.map = { overlayLayersManager: {}, getLayer: jasmine.createSpy('getLayer') };

    expect(instance._getLayerOnMap('l1')).toEqual({ id: 'marker' });
    expect(instance.map.getLayer).not.toHaveBeenCalled();
  });

  it('should fall back to map.getLayer', () => {
    const { instance } = createTestContext();
    instance.map = { overlayLayersManager: {}, getLayer: (id) => ({ id }) };

    expect(instance._getLayerOnMap('l1')).toEqual({ id: 'l1' });
  });
});

describe('WebMapV3 - catalog find and delete', () => {
  const tree = () => [
    { id: 'a' },
    { id: 'g', children: [{ id: 'b' }, { id: 'g2', children: [{ id: 'c' }] }] }
  ];

  it('_findLayerCatalog should find nodes recursively', () => {
    const { instance } = createTestContext();
    expect(instance._findLayerCatalog(tree(), 'a').id).toBe('a');
    expect(instance._findLayerCatalog(tree(), 'c').id).toBe('c');
    expect(instance._findLayerCatalog(tree(), 'missing')).toBeNull();
  });

  it('_deleteLayerCatalog should remove nodes recursively', () => {
    const { instance } = createTestContext();
    const data = tree();
    instance._deleteLayerCatalog(data, 'c');
    expect(instance._findLayerCatalog(data, 'c')).toBeNull();
    expect(data[1].children[1].children).toEqual([]);

    instance._deleteLayerCatalog(data, 'a');
    expect(data[0].id).toBe('g');
  });
});

describe('WebMapV3 - _updateLayerCatalogsId', () => {
  it('should rename layer ids inside groups and parts', () => {
    const { instance } = createTestContext();
    const catalogs = [
      { type: 'group', children: [{ type: 'layer', id: 'l1', parts: ['l1'] }] }
    ];
    const layerIdMapList = [{ originId: 'l1', renderId: 'l1_new', id: 'l1' }];

    instance._updateLayerCatalogsId({ loopData: JSON.parse(JSON.stringify(catalogs)), catalogs, layerIdMapList, unspportedLayers: [] });

    expect(catalogs[0].children[0].id).toBe('l1_new');
    expect(catalogs[0].children[0].parts).toEqual(['l1_new']);
  });

  it('should delete catalogs of unsupported layers', () => {
    const { instance } = createTestContext();
    const catalogs = [{ type: 'layer', id: 'l2', parts: ['l2'] }];

    instance._updateLayerCatalogsId({ loopData: JSON.parse(JSON.stringify(catalogs)), catalogs, layerIdMapList: [], unspportedLayers: ['l2'] });

    expect(catalogs).toEqual([]);
  });
});

describe('WebMapV3 - _sendMapToUser', () => {
  it('should create source model and fire mapcreatesucceeded', () => {
    const { instance } = createTestContext({ withMapBase: true });
    instance.mapParams = { title: 'Map' };
    instance.map = {
      getStyle: () => ({ layers: [], sources: {} }),
      getLayer: () => undefined,
      getSource: () => undefined,
      on: jasmine.createSpy('on'),
      off: jasmine.createSpy('off'),
      overlayLayersManager: {}
    };
    instance._mapInfo = { metadata: { layerCatalog: [] }, layers: [], sources: {} };
    instance._mapResourceInfo = { catalogs: [] };

    let event;
    instance.on({
      mapcreatesucceeded: (params) => {
        event = params;
      }
    });

    instance._sendMapToUser();

    expect(instance._sourceListModel).toBeTruthy();
    expect(event.map).toBe(instance.map);
    expect(event.mapparams).toEqual({ title: 'Map' });
    expect(event.layers).toEqual([]);
  });

  it('should relay layerupdatechanged from the source model', () => {
    const { instance } = createTestContext({ withMapBase: true });
    instance.map = {
      getStyle: () => ({ layers: [], sources: {} }),
      getLayer: () => undefined,
      getSource: () => undefined,
      on: () => {},
      off: () => {},
      overlayLayersManager: {}
    };
    instance._mapInfo = { metadata: { layerCatalog: [] }, layers: [], sources: {} };
    instance._mapResourceInfo = { catalogs: [] };

    let relayed;
    instance.on({ layerupdatechanged: (params) => (relayed = params) });

    instance._sendMapToUser();
    instance._sourceListModel.triggerEvent('layerupdatechanged', { layers: [] });

    // triggerEvent 会在事件对象上附加 object/element/type 等字段，只校验业务字段
    expect(relayed.layers).toEqual([]);
  });
});

describe('WebMapV3 - small parsers', () => {
  it('_renameLayerIdsContent should pass through falsy ids and rename matched', () => {
    const { instance } = createTestContext();
    expect(instance._renameLayerIdsContent(null, [])).toBeNull();
    const map = [{ originId: 'a', renderId: 'a_new' }];
    expect(instance._renameLayerIdsContent(['a'], map)).toEqual(['a_new']);
  });

  it('_parseRendererStyleData should wrap object renderer in array', () => {
    const { instance } = createTestContext();
    expect(instance._parseRendererStyleData([1, 2])).toEqual([1, 2]);
    expect(instance._parseRendererStyleData({ id: 1 })).toEqual([{ id: 1 }]);
  });
});

describe('WebMapV3 - sprite datas', () => {
  beforeEach(() => {
    spyOn(FetchRequest, 'get').and.callFake((url) =>
      Promise.resolve(new Response(JSON.stringify({ [url]: { width: 10, height: 10 } })))
    );
  });

  it('_getSpriteDatas should return undefined when no sprite', () => {
    const { instance } = createTestContext();
    expect(instance._getSpriteDatas()).toBeUndefined();
  });

  it('_getSpriteDatas should fetch string sprite and merge data', async () => {
    const { instance } = createTestContext();
    instance.options.server = 'http://localhost:8190/iportal/';
    instance._sprite = 'http://localhost:8190/iportal/web/maps/1/sprites/sprite';

    await instance._getSpriteDatas();

    expect(Object.keys(instance._spriteDatas)[0]).toBe(
      'http://localhost:8190/iportal/web/maps/1/sprites/sprite'
    );
  });

  it('_getSpriteDatas should fetch every value of object sprite', async () => {
    const { instance } = createTestContext();
    instance.options.server = 'http://localhost:8190/iportal/';
    instance._sprite = {
      a: 'http://localhost:8190/iportal/web/maps/1/sprites/a',
      b: 'http://localhost:8190/iportal/web/maps/1/sprites/b'
    };

    await instance._getSpriteDatas();

    expect(Object.keys(instance._spriteDatas).length).toBe(2);
  });

  it('_getSpriteData should rewrite url to server-relative path and parse json', async () => {
    const { instance } = createTestContext();
    instance.options.server = 'http://localhost:8190/iportal/';

    const result = await instance._getSpriteData('http://other/host/web/maps/9/sprites/s');

    expect(FetchRequest.get).toHaveBeenCalledWith(
      'http://localhost:8190/iportal/web/maps/9/sprites/s',
      null,
      { withCredentials: true }
    );
    expect(result).toEqual({
      'http://localhost:8190/iportal/web/maps/9/sprites/s': { width: 10, height: 10 }
    });
  });
});

describe('WebMapV3 - _createLegendInfo', () => {
  function legendCatalog(renderer, extra = {}) {
    return {
      catalogType: 'layer',
      id: 'l1',
      title: 'Layer1',
      layersContent: ['l1'],
      visualization: { renderer },
      ...extra
    };
  }

  const circleRenderer = () => ({
    type: 'circle',
    color: { type: 'simple', value: '#FF0000' },
    size: { type: 'simple', value: 5 },
    opacity: { type: 'simple', value: 1 },
    symbolsContent: { type: 'simple', value: { symbolId: 'circle' } }
  });

  it('should create legends for rendered layers and skip layers without renderer', () => {
    const { instance } = createTestContext();
    instance._legendList = [];
    instance._mapInfo = {
      layers: [{ id: 'l1', type: 'circle', source: 's1' }],
      sources: { s1: {} }
    };
    instance._mapResourceInfo = {
      catalogs: [legendCatalog([circleRenderer()]), { catalogType: 'layer', id: 'l2', visualization: {} }]
    };

    instance._createLegendInfo();

    expect(instance._legendList.length).toBe(1);
    expect(instance._legendList[0].layerId).toBe('l1');
    expect(instance._legendList[0].styleGroup[0].fieldValue).toBe('Layer1');
    expect(instance._legendList[0].styleGroup[0].style.shape).toBe('POINT');
  });

  it('should handle object renderer (cluster layers)', () => {
    const { instance } = createTestContext();
    instance._legendList = [];
    instance._mapInfo = {
      layers: [{ id: 'l1', type: 'circle', source: 's1' }],
      sources: { s1: {} }
    };
    instance._mapResourceInfo = { catalogs: [legendCatalog(circleRenderer())] };

    instance._createLegendInfo();

    expect(instance._legendList.length).toBe(1);
  });

  it('should use clusterField as theme field', () => {
    const { instance } = createTestContext();
    instance._legendList = [];
    instance._mapInfo = {
      layers: [{ id: 'l1', type: 'circle', source: 's1' }],
      sources: { s1: { clusterField: 'CLUSTER_COUNT' } }
    };
    instance._mapResourceInfo = { catalogs: [legendCatalog([circleRenderer()])] };

    instance._createLegendInfo();

    expect(instance._legendList[0].themeField).toBe('CLUSTER_COUNT');
  });

  it('should append text style for point renderer with text field', () => {
    const { instance } = createTestContext();
    instance._legendList = [];
    instance._mapInfo = {
      layers: [{ id: 'l1', type: 'circle', source: 's1' }],
      sources: { s1: {} }
    };
    const renderer = circleRenderer();
    renderer.textField = { value: '{NAME}' };
    instance._mapResourceInfo = { catalogs: [legendCatalog([renderer])] };

    instance._createLegendInfo();

    const textLegend = instance._legendList.find((item) => item.styleGroup[0].style.icon === 'supermapol-icons-text-layer');
    expect(textLegend).toBeTruthy();
  });
});

describe('WebMapV3 - style key translation', () => {
  it('_getAliasKey should alias dashArray for isoline3D', () => {
    const { instance } = createTestContext();
    expect(instance._getAliasKey('isoline3D', 'dashArray')).toBe('lineDasharray');
    expect(instance._getAliasKey('isoline3D', 'color')).toBe('color');
    expect(instance._getAliasKey('line', 'dashArray')).toBe('dashArray');
  });

  it('_transStyleKeys should map every key', () => {
    const { instance } = createTestContext();
    expect(instance._transStyleKeys('isoline3D', ['dashArray', 'color'])).toEqual(['lineDasharray', 'color']);
  });

  it('_transStyleSetting should copy aliased values onto setting', () => {
    const { instance } = createTestContext();
    const setting = { dashArray: [1, 2] };
    instance._transStyleSetting('isoline3D', setting);
    expect(setting.lineDasharray).toEqual([1, 2]);
    expect(setting.dashArray).toEqual([1, 2]);
  });
});

describe('WebMapV3 - _getLegendSimpleStyle', () => {
  it('should collect simple values and skip outline keys without outline', () => {
    const { instance } = createTestContext();
    const styleSetting = {
      color: { type: 'simple', value: 'red' },
      size: { type: 'linear' },
      outlineColor: { type: 'simple', value: 'white' },
      outlineWidth: { type: 'simple', value: 1 }
    };

    const result = instance._getLegendSimpleStyle(styleSetting, ['color', 'size', 'outlineColor', 'outlineWidth']);

    expect(result).toEqual({ color: 'red' });
  });

  it('should include outline keys when outline is enabled', () => {
    const { instance } = createTestContext();
    const styleSetting = {
      outline: { value: true },
      outlineColor: { type: 'simple', value: 'white' },
      antialias: { value: false }
    };

    const result = instance._getLegendSimpleStyle(styleSetting, ['outlineColor']);

    expect(result).toEqual({ outlineColor: 'white' });
  });

  it('should include outline keys when antialias is enabled', () => {
    const { instance } = createTestContext();
    const styleSetting = {
      antialias: { value: true },
      outlineWidth: { type: 'simple', value: 0.5 }
    };

    expect(instance._getLegendSimpleStyle(styleSetting, ['outlineWidth'])).toEqual({ outlineWidth: 0.5 });
  });

  it('should return empty object without keys', () => {
    const { instance } = createTestContext();
    expect(instance._getLegendSimpleStyle({}, null)).toEqual({});
  });
});

describe('WebMapV3 - legend render type and shape', () => {
  it('_getLegendRenderType should map all render types', () => {
    const { instance } = createTestContext();
    expect(instance._getLegendRenderType('text')).toBe('TEXT');
    expect(instance._getLegendRenderType('circle')).toBe('POINT');
    expect(instance._getLegendRenderType('symbol')).toBe('POINT');
    expect(instance._getLegendRenderType('column')).toBe('POINT');
    expect(instance._getLegendRenderType('point')).toBe('POINT');
    expect(instance._getLegendRenderType('point-cluster')).toBe('POINT');
    expect(instance._getLegendRenderType('pointCluster')).toBe('POINT');
    expect(instance._getLegendRenderType('point-3d')).toBe('POINT');
    expect(instance._getLegendRenderType('heatGrid')).toBe('BUILTINSYMBOL');
    expect(instance._getLegendRenderType('heatHexagon')).toBe('BUILTINSYMBOL');
    expect(instance._getLegendRenderType('heat3DGrid')).toBe('BUILTINSYMBOL');
    expect(instance._getLegendRenderType('heat3DHexagon')).toBe('BUILTINSYMBOL');
    expect(instance._getLegendRenderType('line')).toBe('LINE');
    expect(instance._getLegendRenderType('isoline3D')).toBe('LINE');
    expect(instance._getLegendRenderType('fill')).toBe('FILL');
    expect(instance._getLegendRenderType('fillExtrusion')).toBe('FILLEXTRUSION');
    expect(instance._getLegendRenderType('animatePoint')).toBe('ANIMATEPOINT');
    expect(instance._getLegendRenderType('line3D')).toBe('ANIMATELINE');
    expect(instance._getLegendRenderType('animateLine')).toBe('ANIMATELINE');
    expect(instance._getLegendRenderType('radarPoint')).toBe('RADARPOINT');
    expect(instance._getLegendRenderType('unknown')).toBeUndefined();
  });

  it('_getLegendShape should map render types and column shapes', () => {
    const { instance } = createTestContext();
    expect(instance._getLegendShape('text')).toBe('TEXT');
    expect(instance._getLegendShape('circle')).toBe('POINT');
    expect(instance._getLegendShape('symbol')).toBe('POINT');
    expect(instance._getLegendShape('column', { shape: { value: 'cylinder' } })).toBe('POINT');
    expect(instance._getLegendShape('column', { shape: { value: 'triangleColumn' } })).toBe('TRIANGLE');
    expect(instance._getLegendShape('column', { shape: { value: 'squareColumn' } })).toBe('RECTANGLE');
    expect(instance._getLegendShape('column', { shape: { value: 'hexagonColumn' } })).toBe('HEXAGON');
    expect(instance._getLegendShape('column', { shape: { value: 'other' } })).toBe('POINT');
    expect(instance._getLegendShape('point')).toBe('POINT');
    expect(instance._getLegendShape('point-cluster')).toBe('POINT');
    expect(instance._getLegendShape('pointCluster')).toBe('POINT');
    expect(instance._getLegendShape('point-3d')).toBe('POINT');
    expect(instance._getLegendShape('heatHexagon')).toBe('HEXAGON');
    expect(instance._getLegendShape('heat3DHexagon')).toBe('HEXAGON');
    expect(instance._getLegendShape('line')).toBe('LINE');
    expect(instance._getLegendShape('isoline3D')).toBe('LINE');
    expect(instance._getLegendShape('fill')).toBe('RECTANGLE');
    expect(instance._getLegendShape('heatGrid')).toBe('RECTANGLE');
    expect(instance._getLegendShape('heat3DGrid')).toBe('RECTANGLE');
    expect(instance._getLegendShape('fillExtrusion')).toBe('RECTANGLE');
    expect(instance._getLegendShape('animatePoint')).toBe('ANIMATEPOINT');
    expect(instance._getLegendShape('animateLine')).toBe('ANIMATELINE');
    expect(instance._getLegendShape('line3D')).toBe('ANIMATELINE');
    expect(instance._getLegendShape('radarPoint')).toBe('RADARPOINT');
    expect(instance._getLegendShape('heat')).toBe('LINEGRADIENT');
    expect(instance._getLegendShape('heat3D')).toBe('LINEGRADIENT');
  });
});

describe('WebMapV3 - symbol and data driven helpers', () => {
  it('_isShowLegendSingleItem should only be true for no keys or single linear color', () => {
    const { instance } = createTestContext();
    expect(instance._isShowLegendSingleItem([], false)).toBe(true);
    expect(instance._isShowLegendSingleItem(['color'], true)).toBe(true);
    expect(instance._isShowLegendSingleItem(['color'], false)).toBe(false);
    expect(instance._isShowLegendSingleItem(['size'], true)).toBe(false);
    expect(instance._isShowLegendSingleItem(['color', 'size'], true)).toBe(false);
  });

  it('_isWebsymbolById should detect web symbol prefixes', () => {
    const { instance } = createTestContext();
    expect(instance._isWebsymbolById('line-1')).toBe(true);
    expect(instance._isWebsymbolById('polygon-0')).toBe(true);
    expect(instance._isWebsymbolById('point-x')).toBe(true);
    expect(instance._isWebsymbolById('circle')).toBe(false);
    expect(instance._isWebsymbolById(undefined)).toBe(false);
  });

  it('_getSymbolSDFStatus should return false for web symbols, true for base icons, sprite value otherwise', () => {
    const { instance } = createTestContext();
    expect(instance._getSymbolSDFStatus('line-1', {})).toBe(false);
    expect(instance._getSymbolSDFStatus('circle', {})).toBe(true);
    expect(instance._getSymbolSDFStatus('sp1', { sp1: { sdf: true } })).toBe(true);
    expect(instance._getSymbolSDFStatus('sp2', { sp2: { sdf: false } })).toBe(false);
    expect(instance._getSymbolSDFStatus('sp3', {})).toBe(false);
  });

  it('_isAllPicturePoint should check simple and categorized symbols', () => {
    const { instance } = createTestContext();
    expect(instance._isAllPicturePoint({ type: 'simple', value: { symbolId: 'point-1' } }, {})).toBe(true);
    expect(instance._isAllPicturePoint({ type: 'simple', value: { symbolId: 'circle' } }, {})).toBe(false);
    const categorized = {
      type: 'unique',
      values: [{ value: { symbolId: 'line-1' } }],
      defaultValue: { value: { symbolId: 'point-2' } }
    };
    expect(instance._isAllPicturePoint(categorized, {})).toBe(true);

    const mixed = {
      type: 'unique',
      values: [{ value: { symbolId: 'line-1' } }, { value: { symbolId: 'circle' } }],
      defaultValue: { value: { symbolId: 'point-2' } }
    };
    expect(instance._isAllPicturePoint(mixed, {})).toBe(false);
  });

  it('_isAllPictureSymbolSaved should handle missing content and line symbols', () => {
    const { instance } = createTestContext();
    expect(instance._isAllPictureSymbolSaved('point', null, {})).toBe(false);
    const lineSimple = { type: 'simple', value: { style: { paint: { 'line-pattern': 'tex1' } } } };
    expect(instance._isAllPictureSymbolSaved('line', lineSimple, {})).toBe(true);
    const lineNoImage = { type: 'simple', value: { style: { paint: {} } } };
    expect(instance._isAllPictureSymbolSaved('line', lineNoImage, {})).toBe(false);
    const lineCategorized = {
      type: 'unique',
      values: [{ value: { style: { paint: { 'line-pattern': 'tex1' } } } }],
      defaultValue: { style: { paint: { 'line-pattern': 'tex2' } } }
    };
    expect(instance._isAllPictureSymbolSaved('line', lineCategorized, {})).toBe(true);
  });

  it('_getDataDrivenStyleKeys should use text keys for TEXT and passed keys otherwise', () => {
    const { instance } = createTestContext();
    const textSetting = {
      textSize: { type: 'linear' },
      textColor: { type: 'simple' }
    };
    expect(instance._getDataDrivenStyleKeys('TEXT', ['otherKey'], textSetting)).toEqual(['textSize']);

    const pointSetting = { color: { type: 'unique' }, size: { type: 'simple' } };
    expect(instance._getDataDrivenStyleKeys('POINT', ['color', 'size'], pointSetting)).toEqual(['color']);
  });
});

describe('WebMapV3 - _createLayerLegendList', () => {
  it('should build gradient legend for heat layers', () => {
    const { instance } = createTestContext();
    const stops = ['interpolate', 'linear', ['heatmap-density'], 0, 'c0', 0.2, 'c1', 0.4, 'c2', 0.6, 'c3', 0.8, 'c4', 1, 'c5'];
    const layer = { id: 'h1', title: 'Heat', type: 'heatmap', paint: { 'heatmap-color': stops } };

    const result = instance._createLayerLegendList(layer, { type: 'heat' });

    expect(result.length).toBe(1);
    expect(result[0].layerId).toBe('h1');
    expect(result[0].styleGroup[0].style.type).toBe('style');
    expect(result[0].styleGroup[0].style.shape).toBe('LINEGRADIENT');
    // 下标 6/8/10/12/14 共 5 个颜色停靠点
    expect(result[0].styleGroup[0].style.colors.length).toBe(5);
  });

  it('should return undefined for unsupported render type', () => {
    const { instance } = createTestContext();
    expect(instance._createLayerLegendList({ id: 'b1', type: 'background' }, { type: 'background' })).toBeUndefined();
  });

  it('should create unique style groups with default item', () => {
    const { instance } = createTestContext();
    const layer = { id: 'l1', title: 'Layer', type: 'circle' };
    const styleSetting = {
      type: 'circle',
      color: {
        type: 'unique',
        field: ['TYPE'],
        values: [
          { key: 'A', value: '#FF0000' },
          { key: 'B', value: '#00FF00' }
        ],
        defaultValue: '#000000',
        interpolateInfo: { type: 'custom' }
      },
      size: { type: 'simple', value: 5 },
      opacity: { type: 'simple', value: 1 },
      symbolsContent: { type: 'simple', value: { symbolId: 'circle' } }
    };

    const result = instance._createLayerLegendList(layer, styleSetting);
    const uniqueLegend = result.find((item) => item.styleField === 'color');

    expect(uniqueLegend.themeField).toBe('TYPE');
    expect(uniqueLegend.styleGroup.length).toBe(3);
    expect(uniqueLegend.styleGroup.map((g) => g.fieldValue)).toEqual(['A', 'B', null]);
  });

  it('should create linear style group for linear color', () => {
    const { instance } = createTestContext();
    const layer = { id: 'l1', title: 'Layer', type: 'circle' };
    const styleSetting = {
      type: 'circle',
      color: {
        type: 'linear',
        field: ['VAL'],
        value: ['#FF0000', '#0000FF'],
        defaultValue: '#000000',
        interpolateInfo: { type: 'linear' }
      },
      size: { type: 'simple', value: 5 },
      opacity: { type: 'simple', value: 1 },
      symbolsContent: { type: 'simple', value: { symbolId: 'circle' } }
    };

    const result = instance._createLayerLegendList(layer, styleSetting);
    const linearLegend = result.find((item) => item.styleField === 'color');

    expect(linearLegend.themeField).toBe('VAL');
    expect(linearLegend.styleGroup[0].styleField).toBeNull();
    expect(linearLegend.styleGroup[0].style.colors).toEqual(['#FF0000', '#0000FF']);
  });

  it('should create range style groups for non-color data driven field', () => {
    const { instance } = createTestContext();
    const layer = { id: 'l1', title: 'Layer', type: 'circle' };
    const styleSetting = {
      type: 'circle',
      color: { type: 'simple', value: '#FF0000' },
      size: {
        type: 'range',
        field: ['CNT'],
        values: [
          { start: 0, end: 10, value: 5 },
          { start: 10, end: 20, value: 10 }
        ],
        defaultValue: 3
      },
      opacity: { type: 'simple', value: 1 },
      symbolsContent: { type: 'simple', value: { symbolId: 'circle' } }
    };

    const result = instance._createLayerLegendList(layer, styleSetting);
    const rangeLegend = result.find((item) => item.styleField === 'size');

    expect(rangeLegend.styleGroup.length).toBe(3);
    expect(rangeLegend.styleGroup[0].start).toBe(0);
    expect(rangeLegend.styleGroup[0].end).toBe(10);
    expect(rangeLegend.styleGroup[2].start).toBeNull();
    expect(rangeLegend.styleGroup[2].end).toBeNull();
  });

  it('should not show color for animate line that replaces color with texture', () => {
    const { instance } = createTestContext();
    const layer = { id: 'al1', title: 'Animate', type: 'animateLine' };
    const styleSetting = {
      type: 'animateLine',
      textureBlend: { type: 'simple', value: 'replace' },
      symbolsContent: { type: 'simple', value: { symbolId: 'point-1' } },
      color: { type: 'simple', value: '#EE4D5A' },
      width: { type: 'simple', value: 4 },
      opacity: { type: 'simple', value: 0.9 },
      iconStep: { type: 'simple', value: 100 }
    };

    const result = instance._createLayerLegendList(layer, styleSetting);

    expect(result.length).toBe(1);
    expect(result[0].styleGroup[0].style.shape).toBe('ANIMATELINE');
  });

  it('should not show color for all-picture point symbols', () => {
    const { instance } = createTestContext();
    const layer = { id: 'p1', title: 'Pic', type: 'symbol' };
    const styleSetting = {
      type: 'symbol',
      symbolsContent: { type: 'simple', value: { symbolId: 'point-1' } },
      size: { type: 'simple', value: 10 },
      color: { type: 'simple', value: 'red' },
      opacity: { type: 'simple', value: 1 }
    };

    const result = instance._createLayerLegendList(layer, styleSetting);

    expect(result.length).toBe(1);
    expect(result[0].styleGroup[0].style.shape).toBe('POINT');
  });

  it('should strip braces from text field name for text style', () => {
    const { instance } = createTestContext();
    const layer = { id: 't1', title: 'Text', type: 'circle' };
    const styleSetting = {
      type: 'text',
      textField: { value: '{NAME}' },
      textSize: { type: 'simple', value: 14 },
      textColor: { type: 'simple', value: '#000000' },
      textOpacity: { type: 'simple', value: 1 },
      textHaloColor: { type: 'simple', value: '#FFFFFF' }
    };

    const result = instance._createLayerLegendList(layer, styleSetting);

    expect(result[0].styleGroup[0].fieldValue).toBe('NAME');
  });
});

describe('WebMapV3 - setting style helpers', () => {
  it('_heatColorToGradient should only keep even indices beyond 5', () => {
    const { instance } = createTestContext();
    const colors = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];
    expect(instance._heatColorToGradient(colors)).toEqual([
      { value: 'g', key: 0 },
      { value: 'i', key: 'h' }
    ]);
    expect(instance._heatColorToGradient()).toEqual([]);
  });

  it('_isLinear / _getSettingCustom / _getSettingInterpolateInfo', () => {
    const { instance } = createTestContext();
    const linear = { type: 'linear', value: 'v', interpolateInfo: { type: 'ignored' } };
    expect(instance._isLinear(linear)).toBe(true);
    expect(instance._getSettingCustom(linear)).toBe('v');
    expect(instance._getSettingInterpolateInfo(linear)).toEqual({ type: 'linear' });

    const unique = { type: 'unique', values: [1], interpolateInfo: { type: 'custom' } };
    expect(instance._isLinear(unique)).toBe(false);
    expect(instance._getSettingCustom(unique)).toEqual([1]);
    expect(instance._getSettingInterpolateInfo(unique)).toEqual({ type: 'custom' });
  });

  it('_getLegendStyleType should classify linear, unique and range', () => {
    const { instance } = createTestContext();
    const params = (extra) => ({ styleField: 'color', currentType: 'unique', custom: [1, 2], interpolateInfo: { type: 'linear' }, ...extra });
    expect(instance._getLegendStyleType(params({}))).toBe('LINEAR');
    expect(instance._getLegendStyleType(params({ custom: [1] }))).toBe('UNIQUE');
    expect(instance._getLegendStyleType(params({ interpolateInfo: { type: 'custom' } }))).toBe('UNIQUE');
    expect(instance._getLegendStyleType(params({ styleField: 'size' }))).toBe('UNIQUE');
    expect(instance._getLegendStyleType(params({ currentType: 'range' }))).toBe('RANGE');
  });

  it('_isColorAttr should recognize color keys', () => {
    const { instance } = createTestContext();
    expect(instance._isColorAttr('color')).toBe(true);
    expect(instance._isColorAttr('textColor')).toBe(true);
    expect(instance._isColorAttr('outlineColor')).toBe(true);
    expect(instance._isColorAttr('textHaloColor')).toBe(true);
    expect(instance._isColorAttr('size')).toBe(false);
  });

  it('_parseLinearStyle should build one group with colors', () => {
    const { instance } = createTestContext();
    const group = instance._parseLinearStyle({ shape: 'POINT', custom: ['r', 'b'] });
    expect(group).toEqual([{ styleField: null, style: { type: 'style', shape: 'POINT', colors: ['r', 'b'] } }]);
  });

  it('_parseUniqueStyle should append default only for non-linear interpolation', () => {
    const { instance } = createTestContext();
    const args = {
      legendRenderType: 'POINT',
      styleField: 'color',
      simpleStyle: {},
      defaultSetting: { color: 'gray' },
      custom: [{ key: 'A', value: 'red' }],
      shape: 'POINT'
    };
    const withDefault = instance._parseUniqueStyle({ ...args, interpolateInfo: { type: 'custom' } });
    expect(withDefault.length).toBe(2);
    expect(withDefault[0].fieldValue).toBe('A');
    expect(withDefault[1].fieldValue).toBeNull();

    const noDefault = instance._parseUniqueStyle({ ...args, interpolateInfo: { type: 'linear' } });
    expect(noDefault.length).toBe(1);
  });

  it('_parseRangeStyle should append default range item', () => {
    const { instance } = createTestContext();
    const group = instance._parseRangeStyle({
      legendRenderType: 'POINT',
      styleField: 'size',
      simpleStyle: {},
      defaultSetting: { size: 1 },
      custom: [{ start: 0, end: 10, value: 5 }],
      shape: 'POINT'
    });
    expect(group.length).toBe(2);
    expect(group[0].start).toBe(0);
    expect(group[0].end).toBe(10);
    expect(group[1]).toEqual({ start: null, end: null, style: jasmine.objectContaining({ shape: 'POINT' }) });
  });

  it('_getSettingStyle should merge simple style and set field value', () => {
    const { instance } = createTestContext();
    expect(instance._getSettingStyle('size', 8, { color: 'red' })).toEqual({ color: 'red', size: 8 });
  });
});

describe('WebMapV3 - _parseLegendtyle types', () => {
  it('TEXT should return text icon and css style', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'TEXT',
      customValue: {
        textSize: '14px',
        textColor: '#000000',
        textOpacity: 1,
        textHaloColor: '#FFFFFF'
      }
    });
    expect(result.type).toBe('style');
    expect(result.icon).toBe('supermapol-icons-text-layer');
    expect(result.textSize).toBe('14px');
    expect(result.textColor).toBe('#000000');
  });

  it('BUILTINSYMBOL should return css style', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'BUILTINSYMBOL',
      customValue: { size: 10, color: '#123456', opacity: 0.8 }
    });
    expect(result.type).toBe('style');
    expect(result.fontSize).toBe(10);
    expect(result.color).toBe('#123456');
    expect(result.opacity).toBe(0.8);
  });

  it('ANIMATEPOINT and RADARPOINT should return css style', () => {
    const { instance } = createTestContext();
    const animate = instance._parseLegendtyle({
      legendRenderType: 'ANIMATEPOINT',
      customValue: { size: 40, color: 'red', opacity: 0.5, speed: 2, rings: 5 }
    });
    expect(animate).toEqual(jasmine.objectContaining({ type: 'style', size: 40, speed: 2, rings: 5 }));

    const radar = instance._parseLegendtyle({
      legendRenderType: 'RADARPOINT',
      customValue: { size: 80, color: 'blue', opacity: 0.7, speed: 4 }
    });
    expect(radar).toEqual(jasmine.objectContaining({ type: 'style', size: 80, speed: 4 }));
  });

  it('LINE without symbols content should return plain line info', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'LINE',
      customValue: { width: 4, color: 'red', opacity: 1 }
    });
    expect(result.type).toBe('style');
    expect(result.width).toBe(100);
    expect(result.lineWidth).toBe(4);
    expect(result.height).toBe(4);
    expect(result.color).toBe('red');
  });

  it('LINE with vector symbol styles should return lineStyles', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'LINE',
      customValue: {
        width: 4,
        symbolsContent: {
          symbolId: 'line-symbol',
          style: [{ paint: { 'line-width': 4, 'line-color': 'red', 'line-opacity': 1 } }]
        }
      }
    });
    expect(result.type).toBe('style');
    expect(result.lineStyles.length).toBe(1);
    expect(result.lineStyles[0].lineWidth).toBe(4);
    expect(result.lineStyles[0].color).toBe('red');
  });

  it('LINE with image symbol should return sprite image style', () => {
    const { instance } = createTestContext();
    instance._sprite = 'http://localhost:8190/iportal/web/maps/1/sprites/sprite';
    instance._spriteDatas = { 'line-tex': { width: 8, height: 4 } };
    const result = instance._parseLegendtyle({
      legendRenderType: 'LINE',
      customValue: {
        symbolsContent: { style: [{ paint: { 'line-pattern': 'line-tex' } }] }
      }
    });
    expect(result.type).toBe('image');
    expect(result.sprite).toEqual({ width: 8, height: 4 });
    expect(result.url).toBe('http://localhost:8190/iportal/web/maps/1/sprites/sprite.png');
  });

  it('ANIMATELINE replacing color should return transparent background image', () => {
    const { instance } = createTestContext();
    instance._sprite = 'http://localhost:8190/iportal/web/maps/1/sprites/sprite';
    instance._spriteDatas = { 'anim-tex': { width: 8, height: 8 } };
    const result = instance._parseLegendtyle({
      legendRenderType: 'ANIMATELINE',
      customValue: {
        textureBlend: 'replace',
        symbolsContent: { style: [{ layout: { 'icon-image': 'anim-tex' } }] }
      }
    });
    expect(result.type).toBe('image');
    expect(result.backgroundColor).toBe('transparent');
  });

  it('FILL simple solid color should be vector style without url', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'FILL',
      customValue: { color: '#00FF00', opacity: 0.5 }
    });
    expect(result.type).toBe('style');
    expect(result.backgroundColor).toBe('#00FF00');
    expect(result.opacity).toBe(0.5);
    expect(result.outlineStyle).toBe('none');
    expect(result.url).toBeUndefined();
  });

  it('FILL with antialias should show solid outline style', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'FILL',
      customValue: { color: '#00FF00', antialias: true }
    });
    expect(result.outlineStyle).toBe('solid');
  });

  it('FILLEXTRUSION should return vector style', () => {
    const { instance } = createTestContext();
    const result = instance._parseLegendtyle({
      legendRenderType: 'FILLEXTRUSION',
      customValue: { color: '#123456', opacity: 0.8 }
    });
    expect(result.type).toBe('style');
    expect(result.backgroundColor).toBe('#123456');
    expect(result.opacity).toBe(0.8);
  });
});

describe('WebMapV3 - icon and image id helpers', () => {
  it('_getIconById should find only circle svg icon', () => {
    const { instance } = createTestContext();
    expect(instance._getIconById('circle').id).toBe('circle');
    expect(instance._getIconById('missing')).toBeUndefined();
    expect(instance._getIconById('circle', 'image')).toBeUndefined();
  });

  it('_getImageIdFromValue should collect symbol/line/fill image ids', () => {
    const { instance } = createTestContext();
    expect(instance._getImageIdFromValue({ layout: { 'icon-image': 'i1' } }, 'symbol')).toEqual(['i1']);
    expect(instance._getImageIdFromValue([{ layout: {} }, { layout: { 'icon-image': 'i2' } }], 'symbol')).toEqual(['i2']);
    expect(instance._getImageIdFromValue({ paint: { 'line-pattern': 't1' } }, 'line')).toEqual(['t1']);
    expect(instance._getImageIdFromValue({ paint: { 'fill-pattern': 'f1' } }, 'fill')).toEqual(['f1']);
    expect(instance._getImageIdFromValue({ paint: {} }, 'fill-extrusion')).toEqual([]);
  });

  it('_getImageIdByLegendType should read line pattern or icon image by legend type', () => {
    const { instance } = createTestContext();
    expect(instance._getImageIdByLegendType({ paint: { 'line-pattern': 't1' } }, 'LINE')).toBe('t1');
    expect(instance._getImageIdByLegendType({ layout: { 'icon-image': 'i1' } }, 'ANIMATELINE')).toBe('i1');
    expect(instance._getImageIdByLegendType({}, 'LINE')).toBeUndefined();
  });
});

describe('WebMapV3 - _getSpriteStyle', () => {
  it('should return undefined when sprite data is missing or incomplete', () => {
    const { instance } = createTestContext();
    expect(instance._getSpriteStyle('x', {})).toBeUndefined();
    instance._spriteDatas = { x: { width: 10 } };
    expect(instance._getSpriteStyle('x', {})).toBeUndefined();
    instance._spriteDatas = { x: { width: 0, height: 10 } };
    expect(instance._getSpriteStyle('x', {})).toBeUndefined();
  });

  it('should return image style with png url for string sprite', () => {
    const { instance } = createTestContext();
    instance._sprite = 'http://x/sprite';
    instance._spriteDatas = { x: { width: 10, height: 20 } };

    const result = instance._getSpriteStyle('x', { color: 'red' });

    expect(result.type).toBe('image');
    expect(result.sprite).toEqual({ width: 10, height: 20 });
    expect(result.color).toBe('red');
    expect(result.url).toBe('http://x/sprite.png');
  });

  it('should use empty url for object sprite', () => {
    const { instance } = createTestContext();
    instance._sprite = { a: 'http://x/a' };
    instance._spriteDatas = { x: { width: 1, height: 1 } };

    expect(instance._getSpriteStyle('x', {}).url).toBe('');
  });
});

describe('WebMapV3 - line style transform', () => {
  const symbolPaint = {
    'line-width': 4,
    'line-opacity': 0.5,
    'line-color': 'red',
    'line-dasharray': [2, 1],
    'line-offset': 1
  };

  it('_transformLineStyle should fall back to symbol paint values', () => {
    const { instance } = createTestContext();
    const symbol = { paint: symbolPaint };

    const result = instance._transformLineStyle({ oldWidth: 4, symbol, defaultStyle: { width: 20, height: 8, backgroundColor: '#fff', opacity: 1 }, customValue: {} });

    expect(result.lineWidth).toBe(4);
    expect(result.opacity).toBe(0.5);
    expect(result.color).toBe('red');
    expect(result.lineDash).toEqual([2, 1]);
    expect(result.lineOffset).toBe(1);
  });

  it('_transformLineStyle should prefer custom values and rescale by height', () => {
    const { instance } = createTestContext();
    const symbol = { paint: symbolPaint };

    const result = instance._transformLineStyle({
      oldWidth: 4,
      symbol,
      defaultStyle: { height: 8, backgroundColor: '#fff', opacity: 1 },
      customValue: { height: 8, color: 'blue', opacity: 0.7 }
    });

    expect(result.lineWidth).toBe(8);
    expect(result.opacity).toBe(0.7);
    expect(result.color).toBe('blue');
  });

  it('_updateSingleStyleByWidth should return same style when width unchanged', () => {
    const { instance } = createTestContext();
    const style = { paint: { 'line-width': 4 } };
    expect(instance._updateSingleStyleByWidth(4, 4, style)).toBe(style);
  });

  it('_updateSingleStyleByWidth should handle zero old width', () => {
    const { instance } = createTestContext();
    const result = instance._updateSingleStyleByWidth(0, 5, { paint: {} });
    expect(result.paint['line-width']).toBe(5);
  });

  it('_updateSingleStyleByWidth should scale width, offset and dasharray', () => {
    const { instance } = createTestContext();
    const style = {
      paint: { 'line-width': 4, 'line-offset': 2, 'line-dasharray': [4, 2] }
    };
    const result = instance._updateSingleStyleByWidth(4, 8, style);
    expect(result.paint['line-width']).toBe(8);
    expect(result.paint['line-offset']).toBe(4);
    // dasharray 随比例放大一倍，旧值 [4,2] / 2 -> [2,1]
    expect(result.paint['line-dasharray']).toEqual([2, 1]);
  });

  it('_updateDash should scale dashes and return undefined for empty input', () => {
    const { instance } = createTestContext();
    expect(instance._updateDash([2, 4], 2)).toEqual([1, 2]);
    expect(instance._updateDash([], 2)).toBeUndefined();
  });
});

describe('WebMapV3 - line width', () => {
  it('_getLineWidth should read width of single symbol and default to 0', () => {
    const { instance } = createTestContext();
    expect(instance._getLineWidth({ paint: { 'line-width': 6 } })).toBe(6);
    expect(instance._getLineWidth({ paint: {} })).toBe(0);
  });

  it('_getWholeWidth should compute span between top and bottom boundaries', () => {
    const { instance } = createTestContext();
    const styles = [
      { paint: { 'line-width': 4, 'line-offset': 1 } },
      { paint: { 'line-width': 2, 'line-offset': -2 } }
    ];
    // top: 1+2=3, bottom: -2-1=-3
    expect(instance._getWholeWidth(styles)).toBe(6);
  });

  it('_getWholeWidth should compute width for a single style in an array', () => {
    const { instance } = createTestContext();
    const styles = [{ paint: { 'line-width': 2 } }];
    expect(instance._getWholeWidth(styles)).toBe(2);
  });

  it('_getWholeWidth should default missing offset to 0', () => {
    const { instance } = createTestContext();
    const styles = [{ paint: { 'line-width': 6 } }];
    // top: 0+3=3, bottom: 0-3=-3
    expect(instance._getWholeWidth(styles)).toBe(6);
  });
});

describe('WebMapV3 - _handleUnSupportedLayers', () => {
  it('should return empty array when no interaction', () => {
    const { instance } = createTestContext();
    expect(instance._handleUnSupportedLayers({})).toEqual([]);
  });

  it('should fire layercreatefailed and collect drill layer ids', () => {
    const { instance } = createTestContext();
    const fire = spyOn(instance, 'fire');

    const result = instance._handleUnSupportedLayers({
      interaction: {
        drill: [{ layerIds: ['d1', 'd2'] }, { layers: [{ layerIds: ['d3'] }] }]
      }
    });

    expect(result).toEqual(['d1', 'd2', 'd3']);
    expect(fire).toHaveBeenCalledWith(
      'layercreatefailed',
      jasmine.objectContaining({ error_code: 'DRILL_LAYERS_NOT_SUPPORTED', map: instance.map })
    );
  });
});
