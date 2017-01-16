/**
 * Created by Administrator on 2016/5/6.
 */
libID = 421;
libName = "警用标号";
count = 140;
code = 30101;
IconUrl = "http://localhost:8090/iserver/output/SymbolIcon/";
module('SymbolLib');

var symbolLibData = {
    "algoCount": 11,
    "classFication": "",
    "createTime": "",
    "creator": "",
    "dotCount": 0,
    "libID": 22,
    "modifyTime": "",
    "rootSymbolIconUrl": "http://localhost:8090/iserver/output/SymbolIcon/",
    "rootSymbolLibNode": {
        "childNodeCount": 11,
        "childNodes": [
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1001,
                "symbolName": "平行平耳箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1002,
                "symbolName": "多箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1003,
                "symbolName": "梯形平耳箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1004,
                "symbolName": "贝塞尔尖耳箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1005,
                "symbolName": "普通贝塞尔箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1006,
                "symbolName": "钳击箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1007,
                "symbolName": "折线空三角箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1008,
                "symbolName": "贝塞尔燕尾箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1009,
                "symbolName": "普通折线箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1010,
                "symbolName": "贝塞尔尖耳燕尾箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            },
            {
                "childNodeCount": 0,
                "childNodes": [],
                "libID": 22,
                "symbolCode": 1011,
                "symbolName": "贝塞尔尖耳单点箭头",
                "symbolNodeType": "SYMBOL_NODE",
                "symbolType": "SYMBOL_ALGO"
            }
        ],
        "libID": 22,
        "symbolCode": 100000,
        "symbolName": "常用标号",
        "symbolNodeType": "SYMBOL_GROUP",
        "symbolType": "SYMBOL_DOT"
    },
    "symbolCount": 11,
    "symbolLibName": "常用标号",
    "version": ""
};

//var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
//function getSymbolLibManager(complete) {
//    var map = new SuperMap.Map("map");
//    var plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);
//    plotting.setMap(map);
//    symbolLibManager = plotting.getSymbolLibManager();
//    symbolLibManager.events.on({"initializeCompleted": complete});
//    symbolLibManager.initializeAsync();
//}

test("testSymbolLib_Constructor", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.CLASS_NAME, "SuperMap.Plot.SymbolLib", "Property.CLASS_NAME");
    equal(symbolLib.libID, symbolLibData.libID, "Property.libID");
    equal(symbolLib.symbolLibData, symbolLibData, "Property.symbolLibData");

    symbolLib.destroy();
});

test("testSymbolLib_Destroy", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.CLASS_NAME, "SuperMap.Plot.SymbolLib", "Property.CLASS_NAME");
    equal(symbolLib.libID, symbolLibData.libID, "Property.libID");
    equal(symbolLib.symbolLibData, symbolLibData, "Property.symbolLibData");

    symbolLib.destroy();
    ok(symbolLib !== null, "not null");
    ok(symbolLib.libID === null, "symbolLib.libID");
    ok(symbolLib.symbolLibData === null, "symbolLib.symbolLibData");
});

//asyncTest("testSymbolLib_Constructor", 1, function () {
//
//    getSymbolLibManager(complete);
//    function complete() {
//        var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//        setTimeout(function () {
//            equal(symbolLib.CLASS_NAME, "SuperMap.Plot.SymbolLib", "Property:CLASS_NAME");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//    }
//});

test("testSymbolLib_getSymbolLibName", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getSymbolLibName(),symbolLibData.symbolLibName, "Function:getSymbolLibName");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getSymbolLibName", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var symbolLibName = symbolLib.getSymbolLibName();
//            equal(symbolLibName,libName, "Function:getSymbolLibName");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//    }
//});

test("testSymbolLib_getSymbolLibID", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getSymbolLibID(),symbolLibData.libID, "Function:getSymbolLibID");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getSymbolLibID", 1, function () {
//    getSymbolLibManager(complete);
//
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var getLibId = symbolLib.getSymbolLibID();
//            equal(getLibId,libID, "Function:getSymbolLibID");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//    }
//});

test("testSymbolLib_getSymbolCount", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getSymbolCount(),symbolLibData.symbolCount, "Function:getSymbolCount");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getSymbolCount", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var SymbolCount = symbolLib.getSymbolCount();
//            equal(SymbolCount,count, "Function:getSymbolCount");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//    }
//});

test("testSymbolLib_getClassFication", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getClassFication(),symbolLibData.classFication, "Function:getClassFication");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getClassFication", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var Fication = symbolLib.getClassFication();
//            equal(Fication,"", "Function:getClassFication");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//
//    }
//
//});

test("testSymbolLib_getCreator", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getCreator(),symbolLibData.creator, "Function:getCreator");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getCreator", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var Creator = symbolLib.getCreator();
//            equal(Creator,"", "Function:getCreator");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//
//    }
//});

test("testSymbolLib_getModifyTime", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getModifyTime(),symbolLibData.modifyTime, "Function:getModifyTime");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getModifyTime", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var modifyTime = symbolLib.getModifyTime();
//            equal(modifyTime,"", "Function:getModifyTime");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//
//    }
//});

test("testSymbolLib_getRootSymbolIconUrl", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getRootSymbolIconUrl(),symbolLibData.rootSymbolIconUrl, "Function:getRootSymbolIconUrl");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getRootSymbolIconUrl", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var rootSymbolIconUrl = symbolLib.getRootSymbolIconUrl();
//            equal(rootSymbolIconUrl,IconUrl, "Function:getRootSymbolIconUrl");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//    }
//});

test("testSymbolLib_getVersion", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getVersion(),symbolLibData.version, "Function:getVersion");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getVersion", 1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var version = symbolLib.getVersion();
//            equal(version,"", "Function:getVersion");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//
//    }
//});

test("testSymbolLib_getRootSymbolInfo", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    equal(symbolLib.getRootSymbolInfo(),symbolLibData.rootSymbolLibNode, "Function:getRootSymbolInfo");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_getRootSymbolInfo", 3, function () {
//
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var info = symbolLib.getRootSymbolInfo();
//            equal(info.libID, libID, "Property:libID");
//            equal(info.symbolNodeType, "SYMBOL_GROUP", "Property:symbolNodeType");
//            equal(info.symbolType, "SYMBOL_DOT", "Property:symbolType");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//
//    }
//});

test("testSymbolLib_querySymbol", function () {
    var symbolLib = new SuperMap.Plot.SymbolLib({symbolLibData:symbolLibData});
    var info = symbolLib.querySymbolbyKey("1006");
    equal(info[0].symbolName, "钳击箭头", "Property:libID");
    var info = symbolLib.querySymbolbyKey("钳击箭头");
    equal(info[0].symbolCode, "1006", "Property:symbolName");
    symbolLib.destroy();
});

//asyncTest("testSymbolLib_querySymbol",1, function () {
//    getSymbolLibManager(complete);
//    function complete() {
//        setTimeout(function () {
//            var symbolLib = symbolLibManager.getSymbolLibByIndex(0);
//            var info = symbolLib.querySymbolbyKey("30101");
//            equal(info[0].symbolName, "大型广场", "Property:libID");
//            start();
//            symbolLibManager.events.un({"initializeCompleted": complete});
//        }, 100);
//    }
//});