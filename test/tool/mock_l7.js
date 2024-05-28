class Scene {
  constructor() {
    this.layerService = {
      renderLayer: () => {},
      stopAnimate: () => true,
      startAnimate: () => true
    };
    this.callbacks = {}
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
    callback()
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
  constructor() {
    this.animateStatus = false;
    this.layerModel = {
      spriteAnimate: false
    };
  }
  source() {
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
    return this;
  }
  hide() {
    return this;
  }
}
const PointLayer = Layer;
const GeometryLayer = Layer;
export { PointLayer, GeometryLayer, Scene, Mapbox, Maplibre };
