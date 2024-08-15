import { WebMapService } from './WebMapService';
import { SourceListModel } from './utils/SourceListModelV2';

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
        removeMap && this.map.remove();
        this.map = null;
        this._sourceListModel = null;
      }
    }

    _addLayersToMap() {
      const { sources, layers, layerIdMapList } = this._setUniqueId(this.mapOptions.style);
      layers.forEach((layer) => {
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
      const layerIdToChange = [];
      const timestamp = `_${+new Date()}`;
      for (const sourceId in style.sources) {
        let nextSourceId = sourceId;
        if (this.map.getSource(sourceId)) {
          nextSourceId = sourceId + timestamp;
        }
        nextSources[nextSourceId] = style.sources[sourceId];
        for (const layer of layersToMap) {
          if (layer.source === sourceId) {
            layer.source = nextSourceId;
          }
        }
      }
      for (const layer of layersToMap) {
        const originId = layer.id;
        if (this.map.getLayer(layer.id)) {
          const layerId = layer.id + timestamp;
          layer.id = layerId;
        }
        layerIdToChange.push({ originId: originId, renderId: layer.id });
      }
      return {
        sources: nextSources,
        layers: layersToMap,
        layerIdMapList: layerIdToChange
      };
    }

    _generateAppreciableLayers() {
      return this.mapOptions.style.layers.reduce((layers, layer) => {
        const id = layer['source-layer'] || layer.source || layer.id;
        const matchLayer = layers.find(item => item.id === id);
        if (matchLayer) {
          matchLayer.renderLayers.push(layer.id);
        } else {
          const matchRenameLayer = this._layerIdRenameMapList.find((item) => item.renderId === layer.id);
          layers.push({
            ...layer,
            id,
            name: matchRenameLayer && matchRenameLayer.originId,
            renderLayers: [layer.id]
          });
        }
        return layers;
      }, []);
    }

    _sendMapToUser() {
      const layersFromStyle = this._generateAppreciableLayers();
      this._sourceListModel = new SourceListModel({
        map: this.map,
        layers: layersFromStyle,
        appendLayers: this._appendLayers
      });
      this.fire('addlayerssucceeded', {
        map: this.map,
        mapparams: { title: this.mapOptions.name, description: '' },
        layers: this.getSelfAppreciableLayers()
      });
    }
  };
}
