/**
 * ES范围查询参数(适用于RANGE查询)
 */
var SuperMap = require('../../SuperMap');

SuperMap.RangeParameter = SuperMap.Class({

    range: null,

    initialize: function (fieldName, gt, gte, lt, lte) {
        this.range = {};
        this.range[fieldName] = {};
        if (gt) {
            this.range[fieldName]['gt'] = gt;
        }
        if (gte) {
            this.range[fieldName]['gte'] = gte;
        }
        if (lt) {
            this.range[fieldName]['lt'] = lt;
        }
        if (lte) {
            this.range[fieldName]['lte'] = lte;
        }
    },

    toJSONObject: function () {
        return {range: this.range};
    },

    CLASS_NAME: "SuperMap.RangeParameter"
});

module.exports = SuperMap.RangeParameter;
