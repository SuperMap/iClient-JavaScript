if (!Array.prototype.at) {
  Object.defineProperty(Array.prototype, 'at', {
    value: function at(index) {
      // 1. 让 O 成为 ToObject(this)
      if (this == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var O = Object(this);

      // 2. 让 len 成为 ToLength(O.length)
      var len = O.length >>> 0;

      // 3. 让 relativeIndex 成为 ToInteger(index)
      var relativeIndex = Math.trunc(index) || 0;

      // 如果参数是 NaN，Math.trunc(NaN) 是 NaN，NaN || 0 会将其变成 0
      // 这符合标准（规范中 ToIntegerOrInfinity(undefined) 结果为 0）

      // 4. 计算实际索引
      var k = relativeIndex >= 0 ? relativeIndex : len + relativeIndex;

      // 5. 边界检查：如果超出范围，返回 undefined
      if (k < 0 || k >= len) {
        return undefined;
      }

      // 6. 返回对应的属性值
      return O[k];
    },
    writable: true,
    configurable: true
  });
}
class Event {
  constructor() {
    this.stacks = {};
  }

  on(type, cb) {
    this.stacks[type] = this.stacks[type] || [];
    this.stacks[type].push(cb);
  }
  emit(type) {
    this.stacks[type]?.forEach((cb) => {
      cb();
    });
  }
}
const event = new Event();
class Scene {
  constructor() {
    this.layerService = {
      renderLayer: () => {},
      stopAnimate: () => true,
      startAnimate: () => true
    };
    this.callbacks = {};
    event.stacks = {};
  }
  removeAllLayer() {}
  getLayer() {
    return true;
  }
  addLayer() {
    setTimeout(() => {
      event.emit('re-render');
    }, 100);
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
    this.rawConfig = options;
    this.layerSource = {
      originData: { type: 'FeatureCollection', features: [] },
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
            geometry: { type: '', coordinates: [] }
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
    };
  }
  source(data, options = {}) {
    const parser = options.parser || { type: 'geojson' };
    let dataArray = [];
    if (parser.type === 'geojson') {
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
      originData: data.features ? data : { type: 'FeatureCollection', features: data },
      data: {
        dataArray: parser.type === 'geojson' ? data : []
      }
    };
    if (parser.type === 'mvt') {
      this.layerSource.tileset = {
        cacheTiles: this.rawConfig.name.includes('empty')
          ? new Map()
          : new Map([
              [
                '0',
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
    if (this.shape === 'sprite') {
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
    const sourceInfo = event;
    sourceInfo._data = this.layerSource.originData;
    sourceInfo.getData = () => this.layerSource.originData;
    sourceInfo.setData = this.setData;
    return sourceInfo;
  }
  setData(data) {
    this.layerSource.originData = data;
    this.getSource().emit('update');
  }

  on(type, cb) {
    event.on(type, cb);
  }

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
