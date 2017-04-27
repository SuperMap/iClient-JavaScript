/**
 * Class:SuperMap.OnlineQueryDatasParameter
 *  myDatas服务资源查询参数
 */
require('./OnlineResources');
var SuperMap = require('../SuperMap');
SuperMap.OnlineQueryDatasParameter = SuperMap.Class({

    //String[]    数据作者名。可以根据数据作者名查询，默认查询全部。
    userNames: null,
    //DataItemType[]    数据类型
    types: null,
    //String    文件名称。
    fileName: null,
    //ServiceStatus[]    服务发布状态。
    serviceStatuses: null,
    // String	服务 id 。
    serviceId: null,
    //Integer[] 由数据项 id 组成的整型数组。
    ids: null,
    //String[]  	关键字。
    keywords: null,
    //DataItemOrderBy    排序字段。
    orderBy: null,
    //String[] 数据的标签。
    tags: null,
    //FilterFields[] 用于关键字查询时的字段过滤:
    filterFields: null,

    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options)
    },

    toJSON: function () {
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
    },

    CLASS_NAME: "SuperMap.OnlineQueryDatasParameter"
});

module.exports = SuperMap.OnlineQueryDatasParameter;