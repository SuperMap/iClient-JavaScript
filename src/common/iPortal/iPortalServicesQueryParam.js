var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.iPortalServicesQueryParam
 * @classdesc iPortal服务查询参数
 *
 */

SuperMap.iPortalServicesQueryParam = SuperMap.Class({

    tags: [],
    userNames: '',
    types: [],
    checkStatus: '',
    offline: false,
    orderBy: '',
    orderType: '',
    keywords: [],
    currentPage: 0,
    pageSize: 0,
    isBatch: false,
    dirIds: [],
    isNotInDir: false,
    filterFields: [],
    authorizedOnly: false,

    initialize: function (params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

});

module.exports = SuperMap.iPortalServicesQueryParam;

