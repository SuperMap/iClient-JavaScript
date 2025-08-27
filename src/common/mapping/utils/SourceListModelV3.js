import { AppreciableLayerBase } from './AppreciableLayerBase';
import { getLayerCatalogRenderLayers, getLayerInfosFromCatalogs, getMainLayerFromCatalog } from './util';

export class SourceListModelV3 extends AppreciableLayerBase {
  constructor(options = {}) {
    super(options);
    this._mapInfo = options.mapInfo;
    this._mapResourceInfo = options.mapResourceInfo;
    this._l7LayerUtil = options.l7LayerUtil;
    this._legendList = options.legendList;
    // chart 统计图表 point-extrusion 柱状图
    this._immutableTopOrderLayers = ['chart', 'point-extrusion'];
    const layerCatalogs = options.mapInfo.metadata.layerCatalog;
    this.setLayerCatalog(layerCatalogs);
    const layers = this._generateLayers();
    this.setLayers(layers);
    this.setDefaultBaseLayerInfo(this._generateBaseLayerInfo(layerCatalogs, layers));
    this.initDatas();
  }

  setLayerCatalog(catalogs) {
    this._layerCatalog = catalogs;
  }

  createLayerCatalogs() {
    const appreciableLayers = this.getLayers(false);
    const sourceList = this._createSourceCatalogs(this._layerCatalog, appreciableLayers);
    const selfLayers = this.getSelfLayers();
    const extraLayers = appreciableLayers.filter((item) => !selfLayers.some((sub) => sub.id === item.id));
    const extraSourceList = this._initSourceList(extraLayers);
    return extraSourceList.concat(sourceList);
  }

  getSelfLayerIds() {
    return this.layers.reduce((ids, item) => ids.concat(item.layerInfo.renderLayers), []);
  }

  initLayers() {
    const layersOnMap = this._getAllLayersOnMap();
    let nextLayers = layersOnMap;
    if (this.appendLayers) {
      nextLayers = [];
    }
    const selfLayers = this.layers.map((item) => {
      const layer = Object.assign({}, item);
      if (item['source-layer']) {
        layer.sourceLayer = item['source-layer'];
      }
      return this._pickLayerFields(layer);
    });
    const selfLayerIds = this.layers.reduce((ids, item) => ids.concat(item.layerInfo.renderLayers), []);
    return this.concatExpectLayers(selfLayers, selfLayerIds, nextLayers);
  }

  setBaseLayer(layerItem) {
    const nextLayers = this.layers.slice();
    const nextLayerCatalog = this._layerCatalog.slice();
    const originBaseLayerCatalog = nextLayerCatalog.pop();
    this._removeBaseLayerRenderLayers(originBaseLayerCatalog, nextLayers);
    const baseLayers = layerItem.layers.map((layer) => {
      const title = layer.metadata && layer.metadata.title;
      return {
        ...layer,
        layerInfo: {
          id: layer.id,
          title: title || layer.id,
          renderLayers: [layer.id]
        }
      };
    });
    nextLayers.unshift(...baseLayers);
    const firstLayer = layerItem.layers[0] || {};
    const defaultId = firstLayer.id || '';
    const baseLayerCatalog = {
      id: defaultId,
      title: layerItem.title || defaultId,
      type: 'basic',
      visible: true
    };
    if (layerItem.layers.length > 1) {
      baseLayerCatalog.id = layerItem.id || defaultId;
      baseLayerCatalog.type = 'group';
      baseLayerCatalog.children = layerItem.layers.map((layer) => {
        const title = layer.metadata && layer.metadata.title;
        return {
          id: layer.id,
          title: title || layer.id,
          type: 'basic',
          visible: true
        };
      });
    }
    nextLayerCatalog.push(baseLayerCatalog);
    this.setLayerCatalog(nextLayerCatalog);
    this.setLayers(nextLayers);
  }

  _createSourceCatalogs(catalogs, appreciableLayers) {
    const formatCatalogs = catalogs.map((catalog) => {
      let formatItem;
      const { id, title = id, type, visible, children, parts } = catalog;
      if (type === 'group') {
        formatItem = {
          children: this._createSourceCatalogs(children, appreciableLayers),
          id,
          title,
          type,
          visible
        };
      } else {
        const renderLayers = getLayerCatalogRenderLayers(parts, id, this.layers);
        const matchLayer = appreciableLayers.find((layer) => layer.id === renderLayers[0]);
        this.removeLayerExtralFields([matchLayer]);
        formatItem = Object.assign({}, matchLayer);
      }
      return formatItem;
    });
    return formatCatalogs;
  }

  _generateLayers() {
    const { catalogs = [], datas = [] } = this._mapResourceInfo;
    const projectCataglogs = getLayerInfosFromCatalogs(catalogs, 'catalogType');
    const metadataCatalogs = getLayerInfosFromCatalogs(this._mapInfo.metadata.layerCatalog);
    const l7MarkerLayers = this._l7LayerUtil.getL7MarkerLayers();
    const layerDatas = metadataCatalogs.map((layerCatalog) => {
      const renderLayers = getLayerCatalogRenderLayers(layerCatalog.parts, layerCatalog.id, this._mapInfo.layers);
      const layer = getMainLayerFromCatalog(layerCatalog.parts, layerCatalog.id, this._mapInfo.layers);
      const layerInfo = {
        id: layer.id,
        title: layerCatalog.title,
        renderLayers,
        reused: layer.metadata && layer.metadata.reused
      };
      const matchProjectCatalog = projectCataglogs.find((item) => item.id === layerCatalog.id) || {};
      const { msDatasetId, relationMsDatasetId } = matchProjectCatalog;
      let dataSource = {};
      if (msDatasetId) {
        for (const data of datas) {
          const matchData = data.datasets && data.datasets.find((dataset) => dataset.msDatasetId === msDatasetId);
          if (matchData) {
            dataSource = {
              serverId: matchData.datasetId,
              type: data.sourceType
            };
            if (data.sourceType === 'REST_DATA') {
              const [serverUrl, datasourceName] = data.url.split('/rest/data/datasources/');
              dataSource.url = `${serverUrl}/rest/data`;
              dataSource.dataSourceName = `${datasourceName}:${matchData.datasetName}`;
              delete dataSource.serverId;
            }
            break;
          }
        }
      }
      if (relationMsDatasetId) {
        const currentData = datas.find(data => data.datasets.find(dataset => dataset.msDatasetId === relationMsDatasetId));
        const sourceType = currentData && currentData.sourceType;
        if (sourceType === 'WFS') {
          const withCredential = currentData.withCredential;
          let url = currentData.url;
          if (withCredential && withCredential.key && withCredential.value) {
            const separator = url.includes('?') ? '&' : '?';
            url = `${url}${separator}${withCredential.key}=${withCredential.value}`
          }
          const dataset = currentData.datasets.find(dataset => dataset.msDatasetId === relationMsDatasetId);
          Object.assign(dataSource, {
            type: 'WFS',
            datasetName: dataset.datasetName,
            url
          });
        }
      }
      const sourceOnMap = this.map.getSource(layer.source);
      if (!Object.keys(dataSource).length && sourceOnMap && sourceOnMap.type === 'vector') {
        const matchSource = this._mapInfo.sources[layer.source] || sourceOnMap;
        if (matchSource.tiles && matchSource.tiles[0].includes('/rest/maps/')) {
          const tileUrl = matchSource.tiles[0];
          const [serverUrl, leftParts] = tileUrl.split('/rest/maps/');
          const [mapName] = leftParts.split('/tileFeature');
          dataSource.url = `${serverUrl}/rest/maps`;
          dataSource.mapName = mapName;
          dataSource.type = 'REST_MAP';
        }
      }
      layerInfo.dataSource = dataSource;
      if (this._l7LayerUtil.isL7Layer(layer)) {
        layerInfo.CLASS_NAME = 'L7Layer';
      }
      if (l7MarkerLayers[layer.id]) {
        layerInfo.CLASS_INSTANCE = l7MarkerLayers[layer.id];
      }
      const matchThemeFields = this._legendList
        .filter((item) => item.layerId === layer.id)
        .map((item) => item.themeField)
        .filter((item) => !!item);
      const validThemeFields = Array.from(new Set(matchThemeFields));
      if (validThemeFields.length > 0) {
        layerInfo.themeSetting = { themeField: validThemeFields };
      }
      if (this._immutableTopOrderLayers.some((type) => type === layer.type)) {
        layerInfo.metadata = Object.assign({}, layer.metadata, { SM_Layer_Order: 'top' });
      }
      return Object.assign({}, layer, { layerInfo });
    });
    layerDatas.reverse();
    return layerDatas;
  }

  _generateBaseLayerInfo(layerCatalog, layers) {
    const nextLayerCatalog = layerCatalog.slice();
    const originBaseLayerCatalog = nextLayerCatalog.pop();
    if (!originBaseLayerCatalog) {
      return;
    }
    const renderLayers = this._getBaseLayerRenderLayers(originBaseLayerCatalog, layers);
    const baseLayersOnMap = renderLayers.map((layer) => {
      const nextLayer = { ...layer };
      delete nextLayer.layerInfo;
      const layerIndex = layers.findIndex((item) => item.id === layer.id);
      const nextLayerIndex = layerIndex + 1;
      if (layers[nextLayerIndex]) {
        nextLayer.beforeId = layers[nextLayerIndex].id;
      }
      return nextLayer;
    });
    const sourcesMap = this.map.getStyle().sources;
    return {
      id: `__default__${originBaseLayerCatalog.id}`,
      title: originBaseLayerCatalog.title,
      layers: baseLayersOnMap,
      sources: baseLayersOnMap.reduce((sources, layer) => {
        const sourceId = layer.source;
        if (sourceId && !sources[sourceId]) {
          sources[sourceId] = sourcesMap[sourceId];
        }
        return sources;
      }, {})
    };
  }

  _getBaseLayerRenderLayers(layerCatalog, layersOnMap) {
    const uniqueSet = new Set();
    const collectIds = (node) => {
      if (node.children) {
        node.children.forEach((child) => collectIds(child));
      }
      const parts = node.parts || [node.id];
      parts.forEach(part => uniqueSet.add(part));
    };
    collectIds(layerCatalog);

    return layersOnMap.filter(layer => uniqueSet.has(layer.id));
  }

  _removeBaseLayerRenderLayers(layerCatalog, layersOnMap) {
    const deleteSet = new Set();
    const collectIds = (node) => {
      if (node.children) {
        node.children.forEach((child) => collectIds(child));
      }
      const parts = node.parts || [node.id];
      parts.forEach(part => deleteSet.add(part));
    };
    collectIds(layerCatalog);

    let writeIndex = 0;
    for (let i = 0; i < layersOnMap.length; i++) {
      if (!deleteSet.has(layersOnMap[i].id)) {
        layersOnMap[writeIndex++] = layersOnMap[i];
      }
    }
    layersOnMap.length = writeIndex;
  }
}
