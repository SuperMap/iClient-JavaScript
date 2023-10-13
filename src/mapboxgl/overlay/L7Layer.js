import '../core/Base';
import { L7LayerBase } from '@supermap/iclient-common/overlay/l7/L7LayerBase';

/**
 * @class L7Layer
 * @category Visualization L7
 * @classdesc L7Layer对接了@antv/L7的图层类型，能够通过mapbox-gl操作@antv/L7的图层。
 * @param {Object} options -  图层配置项，包括以下参数：
 * @param {string} options.type - @antv/L7的图层类型，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/pointlayer}。
 * @param {Object} options.options - @antv/L7图层的配置项，详情参见: {@link https://l7.antv.antgroup.com/api/point_layer/options}。
 * @param {string} [options.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("l7Layer_") 创建图层 ID。
 * @usage
 */
export class L7Layer extends L7LayerBase {
  constructor(options) {
    super(options);
  }
}