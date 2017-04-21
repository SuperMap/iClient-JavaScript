
SuperMap.ServiceUpdateParam = SuperMap.Class({

    authorizeSetting: [],
    metadata: null,
    tags: [],
    thumbnail: null,

    initialize: function (params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

});

module.exports = function (params) {
    return new SuperMap.ServiceUpdateParam(params);
};

