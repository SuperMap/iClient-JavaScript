const Scene = () => {
  return {
    layerService: {
      renderLayer: () => {},
      stopAnimate: () => true,
      startAnimate: () => true
    },
    getLayer: () => true,
    addLayer: () => true,
    removeLayer: () => true,
    on: (type, callback) => {
      callback();
    }
  };
};
const Mapbox = ({ mapInstance }) => {
  return mapInstance;
};
const Maplibre = ({ mapInstance }) => {
  return mapInstance;
};
const Layer = () => {
  return {
    animateStatus: false,
    source() {
      return this;
    },
    style() {
      return this;
    },
    animate(arg) {
      this.animateStatus = arg;
      return this;
    },
    size() {
      return this;
    },
    color() {
      return this;
    },
    shape() {
      return this;
    },
    active() {
      return this;
    },
    show() {
      return this;
    },
    hide() {
      return this;
    }
  };
};
const PointLayer = Layer;
const GeometryLayer = Layer;
export { PointLayer, GeometryLayer, Scene, Mapbox, Maplibre };