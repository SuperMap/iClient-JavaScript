/**
 * ES多字段标准查询参数(适用于MULTI_RANGE查询)
 */
var SuperMap = require('../../SuperMap');

SuperMap.MultiMatchParameter = SuperMap.Class({

    multi_match: null,

    initialize: function (fieldNames, query) {
        this.multi_match.fields = fieldNames;
        this.multi_match.query = query;
    },

    toJSONObject: function () {
        return {multi_match:this.multi_match};
    },

    CLASS_NAME: "SuperMap.MultiMatchParameter"
});

module.exports = SuperMap.MultiMatchParameter;
