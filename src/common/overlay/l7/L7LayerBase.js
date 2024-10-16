import { Util as CommonUtil } from '../../commontypes/Util';
import { CustomOverlayLayer } from '../Base';

/**
 * @class L7LayerBase
 * @category Visualization L7
 * @version 11.2.1
 * @classdesc L7Layer对接了@antv/L7的图层类型，能够通过mapbox-gl操作@antv/L7的图层。
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {string} options.type - @antv/L7的图层类型，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/pointlayer}。
 * @param {Object} options.options - @antv/L7图层的配置项，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/options}。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("l7_layer_") 创建图层 ID。
 * @param {string} [options.source] - source ID。
 * @usage
 */

export class L7LayerBase extends CustomOverlayLayer {
  constructor({ type, options = {} }) {
    const id = options.layerID ? options.layerID : CommonUtil.createUniqueID('l7_layer_');
    const events = [
      'inited',
      'add',
      'remove',
      'legend:color',
      'legend:size',
      'click',
      'dblclick',
      'mousemove',
      'mouseover',
      'mouseout',
      'mouseup',
      'mousedown',
      'mouseenter',
      'mouseleave',
      'contextmenu',
      'dblclick',
      'unclick',
      'unmousemove',
      'unmouseup',
      'unmousedown',
      'uncontextmenu',
      'unpick',
      'touchstart',
      'touchend'
    ];
    super({ type, sourceId: options.source || id, query: true, interaction: true, events });
    this.id = id;
    this.eventListeners = {};
    this.selectedDatas = [];
    this.setSelectedDatasFn = this.setSelectedDatas.bind(this);
    this.reRenderFn = this.reRender.bind(this);
  }

  /**
   * @function L7LayerBase.prototype.getL7Layer
   * @description 获取@antv/L7的layer实例。
   * @returns {Object} @antv/L7的layer实例。
   */
  getL7Layer() {
    return this.l7layer;
  }

  /**
   * @function L7LayerBase.prototype.reRender
   * @description  当修改@antv/L7的layer的配置时，重新渲染。
   */
  reRender() {
    if (this.scene && this.scene.getLayer(this.l7layer.id)) {
      this.scene.layerService.renderLayer(this.l7layer.id);
    }
    this.map && this.map.triggerRepaint();
  }

  moveLayer(id, beforeId) {
    this.map.style.moveLayer(id, beforeId);
  }

  setVisibility(visibility) {
    if (this.animateStatus) {
      this.cancelAnimationFrame();
    }
    visibility ? this.l7layer.show() : this.l7layer.hide();
    this.map.style.setLayoutProperty(this.id, 'visibility', visibility ? 'visible' : 'none');
  }

  addSceneLayer(scene) {
    this.scene = scene;
    this.scene.addLayer(this.l7layer);
    this.updateSourceEffect();
  }

  updateSourceEffect() {
    const source = this.l7layer.getSource();
    source &&
      source.on('update', () => {
        this.reRender();
      });
  }

  getLayer() {
    if (!this.l7layer) {
      return;
    }
    const rawConfig = this.l7layer.rawConfig;
    const visibility = this.l7layer.isVisible() ? 'visible' : 'none';
    const layerInfo = {
      ...rawConfig,
      layout: { ...rawConfig.layout, visibility },
      minzoom: this.l7layer.minZoom,
      maxzoom: this.l7layer.maxZoom,
      id: this.id,
      l7layer: this.l7layer,
      scene: this.scene,
      setSelectedDatas: this.setSelectedDatasFn,
      reRender: this.reRenderFn,
      visibility
    };
    delete layerInfo.sourceId;
    delete layerInfo.layerID;
    delete layerInfo.minZoom;
    delete layerInfo.maxZoom;
    return layerInfo;
  }

  getFilter() {
    if (!this.l7layer) {
      return;
    }
    const { filter } = this.l7layer.rawConfig;
    let { field: filterFields = [], values } = this._getL7Filter(filter, this.id) || {};
    if (!filterFields.length && this.selectedDatas[0]) {
      filterFields = Object.keys(this.selectedDatas[0].properties || {});
    }
    const fields = filterFields;
    const transformFilterValuesFn = this._transformFilterValues.bind(this, {
      fields,
      values,
      selectedDatas: this.selectedDatas
    });
    return {
      field: fields,
      values: transformFilterValuesFn
    };
  }

  setFilter(filter) {
    if (!this.l7layer) {
      return;
    }
    if (!filter) {
      this.l7layer.filter(true);
      return;
    }
    if (filter instanceof Array) {
      const { field: filterFields, values: filterValues } = this._getL7Filter(filter);
      this.l7layer.filter(filterFields, filterValues);
      return;
    }
    this.l7layer.filter(filter.field, filter.values);
  }

  getPaintProperty(name) {
    if (!this.l7layer) {
      return;
    }
    const { paint = {} } = this.l7layer.rawConfig;
    return paint[name];
  }

  getLayoutProperty(name) {
    if (!this.l7layer) {
      return;
    }
    const { layout = {} } = this.l7layer.rawConfig;
    return layout[name];
  }

  // 目前只支持显示或隐藏图层操作
  setLayoutProperty(name, value) {
    if (name === 'visibility') {
      this.setVisibility(value === 'visible');
    }
  }

  getSource() {
    if (!this.l7layer) {
      return;
    }
    const layerSource = this.l7layer.layerSource;
    const { parser } = layerSource;
    const sourceInfo = {
      id: this.sourceId,
      type: parser.type,
      map: this.map
    };
    if (parser.extent) {
      sourceInfo.bounds = parser.extent;
    }
    let formatData = [];
    switch (parser.type) {
      case 'mvt':
        sourceInfo.type = 'vector';
        break;
      case 'geojson':
        sourceInfo._data = layerSource.originData;
        sourceInfo.getData = () => layerSource.originData;
        sourceInfo.setData = this.setDataFn;
        break;
      case 'json':
        formatData = (layerSource.originData || []).map((feature) => {
          return {
            type: 'Feature',
            geometry: {
              coordinates: [feature[parser.x], feature[parser.y]],
              type: 'Point'
            },
            properties: {
             ...feature
            }
          }
        });
        sourceInfo.getData = () => {
          return {
            type: 'FeatureCollection',
            features: formatData
          }
        };
        break;
    }
    return sourceInfo;
  }

  isSourceLoaded() {
    if (!this.l7layer) {
      return;
    }
    const layerSource = this.l7layer.layerSource;
    return !layerSource.tileset ? true : layerSource.tileset.isLoaded;
  }

  remove() {
    this.scene && this.scene.removeLayer(this.l7layer);
  }
  onRemove() {
    this.cancelAnimationFrame();
    this.scene && this.scene.removeLayer(this.l7layer);
  }
  cancelAnimationFrame() {
    this.requestAnimationFrameId && window.cancelAnimationFrame(this.requestAnimationFrameId);
    this.animateStatus = false;
  }
  render() {
    if (this.scene && this.scene.getLayer(this.l7layer.id)) {
      this.scene.layerService.renderLayer(this.l7layer.id);
      if (this.l7layer.animateStatus || (this.l7layer.layerModel && this.l7layer.layerModel.spriteAnimate)) {
        const requestAnimationFrame = () => {
          this.requestAnimationFrameId = window.requestAnimationFrame(requestAnimationFrame);
          this.map.triggerRepaint();
        };
        if (!this.animateStatus) {
          requestAnimationFrame();
          this.animateStatus = true;
        }
      }
    } else {
      this.cancelAnimationFrame();
    }
  }

  on(type, listener) {
    if (!this.l7layer) {
      return;
    }
    const _this = this;
    this.eventListeners[listener] = function (e) {
      listener(_this._formateEvent(e));
    };
    this.l7layer.on(this._formatListenType(type), this.eventListeners[listener]);
  }

  once(type, listener) {
    if (!this.l7layer) {
      return;
    }
    const _this = this;
    this.eventListeners[listener] = function (e) {
      listener(_this._formateEvent(e));
    };
    this.l7layer.once(this._formatListenType(type), this.eventListeners[listener]);
  }

  off(type, listener) {
    if (!this.l7layer) {
      return;
    }
    this.l7layer.off(this._formatListenType(type), this.eventListeners[listener]);
  }

  querySourceFeatures() {
    if (!this.l7layer || !this.l7layer.isVisible()) {
      return [];
    }
    const { layerSource, pickingService } = this.l7layer;
    let datas = pickingService.handleRawFeature(layerSource.data.dataArray, this.l7layer);
    const { parser: { type } } = layerSource;
    if (type === 'mvt') {
      const { tileset: { cacheTiles = [] } = {} } = layerSource;
      const { sourceLayer, featureId = 'id' } = this.l7layer.rawConfig;
      const mvtDatas = [];
      cacheTiles.forEach((sourceTile) => {
        const cacheFeatures = (sourceTile.data && sourceTile.data.vectorLayerCache[sourceLayer]) || [];
        const features = cacheFeatures.filter(
          (item) =>
            (!item[featureId] || !mvtDatas.some((feature) => feature[featureId] === item[featureId])) &&
            (!(item.properties || {})[featureId] ||
              !mvtDatas.some((feature) => feature.properties[featureId] === item.properties[featureId]))
        );
        mvtDatas.push(...pickingService.handleRawFeature(features, this.l7layer));
      });
      datas = datas.length > mvtDatas.length ? datas : mvtDatas;
    }
    if (!datas.length) {
      const cb = (result = []) => {
        datas = result;
      };
      const bounds = [
        [0, 0],
        [this.map.transform.width - 1, this.map.transform.height - 1] // -1 是解决报错问题
      ];
      this.queryRenderedFeatures(bounds, { layerCapture: false }, cb);
    }
    return datas;
  }

  setSelectedDatas(datas) {
    this.selectedDatas = datas instanceof Array ? datas : [datas];
  }

  _formatListenType(type) {
    switch (type) {
      case 'mouseover':
        return 'mouseenter';
      case 'mouseleave':
        return 'mouseout';
      default:
        return type;
    }
  }

  _transformFilterValues(options, ...args) {
    const { fields, values, selectedDatas } = options;
    const argValues = args.filter((item) => item !== void 0);
    const selectedValues = selectedDatas.map((feature) => {
      return fields.map((name) => (feature.properties || {})[name]).filter((item) => item !== void 0);
    });
    return (
      (!values || values(...args)) &&
      !selectedValues.some((values) => JSON.stringify(values) === JSON.stringify(argValues))
    );
  }
}
