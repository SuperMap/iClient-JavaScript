class SourceModel {
  constructor(options) {
    this.dataSource = options.dataSource;
    this.id = options.renderSource.id || options.id;
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
        this.visible = true;
        this.title = this.id;
      }
      this.children.push(layer);
      return;
    }
    this.renderLayers.push(...layer.renderLayers);
  }
}

export default SourceModel;
