import { createMapClassExtending } from '../../../src/common/mapping/MapBase';

describe('WebMapBase - MapBase Methods', () => {
  let MapBase;
  let instance;
  
  beforeEach(() => {
    MapBase = createMapClassExtending();
    instance = new MapBase();
  });
  
  describe('setLegends', () => {
    it('should set _legendList with provided array', () => {
      const legends = [
        { layerId: 'layer1', items: [{ color: '#fff', label: 'test' }] },
        { layerId: 'layer2', items: [{ color: '#000' }] }
      ];
      
      instance.setLegends(legends);
      
      expect(instance._legendList).toEqual(legends);
    });
    
    it('should set _legendList to empty array when null is passed', () => {
      instance.setLegends(null);
      
      expect(instance._legendList).toEqual([]);
    });
    
    it('should set _legendList to empty array when undefined is passed', () => {
      instance.setLegends(undefined);
      
      expect(instance._legendList).toEqual([]);
    });
  });
  
  describe('getLegends', () => {
    it('should return _legendList', () => {
      const legends = [{ layerId: 'layer1' }];
      instance._legendList = legends;
      
      expect(instance.getLegends()).toEqual(legends);
    });
    
    it('should return empty array when _legendList is not set', () => {
      expect(instance.getLegends()).toEqual([]);
    });
  });
    
  describe('getLayerCatalog', () => {
    it('should return _sourceListModel.getLayerCatalog() when _sourceListModel exists', () => {
      const catalogs = [{ id: 'cat1' }];
      instance._sourceListModel = jasmine.createSpyObj('sourceListModel', ['getLayerCatalog']);
      instance._sourceListModel.getLayerCatalog.and.returnValue(catalogs);
      
      expect(instance.getLayerCatalog()).toEqual(catalogs);
    });
    
    it('should return empty array when _sourceListModel is null', () => {
      instance._sourceListModel = null;
      
      expect(instance.getLayerCatalog()).toEqual([]);
    });
  });
  
  describe('getLayers', () => {
    it('should return _sourceListModel.getLayers() when _sourceListModel exists', () => {
      const layers = [{ id: 'layer1' }];
      instance._sourceListModel = jasmine.createSpyObj('sourceListModel', ['getLayers']);
      instance._sourceListModel.getLayers.and.returnValue(layers);
      
      expect(instance.getLayers()).toEqual(layers);
    });
    
    it('should return empty array when _sourceListModel is null', () => {
      instance._sourceListModel = null;

      expect(instance.getLayers()).toEqual([]);
    });
  });
});

describe('WebMapBase - Handler Methods', () => {
  let instance;
  let mockHandler;

  beforeEach(() => {
    const MapBase = createMapClassExtending();
    instance = new MapBase();
    instance.getLegendInfos = function() {
      return (this._handler && this._handler._getLegendInfos()) || [];
    };
    // Mock WebMapV2 handler
    mockHandler = {
      _getLegendInfos: jasmine.createSpy('_getLegendInfos').and.callFake(() => {
        return [
          { showLegend: true, id: 'layer1', title: 'Layer 1' },
          { showLegend: false, id: 'layer2', title: 'Layer 2' }
        ];
      })
    };
    instance._handler = mockHandler;
  });

  describe('getLegendInfos', () => {
    it('should call handler._getLegendInfos and return result', () => {
      const result = instance.getLegendInfos();

      expect(mockHandler._getLegendInfos).toHaveBeenCalled();
      expect(result).toEqual([
        { showLegend: true, id: 'layer1', title: 'Layer 1' },
        { showLegend: false, id: 'layer2', title: 'Layer 2' }
      ]);
    });

    it('should return empty array when handler._getLegendInfos returns null', () => {
      mockHandler._getLegendInfos.and.returnValue(null);

      const result = instance.getLegendInfos();

      expect(result).toEqual([]);
    });

    it('should return empty array when handler._getLegendInfos returns undefined', () => {
      mockHandler._getLegendInfos.and.returnValue(undefined);

      const result = instance.getLegendInfos();

      expect(result).toEqual([]);
    });

    it('should return empty array when handler is null', () => {
      instance._handler = null;

      const result = instance.getLegendInfos();

      expect(result).toEqual([]);
    });
  });

  describe('getLegendInfos with WebMapV2-like handler', () => {
    it('should return legend info from _mapInfo.layers (WebMapV2)', () => {
      const webMapV2Handler = {
        _getLegendInfos: jasmine.createSpy('_getLegendInfos').and.callFake(function() {
          const { layers = [] } = this._mapInfo || {};
          return layers.map((layer) => {
            const { legendSetting, name, layerID: layerId } = layer;
            return {
              showLegend: legendSetting ? legendSetting.isShow : false,
              id: layerId,
              title: name
            };
          });
        }),
        _mapInfo: {
          layers: [
            { name: 'Layer1', layerID: 'layer1', legendSetting: { isShow: true } },
            { name: 'Layer2', layerID: 'layer2', legendSetting: { isShow: false } }
          ]
        }
      };
      instance._handler = webMapV2Handler;

      const result = instance.getLegendInfos();

      expect(webMapV2Handler._getLegendInfos).toHaveBeenCalled();
      expect(result).toEqual([
        { showLegend: true, id: 'layer1', title: 'Layer1' },
        { showLegend: false, id: 'layer2', title: 'Layer2' }
      ]);
    });
  });

  describe('getLegendInfos with WebMapV3-like handler', () => {
    it('should return legend info from catalogs (WebMapV3)', () => {
      const webMapV3Handler = {
        _getLegendInfos: jasmine.createSpy('_getLegendInfos').and.callFake(function() {
          const { catalogs = [] } = this._mapResourceInfo || {};
          const res = [];
          const processCatalog = (catalog) => {
            const { catalogType, children, showLegend, title, layersContent, id } = catalog;
            if (catalogType === 'group' && children) {
              children.forEach(child => processCatalog(child));
            }
            if (catalogType === 'layer') {
              res.push({
                showLegend: showLegend !== false,
                id: layersContent || id,
                title: title
              });
            }
          };
          catalogs.forEach(item => processCatalog(item));
          return res;
        }),
        _mapResourceInfo: {
          catalogs: [
            {
              catalogType: 'layer',
              title: 'Layer1',
              showLegend: true,
              layersContent: 'layer1'
            },
            {
              catalogType: 'group',
              children: [
                {
                  catalogType: 'layer',
                  title: 'Layer2',
                  showLegend: false,
                  layersContent: 'layer2'
                }
              ]
            }
          ]
        }
      };
      instance._handler = webMapV3Handler;

      const result = instance.getLegendInfos();

      expect(webMapV3Handler._getLegendInfos).toHaveBeenCalled();
      expect(result).toEqual([
        { showLegend: true, id: 'layer1', title: 'Layer1' },
        { showLegend: false, id: 'layer2', title: 'Layer2' }
      ]);
    });
  });
});
