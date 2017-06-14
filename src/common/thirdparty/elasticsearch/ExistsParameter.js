/**
 * ES存在查询参数(适用于Exists查询)
 */
var SuperMap = require('../../SuperMap');

SuperMap.ExistsParameter = SuperMap.Class({

    exists: null,

    initialize: function (filedName) {
        this.exists.field = filedName;
    },
    toJSONObject: function () {
        return {exists:this.exists};
    },
    CLASS_NAME: "SuperMap.ExistsParameter"
});

module.exports = SuperMap.ExistsParameter;
