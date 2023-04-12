import '../core/Base';
import L7 from './L7Extend';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';

/**
 * @class L7Layer
 * @category Visualization L7
 * @classdesc L7Layer对接了@antv/L7的图层类型，能够通过maplibre操作@antv/L7的图层。
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {string} options.type - @antv/L7的图层类型，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/pointlayer}。
 * @param {Object} options.options - @antv/L7图层的配置项，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/options}。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("l7Layer_") 创建图层 ID。
 * @usage
 */
// 包括点图层PointLayer、线图层LineLayer、面图层 PolygonLayer、热力图层 HeatMapLayer、图片图层 ImageLayer、
//  * 掩模图层 MaskLayer、栅格图层 RasterLayer、瓦片图层 TileLayer和其他图层,
class L7Layer {
  constructor({ type, options }) {
    this.type = 'custom';
    this.id = options && options.layerID ? options.layerID : CommonUtil.createUniqueID('l7Layer_');
    this.l7layer = new L7[type]({ ...(options || {}), name: this.id });
  }
  /**
   * @function L7Layer.prototype.getL7Layer
   * @description  获取@antv/L7的layer实例。
   * @returns {Object} @antv/L7的layer实例。
   */
  getL7Layer() {
    return this.l7layer;
  }

  /**
   * @function L7Layer.prototype.getScene
   * @description 获取@antv/L7的scene实例, 需要在map.addLayer()之后调用。
   * @returns {Object} @antv/L7的scene实例。
   */
  getScene() {
    return this.scene;
  }

  onAdd(map) {
    this.map = map;
    const scene = map.$scene;
    if (scene) {
      this.scene = scene;
      this.scene.addLayer(this.l7layer);
      // if (scene.loaded) {
      //   this.scene.addLayer(this.l7layer);
      // } else {
      //   scene.on('load', () => {
      //     this.scene.addLayer(this.l7layer);
      //   });
      // }
    }
  }
  onRemove() {
    // this.l7layer && this.l7layer.stopAnimate();
    this.scene && this.scene.layerService.stopAnimate();
    this.scene && this.scene.removeLayer(this.l7layer);
  }
  render() {
    if (this.scene && this.scene.getLayer(this.l7layer.id)) {
      this.scene.layerService.renderLayer(this.l7layer.id);
      if (this.l7layer.aniamateStatus || (this.l7layer.getLayerConfig().enableHighlight)) {
        if (!this.l7layer.hasOwnProperty('threeRenderService')) {
          this.scene.layerService.stopAnimate();
        }
        this.scene.layerService.startAnimate(this.l7layer.id);
        this.map.triggerRepaint();
      }
    }
  }
}

// function L7Layers({ type, options }) {
//   const layer = new L7Layer({ type, options });
//   const obj = new Proxy(layer, {
//     get: function (target, propKey, receiver) {
//       console.log(`getting ${propKey}!`);
//       return Reflect.get(target, propKey, receiver);
//     },
//     set: function (target, propKey, value, receiver) {
//       console.log(`setting ${propKey}!`);
//       return Reflect.set(target, propKey, value, receiver);
//     },
//     apply: function (target, propKey, value, receiver) {
//       console.log(`apply ${propKey}!`);
//       return Reflect.apply(target, propKey, value, receiver);
//     }
//   });
//   return obj;
// }
// function proxy(target, prop) {

// }
export { L7Layer };
