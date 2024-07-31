
import { AppreciableLayerBase } from './AppreciableLayerBase';
import { getLayerInfosFromCatalogs } from './util';

export class SourceListModel extends AppreciableLayerBase {
  constructor(options = {}) {
    super(options);
    this._mapInfo = options.mapInfo;
    this._layerCatalog = options.mapInfo.metadata.layerCatalog;
    this._mapResourceInfo = options.mapResourceInfo;
    this._l7LayerUtil = options.l7LayerUtil;
    this._legendList = options.legendList;
    const layers = this._generateLayers();
    this.setSelfLayers(layers);
  }

  getLayers() {
    const detailLayers = this._initLayers();
    return this._initAppreciableLayers(detailLayers);
  }

  getSelfLayers() {
    const appreciableLayers = this.getLayers();
    const selfLayerIds = this._getSelfLayerIds();
    return appreciableLayers.filter((item) => selfLayerIds.some((id) => id === item.id));
  }

  getSourceList() {
    const appreciableLayers = this.getLayers();
    const sourceList = this._createSourceCatalogs(this._layerCatalog, appreciableLayers);
    const selfLayerIds = this._getSelfLayerIds();
    const extraLayers = appreciableLayers.filter((item) => !selfLayerIds.some((id) => id === item.id));
    const extraSourceList = this._initSourceList(extraLayers);
    return extraSourceList.concat(sourceList);
  }

  _initLayers() {
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

  _createSourceCatalogs(catalogs, appreciableLayers) {
    const formatCatalogs = catalogs.map((catalog) => {
      let formatItem;
      const { id, title = id, type, visible, children } = catalog;
      if (type === 'group') {
        formatItem = {
          children: this._createSourceCatalogs(children, appreciableLayers),
          id,
          title,
          type,
          visible
        };
      } else {
        formatItem = appreciableLayers.find((layer) => layer.id === id);
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
    const layerDatas = metadataCatalogs.map(layerCatalog => {
      const layer = this._mapInfo.layers.find(item => item.id === layerCatalog.id) || {};
      const layerInfo = { id: layer.id, title: layerCatalog.title, renderLayers: this._getRenderLayers(layerCatalog.parts, layerCatalog.id) };
      const matchProjectCatalog = projectCataglogs.find((item) => item.id === layerCatalog.id) || {};
      const { msDatasetId } = matchProjectCatalog;
      let dataSource = {};
      if (msDatasetId) {
        for (const data of datas) {
          const matchData = data.datasets && data.datasets.find((dataset) => dataset.msDatasetId === msDatasetId);
          if (matchData) {
            dataSource = {
              serverId: matchData.datasetId,
              type: data.sourceType
            }
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
      return Object.assign({}, layer, { layerInfo });
    });
    layerDatas.reverse();
    return layerDatas;
  }

  _getRenderLayers(layerIds, layerId) {
    if (layerIds) {
      if (layerIds.includes(layerId)) {
        return layerIds;
      } else {
        return [layerId, ...layerIds];
      }
    } else {
      return [layerId];
    }
  }

  _getSelfLayerIds() {
    return this.layers.map(item => item.id);
  }
}
