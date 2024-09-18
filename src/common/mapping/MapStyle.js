import { WebMapService } from './WebMapService';
import { SourceListModelV2 } from './utils/SourceListModelV2';
import { createAppreciableLayerId, isSameRasterLayer } from './utils/util';

export function createMapStyleExtending(SuperClass, { MapManager, mapRepo }) {
  return class MapStyle extends SuperClass {
    constructor(id, options = {}, mapOptions = {}) {
      super();
      this.options = options;
      this.mapOptions = mapOptions;
      this.webMapService = new WebMapService(id, options);
      this._layerIdRenameMapList = [];
      this._appendLayers = false;
    }

    initializeMap(_, map) {
      if (map) {
        this._appendLayers = true;
        this.map = map;
        this._addLayersToMap();
        return;
      }
      this.mapOptions.container = this.options.target;
      if (typeof this.mapOptions.crs === 'object' && this.mapOptions.crs.epsgCode) {
        this.mapOptions.crs = new mapRepo.CRS(
          this.mapOptions.crs.epsgCode,
          this.mapOptions.crs.WKT,
          this.mapOptions.crs.extent,
          this.mapOptions.crs.unit
        );
      }
      if (!this.mapOptions.transformRequest) {
        this.mapOptions.transformRequest = (url, resourceType) => {
          let proxy = '';
          if (typeof this.options.proxy === 'string') {
            let proxyType = 'data';
            if (resourceType === 'Tile') {
              proxyType = 'image';
            }
            proxy = this.webMapService.handleProxy(proxyType);
          }
          return {
            url: proxy ? `${proxy}${encodeURIComponent(url)}` : url,
            credentials: this.webMapService.handleWithCredentials(proxy, url, this.options.withCredentials || false)
              ? 'include'
              : undefined
          };
        };
      }
      this.mapOptions.center = this.mapOptions.center || [0, 0];
      this.mapOptions.zoom = this.mapOptions.zoom || 0;
      let fadeDuration = 0;
      if (Object.prototype.hasOwnProperty.call(this.mapOptions, 'fadeDuration')) {
        fadeDuration = this.mapOptions.fadeDuration;
      }
      this.map = new MapManager({ ...this.mapOptions, fadeDuration });
      this.fire('mapinitialized', { map: this.map });
      this.map.on('load', () => {
        this._sendMapToUser();
      });
    }

    clean(removeMap = true) {
      if (this.map) {
        if (this._sourceListModel) {
          this._sourceListModel.destroy();
          this._sourceListModel = null;
        }
        removeMap && this.map.remove();
        this.map = null;
      }
    }

    _addLayersToMap() {
      const { sources, layers, layerIdMapList } = this._setUniqueId(this.mapOptions.style);
      layers.forEach((layer) => {
        const matchRenameLayer = layerIdMapList.find(sub => sub.renderId === layer.id);
        if (matchRenameLayer && matchRenameLayer.reused) {
          return;
        }
        layer.source && !this.map.getSource(layer.source) && this.map.addSource(layer.source, sources[layer.source]);
        this.map.addLayer(layer);
      });
      Object.assign(this.mapOptions.style, { layers, sources });
      this._layerIdRenameMapList = layerIdMapList;
      this._sendMapToUser();
    }

    _setUniqueId(style) {
      const layersToMap = JSON.parse(JSON.stringify(style.layers));
      const nextSources = {};
      const sourcesIdChangedMap = {};
      const layerIdToChange = [];
      const timestamp = `_${+new Date()}`;
      for (const sourceId in style.sources) {
        let nextSourceId = sourceId;
        if (this.map.getSource(sourceId)) {
          nextSourceId = sourceId + timestamp;
        }
        sourcesIdChangedMap[nextSourceId] = sourceId;
        nextSources[nextSourceId] = style.sources[sourceId];
        for (const layer of layersToMap) {
          if (layer.source === sourceId) {
            layer.source = nextSourceId;
          }
        }
      }
      for (const layer of layersToMap) {
        const originId = layer.id;
        let reused;
        const existLayer = this.map.getLayer(layer.id);
        if (existLayer) {
          // 此时用 getSource(xx).tiles 为空
          if (
            this.options.checkSameLayer &&
            isSameRasterLayer(nextSources[layer.source], this.map.getStyle().sources[existLayer.source])
          ) {
            reused = true;
            layer.source = sourcesIdChangedMap[layer.source];
          } else {
            const layerId = layer.id + timestamp;
            layer.id = layerId;
          }
        }
        layerIdToChange.push({ originId: originId, renderId: layer.id, reused });
      }
      return {
        sources: nextSources,
        layers: layersToMap,
        layerIdMapList: layerIdToChange
      };
    }

    _generateAppreciableLayers() {
      return this.mapOptions.style.layers.reduce((layers, layer) => {
        const nameLayer = layer['source-layer'] ? layer : { ...layer, layerInfo: { id: layer.id } };
        const id = createAppreciableLayerId(nameLayer);
        const matchLayer = layers.find(item => item.id === id);
        if (matchLayer) {
          matchLayer.renderLayers.push(layer.id);
        } else {
          const matchRenameLayer = this._layerIdRenameMapList.find((item) => item.renderId === layer.id);
          layers.push({
            ...layer,
            id,
            name: matchRenameLayer && matchRenameLayer.originId,
            renderLayers: [layer.id],
            reused: matchRenameLayer && matchRenameLayer.reused
          });
        }
        return layers;
      }, []);
    }

    _sendMapToUser() {
      const layersFromStyle = this._generateAppreciableLayers();
      this._sourceListModel = new SourceListModelV2({
        map: this.map,
        layers: layersFromStyle,
        appendLayers: this._appendLayers
      });
      this._sourceListModel.on({
        layerupdatechanged: (params) => {
          this.fire('layerupdatechanged', params);
        }
      });
      this.fire('mapcreatesucceeded', {
        map: this.map,
        mapparams: { title: this.mapOptions.name, description: '' },
        layers: this.getSelfAppreciableLayers()
      });
    }
  };
}
