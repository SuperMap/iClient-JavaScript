/**
 *
 * Class: SuperMap.Plot.SymbolLibManager
 * 标号库管理类。
 * 使用方法：
 * (start code)
 * var symbolLibManager = new SuperMap.Plot.SymbolLibManager(url);
 * symbolLibManager.events.on({
 *     "initializeCompleted": initializeCompleted,
 * });
 * symbolLibManager.initializeAsync();
 * (end)
 *
 */

SuperMap.Plot.SymbolLibManager = new SuperMap.Class({

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *initializeCompleted* 标号库初始化完成触发该事件。
     */
    EVENT_TYPES: ["initializeCompleted"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 SymbolLibManager 类中支持 initializeCompleted 事件，该事件返回初始化完成的标号库ID列表。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 SymbolLibManager 支持对 initializeCompleted 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: url
     * 服务器地址。
     */
    url: null,

    /**
     * Property: libIDs
     * 服务器支持的标号库列表。
     */
    libIDs:[],

    /**
     * Property: libIDs
     * 服务器支持的标号库数据。
     */
    symbolLibs: [],

    /**
     * Property: symbolLibJsons
     * 服务器支持的标号库Json格式数据。
     */
    symbolLibJsons: [],

    /**
     * Property: isInializeOK
     * 标号库初始化是否完成。
     */
    isInializeOK: false,

    /**
     * Constructor: SuperMap.Plot.SymbolLibManager
     * 标号库管理类。
     *
     * Parameters:
     * url - {String} 标绘服务地址
     * options - {Object} 此类与父类提供的属性。可以通过指定libIDs指定要初始化标号库的ID列表，不指定则初始化所有标号库。
     *
     * Returns:
     * {<SuperMap.Plot.SymbolLibManager>}  结果类型对象。
     */
    initialize : function(url, options){
        this.url = url;
        if(options && options.libIDs) {
            this.libIDs = options.libIDs;
        }

        this.events = new SuperMap.Events(
            this, null, this.EVENT_TYPES, true
        );
        if (this.eventListeners instanceof Object) {
            this.events.on(this.eventListeners);
        }
    },

    /**
     * APIMethod: destroy
     * 销毁图形对象数据管理对象。
     *
     */
    destroy:function() {
        if(this.eventListeners) {
            this.events.un(this.eventListeners);
            this.eventListeners = null;
        }
        if(this.events){
            this.events.destroy();
            this.events = null;
        }

        this.url = null;
        this.libIDs = [];
        this.symbolLibs = [];
        this.symbolLibJsons = [];
        this.isInializeOK = false;
    },

    /**
     * APIMethod: initializeAsync
     * 异步初始化标号库管理对象。
     */
    initializeAsync: function(){
        if(this.isInitializeOK()){
            this.events.triggerEvent("initializeCompleted", {libIDs:this.libIDs});
        } else {
            // 获取数据成功
            function getCompleted(result){
                if(this.libIDs !== null && this.libIDs.length !== 0){
                    for(var i = 0; i < this.libIDs.length; i++){
                        var isExist = false;
                        for(var j = 0; j < result.originResult.length; j++){
                            if(this.libIDs[i] === result.originResult[j]){
                                isExist = true;
                                break;
                            }
                        }

                        if(isExist === false){
                            this.libIDs.slice(i, 1);
                        }
                    }
                } else {
                    this.libIDs = result.originResult;
                }

                this.initializeSymbolLib(0);
            }

            //获取数据失败
            function getFailed(result){
                this.libIDs = [];
            }

            //对接iserver中的服务
            var getLibIDs = new SuperMap.REST.GetLibIDsService(this.url);
            getLibIDs.events.on({
                "processCompleted": getCompleted,
                "processFailed": getFailed,
                scope: this
            });
            getLibIDs.processAsync();
        }
    },

    /**
     * Method: initializeSymbolLib
     * 初始化标号库对象。
     */
    initializeSymbolLib: function(index){
        // 获取数据成功
        function getCompleted(result){
            this.symbolLibJsons.push(result.originResult);
            this.symbolLibs.push(new SuperMap.Plot.SymbolLib({symbolLibData:result.originResult}));
            this.symbolLibs[this.symbolLibs.length-1].url = this.url;
            this.symbolLibs[this.symbolLibs.length-1].getAllSymbols();

            if(index !== this.libIDs.length-1){
                this.initializeSymbolLib(index+1);
            } else {
                this.isInializeOK = true;
                this.events.triggerEvent("initializeCompleted", {libIDs:this.libIDs});
            }
        }

        //获取数据失败
        function getFailed(result){
            if(index !== this.libIDs.length-1){
                this.libIDs.slice(index, 1);
                this.initializeSymbolLib(index);
            } else {
                this.libIDs.slice(index, 1);
                this.isInializeOK = true;
                this.events.triggerEvent("initializeCompleted", {libIDs:this.libIDs});
            }
        }

        //对接iserver中的服务
        var getlibInfoInfo = new SuperMap.REST.GetLibInfoService(this.url,{libID: this.libIDs[index]});
        getlibInfoInfo.events.on({
            "processCompleted": getCompleted,
            "processFailed": getFailed,
            scope: this
        });
        getlibInfoInfo.processAsync();
    },

    /**
     * APIMethod: isInitializeOK
     * 获取标号库管理对象是否初始化完成。
     */
    isInitializeOK: function(){
        return this.isInializeOK;
    },

    /**
     * APIMethod: getSymbolLibNumber
     * 获取当前系统中标号库数量。
     */
    getSymbolLibNumber : function(){
        return this.libIDs.length;
    },

    /**
     * APIMethod: getSymbolLibID
     * 获取指定索引的标号库标识。
     */
    getSymbolLibID : function(index){
        if(index >= this.libIDs.length){
            return -1;
        }

        return this.libIDs[index];
    },

    /**
     * APIMethod: getSymbolLibJSONInfo
     * 获取JSON格式的标号库信息。
     */
    getSymbolLibJSONInfo : function(index){
        if(index >= this.libIDs.length){
            return null;
        }

        return this.symbolLibJsons[index];
    },

    /**
     * APIMethod: getSymbolLibByIndex
     * 获取指定索引的标号库。
     */
    getSymbolLibByIndex : function(index){
        if(index >= this.libIDs.length){
            return null;
        }

        return this.symbolLibs[index];
    },

    /**
     * APIMethod: getSymbolLibByLibId
     * 获取指定库标识的标号库。
     */
    getSymbolLibByLibId : function(libID){
        for(var i = 0; i < this.symbolLibs.length; i++){
            if(libID === this.symbolLibs[i].libID){
                return this.symbolLibs[i];
            }
        }

        return null;
    },

    /**
     * APIMethod: findSymbolByName
     * 根据标号名称在标号库中查询标号。
     */
    findSymbolByName : function(name){
        var symbolInfos = [];
        for(var i = 0; i < this.libIDs.length; i++){
            var symbolLib = this.getSymbolLibByLibId(this.libIDs[i]);
            var tempArr = symbolLib.querySymbolbyKey(name);
            for(var j = 0; j < tempArr.length; j++){
                symbolInfos.push(tempArr[j]);
            }
        }
        return symbolInfos;
    },

    /**
     * APIMethod: findSymbolByCode
     * 根据标号的代码在标号库中查找标号。
     */
    findSymbolByCode : function(code){
        var symbolInfos = [];
        for(var i = 0; i < this.libIDs.length; i++){
            var symbolLib = this.getSymbolLibByLibId(this.libIDs[i]);
            var tempArr = symbolLib.querySymbolbyKey(code.toString());
            for(var j = 0; j < tempArr.length; j++){
                symbolInfos.push(tempArr[j]);
            }
        }
        return symbolInfos;
    },

    CLASS_NAME: "SuperMap.Plot.SymbolLibManager"
});