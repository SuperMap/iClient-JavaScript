import '../core/Base';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { getL7Scene } from '@supermap/iclient-common/overlay/l7/util';
import mapboxgl from 'mapbox-gl';
import * as L7 from './L7/l7-render';
import { Scene, Mapbox } from './L7/l7-render';

/**
 * @class L7Layer
 * @category Visualization L7
 * @version 11.2.0
 * @classdesc L7Layer对接了@antv/L7的图层类型，能够通过mapbox-gl操作@antv/L7的图层。
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {string} options.type - @antv/L7的图层类型，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/pointlayer}。
 * @param {Object} options.options - @antv/L7图层的配置项，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/options}。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("l7_layer_") 创建图层 ID。
 * @usage
 */

export class L7Layer {
  constructor({ type, options }) {
    this.preBuild();
    this.type = 'custom';
    this.id = options && options.layerID ? options.layerID : CommonUtil.createUniqueID('l7_layer_');
    const _options = { ...(options || {}) };
    if (type !== 'ThreeLayer') {
      this.l7layer = new L7[type]({ ..._options, name: this.id });
    }
    this.overlay = true;
  }
  preBuild() {
    if (!mapboxgl.Map.prototype.mapExtendAddLayerBak) {
      mapboxgl.Map.prototype.mapExtendAddLayerBak = mapboxgl.Map.prototype.addLayer;
      mapboxgl.Map.prototype.addLayer = function (layer, before) {
        if(!mapboxgl.Map.prototype.$l7scene) {
          mapboxgl.Map.prototype.$l7scene = getL7Scene(Scene, Mapbox, this);
        }
        this.mapExtendAddLayerBak(layer, before);
        return this;
      };
    }
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
    visibility ? this.l7layer.show() : this.l7layer.hide();
    this.map.style.setLayoutProperty(this.id, 'visibility', visibility ? 'visible' : 'none');
  }

  onAdd(map) {
    this.map = map;
    const scene = map.$l7scene;
    if (scene) {
      this.scene = scene;
      this.scene.addLayer(this.l7layer);
    }
  }
  remove() {
    this.scene && this.scene.removeLayer(this.l7layer);
  }
  onRemove() {
    this.scene && this.scene.layerService.stopAnimate();
    this.scene && this.scene.removeLayer(this.l7layer);
  }

  render() {
    if (this.scene && this.scene.getLayer(this.l7layer.id)) {
      if (this.l7layer.animateStatus || (this.l7layer.layerModel && this.l7layer.layerModel.spriteAnimate)) {
        this.scene.layerService.startAnimate(this.l7layer.id);
        this.map.triggerRepaint();
      } else {
        this.scene.layerService.renderLayer(this.l7layer.id);
      }
    }
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
    if (mapboxgl.Map.prototype.$l7scene) {
      resolve(mapboxgl.Map.prototype.$l7scene);
      return mapboxgl.Map.prototype.$l7scene;
    }
    const scene = getL7Scene(Scene, Mapbox, this);
    scene.on('loaded', () => {
      mapboxgl.Map.prototype.$l7scene = scene;
      resolve(scene);
      return scene;
    });
  });
};
