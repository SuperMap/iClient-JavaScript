/**
 * key申请参数
 */
require('../REST');
var SuperMap = require('../SuperMap');

SuperMap.KeyServiceParameter = SuperMap.Class({
    name: null,
    serviceIds: null,
    clientType: SuperMap.ClientType.SERVER,
    limitation: null,
    initialize: function (options) {
        SuperMap.Util.extend(this, options);
    },

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
