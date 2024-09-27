import { Events } from '../../commontypes';
import SourceModel from './SourceModel';
import { createAppreciableLayerId, getLayerInfosFromCatalogs } from './util';

export class AppreciableLayerBase extends Events {
  constructor(options = {}) {
    super();
    this.map = options.map;
    this.layers = options.layers || [];
    this.appendLayers = options.appendLayers || false;
    this.unexpectedSourceNames = [
      'tdt-search-',
      'tdt-route-',
      'smmeasure',
      'mapbox-gl-draw',
      'maplibre-gl-draw',
      /tracklayer-\d+-line/
    ];
    this.uniqueId = +new Date();
    this.layersVisibleMap = new Map();
    this.eventTypes = ['layerupdatechanged'];
    this._styleDataUpdatedHandler = this._styleDataUpdatedHandler.bind(this);
  }

  setLayers(layers) {
    this.layers = layers;
  }

  createLayerCatalogs() {
    throw new Error('createLayerCatalogs is not implemented');
  }

  getSelfLayerIds() {
    throw new Error('getSelfLayerIds is not implemented');
  }

  initLayers() {
    throw new Error('initLayers is not implemented');
  }

  createAppreciableLayers() {
    const detailLayers = this.initLayers();
    return this._initAppreciableLayers(detailLayers);
  }

  getLayerCatalog() {
    const layerCatalog = this.createLayerCatalogs();
    this._updateLayerCatalogsVisible(layerCatalog);
    return this._updateImmutableOrderLayers(layerCatalog);
  }

  getLayers(removeExtral = true) {
    const layers = this.createAppreciableLayers();
    removeExtral && this.removeLayerExtralFields(layers);
    return this._updateImmutableOrderLayers(layers, true);
  }

  getSelfLayers(appreciableLayers = this.getLayers()) {
    const selfLayerIds = this.getSelfLayerIds();
    return appreciableLayers.filter((item) =>
      item.renderLayers.some((id) => selfLayerIds.some((renderId) => renderId === id))
    );
  }

  toggleLayerVisible(layer, visible) {
    const visibility = visible ? 'visible' : 'none';
    if (layer.type === 'group') {
      const visbleId = this._getLayerVisibleId(layer);
      this.layersVisibleMap.set(visbleId, visible);
      const targetLayers = getLayerInfosFromCatalogs(layer.children);
      if (!targetLayers.length) {
        this.map.style.fire('data', { dataType: 'style' });
      } else {
        this.setLayersVisible(targetLayers, visibility);
      }
    } else {
      this.setLayersVisible([layer], visibility);
    }
  }

  setLayersVisible(layers, visibility) {
    layers.forEach((layer) => {
      const visbleId = this._getLayerVisibleId(layer);
      this.layersVisibleMap.set(visbleId, visibility === 'visible');
      if (layer.CLASS_INSTANCE && layer.CLASS_INSTANCE.show && layer.CLASS_INSTANCE.hide) {
        visibility === 'visible' ? layer.CLASS_INSTANCE.show() : layer.CLASS_INSTANCE.hide();
        this.map.style.fire('data', { dataType: 'style' });
        return;
      }
      layer.renderLayers.forEach((layerId) => {
        if (layer.CLASS_NAME !== 'L7Layer' || this.map.getLayer(layerId)) {
          this.map.setLayoutProperty(layerId, 'visibility', visibility);
        }
      });
    });
  }

  concatExpectLayers(selfLayers, selfLayerIds, layersOnMap) {
    const extraLayers = layersOnMap.filter((layer) => !selfLayerIds.some((id) => id === layer.id));
    return this._filterExpectedLayers(selfLayers.concat(extraLayers));
  }

  destroy() {
    this.map.off('styledata', this._styleDataUpdatedHandler);
  }

  initDatas() {
    if (!this.map) {
      return;
    }
    this._styleDataUpdatedHandler();
    this._registerMapEvent();
  }

  removeLayerExtralFields(layers) {
    layers.forEach((layer) => {
      delete layer.metadata;
    });
  }

  _initAppreciableLayers(detailLayers) {
    // dv 没有关联一个可感知图层对应对个渲染图层的关系，默认相同source的layer就是渲染图层
    return detailLayers.reduce((layers, layer) => {
      const layerId = createAppreciableLayerId(layer);
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
    const datas = detailLayers
      .slice()
      .reverse()
      .reduce((sourceList, layer) => {
        const id = layer.renderSource.sourceLayer ? `${layer.renderSource.id}_${this.uniqueId}` : layer.id;
        const title = layer.metadata.SM_Layer_Title || (layer.renderSource.sourceLayer ? layer.renderSource.id : layer.title);
        let matchItem = sourceList.find((item) => {
          return item.id === id;
        });
        if (!matchItem) {
          const sourceListItem = new SourceModel({ ...layer, id, title });
          sourceList.push(sourceListItem);
          matchItem = sourceListItem;
        }
        matchItem.addLayer(layer);
        return sourceList;
      }, []);
    return datas;
  }

  _filterExpectedLayers(layers) {
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
        layersOnMap.push(
          this._pickLayerFields({
            id: overlayLayer.id,
            type: overlayLayer.type,
            visibility,
            source,
            metadata: overlayLayer.metadata
          })
        );
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
      CLASS_INSTANCE,
      reused,
      metadata = layer.metadata || {}
    } = layerInfo;
    const sourceOnMap = this.map.getSource(layer.source);
    const fields = {
      id: layerId,
      title,
      type: layer.type,
      visible: this._getLayerVisible({ id: layerId, type: layer.type, visible }),
      renderSource: sourceOnMap
        ? {
            id: layer.source,
            type: sourceOnMap.type
          }
        : {},
      renderLayers: [],
      dataSource,
      themeSetting,
      metadata,
      // top bottom auto
      layerOrder: metadata.SM_Layer_Order || 'auto'
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
    if (reused) {
      fields.reused = reused;
    }
    return fields;
  }

  _findLayerCatalog(layerCatalogs, targetId) {
    for (const layer of layerCatalogs) {
      if (layer.id === targetId) {
        return layer;
      }
      if (layer.children && layer.children.length > 0) {
        const found = this._findLayerCatalog(layer.children, targetId);
        if (found) {
          return found;
        }
      }
    }
    return null;
  }

  _getLayerVisibleId(layer) {
    return `${layer.type}-${layer.id}`;
  }

  _getLayerVisible(layer) {
    const id = this._getLayerVisibleId(layer);
    return this.layersVisibleMap.has(id) ? this.layersVisibleMap.get(id) : layer.visible;
  }

  _updateLayerCatalogsVisible(catalogs) {
    for (const data of catalogs) {
      data.visible = this._getLayerVisible(data);
      if (data.type === 'group') {
        this._updateLayerCatalogsVisible(data.children);
      }
    }
  }

  _registerMapEvent() {
    this.map.on('styledata', this._styleDataUpdatedHandler);
  }

  _styleDataUpdatedHandler() {
    const layers = this.getLayers();
    this.triggerEvent('layerupdatechanged', {
      layers,
      relevantLayers: this.getSelfLayers(layers),
      layerCatalog: this.getLayerCatalog()
    });
  }

  _updateImmutableOrderLayers(layers, revert) {
    let topLayers = layers.filter(item => item.layerOrder && item.layerOrder.toLowerCase() === 'top');
    const migrationLayers = topLayers.filter(item => item.type === 'MIGRATION');
    const leftTopLayers = topLayers.filter(item => item.type !== 'MIGRATION');
    topLayers = migrationLayers.concat(leftTopLayers);
    const bottomLayers = layers.filter(item => item.layerOrder && item.layerOrder.toLowerCase() === 'bottom');
    const autoLayers = layers.filter(item => !item.layerOrder || item.layerOrder.toLowerCase() === 'auto');
    if (revert) {
      return bottomLayers.concat(autoLayers, topLayers);
    }
    return topLayers.concat(autoLayers, bottomLayers);
  }
}
