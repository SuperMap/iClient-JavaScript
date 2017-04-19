/**
 * Class:SuperMap.DataInfo
 * Online下myData资源Put参数
 */
require('../../base');
require('../Resources');
SuperMap.DataInfo = SuperMap.Class({
    //String	文件名。
    fileName: null,
    //DataItemType	文件类型。
    type: null,
    //String[]	数据的标签。
    tags: [],
    //String	数据的描述信息。
    description: null,

    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options)
    },


    toJSON: function () {
        var me = this;
        return {
            "fileName": me.fileName,
            "type": me.type,
            "tags": me.tags,
            "description": me.description
        };
    },

    CLASS_NAME: "SuperMap.DataInfo"
});

module.exports = function (options) {
    return new SuperMap.DataInfo(options);
};