import { AppreciableLayerBase } from './AppreciableLayerBase';

export class SourceListModelV2 extends AppreciableLayerBase {
  constructor(options = {}) {
    super(options);
    this.initDatas();
  }

  createAppreciableLayers() {
    const detailLayers = this._initLayers();
    return this._initAppreciableLayers(detailLayers);
  }

  createLayerCatalogs() {
    const appreciableLayers = this.getLayers();
    return this._initSourceList(appreciableLayers);
  }

  getSelfLayerIds() {
    return this.layers.reduce((ids, item) => ids.concat(item.renderLayers), []);
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
      if (matchLayers.length > 0) {
        if (matchLayer) {
          selfLayers.push({
            ...matchLayer,
            layerInfo: { ...item, dataSource: item.dataSource || (item.serverId && { serverId: item.serverId }) }
          });
        } else {
          selfLayers.push(...matchLayers);
        }
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
}
