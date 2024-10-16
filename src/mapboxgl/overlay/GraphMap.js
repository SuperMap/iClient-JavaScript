/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { KnowledgeGraphService } from '../services/KnowledgeGraphService';
import { KnowledgeGraph } from '@supermap/iclient-common/overlay/KnowledgeGraph';
import { transformExpandCollapseHiddenData } from '@supermap/iclient-common/overlay/knowledge-graph/format';
import mapboxgl from 'mapbox-gl';

/**
 * @class GraphMap
 * @classdesc 对接 iServer GraphMap。
 * @category iServer KnowledgeGraph
 * @version 11.1.0
 * @param {string} serverUrl - GraphMap服务地址， 例如：http://{iserver}/services/{knowledgeGraph-provider}/restjsr/graph/graphmaps/{graphmap}。
 * @param {Object} [options] - 参数。
 * @param {KnowledgeGraph.Config} [options.config] - KnowledgeGraph的配置项。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @fires GraphMap#loaded
 * @extends {mapboxgl.Evented}
 * @usage
 */
export class GraphMap extends mapboxgl.Evented {
  constructor(serverUrl, options) {
    super(serverUrl, options);
    /**
     * @member GraphMap.prototype.graph
     * @description KnowledgeGraph的实例.
     *
     */
    this.graph = null;
    /**
     * @member GraphMap.prototype.EVENT_TYPES
     * @description 监听一个自定义事件可用如下方式:
     *
     * 支持的事件如下:
     * loaded - 渲染完成时触发。
     */
    this.EVENT_TYPES = ['loaded'];
    const graphMapName = serverUrl.split('/').pop();
    this.url = serverUrl.replace(`/graphmaps/${graphMapName}`, '');
    this.createGraphMap(graphMapName, options);
  }

  /**
   * @private
   * @function GraphMap.prototype.createGraphMap
   * @description 创建图谱。
   * @param {string} graphMapName - 图谱名称
   * @param {Object} options - 参数。
   * @param {string} [options.proxy] - 服务代理地址。
   * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
   * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
   * @param {Object} [options.headers] - 请求头。
   * @param {KnowledgeGraph.Config} [options.config] - knowledgegrah配置项。
   */
  async createGraphMap(graphMapName, options) {
    this.knowledgeGraphService = this.createKnowledgeGraphService(this.url, options);
    const res = await this.knowledgeGraphService.getGraphMapData(graphMapName);
    const result = KnowledgeGraph.dataFromGraphMap(res.data, res.graphMap);
    this.graph = new KnowledgeGraph(options && options.config);
    this.graph.on('beforelayout', () => {
      /**
       * @event GraphMap#loaded
       * @description 渲染完成时触发。
       */
      this.fire(this.EVENT_TYPES[0]);
    });
    this.graph.setData(result);
    this.graph.handleNodeStatus(transformExpandCollapseHiddenData(res.graphMap));
  }

  /**
   * @private
   * @function GraphMap.prototype.createKnowledgeGraphService
   * @description 创建KnowledgeGraphService实例。
   * @param {string} serverUrl - GraphMap服务地址， 例如：http://{iserver}/services/knowledgeGraph-test/restjsr/graph
   * @param {Object} options - 参数。
   * @param {string} [options.proxy] - 服务代理地址。
   * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
   * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
   * @param {Object} [options.headers] - 请求头。
   */
  createKnowledgeGraphService(serverUrl, options) {
    return new KnowledgeGraphService(serverUrl, options);
  }
}
