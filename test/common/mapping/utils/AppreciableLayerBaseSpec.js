import { AppreciableLayerBase } from '../../../../src/common/mapping/utils/AppreciableLayerBase';

describe('AppreciableLayerBase', () => {
  let instance;
  let mockMap;

  beforeEach(() => {
    mockMap = {
      style: {
        fire: jasmine.createSpy('fire')
      },
      getLayer: jasmine.createSpy('getLayer').and.returnValue({}),
      setLayoutProperty: jasmine.createSpy('setLayoutProperty')
    };
    
    instance = new AppreciableLayerBase({
      map: mockMap,
      layers: []
    });
  });

  describe('setLayersVisible', () => {
    it('should set layer visibility to visible', () => {
      const layer = {
        renderLayers: ['layer1'],
        CLASS_NAME: 'TestLayer'
      };
      
      instance.setLayersVisible([layer], 'visible', true);
      
      expect(mockMap.setLayoutProperty).toHaveBeenCalledWith('layer1', 'visibility', 'visible');
    });

    it('should set layer visibility to none', () => {
      const layer = {
        renderLayers: ['layer1'],
        CLASS_NAME: 'TestLayer'
      };
      
      instance.setLayersVisible([layer], 'none', true);
      
      expect(mockMap.setLayoutProperty).toHaveBeenCalledWith('layer1', 'visibility', 'none');
    });

    it('should handle layer with CLASS_INSTANCE', () => {
      const mockShow = jasmine.createSpy('show');
      const mockHide = jasmine.createSpy('hide');
      const layer = {
        renderLayers: ['layer1'],
        CLASS_NAME: 'TestLayer',
        CLASS_INSTANCE: {
          show: mockShow,
          hide: mockHide
        }
      };
      
      instance.setLayersVisible([layer], 'visible', true);
      
      expect(mockShow).toHaveBeenCalled();
      expect(mockHide).not.toHaveBeenCalled();
      expect(mockMap.style.fire).toHaveBeenCalledWith('data', { dataType: 'style' });
    });

    it('should handle layer with CLASS_INSTANCE and hide', () => {
      const mockShow = jasmine.createSpy('show');
      const mockHide = jasmine.createSpy('hide');
      const layer = {
        renderLayers: ['layer1'],
        CLASS_NAME: 'TestLayer',
        CLASS_INSTANCE: {
          show: mockShow,
          hide: mockHide
        }
      };
      
      instance.setLayersVisible([layer], 'none', true);
      
      expect(mockHide).toHaveBeenCalled();
      expect(mockShow).not.toHaveBeenCalled();
      expect(mockMap.style.fire).toHaveBeenCalledWith('data', { dataType: 'style' });
    });

    it('should skip layersVisibleMap when isSetVisible is false', () => {
      const layer = {
        renderLayers: ['layer1'],
        CLASS_NAME: 'TestLayer'
      };
      
      instance.setLayersVisible([layer], 'visible', false);
      
      // isSetVisible=false 只跳过 layersVisibleMap 的设置，但 setLayoutProperty 仍会被调用
      expect(mockMap.setLayoutProperty).toHaveBeenCalledWith('layer1', 'visibility', 'visible');
    });

    it('should handle multiple renderLayers', () => {
      const layer = {
        renderLayers: ['layer1', 'layer2', 'layer3'],
        CLASS_NAME: 'TestLayer'
      };
      
      instance.setLayersVisible([layer], 'visible', true);
      
      expect(mockMap.setLayoutProperty).toHaveBeenCalledTimes(3);
      expect(mockMap.setLayoutProperty).toHaveBeenCalledWith('layer1', 'visibility', 'visible');
      expect(mockMap.setLayoutProperty).toHaveBeenCalledWith('layer2', 'visibility', 'visible');
      expect(mockMap.setLayoutProperty).toHaveBeenCalledWith('layer3', 'visibility', 'visible');
    });

    it('should skip L7Layer when getLayer returns falsy', () => {
      mockMap.getLayer.and.returnValue(null);
      const layer = {
        renderLayers: ['l7layer1'],
        CLASS_NAME: 'L7Layer'
      };
      
      instance.setLayersVisible([layer], 'visible', true);
      
      expect(mockMap.setLayoutProperty).not.toHaveBeenCalled();
    });
  });
});
