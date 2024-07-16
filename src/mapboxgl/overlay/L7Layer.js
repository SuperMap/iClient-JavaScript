import '../core/Base';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { getL7Scene } from '@supermap/iclient-common/overlay/l7/util';
import mapboxgl from 'mapbox-gl';
import * as L7 from './L7/l7-render';
import { Scene, Mapbox } from './L7/l7-render';
import { CustomOverlayLayer } from './Base';
import { getL7Filter } from '../mapping/utils/L7LayerUtil';

/**
 * @class L7Layer
 * @category Visualization L7
 * @version 11.2.0
 * @classdesc L7Layer对接了@antv/L7的图层类型，能够通过mapbox-gl操作@antv/L7的图层。
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {string} options.type - @antv/L7的图层类型，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/pointlayer}。
 * @param {Object} options.options - @antv/L7图层的配置项，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/options}。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("l7_layer_") 创建图层 ID。
 * @param {string} [options.source] - source ID。
 * @usage
 */

export class L7Layer extends CustomOverlayLayer {
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
    super({ sourceId: options.source || id, query: true, interaction: true, events });
    this.id = id;
    if (type !== 'ThreeLayer') {
      this.l7layer = new L7[type]({ ...options, name: this.id });
      this.setDataFn = this.l7layer.setData.bind(this.l7layer);
    }
    this.eventListeners = {};
    this.selectedDatas = [];
    this.setSelectedDatasFn = this.setSelectedDatas.bind(this);
    this.reRenderFn = this.reRender.bind(this);
  }
  /**
   * @function L7Layer.prototype.getL7Layer
   * @description 获取@antv/L7的layer实例。
   * @returns {Object} @antv/L7的layer实例。
   */
  getL7Layer() {
    return this.l7layer;
  }

  /**
   * @function L7Layer.prototype.reRender
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
    const layerInfo = {
      ...rawConfig,
      layout: { ...rawConfig.layout, visibility: rawConfig.visible ? 'visible' : 'none' },
      minzoom: this.l7layer.minZoom,
      maxzoom: this.l7layer.maxZoom,
      id: this.id,
      l7layer: this.l7layer,
      scene: this.scene,
      setSelectedDatas: this.setSelectedDatasFn,
      reRender: this.reRenderFn
    };
    delete layerInfo.sourceId;
    delete layerInfo.layerID;
    delete layerInfo.minZoom;
    delete layerInfo.maxZoom;
    return layerInfo;
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

  getFilter() {
    if (!this.l7layer) {
      return;
    }
    const { filter } = this.l7layer.rawConfig;
    let { field: filterFields = [], values } = getL7Filter(filter, this.id) || {};
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
      const { field: filterFields, values: filterValues } = getL7Filter(filter);
      this.l7layer.filter(filterFields, filterValues);
      return;
    }
    this.l7layer.filter(filter.field, filter.values);
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
    switch (parser.type) {
      case 'mvt':
        sourceInfo.type = 'vector';
        break;
      case 'geojson':
        sourceInfo._data = layerSource.originData;
        sourceInfo.getData = () => layerSource.originData;
        sourceInfo.setData = this.setDataFn;
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


  onAdd(map) {
    this.map = map;
    if (!map.$l7scene) {
      const scene = getL7Scene(Scene, Mapbox, map);
      map.$l7scene = scene;
      scene.on('loaded', () => {
        this.addSceneLayer(scene);
      });
      return;
    }
    this.addSceneLayer(map.$l7scene);
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

  queryRenderedFeatures(geometry, options, cb) {
    if (!this.l7layer || !this.l7layer.rawConfig.visible) {
      return cb([]);
    }
    let box = geometry;
    if (geometry instanceof mapboxgl.Point || typeof geometry[0] === 'number') {
      const point = mapboxgl.Point.convert(geometry);
      // fix 两个点一样查出来的结果不对
      box = [point, [point.x - 1, point.y - 1]];
    }
    box = box.map((item) => {
      const point = mapboxgl.Point.convert(item);
      return [point.x, point.y];
    });
    const [x1, y1, x2, y2] = box.flat();
    const _this = this;
    this.l7layer.boxSelect([Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)], (features) => {
      const nextFeatures = features || [];
      const { layerCapture = true } = options || {};
      if (layerCapture) {
        cb(
          nextFeatures.map((item) => {
            return {
              ...item,
              layer: _this.getLayer()
            };
          })
        );
        return;
      }
      cb(nextFeatures);
    });
  }

  querySourceFeatures() {
    if (!this.l7layer || !this.l7layer.rawConfig.visible) {
      return [];
    }
    const { layerSource, pickingService } = this.l7layer;
    let datas = pickingService.handleRawFeature(layerSource.data.dataArray);
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
        mvtDatas.push(...pickingService.handleRawFeature(features));
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

  _formateEvent(e) {
    return {
      ...e,
      originalEvent: e.target,
      target: this.map,
      point: mapboxgl.Point.convert([e.x, e.y])
    };
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

/**
 * @function getL7Scene
 * @category BaseTypes MapExtend
 * @version 11.2.0
 * @description 扩展mapboxgl.Map， 获取@antv/L7的scene实例。使用方法： map.getL7Scene().then(scene => { console.log(scene) });
 * @returns {Promise} @antv/L7的scene实例。
 */
mapboxgl.Map.prototype.getL7Scene = function () {
  return new Promise((resolve) => {
    if (this.$l7scene) {
      resolve(this.$l7scene);
      return this.$l7scene;
    }
    const scene = getL7Scene(Scene, Mapbox, this);
    scene.on('loaded', () => {
      this.$l7scene = scene;
      resolve(scene);
      return scene;
    });
  });
};

export { L7 };
