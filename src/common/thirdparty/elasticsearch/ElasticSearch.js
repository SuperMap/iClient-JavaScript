import {SuperMap} from '../../SuperMap';
import {Events} from '../../commontypes/Events';
import es from 'elasticsearch';
import {Util} from "../../commontypes/Util";

/**
 * @class SuperMap.ElasticSearch
 * @classdesc ElasticSearch服务类。
 * @category ElasticSearch
 * @param url - {string} ElasticSearch服务地址。
 * @param options - {Object} 可选参数。如:</br>
 *         change - {function} 服务器返回数据后执行的函数。废弃,不建议使用。使用search或msearch方法。</br>
 *         openGeoFence - {boolean} 是否开启地理围栏验证，默认为不开启。</br>
 *         outOfGeoFence - {function} 数据超出地理围栏后执行的函数。</br>
 *         geoFence - {Object} 地理围栏。</br>
 */

export class ElasticSearch {

    constructor(url, options) {
        options = options || {};
        /**
         *  @member SuperMap.ElasticSearch.prototype.url -{string}
         *  @description ElasticSearch服务地址
         */
        this.url = url;
        /**
         *  @member SuperMap.ElasticSearch.prototype.client -{Object}
         *  @description client ES客户端
         */
        this.client = new es.Client({
            host: this.url
        });
        /**
         *  @deprecated
         *  @member SuperMap.ElasticSearch.prototype.change -{function}
         *  @description 服务器返回数据后执行的函数。废弃,不建议使用。使用search或msearch方法。
         */
        this.change = null;
        /**
         *  @member SuperMap.ElasticSearch.prototype.openGeoFence -{boolean}
         *  @description 是否开启地理围栏验证，默认为不开启。
         */
        this.openGeoFence = false;
        /**
         *  @member SuperMap.ElasticSearch.prototype.outOfGeoFence -{function}
         *  @description 数据超出地理围栏后执行的函数
         */
        this.outOfGeoFence = null;

        /**
         * @member SuperMap.ElasticSearch.prototype.geoFence -{Object}
         * @description 地理围栏
         * @example {
     *    radius: 1000,//单位是m
     *    center: [104.40, 30.43],
     *    unit: 'meter|degree'
     *  }
         */
        this.geoFence = null;

        /*
         * Constant: EVENT_TYPES
         * {Array<String>}
         * 此类支持的事件类型。
         *
         */
        this.EVENT_TYPES = ['change', 'error', 'outOfGeoFence'];

        /**
         * @member SuperMap.ElasticSearch.prototype.events -{SuperMap.Events}
         * @description 事件
         */
        this.events = new Events(this, null, this.EVENT_TYPES);

        /**
         * @member SuperMap.ElasticSearch.prototype.eventListeners -{Object}
         * @description 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
         * 相当于调用 SuperMap.Events.on(eventListeners)。
         */
        this.eventListeners = null;
        Util.extend(this, options);
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.setGeoFence
     * @description 设置地理围栏，openGeoFence参数为true的时候，设置的地理围栏才生效。
     * @param geoFence - {SuperMap.Geometry} 地理围栏。
     */

    setGeoFence(geoFence) {
        this.geoFence = geoFence;
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.bulk
     * @description 批量操作API，允许执行多个索引/删除操作。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-bulk</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-bulk.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    bulk(params, callback) {
        return this.client.bulk(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.clearScroll
     * @description 通过指定scroll参数进行查询来清除已经创建的scroll请求。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-clearscroll</br>
     *更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    clearScroll(params, callback) {
        return this.client.clearScroll(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.count
     * @description 获取集群、索引、类型或查询的文档个数。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-count</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-count.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    count(params, callback) {
        return this.client.count(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.count
     * @description 在特定索引中添加一个类型化的JSON文档，使其可搜索。如果具有相同index，type且id已经存在的文档将发生错误。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-create</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    create(params, callback) {
        return this.client.create(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.delete
     * @description 根据其ID从特定索引中删除键入的JSON文档。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-delete</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    delete(params, callback) {
        return this.client.delete(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.delete
     * @description 根据其ID从特定索引中删除键入的JSON文档。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletebyquery</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-delete-by-query.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    deleteByQuery(params, callback) {
        return this.client.deleteByQuery(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.delete
     * @description 根据其ID删除脚本。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletescript</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    deleteScript(params, callback) {
        return this.client.deleteScript(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.deleteTemplate
     * @description 根据其ID删除模板。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-deletetemplate</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    deleteTemplate(params, callback) {
        return this.client.deleteTemplate(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.exists
     * @description 检查给定文档是否存在。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-exists</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    exists(params, callback) {
        return this.client.exists(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.existsSource
     * @description 检查资源是否存在。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-existssource</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */

    existsSource(params, callback) {
        return this.client.existsSource(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.explain
     * @description 提供与特定查询相关的特定文档分数的详细信息。它还会告诉您文档是否与指定的查询匹配。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-explain</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-explain.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    explain(params, callback) {
        return this.client.explain(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.fieldCaps
     * @description 允许检索多个索引之间的字段的功能。(实验性API，可能会在未来版本中删除)</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-fieldcaps</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-field-caps.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    fieldCaps(params, callback) {
        return this.client.fieldCaps(params, callback);
    }


    /**
     * @function  SuperMap.ElasticSearch.prototype.get
     * @description 从索引获取一个基于其id的类型的JSON文档。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-get</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    get(params, callback) {
        return this.client.get(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.getScript
     * @description 获取脚本。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getscript</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    getScript(params, callback) {
        return this.client.getScript(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.getSource
     * @description 通过索引，类型和ID获取文档的源。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-getsource</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-get.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    getSource(params, callback) {
        return this.client.getSource(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.getTemplate
     * @description 获取模板。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-gettemplate</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    getTemplate(params, callback) {
        return this.client.getTemplate(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.index
     * @description 在索引中存储一个键入的JSON文档，使其可搜索。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-index</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-index_.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    index(params, callback) {
        return this.client.index(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.info
     * @description 从当前集群获取基本信息。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-info</br>
     * 更多信息参考 https://www.elastic.co/guide/index.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    info(params, callback) {
        return this.client.info(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.mget
     * @description 根据索引，类型（可选）和ids来获取多个文档。mget所需的主体可以采用两种形式：文档位置数组或文档ID数组。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mget</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-get.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    mget(params, callback) {
        return this.client.mget(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.msearch
     * @description 在同一请求中执行多个搜索请求。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearch</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-multi-search.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 请求返回的回调函数。也可以使用then表达式获取返回结果。<br>
     *     回调参数：error,response。结果存储在response.responses中
     */
    msearch(params, callback) {
        let me = this;

        return me.client.msearch(params)
            .then(function (resp) {
                me._update(resp.responses, callback);
                return resp;
            }, function (err) {
                callback(err);
                me.events.triggerEvent('error', {error: err});
                return err;
            });
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.msearchTemplate
     * @description 在同一请求中执行多个搜索模板请求。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-msearchtemplate</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    msearchTemplate(params, callback) {
        return this.client.msearchTemplate(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.mtermvectors
     * @description 多termvectors API允许一次获得多个termvectors。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-mtermvectors</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-multi-termvectors.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    mtermvectors(params, callback) {
        return this.client.mtermvectors(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.ping
     * @description 测试连接。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-ping</br>
     * 更多信息参考 https://www.elastic.co/guide/index.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    ping(params, callback) {
        return this.client.ping(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.putScript
     * @description 添加脚本。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-putscript</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/modules-scripting.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    putScript(params, callback) {
        return this.client.putScript(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.putTemplate
     * @description 添加模板。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-puttemplate</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    putTemplate(params, callback) {
        return this.client.putTemplate(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.reindex
     * @description 重新索引。</br>
     * 参数设置参考 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindex</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    reindex(params, callback) {
        return this.client.reindex(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.reindexRessrottle
     * @description 重新索引。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-reindexrethrottle</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-reindex.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    reindexRessrottle(params, callback) {
        return this.client.reindexRessrottle(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.renderSearchTemplate
     * @description 搜索模板。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-rendersearchtemplate</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-template.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    renderSearchTemplate(params, callback) {
        return this.client.renderSearchTemplate(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.scroll
     * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-scroll</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-request-scroll.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    scroll(params, callback) {
        return this.client.scroll(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.search
     * @description  在search()调用中指定滚动参数之后，滚动搜索请求（检索下一组结果）。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-search</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-search.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 请求返回的回调函数。也可以使用then表达式获取返回结果。<br>
     *     回调参数：error,response,结果存储在response.responses中
     */
    search(params, callback) {
        let me = this;
        return me.client.search(params)
            .then(function (resp) {
                me._update(resp.responses, callback);
                return resp;
            }, function (err) {
                callback(err);
                me.events.triggerEvent('error', {error: err});
                return err;
            });
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.searchShards
     * @description  返回要执行搜索请求的索引和分片。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchshards</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-shards.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    searchShards(params, callback) {
        return this.client.searchShards(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.searchTemplate
     * @description  搜索模板。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-searchtemplate</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    searchTemplate(params, callback) {
        return this.client.searchTemplate(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.suggest
     * @description 该建议功能通过使用特定的建议者，基于所提供的文本来建议类似的术语。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-suggest</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/search-suggesters.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    suggest(params, callback) {
        return this.client.suggest(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.termvectors
     * @description 返回有关特定文档字段中的术语的信息和统计信息。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-termvectors</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-termvectors.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    termvectors(params, callback) {
        return this.client.termvectors(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.update
     * @description 更新文档的部分。</br>
     * 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-update</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    update(params, callback) {
        return this.client.update(params, callback);
    }

    /**
     * @function  SuperMap.ElasticSearch.prototype.update
     * @description 通过查询API来更新文档。</br>
     * 参数设置参考 参数设置参考 https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/api-reference.html#api-updatebyquery</br>
     * 更多信息参考 https://www.elastic.co/guide/en/elasticsearch/reference/current/docs-update-by-query.html</br>
     * @param params - {Object} 参数。
     * @param callback - {function} 回调函数。
     */
    updateByQuery(params, callback) {
        return this.client.updateByQuery(params, callback);
    }

    _update(data, callback) {
        let me = this;
        if (!data) {
            return;
        }
        me.data = data;
        if (me.openGeoFence && me.geoFence) {
            me._validateDatas(data);
        }
        me.events.triggerEvent('change', {data: me.data});
        //change方法已废弃，不建议使用。建议使用search方法的第二个参数传入请求成功的回调
        if (me.change) {
            me.change && me.change(data);
        } else {
            //加responses是为了保持跟原来es自身的数据结构一致
            callback && callback(undefined, {responses: data});
        }
    }

    _validateDatas(datas) {
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
    }

    _validateData(data) {
        let me = this;
        data.hits.hits.map(function (source) {
            let content = source._source;
            let meterUnit = me._getMeterPerMapUnit(me.geoFence.unit);
            let geoFenceCX = me.geoFence.center[0] * meterUnit;
            let geoFenceCY = me.geoFence.center[1] * meterUnit;
            let contentX = content.x * meterUnit;
            let contentY = content.y * meterUnit;
            let distance = me._distance(contentX, contentY, geoFenceCX, geoFenceCY);
            let radius = me.geoFence.radius;
            if (distance > radius) {
                me.outOfGeoFence && me.outOfGeoFence(data);
                me.events.triggerEvent('outOfGeoFence', {data: data});
            }
            return source;
        });
    }

    _distance(x1, y1, x2, y2) {
        return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
    }

    _getMeterPerMapUnit(mapUnit) {
        let earchRadiusInMeters = 6378137;
        let meterPerMapUnit;
        if (mapUnit === 'meter') {
            meterPerMapUnit = 1;
        } else if (mapUnit === 'degree') {
            // 每度表示多少米。
            meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        }
        return meterPerMapUnit;
    }

}

SuperMap.ElasticSearch = ElasticSearch;
