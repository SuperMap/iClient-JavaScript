import { createMapClassExtending } from '@supermapgis/iclient-common/mapping/MapBase';

describe('MapBase', () => {
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
    
    it('should set _legendList to empty array when no argument is passed', () => {
      instance.setLegends();
      
      expect(instance._legendList).toEqual([]);
    });
    
    it('should overwrite existing legends', () => {
      instance._legendList = [{ layerId: 'old' }];
      
      instance.setLegends([{ layerId: 'new' }]);
      
      expect(instance._legendList).toEqual([{ layerId: 'new' }]);
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

  describe('cleanLayers', () => {
    beforeEach(() => {
      instance.map = jasmine.createSpyObj('map', [
        'getLayer',
        'removeLayer',
        'getSource',
        'removeSource'
      ]);
    });

    it('should remove layers from map', () => {
      const layers = [
        {
          renderLayers: ['layer1', 'layer2'],
          renderSource: { id: 'source1' },
          l7Layer: false
        }
      ];
      instance.map.getLayer.and.callFake((layerId) => {
        if (layerId === 'layer1' || layerId === 'layer2') {
          return { source: 'source1' };
        }
        return undefined;
      });
      instance.map.getSource.and.returnValue(true);

      instance.cleanLayers(layers);

      expect(instance.map.removeLayer).toHaveBeenCalledWith('layer1');
      expect(instance.map.removeLayer).toHaveBeenCalledWith('layer2');
    });

    it('should remove sources from map when layers are removed', () => {
      const layers = [
        {
          renderLayers: ['layer1'],
          renderSource: { id: 'source1' },
          l7Layer: false
        }
      ];
      instance.map.getLayer.and.returnValue({ source: 'source1' });
      instance.map.getSource.and.returnValue(true);

      instance.cleanLayers(layers);

      expect(instance.map.removeSource).toHaveBeenCalledWith('source1');
    });

    it('should not remove source when renderSource.id is falsy', () => {
      const layers = [
        {
          renderLayers: ['layer1'],
          renderSource: { id: null },
          l7Layer: false
        }
      ];
      instance.map.getLayer.and.returnValue({ source: null });
      // getSource(null) returns falsy, so source won't be added to list
      instance.map.getSource.and.returnValue(false);

      instance.cleanLayers(layers);

      expect(instance.map.removeSource).not.toHaveBeenCalled();
    });

    it('should not remove source when layer is l7Layer', () => {
      const layers = [
        {
          renderLayers: ['layer1'],
          renderSource: { id: 'source1' },
          l7Layer: true
        }
      ];
      instance.map.getLayer.and.returnValue({ source: 'source1' });
      instance.map.getSource.and.returnValue(true);

      instance.cleanLayers(layers);

      expect(instance.map.removeSource).not.toHaveBeenCalled();
    });

    it('should deduplicate sources before removal', () => {
      const layers = [
        {
          renderLayers: ['layer1'],
          renderSource: { id: 'source1' },
          l7Layer: false
        },
        {
          renderLayers: ['layer2'],
          renderSource: { id: 'source1' },
          l7Layer: false
        }
      ];
      instance.map.getLayer.and.returnValue({ source: 'source1' });
      instance.map.getSource.and.returnValue(true);

      instance.cleanLayers(layers);

      // Should only call removeSource once due to deduplication
      expect(instance.map.removeSource).toHaveBeenCalledTimes(1);
      expect(instance.map.removeSource).toHaveBeenCalledWith('source1');
    });
  });
});
