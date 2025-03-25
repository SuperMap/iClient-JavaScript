class SourceModel {
  constructor(options) {
    this.dataSource = options.dataSource;
    this.id = options.id;
    this.title = options.title;
    this.renderSource = options.renderSource;
    this.renderLayers = [];
    this.type = options.type;
    this.themeSetting = options.themeSetting;
    this.visible = options.visible;
  }

  addLayer(layer) {
    if (layer.renderSource.sourceLayer) {
      if (!this.children) {
        this.children = [];
        this.type = 'group';
        this.renderSource = {};
        this.dataSource = {};
        this.themeSetting = {};
      }
      if (layer.visible || this.visible) {
        this.visible = true;
      } else {
        this.visible = false;
      }
      this.children.push(layer);
      return;
    }
    this.renderLayers.push(...layer.renderLayers);
    if (layer.reused) {
      this.reused = layer.reused;
    }
    if (layer.layerOrder) {
      this.layerOrder = layer.layerOrder;
    }
  }
}

export default SourceModel;
