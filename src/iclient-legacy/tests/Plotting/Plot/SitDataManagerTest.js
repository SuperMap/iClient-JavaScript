/**
 * Created by Administrator on 2016/5/6.
 */
module('SitDataManager');

var map, plottingLayer, plottingEdit, sitManager, plotting;
var savename = "forSaveTest";
var libID_1 = 421, code_1 = 11, code_2 = 43, code_3 = 49, symbolname = "警用码头";

function init(sucess) {
    map = new SuperMap.Map("map");
    var baselayer = new SuperMap.Layer.TiledDynamicRESTLayer("World", GlobeParameter.WorldURL, null, {maxResolution: "auto"});
    baselayer.events.on({"layerInitialized": addLayer});
    plottingLayer = new SuperMap.Layer.PlottingLayer("标绘图层", GlobeParameter.plotUrl);
    plotting = SuperMap.Plotting.getInstance(map, GlobeParameter.plotUrl);
    sitManager = plotting.getSitDataManager();
    function addLayer() {
        map.addLayers([baselayer, plottingLayer]);
        map.setCenter(new SuperMap.LonLat(0, 0), 0);
        plottingEdit = new SuperMap.Control.PlottingEdit(plottingLayer);
        map.addControls([plottingEdit]);
        //标绘标号
        //plotSymbol(sucess);
        var Points = [];
        Points.push(new SuperMap.Geometry.Point(40, 0));
        plottingLayer.createSymbolWC(libID_1, code_1, Points, sucess);

        plottingEdit.activate();
    }
}

test("testSitDataManager_Constructor", function () {
    var map = new SuperMap.Map("map");
    var manager = new SuperMap.Plot.SitDataManager(map, GlobeParameter.plotUrl);
    equal(manager.CLASS_NAME, "SuperMap.Plot.SitDataManager", "equal className");
    equal(manager.serverUrl, GlobeParameter.plotUrl, "equal serverUrl");
    //equal(manager.map, map, "equal map");
    manager.destroy();
    map.destroy();
});

test("testSitDataManager_Destroy", function () {
    var map = new SuperMap.Map("map");
    var manager = new SuperMap.Plot.SitDataManager(map, GlobeParameter.plotUrl);
    manager.destroy();
    equal(manager.CLASS_NAME, "SuperMap.Plot.SitDataManager", "equal className");
    ok(manager.serverUrl === null, GlobeParameter.plotUrl, "equal serverUrl");
    //ok(manager.map === null, "equal map");
    map.destroy();
});



//asyncTest("testSitDataManager_saveFile",function () {
//
//    setTimeout(function () {
//        init();
//        sitManager.saveAsSmlFile(savename);
//        sitManager.getSMLInfos(0, 10, getListSucess, getListFiled);
//
//
//        function getListSucess(result) {
//            for (var i = 0; i < result.length; i++) {
//                var name = result[i].smlFileName;
//                if (name === savename) {
//                    equal(name, savename, "saveFile");
//                    break;
//                }
//            }
//            start();
//        }
//
//        function getListFiled(result) {
//        }
//    }, 800);
//});

//asyncTest("testSitDataManager_getGObjectByName", function () {
//    setTimeout(function () {
//        var list = sitManager.getGObjectByName(symbolname);
//        equal(list.length > 0, true, "getGObjectByName");
//        start();
//
//    }, 800);
//
//
//});
//asyncTest("testSitDataManager_getGObjectByCode", function () {
//    setTimeout(function () {
//        var list = sitManager.getGObjectByCode(libID_1, code_1);
//        equal(list.length > 0, true, "getGObjectByCode");
//        start();
//    }, 800);
//
//
//});
//asyncTest("testSitDataManager_createSymbol",function () {
//    var Points = [];
//    Points.push(new SuperMap.Geometry.Point(40, 10));
//    function failed() {
//
//    }
//    var list = sitManager.createSymbol(libID_1, code_2, Points);
//    function sucess( feature ) {
//
//        equal(list.length > 0, true, "createSymbol");
//        start();
//    }
//
//    sitManager.createSymbol(libID_1, code_2, Points, sucess, failed);
//
//});
//test("testSitDataManager_createSymbolWC", 0, function () {
//    setTimeout(function () {
//        var Points = [];
//
//        Points.push(new SuperMap.Geometry.Point(0, 0));
//
//        var feature = sitManager.createSymbolWC(libID_1, code_3, Points, sucess, failed);
//
//        function failed() {
//
//        }
//
//        function sucess(result) {
//            var list = sitManager.getGObjectByCode(libID_1, code_3);
//            equal(list.length > 0, true, "createSymbolWC");
//            start();
//        }
//
//    }, 800);
//    //map.destroy();
//    //layer.destroy();
//    //plottingLayer.destroy();
//});
//asyncTest("testSitDataManager_createText", 0, function () {
//    setTimeout(function () {
//        try{
//            var locationPoints = new SuperMap.Geometry.Point(100, 200);
//            sitManager.createText("createText", locationPoints, {});
//            equal(true, true, "createText");//待定
//            start();
//        } catch(exception){
//            ok(false, "exception occcurs,message is:" + excepion.message)
//            start();
//        } finally {
//            map.destroy();
//        }
//
//    }, 800);
//});
//
//asyncTest("testSitDataManager_createTextWC",function () {
//    setTimeout(function () {
//        var locationPoints = new SuperMap.Geometry.Point(10, 20);
//        sitManager.createTextWC("createTextWC", locationPoints, {});
//        equal(true, true, "createTextWC");//待定
//        start();
//
//    }, 800);
//
//});


