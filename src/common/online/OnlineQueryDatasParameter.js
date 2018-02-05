import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './OnlineResources';

/**
 * @class SuperMap.OnlineQueryDatasParameter
 * @classdesc myDatas服务资源查询参数
 * @category iPortal/Online
 * @param options -{Object} 查询参数
 */
export class OnlineQueryDatasParameter {
    constructor(options) {
        options = options || {};

        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.userNames -{Array<string>}
         * @description 数据作者名。可以根据数据作者名查询，默认查询全部。
         */
        this.userNames = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.types  -{Array<Object>}
         * @description  数据类型
         */
        this.types = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.fileName  -{string}
         * @description  文件名称。
         */
        this.fileName = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.serviceStatuses  -{string}
         * @description  服务发布状态。
         */
        this.serviceStatuses = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.serviceId  -{string}
         * @description  服务 id 。
         */
        this.serviceId = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.ids  -{Array<integer>}
         * @description  由数据项 id 组成的整型数组。
         */
        this.ids = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.keywords  -{Array<string>}
         * @description 关键字。
         */
        this.keywords = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.orderBy  -{string}
         * @description 排序字段。
         */
        this.orderBy = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.tags  -{Array<string>}
         * @description 数据的标签。
         */
        this.tags = null;
        /**
         * @member SuperMap.OnlineQueryDatasParameter.prototype.filterFields  -{Array<string>}
         * @description 用于关键字查询时的过滤字段。
         */
        this.filterFields = null;

        Util.extend(this, options)

        this.CLASS_NAME = "SuperMap.OnlineQueryDatasParameter";
    }


    /**
     * @function SuperMap.OnlineQueryDatasParameter.prototype.toJSON
     * @description 返回对应的json对象
     * @returns {Object} 对应的json对象
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

SuperMap.OnlineQueryDatasParameter = OnlineQueryDatasParameter;