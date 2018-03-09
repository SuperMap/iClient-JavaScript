import {FetchRequest} from '../../../src/common/util/FetchRequest';
import {ProcessingService} from '../../../src/openlayers/services/ProcessingService';
import {SecurityManager} from '../../../src/common/security/SecurityManager';
import {KernelDensityJobParameter} from '../../../src/common/iServer/KernelDensityJobParameter';
import {SummaryMeshJobParameter} from '../../../src/common/iServer/SummaryMeshJobParameter';
import {SingleObjectQueryJobsParameter} from '../../../src/common/iServer/SingleObjectQueryJobsParameter';
import {SummaryRegionJobParameter} from '../../../src/common/iServer/SummaryRegionJobParameter';
import {VectorClipJobsParameter} from '../../../src/common/iServer/VectorClipJobsParameter';
import {OverlayGeoJobParameter} from '../../../src/common/iServer/OverlayGeoJobParameter';
import {BuffersAnalystJobsParameter} from '../../../src/common/iServer/BuffersAnalystJobsParameter';
import {TopologyValidatorJobsParameter} from '../../../src/common/iServer/TopologyValidatorJobsParameter';
import '../../resources/ProcessingService';


describe('openlayers_ProcessingService', () => {
    var token, url, processingService;
    beforeEach(() => {
        token = '15xQ_l77895DvXHYKWPesuU7x0tenRLuYXgjxX4x_s51Wqh9qrQiLuLKudwWWm6vQVTXej2cXEQKcIcFAxxzOw..';
        SecurityManager.registerToken('http://supermapiserver:8090/iserver', token);
        url = 'http://supermapiserver:8090/iserver/services/distributedanalyst/rest/v1/jobs';
        processingService = new ProcessingService(url);
    });

    xit('bug记录', () => {
        console.log("1、query应该为ol.Bounds对象,不应该处理为字符串,且当不设置query时不应该报错(query不是必填参数),应该默认查询当前全部范围");
        console.log("2、bounds应该为ol.Bounds对象,不应该处理为字符串,且当不设置bounds时不应该报错(bounds不是必填参数),应该默认查询当前全部范围");
        console.log("3、不支持destroy");
    });

    /*KernelDensityJobsService*/
    it('getKernelDensityJobs_processCompleted', (done) => {
        var id = id_kernelDensityJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/density") {
                var escapedJson = "[" + kernelDensityJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getKernelDensityJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.KernelDensityJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/density");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(0);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511147376620);
            expect(state.endTime).toEqual(1511147412487);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(4945);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.areaUnit).toBe("SquareMile");
            expect(setting.analyst.fields).toBe("col7,col8");
            expect(setting.analyst.meshSizeUnit).toBe("Meter");
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.method).toEqual("0");
            expect(setting.analyst.query).toEqual("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.radius).toEqual("200");
            expect(setting.analyst.radiusUnit).toBe("Meter");
            expect(setting.analyst.resolution).toEqual("80");
            expect(setting.appName).toBe("density");
            expect(setting.input.datasetInfo.name).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.input.datasetInfo.prjCoordsys).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("CSV");
            expect(setting.input.datasetInfo.url).toBe("D:\\newyork_taxi_2013-01_14k.csv");
            expect(setting.input.datasetName).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\d5d405fb_aa51_4ce4_9e48_8222d5b14ce6.udb");
            expect(setting.output.outputPath).toBe("D:\\kernelDensity.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\kernelDensity.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getKernelDensityJob', (done) => {
        var id = id_kernelDensityJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/density" + "/" + id) {
                var escapedJson = kernelDensityJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getKernelDensityJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.KernelDensityJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/density");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(0);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511147376620);
            expect(state.endTime).toEqual(1511147412487);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(4945);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.areaUnit).toBe("SquareMile");
            expect(setting.analyst.fields).toBe("col7,col8");
            expect(setting.analyst.meshSizeUnit).toBe("Meter");
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.method).toEqual("0");
            expect(setting.analyst.query).toEqual("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.radius).toEqual("200");
            expect(setting.analyst.radiusUnit).toBe("Meter");
            expect(setting.analyst.resolution).toEqual("80");
            expect(setting.appName).toBe("density");
            expect(setting.input.datasetInfo.name).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.input.datasetInfo.prjCoordsys).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("CSV");
            expect(setting.input.datasetInfo.url).toBe("D:\\newyork_taxi_2013-01_14k.csv");
            expect(setting.input.datasetName).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\d5d405fb_aa51_4ce4_9e48_8222d5b14ce6.udb");
            expect(setting.output.outputPath).toBe("D:\\kernelDensity.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\kernelDensity.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    // addKernelDensityJob中有bug,当不设置query或者设置为ol.Bounds对象时会报错, 待开发修改后需要补充测试
    it('addKernelDensityJob, getKernelDensityJobState', (done) => {
        var id = id_kernelDensityJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/density.json?token=" + token) {
                var escapedJson = kernelDensityJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/density/" + id) {
                var escapedJson = kernelDensityJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var kernelDensityJobParameter = new KernelDensityJobParameter({
            datasetName: "samples_newyork_taxi_2013-01_14k",   //必填参数, 源数据集
            method: "0",               //必填参数, 分析方法, 0代表简单点密度, 1代表核密度分析
            meshType: "0",             //必填参数, 网格面类型, 0代表格网, 1代表蜂窝面,即六边形
            resolution: "80",          //必填参数, 网格半径
            radius: "200",             //必填参数, 分析半径
            fields: "",                //选填参数, 权重值字段
            query: "-74.15,40.55,-73.75,40.95",                 //选填参数,分析范围
            meshSizeUnit: 'Meter',     //选填参数, 网格单位
            radiusUnit: 'Meter',       //选填参数, 搜索半径单位
            areaUnit: 'SquareMeter'    //选填参数, 面积单位，密度的分母单位
        });
        processingService.addKernelDensityJob(kernelDensityJobParameter, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.KernelDensityJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/density");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(0);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511147376620);
            expect(state.endTime).toEqual(1511147412487);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(4945);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.areaUnit).toBe("SquareMile");
            expect(setting.analyst.fields).toBe("col7,col8");
            expect(setting.analyst.meshSizeUnit).toBe("Meter");
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.method).toEqual("0");
            expect(setting.analyst.query).toEqual("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.radius).toEqual("200");
            expect(setting.analyst.radiusUnit).toBe("Meter");
            expect(setting.analyst.resolution).toEqual("80");
            expect(setting.appName).toBe("density");
            expect(setting.input.datasetInfo.name).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.input.datasetInfo.prjCoordsys).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("CSV");
            expect(setting.input.datasetInfo.url).toBe("D:\\newyork_taxi_2013-01_14k.csv");
            expect(setting.input.datasetName).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\d5d405fb_aa51_4ce4_9e48_8222d5b14ce6.udb");
            expect(setting.output.outputPath).toBe("D:\\kernelDensity.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\kernelDensity.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getKernelDensityJobState
            var kernelDensityJobState = processingService.getKernelDensityJobState(id);
            expect(kernelDensityJobState.elapsedTime).toEqual(0);
            expect(kernelDensityJobState.endState).toBeTruthy();
            expect(kernelDensityJobState.startTime).toEqual(1511147376620);
            expect(kernelDensityJobState.endTime).toEqual(1511147412487);
            expect(kernelDensityJobState.errorMsg).toBeNull();
            expect(kernelDensityJobState.errorStackTrace).toBeNull();
            expect(kernelDensityJobState.publisherelapsedTime).toEqual(4945);
            expect(kernelDensityJobState.runState).toBe("FINISHED");
            kernelDensityJobParameter.destroy();
            done();
        });
    });

    /*SummaryMeshJobsService*/
    it('getSummaryMeshJobs_processCompleted', (done) => {
        var id = id_summaryMeshJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/aggregatepoints") {
                // 转义后的json字符串
                var escapedJson = "[" + summaryMeshJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getSummaryMeshJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SummaryMeshJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/aggregatepoints");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(16078);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324256079);
            expect(state.endTime).toEqual(1511324281095);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(8547);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.statisticModes).toBe("max");
            expect(setting.analyst.query).toEqual("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.fields).toBe("col7");
            expect(setting.analyst.resultFieldNames).toBe("max_col7");
            expect(setting.analyst.resolution).toBe("100");
            expect(setting.analyst.meshSizeUnit).toBeNull();
            expect(setting.appName).toBe("summaryMesh");
            expect(setting.input.datasetInfo.name).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.input.datasetInfo.prjCoordsys).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("CSV");
            expect(setting.input.datasetInfo.url).toBe("D:\\newyork_taxi_2013-01_14k.csv");
            expect(setting.input.datasetName).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\e2b55882_fc35_4442_92a2_507341b916bf.udb");
            expect(setting.output.outputPath).toBe("D:\\summaryMesh.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getSummaryMeshJob', (done) => {
        var id = id_summaryMeshJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/aggregatepoints/" + id) {
                var escapedJson = summaryMeshJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getSummaryMeshJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SummaryMeshJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/aggregatepoints");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(16078);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324256079);
            expect(state.endTime).toEqual(1511324281095);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(8547);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.statisticModes).toBe("max");
            expect(setting.analyst.query).toEqual("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.fields).toBe("col7");
            expect(setting.analyst.resultFieldNames).toBe("max_col7");
            expect(setting.analyst.resolution).toBe("100");
            expect(setting.analyst.meshSizeUnit).toBeNull();
            expect(setting.appName).toBe("summaryMesh");
            expect(setting.input.datasetInfo.name).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.input.datasetInfo.prjCoordsys).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("CSV");
            expect(setting.input.datasetInfo.url).toBe("D:\\newyork_taxi_2013-01_14k.csv");
            expect(setting.input.datasetName).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\e2b55882_fc35_4442_92a2_507341b916bf.udb");
            expect(setting.output.outputPath).toBe("D:\\summaryMesh.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    // addSummaryMeshJob中有bug, 当不设置query或者或者设置为ol.Bounds对象时会报错, 待开发修改后需要补充测试
    it('addSummaryMeshJob, getSummaryMeshJobState', (done) => {
        var id = id_summaryMeshJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/aggregatepoints.json?token=" + token) {
                var escapedJson = summaryMeshJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/aggregatepoints/" + id) {
                var escapedJson = summaryMeshJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        // 四边形网格面聚合
        var summaryMeshJobParameter = new SummaryMeshJobParameter({
            datasetName: "samples_newyork_taxi_2013-01_14k",  //必填参数, 源数据集
            query: "-74.15,40.55,-73.75,40.95",               //选填参数,分析范围
            resolution: 100,              //网格大小
            statisticModes: "max",        //统计模式
            meshType: 0,                  //网格面汇总类型
            fields: "col7"                //权重值字段
        });
        processingService.addSummaryMeshJob(summaryMeshJobParameter, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SummaryMeshJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/aggregatepoints");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(16078);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324256079);
            expect(state.endTime).toEqual(1511324281095);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(8547);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.statisticModes).toBe("max");
            expect(setting.analyst.query).toEqual("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.fields).toBe("col7");
            expect(setting.analyst.resultFieldNames).toBe("max_col7");
            expect(setting.analyst.resolution).toBe("100");
            expect(setting.analyst.meshSizeUnit).toBeNull();
            expect(setting.appName).toBe("summaryMesh");
            expect(setting.input.datasetInfo.name).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.input.datasetInfo.prjCoordsys).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("CSV");
            expect(setting.input.datasetInfo.url).toBe("D:\\newyork_taxi_2013-01_14k.csv");
            expect(setting.input.datasetName).toBe("samples_newyork_taxi_2013-01_14k");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\e2b55882_fc35_4442_92a2_507341b916bf.udb");
            expect(setting.output.outputPath).toBe("D:\\summaryMesh.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getSummaryMeshJobState
            var summaryMeshJobState = processingService.getSummaryMeshJobState(id);
            expect(summaryMeshJobState.elapsedTime).toEqual(16078);
            expect(summaryMeshJobState.endState).toBeTruthy();
            expect(summaryMeshJobState.startTime).toEqual(1511324256079);
            expect(summaryMeshJobState.endTime).toEqual(1511324281095);
            expect(summaryMeshJobState.errorMsg).toBeNull();
            expect(summaryMeshJobState.errorStackTrace).toBeNull();
            expect(summaryMeshJobState.publisherelapsedTime).toEqual(8547);
            expect(summaryMeshJobState.runState).toBe("FINISHED");
            summaryMeshJobParameter.destroy();
            done();
        });
    });

    /*SingleObjectQueryJobsService*/
    it('getQueryJobs_processCompleted', (done) => {
        var id = id_singleObjectQueryJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/query") {
                var escapedJson = "[" + singleObjectQueryJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getQueryJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SingleObjectQueryJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/query");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(19047);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324147985);
            expect(state.endTime).toEqual(1511324175001);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(7797);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.mode).toBe("INTERSECT");
            expect(setting.analyst.inputQuery).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"singleRegion_R\"]}]}");
            expect(setting.analyst.datasetQuery).toBe("samples_processing_singleRegion_R");
            expect(setting.analyst.geometryQuery).toBeNull();
            expect(setting.analyst.attributeFilter).toBeNull();
            expect(setting.appName).toBe("spatialquerygeo");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\757732b9_c16d_4829_8059_e35f37622531.udb");
            expect(setting.output.outputPath).toBe("D:\\spatialQueryGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getQueryJob', (done) => {
        var id = id_singleObjectQueryJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/query/" + id) {
                var escapedJson = singleObjectQueryJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getQueryJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SingleObjectQueryJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/query");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(19047);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324147985);
            expect(state.endTime).toEqual(1511324175001);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(7797);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.mode).toBe("INTERSECT");
            expect(setting.analyst.inputQuery).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"singleRegion_R\"]}]}");
            expect(setting.analyst.datasetQuery).toBe("samples_processing_singleRegion_R");
            expect(setting.analyst.geometryQuery).toBeNull();
            expect(setting.analyst.attributeFilter).toBeNull();
            expect(setting.appName).toBe("spatialquerygeo");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\757732b9_c16d_4829_8059_e35f37622531.udb");
            expect(setting.output.outputPath).toBe("D:\\spatialQueryGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('addQueryJob, getQueryJobState', (done) => {
        var id = id_singleObjectQueryJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/query.json?token=" + token) {
                var escapedJson = singleObjectQueryJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/query/" + id) {
                var escapedJson = singleObjectQueryJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var singleObjectQueryJobParameter = new SingleObjectQueryJobsParameter({
            datasetName: "samples_processing_newyorkZone_R",    //必填参数, 源数据集
            datasetQuery: "samples_processing_singleRegion_R",  //必填参数, 查询对象数据集
            geometryQuery: null,                                //查询对象所在的几何对象
            mode: "INTERSECT"                                   //必填参数, 查询对象模式
        });
        processingService.addQueryJob(singleObjectQueryJobParameter, (result) => {
            var id = "22e7b725_77df_4ba4_a8a2_a042b66e9fbd";
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SingleObjectQueryJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/query");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(19047);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324147985);
            expect(state.endTime).toEqual(1511324175001);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(7797);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.mode).toBe("INTERSECT");
            expect(setting.analyst.inputQuery).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"singleRegion_R\"]}]}");
            expect(setting.analyst.datasetQuery).toBe("samples_processing_singleRegion_R");
            expect(setting.analyst.geometryQuery).toBeNull();
            expect(setting.analyst.attributeFilter).toBeNull();
            expect(setting.appName).toBe("spatialquerygeo");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\757732b9_c16d_4829_8059_e35f37622531.udb");
            expect(setting.output.outputPath).toBe("D:\\spatialQueryGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getQueryJobState
            var queryJobState = processingService.getQueryJobState(id);
            expect(queryJobState.elapsedTime).toEqual(19047);
            expect(queryJobState.endState).toBeTruthy();
            expect(queryJobState.startTime).toEqual(1511324147985);
            expect(queryJobState.endTime).toEqual(1511324175001);
            expect(queryJobState.errorMsg).toBeNull();
            expect(queryJobState.errorStackTrace).toBeNull();
            expect(queryJobState.publisherelapsedTime).toEqual(7797);
            expect(queryJobState.runState).toBe("FINISHED");
            singleObjectQueryJobParameter.destroy();
            done();
        });
    });

    /*SummaryRegionJobsService*/
    it('getSummaryRegionJobs_processCompleted', (done) => {
        var id = id_summaryRegionJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/summaryregion") {
                var escapedJson = "[" + summaryRegionJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getSummaryRegionJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SummaryRegionJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/summaryregion");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(48125);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511341652407);
            expect(state.endTime).toEqual(1511341719657);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(15141);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.standardSummaryFields).toBe("false");
            expect(setting.analyst.weightedSummaryFields).toBe("true");
            expect(setting.analyst.standardFields).toBe("");
            expect(setting.analyst.weightedFields).toBe("LocationID");
            expect(setting.analyst.standardStatisticModes).toBe("");
            expect(setting.analyst.weightedStatisticModes).toBe("max");
            expect(setting.analyst.sumShape).toBe("false");
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.query).toEqual("-74.05,40.65,-73.85,40.85");
            expect(setting.analyst.resolution).toBe("50");
            expect(setting.analyst.meshSizeUnit).toBe("Meter");
            expect(setting.analyst.statisticModes).toBeNull();
            expect(setting.analyst.fields).toBeNull();
            expect(setting.analyst.resultFieldNames).toBe("max_LocationIDWed");
            expect(setting.appName).toBe("summaryWithinMesh");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\7448ba4a_ba37_4e40_acec_6ad9dae90d06.udb");
            expect(setting.output.outputPath).toBe("D:\\summaryRegion.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getSummaryRegionJob', (done) => {
        var id = id_summaryRegionJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/summaryregion/" + id) {
                var escapedJson = summaryRegionJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getSummaryRegionJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SummaryRegionJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/summaryregion");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(48125);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511341652407);
            expect(state.endTime).toEqual(1511341719657);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(15141);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.standardSummaryFields).toBe("false");
            expect(setting.analyst.weightedSummaryFields).toBe("true");
            expect(setting.analyst.standardFields).toBe("");
            expect(setting.analyst.weightedFields).toBe("LocationID");
            expect(setting.analyst.standardStatisticModes).toBe("");
            expect(setting.analyst.weightedStatisticModes).toBe("max");
            expect(setting.analyst.sumShape).toBe("false");
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.query).toEqual("-74.05,40.65,-73.85,40.85");
            expect(setting.analyst.resolution).toBe("50");
            expect(setting.analyst.meshSizeUnit).toBe("Meter");
            expect(setting.analyst.statisticModes).toBeNull();
            expect(setting.analyst.fields).toBeNull();
            expect(setting.analyst.resultFieldNames).toBe("max_LocationIDWed");
            expect(setting.appName).toBe("summaryWithinMesh");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\7448ba4a_ba37_4e40_acec_6ad9dae90d06.udb");
            expect(setting.output.outputPath).toBe("D:\\summaryRegion.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    // addSummaryRegionJob中有bug, 当不设置query或者或者设置为ol.Bounds对象时会报错, 待开发修改后需要补充测试
    // 参数standardFields默认值应该为空, 此时代码中默认的是average, 待开发修改后需要回归
    // 参数类在destroy的时候 regionDataset 未置空,待开发修改后需要回归
    it('addSummaryRegionJob, getSummaryRegionJobState', (done) => {
        var id = id_summaryRegionJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/summaryregion.json?token=" + token) {
                var escapedJson = summaryRegionJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/summaryregion/" + id) {
                var escapedJson = summaryRegionJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var summaryRegionJobParameter = new SummaryRegionJobParameter({
            datasetName: "samples_processing_newyorkZone_R",  //必填参数, 源数据集
            sumShape: false,                                  //是否统计长度或面积
            query: "-74.05,40.65,-73.85,40.85",               //选填参数,分析范围
            weightedSummaryFields: true,                      //以权重字段统计
            //standardSummaryFields: false,                   //以标准属字段统计
            //standardFields: "",                             //以标准属字段统计的字段名称,应该默认为空
            //standardStatisticModes: "",                     //以标准属字段统计的统计模式,默认为空
            weightedFields: "LocationID",                     //以权重字段统计的字段名称
            weightedStatisticModes: "MAX",                    //以权重字段统计的统计模式
            meshType: 0,                            //网格面汇总类型
            resolution: 50,                         //网格大小
            meshSizeUnit: "METER",                  //网格大小单位
            type: "SUMMARYMESH"                      //汇总类型,默认为网格面汇总("SUMMARYMESH")
        });
        processingService.addSummaryRegionJob(summaryRegionJobParameter, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.SummaryRegionJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/summaryregion");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(48125);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511341652407);
            expect(state.endTime).toEqual(1511341719657);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(15141);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.standardSummaryFields).toBe("false");
            expect(setting.analyst.weightedSummaryFields).toBe("true");
            expect(setting.analyst.standardFields).toBe("");
            expect(setting.analyst.weightedFields).toBe("LocationID");
            expect(setting.analyst.standardStatisticModes).toBe("");
            expect(setting.analyst.weightedStatisticModes).toBe("max");
            expect(setting.analyst.sumShape).toBe("false");
            expect(setting.analyst.meshType).toEqual("0");
            expect(setting.analyst.query).toEqual("-74.05,40.65,-73.85,40.85");
            expect(setting.analyst.resolution).toBe("50");
            expect(setting.analyst.meshSizeUnit).toBe("Meter");
            expect(setting.analyst.statisticModes).toBeNull();
            expect(setting.analyst.fields).toBeNull();
            expect(setting.analyst.resultFieldNames).toBe("max_LocationIDWed");
            expect(setting.appName).toBe("summaryWithinMesh");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\7448ba4a_ba37_4e40_acec_6ad9dae90d06.udb");
            expect(setting.output.outputPath).toBe("D:\\summaryRegion.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getSummaryRegionJobState
            var summaryRegionJobState = processingService.getSummaryRegionJobState(id);
            expect(summaryRegionJobState.elapsedTime).toEqual(48125);
            expect(summaryRegionJobState.endState).toBeTruthy();
            expect(summaryRegionJobState.startTime).toEqual(1511341652407);
            expect(summaryRegionJobState.endTime).toEqual(1511341719657);
            expect(summaryRegionJobState.errorMsg).toBeNull();
            expect(summaryRegionJobState.errorStackTrace).toBeNull();
            expect(summaryRegionJobState.publisherelapsedTime).toEqual(15141);
            expect(summaryRegionJobState.runState).toBe("FINISHED");
            summaryRegionJobParameter.destroy();
            done();
        });
    });

    /*VectorClipJobsService*/
    it('getVectorClipJobs_processCompleted', (done) => {
        var id = id_vectorClipJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/vectorclip") {
                var escapedJson = "[" + vectorClipJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getVectorClipJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.VectorClipJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/vectorclip");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(18063);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324088094);
            expect(state.endTime).toEqual(1511324113235);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(7016);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.mode).toBe("clip");
            expect(setting.analyst.datasetVectorClip).toBe("samples_processing_singleRegion_R");
            expect(setting.analyst.geometryClip).toBeNull();
            expect(setting.analyst.inputVectorClip).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"singleRegion_R\"]}]}");
            expect(setting.appName).toBe("overlayanalystgeo");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\b51199b3_bbb9_41c5_ae8a_3fc8dd51e3b5.udb");
            expect(setting.output.outputPath).toBe("D:\\vectorClipAnalystGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\vectorClipAnalystGeo.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getVectorClipJob', (done) => {
        var id = id_vectorClipJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/vectorclip/" + id) {
                var escapedJson = vectorClipJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getVectorClipJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.VectorClipJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/vectorclip");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(18063);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324088094);
            expect(state.endTime).toEqual(1511324113235);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(7016);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.mode).toBe("clip");
            expect(setting.analyst.datasetVectorClip).toBe("samples_processing_singleRegion_R");
            expect(setting.analyst.geometryClip).toBeNull();
            expect(setting.analyst.inputVectorClip).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"singleRegion_R\"]}]}");
            expect(setting.appName).toBe("overlayanalystgeo");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\b51199b3_bbb9_41c5_ae8a_3fc8dd51e3b5.udb");
            expect(setting.output.outputPath).toBe("D:\\vectorClipAnalystGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\vectorClipAnalystGeo.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('addVectorClipJob, getVectorClipJobState', (done) => {
        var id = id_vectorClipJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/vectorclip.json?token=" + token) {
                var escapedJson = vectorClipJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/vectorclip/" + id) {
                var escapedJson = vectorClipJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var vectorClipJobParameter = new VectorClipJobsParameter({
            datasetName: "samples_processing_newyorkZone_R",   //必填参数, 源数据集
            datasetVectorClip: "samples_processing_singleRegion_R",  //必填参数, 裁剪对象数据集
            mode: "clip"                                   //必填参数, 裁剪分析模式

        });
        processingService.addVectorClipJob(vectorClipJobParameter, (result) => {
            var id = "b84dcccd_489a_495d_8a02_2c4c684bb4a9";
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.VectorClipJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/vectorclip");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(18063);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511324088094);
            expect(state.endTime).toEqual(1511324113235);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(7016);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.mode).toBe("clip");
            expect(setting.analyst.datasetVectorClip).toBe("samples_processing_singleRegion_R");
            expect(setting.analyst.geometryClip).toBeNull();
            expect(setting.analyst.inputVectorClip).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"singleRegion_R\"]}]}");
            expect(setting.appName).toBe("overlayanalystgeo");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\b51199b3_bbb9_41c5_ae8a_3fc8dd51e3b5.udb");
            expect(setting.output.outputPath).toBe("D:\\vectorClipAnalystGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\vectorClipAnalystGeo.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getVectorClipJobState
            var vectorClipJobState = processingService.getVectorClipJobState(id);
            expect(vectorClipJobState.elapsedTime).toEqual(18063);
            expect(vectorClipJobState.endState).toBeTruthy();
            expect(vectorClipJobState.startTime).toEqual(1511324088094);
            expect(vectorClipJobState.endTime).toEqual(1511324113235);
            expect(vectorClipJobState.errorMsg).toBeNull();
            expect(vectorClipJobState.errorStackTrace).toBeNull();
            expect(vectorClipJobState.publisherelapsedTime).toEqual(7016);
            expect(vectorClipJobState.runState).toBe("FINISHED");
            vectorClipJobParameter.destroy();
            done();
        });
    });

    /*OverlayGeoJobsService*/
    it('getOverlayGeoJobs_processCompleted', (done) => {
        var id = id_overlayGeoJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/overlay") {
                var escapedJson = "[" + overlayGeoJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getOverlayGeoJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.OverlayGeoJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/overlay");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(19078);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511325446907);
            expect(state.endTime).toEqual(1511325475735);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(9281);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.mode).toBe("clip");
            expect(setting.analyst.datasetOverlay).toBe("samples_processing_newyorkResidential_R");
            expect(setting.analyst.overlayFields).toBe("type");
            expect(setting.analyst.srcFields).toBe("LocationID");
            expect(setting.analyst.inputOverlay).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"newyorkResidential_R\"]}]}");
            expect(setting.appName).toBe("overlayAnalyst");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\dc81ba16_a791_4edc_9eb0_25b9e2b7edc6.udb");
            expect(setting.output.outputPath).toBe("D:\\overlayAnalystGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\overlayAnalystGeo.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getOverlayGeoJob', (done) => {
        var id = id_overlayGeoJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/overlay/" + id) {
                var escapedJson = overlayGeoJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getOverlayGeoJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.OverlayGeoJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/overlay");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(19078);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511325446907);
            expect(state.endTime).toEqual(1511325475735);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(9281);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.mode).toBe("clip");
            expect(setting.analyst.datasetOverlay).toBe("samples_processing_newyorkResidential_R");
            expect(setting.analyst.overlayFields).toBe("type");
            expect(setting.analyst.srcFields).toBe("LocationID");
            expect(setting.analyst.inputOverlay).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"newyorkResidential_R\"]}]}");
            expect(setting.appName).toBe("overlayAnalyst");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\dc81ba16_a791_4edc_9eb0_25b9e2b7edc6.udb");
            expect(setting.output.outputPath).toBe("D:\\overlayAnalystGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\overlayAnalystGeo.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('addOverlayGeoJob, getOverlayGeoJobsState', (done) => {
        var id = id_overlayGeoJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/overlay.json?token=" + token) {
                var escapedJson = overlayGeoJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/overlay/" + id) {
                var escapedJson = overlayGeoJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var overlayGeoJobParameter = new OverlayGeoJobParameter({
            datasetName: "samples_processing_newyorkZone_R",      //必填参数, 源数据集
            datasetOverlay: "samples_processing_singleRegion_R",  //必填参数, 叠加对象所在的数据集名称
            mode: "clip",                                         //必填参数, 叠加分析模式
            srcFields: "LocationID",                               //选填参数, 输入数据需要保留的字段
            overlayFields: "type"          //叠加数据需要保留的字段，对分析模式为clip、update、erase时，此参数无效
        });
        processingService.addOverlayGeoJob(overlayGeoJobParameter, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.OverlayGeoJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/overlay");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(19078);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511325446907);
            expect(state.endTime).toEqual(1511325475735);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(9281);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.mode).toBe("clip");
            expect(setting.analyst.datasetOverlay).toBe("samples_processing_newyorkResidential_R");
            expect(setting.analyst.overlayFields).toBe("type");
            expect(setting.analyst.srcFields).toBe("LocationID");
            expect(setting.analyst.inputOverlay).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"newyorkResidential_R\"]}]}");
            expect(setting.appName).toBe("overlayAnalyst");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\dc81ba16_a791_4edc_9eb0_25b9e2b7edc6.udb");
            expect(setting.output.outputPath).toBe("D:\\overlayAnalystGeo.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\overlayAnalystGeo.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getOverlayGeoJobsState
            var overlayGeoJobState = processingService.getoverlayGeoJobState(id);
            expect(overlayGeoJobState.elapsedTime).toEqual(19078);
            expect(overlayGeoJobState.endState).toBeTruthy();
            expect(overlayGeoJobState.startTime).toEqual(1511325446907);
            expect(overlayGeoJobState.endTime).toEqual(1511325475735);
            expect(overlayGeoJobState.errorMsg).toBeNull();
            expect(overlayGeoJobState.errorStackTrace).toBeNull();
            expect(overlayGeoJobState.publisherelapsedTime).toEqual(9281);
            expect(overlayGeoJobState.runState).toBe("FINISHED");
            overlayGeoJobParameter.destroy();
            done();
        });
    });

    /*BuffersAnalystJobsService*/
    it('getBuffersJobs_processCompleted', (done) => {
        var id = id_buffersAnalystJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/buffers") {
                var escapedJson = "[" + buffersAnalystJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getBuffersJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.BuffersAnalystJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/buffers");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(0);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511242637097);
            expect(state.endTime).toEqual(1511242714269);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(6922);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.distanceUnit).toBe("Meter");
            expect(setting.analyst.distance).toBe("15");
            expect(setting.analyst.bounds).toBe("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.distanceField).toBe("pickup_latitude");
            expect(setting.analyst.dissolveField).toBe("pickup_longitude");
            expect(setting.appName).toBe("CreateBuffers");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkPoint_P");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkPoint_P");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("POINT");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.342308,Bottom=40.576233,Right=-73.58014699999998,Top=40.901577");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkPoint_P");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\c7edef31_11e7_4c8b_bb31_9f7a160a19ae.udb");
            expect(setting.output.outputPath).toBe("D:\\buffers.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\buffers.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getBuffersJob', (done) => {
        var id = id_buffersAnalystJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/buffers/" + id) {
                var escapedJson = buffersAnalystJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getBuffersJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.BuffersAnalystJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/buffers");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(0);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511242637097);
            expect(state.endTime).toEqual(1511242714269);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(6922);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.distanceUnit).toBe("Meter");
            expect(setting.analyst.distance).toBe("15");
            expect(setting.analyst.bounds).toBe("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.distanceField).toBe("pickup_latitude");
            expect(setting.analyst.dissolveField).toBe("pickup_longitude");
            expect(setting.appName).toBe("CreateBuffers");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkPoint_P");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkPoint_P");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("POINT");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.342308,Bottom=40.576233,Right=-73.58014699999998,Top=40.901577");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkPoint_P");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\c7edef31_11e7_4c8b_bb31_9f7a160a19ae.udb");
            expect(setting.output.outputPath).toBe("D:\\buffers.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\buffers.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    // addBuffersJob中有bug,当不设置bounds或者设置为ol.Bounds()对象时会报错, 待开发修改后需要补充测试
    it('addBuffersJob, getBuffersJobState', (done) => {
        var id = id_buffersAnalystJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/buffers.json?token=" + token) {
                var escapedJson = buffersAnalystJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/buffers/" + id) {
                var escapedJson = buffersAnalystJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var buffersJobParameter = new BuffersAnalystJobsParameter({
            datasetName: "samples_processing_newyorkPoint_P",   //必填参数, 源数据集
            bounds: "-74.15,40.55,-73.75,40.95", //此处应该为L.Bounds(L.point(-74.342308, 40.576233), L.point(-73.58014699999998, 40.901577))
            distance: "15",     //缓冲区半径
            distanceField: "pickup_latitude",    //缓冲距离字段
            distanceUnit: "Meter",     //缓冲距离单位
            dissolveField: "pickup_longitude"    //融合字段, 根据字段值对缓冲区结果面对象进行融合
        });
        processingService.addBuffersJob(buffersJobParameter, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.BuffersAnalystJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/buffers");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(0);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1511242637097);
            expect(state.endTime).toEqual(1511242714269);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(6922);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.distanceUnit).toBe("Meter");
            expect(setting.analyst.distance).toBe("15");
            expect(setting.analyst.bounds).toBe("-74.15,40.55,-73.75,40.95");
            expect(setting.analyst.distanceField).toBe("pickup_latitude");
            expect(setting.analyst.dissolveField).toBe("pickup_longitude");
            expect(setting.appName).toBe("CreateBuffers");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkPoint_P");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkPoint_P");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("POINT");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.342308,Bottom=40.576233,Right=-73.58014699999998,Top=40.901577");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkPoint_P");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\c7edef31_11e7_4c8b_bb31_9f7a160a19ae.udb");
            expect(setting.output.outputPath).toBe("D:\\buffers.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\buffers.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            // getBuffersJobState
            var buffersJobState = processingService.getBuffersJobState(id);
            expect(buffersJobState.elapsedTime).toEqual(0);
            expect(buffersJobState.endState).toBeTruthy();
            expect(buffersJobState.startTime).toEqual(1511242637097);
            expect(buffersJobState.endTime).toEqual(1511242714269);
            expect(buffersJobState.errorMsg).toBeNull();
            expect(buffersJobState.errorStackTrace).toBeNull();
            expect(buffersJobState.publisherelapsedTime).toEqual(6922);
            expect(buffersJobState.runState).toBe("FINISHED");
            buffersJobParameter.destroy();
            done();
        });
    });

    /*TopologyValidatorJobsService*/
    it('getTopologyValidatorJobs_processCompleted', (done) => {
        var id = id_topologyValidatorJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/topologyvalidator") {
                var escapedJson = "[" + topologyValidatorJob_get + "]";
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getTopologyValidatorJobs((result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.TopologyValidatorJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/topologyvalidator");
            expect(result.result.length).toEqual(1);
            expect(result.result[0].id).toBe(id);
            var state = result.result[0].state;
            expect(state.elapsedTime).toEqual(20243);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1510728379505);
            expect(state.endTime).toEqual(1510728402938);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(3113);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result[0].setting;
            expect(setting.analyst.rule).toBe("RegionCoveredByRegion");
            expect(setting.analyst.datasetTopology).toBe("samples_processing_newyorkResidential_R");
            expect(setting.analyst.tolerance).toBe("0.000001");
            expect(setting.analyst.inputValidating).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"newyorkResidential_R\"]}]}");
            expect(setting.appName).toBe("topologyValidator");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\6984c911_d099_40e5_9e7d_4aede822f600.udb");
            expect(setting.output.outputPath).toBe("D:\\topology.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\topology.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('getTopologyValidatorJob', (done) => {
        var id = id_topologyValidatorJob;
        spyOn(FetchRequest, 'get').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/topologyvalidator/" + id) {
                var escapedJson = topologyValidatorJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        processingService.getTopologyValidatorJob(id, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.TopologyValidatorJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/topologyvalidator");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(20243);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1510728379505);
            expect(state.endTime).toEqual(1510728402938);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(3113);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.rule).toBe("RegionCoveredByRegion");
            expect(setting.analyst.datasetTopology).toBe("samples_processing_newyorkResidential_R");
            expect(setting.analyst.tolerance).toBe("0.000001");
            expect(setting.analyst.inputValidating).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"newyorkResidential_R\"]}]}");
            expect(setting.appName).toBe("topologyValidator");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\6984c911_d099_40e5_9e7d_4aede822f600.udb");
            expect(setting.output.outputPath).toBe("D:\\topology.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\topology.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            done();
        });
    });

    it('addTopologyValidatorJob, getTopologyValidatorJobState', (done) => {
        var id = id_topologyValidatorJob;
        spyOn(FetchRequest, 'post').and.callFake((testUrl) => {
            if (testUrl === url + "/spatialanalyst/topologyvalidator.json?token=" + token) {
                var escapedJson = topologyValidatorJob_post;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        spyOn(FetchRequest, 'get').and.callFake((newResourceLocationURL) => {
            if (newResourceLocationURL === url + "/spatialanalyst/topologyvalidator/" + id) {
                var escapedJson = topologyValidatorJob_get;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });
        var topologyValidatorJobParameter = new TopologyValidatorJobsParameter({
            datasetName: "samples_processing_newyorkZone_R",   //必填参数, 源数据集
            datasetTopology: "samples_processing_newyorkResidential_R",   //必填参数, 拓扑检查对象所在的数据集名称
            tolerance: "0.000001",                      //容限
            rule: "RegionCoveredByRegion"               //必填参数, 拓扑检查模式
        });
        processingService.addTopologyValidatorJob(topologyValidatorJobParameter, (result) => {
            expect(result.type).toBe("processCompleted");
            expect(result.object.CLASS_NAME).toBe("SuperMap.TopologyValidatorJobsService");
            expect(result.object.format).toBe("GEOJSON");
            expect(result.object.url).toBe(url + "/spatialanalyst/topologyvalidator");
            expect(result.result.id).toBe(id);
            var state = result.result.state;
            expect(state.elapsedTime).toEqual(20243);
            expect(state.endState).toBeTruthy();
            expect(state.startTime).toEqual(1510728379505);
            expect(state.endTime).toEqual(1510728402938);
            expect(state.errorMsg).toBeNull();
            expect(state.errorStackTrace).toBeNull();
            expect(state.publisherelapsedTime).toEqual(3113);
            expect(state.runState).toBe("FINISHED");
            var setting = result.result.setting;
            expect(setting.analyst.rule).toBe("RegionCoveredByRegion");
            expect(setting.analyst.datasetTopology).toBe("samples_processing_newyorkResidential_R");
            expect(setting.analyst.tolerance).toBe("0.000001");
            expect(setting.analyst.inputValidating).toBe("{\"type\":\"udb\",\"info\":[{\"server\":\"D:\\\\processing.udb\",\"datasetNames\":[\"newyorkResidential_R\"]}]}");
            expect(setting.appName).toBe("topologyValidator");
            expect(setting.input.datasetInfo.name).toBe("samples_processing_newyorkZone_R");
            expect(setting.input.datasetInfo.datasetName).toBe("newyorkZone_R");
            expect(setting.input.datasetInfo.type).toBe("UDB");
            expect(setting.input.datasetInfo.url).toBe("D:\\processing.udb");
            expect(setting.input.datasetInfo.datasetType).toBe("REGION");
            expect(setting.input.datasetInfo.bounds).toBe("Left=-74.25551784310493,Bottom=40.496084221255856,Right=-73.70014827248451,Top=40.91538866049913");
            expect(setting.input.datasetInfo.epsgCode).toEqual(4326);
            expect(setting.input.datasetName).toBe("samples_processing_newyorkZone_R");
            expect(setting.output.datasetName).toBe("analystResult");
            expect(setting.output.datasourcePath).toBe("D:\\6984c911_d099_40e5_9e7d_4aede822f600.udb");
            expect(setting.output.outputPath).toBe("D:\\topology.smwu");
            expect(setting.output.type).toBe("udb");
            expect(setting.serviceInfo.targetDataPath).toBe("D:\\topology.smwu");
            expect(setting.serviceInfo.targetServiceInfos.length).toEqual(2);
            expect(setting.serviceRoot).toBe("http://supermapiserver:8090/iserver/services/");
            //  getTopologyValidatorJobState
            var topologyValidatorJobState = processingService.getTopologyValidatorJobState(id);
            expect(topologyValidatorJobState.elapsedTime).toEqual(20243);
            expect(topologyValidatorJobState.endState).toBeTruthy();
            expect(topologyValidatorJobState.startTime).toEqual(1510728379505);
            expect(topologyValidatorJobState.endTime).toEqual(1510728402938);
            expect(topologyValidatorJobState.errorMsg).toBeNull();
            expect(topologyValidatorJobState.errorStackTrace).toBeNull();
            expect(topologyValidatorJobState.publisherelapsedTime).toEqual(3113);
            expect(topologyValidatorJobState.runState).toBe("FINISHED");
            topologyValidatorJobParameter.destroy();
            done();
        });
    });
});

