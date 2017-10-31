require('../../../src/openlayers/services/LayerInfoService');
require('../../resources/LayersInfo');
var url = GlobeParameter.WorldURL;
var options = {
    serverType: 'iServer'
};
var id;
describe('openlayers_LayerInfoService', function () {
    var serviceResult;
    var originalTimeout;
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //获取图层信息服务
    it('getLayersInfo', function (done) {
        var layerService = new ol.supermap.LayerInfoService(url, options);
        layerService.getLayersInfo(function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(layerService).not.toBeNull();
                expect(layerService.options.serverType).toBe('iServer');
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.type).toBe("UGC");
                expect(serviceResult.result.visible).toBe(true);
                expect(serviceResult.result.bounds).not.toBeNull();
                expect(serviceResult.result.completeLineSymbolDisplayed).toBe(false);
                expect(serviceResult.result.name).toEqual("World");
                var layers = serviceResult.result.subLayers.layers;
                expect(layers.length).toBe(16);
                expect(layers[2].caption).toEqual("Captial_CH");
                expect(layers[2].name).toEqual("Capitals@World#3");
                for (var i = 0; i < layers.length; i++) {
                    expect(layers[i].type).toEqual("UGC");
                    expect(layers[i].CLASS_NAME).toContain("SuperMap");
                    expect(layers[i].caption).not.toBeNull();
                    expect(layers[i].bounds).not.toBeNull();
                    expect(layers[i].datasetInfo.CLASS_NAME).toContain("SuperMap");
                    expect(layers[i].datasetInfo.dataSourceName).toEqual("World");
                    expect(layers[i].datasetInfo.name).not.toBeNull();
                    expect(layers[i].datasetInfo.type).not.toBeNull();
                    expect(layers[i].fieldValuesDisplayFilter.fieldValuesDisplayMode).not.toBeNull();
                    expect(layers[i].ugcLayerType).not.toBeNull();
                }
                done();
            } catch (exception) {
                console.log("'getLayersInfo'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //子图层显示控制服务
    it('setLayerStatus', function (done) {
        var layerStatus = [new SuperMap.LayerStatus({
            layerName: "continent_T@World",
            isVisible: true,
            //图层显示 SQL 过滤条件
            displayFilter: null, /*"type='LINE'"*/
            //图层要素的显示和隐藏的过滤属性
            fieldValuesDisplayFilter: {
                values: [0.4],//要过滤的值 0.4
                fieldName: "minVisibleGeometrySize",//要过滤的字段名称 只支持数字类型的字段 minVisibleGeometrySize
                fieldValuesDisplayMode: "DISABLE"//为DISPLAY时，表示只显示以上设置的相应属性值的要素
            }
        })];
        var setLayerStatusParameters = new SuperMap.SetLayerStatusParameters({
            //获取或设置图层可见状态
            layerStatusList: layerStatus,
            //获取或设置资源在服务端保存的时间
            holdTime: 15
            //获取或设置资源服务 ID
            //resourceID:"46ce0e03314040d8a4a2060145d142d7_722ef5d56efe4faa90e03e81d96a7547"
        });
        var layerInfoService = new ol.supermap.LayerInfoService(url, options);
        layerInfoService.setLayerStatus(setLayerStatusParameters, function (result) {
            serviceResult = result;
        });
        setTimeout(function () {
            try {
                expect(layerInfoService).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toBe(true);
                expect(serviceResult.result.resourceID).not.toBeNull();
                done();

            } catch (exception) {
                console.log("'setLayerStatus'案例失败" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });

    //新建临时图层   isTempLayers=false
    it('setLayersInfo_newTempLayer', function (done) {
        var layers = layersInfo;
        var setLayersInfoParameters = new SuperMap.SetLayersInfoParameters({
            isTempLayers: false,
            layersInfo: layers
        });
        var service = new ol.supermap.LayerInfoService(url);
        service.setLayersInfo(setLayersInfoParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.postResultType).toEqual("CreateChild");
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                expect(serviceResult.result.newResourceID).not.toBeNull();
                id = serviceResult.result.newResourceID;
                done();
            } catch (e) {
                console.log("'setLayersInfo_newTempLayer'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //修改临时图层的信息 isTempLayers=true
    it('setLayersInfo_isTempLayer', function (done) {
        var layers = layersInfo;
        layers.description = "test";
        var setLayersInfoParameters = new SuperMap.SetLayersInfoParameters({
            isTempLayers: true,
            resourceID: id,
            layersInfo: layers
        });
        var service = new ol.supermap.LayerInfoService(url);
        service.setLayersInfo(setLayersInfoParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.object.resourceID).toEqual(id);
                expect(serviceResult.object.options.method).toEqual("PUT");
                expect(serviceResult.object.options.data).toContain("'description':\"test\"");
                done();
            } catch (e) {
                console.log("'setLayersInfo_isTempLayer'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //设置图层信息服务  并实现临时图层中子图层的修改
    it('setLayerInfo', function (done) {
        var layers = layerInfo;
        layers.description = "this is a test";
        var setLayerInfoParameters = new SuperMap.SetLayerInfoParameters({
            tempLayerName: "continent_T@World.1@@World Map",
            resourceID: id,
            layerInfo: layers
        });
        var service = new ol.supermap.LayerInfoService(url);
        service.setLayerInfo(setLayerInfoParameters, function (result) {
            serviceResult = result
        });
        setTimeout(function () {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.object.options.method).toEqual("PUT");
                expect(serviceResult.object.options.data).toContain("this is a test");
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.succeed).toEqual(true);
                expect(serviceResult.result.newResourceLocation).not.toBeNull();
                done();
            } catch (e) {
                console.log("'setLayerInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000);
    });
});