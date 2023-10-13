import L7, { ThreeLayer } from './L7Extend';
import { Util as CommonUtil } from '../../commontypes/Util';

export class L7LayerBase {
  constructor({ type, options }) {
    this.type = 'custom';
    this.id = options && options.layerID ? options.layerID : CommonUtil.createUniqueID('l7Layer_');
    const _options = { ...(options || {}) };
    if (type === 'ThreeLayer') {
      this.l7layer = new ThreeLayer({ ..._options, name: this.id });
    } else {
      this.l7layer = new L7[type]({ ..._options, name: this.id });
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

  onAdd(map) {
    this.map = map;
    const scene = map.$l7scene;
    if (scene) {
      this.scene = scene;
      this.scene.addLayer(this.l7layer);
      // this.l7layer.hooks.beforeHighlight.tap('PixelPickingPlugin', () => {
      //   this.map.triggerRepaint();
      // });
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
      this.scene.layerService.renderLayer(this.l7layer.id);
      // console.log(this.l7layer.id, '---------customlayer render', counts);
      // const config = this.l7layer.getLayerConfig();
      // if (config && config.enableHighlight && config.pickedFeatureID !== null && config.pickedFeatureID > -1) {
      //   this.map.triggerRepaint();
      // }
      // console.log(this.l7layer.id, this.l7layer);
      if (this.l7layer.animateStatus || (this.l7layer.layerModel && this.l7layer.layerModel.spriteAnimate)) {
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
