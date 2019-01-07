import { tiledMapLayer } from "../../../../src/leaflet/mapping";
import { distributedAnalysisView } from '../../../../src/leaflet/widgets/distributedanalysis/DistributedAnalysisView';
import { FetchRequest } from "../../../../src/common/util/FetchRequest.js";
var map, url = GlobeParameter.WorldURL, testDiv, distributedAnalysis;
var distributedAnalysisURL = GlobeParameter.distributedAnalysisURL;
describe('leaflet_distributedanalysis_DistributedAnalysisView', () => {
    var serviceResult;
    var originalTimeout;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.id = 'map';
        testDiv.style.margin = "0 auto";
        testDiv.style.width = "800px";
        testDiv.style.height = "1079px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: [20, 80],
            maxZoom: 18,
            zoom: 2
        });
        // tiledMapLayer(url).addTo(map);
        // 初始化微件
        distributedAnalysis = distributedAnalysisView(distributedAnalysisURL);
        // 模拟发送请求
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            if (url.indexOf("/sharefile") > -1) {
                var resultJson1 = `{"datasetCount":8,"datasetNames":["samples_processing_newyorkZone_R","samples_processing_singleRegion_R","samples_processing_newyorkRoads_L","samples_processing_newyorkPoint_P","samples_processing_newyorkResidential_R", "samples_processing_featurejoin_states_R", "samples_processing_reconstructTracks_P", "samples_newyork_taxi_2013-01_14k"],
                "childUriList":["http://54.223.164.155:8090/iserver/services/dataca…atalog/sharefile/samples_processing_newyorkZone_R", "http://54.223.164.155:8090/iserver/services/dataca…talog/sharefile/samples_processing_singleRegion_R", "http://54.223.164.155:8090/iserver/services/dataca…talog/sharefile/samples_processing_newyorkRoads_L", "http://54.223.164.155:8090/iserver/services/dataca…talog/sharefile/samples_processing_newyorkPoint_P", "http://54.223.164.155:8090/iserver/services/dataca…sharefile/samples_processing_newyorkResidential_R", "http://54.223.164.155:8090/iserver/services/dataca…sharefile/samples_processing_featurejoin_states_R", "http://54.223.164.155:8090/iserver/services/dataca…/sharefile/samples_processing_reconstructTracks_P", "http://54.223.164.155:8090/iserver/services/dataca…atalog/sharefile/samples_newyork_taxi_2013-01_14k"]}`
                return Promise.resolve(new Response(resultJson1));
            } else  if (url.indexOf("/datasets.json") > -1) {
                var resultJson2 = `{"datasetCount":0,"datasetNames":[],"childUriList":[]}`;
                return Promise.resolve(new Response(resultJson2));
            } else if (url.indexOf("/samples_processing_newyorkRoads_L") > -1) {
                var dataJson = `{"childUriList":["http://54.223.164.155:8090/iserver/services/datacatalog/rest/datacatalog/sharefile/samples_processing_newyorkRoads_L//fields"],"supportAttachments":false,"supportFeatureMetadatas":false,"datasetInfo":{"fieldInfos":[{"isRequired":true,"defaultValue":"","name":"SmID","caption":"SmID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmLength","caption":"SmLength","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriW","caption":"SmSdriW","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriN","caption":"SmSdriN","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriE","caption":"SmSdriE","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriS","caption":"SmSdriS","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmUserID","caption":"SmUserID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":true,"defaultValue":"0","name":"SmTopoError","caption":"SmTopoError","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":false,"defaultValue":"0","name":"SmGeometrySize","caption":"SmGeometrySize","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"-1","name":"SmGeoPosition","caption":"SmGeoPosition","type":"INT64","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":false,"defaultValue":"","name":"name","caption":"name","type":"WTEXT","maxLength":48,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"type","caption":"type","type":"WTEXT","maxLength":16,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"length","caption":"length","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":false}],"epsgCode":4326,"datasetName":"newyorkRoads_L","bounds":"Left=-74.2552929,Bottom=40.4965145,Right=-73.69312690280937,Top=40.927416444297904","available":true,"name":"samples_processing_newyorkRoads_L","readOnly":false,"datasetType":"LINE","type":"UDB","url":"../../samples/data/ProcessingData/processing.udb"}}`;
                return Promise.resolve(new Response(dataJson));
            } else if (url.indexOf("/density/") > -1) {
                var analysisResult1 = `{"id":"5f17d37b_bde9_46aa_80ae_be090be25340","state":{"errorStackTrace":null,"endState":true,"startTime":1540369770197,"endTime":1540369781534,"publisherelapsedTime":1320,"runState":"FINISHED","errorMsg":null,"elapsedTime":9070},"setting":{"output":{"outputPath":"/home/ubuntu/iserver/supermap_iserver_910_16117_3906_linux64/webapps/iserver/processingResultData/Analyst/5f17d37b_bde9_46aa_80ae_be090be25340/kernelDensity.smwu","datasourcePath":"/home/ubuntu/iserver/supermap_iserver_910_16117_3906_linux64/webapps/iserver/processingResultData/Analyst/5f17d37b_bde9_46aa_80ae_be090be25340/1911ef66_f4cd_4ce2_a346_a079114b13dc.udb","datasetName":"analystResult","type":"UDB"},"args":null,"input":{"datasetName":"samples_processing_newyorkPoint_P","numSlices":36,"specField":null,"datasetInfo":{"fieldInfos":[{"isRequired":true,"defaultValue":"","name":"SmID","caption":"SmID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmX","caption":"SmX","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmY","caption":"SmY","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":false,"defaultValue":"1","name":"SmLibTileID","caption":"SmLibTileID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmUserID","caption":"SmUserID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"0","name":"SmGeometrySize","caption":"SmGeometrySize","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"-1","name":"SmGeoPosition","caption":"SmGeoPosition","type":"INT64","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":false,"defaultValue":"","name":"medallion","caption":"medallion","type":"WTEXT","maxLength":255,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"hack_license","caption":"hack_license","type":"WTEXT","maxLength":255,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"vecdor_id","caption":"vecdor_id","type":"WTEXT","maxLength":255,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"rate_code","caption":"rate_code","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"store_and_fwd_flag","caption":"store_and_fwd_flag","type":"WTEXT","maxLength":255,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"pickup_datetime","caption":"pickup_datetime","type":"DATETIME","maxLength":255,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"dropoff_datetime","caption":"dropoff_datetime","type":"DATETIME","maxLength":255,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"passenger_count","caption":"passenger_count","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"trip_time_in_secs","caption":"trip_time_in_secs","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"trip_distance","caption":"trip_distance","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"pickup_longitude","caption":"pickup_longitude","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"pickup_latitude","caption":"pickup_latitude","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"dropoff_longitude","caption":"dropoff_longitude","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"dropoff_latitude","caption":"dropoff_latitude","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":false}],"epsgCode":4326,"datasetName":"newyorkPoint_P","bounds":"Left=-74.342308,Bottom=40.576233,Right=-73.58014699999998,Top=40.901577","available":true,"name":"samples_processing_newyorkPoint_P","readOnly":false,"datasetType":"POINT","type":"UDB","url":"../../samples/data/ProcessingData/processing.udb"}},"DEFAULT_MASTER_ADRESS":"local[*] ","referToken":"0ra2250-rPu6ZnqHPKqcqDjGkDGDv3bg5HHy1SNNXf79OlN0ArG07bq3cGFz0v-nfBm2RAnYJ3LGBsuiptH43g..","mainClass":null,"sparkLogFile":null,"appName":null,"analyst":{"areaUnit":"SquareMile","meshType":0,"method":0,"query":"","radius":"300","fields":"rate_code","radiusUnit":"Meter","resolution":"1000","meshSizeUnit":"Meter"},"contextSetting":null,"serviceInfo":{"targetDataPath":"/home/ubuntu/iserver/supermap_iserver_910_16117_3906_linux64/webapps/iserver/processingResultData/Analyst/5f17d37b_bde9_46aa_80ae_be090be25340/kernelDensity.smwu","targetServiceInfos":[{"serviceType":"RESTMAP","serviceAddress":"http://54.223.164.155:8090/iserver/services/map-kernelDensity2/rest"},{"serviceType":"RESTDATA","serviceAddress":"http://54.223.164.155:8090/iserver/services/data-kernelDensity2/rest"}]},"referServicesAddress":"http://172.31.4.162:8090/iserver"}}`
                return Promise.resolve(new Response(analysisResult1));
            } else if (url.indexOf("/map-kernelDensity2/rest/maps") > -1) {
                var responseResult = `[{"resourceConfigID":"map","supportedMediaTypes":["application/xml","text/xml","application/json","application/fastjson","application/rjson","text/html","application/jsonp","application/x-java-serialized-object","application/ajax","application/kml","application/ifx","application/flex","application/flash","application/flash3d","application/ijs","application/javascript","application/html5","application/ol3","application/vt","application/vectortile","application/isl","application/silverlight","application/smc","application/supermapcloud","application/tdt","application/tianditu","application/ilt","application/leaflet","application/mbgl"],"path":"http://54.223.164.155:8090/iserver/services/map-kernelDensity4/rest/maps/kernelDensity_rate_code_Density_Map","name":"kernelDensity_rate_code_Density_Map","resourceType":"StaticResource"},{"resourceConfigID":"map","supportedMediaTypes":["application/xml","text/xml","application/json","application/fastjson","application/rjson","text/html","application/jsonp","application/x-java-serialized-object","application/ajax","application/kml","application/ifx","application/flex","application/flash","application/flash3d","application/ijs","application/javascript","application/html5","application/ol3","application/vt","application/vectortile","application/isl","application/silverlight","application/smc","application/supermapcloud","application/tdt","application/tianditu","application/ilt","application/leaflet","application/mbgl"],"path":"http://54.223.164.155:8090/iserver/services/map-kernelDensity2/rest/maps/kernelDensity_RecordCount_Density_Map","name":"kernelDensity_RecordCount_Density_Map","resourceType":"StaticResource"}]`;
                return Promise.resolve(new Response(responseResult));
            }else if (url.indexOf("/map-kernelDensity2/rest/maps") > -1) {
                var responseResult = `[{"resourceConfigID":"map","supportedMediaTypes":["application/xml","text/xml","application/json","application/fastjson","application/rjson","text/html","application/jsonp","application/x-java-serialized-object","application/ajax","application/kml","application/ifx","application/flex","application/flash","application/flash3d","application/ijs","application/javascript","application/html5","application/ol3","application/vt","application/vectortile","application/isl","application/silverlight","application/smc","application/supermapcloud","application/tdt","application/tianditu","application/ilt","application/leaflet","application/mbgl"],"path":"http://54.223.164.155:8090/iserver/services/map-kernelDensity4/rest/maps/kernelDensity_rate_code_Density_Map","name":"kernelDensity_rate_code_Density_Map","resourceType":"StaticResource"},{"resourceConfigID":"map","supportedMediaTypes":["application/xml","text/xml","application/json","application/fastjson","application/rjson","text/html","application/jsonp","application/x-java-serialized-object","application/ajax","application/kml","application/ifx","application/flex","application/flash","application/flash3d","application/ijs","application/javascript","application/html5","application/ol3","application/vt","application/vectortile","application/isl","application/silverlight","application/smc","application/supermapcloud","application/tdt","application/tianditu","application/ilt","application/leaflet","application/mbgl"],"path":"http://54.223.164.155:8090/iserver/services/map-kernelDensity2/rest/maps/kernelDensity_RecordCount_Density_Map","name":"kernelDensity_RecordCount_Density_Map","resourceType":"StaticResource"}]`;
                return Promise.resolve(new Response(responseResult));
            }else if(url.indexOf("samples_processing_newyorkResidential_R")){
                var responseResult={"childUriList":["http://test:8090/iserver/services/datacatalog/rest/datacatalog/sharefile/samples_processing_newyorkResidential_R//fields"],"supportAttachments":false,"supportFeatureMetadatas":false,"datasetInfo":{"fieldInfos":[{"isRequired":true,"defaultValue":"","name":"SmID","caption":"SmID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriW","caption":"SmSdriW","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriN","caption":"SmSdriN","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriE","caption":"SmSdriE","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmSdriS","caption":"SmSdriS","type":"SINGLE","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmUserID","caption":"SmUserID","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":true,"defaultValue":"0","name":"SmArea","caption":"SmArea","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"0","name":"SmPerimeter","caption":"SmPerimeter","type":"DOUBLE","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":false,"defaultValue":"0","name":"SmGeometrySize","caption":"SmGeometrySize","type":"INT32","maxLength":4,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":true,"defaultValue":"-1","name":"SmGeoPosition","caption":"SmGeoPosition","type":"INT64","maxLength":8,"isZeroLengthAllowed":true,"isSystemField":true},{"isRequired":false,"defaultValue":"","name":"osm_id","caption":"osm_id","type":"WTEXT","maxLength":11,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"name","caption":"name","type":"WTEXT","maxLength":48,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"type","caption":"type","type":"WTEXT","maxLength":16,"isZeroLengthAllowed":true,"isSystemField":false},{"isRequired":false,"defaultValue":"","name":"LocationID","caption":"LocationID","type":"WTEXT","maxLength":16,"isZeroLengthAllowed":true,"isSystemField":false}],"epsgCode":4326,"datasetName":"newyorkResidential_R","bounds":"Left=-74.2555205,Bottom=40.4981355,Right=-73.6580247,Top=40.9115797","available":true,"name":"samples_processing_newyorkResidential_R","readOnly":false,"datasetType":"REGION","type":"UDB","url":"D:\\iserver910\\samples\\data\\ProcessingData\\processing.udb"}}
                return Promise.resolve(new Response(JSON.stringify(responseResult)));
            }
            return Promise.resolve();
        });
        // 将微件加载在地图上
        distributedAnalysis.addTo(map);

    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;

    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    afterAll(() => {
        map = null;
        window.document.body.removeChild(testDiv);
    });
    // 分析
    it('analysis', (done) => {
        expect(distributedAnalysis).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url) => {
            if (url.indexOf("/density.json") > -1) {
                var analysisResult = kernelDensityJob_post;
                return Promise.resolve(new Response(analysisResult));
            }
            return Promise.resolve();
        });
        // 分析成功的监听事件
        distributedAnalysis.on('analysissucceeded', (e) => {
            // 得到响应的结果
            serviceResult = e;
            if (serviceResult.error) {
                expect(serviceResult.error).not.toBeNull();
            }
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("analysissucceeded");
                // layer
                expect(serviceResult.layer.requestParams.cacheEnabled).toBeTruthy();
                expect(serviceResult.layer.requestParams.origin).toEqual('{"x":-180,"y":90}');
                expect(serviceResult.layer.requestParams.redirect).toBeFalsy();
                //sourceTarget
                expect(serviceResult.sourceTarget._firingCount).toEqual(1);
                done();
            } catch (exception) {
                console.log("'getFeatures_success'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });
        // 配置可行参数
        // 1.数据集
        var datasetSelectName = distributedAnalysis.datasetSelectName;
        datasetSelectName.innerHTML = "samples_processing_newyorkPoint_P";
        datasetSelectName.title = "samples_processing_newyorkPoint_P";

        // 2.权重字段
        // var analyseContainer=document.getElementsByClassName('IDW')[0];
        // var weightFieldsSelectName = analyseContainer.children[0].children[2].children[1].children[0];
        var weightFieldsSelectName = document.getElementsByClassName('widget-selecttool__name');
        weightFieldsSelectName[3].innerHTML = "rate_code";
        weightFieldsSelectName[3].title = "rate_code";
        document.getElementsByClassName('widget-content widget-content--scroll widget-content--analysis')[0].style="max-height: 880px;";
        var analysitBtn = document.getElementsByClassName('widget-analysis__analysisbtn--analysis')[0];
        analysitBtn.click();
    });

    it('clearLayers', (done) => {
        // var datasetSelect = distributedAnalysis.datasetSelect;
        // datasetSelect.children[2].click();
        // 查看remove是否被调
        spyOn(distributedAnalysis.viewModel.resultLayers[0], 'remove').and.callThrough();
        // 监听
        distributedAnalysis.viewModel.on('layersremoved', (e) => {
            let layers = e.layers;
            for (let i in layers) {
                expect(layers[i].remove).toHaveBeenCalled();
                // 清除map图层
                var _map = layers[i]._map;
                try {
                    expect(_map).toBeNull();
                    done();
                } catch (exception) {
                    console.log("'clearLayers'案例失败：" + exception.name + ":" + exception.message);
                    done();
                }
            }
        });
        // 调用
        distributedAnalysis.viewModel.clearLayers();
    });

    it('getDatasetsName', (done) => {
        distributedAnalysis.viewModel.on('datasetsloaded', (e) => {
            var result = e.result;
            try {
                expect(result).not.toBeNull();
                expect(result.dataset.datasetNames[0]).toBe("samples_processing_newyorkZone_R");
                expect(result.dataset.datasetNames.length).toEqual(8);
                expect(result.datasetHash).not.toBeNull(0);
                done();
            } catch (exception) {
                console.log("'getDatasetsName'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });

        distributedAnalysis.viewModel.getDatasetsName();
    });

    // get请求来的data里面缺失datasetInfo
    it('getDatasetInfo', () => {
        console.log("debug");
        // document.getElementsByClassName("widget-triangle-down-img")[1].click();
        var datasetUrl="/iserver/services/datacatalog/rest/datacatalog/sharefile/samples_processing_newyorkResidential_R.json";
        distributedAnalysis.viewModel.on('datasetinfoloaded', (e) => {
            var result = e.result;
            try {
              
                expect(result).not.toBeNull();
                done();
            } catch (exception) {
                console.log("'getDatasetInfo'案例失败：" + exception.name + ":" + exception.message);
                done();
            }
        });
       
        // document.getElementsByClassName("widget-selecttool__option")[0].click();
        distributedAnalysis.viewModel.getDatasetInfo(datasetUrl);
    });

});


