import {SetLayersInfoService} from '../../../src/common/iServer/SetLayersInfoService';
import '../../resources/LayersInfo';
import {FetchRequest} from '../../../src/common/util/FetchRequest';

var url = "http://supermap:8090/iserver/services/map-world/rest/maps/World";
var setLayersFailedEventArgsSystem = null, setLayersEventArgsSystem = null;
var setLayersInfoCompleted = (setLayersInfoArgs) => {
    setLayersEventArgsSystem = setLayersInfoArgs;
};
var setLayersFailed = (serviceFailedEventArgs) => {
    setLayersFailedEventArgsSystem = serviceFailedEventArgs;
};
var options = {
    eventListeners: {
        "processCompleted": setLayersInfoCompleted,
        'processFailed': setLayersFailed
    },
    isTempLayers: false
};
var initSetLayersInfoService = () => {
    return new SetLayersInfoService(url, options);
};

describe('SetLayersInfoService', () => {
    var originalTimeout;
    var id;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        setLayersFailedEventArgsSystem = null;
        setLayersEventArgsSystem = null;
    });

    //新建临时图层
    it('setNewTempLayer', (done) => {
        var layers = layersInfo;
        var setLayersInfoService = initSetLayersInfoService();
        expect(setLayersInfoService).not.toBeNull();
        expect(setLayersInfoService.url).toEqual(url);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/tempLayersSet.json?");
            var expectParams = "[{'completeLineSymbolDisplayed':false,'visible':true,'maxScale':0,'caption':null,'description':\"\",'symbolScalable':false,'subLayers':{'layers':[{'joinItems':null,'completeLineSymbolDisplayed':false,'ugcLayerType':\"VECTOR\",'displayFilter':null,'visible':true,'maxScale':1.350238165824801e-8,'fieldValuesDisplayFilter':{'fieldName':\"\",'values':[],'fieldValuesDisplayMode':\"DISABLE\"},'caption':\"continent_T@World\",'description':\"\",'symbolScalable':false,'subLayers':{},'type':\"UGC\",'datasetInfo':{'charset':null,'isReadOnly':false,'encodeType':null,'recordCount':0,'bounds':{'top':65.22103117946571,'left':-150.51082428252954,'bottom':-84.34257921576281,'leftBottom':{'x':-150.51082428252954,'y':-84.34257921576281},'right':154.27853258850513,'rightTop':{'x':154.27853258850513,'y':65.22103117946571}},'name':\"continent_T\",'isFileCache':false,'description':null,'prjCoordSys':null,'type':\"TEXT\",'dataSourceName':\"World\",'tableName':null},'queryable':false,'opaqueRate':100,'minVisibleGeometrySize':0.4,'name':\"continent_T@World\",'bounds':{'top':65.22103117946571,'left':-150.51082428252954,'bottom':-84.34257921576281,'leftBottom':{'x':-150.51082428252954,'y':-84.34257921576281},'right':154.27853258850513,'rightTop':{'x':154.27853258850513,'y':65.22103117946571}},'style':{'fillGradientOffsetRatioX':0,'markerSize':2.4,'fillForeColor':{'red':208,'green':255,'blue':240,'alpha':255},'fillGradientOffsetRatioY':0,'markerWidth':0,'markerAngle':0,'fillSymbolID':0,'lineColor':{'red':0,'green':128,'blue':0,'alpha':255},'markerSymbolID':0,'lineWidth':0.1,'markerHeight':0,'fillOpaqueRate':100,'fillBackOpaque':true,'fillBackColor':{'red':255,'green':255,'blue':255,'alpha':255},'fillGradientMode':\"NONE\",'lineSymbolID':0,'fillGradientAngle':0},'displayOrderBy':null,'symbolScale':0,'minScale':3.3755954145620026e-9,'representationField':\"\",'colorDictionary':null}]},'type':\"UGC\",'queryable':false,'opaqueRate':100,'minVisibleGeometrySize':0,'name':\"World Map\",'bounds':{'top':118.05408801141,'left':-180,'bottom':-90,'leftBottom':{'x':-180,'y':-90},'right':180,'rightTop':{'x':180,'y':118.05408801141}},'symbolScale':0,'minScale':0,'ugcLayerType':\"VECTOR\",'object':null}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"postResultType\":\"CreateChild\",\"newResourceID\":\"9e195daff6974da6b366eb37c97e5ad9_a932e5360977478596dfa4cfd9936d53\",\"succeed\":true,\"newResourceLocation\":\"http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/9e195daff6974da6b366eb37c97e5ad9_a932e5360977478596dfa4cfd9936d53.json\"}";
            return Promise.resolve(new Response(escapedJson));
        });
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setLayersInfoService.processAsync(layers);
        setTimeout(() => {
            expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = setLayersEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            expect(serviceResult.postResultType).toEqual("CreateChild");
            expect(serviceResult.newResourceLocation).not.toBeNull();
            expect(serviceResult.newResourceID).not.toBeNull();
            id = serviceResult.newResourceID;
            setLayersInfoService.destroy();
            done();
        }, 1000)
    });

    //修改临时图层的信息 isTempLayers=true
    it('setLayersInfo_isTempLayer', (done) => {
        var setLayersInfoService = new SetLayersInfoService(url, {
            eventListeners: {
                "processCompleted": setLayersInfoCompleted,
                'processFailed': setLayersFailed
            },
            isTempLayers: true,
            resourceID: id
        });
        var layers = layersInfo;
        layers.description = "test";
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('PUT');
            expect(testUrl).toBe(url + "/tempLayersSet/" + id + ".json?");
            var expectParams = "[{'completeLineSymbolDisplayed':false,'visible':true,'maxScale':0,'caption':null,'description':\"test\",'symbolScalable':false,'subLayers':{'layers':[{'joinItems':null,'completeLineSymbolDisplayed':false,'ugcLayerType':\"VECTOR\",'displayFilter':null,'visible':true,'maxScale':1.350238165824801e-8,'fieldValuesDisplayFilter':{'fieldName':\"\",'values':[],'fieldValuesDisplayMode':\"DISABLE\"},'caption':\"continent_T@World\",'description':\"\",'symbolScalable':false,'subLayers':{},'type':\"UGC\",'datasetInfo':{'charset':null,'isReadOnly':false,'encodeType':null,'recordCount':0,'bounds':{'top':65.22103117946571,'left':-150.51082428252954,'bottom':-84.34257921576281,'leftBottom':{'x':-150.51082428252954,'y':-84.34257921576281},'right':154.27853258850513,'rightTop':{'x':154.27853258850513,'y':65.22103117946571}},'name':\"continent_T\",'isFileCache':false,'description':null,'prjCoordSys':null,'type':\"TEXT\",'dataSourceName':\"World\",'tableName':null},'queryable':false,'opaqueRate':100,'minVisibleGeometrySize':0.4,'name':\"continent_T@World\",'bounds':{'top':65.22103117946571,'left':-150.51082428252954,'bottom':-84.34257921576281,'leftBottom':{'x':-150.51082428252954,'y':-84.34257921576281},'right':154.27853258850513,'rightTop':{'x':154.27853258850513,'y':65.22103117946571}},'style':{'fillGradientOffsetRatioX':0,'markerSize':2.4,'fillForeColor':{'red':208,'green':255,'blue':240,'alpha':255},'fillGradientOffsetRatioY':0,'markerWidth':0,'markerAngle':0,'fillSymbolID':0,'lineColor':{'red':0,'green':128,'blue':0,'alpha':255},'markerSymbolID':0,'lineWidth':0.1,'markerHeight':0,'fillOpaqueRate':100,'fillBackOpaque':true,'fillBackColor':{'red':255,'green':255,'blue':255,'alpha':255},'fillGradientMode':\"NONE\",'lineSymbolID':0,'fillGradientAngle':0},'displayOrderBy':null,'symbolScale':0,'minScale':3.3755954145620026e-9,'representationField':\"\",'colorDictionary':null}]},'type':\"UGC\",'queryable':false,'opaqueRate':100,'minVisibleGeometrySize':0,'name':\"World Map\",'bounds':{'top':118.05408801141,'left':-180,'bottom':-90,'leftBottom':{'x':-180,'y':-90},'right':180,'rightTop':{'x':180,'y':118.05408801141}},'symbolScale':0,'minScale':0,'ugcLayerType':\"VECTOR\",'object':null}]";
            expect(params).toBe(expectParams);
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":true}";
            return Promise.resolve(new Response(escapedJson));
        });
        setLayersInfoService.events.on({"processCompleted": setLayersInfoCompleted});
        setLayersInfoService.processAsync(layers);
        setTimeout(() => {
            expect(setLayersEventArgsSystem.type).toEqual("processCompleted");
            var serviceResult = setLayersEventArgsSystem.result;
            expect(serviceResult).not.toBeNull();
            expect(serviceResult.succeed).toBeTruthy();
            setLayersInfoService.destroy();
            done();
        }, 1000)
    });

    //失败事件
    it('failedEvent', (done) => {
        var wrongLayerInfo = layerInfo;
        var setLayersInfoService = new SetLayersInfoService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl, params, options) => {
            expect(method).toBe('POST');
            expect(testUrl).toBe(url + "/tempLayersSet.json?");
            expect(options).not.toBeNull();
            var escapedJson = "{\"succeed\":false,\"error\":{\"code\":500,\"errorMsg\":\"Index:0不在（0，-1）范围之内。\"}}";
            return Promise.resolve(new Response(escapedJson));
        });
        setLayersInfoService.events.on({"processFailed": setLayersFailed});
        setLayersInfoService.processAsync(wrongLayerInfo);
        setTimeout(() => {
            expect(setLayersEventArgsSystem).toBeNull();
            expect(setLayersFailedEventArgsSystem).not.toBeNull();
            expect(setLayersFailedEventArgsSystem.type).toEqual("processFailed");
            expect(setLayersFailedEventArgsSystem.error.code).toEqual(500);
            expect(setLayersFailedEventArgsSystem.error.errorMsg).toBe("Index:0不在（0，-1）范围之内。");
            setLayersInfoService.destroy();
            done();
        }, 1000)
    });
});