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
    this.pickingService = {
      handleRawFeature: function (rawFeature) {
        rawFeature = rawFeature instanceof Array ? rawFeature : [rawFeature];
        const res = rawFeature.map((item) => {
          if (item === 'null') {
            return item;
          }
          if (item.type === 'Feature') {
            return item;
          }
          const newFeature = {
            properties: {},
            geometry: { type: '', coordinates: [] },
          };
          const coordinates = item.coordinates;
          delete item.coordinates;
          newFeature.properties = item;
          if (coordinates) {
            newFeature.geometry = { type: '', coordinates };
          }
          return newFeature;
        });
        return res;
      }
    }
  }
  source(data, options = {}) {
    const parser = options.parser || { type: "geojson" };
    let dataArray = [];
    if (parser.type === "geojson") {
      dataArray = data;
    }
    if (parser.type === 'json') {
      dataArray = [
        {
          航班有效期结束: 2016.11,
          到达城市: '北京',
          smpid: 1,
          coordinates: [
            [80.30091874, 41.26940127],
            [116.395645, 39.92998578]
          ]
        }
      ];
    }
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
            ]),
        isLoaded: false
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
  filter(field, values) {
    if (typeof values === 'function') {
      values([]);
    }
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
    this.rawConfig.visible = true;
    return this;
  }
  hide() {
    this.rawConfig.visible = false;
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

  isVisible() {
    return this.rawConfig.visible !== false;
  }
}
const PointLayer = Layer;
const GeometryLayer = Layer;
const HeatmapLayer = Layer;
export { PointLayer, GeometryLayer, HeatmapLayer, Scene, Mapbox, Maplibre };
