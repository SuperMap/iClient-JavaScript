var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.BuildCacheJobParameter
 * @description 地图缓存作业参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName - {String} 数据集名称。<br>
 *         cacheName - {String} 缓存名称。<br>
 *         cacheType - {String} 存储类型。<br>
 *         serverAdresses - {String} MongoDB地址。<br>
 *         database -- {String} 数据库。<br>
 *         version -{String} 版本。<br>
 *         bounds -{SuperMap.Bounds} 缓存范围。<br>
 *         imageType -{number} 缓存类型.<br>
 *         level -{number} 缓存比例尺级别。
 */
SuperMap.BuildCacheJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.datasetName -{String}
     * @description 数据集名称。
     */
    datasetName: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheName -{String}
     * @description 缓存名称。
     */
    cacheName: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheType -{String}
     * @description 存储类型。
     */
    cacheType: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.serverAdresses -{String}
     * @description MongoDB地址。
     */
    serverAdresses: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.database -{String}
     * @description 数据库。
     */
    database: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.version -{String}
     * @description 版本。
     */
    version: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.bounds -{SuperMap.Bounds}
     * @description 缓存范围。
     */
    bounds: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.imageType -{number}
     * @description 缓存类型。
     */
    imageType: null,

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.level -{number}
     * @description 缓存比例尺级别。
     */
    level: null,

    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
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
        if (SuperMap.Util.indexOf(["cacheName", "cacheType", "serverAdresses", "database", "version"], name) > -1) {
            tempObj['output'] = tempObj['output'] || {};
            tempObj['output'][name] = buildCacheJobParameter[name];
            continue;
        }
        tempObj['drawing'] = tempObj['drawing'] || {};
        tempObj['drawing'][name] = buildCacheJobParameter[name];
    }
};

module.exports = SuperMap.BuildCacheJobParameter;