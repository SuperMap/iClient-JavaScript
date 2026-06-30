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
