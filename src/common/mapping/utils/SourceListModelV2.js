import { AppreciableLayerBase } from './AppreciableLayerBase';

export class SourceListModelV2 extends AppreciableLayerBase {
  constructor(options = {}) {
    super(options);
    this.initDatas();
  }

  createLayerCatalogs() {
    const appreciableLayers = this.getLayers(false);
    return this._initSourceList(appreciableLayers);
  }

  getSelfLayerIds() {
    return this.layers.reduce((ids, item) => ids.concat(item.renderLayers), []);
  }

  initLayers() {
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
          const mvtLayerList = matchLayers.map(layer => {
            const nextLayer = Object.assign({}, layer);
            nextLayer.metadata = Object.assign({}, nextLayer.metadata, { SM_Layer_Title: item.name });
            return nextLayer;
          })
          selfLayers.push(...mvtLayerList);
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
