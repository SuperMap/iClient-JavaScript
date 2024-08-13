import { AppreciableLayerBase } from './AppreciableLayerBase';

export class SourceListModel extends AppreciableLayerBase {
  constructor(options = {}) {
    super(options);
  }

  getLayers() {
    const detailLayers = this._initLayers();
    return this._initAppreciableLayers(detailLayers);
  }

  getSelfLayers(appreciableLayers = this.getLayers()) {
    const selfLayerIds = this._getSelfLayerIds();
    return appreciableLayers.filter((item) =>
      item.renderLayers.some((id) => selfLayerIds.some((renderId) => renderId === id))
    );
  }

  getSourceList() {
    const appreciableLayers = this.getLayers();
    return this._initSourceList(appreciableLayers);
  }

  _initLayers() {
    const layersOnMap = this._getAllLayersOnMap();
    let nextLayers = layersOnMap;
    if (this.appendLayers) {
      nextLayers = layersOnMap.filter((layer) => this.layers.some((item) => this._isBelongToMapJSON(item, layer)));
    }
    const selfLayers = [];
    const selfLayerIds = [];
    // 排序
    this.layers.forEach((item) => {
      const matchLayers = nextLayers.filter((layer) => this._isBelongToMapJSON(item, layer));
      const matchLayer = matchLayers.find(renderLayer => renderLayer.id === item.id);
      if (matchLayer) {
        selfLayers.push({
          ...matchLayer,
          layerInfo: { ...item, dataSource: item.dataSource || (item.serverId && { serverId: item.serverId }) }
        });
        selfLayerIds.push(...item.renderLayers);
      }
    });
    return this.concatExpectLayers(selfLayers, selfLayerIds, nextLayers);
  }

  _isBelongToMapJSON(layerFromMapJSON, layerOnMap) {
    return (
      layerFromMapJSON.renderLayers && layerFromMapJSON.renderLayers.some((subLayerId) => subLayerId === layerOnMap.id)
    );
  }

  _getSelfLayerIds() {
    return this.layers.reduce((ids, item) => ids.concat(item.renderLayers), []);
  }
}
