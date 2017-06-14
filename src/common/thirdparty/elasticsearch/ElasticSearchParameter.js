/**
 * ElasticSearch服务请求参数
 */
var SuperMap = require('../../SuperMap');
var MatchParameter = require('./MatchParameter');
var MultiMatchParameter = require('./MultiMatchParameter');
var RangeParameter = require('./RangeParameter');
var ExistsParameter = require('./ExistsParameter');

SuperMap.ElasticSearchParameter = SuperMap.Class({

    /**
     * ES服务索引名。
     */
    index: null,

    /**
     * ES服务类型名。
     */
    type: null,

    /**
     * 向ES发送查询请求的请求体,
     */
    body: null,

    /**
     * 起始索引
     */
    from: 0,

    /**
     * 查询的数据长度
     */
    size: 100,

    /**
     * 排序
     * sort={"字段名"：{order:"asc"}}
     */
    sort: null,

    /**
     * query - {ExistsParameter/MatchParameter/MultiMatchParameter/RangeParameter}
     * filter - {ExistsParameter/MatchParameter/MultiMatchParameter/RangeParameter}
     * @param options
     */
    initialize: function (options) {
        this.index = options.index;
        this.type = options.type;

        this.body = {"query": {"bool": {"must": {}, "filter": {}}}};
        if (!options.must && !options.filter) {
            this.body.query.bool.must.match_all = {};
            return;
        }
        if (options.sort) {
            this.body.sort = options.sort;
        }
        this.body.from = options.from || 0;
        this.body.size = options.size || 100;
        this.body.query.bool.must = options.must ? options.must.toJSONObject() : {};
        this.body.query.bool.should = options.should ? this._parseShould(options.should) : [];
        this.body.query.bool.filter = options.filter ? options.filter.toJSONObject() : {};
    },

    toJSONObject: function () {
        var me = this;
        return {
            index: me.index,
            type: me.type,
            body: me.body,
        };
    },

    _parseShould: function (should) {
        var shouldArr = [];
        should.map(function (s) {
            shouldArr.push(s.toJSONObject());
        });
        return shouldArr;
    },

    CLASS_NAME: "SuperMap.ElasticSearchParameter"
});

module.exports = SuperMap.ElasticSearchParameter;
