/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class KnowledgeGraphService
 * @category iServer KnowledgeGraph
 * @classdesc 知识图谱服务类。知识图谱是知识表示的一种形式，是由具有属性的实体通过关系链接而成的网状知识库。
 * 图谱数据和常规结构化表格数据相比，具有强大的数据描述能力，可以实现更快更高效的查询，更快更精准的数据关联性推理运算和隐藏关系的挖掘。
 * 提供方法：获取图谱图序列化数据、获取图谱列表、查询知识图谱数据、将 SuperMap iServer GraphMap 服务的数据格式转换为 KnowledgeGraph 的数据格式。
 * @version 11.1.0
 * @extends {ProcessingServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class KnowledgeGraphService extends CommonServiceBase {
  constructor(url, options) {
    super(url, options);
    this.options = options || {};
    this.CLASS_NAME = 'SuperMap.KnowledgeGraphService';
  }

  /**
   * @function KnowledgeGraphService.prototype.destroy
   * @override
   */
  destroy() {
    super.destroy();
  }

  /**
   * @function KnowledgeGraphService.prototype.getShortestPath
   * @description 获取开始节点和结束节点之间的最短路径。
   * @param {Object} params - {startID: 'xxx', endID: 'xxxx'}开始节点的id和结束节点id对象。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   */
  getShortestPath(params, callback) {
    const url = this.url + `/shortestPath.json?startID=${params.startID}&endID=${params.endID}`;
    this.processAsync({ url, method: 'GET', callback });
  }

  /**
   * @function KnowledgeGraphService.prototype.query
   * @description 通过查询语句查询知识图谱数据。
   * @param {string} params - 查询条件。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   */
  query(params, callback) {
    const paramKey = 'cypherQuery';
    const url = Util.urlAppend(this.url + '/query.json', `${paramKey}=${encodeURI(params)}`);
    this.processAsync({ url, method: 'GET', callback });
  }

  // /**
  //  * @function KnowledgeGraphService.prototype.queryById
  //  * @description 根据实体id查询关联节点。
  //  * @param {string} id - 实体id。
  //  * @param {RequestCallback} callback 回调函数。
  //  */
  // queryById(id, callback) {
  //   const paramKey = 'cypherQuery';
  //   const url = Util.urlAppend(this.url + '/query.json', `${paramKey}=match p=(n)-[]-(m) where id(n)=${id} return p;`);
  //   this.processAsync({ url, method: 'GET', callback });
  // }

  // /**
  //  * @function KnowledgeGraphService.prototype.getMetaData
  //  * @description 获取元信息（展示所有实体类型和关系类型。）
  //  * @param {RequestCallback} callback 回调函数。
  //  */
  // getMetaData(callback) {
  //   const url = this.url + 'management/metadata.json';
  //   this.processAsync({ url, method: 'GET', callback });
  // }

  /**
   * @function KnowledgeGraphService.prototype.getGraphMaps
   * @description 获取图谱列表。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   */
  getGraphMaps(callback) {
    const url = this.url + '/graphmaps.json';
    this.processAsync({ url, method: 'GET', callback });
  }

  /**
   * @function KnowledgeGraphService.prototype.getGraphMap
   * @description 获取图谱图序列化数据。
   * @param {string} graphMapName 图谱名称。
   * @param {RequestCallback} callback 回调函数。
   */
  getGraphMap(graphMapName, callback) {
    const url = this.url + `/graphmaps/${graphMapName}.json`;
    this.processAsync({ url, method: 'GET', callback });
  }

  /**
   * @function KnowledgeGraphService.prototype.getGraphMapData
   * @description 将 SuperMap iServer GraphMap 服务的数据格式转换为 KnowledgeGraph 的数据格式。
   * @param {string} graphMapName - 图谱名称。
   * @returns {Promise} Promise 对象。
   */
  async getGraphMapData(graphMapName) {
    let data = [];
    const graphMap = await this._getGraphMapData(graphMapName);
    if (!graphMap) {
      return;
    }
    const query = (graphMap.dataContent.queries && graphMap.dataContent.queries.query) || [];
    let queries = [];
    if (typeof query === 'string') {
      queries = [query];
    } else {
      queries = query;
    }
    const expandQueries = this._getGraphMapExpandQuery(graphMap);
    if (expandQueries.length) {
      queries.push(...expandQueries);
    }
    for (let j = 0; j < queries.length; j++) {
      const cypherQuery = queries[j];
      const res = await this._queryDataBySql(cypherQuery);
      data = data.concat([], res);
    }
    return { data, graphMap };
  }

  /**
   * @private
   * @function KnowledgeGraphService.prototype._getGraphMapExpandQuery
   * @description 获取 GraphMap 图谱展开节点的 query 条件。
   * @param {Object} graphMap -将 iServer GraphMap 图谱服务的数据。
   * @param {Array.<string>} 查询条件。
   */
  _getGraphMapExpandQuery(graphMap) {
    const queries = [];
    const expandIds = (graphMap.dataContent.expand && JSON.parse(graphMap.dataContent.expand)) || [];
    expandIds.forEach((id) => {
      queries.push(`match p=(n)-[]-(m) where id(n)=${id} return p;`);
    });
    return queries;
  }

  // /**
  //  * @private
  //  * @function KnowledgeGraphService.prototype.getEntities
  //  * @description 获取实体。
  //  * @param {Object} params - 查询条件。{type:'院落', count:1}
  //  * @param {number} [params.count] - 返回个数
  //  * @param {RequestCallback} callback 回调函数
  //  */
  // getEntities(params, callback) {
  //   const url = Util.urlAppend(this.url + '/entities.json', params);
  //   this.processAsync({ url, params, method: 'GET', callback });
  // }

  // /**
  //  * @private
  //  * @function KnowledgeGraphService.prototype.getEdges
  //  * @description 获取实体。
  //  * @param {Object} params - 查询条件。{type:'院落', count:1}
  //  * @param {number} [params.count] - 返回个数
  //  * @param {RequestCallback} callback 回调函数
  //  */
  // getEdges(params, callback) {
  //   const url = Util.urlAppend(this.url + '/edges.json', params);
  //   this.processAsync({ url, params, method: 'GET', callback });
  // }

  // /**
  //  * @private
  //  * @function KnowledgeGraphService.prototype.getEntities
  //  * @description 获取实体。
  //  * @param {number} id - 查询条件。{type:'院落', count:1}
  //  * @param {RequestCallback} callback 回调函数
  //  */
  // deleteEntitiy(id, callback) {
  //   const url = Util.urlAppend(this.url + '/entities.json', `id=${id}`);
  //   this.processAsync({ url, method: 'DELETE', callback });
  // }

  // /**
  //  * @private
  //  * @function KnowledgeGraphService.prototype.addNode
  //  * @description 获取实体。
  //  * @param {Object} params - 查询条件
  //  * @param {number} [params.count] - 返回个数
  //  * @param {RequestCallback} callback 回调函数
  //  */
  // addNode(params, callback) {
  //   if (!(params instanceof KnowledgeGraphNodeParameter)) {
  //     return;
  //   }
  //   const url = Util.urlAppend(this.url + '/entities.json', params);
  //   this.processAsync({ url, params, method: 'PUT', callback });
  // }

  // /**
  //  * @private
  //  * @function KnowledgeGraphService.prototype.addEdge
  //  * @description 获取实体。
  //  * @param {Object} params - 查询条件
  //  * @param {number} [params.count] - 返回个数
  //  * @param {RequestCallback} callback 回调函数
  //  */
  // addEdge(params, callback) {
  //   if (!(params instanceof KnowledgeGraphEdgeParameter)) {
  //     return;
  //   }
  //   const url = Util.urlAppend(this.url + '/edges.json', params);
  //   this.processAsync({ url, params, method: 'PUT', callback });
  // }
  /**
   * @function KnowledgeGraphService.prototype.processAsync
   * @description 负责将客户端的动态分段服务参数传递到服务端。
   * @param {string} url - 服务地址。
   * @param {Object} params - 参数。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */

  processAsync({ url, params, method, callback }) {
    const requestParams = {
      method,
      url,
      scope: this,
      success: callback,
      failure: callback
    };
    if (params) {
      requestParams.params = params;
    }
    return this.request(requestParams);
  }
  /**
   * @private
   * @function _getGraphMapData
   * @description 获取图谱信息。
   * @param {string} graphMapName - 图谱名称。
   * @returns {Promise} Promise 对象。
   */
  _getGraphMapData(graphMapName) {
    return new Promise((resolve, reject) => {
      this.getGraphMap(graphMapName, (res) => {
        if (res.type === 'processFailed') {
          reject(res.error);
        } else {
          if (res.result.data === '') {
            reject('无数据');
          } else {
            resolve(res.result.graphMap);
          }
        }
      });
    });
  }

  /**
   * @private
   * @function _queryDataBySql
   * @description 查询实体和关系数据。
   * @param {string} cypherQuery - 查询语句。
   * @returns {Promise} Promise 对象。
   */
  _queryDataBySql(cypherQuery) {
    return new Promise((resolve, reject) => {
      this.query(cypherQuery, (res) => {
        if (res.type === 'processFailed') {
          reject(res.error);
        } else {
          resolve(res.result);
        }
      });
    });
  }
}
