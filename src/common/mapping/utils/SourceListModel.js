import SourceModel from './SourceModel';

export class SourceListModel {
  constructor(options = {}) {
    this.map = options.map;
    this.layers = options.layers || [];
    this.appendLayers = options.appendLayers || false;
    this.excludeSourceNames = ['tdt-search-', 'tdt-route-', 'smmeasure', 'mapbox-gl-draw', /tracklayer-\d+-line/];
    this.excludeLayerTypes = ['background'];
  }

  setSelfLayers(layers) {
    this.layers = layers;
  }

  getLayers() {
    const detailLayers = this._initLayers();
    return this._initAppreciableLayers(detailLayers);
  }

  getSourceList() {
    const appreciableLayers = this.getLayers();
    return this._initSource(appreciableLayers);
  }

  excludeSource(key) {
    for (let i = 0; i < this.excludeSourceNames.length; i++) {
      if (key && key.match(this.excludeSourceNames[i])) {
        return false;
      }
    }
    return true;
  }

  _initLayers() {
    const layersOnMap = this.map.getStyle().layers.map((layer) => this.map.getLayer(layer.id));
    const overlayLayers = Object.values(this.map.overlayLayersManager).reduce((layers, overlayLayer) => {
      if (overlayLayer.id && !layers.some((item) => item.id === overlayLayer.id)) {
        const visibility =
          overlayLayer.visibility === 'visible' ||
          overlayLayer.visibility ||
          overlayLayer.visible ||
          (!('visible' in overlayLayer) && !('visibility' in overlayLayer))
            ? 'visible'
            : 'none';
        let source = overlayLayer.source || overlayLayer.sourceId;
        if (typeof source === 'object') {
          source = overlayLayer.id;
        }
        layers.push({
          id: overlayLayer.id,
          visibility,
          source,
          type: overlayLayer.type
        });
      }
      return layers;
    }, []);
    const renderLayers = layersOnMap
      .concat(overlayLayers)
      .filter((layer) => !this.appendLayers || this.layers.some((item) => this._isBelongToMapJSON(item, layer)));
    const nextLayers = renderLayers.filter(
      (layer) =>
        !layer.id.includes('-SM-') &&
        !this.excludeLayerTypes.some((item) => item === layer.type) &&
        this.excludeSource(layer.source)
    );
    const selfLayers = [];
    const selfLayerIds = [];
    // 排序
    this.layers.forEach((item) => {
      const matchLayer = nextLayers.find((layer) => this._isBelongToMapJSON(item, layer));
      if (matchLayer && matchLayer.id === item.id) {
        selfLayers.push({ ...matchLayer, layerInfo: item });
        selfLayerIds.push(...item.renderLayers);
      }
    });
    const otherLayers = nextLayers.filter((item) => !selfLayerIds.includes(item.id));
    return selfLayers.concat(otherLayers);
  }

  _initSource(detailLayers) {
    const datas = detailLayers.reduce((sourceList, layer) => {
      let matchItem = sourceList.find((item) => {
        const sourceId = layer.renderSource.id || layer.id;
        return item.id === sourceId;
      });
      if (!matchItem) {
        const sourceListItem = new SourceModel(layer);
        sourceList.push(sourceListItem);
        matchItem = sourceListItem;
      }
      matchItem.addLayer(layer);
      return sourceList;
    }, []);
    datas.reverse();
    return datas;
  }

  _initAppreciableLayers(detailLayers) {
    // dv 没有关联一个可感知图层对应对个渲染图层的关系，默认相同source的layer就是渲染图层
    return detailLayers.reduce((layers, layer) => {
      const layerId = this._createAppreciableLayerId(layer);
      let matchLayer = layers.find((item) => {
        return item.id === layerId;
      });
      if (!matchLayer) {
        matchLayer = this._createCommonFields(layer);
        layers.push(matchLayer);
      }
      if (layer.layerInfo) {
        matchLayer.renderLayers.push(...layer.layerInfo.renderLayers);
      } else {
        matchLayer.renderLayers.push(layer.id);
      }
      return layers;
    }, []);
  }

  _createCommonFields(layer) {
    const layerInfo = layer.layerInfo || {};
    // type: background overlaymanager layers 只有 id
    const layerId = this._createAppreciableLayerId(layer);
    const {
      dataSource,
      themeSetting = {},
      name = layerId,
      visible = layer.visibility ? layer.visibility === 'visible' : true,
      serverId
    } = layerInfo;
    const sourceOnMap = this.map.getSource(layer.source);
    const fields = {
      id: layerId,
      title: name,
      type: layer.type,
      visible,
      renderSource: sourceOnMap
        ? {
            id: layer.source,
            type: sourceOnMap.type
          }
        : {},
      renderLayers: [],
      dataSource: dataSource || (serverId ? { serverId } : {}),
      themeSetting
    };
    if (layer.sourceLayer) {
      fields.renderSource.sourceLayer = layer.sourceLayer;
    }
    return fields;
  }

  _isBelongToMapJSON(layerFromMapJSON, layerOnMap) {
    return layerFromMapJSON.renderLayers.some((subLayerId) => subLayerId === layerOnMap.id);
  }

  _createAppreciableLayerId(layer) {
    // 往空地图上追加图层 且 只有一个webmap this.layers是空
    // layer.sourceLayer 针对 MapboxStyle
    const metadata = layer.metadata || {};
    return metadata.parentLayerId || layer.sourceLayer || layer.source || layer.id;
  }
}