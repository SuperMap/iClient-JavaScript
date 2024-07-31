import SourceModel from './SourceModel';

export class SourceListModel {
  constructor(options = {}) {
    this.map = options.map;
    this.layers = options.layers || [];
    this.appendLayers = options.appendLayers || false;
    this.excludeSourceNames = ['tdt-search-', 'tdt-route-', 'smmeasure', 'mapbox-gl-draw', /tracklayer-\d+-line/];
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
    const layersOnMap = this.map.getStyle().layers.map(layer => this.map.getLayer(layer.id));
    const overlayLayers = Object.values(this.map.overlayLayersManager).reduce((layers, overlayLayer) => {
      if (overlayLayer.id && !layers.some(item => item.id === overlayLayer.id)) {
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
      .filter(layer => !this.appendLayers || this.layers.some(item => layer.id === item.id));
    const nextLayers = renderLayers
      .filter(layer => this.excludeSource(layer.source))
      .filter(layer => !layer.id.includes('-SM-'));
    const selfLayers = [];
    const selfLayerIds = [];
    // 排序
    this.layers.forEach(item => {
      const matchLayer = nextLayers.find(layer => layer.id === item.id);
      if (matchLayer) {
        selfLayers.push(matchLayer);
        selfLayerIds.push(matchLayer.id);
      }
    });
    const otherLayers = nextLayers.filter(item => !selfLayerIds.includes(item.id));
    return selfLayers.concat(otherLayers);
  }

  _initSource(detailLayers) {
    const datas = detailLayers.reduce((sourceList, layer) => {
      let matchItem = sourceList.find(item => {
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
      let matchLayer = layers.find(item => {
        const layerId = layer.sourceLayer || layer.source || layer.id;
        return item.id === layerId;
      });
      if (!matchLayer) {
        matchLayer = this._createCommonFields(layer);
        layers.push(matchLayer);
      }
      matchLayer.renderLayers.push(layer.id);
      return layers;
    }, []);
  }

  _createCommonFields(layer) {
    const layerInfo = this.layers.find(layerItem => layer.id === layerItem.id) || {};
    // type: background overlaymanager layers 只有 id
    const layerId = layer.sourceLayer || layer.source || layer.id;
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
      renderSource: {
        id: layer.source,
        type: sourceOnMap && sourceOnMap.type
      },
      renderLayers: [],
      dataSource: dataSource || (serverId ? { serverId } : {}),
      themeSetting
    };
    if (layer.sourceLayer) {
      fields.renderSource.sourceLayer = layer.sourceLayer;
    }
    return fields;
  }
}
