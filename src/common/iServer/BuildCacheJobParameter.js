import SuperMap from '../SuperMap';

/**
 * @class SuperMap.BuildCacheJobParameter
 * @classdesc 地图缓存参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName - {string} 数据集名称。<br>
 *         cacheName - {string} 缓存名称。<br>
 *         cacheType - {string} 存储类型。<br>
 *         serverAdresses - {string} MongoDB地址。<br>
 *         database -- {String} 数据库。<br>
 *         version -{string} 版本。<br>
 *         bounds -{SuperMap.Bounds} 缓存范围。<br>
 *         imageType -{number}缓存类型.<br>
 *         level -{number}缓存比例尺级别。
 */
export default  class BuildCacheJobParameter {
    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.datasetName -{string}
     * @description 数据集名称。
     */
    datasetName= "";

    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheName -{string}
     * @description 缓存名称。
     */
    cacheName= "";


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.cacheType -{string}
     * @description 存储类型。
     */
    cacheType= "";


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.serverAdresses -{string}
     * @description MongoDB地址。
     */
    serverAdresses= "";


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.database -{string}
     * @description 数据库。
     */
    database= "";


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.version -{string}
     * @description 版本。
     */
    version= "";


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.bounds -{SuperMap.Bounds}
     * @description 缓存范围。
     */
    bounds= "";


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.imageType -{number}
     * @description 缓存类型。
     */
    imageType= 'Heatmap';


    /**
     * @member SuperMap.BuildCacheJobParameter.prototype.level -{number}
     * @description 缓存比例尺级别。
     */
    level = null;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.BuildCacheJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
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

    /**
     * @function SuperMap.BuildCacheJobParameter.toObject
     * @param buildCacheJobParameter - {Object} 地图缓存参数。
     * @param tempObj - {Object} 参数。
     * @description 生成地图缓存对象
     */
    static  toObject(buildCacheJobParameter, tempObj) {
        for (let name in buildCacheJobParameter) {
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
    }
}

SuperMap.BuildCacheJobParameter = BuildCacheJobParameter;
