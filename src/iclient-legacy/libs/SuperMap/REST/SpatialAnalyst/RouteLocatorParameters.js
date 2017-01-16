/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.RouteLocatorParameters
 * 路由对象定位空间对象的参数类。
 * 参数有两种方式，分别为Geometry和Dataset两种，前者需要指定sourceRoute对象作为参数，后者需要dataset，routeIDField，routeID三个参数
 * 如果用户两种参数均设置，优先选择Dataset方式
 */
SuperMap.REST.RouteLocatorParameters = SuperMap.Class({

    /**
     * APIProperty:sourceRoute
     * {<SuperMap.REST.Route>} 路由对象。
     */
    sourceRoute:null,

    /**
     * APIProperty: dataset
     * {String} 要用来做缓冲区分析的数据源中数据集的名称。该名称用形如"数据集名称@数据源别名"形式来表示。
     */
    dataset: null,

    /**
     * APIProperty：routeIDField
     * {String}  路由对象所在的字段名称。
     *
     */
    routeIDField:null,

    /**
     * APIProperty:routeID
     * {Interger}  路由对象标识 。
     *
     */
    routeID:null,

	/**
     * APIProperty:type
     * {String} 【必选参数】类型：点 or 线。
     *
     * 可选值为:
     * LINE :根据起始 M 值及终止 M 值定位线对象。
     *POINT : 根据 M 值定位点对象。
     */
    type:null,

    /**
     * APIProperty:measure
     * {Double} 【必选参数】定位点的M值。只当路由对象定位点时有意义。
     */
    measure:null,

    /**
     * APIProperty：offset
     * {Double} 定位点偏移量。只当路由对象定位点时有意义，默认为0。
     */
    offset:0,

    /**
     * APIProperty:isIgnoreGap
     * {Boolean} 是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。
     */
    isIgnoreGap:false,

    /**
     * APIProperty:startMeasure
     * {Double} 定位线的起始M值。只当路由对象定位线时有意义。
     */
    startMeasure:null,

    /**
     * APIProperty:endMeasure
     * {Double} 定位线的终止M值。只当路由对象定位线时有意义。
     */
    endMeasure:null,


    /**
     * Constructor: SuperMap.REST.RouteLocatorParameters
     * 路由对象定位空间对象的参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * sourceRoute -  {<SuperMap.REST.Route>} 【必选参数】路由对象。
     * type -  {String} 【必选参数】类型：点 or 线。
     * measure - {Double} 【必选参数】定位点的M值。只当路由对象定位点时有意义。
     * offset - {Double} 定位点偏移量。只当路由对象定位点时有意义，默认为0。
     * isIgnoreGap - {Boolean} 是否忽略子对象之间的距离。默认为false，即不忽略子对象之间的距离。
     * startMeasure - {Double} 定位线的起始M值。只当路由对象定位线时有意义。
     * endMeasure -  {Double} 定位线的终止M值。只当路由对象定位线时有意义。
     */
    initialize:function (options) {
        if (options) {
            var routeFromClient = options.sourceRoute;
            var routeHandle = {};
            if(routeFromClient){
                if(routeFromClient instanceof SuperMap.Geometry && routeFromClient.components){
                    routeHandle.type = routeFromClient.type;
                    routeHandle.parts = routeFromClient.parts;
                    var parts = [];
                    for(var i = 0,len = routeFromClient.components.length;i<len;i++)
                    {
                        parts = parts.concat(routeFromClient.components[i].components);
                    }
                    routeHandle.points = parts;
                    options.sourceRoute = routeHandle;
                }
            }
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.sourceRoute = null;
        me.type = null;
        me.measure = null;
        me.offset = 0;
        me.isIgnoreGap = false;
        me.startMeasure = null;
        me.endMeasure = null;
        me.dataset = null;
        me.routeID = null;
        me.routeIDField = null;
    },

    CLASS_NAME:"SuperMap.REST.RouteLocatorParameters"
});
