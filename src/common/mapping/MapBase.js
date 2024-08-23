export function createMapClassExtending(SuperClass = class {}) {
  return class MapBase extends SuperClass {
    constructor() {
      super();
      this._sourceListModel = null;
      this._legendList = [];
    }

    initializeMap() {
      throw new Error('initializeMap is not implemented');
    }

    clean() {
      throw new Error('clean is not implemented');
    }

    getLayerCatalog() {
      return (this._sourceListModel && this._sourceListModel.getSourceList()) || [];
    }

    getLayers() {
      return (this._sourceListModel && this._sourceListModel.getLayers()) || [];
    }

    getLegends() {
      return this._legendList;
    }

    getSelfAppreciableLayers(appreciableLayers) {
      return (this._sourceListModel && this._sourceListModel.getSelfLayers(appreciableLayers)) || [];
    }

    echartsLayerResize() {}

    updateOverlayLayer() {}

    copyLayer() {}
  };
}
