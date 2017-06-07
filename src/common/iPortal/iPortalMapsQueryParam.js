var SuperMap = require('../SuperMap');
SuperMap.iPortalMapsQueryParam = SuperMap.Class({

    userNames: '',
    tags: [],
    suggest:false,
    sourceTypes: [],
    keywords: [],
    epsgCode: '',
    orderBy: '',
    currentPage:'',
    pageSize: 0,
    dirIds: [],
    isNotInDir: false,
    updateStart:0,
    updateEnd:0,
    visitStart:0,
    visitEnd:0,
    filterFields: [],

    initialize: function (params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

});

module.exports = SuperMap.iPortalMapsQueryParam;

