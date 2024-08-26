import '../core/Base';
import { L7LayerBase } from '@supermapgis/iclient-common/overlay/l7/L7LayerBase';
import * as L7 from './L7/l7-render';
import { Scene, Maplibre } from './L7/l7-render';
import { getL7Scene } from '@supermapgis/iclient-common/overlay/l7/util';
import maplibregl from 'maplibre-gl';
import { getL7Filter } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { featureFilter } from '@maplibre/maplibre-gl-style-spec';

/**
 * @class L7Layer
 * @category Visualization L7
 * @version 11.2.0
 * @classdesc L7Layer对接了@antv/L7的图层类型，能够通过maplibre-gl操作@antv/L7的图层。
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {string} options.type - @antv/L7的图层类型，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/pointlayer}。
 * @param {Object} options.options - @antv/L7图层的配置项，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/options}。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("l7_layer_") 创建图层 ID。
 * @usage
 */

export class L7Layer extends L7LayerBase {
  constructor(params) {
    const { type, options = {} } = params;
    super(params);
    if (type !== 'ThreeLayer') {
      this.l7layer = new L7[type]({ ...options, name: this.id });
      this.setDataFn = this.l7layer.setData.bind(this.l7layer);
    }
    this.overlay = true;
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

  onAdd(map) {
    this.map = map;
    if (!map.$l7scene) {
      const scene = getL7Scene(Scene, Maplibre, map);
      map.$l7scene = scene;
      scene.on('loaded', () => {
        this.addSceneLayer(scene);
      });
      return;
    }
    this.addSceneLayer(map.$l7scene);
  }

  _getL7Filter(filter) {
    return getL7Filter(filter, featureFilter);
  }

  queryRenderedFeatures(geometry, options, cb) {
    if (!this.l7layer || !this.l7layer.isVisible()) {
      return cb([]);
    }
    let box = geometry;
    if (geometry instanceof maplibregl.Point || typeof geometry[0] === 'number') {
      const point = maplibregl.Point.convert(geometry);
      // fix 两个点一样查出来的结果不对
      box = [point, [point.x - 1, point.y - 1]];
    }
    box = box.map((item) => {
      const point = maplibregl.Point.convert(item);
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

  _formateEvent(e) {
    return {
      ...e,
      originalEvent: e.target,
      target: this.map,
      point: maplibregl.Point.convert([e.x, e.y])
    };
  }
}
/**
 * @function getL7Scene
 * @category BaseTypes MapExtend
 * @version 11.2.0
 * @description 扩展maplibregl.Map， 获取@antv/L7的scene实例。使用方法： map.getL7Scene().then(scene => { console.log(scene) });
 * @returns {Promise} @antv/L7的scene实例。
 */
maplibregl.Map.prototype.getL7Scene = function () {
  return new Promise((resolve) => {
    if (this.$l7scene) {
      resolve(this.$l7scene);
      return;
    }
    const scene = getL7Scene(Scene, Maplibre, this);
    scene.on('loaded', () => {
      this.$l7scene = scene;
      resolve(scene);
    });
  });
};

export { L7 };
