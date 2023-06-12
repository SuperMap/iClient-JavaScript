/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @private
 * @class KnowledgeGraphNodeParameter
 * @deprecatedclass SuperMap.KnowledgeGraphNodeParameter
 * @classdesc 知识图谱实体的参数设置。
 * @category iServer KnowledgeGraph
 * @version 11.1.0
 * @param {Object} options - 参数。
 * @param {string} options.id - 实体id。
 * @param {Array.<string>} [options.labels] - 实体分类。
 * @param {Object} [options.properties] - 属性。
 * @usage
 */
// {
//   "id": 5348024557502471,
//   "properties": {
//     "server": "test1",
//     "labelfieldname": "FEATUREGUID",
//     "entityname": "院落",
//     "bindfindid": "院落@ST_YARDA@1",
//     "FEATUREGUID": "{409E615B-A545-4E07-872D-B12EDA0B4A1A}",
//     "findid": 1,
//     "ENTITYNAME": "公共管理与公共服务"
//   },
//   "labels": ["院落"]
// }
export class KnowledgeGraphNodeParameter {
  constructor(options) {
    /**
     * @member {string} KnowledgeGraphNodeParameter.prototype.id
     * @description 实体ID。
     */
    this.id = null;
    /**
     * @member {Array.<string>} KnowledgeGraphNodeParameter.prototype.labels
     * @description 实体分类。
     */
    this.labels = null;
    /**
     * @member {Object} KnowledgeGraphNodeParameter.prototype.properties
     * @description 实体属性。
     */
    this.properties = null;

    this.CLASS_NAME = 'SuperMap.KnowledgeGraphNodeParameter';
    Util.extend(this, options);
  }

  destroy() {
    var me = this;
    me.id = null;
    me.labels = null;
    me.properties = null;
  }
}
