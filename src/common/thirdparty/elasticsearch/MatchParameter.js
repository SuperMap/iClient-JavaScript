/**
 * ES普通查询参数(适用于MATCH查询)
 */
var SuperMap = require('../../SuperMap');

SuperMap.MatchParameter = SuperMap.Class({

    match: null,

    initialize: function (fieldName, filedValue) {
        var me = this;
        me.match = {};
        me.match[fieldName] = filedValue;
    },

    toJSONObject: function () {
        return {match: this.match};
    },

    CLASS_NAME: "SuperMap.MatchParameter"
});

module.exports = SuperMap.MatchParameter;
