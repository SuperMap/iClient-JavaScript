import {LayerInfoService} from '../../../src/mapboxgl/services/LayerInfoService';
import {SetLayerStatusParameters} from '../../../src/common/iServer/SetLayerStatusParameters';
import {SetLayersInfoParameters} from '../../../src/common/iServer/SetLayersInfoParameters';
import {SetLayerInfoParameters} from '../../../src/common/iServer/SetLayerInfoParameters';
import {LayerStatus} from '../../../src/common/iServer/LayerStatus';
import '../../resources/LayersInfo'

var url = GlobeParameter.WorldURL + "%20Map";
var options = {
    serverType: 'iServer'
};
var id;
describe('mapboxgl_LayerInfoService', () => {
    var serviceResult;
    var originalTimeout;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    //获取图层信息服务
    it('getLayersInfo', (done) => {
        var service = new LayerInfoService(url, options);
        service.getLayersInfo((result) => {
            serviceResult = result
        });
        setTimeout(() => {
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("processCompleted");
                expect(serviceResult.result.type).toBe("UGC");
                expect(serviceResult.result.visible).toBe(true);
                expect(serviceResult.result.bounds).not.toBeNull();
                expect(serviceResult.result.name).toEqual("World Map");
                var layers = serviceResult.result.subLayers.layers;
                expect(layers.length).toBe(14);
                expect(layers[0].caption).toEqual("continent_T@World");
                expect(layers[0].datasetInfo.dataSourceName).toEqual("World");
                expect(layers[0].datasetInfo.name).toEqual("continent_T");
                expect(layers[0].datasetInfo.type).toEqual("TEXT");
                expect(layers[0].name).toEqual(layers[0].caption);
                done();
            } catch (e) {
                console.log("'getLayersInfo'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 5000)
    });

    //子图层显示控制服务
    it('setLayerStatus', (done) => {
        var layerStatus = [new LayerStatus({
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
        var setLayerStatusParameters = new SetLayerStatusParameters({
            //获取或设置图层可见状态
            layerStatusList: layerStatus,
            //获取或设置资源在服务端保存的时间
            holdTime: 15
            //获取或设置资源服务 ID
            //resourceID:"46ce0e03314040d8a4a2060145d142d7_722ef5d56efe4faa90e03e81d96a7547"
        });
        var layerService = new LayerInfoService(url, options);
        layerService.setLayerStatus(setLayerStatusParameters, (result) => {
            serviceResult = result;
        });
        setTimeout(() => {
            try {
                expect(layerService).not.toBeNull();
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
    it('setLayersInfo_newTempLayer', (done) => {
        var layers = layersInfo;
        var setLayersInfoParameters = new SetLayersInfoParameters({
            isTempLayers: false,
            resourceID: null,
            layersInfo: layers
        });
        var service = new LayerInfoService(url);
        service.setLayersInfo(setLayersInfoParameters, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
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
    it('setLayersInfo_isTempLayer', (done) => {
        var layers = layersInfo;
        layers.description = "test";
        var setLayersInfoParameters = new SetLayersInfoParameters({
            isTempLayers: true,
            resourceID: id,
            layersInfo: layers
        });
        var service = new LayerInfoService(url);
        service.setLayersInfo(setLayersInfoParameters, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
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
    it('setLayerInfo', (done) => {
        var layers = layerInfo;
        layers.description = "this is a test";
        var setLayerInfoParameters = new SetLayerInfoParameters({
            tempLayerName: "continent_T@World.1@@World Map",
            resourceID: id,
            layerInfo: layers
        });
        var service = new LayerInfoService(url);
        service.setLayerInfo(setLayerInfoParameters, (result) => {
            serviceResult = result
        });
        setTimeout(() => {
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
        }, 8000);
    });
});
                 
