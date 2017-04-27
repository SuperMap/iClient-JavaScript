/**
 * Class: SuperMap.QueryParameters
 * 查询参数基类。
 * 距离查询、SQL 查询、几何地物查询等各自的参数均继承此类。
 */
require('../REST');
require('./FilterParameter');
var SuperMap = require('../SuperMap');
SuperMap.QueryParameters = SuperMap.Class({

    /**
     * APIProperty: customParams
     * {String} 自定义参数，供扩展使用。
     */
    customParams: null,

    /**
     * Property: prjCoordSys
     * {Object} 自定义参数，供isueprmap提供的动态投影查询扩展使用。如 {"epsgCode":3857}
     */
    prjCoordSys: null,

    /**
     * APIProperty: expectCount
     * {Number} 期望返回结果记录个数，默认返回100000条查询记录，
     * 如果实际不足100000条则返回实际记录条数。
     */
    expectCount: 100000,

    /**
     * APIProperty: networkType
     * {<SuperMap.GeometryType>} 网络数据集对应的查询类型，
     * 分为点和线两种类型，默认为线几何对象类型，即SuperMap.GeometryType.LINE。
     */
    networkType: SuperMap.GeometryType.LINE,

    /**
     * APIProperty: queryOption
     * {<SuperMap.QueryOption>} 查询结果类型枚举类。
     * 该类描述查询结果返回类型，包括只返回属性、
     * 只返回几何实体以及返回属性和几何实体。
     */
    queryOption: SuperMap.QueryOption.ATTRIBUTEANDGEOMETRY,

    /**
     * APIProperty: queryParams
     * {Array(<SuperMap.FilterParameter>)} 查询过滤条件参数数组。
     * 该类用于设置查询数据集的查询过滤参数。
     */
    queryParams: null,

    /**
     * APIProperty: startRecord
     * {Number} 查询起始记录号，默认值为0。
     */
    startRecord: 0,

    /**
     * APIProperty: holdTime
     * {Number} 资源在服务端保存的时间。默认为10（分钟）。
     */
    holdTime: 10,

    /**
     * Property: returnCustomResult
     * {Boolean} 仅供三维使用。
     */
    returnCustomResult: false,

    /**
     * Constructor: SuperMap.QueryParameters
     * 查询参数基类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * customParams - {String} 自定义参数，供扩展使用。
     * expectCount - {Number} 期望返回结果记录个数。
     * networkType - {<SuperMap.GeometryType>} 网络数据集对应的查询类型。
     * queryOption - {<SuperMap.QueryOption>} 查询结果类型枚举类。
     * queryParams -  {Array(<SuperMap.FilterParameter>)} 查询过滤条件参数数组。
     * startRecord - {Number} 查询起始记录号。
     * holdTime - {Number} 资源在服务端保存的时间。
     */
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