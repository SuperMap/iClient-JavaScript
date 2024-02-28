/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import './OnlineResources';

/**
 * @class OnlineQueryDatasParameter
 * @deprecatedclass SuperMap.OnlineQueryDatasParameter
 * @classdesc myDatas 服务资源查询参数。
 * @category iPortal/Online Resources Data
 * @param {Object} options - 参数。
 * @usage
 */
export class OnlineQueryDatasParameter {
    constructor(options) {
        options = options || {};

        /**
         * @member {Array.<string>} OnlineQueryDatasParameter.prototype.userNames
         * @description 数据作者名。可以根据数据作者名查询，默认查询全部。
         */
        this.userNames = null;
        /**
         * @member {Array.<Object>} OnlineQueryDatasParameter.prototype.types
         * @description  数据类型。
         */
        this.types = null;
        /**
         * @member {string} OnlineQueryDatasParameter.prototype.fileName
         * @description  文件名称。
         */
        this.fileName = null;
        /**
         * @member {string} OnlineQueryDatasParameter.prototype.serviceStatuses
         * @description  服务发布状态。
         */
        this.serviceStatuses = null;
        /**
         * @member {string} OnlineQueryDatasParameter.prototype.serviceId
         * @description  服务 ID。
         */
        this.serviceId = null;
        /**
         * @member {Array.<number>} OnlineQueryDatasParameter.prototype.ids
         * @description  由数据项 ID 组成的整型数组。
         */
        this.ids = null;
        /**
         * @member {Array.<string>} OnlineQueryDatasParameter.prototype.keywords
         * @description 关键字。
         */
        this.keywords = null;
        /**
         * @member {string} OnlineQueryDatasParameter.prototype.orderBy
         * @description 排序字段。
         */
        this.orderBy = null;
        /**
         * @member {Array.<string>} OnlineQueryDatasParameter.prototype.tags
         * @description 数据的标签。
         */
        this.tags = null;
        /**
         * @member {Array.<string>} OnlineQueryDatasParameter.prototype.filterFields
         * @description 用于关键字查询时的过滤字段。
         */
        this.filterFields = null;

        Util.extend(this, options)

        this.CLASS_NAME = "SuperMap.OnlineQueryDatasParameter";
    }


    /**
     * @function OnlineQueryDatasParameter.prototype.toJSON
     * @description 返回对应的 JSON 对象。
     * @returns {Object} 对应的 JSON 对象。
     */
    toJSON() {
        var me = this;
        var jsonObj = {
            "types": me.types,
            "fileName": me.fileName,
            "serviceStatuses": me.serviceStatuses,
            "serviceId": me.serviceId,
            "ids": me.ids,
            "keywords": me.keywords,
            "orderBy": me.orderBy,
            "tags": me.tags,
            "filterFields": me.filterFields
        };
        for (var key in jsonObj) {
            if (jsonObj[key] == null) {
                delete jsonObj[key]
            }
        }
        return jsonObj;
    }

}
