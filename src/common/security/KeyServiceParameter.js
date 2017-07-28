/*
 * key申请参数
 */
require('../REST');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.KeyServiceParameter
 * @constructs SuperMap.KeyServiceParameter
 * @classdesc
 * key申请参数

 * @api
 */
SuperMap.KeyServiceParameter = SuperMap.Class({
    name: null,
    serviceIds: null,
    clientType: SuperMap.ClientType.SERVER,
    limitation: null,
    /**
     * @method SuperMap.KeyServiceParameter.initialize
     * @param options - {Object} 参数。
     */
    initialize: function (options) {
        SuperMap.Util.extend(this, options);
    },
    /**
     * @method SuperMap.KeyServiceParameter.toJSON
     * @return {string} 参数的JSON字符串
     */
    toJSON: function () {
        return {
            name: this.name,
            serviceIds: this.serviceIds,
            clientType: this.clientType,
            limitation: this.limitation
        }
    },
    CLASS_NAME: "SuperMap.KeyServiceParameter"
});

module.exports = SuperMap.KeyServiceParameter;
