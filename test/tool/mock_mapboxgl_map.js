import mapboxgl from 'mapbox-gl';
class VectorTileSource {
  constructor(id, options) {
    this.id = id;
    this.options = options;
  }
  async beforeLoad() {}
}
mapboxgl.VectorTileSource = VectorTileSource;

const defaultOptions = {
  doubleClickZoom: true
};

function functor(x) {
  return function () {
    return x;
  };
}

const Map = function (options) {
  const evented = new mapboxgl.Evented();
  this.on = evented.on;
  this.fire = evented.fire;
  this.listens = evented.listens;

  this.options = options;
  this._events = {};
  this._sources = {};
  this._collectResourceTiming = !!this.options.collectResourceTiming;
  this.zoom = this.options.zoom || 0;
  this._container = this.options.container || 'map';
  this._layers = {};
  this.style = {};
  this.getContainer = function () {
    return this._container;
  };
  this.bounds = this.options.bounds;

  try {
    this.center = this.options.center
      ? new mapboxgl.LngLat(this.options.center.lng, this.options.center.lat)
      : new mapboxgl.LngLat(0, 0);
  } catch (e) {
    this.center = this.options.center
      ? new mapboxgl.LngLat(this.options.center[0], this.options.center[1])
      : new mapboxgl.LngLat(0, 0);
  }
  this.resize = function () {};
  this.style = options.style;
  this.setStyle = function (style, options) {
    if (style.layers) {
      for (let i = 0, list = style.layers; i < list.length; i += 1) {
        const layer = list[i];
        this._layers[layer.id] = list[i];
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

  this.addControl = function (control) {
    control.onAdd(this);
  };

  this.getStyle = function () {
    return {
      version: 8,
      source: this._sources,
      layers: Object.values(this._layers)
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
    this._sources[name];
    if (this._sources[name].type === 'video') {
      return {
        play: function () {}
      };
    }
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
    if (layer.onAdd) {
      layer.onAdd(this);
    }
    if (layer.render) {
      layer.render();
    }
    return this;
  };

  this.addStyle = function (style, before) {
    return style;
  };

  this.removeLayer = function (layerId) {};
  this.moveLayer = function (layerId) {};
  this.getFilter = function (layerId) {};
  this.setFilter = function (layerId, filter) {};
  this.getLayer = function (id) {
    return this._layers[id];
  };
  this.getBounds = function () {
    return (
      this.bounds ||
      mapboxgl.LngLatBounds.convert([
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
      this.center = new mapboxgl.LngLat(x[0], x[1]);
    } else if (x instanceof Object) {
      this.center = new mapboxgl.LngLat(x.lng, x.lat);
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

  this.project = function () {
    return {
      x: 500,
      y: 300
    };
  };
  this.unproject = function (point) {
    return new mapboxgl.LngLat(-73.9876, 40.7661);
  };

  this.queryRenderedFeatures = function (pointOrBox, queryParams) {
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
    return {
      getExtent: () => jest.fn()
    };
  };
  this.setCRS = () => {};
  this.flyTo = (options) => {};
  this.setRenderWorldCopies = (epsgCode) => {};
  this.triggerRepaint = () => {};
  setTimeout(() => {
    this.fire('load');
  }, 0);
};

export default Map;
var mapboxglMock = { Map };
export { mapboxglMock };
