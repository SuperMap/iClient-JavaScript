/**
 *
 * Class: SuperMap.Plot.SymbolLib
 * 标号库对象类。<SuperMap.Plot.SymbolLibManager> 初始化完成后，标号库就可以直接获取使用了。
 * 如果没有通过 <SuperMap.Plot.SymbolLibManager> 去获取标号库，则标号库的使用方法如下：
 * (start code)
 * var symbolLib = new SuperMap.Plot.SymbolLib({"url":url, "libID":libID});
 * symbolLib.events.on({
 *     "symbolLibInitializeSuccess": symbolLibInitializeSuccess,
 *     "symbolLibInitializeFail": symbolLibInitializeFail
 * });
 * symbolLib.initializeAsync();
 * (end)
 * 或者可以直接用标号库数据去初始化
 * (start code)
 * var symbolLib = new SuperMap.Plot.SymbolLib({"symbolLibData":symbolLibData});
 * (end)
 */

SuperMap.Plot.SymbolLib = new SuperMap.Class({

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *initializeCompleted* 标号库初始化完成触发该事件。
     */
    EVENT_TYPES: ["symbolLibInitializeSuccess", "symbolLibInitializeFail"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 SymbolLib 类中支持 symbolLibInitializeSuccess 、symbolLibInitializeFail 事件。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 SymbolLib 支持对事件 symbolLibInitializeSuccess 、symbolLibInitializeFail 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * APIProperty: url
     * 标绘服务地址。
     */
    url: null,

    /**
     * APIProperty: libID
     * 标号库ID。
     */
    libID: null,

    /**
     * APIProperty: symbolLibData
     * 标号库对应的JSON数据。
     */
    symbolLibData: null,

    /**
     * APIProperty: initCount
     * 初始化标号计数。
     */
    initCount: 0,

    /**
     * Constructor: SuperMap.Plot.SymbolLib
     * 标号库类。
     *
     * Parameters:
     * options - {Object} 此类与父类提供的属性。url、libID和symbolLibData是对象的三个成员，url和libID配合使用去服务器获取数据，或者直接传入symbolLibData标号库数据
     *
     * Returns:
     * {<SuperMap.Plot.SymbolLib>}  结果类型对象。
     */
    initialize : function(options){
        if(options && options.url && options.libID){
            this.url = options.url;
            this.libID = options.libID;
        } else if(options && options.symbolLibData){
            this.symbolLibData = options.symbolLibData;
            this.libID = this.symbolLibData.libID;
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
        this.libID = null;
        this.symbolLibData = null;
    },

    initializeAsync : function(){
        // 获取数据成功
        function getCompleted(result){
            this.symbolLibData = result.originResult;
            this.libID = this.symbolLibData.libID;
            this.triggerEvent("symbolLibInitializeSuccess");
        }

        //获取数据失败
        function getFailed(result){
            this.libID = -1;
            this.triggerEvent("symbolLibInitializeFail");
        }

        //对接iserver中的服务
        var getlibInfoInfo = new SuperMap.REST.GetLibInfoService(this.url,{libID: this.libID});
        getlibInfoInfo.events.on({
            "processCompleted": getCompleted,
            "processFailed": getFailed,
            scope: this
        });
        getlibInfoInfo.processAsync();
    },

    /**
     * APIMethod: getSymbolLibName
     * 获取标号库名称。
     */
    getSymbolLibName : function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.symbolLibName;
    },

    /**
     * APIMethod: getAllSymbols
     * 获取所有标号
     */
    getAllSymbols : function(){
        if(this.symbolLibData === null){
            return null;
        }

        this.getSymbols(this.symbolLibData.rootSymbolLibNode);
    },

    /**
     * APIMethod: getAllSymbols
     * 获取所有标号
     */
    getSymbols : function(symbolNode){
        for(var i = 0; i < symbolNode.childNodeCount; ){
            if(symbolNode.childNodes[i].symbolNodeType === "SYMBOL_GROUP"){
                this.getSymbols(symbolNode.childNodes[i]);
                i++;
            } else if(symbolNode.childNodes[i].symbolNodeType === "SYMBOL_NODE" &&
                symbolNode.childNodes[i].symbolType === "SYMBOL_DOT"){
                // 获取数据成功
                function getCompleted(result){
                    SuperMap.Plot.SymbolLib.dotSymbols.push(result.originResult);
                }

                //获取数据失败
                function getFailed(result){
                }

                this.nowTime = new Date().getTime();

                if(this.lastTime === undefined || this.nowTime - this.lastTime >= 1){
                    //对接iserver中的服务
                    var getSymbolInfo = new SuperMap.REST.GetSymbolInfoService(this.url);
                    getSymbolInfo.events.on({
                        "processCompleted": getCompleted,
                        "processFailed": getFailed
                    });

                    var getSymbolInfoParams = new SuperMap.REST.GetSymbolInfoParameters();
                    getSymbolInfoParams.libID = symbolNode.childNodes[i].libID;
                    getSymbolInfoParams.code = symbolNode.childNodes[i].symbolCode;

                    getSymbolInfo.processAsync(getSymbolInfoParams);

                    this.lastTime = new Date().getTime();

                    i++;
                }
            } else {
                i++;
            }
        }
    },

    /**
     * APIMethod: getSymbolLibID
     * 获取标号库标识
     */
    getSymbolLibID : function(){
        return this.libID;
    },

    /**
     * APIMethod: getSymbolCount
     * 获取标号的个数
     */
    getSymbolCount : function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.symbolCount;
    },

    /**
     * APIMethod: querySymbol
     * 根据关键字(名称或code)查询标号
     */
    querySymbolbyKey: function(key){
        return this.querySymbol(key, this.getRootSymbolInfo(), this.getRootSymbolIconUrl());
    },


    /**
     * APIMethod: getClassFication
     * 获得标号库的密级
     */
    getClassFication : function() {
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.classFication;
    },

    /**
     * APIMethod: getCreateTime
     * 获得标号库的创建时间
     */
    getCreateTime : function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.createTime;
    },

    /**
     * APIMethod: getCreator
     * 获取标号库的创建单位
     */
    getCreator : function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.creator;
    },

    /**
     * APIMethod: getModifyTime
     * 获取标号库的修改时间
     */
    getModifyTime : function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.modifyTime;
    },

    /**
     * APIMethod: getRootSymbolIconUrl
     * 获得标号Icon根目录的Url
     */
    getRootSymbolIconUrl : function() {
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.rootSymbolIconUrl;
    },

    /**
     * APIMethod: getVersion
     * 获取标号库的版本信息
     */
    getVersion : function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.version;
    },

    /**
     * APIMethod: getRootSymbolInfo
     * 获取标号库的根节点信息
     */
    getRootSymbolInfo: function(){
        if(this.symbolLibData === null){
            return null;
        }

        return this.symbolLibData.rootSymbolLibNode;
    },

    /**
     * Method: querySymbol
     * 根据关键字查询标号
     */
    querySymbol: function(strKey, symbolInfo, parentPath){
        var queryResult = [];
        if(symbolInfo.symbolNodeType === "SYMBOL_GROUP")
        {
            for(var i = 0; i < symbolInfo.childNodes.length; i++)
            {
                var childParentPath = parentPath + "/" + symbolInfo.symbolName;
                var result = this.querySymbol(strKey, symbolInfo.childNodes[i], childParentPath);
                for(var j = 0; j < result.length; j++)
                {
                    queryResult.push(result[j]);
                }
            }

        }
        else
        {
            if(strKey === symbolInfo.symbolCode.toString()) {
                symbolInfo.icon = parentPath + "/" + symbolInfo.symbolCode + ".png";
                queryResult.push(symbolInfo);
            }
            else
            {
                if(-1 !== symbolInfo.symbolName.indexOf(strKey)) {
                    symbolInfo.icon = parentPath + "/" + symbolInfo.symbolCode + ".png";
                    queryResult.push(symbolInfo)
                }
            }
        }

        return queryResult;
    },

    CLASS_NAME: "SuperMap.Plot.SymbolLib"
});

SuperMap.Plot.SymbolLib.dotSymbols = [];