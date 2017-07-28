/*
 * Class: SuperMap.QueryParameters
 * 查询参数基类。
 * 距离查询、SQL 查询、几何地物查询等各自的参数均继承此类。
 */
require('../REST');
require('./FilterParameter');
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.QueryParameters
 * @description 查询参数基类。距离查询、SQL 查询、几何地物查询等各自的参数均继承此类。
 * @param options - {Object} 可选参数。如：<br>
 *         customParams - {String} 自定义参数，供扩展使用。<br>
 *         prjCoordSys -{Object} 自定义参数，供isueprmap提供的动态投影查询扩展使用。如 {"epsgCode":3857}。<br>
 *         expectCount - {Number} 期望返回结果记录个数。<br>
 *         networkType - {SuperMap.GeometryType} 网络数据集对应的查询类型。<br>
 *         queryOption - {SuperMap.QueryOption} 查询结果类型枚举类。<br>
 *         queryParams -  {Array<SuperMap.FilterParameter>} 查询过滤条件参数数组。<br>
 *         startRecord - {Number} 查询起始记录号。<br>
 *         holdTime - {Number} 资源在服务端保存的时间。<br>
 *         returnCustomResult -{Boolean} 仅供三维使用。
 */
SuperMap.QueryParameters = SuperMap.Class({

    /**
     * APIProperty: customParams
     * @member SuperMap.QueryParameters.prototype.customParams -{String}
     * @description 自定义参数，供扩展使用。
     */
    customParams: null,

    /**
     * Property: prjCoordSys
     * @member SuperMap.QueryParameters.prototype.prjCoordSys -{Object}
     * @description 自定义参数，供isueprmap提供的动态投影查询扩展使用。如 {"epsgCode":3857}
     */
    prjCoordSys: null,

    /**
     * APIProperty: expectCount
     * @member SuperMap.QueryParameters.prototype.expectCount -{Number}
     * @description 期望返回结果记录个数，默认返回100000条查询记录，
     *               如果实际不足100000条则返回实际记录条数。
     */
    expectCount: 100000,

    /**
     * APIProperty: networkType
     * @member SuperMap.QueryParameters.prototype.networkType -{SuperMap.GeometryType}
     * @description 网络数据集对应的查询类型，
     *               分为点和线两种类型，默认为线几何对象类型，即SuperMap.GeometryType.LINE。
     */
    networkType: SuperMap.GeometryType.LINE,

    /**
     * APIProperty: queryOption
     * @member SuperMap.QueryParameters.prototype.queryOption -{SuperMap.QueryOption}
     * @description 查询结果类型枚举类。
     *               该类描述查询结果返回类型，包括只返回属性、
     *               只返回几何实体以及返回属性和几何实体。
     */
    queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,

    /**
     * APIProperty: queryParams
     * @member SuperMap.QueryParameters.prototype.queryParams -{Array<SuperMap.FilterParameter>}
     * @description 查询过滤条件参数数组。
     *               该类用于设置查询数据集的查询过滤参数。
     */
    queryParams: null,

    /**
     * APIProperty: startRecord
     * @member SuperMap.QueryParameters.prototype.startRecord -{Number}
     * @description 查询起始记录号，默认值为0。
     */
    startRecord: 0,

    /**
     * APIProperty: holdTime
     * @member SuperMap.QueryParameters.prototype.holdTime -{Number}
     * @description 资源在服务端保存的时间。默认为10（分钟）。
     */
    holdTime: 10,

    /**
     * Property: returnCustomResult
     * @member SuperMap.QueryParameters.prototype.returnCustomResult -{Boolean}
     * @description 仅供三维使用。
     */
    returnCustomResult: false,

    /*
     * Constructor: SuperMap.QueryParameters
     * 查询参数基类构造函数。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.customParams = null;
        me.expectCount = null;
        me.networkType = null;
        me.queryOption = null;
        if (me.queryParams) {
            for (var i = 0, qps = me.queryParams, len = qps.length; i < len; i++) {
                qps[i].destroy();
            }
            me.queryParams = null;
        }
        me.startRecord = null;
        me.holdTime = null;
        me.returnCustomResult = null;
        me.prjCoordSys = null;
    },

    CLASS_NAME: "SuperMap.QueryParameters"
});
module.exports = SuperMap.QueryParameters;