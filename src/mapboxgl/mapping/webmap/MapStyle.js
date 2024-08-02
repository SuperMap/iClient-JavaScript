import mapboxgl from 'mapbox-gl';
import { WebMapService } from "@supermapgis/iclient-common/mapping/WebMapService";
import { createMapClassExtending } from './MapBase';
import { SourceListModel } from '../utils/SourceListModel';


export class MapStyle extends createMapClassExtending(mapboxgl.Evented) {
  constructor(
    id,
    options = {},
    mapOptions = {}
  ) {
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
      this.mapOptions.crs = new mapboxgl.CRS(
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
    this.map = new mapboxgl.Map({ ...this.mapOptions, fadeDuration });
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

  getLayerCatalog() {
    return this._sourceListModel && this._sourceListModel.getSourceList() || [];
  }

  getLegendInfo() {
    return [];
  }

  getAppreciableLayers() {
    return this._sourceListModel && this._sourceListModel.getLayers() || [];
  }

  _addLayersToMap() {
    const { sources, layers, layerIdMapList } = this._setUniqueId(this.mapOptions.style);
    layers.forEach(layer => {
      layer.source && !this.map.getSource(layer.source) && this.map.addSource(layer.source, sources[layer.source]);
      this.map.addLayer(layer);
    });
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
    const layers = this.mapOptions.style.layers.map((layer) => {
      const matchLayer = this._layerIdRenameMapList.find(item => item.originId === layer.id) || { renderId: layer.id };
      const overlayLayers = {
        id: matchLayer.renderId,
        name: layer.id
      };
      return overlayLayers;
    });
    return layers;
  }

  _sendMapToUser() {
    const appreciableLayers = this._generateAppreciableLayers();
    this._sourceListModel = new SourceListModel({
      map: this.map,
      layers: appreciableLayers,
      appendLayers: this._appendLayers
    });
    const matchLayers = this.getAppreciableLayers().filter((item) =>
      appreciableLayers.some((layer) => layer.id === item.id)
    );
    this.fire('addlayerssucceeded', {
      map: this.map,
      mapparams: { title: this.mapOptions.name, description: '' },
      layers: matchLayers
    });
  }

}
