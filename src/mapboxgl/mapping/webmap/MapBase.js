export function createMapClassExtending(SuperClass = class {}) {
  return class MapBase extends SuperClass {
    constructor() {
      super();
    }

    initializeMap() {
      throw new Error('initializeMap is not implemented');
    }

    clean() {
      throw new Error('clean is not implemented');
    }

    getLayerCatalog() {
      throw new Error('getLayerCatalog is not implemented');
    }

    getLegendInfo() {
      throw new Error('getLegendInfo is not implemented');
    }

    getAppreciableLayers() {
      throw new Error('getAppreciableLayers is not implemented');
    }

    echartsLayerResize() {}

    updateOverlayLayer() {}

    copyLayer() {}
  };
}
