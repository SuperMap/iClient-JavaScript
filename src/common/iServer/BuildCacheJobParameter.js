/**
 * Class: SuperMap.BuildCacheJobParameter
 * 地图缓存作业参数类
 */
var SuperMap = require('../SuperMap');
SuperMap.BuildCacheJobParameter = SuperMap.Class({

    /**
     * APIProperty: datasetName
     * {String} 数据集名称。
     */
    datasetName: null,

    /**
     * APIProperty: cacheName
     * {String} 缓存名称。
     */
    cacheName: null,

    /**
     * APIProperty: cacheType
     * {String} 存储类型。
     */
    cacheType: null,

    /**
     * APIProperty: serverAddresses
     * {String} MongoDB地址。
     */
    serverAdresses: null,

    /**
     * APIProperty: database
     * {String} 数据库。
     */
    database: null,

    /**
     * APIProperty: version
     * {String} 版本。
     */
    version: null,

    /**
     * APIProperty: bounds
     * {<SuperMap.Bounds>} 缓存范围。
     */
    bounds: null,

    /**
     * APIProperty: imageType
     * {number} 缓存类型。
     */
    imageType: null,

    /**
     * APIProperty: level
     * {number} 缓存比例尺级别。
     */
    level: null,

    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        this.datasetName = null;
        this.cacheName = null;
        this.cacheType = null;
        this.serverAdresses = null;
        this.database = null;
        this.version = null;
        this.bounds = null;
        this.imageType = null;
        this.level = null;
    }

});

SuperMap.BuildCacheJobParameter.toObject = function (buildCacheJobParameter, tempObj) {
    for (var name in buildCacheJobParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = buildCacheJobParameter[name];
            continue;
        }
        if (name === "cacheName" || name === "cacheType" || name === "serverAdresses" || name === "database" || name === "version") {
            tempObj['output'] = tempObj['output'] || {};
            tempObj['output'][name] = buildCacheJobParameter[name];
            continue;
        }
        tempObj['drawing'] = tempObj['drawing'] || {};
        tempObj['drawing'][name] = buildCacheJobParameter[name];
    }
};

module.exports = SuperMap.BuildCacheJobParameter;