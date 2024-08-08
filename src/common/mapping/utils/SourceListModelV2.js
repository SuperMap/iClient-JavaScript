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

  createAppreciableLayerId(layer) {
    // 往空地图上追加图层 且 只有一个webmap this.layers是空
    // layer.sourceLayer 针对 MapboxStyle
    const metadata = layer.metadata || {};
    return metadata.parentLayerId || layer.sourceLayer || layer.source || layer.id;
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
      const matchLayer = nextLayers.find((layer) => this._isBelongToMapJSON(item, layer));
      if (matchLayer && matchLayer.id === item.id) {
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
