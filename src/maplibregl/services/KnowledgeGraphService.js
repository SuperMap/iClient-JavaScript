/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import { KnowledgeGraphService as CommonKnowledgeGraphService } from '@supermap/iclient-common/iServer/KnowledgeGraphService';
/**
 * @class KnowledgeGraphService
 * @category  iServer KnowledgeGraph
 * @classdesc 知识图谱服务类。知识图谱是知识表示的一种形式，是由具有属性的实体通过关系链接而成的网状知识库。
 * 图谱数据和常规结构化表格数据相比，具有强大的数据描述能力，可以实现更快更高效的查询，更快更精准的数据关联性推理运算和隐藏关系的挖掘。
 * 提供方法：获取图谱图序列化数据、获取图谱列表、查询知识图谱数据、将 SuperMap iServer GraphMap 服务的数据格式转换为 KnowledgeGraph 的数据格式。
 * @version 11.1.0
 * @example
 * new KnowledgeGraphService(url)
 *  .query(param,function(result){
 *     //doSomething
 * })
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options -参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class KnowledgeGraphService extends ServiceBase {
  constructor(url, options) {
    super(url, options);
    this._knowledgeGraphService = new CommonKnowledgeGraphService(url, options);
  }

  /**
   * @function KnowledgeGraphService.prototype.query
   * @description 通过查询语句查询知识图谱数据。
   * @param {string} cypherQuery - 查询条件。
   * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  query(cypherQuery, callback) {
    return this._knowledgeGraphService.query(cypherQuery, callback);
  }

  // /**
  //  * @function KnowledgeGraphService.prototype.getMetaData
  //  * @description 获取元信息（展示所有实体类型和关系类型）。
  //  * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
  //  */
  // getMetaData(callback) {
  //   this._knowledgeGraphService.getMetaData(callback);
  // }

  /**
   * @function KnowledgeGraphService.prototype.getGraphMaps
   * @description 获取图谱列表。
   * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  getGraphMaps(callback) {
    return this._knowledgeGraphService.getGraphMaps(callback);
  }

  /**
   * @function KnowledgeGraphService.prototype.getGraphMap
   * @description 获取图谱图序列化数据。
   * @param {string} params 图谱名称。
   * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  getGraphMap(params, callback) {
    return this._knowledgeGraphService.getGraphMap(params, callback);
  }

  /**
   * @function KnowledgeGraphService.prototype.getGraphMapData
   * @description 将 SuperMap iServer GraphMap 服务的数据格式转换为 KnowledgeGraph 的数据格式。
   * @param {string} graphMapName - 图谱名称。
   * @returns {Promise} Promise 对象。
   */
  async getGraphMapData(graphMapName) {
    const res = await this._knowledgeGraphService.getGraphMapData(graphMapName);
    return res;
  }
}
