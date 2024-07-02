class Scene {
  constructor() {
    this.layerService = {
      renderLayer: () => {},
      stopAnimate: () => true,
      startAnimate: () => true
    };
    this.callbacks = {};
  }
  removeAllLayer() {}
  getLayer() {
    return true;
  }
  addLayer() {
    return true;
  }
  removeLayer() {
    return true;
  }
  on(type, callback) {
    this.callbacks[type] = callback;
    callback();
  }
  emit(type) {
    this.callbacks[type]();
  }
  addMarkerLayer() {
    return true;
  }
  removeMarkerLayer() {
    return true;
  }
  addImage() {
    return true;
  }
  hasImage() {
    return false;
  }
}
const Mapbox = ({ mapInstance }) => {
  return mapInstance;
};
const Maplibre = ({ mapInstance }) => {
  return mapInstance;
};
class Layer {
  constructor(options) {
    this.animateStatus = false;
    this.layerModel = {
      spriteAnimate: false
    };
    this.stacks = {};
    this.rawConfig = options;
    this.layerSource = {
      originData: {type: 'FeatureCollection', features: []},
      data: {
        dataArray: []
      }
    };
  }
  source(data, options = {}) {
    const parser = options.parser || { type: "geojson" };
    this.layerSource = {
      ...options,
      parser,
      originData: data.features ? data : {type: 'FeatureCollection', features: data},
      data: {
        dataArray: parser.type === "geojson" ? data : []
      }
    };
    if (parser.type === "mvt") {
      this.layerSource.tileset = {
        cacheTiles: this.rawConfig.name.includes("empty")
          ? new Map()
          : new Map([
              [
                "0",
                {
                  data: {
                    vectorLayerCache: {
                      [options.sourceLayer]: [{ properties: {} }]
                    }
                  }
                }
              ]
            ])
      };
    }
    return this;
  }
  style() {
    return this;
  }
  animate(arg) {
    this.animateStatus = arg;
    return this;
  }
  size() {
    return this;
  }
  color() {
    return this;
  }
  texture() {
    return this;
  }
  filter() {
    return this;
  }
  shape(type) {
    this.shape = type;
    if (this.shape === "sprite") {
      this.layerModel = {
        spriteAnimate: true
      };
    }
    return this;
  }
  active() {
    return this;
  }
  show() {
    return this;
  }
  hide() {
    return this;
  }
  getSource() {
    const sourceInfo = {
      on: (type, cb) => {
        this.stacks[type] = [cb];
      },
      emit: type => {
        this.stacks[type].forEach(cb => {
          cb();
        });
      }
    };
    sourceInfo._data = this.layerSource.originData;
    sourceInfo.getData = () => this.layerSource.originData;
    sourceInfo.setData = this.setData;
    return sourceInfo;
  }
  setData(data) {
    this.layerSource.originData = data;
    this.getSource().emit("update");
  }

  on() {}

  once() {}

  off() {}

  boxSelect(bbox, cb) {
    if (this.layerSource.originData.features instanceof Array) {
      return cb(this.layerSource.originData.features);
    }
    if (!(this.layerSource.originData instanceof Array)) {
      return cb();
    }
    return cb(this.layerSource.originData);
  }
}
const PointLayer = Layer;
const GeometryLayer = Layer;
const HeatmapLayer = Layer;
export { PointLayer, GeometryLayer, HeatmapLayer, Scene, Mapbox, Maplibre };
