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
      return (this._sourceListModel && this._sourceListModel.getLayerCatalog()) || [];
    }

    getLayers() {
      return (this._sourceListModel && this._sourceListModel.getLayers()) || [];
    }

    getLegends() {
      return this._legendList;
    }

    getSelfAppreciableLayers() {
      return (this._sourceListModel && this._sourceListModel.getSelfLayers(...arguments)) || [];
    }

    setLayersVisible() {
      this._sourceListModel && this._sourceListModel.setLayersVisible(...arguments);
    }

    toggleLayerVisible() {
      this._sourceListModel && this._sourceListModel.toggleLayerVisible(...arguments);
    }

    rectifyLayersOrder(appreciableLayers, topLayerBeforeId) {
      const renderLayers = appreciableLayers
        .filter((item) => !item.reused)
        .reduce((layers, layer) => {
          return layers.concat(layer.renderLayers);
        }, []);
      const exsitLayers = renderLayers.filter((layerId) => !!this.map.getLayer(layerId));
      for (let index = exsitLayers.length - 1; index > -1; index--) {
        const targetlayerId = exsitLayers[index];
        const afterLayers = exsitLayers.slice(index + 1);
        let beforLayerId = afterLayers.find((id) => this.map.style._layers[id]);
        if (!afterLayers.length) {
          beforLayerId = topLayerBeforeId;
        }
        this.map.moveLayer(targetlayerId, beforLayerId);
      }
      return exsitLayers;
    }

    echartsLayerResize() {}

    updateOverlayLayer() {}

    copyLayer() {}

    cleanLayers(layers) {
      const sourceList = [];
      for (const item of layers) {
        item.renderLayers.forEach((layerId) => {
          if (this.map.getLayer(layerId)) {
            this.map.removeLayer(layerId);
            if (!item.l7Layer && this.map.getSource(layerId)) {
              sourceList.push(layerId);
            }
          }
        });
        if (this.map.getSource(item.renderSource.id) && !item.l7Layer) {
          sourceList.push(item.renderSource.id);
        }
      }
      Array.from(new Set(sourceList)).forEach((sourceId) => {
        this.map.removeSource(sourceId);
      });
    }
  };
}
