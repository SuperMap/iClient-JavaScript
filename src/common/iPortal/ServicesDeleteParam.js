require('../Base');

SuperMap.ServicesDeleteParam = SuperMap.Class({

    ids: [],

    initialize: function (params) {
        params = params || {};
        SuperMap.Util.extend(this, params);
    }

});

module.exports = function (params) {
    return new SuperMap.ServicesDeleteParam(params);
};

