require('../Base');

SuperMap.ServicesQueryParam = SuperMap.Class({

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
    },

});

module.exports = function (params) {
    return new SuperMap.ServicesQueryParam(params);
};

