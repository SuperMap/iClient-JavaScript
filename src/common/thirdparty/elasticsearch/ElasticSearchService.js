/**
 * ElasticSearch服务
 */
var SuperMap = require('../../SuperMap');
var Elasticsearch = {};
try {
    Elasticsearch = require('elasticsearch');
} catch (ex) {
    Elasticsearch = {};
}
var ElasticSearchParameter = require('./ElasticSearchParameter');

SuperMap.ElasticSearchService = SuperMap.Class({
    /**
     * ElasticSearch服务地址
     */
    url: null,

    /**
     * client ES客户端
     */
    client: null,


    /**
     * 服务器返回数据后执行的操作
     */
    change: null,

    /**
     * 数据超出地理围栏后执行的操作
     */
    outOfGeoFence: null,

    /**
     * 地理围栏
     * {
     *    radius: 1000,//单位是m
     *    center: [104.40, 30.43],
     *    unit: 'meter|degree'
     *  }
     */
    geoFence: null,

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     *
     */
    EVENT_TYPES: ['change', 'error', 'outOfGeoFence'],

    /**
     * APIProperty: events
     * {<SuperMap.Events>}
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    initialize: function (url, options) {
        options = options || {};
        var me = this;
        me.url = url;
        me.client = new Elasticsearch.Client({
            host: me.url
        });
        me.change = options.change;
        me.geoFence = options.geoFence;
        me.outOfGeoFence = options.outOfGeoFence;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES);
        me.eventListeners = options.eventListeners;
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },

    setGeoFence: function (geoFence) {
        this.geoFence = geoFence;
    },

    search: function (param) {
        if (!(param instanceof ElasticSearchParameter)) {
            return;
        }
        var me = this;
        this.client.search(param.toJSONObject()).then(function (resp) {
            me.update(resp.responses);
        }, function (err) {
            me.events.triggerEvent('error', {error: err});
        });
    },

    msearch: function (params) {
        var me = this;
        var body = [];
        params.map(function (param) {
            if (param instanceof ElasticSearchParameter) {
                body.push({index: param.index, type: param.type});
                body.push(param.body);
            }
        });
        this.client.msearch({"body": body}).then(function (resp) {
            me.update(resp.responses);
        }, function (err) {
            me.events.triggerEvent('error', {error: err});
        });
    },

    update: function (data) {
        var me = this;
        if (!data) {
            return;
        }
        me.data = data;
        if (me.geoFence) {
            me.validateDatas(data);
        }
        me.events.triggerEvent('change', {data: me.data});
        me.change && me.change(data);
    },

    validateDatas: function (datas) {
        var me = this;
        if (datas instanceof Array) {
            datas.map(function (data) {
                me._validateData(data);
            });
        } else {
            me._validateData(data);
        }
    },

    _validateData: function (data) {
        var me = this;
        data.hits.hits.map(function (source) {
            var content = source._source;
            var meterUnit = me.getMeterPerMapUnit(me.geoFence.unit);
            var geoFenceCX = me.geoFence.center[0] * meterUnit;
            var geoFenceCY = me.geoFence.center[1] * meterUnit;
            var contentX = content.x * meterUnit;
            var contentY = content.y * meterUnit;
            var distance = me._distance(contentX, contentY, geoFenceCX, geoFenceCY);
            var radius = me.geoFence.radius;
            if (distance > radius) {
                me.outOfGeoFence && me.outOfGeoFence(data);
                me.events.triggerEvent('outOfGeoFence', {data: data});
            }
        });
    },

    _distance: function (x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    },

    getMeterPerMapUnit: function (mapUnit) {
        var earchRadiusInMeters = 6378137;
        var meterPerMapUnit;
        if (mapUnit === 'meter') {
            meterPerMapUnit = 1;
        } else if (mapUnit === 'degree') {
            // 每度表示多少米。
            meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        }
        return meterPerMapUnit;
    },

    CLASS_NAME: "SuperMap.ElasticSearchService"
});

module.exports = SuperMap.ElasticSearchService;
