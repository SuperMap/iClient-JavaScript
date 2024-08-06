import '../core/Base';
import { L7LayerBase } from '@supermapgis/iclient-common/overlay/l7/L7LayerBase';
import { getL7Scene } from '@supermapgis/iclient-common/overlay/l7/util';
import mapboxgl from 'mapbox-gl';
import * as L7 from './L7/l7-render';
import { Scene, Mapbox } from './L7/l7-render';
import { L7LayerUtil } from '@supermapgis/iclient-common/mapping/utils/L7LayerUtil';
import { featureFilter, expression } from '@mapbox/mapbox-gl-style-spec';
import spec from '@mapbox/mapbox-gl-style-spec/reference/v8';

const l7LayerUtil = L7LayerUtil({ featureFilter, expression, spec });

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

export class L7Layer extends L7LayerBase {
  constructor({ type, options = {} }) {
    super({ type, sourceId: options.source });
    if (type !== 'ThreeLayer') {
      this.l7layer = new L7[type]({ ...options, name: this.id });
      this.setDataFn = this.l7layer.setData.bind(this.l7layer);
    }
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

  _getL7Filter(filter, id) {
    return l7LayerUtil.getL7Filter(filter, id);
  }

  queryRenderedFeatures(geometry, options, cb) {
    if (!this.l7layer || !this.l7layer.isVisible()) {
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

  _formateEvent(e) {
    return {
      ...e,
      originalEvent: e.target,
      target: this.map,
      point: mapboxgl.Point.convert([e.x, e.y])
    };
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
      return;
    }
    const scene = getL7Scene(Scene, Mapbox, this);
    scene.on('loaded', () => {
      this.$l7scene = scene;
      resolve(scene);
    });
  });
};

export { L7 };
