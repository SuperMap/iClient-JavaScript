/**
 * ElasticSearch服务
 * 通用参数设置请参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-conventions.html
 */
var SuperMap = require('../../SuperMap');
var Elasticsearch = {};
try {
    Elasticsearch = require('elasticsearch');
} catch (ex) {
    Elasticsearch = {};
}

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
     * 是否开启地理围栏验证，默认为不开启。
     */
    openGeoFence: false,

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
        me.openGeoFence = options.openGeoFence;
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

    /**
     * 批量操作API，允许执行多个索引/删除操作。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-bulk
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html
     */
    bulk: function (params, callback) {
        return this.client.bulk(params, callback);
    },

    /**
     * 通过指定scroll参数进行查询来清除已经创建的scroll请求。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-clearscroll
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html
     */
    clearScroll: function (params, callback) {
        return this.client.clearScroll(params, callback);
    },

    /**
     * 获取集群、索引、类型或查询的文档个数。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-count
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html
     */
    count: function (params, callback) {
        return this.client.count(params, callback);
    },

    /**
     * 在特定索引中添加一个类型化的JSON文档，使其可搜索。如果具有相同index，type且id已经存在的文档将发生错误。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-create
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html
     */
    create: function (params, callback) {
        return this.client.create(params, callback);
    },

    /**
     * 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-delete
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html
     */
    delete: function (params, callback) {
        return this.client.delete(params, callback);
    },

    /**
     * 根据其ID从特定索引中删除键入的JSON文档。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletebyquery
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html
     */
    deleteByQuery: function (params, callback) {
        return this.client.deleteByQuery(params, callback);
    },

    /**
     * 根据其ID删除脚本。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletescript
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html
     */
    deleteScript: function (params, callback) {
        return this.client.deleteScript(params, callback);
    },

    /**
     * 根据其ID删除模板。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletetemplate
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
     */
    deleteTemplate: function (params, callback) {
        return this.client.deleteTemplate(params, callback);
    },

    /**
     * 检查给定文档是否存在。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-exists
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html
     */
    exists: function (params, callback) {
        return this.client.exists(params, callback);
    },

    /**
     * 检查资源是否存在。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-existssource
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html
     */
    existsSource: function (params, callback) {
        return this.client.existsSource(params, callback);
    },

    /**
     * 提供与特定查询相关的特定文档分数的详细信息。它还会告诉您文档是否与指定的查询匹配。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-explain
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-explain.html
     */
    explain: function (params, callback) {
        return this.client.explain(params, callback);
    },

    /**
     * 允许检索多个索引之间的字段的功能。(实验性API，可能会在未来版本中删除)
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-fieldcaps
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-field-caps.html
     */
    fieldCaps: function (params, callback) {
        return this.client.fieldCaps(params, callback);
    },

    /**
     * 从索引获取一个基于其id的类型的JSON文档。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html
     */
    get: function (params, callback) {
        return this.client.get(params, callback);
    },

    /**
     * 获取脚本。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getscript
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html
     */
    getScript: function (params, callback) {
        return this.client.getScript(params, callback);
    },

    /**
     * 通过索引，类型和ID获取文档的源。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getsource
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html
     */
    getSource: function (params, callback) {
        return this.client.getSource(params, callback);
    },

    /**
     * 获取模板。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-gettemplate
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
     */
    getTemplate: function (params, callback) {
        return this.client.getTemplate(params, callback);
    },

    /**
     * 在索引中存储一个键入的JSON文档，使其可搜索。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-index
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html
     */
    index: function (params, callback) {
        return this.client.index(params, callback);
    },

    /**
     * 从当前集群获取基本信息。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-info
     * 更多信息参考 https://www.elastic.co/guide/index.html
     */
    info: function (params, callback) {
        return this.client.info(params, callback);
    },

    /**
     * 根据索引，类型（可选）和ids来获取多个文档。mget所需的主体可以采用两种形式：文档位置数组或文档ID数组。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mget
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html
     */
    mget: function (params, callback) {
        return this.client.mget(params, callback);
    },

// {
//     index: 'flightware',
//         type: 'flight',
//     body: {
//     "aggs": {
//         "minTime": {
//             "min": {
//                 "field": "time_ms"
//             }
//         },
//         "maxTime": {
//             "max": {
//                 "field": "time_ms"
//             }
//         }
//     }
// }
// }

    /**
     * 在同一请求中执行多个搜索请求。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearch
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html
     */
    msearch: function (params, callback) {
        var me = this;
        if (me.openGeoFence) {
            return me.client.msearch(params, callback).then(function (resp) {
                me._update(resp.responses);
            }, function (err) {
                me.events.triggerEvent('error', {error: err});
            });
        }
        return me.client.msearch(params, callback);
    },

    /**
     * 在同一请求中执行多个搜索模板请求。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearchtemplate
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
     */
    msearchTemplate: function (params, callback) {
        return this.client.msearchTemplate(params, callback);
    },

    /**
     * 多termvectors API允许一次获得多个termvectors。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mtermvectors
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-termvectors.html
     */
    mtermvectors: function (params, callback) {
        return this.client.mtermvectors(params, callback);
    },

    /**
     * 测试连接。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-ping
     * 更多信息参考 https://www.elastic.co/guide/index.html
     */
    ping: function (params, callback) {
        return this.client.ping(params, callback);
    },

    /**
     * 添加脚本。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-putscript
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html
     */
    putScript: function (params, callback) {
        return this.client.putScript(params, callback);
    },

    /**
     * 添加模板。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-puttemplate
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
     */
    putTemplate: function (params, callback) {
        return this.client.putTemplate(params, callback);
    },

    /**
     * 重新索引。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindex
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html
     */
    reindex: function (params, callback) {
        return this.client.reindex(params, callback);
    },

    /**
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindexrethrottle
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html
     */
    reindexRessrottle: function (params, callback) {
        return this.client.reindexRessrottle(params, callback);
    },

    /**
     * 搜索模板。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-rendersearchtemplate
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
     */
    renderSearchTemplate: function (params, callback) {
        return this.client.renderSearchTemplate(params, callback);
    },

    /**
     * 在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html
     */
    scroll: function (params, callback) {
        return this.client.scroll(params, callback);
    },

    /**
     * 在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html
     */
    search: function (params, callback) {
        var me = this;
        if (me.openGeoFence) {
            return me.client.search(params, callback).then(function (resp) {
                me._update(resp.responses);
            }, function (err) {
                me.events.triggerEvent('error', {error: err});
            });
        }
        return me.client.search(params, callback);
    },

    /**
     * 返回要执行搜索请求的索引和分片。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchshards
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-shards.html
     */
    searchShards: function (params, callback) {
        return this.client.searchShards(params, callback);
    },

    /**
     * 搜索模板。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchtemplate
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html
     */
    searchTemplate: function (params, callback) {
        return this.client.searchTemplate(params, callback);
    },

    /**
     * 该建议功能通过使用特定的建议者，基于所提供的文本来建议类似的术语。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-suggest
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html
     */
    suggest: function (params, callback) {
        return this.client.suggest(params, callback);
    },

    /**
     * 返回有关特定文档字段中的术语的信息和统计信息。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-termvectors
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html
     */
    termvectors: function (params, callback) {
        return this.client.termvectors(params, callback);
    },

    /**
     * 更新文档的部分。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-update
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html
     */
    update: function (params, callback) {
        return this.client.update(params, callback);
    },

    /**
     * 通过查询API来更新文档。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-updatebyquery
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html
     */
    updateByQuery: function (params, callback) {
        return this.client.updateByQuery(params, callback);
    },

    /**
     * 通过查询API来更新文档。
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-updatebyquery
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html
     */
    updateByQuery: function (params, callback) {
        return this.client.updateByQuery(params, callback);
    },

    _update: function (data) {
        var me = this;
        if (!data) {
            return;
        }
        me.data = data;
        if (me.geoFence) {
            me._validateDatas(data);
        }
        me.events.triggerEvent('change', {data: me.data});
        me.change && me.change(data);
    },

    _validateDatas: function (datas) {
        if (!datas) {
            return;
        }
        if (!(datas instanceof Array)) {
            datas = [datas];
        }
        var i, len = datas.length;
        for (i = 0; i < len; i++) {
            this._validateData(datas[i]);
        }
    },

    _validateData: function (data) {
        var me = this;
        data.hits.hits.map(function (source) {
            var content = source._source;
            var meterUnit = me._getMeterPerMapUnit(me.geoFence.unit);
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

    _getMeterPerMapUnit: function (mapUnit) {
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
