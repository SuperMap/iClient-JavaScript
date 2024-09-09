import maplibregl from 'maplibre-gl';
class VectorTileSource {
  constructor(id, options) {
    this.id = id;
    this.options = options;
  }
  async beforeLoad() {}
}
maplibregl.VectorTileSource = VectorTileSource;

const defaultOptions = {
  doubleClickZoom: true
};

function functor(x) {
  return function () {
    return x;
  };
}

const Map = function (options) {
  const evented = new maplibregl.Evented();
  this.on = evented.on;
  this.once = evented.once;
  this._update = ()=>{};
  this.fire = evented.fire;
  this.listens = evented.listens;

  this.options = options;
  this._events = {};
  this._sources = {};
  this._collectResourceTiming = !!this.options.collectResourceTiming;
  this.zoom = this.options.zoom || 0;
  this._container = this.options.container || 'map';
  this._layers = {};
  this._layersList = [];
  this.getContainer = function () {
    return this._container;
  };
  this.bounds = this.options.bounds;

  try {
    this.center = this.options.center
      ? new maplibregl.LngLat(this.options.center.lng, this.options.center.lat)
      : new maplibregl.LngLat(0, 0);
  } catch (e) {
    this.center = this.options.center
      ? new maplibregl.LngLat(this.options.center[0], this.options.center[1])
      : new maplibregl.LngLat(0, 0);
  }
  this.resize = jasmine.createSpy('resize').and.callFake(() => {});
  this.style = {
    ...options.style,
    addGlyphs: jasmine.createSpy('addGlyphs').and.callFake(() => {}),
    addSprite: jasmine.createSpy('addSprite').and.callFake(() => {}),
    _layers: this._layers,
  };
  this.setStyle = function (style, options) {
    if (style.layers) {
      for (let i = 0, list = style.layers; i < list.length; i += 1) {
        const layer = list[i];
        this._layers[layer.id] = list[i];
        if (!this._layersList.find(item => item.id === layer.id)) {
          this._layersList.push(layer);
        }
      }
    }
    this.sources = style.sources;
  };
  if (options.style) {
    this.setStyle(options.style);
  }
  this.transform = {
    zoomScale: function () {},
    angle: 0
  };
  this._controlCorners = {
    'top-left': {
      appendChild: function () {}
    }
  };

  const setters = [
    // Camera options
    'jumpTo',
    'panTo',
    'panBy',
    'setBearing',
    'setPitch',
    'setZoom',
    'fitBounds',
    'resetNorth',
    'snapToNorth',
    // Settings
    'setMaxBounds',
    'setMinZoom',
    'setMaxZoom',
    // Layer properties
    'setLayoutProperty',
    'setPaintProperty'
  ];
  const genericSetter = functor(this);
  for (let i = 0; i < setters.length; i++) {
    this[setters[i]] = genericSetter;
  }

  this.setLayoutProperty = function (layerid) {};
  this.setLayoutPropertyBySymbolBak = function (layerid) {};

  this.addControl = function (control) {
    control.onAdd(this);
  };

  this.getStyle = function () {
    return {
      version: 8,
      sources: this._sources,
      layers: this._layersList
    };
  };

  this.getContainer = function () {
    const container = {
      parentNode: container,
      appendChild: function () {},
      removeChild: function () {},
      getElementsByClassName: function () {
        return [container];
      },
      addEventListener: function (name, handle) {},
      removeEventListener: function () {},
      classList: {
        add: function () {},
        remove: function () {}
      }
    };

    return container;
  };

  this.getSource = function (name) {
    const sourceInfo = this._sources[name];
    if (sourceInfo && sourceInfo.type === 'video') {
      return {
        play: function () {}
      };
    }
    if (sourceInfo && sourceInfo.type === 'geojson') {
      return {
        ...sourceInfo,
        setData: jasmine.createSpy('setData').and.callFake(() => {}),
        _data: this._sources[name].data,
      };
    }
    return sourceInfo;
  };

  this.loaded = function () {
    return true;
  };

  this.removeControl = function () {
    return this;
  };

  this.overlayLayersManager = {};

  this.addSource = function (name, source) {
    if (source && source.drawImageCallback) {
      source.drawImageCallback();
    }
    this._sources[name] = source;
  };
  this.removeSource = function (name) {
    delete this._sources[name];
  };
  this.off = function () {};
  this.addLayer = function (layer, before) {
    this._layers[layer.id] = layer;
    if (layer.source instanceof Object){
      this.addSource(layer.id, Object.assign({}, layer.source))
      this._layers[layer.id].source = layer.id;
    }
    if (!this._layersList.find(item => item.id === layer.id)) {
      this._layersList.push(layer);
    }
    if (layer.onAdd) {
      layer.onAdd(this);
    }
    if (layer.render) {
      layer.render();
    }
    return this;
  };

  this.addStyle = jasmine.createSpy('addStyle').and.callFake(function (style, before) {
    if (style.sources) {
      for (const key in style.sources) {
        this.addSource(key, style.sources[key]);
      }
    }
    if (style.layers) {
      style.layers.forEach(layer => {
        if (layer.type !== 'background') {
          this.addLayer(layer);
        }
      });
    }
    return style;
  });

  this.removeLayer = function (layerId) {
    delete this._layers[layerId];
    const matchIndex = this._layersList.findIndex(item => item.id === layerId);
    if (matchIndex > -1) {
      this._layersList.splice(matchIndex, 1);
    }
  };
  this.moveLayer = function (layerId, beforeId) {
    const matchLayerIndex = this._layersList.findIndex(item => item.id === layerId);
    if (matchLayerIndex === -1) {
      return;
    }
    const beforeIndex = this._layersList.findIndex(item => item.id === beforeId);
    const layer = this._layersList[matchLayerIndex];
    if (beforeIndex > -1) {
      const insertIndex = beforeIndex < matchLayerIndex ? beforeIndex : beforeIndex - 1;
      this._layersList.splice(matchLayerIndex, 1);
      this._layersList.splice(insertIndex, 0, layer);
      return;
    }
    this._layersList.splice(matchLayerIndex, 1);
    this._layersList.push(layer);
  };
  this.getFilter = function (layerId) {};
  this.setFilter = function (layerId, filter) {};
  this.getLayer = function (id) {
    return this._layers[id];
  };
  this.getBounds = function () {
    return (
      this.bounds ||
      maplibregl.LngLatBounds.convert([
        [-180, -90],
        [180, 90]
      ])
    );
  };

  this.getZoom = function () {
    return this.zoom;
  };
  this.getBearing = functor(0);
  this.getPitch = functor(0);
  this.getCenter = function () {
    return this.center;
  };
  this.setCenter = function (x) {
    if (x instanceof Array) {
      this.center = new maplibregl.LngLat(x[0], x[1]);
    } else if (x instanceof Object) {
      this.center = new maplibregl.LngLat(x.lng, x.lat);
    }
  };

  this.getMinZoom = function () {
    return 0;
  };
  this.getMaxZoom = function () {
    return 22;
  };
  this.doubleClickZoom = {
    disable: function () {},
    enable: function () {}
  };

  this.boxZoom = {
    disable: function () {},
    enable: function () {}
  };

  this.dragPan = {
    disable: function () {},
    enable: function () {}
  };

  this.scrollZoom = {
    disable: function () {},
    enable: function () {}
  };

  this.dragRotate = {
    disable: function () {},
    enable: function () {}
  };

  this.keyboard = {
    disable: function () {},
    enable: function () {}
  };

  this.touchZoomRotate = {
    disable: function () {},
    enable: function () {}
  };

  this.project = function (latlng) {
    if (latlng) {
      return {
        x: Math.floor(Math.random() * 800),
        y: Math.floor(Math.random() * 600),
      }
    };
    return {
      x: 500,
      y: 300
    };
  };
  this.unproject = function (point) {
    return new maplibregl.LngLat(-73.9876, 40.7661);
  };

  this.queryRenderedFeatures = function (pointOrBox, queryParams) {
    return [];
  };

  this.querySourceFeatures = function (sourceId, queryParams) {
    return [];
  };

  this.remove = function () {
    this._events = [];
    this.sources = [];
  };

  this.zoomIn = function (e) {
    this.zoom++;
    return this.zoom;
  };

  this.zoomOut = function (e) {
    this.zoom--;
    this.fire('wheel');
    this.fire('zoomend', this.zoom);
    return this.zoom;
  };
  this.loadImage = function (src, callback) {
    callback(null, [1, 2, 3]);
  };
  this.addImage = function () {};
  this.hasImage = function () {
    return true;
  };
  this.getPaintProperty = function () {};
  this.getLayoutProperty = function () {};
  this.removeImage = function () {};
  this.getCanvasContainer = () => {
    if (typeof this._container === 'string') {
      return document.getElementById(this._container);
    }
    return this._container;
  };
  this.getCanvas = () => {
    return {
      style: {
        width: 100,
        height: 100
      },
      getBoundingClientRect: function () {
        return {
          width: 100,
          height: 100
        };
      }
    };
  };
  this.getCRS = () => {
    if (!this._crs) {
      if (this.options.crs && typeof this.options.crs !== 'string') {
        this._crs = CRS.get(this.options.crs);
      } else {
        this._crs = CRS.get(this.options.crs || 'EPSG:3857');
      }
    }
    return this._crs;
  };
  this.setCRS = (crs) => {
    this._crs = crs;
  };
  this.flyTo = (options) => {};
  this.setRenderWorldCopies = (epsgCode) => {};
  this.triggerRepaint = () => {};
  setTimeout(() => {
    this.fire('load');
  }, 0);
};

class CRS {
  constructor(epsgCode, WKT, extent, unit) {
    this.epsgCode = epsgCode;
    this.extent = extent;
    this.unit = unit;
    if (Array.isArray(WKT)) {
        this.extent = WKT;
        WKT = null;
    }
    if(this.extent[0] === -180 && this.extent[2] === 180 && this.extent[3] === 90) {
        this.extent[1] = Math.max(this.extent[1], -90);
    }
    this.WKT = WKT || CRS.defaultWKTs[epsgCode];
    CRS.set(this);
  }

  getExtent() {
      if (!this._rectifyExtent) {
          const width = this.extent[2] - this.extent[0];
          const height = this.extent[3] - this.extent[1];
          if (width === height) {
              this._rectifyExtent = [this.extent[0], this.extent[1], this.extent[2], this.extent[3]];
          } else {
              const a = Math.max(width, height);
              this._rectifyExtent = [this.extent[0], this.extent[3] - a, this.extent[0] + a, this.extent[3]]
          }
      }
      return this._rectifyExtent;
  }

  getEpsgCode() {
      return this.epsgCode;
  }

  getOrigin() {
      return [this.extent[0], this.extent[3]];
  }

  static get(codeSpec) {
    for (const key in CRS) {
        if (CRS.hasOwnProperty(key)) {
            if (CRS[key].getEpsgCode && CRS[key].getEpsgCode() === codeSpec) {
                return CRS[key];
            }
        }
    }
    return null;
  }

  
  static set(crs) {
    const key = crs.getEpsgCode().replace(":", "").toUpperCase();
    CRS[key] = crs;
  }
}

CRS.defaultWKTs = {
  'EPSG:4490': 'GEOGCS["China Geodetic Coordinate System 2000",DATUM["China_2000",SPHEROID["CGCS2000",6378137,298.257222101,AUTHORITY["EPSG","1024"]],AUTHORITY["EPSG","1043"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4490"]]',
  'EPSG:4214': 'GEOGCS["Beijing 1954",DATUM["Beijing_1954",SPHEROID["Krassowsky 1940",6378245,298.3],TOWGS84[15.8,-154.4,-82.3,0,0,0,0]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4214"]]',
  'EPSG:4610': 'GEOGCS["Xian 1980",DATUM["Xian_1980",SPHEROID["IAG 1975",6378140,298.257,AUTHORITY["EPSG","7049"]],AUTHORITY["EPSG","6610"]],PRIMEM["Greenwich",0,AUTHORITY["EPSG","8901"]],UNIT["degree",0.0174532925199433,AUTHORITY["EPSG","9122"]],AUTHORITY["EPSG","4610"]]'
};
CRS.EPSG3857 = new CRS('EPSG:3857', [-20037508.3427892, -20037508.3427892, 20037508.3427892, 20037508.3427892]);
CRS.EPSG4326 = new CRS('EPSG:4326', [-180, -90, 180, 90]);

export default Map;
var maplibreglMock = { Map };
export { maplibreglMock, CRS };
