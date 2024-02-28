/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @private
 * @class KnowledgeGraphEdgeParameter
 * @deprecatedclass SuperMap.KnowledgeGraphEdgeParameter
 * @classdesc 知识图谱关系的参数设置。
 * @category iServer KnowledgeGraph
 * @version 11.1.0
 * @param {Object} options - 参数。
 * @param {string} options.id - 边id。
 * @param {string} options.start - 开始实体id。
 * @param {string} options.end - 结束实体id。
 * @param {string} [options.type] - 标签，关系。
 * @param {Object} [options.properties] - 属性。
 * @usage
 */
export class KnowledgeGraphEdgeParameter {
  constructor(options) {
    /**
     * @member {string} KnowledgeGraphEdgeParameter.prototype.id
     * @description 边id。
     */
    this.id = null;
    /**
     * @member {string} KnowledgeGraphEdgeParameter.prototype.start
     * @description 开始实体id。
     */
    this.start = null;
    /**
     * @member {string} KnowledgeGraphEdgeParameter.prototype.end
     * @description 结束实体id。
     */
    this.end = null;
    /**
     * @member {string} KnowledgeGraphEdgeParameter.prototype.type
     * @description 标签，关系。
     */
    this.type = null;
    /**
     * @member {Object} KnowledgeGraphEdgeParameter.prototype.properties
     * @description 实体属性。
     */
    this.properties = null;

    this.CLASS_NAME = 'SuperMap.KnowledgeGraphEdgeParameter';
    Util.extend(this, options);
  }

  destroy() {
    var me = this;
    me.id = null;
    me.start = null;
    me.end = null;
    me.type = null;
    me.properties = null;
  }
}
