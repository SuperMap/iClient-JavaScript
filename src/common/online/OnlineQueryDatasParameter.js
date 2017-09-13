import SuperMap from '../SuperMap';
import * as OnlineResources from './OnlineResources';

/**
 * @class SuperMap.OnlineQueryDatasParameter
 * @classdesc myDatas服务资源查询参数
 * @param options -{Object} 查询参数
 */
export default class OnlineQueryDatasParameter {

    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.userNames -{Array<string>}
     * @description 数据作者名。可以根据数据作者名查询，默认查询全部。
     */
    userNames = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.types  -{Array<Object>}
     * @description  数据类型
     */
    types = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.fileName  -{string}
     * @description  文件名称。
     */
    fileName = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.serviceStatuses  -{string}
     * @description  服务发布状态。
     */
    serviceStatuses = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.serviceId  -{string}
     * @description  服务 id 。
     */
    serviceId = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.ids  -{Array<integer>}
     * @description  由数据项 id 组成的整型数组。
     */
    ids = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.keywords  -{Array<string>}
     * @description 关键字。
     */
    keywords = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.orderBy  -{string}
     * @description 排序字段。
     */
    orderBy = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.tags  -{Array<string>}
     * @description 数据的标签。
     */
    tags = null;
    /**
     * @member SuperMap.OnlineQueryDatasParameter.prototype.filterFields  -{Array<string>}
     * @description 用于关键字查询时的过滤字段。
     */
    filterFields = null;

    constructor(options) {
        options = options || {};
        SuperMap.Util.extend(this, options)
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


    CLASS_NAME = "SuperMap.OnlineQueryDatasParameter"
}

SuperMap.OnlineQueryDatasParameter = OnlineQueryDatasParameter;