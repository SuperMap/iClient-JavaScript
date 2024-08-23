import SourceModel from './SourceModel';

export class AppreciableLayerBase {
  constructor(options = {}) {
    this.map = options.map;
    this.layers = options.layers || [];
    this.appendLayers = options.appendLayers || false;
    this.unexpectedSourceNames = ['tdt-search-', 'tdt-route-', 'smmeasure', 'mapbox-gl-draw', 'maplibre-gl-draw', /tracklayer-\d+-line/];
  }

  setSelfLayers(layers) {
    this.layers = layers;
  }

  getLayers() {
    throw new Error('getLayers is not implemented');
  }

  getSourceList() {
    throw new Error('getSourceList is not implemented');
  }

  getSelfLayers() {
    throw new Error('getSelfLayers is not implemented');
  }

  concatExpectLayers(selfLayers, selfLayerIds, layersOnMap) {
    const extraLayers = layersOnMap.filter((layer) => !selfLayerIds.some((id) => id === layer.id));
    return this.filterExpectedLayers(selfLayers.concat(extraLayers));
  }

  _createAppreciableLayerId(layer) {
    // 针对传入 layers
    if (layer.layerInfo && layer.layerInfo.id) {
      return layer.layerInfo.id;
    }
    // 往空地图上追加图层 且 只有一个webmap this.layers是空
    if (layer.metadata && layer.metadata.parentLayerId) {
      return layer.metadata.parentLayerId;
    }
    // 针对 MapboxStyle 或者其它额外的 layer
    // type: background 和某些 overlaymanager layers 只有 id
    return layer.sourceLayer || layer.source || layer.id;
  }

  _initAppreciableLayers(detailLayers) {
    // dv 没有关联一个可感知图层对应对个渲染图层的关系，默认相同source的layer就是渲染图层
    return detailLayers.reduce((layers, layer) => {
      const layerId = this._createAppreciableLayerId(layer);
      let matchLayer = layers.find((item) => {
        return item.id === layerId;
      });
      if (!matchLayer) {
        matchLayer = this._createCommonFields(layer, layerId);
        layers.push(matchLayer);
      }
      const nextRenderLayers = matchLayer.renderLayers.concat(
        layer.layerInfo ? layer.layerInfo.renderLayers : layer.id
      );
      matchLayer.renderLayers = Array.from(new Set(nextRenderLayers));
      return layers;
    }, []);
  }

  _initSourceList(detailLayers) {
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

  filterExpectedLayers(layers) {
    return layers.filter((layer) => this._excludeLayer(layer));
  }

  _excludeSource(key) {
    for (let i = 0; i < this.unexpectedSourceNames.length; i++) {
      if (key && key.match(this.unexpectedSourceNames[i])) {
        return false;
      }
    }
    return true;
  }

  _excludeLayer(layer) {
    return !layer.id.includes('-SM-') && this._excludeSource(layer.source);
  }

  _pickLayerFields(layer) {
    let visibility = layer.visibility;
    let sourceLayer = layer.sourceLayer;
    if (!visibility && layer.layout && 'visibility' in layer.layout) {
      visibility = layer.layout.visibility;
    }
    if (!sourceLayer && layer['source-layer']) {
      sourceLayer = layer['source-layer'];
    }
    return {
      id: layer.id,
      type: layer.type,
      visibility,
      source: layer.source,
      sourceLayer: sourceLayer,
      metadata: layer.metadata,
      layerInfo: layer.layerInfo
    };
  }

  _getAllLayersOnMap() {
    const layersOnMap = this.map.getStyle().layers.map((layer) => {
      const mapLayer = this.map.getLayer(layer.id);
      return this._pickLayerFields(mapLayer);
    });
    for (const layerId in this.map.overlayLayersManager) {
      const overlayLayer = this.map.overlayLayersManager[layerId];
      if (overlayLayer.id && !layersOnMap.some((item) => item.id === overlayLayer.id)) {
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
        layersOnMap.push(this._pickLayerFields({ id: overlayLayer.id, type: overlayLayer.type, visibility, source }));
      }
    }
    return layersOnMap;
  }

  _createCommonFields(layer, layerId) {
    const layerInfo = layer.layerInfo || {};
    // type: background overlaymanager layers 只有 id
    const {
      dataSource = {},
      themeSetting = {},
      name = layerId,
      title = name,
      visible = layer.visibility ? layer.visibility === 'visible' : true,
      CLASS_NAME,
      CLASS_INSTANCE
    } = layerInfo;
    const sourceOnMap = this.map.getSource(layer.source);
    const fields = {
      id: layerId,
      title,
      type: layer.type,
      visible,
      renderSource: sourceOnMap
        ? {
            id: layer.source,
            type: sourceOnMap.type
          }
        : {},
      renderLayers: [],
      dataSource,
      themeSetting
    };
    if (layer.sourceLayer) {
      fields.renderSource.sourceLayer = layer.sourceLayer;
    }
    if (CLASS_NAME) {
      fields.CLASS_NAME = CLASS_NAME;
    }
    if (CLASS_INSTANCE) {
      fields.CLASS_INSTANCE = CLASS_INSTANCE;
    }
    return fields;
  }
}
