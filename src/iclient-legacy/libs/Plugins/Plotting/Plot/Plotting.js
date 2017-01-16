/* COPYRIGHT 2016 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Plot/DefaultStyle.js
 * @requires SuperMap/Plot/SitDataManager.js
 * @requires SuperMap/Plot/Editor.js
 * @requires SuperMap/Plot/Query.js
 * @requires SuperMap/Plot/SymbolLibManager.js
 * @requires SuperMap/Plot/SymbolLib.js
 * @requires SuperMap/Map.js
 */

var g_Plotting = null;

/**
 * Class: SuperMap.Plotting
 * 动态标绘的总控类。
 */
SuperMap.Plotting = new SuperMap.Class({

    /**
     * Property: serverUrl
     * {String}标绘服务URI
     */
    serverUrl: null,

    /**
     * Property: map
     * {SuperMap.Map}
     */
    map: null,

    /**
     * Property: defaultStyle
     * {SuperMap.Plot.DefaultStyle}缺省属性类
     */
    defaultStyle: null,

    /**
     * Property: sitDataManager
     * {SuperMap.Plot.SitDataManager}态势数据管理类
     */
    sitDataManager: null,

    /**
     * Property: editor
     * {SuperMap.Plot.Editor}编辑器对象
     */
    editor: null,

    /**
     * Property: query
     * {SuperMap.Plot.Query}查询接口类
     */
    query: null,

    /**
     * Property: symbolLibManager
     * {SuperMap.Plot.SymbolLibManager}标号库管理类
     */
    symbolLibManager: null,

    /**
     * Property: clientID
     * {String}客户端用户的ID
     */
    clientID: null,

    /**
     * Property: animationManager
     * {SuperMap.Plot.GOAniamtionManage}动画管理类
     */
    animationManager: null,

    /**
     * Constructor: SuperMap.Plotting
     * 创建一个标绘总控类。
     *
     * Parameters:
     * map - {<SuperMap.Map>}。
     * serverUrl - {String} 标绘服务地址
     * options - {Object} 此类与父类提供的属性。
     *
     * Returns:
     * {<SuperMap.Plotting>}返回总控类对象。
     */
    initialize: function (map, serverUrl, options) {
        if (map && map !== null) {
            SuperMap.Plotting.prototype.map = map;
        }

        if (serverUrl) {
            SuperMap.Plotting.prototype.serverUrl = serverUrl;
        }

        this.defaultStyle = new SuperMap.Plot.DefualtStyle();
        this.sitDataManager = new SuperMap.Plot.SitDataManager(this.map, this.serverUrl);
        this.editor = new SuperMap.Plot.Editor(this.map);
        this.query = new SuperMap.Plot.Query(this.map);
        this.symbolLibManager = new SuperMap.Plot.SymbolLibManager(this.serverUrl);
    },

    /**
     * APIMethod: destroy
     * 销毁该类，释放相关资源
     */
    destroy: function(){
        this.serverUrl = null;

        if(this.defaultStyle){
            this.defaultStyle.destroy();
            this.defaultStyle = null;
        }

        if(this.sitDataManager){
            this.sitDataManager.destroy();
            this.sitDataManager = null;
        }

        if(this.editor){
            this.editor.destroy();
            this.editor = null;
        }

        if(this.query){
            this.query.destroy();
            this.query = null;
        }

        if(this.symbolLibManager){
            this.symbolLibManager.destroy();
            this.symbolLibManager = null;
        }

        this.clientID = null;

        if(null !== this.animationManager){
            this.animationManager.destroy();
            this.animationManager = null;
        }
    },

    /**
     * APIMethod: getDefaultStyle
     * 获取缺省属性管理接口
     *
     * Returns:
     * {<SuperMap.Plot.DefaultStyle>}返回缺省属性对象。
     */
    getDefaultStyle: function () {
        return this.defaultStyle;
    },

    /**
     * APIMethod: getSitDataManager
     * 获取态势数据管理接口
     *
     * Returns:
     * {<SuperMap.Plot.SitDataManager>}返回态势数据管理对象。
     */
    getSitDataManager: function () {
        return this.sitDataManager;
    },

    /**
     * APIMethod: getEditor
     * 获取编辑器对象
     *
     * Returns:
     * {<SuperMap.Plot.Editor>}返回编辑器对象。
     */
    getEditor: function () {
        return this.editor;
    },

    /**
     * APIMethod: getQuery
     * 获取查询分析接口
     *
     * Returns:
     * {<SuperMap.Plot.Query>}返回查询接口对象。
     */
    getQuery: function () {
        return this.query;
    },

    /**
     * APIMethod: getSymbolLibManager
     * 获取标号库管理器
     *
     * Returns:
     * {<SuperMap.Plot.SymbolLibManager>}返回标号库管理对象。
     */
    getSymbolLibManager: function () {
        return this.symbolLibManager;
    },

    /**
     * APIMethod: getClientID
     * 获取客户端用户的ID
     *
     * Returns:
     * {String}返回客户端用户的ID。
     */
    getClientID: function () {
        return this.clientID;
    },

    /**
     * APIMethod: setClientID
     * 设置客户端用户的ID
     *
     * Parameters:
     *  clientID - {String} 客户端用户的ID。
     */
    setClientID: function (clientID) {
        this.clientID = clientID;
    },

    /**
     * APIMethod: setMap
     * 设置地图
     *
     * Parameters:
     *  map - {<SuperMap.Map>}。
     */
    setMap: function (map) {
        this.map = map;
        this.sitDataManager.map = this.map;
        this.editor.map = this.map;
        this.query.map = this.map;

        if(null !== this.animationManager){
            this.animationManager.setMap(this.map);
        }
    },

    /**
     * APIMethod: setClientID
     * 设置客户端用户的ID
     *
     * @Parameters:
     *  plotUrl - {String} 标绘服务地址。
     */
    setPlotUrl : function(plotUrl)
    {
        this.serverUrl = plotUrl;
        this.sitDataManager.serverUrl = this.serverUrl;
        this.symbolLibManager.url = this.serverUrl;
    },

    /**
     * APIMethod: getGOAnimationManager
     * 获取动画管理器
     *
     * Returns:
     * {<SuperMap.Plot.GOAniamtionManager>}返回标号库管理对象。
     */
    getGOAnimationManager: function () {
        if(null === this.animationManager){
            this.animationManager = new SuperMap.Plot.GOAniamtionManager();
            this.animationManager.setMap(this.map);
        }
        return this.animationManager;
    },

    CLASS_NAME: "SuperMap.Plotting"
});

/**
 * APIFunction: SuperMap.Plotting.getInstance
 * 获取总控类对象。
 *
 * Returns:
 * {<SuperMap.Plotting>}返回总控类对象。
 */
SuperMap.Plotting.getInstance = function (map, serverUrl) {
    if (g_Plotting === null) {
        g_Plotting = new SuperMap.Plotting(map, serverUrl);
    }

    return g_Plotting;
};

