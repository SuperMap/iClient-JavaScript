import { FetchRequest } from '@supermapgis/iclient-common/util/FetchRequest';
import { GeoprocessingService } from '@supermapgis/iclient-common/iServer/GeoprocessingService';

const serverUrl = `http://localhost:8090/iserver/services/geoprocessing/restjsr/gp/v2`;
describe('GeoprocessingService', () => {
    let originalTimeout;
    let server = null;
    let serverResult = null;
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        server = null;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

    it('constructor, destroy', () => {
        const geoprocessing = new GeoprocessingService(serverUrl);
        expect(geoprocessing).not.toBeNull();
        expect(geoprocessing.url).toEqual(serverUrl);
        geoprocessing.destroy();
        expect(geoprocessing.url).toBeNull();
    });

    it('getTools', (done) => {
        const getTools = (result) => {
            serverResult = result;
            try {
                expect(getToolsService).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result[0].factoryTitle).toBe('大数据三维缓存生成工具');
                expect(serverResult.result[0].factoryName).toBe('bdt-cache3d');
                expect(serverResult.result[1].factoryTitle).toBe('数据出图工具');
                getToolsService.destroy();
                done();
            } catch (e) {
                console.log("'getTools'案例失败：");
                expect(false).toBeTruthy();
                getToolsService.destroy();
                done();
            }
        };
        const getToolsService = new GeoprocessingService(serverUrl);
        expect(getToolsService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(serverUrl + '/list');
            return Promise.resolve(new Response(toolSuccessEscapedJson));
        });
        getToolsService.getTools(getTools);
    });

    it('getTool', (done) => {
        const getTool = (result) => {
            serverResult = result;
            try {
                expect(getToolService).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result.id).toBe('sps.WorkflowProcessFactory.models:sps');
                expect(serverResult.result.title).toBe('sps');
                expect(serverResult.result.description).toBe('sps');
                getToolService.destroy();
                done();
            } catch (e) {
                console.log("'getTool'案例失败：");
                expect(false).toBeTruthy();
                getToolService.destroy();
                done();
            }
        };
        const getToolFailed = (result) => {
            server = result;
        };
        const getToolService = new GeoprocessingService(serverUrl);
        expect(getToolService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(serverUrl + '/sps.WorkflowProcessFactory.models:sps');
            const getToolSuccessEscapedJson = `{"outputs":[{"dataType":"long","isCollection":false,"description":"RDD 中要素对象的数目","id":"countrdd-resultCount","title":"countrdd-resultCount"}],"environments":{"BDT_Spark_Environment":{"settings":[""],"appName":"BDTSpark","master":"local[*]"}},"inputs":[{"isRequired":true,"defaultValue":"","meta":{"stringType":"connection","connection.mode":"select"},"dataType":"java.lang.String","isCollection":false,"description":"访问数据的连接信息,需要包含数据类型，连接参数，数据集名字等信息。使用'--key=value'的方式设置，多个值使用' '空格分隔。如连接HBase数据为 --providerType=hbase --hbase.zookeepers=192.168.12.34:2181 --hbase.catalog=demo --dataset=dltb; 连接dsf数据为--providerType=dsf --path=hdfs://ip:9000/dsfdata ; 本地数据为--providerType=dsf --path=/home/dsfdata","enumItems":"","id":"readasfeaturerdd-dataConnInfo","title":"readasfeaturerdd-dataConnInfo"},{"isRequired":false,"defaultValue":"","meta":{},"dataType":"java.lang.String","isCollection":false,"description":"数据查询条件，支持属性条件和空间查询, 如 SmID<100 and BBOX(the_geom, 120,30,121,31)","enumItems":"","id":"readasfeaturerdd-filter","title":"readasfeaturerdd-filter"}],"description":"sps","id":"sps.WorkflowProcessFactory.models:sps","title":"sps","succeed":true}`;
            return Promise.resolve(new Response(getToolSuccessEscapedJson));
        });
        getToolService.getTool('sps.WorkflowProcessFactory.models:sps', getTool);
    });

    // 同步传参
    it('execute', (done) => {
        const execute = (result) => {
            serverResult = result;
            try {
                expect(executeService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result['countrdd-resultCount']).toBe('12');
                executeService.destroy();
                done();
            } catch (e) {
                console.log("'execute'案例失败：");
                expect(false).toBeTruthy();
                executeService.destroy();
                done();
            }
        };
        const executeService = new GeoprocessingService(serverUrl);
        expect(executeService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url, params) => {
            expect(params).not.toBeNull();
            expect(params.parameter['readasfeaturerdd-dataConnInfo']).toBe('sdx --server=C:/Users/MEVHREVO/Desktop/mode/111.udbx --dbType=udbx --dataset=ccccc_result_R');
            const URL = serverUrl + '/sps.WorkflowProcessFactory.models:sps/execute';
            expect(url).toBe(URL);
            return Promise.resolve(new Response(`{"countrdd-resultCount":"12","succeed":true}`));
        });
        executeService.execute(
            'sps.WorkflowProcessFactory.models:sps',
            {
                'readasfeaturerdd-dataConnInfo':
                    'sdx --server=C:/Users/MEVHREVO/Desktop/mode/111.udbx --dbType=udbx --dataset=ccccc_result_R'
            },
            [{ type: 'BDT_Spark_Environment', settings: [''], appName: 'BDTSpark', master: 'local[*]' }],
            execute
        );
    });

    it('submitJob', (done) => {
        const submitJob = (result) => {
            serverResult = result;
            try {
                expect(submitJobService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result.jobID).toBe('gp-20200916-104559-40E52');
                submitJobService.destroy();
                done();
            } catch (e) {
                console.log("'submitJob'案例失败：");
                expect(false).toBeTruthy();
                submitJobService.destroy();
                done();
            }
        };
        const submitJobService = new GeoprocessingService(serverUrl);
        expect(submitJobService).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url, params) => {
            expect(params).not.toBeNull();
            var paramsObj = JSON.parse(params.replace(/'/g, '"'));
            expect(paramsObj.parameter['readasfeaturerdd-dataConnInfo']).toBe("sdx --server=C:/Users/MEVHREVO/Desktop/mode/111.udbx --dbType=udbx --dataset=ccccc_result_R");
            expect(url).toBe(`${serverUrl}/sps.WorkflowProcessFactory.models:sps/jobs`);
            return Promise.resolve(
                new Response(`{"jobID":"gp-20200916-104559-40E52","status":"started","succeed":true}`)
            );
        });
        submitJobService.submitJob(
            'sps.WorkflowProcessFactory.models:sps',
            {
                'readasfeaturerdd-dataConnInfo':
                    'sdx --server=C:/Users/MEVHREVO/Desktop/mode/111.udbx --dbType=udbx --dataset=ccccc_result_R'
            },
            [{ type: 'BDT_Spark_Environment', settings: [''], appName: 'BDTSpark', master: 'local[*]' }],
            submitJob
        );
    });

    it('waitForJobCompletion', (done) => {
        const waitForJobCompletion = (result) => {
            serverResult = result;
            try {
                expect(waitForJobCompletionService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result.jobID).toBe('gp-20200920-182520-AA0E8');
                waitForJobCompletionService.destroy();
                done();
            } catch (e) {
                console.log("'waitForJobCompletion'案例失败：");
                expect(false).toBeTruthy();
                waitForJobCompletionService.destroy();
                done();
            }
        };
        const waitForJobCompletionService = new GeoprocessingService(serverUrl);
        expect(waitForJobCompletionService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url, paramter, serviceProcessCompleted) => {
            expect(url).toBe(`${serverUrl}/sps.WorkflowProcessFactory.models:sps/jobs/gp-20200920-182520-AA0E8`);
            expect(serviceProcessCompleted).not.toBeNull();
            return Promise.resolve(
                new Response(
                    `{"jobID":"gp-20200920-182520-AA0E8","processID":"sps.WorkflowProcessFactory.models:sps","messages":{"result":"{'countrdd-resultCount':''}","processMethodStatus":{"统计记录数":"WAITING","读取矢量数据":"WAITING"},"parameter":"{}"},"processTitle":"sps","state":{"formatStartTime":"2020-09-20 18:25:21","errorStackTrace":null,"success":true,"startTime":1600597521392,"formatEndTime":"2020-09-20 18:25:23","endTime":1600597523326,"runState":"FINISHED","errorMsg":null,"elapsedTime":0}}`
                )
            );
        });
        const options = {
            interval: 5000,
            statusCallback: function (state) {
                console.log('Job Status: ', state);
            }
        };
        waitForJobCompletionService.waitForJobCompletion(
            'gp-20200920-182520-AA0E8',
            'sps.WorkflowProcessFactory.models:sps',
            options,
            waitForJobCompletion
        );
    });

    it('getJobInfo', (done) => {
        const getJobInfo = (result) => {
            serverResult = result;
            try {
                expect(getJobInfoService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                getJobInfoService.destroy();
                done();
            } catch (e) {
                console.log("'getJobInfo'案例失败：");
                expect(false).toBeTruthy();
                getJobInfoService.destroy();
                done();
            }
        };
        const getJobInfoFailed = (result) => {
            server = result;
        };
        const getJobInfoService = new GeoprocessingService(serverUrl);
        expect(getJobInfoService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(`${serverUrl}/sps.WorkflowProcessFactory.models:sps/jobs/gp-20200910-200646-C2A3A`);
            return Promise.resolve(
                new Response(
                    `{"result":"{"countrdd-resultCount":"12"}","processMethodStatus":{"读取矢量数据":"FINISHED","计数":"FINISHED"},"parameter":"{}"}`
                )
            );
        });
        getJobInfoService.getJobInfo('sps.WorkflowProcessFactory.models:sps', 'gp-20200910-200646-C2A3A', getJobInfo);
    });

    it('cancelJob', (done) => {
        const cancelJobCallback = (result) => {
            serverResult = result;
            try {
                expect(cancelJobService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result.jobID).toBe('gp-20200910-200646-C2A3A');
                expect(serverResult.result.jobStatus).toBe('JobCancelled');
                expect(serverResult.result.length).toEqual();
                cancelJobService.destroy();
                done();
            } catch (e) {
                console.log("'cancelJob'案例失败：");
                expect(false).toBeTruthy();
                cancelJobService.destroy();
                done();
            }
        };
        const cancelJobService = new GeoprocessingService(serverUrl);
        expect(cancelJobService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(`${serverUrl}/sps.WorkflowProcessFactory.models:sps/jobs/gp-20200910-200646-C2A3A/cancel`);
            return Promise.resolve(
                new Response(`{"jobID":"gp-20200910-200646-C2A3A","jobStatus":"JobCancelled","succeed":true}`)
            );
        });
        cancelJobService.cancelJob('sps.WorkflowProcessFactory.models:sps', 'gp-20200910-200646-C2A3A', cancelJobCallback);
    });

    // 传参
    it('getJobsParameter', (done) => {
        const getJobs = (result) => {
            serverResult = result;
            try {
                expect(getJobsService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                let results = serverResult.result;
                for (let i = 0; i < results.length; i++) {
                    expect(results[0].jobID).toBe('gp-20200910-200646-C2A3A');
                    expect(results[1].jobID).toBe('gp-20200910-200646-17FB5');
                    expect(results[0].processID).toBe('sps.WorkflowProcessFactory.models:sps');
                    expect(results[0].processTitle).toBe('sps');
                }
                done();
            } catch (e) {
                console.log("'getJobs'案例失败：");
                expect(false).toBeTruthy();
                done();
            }
        };
        const getJobsService = new GeoprocessingService(serverUrl);
        expect(getJobsService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(serverUrl + '/sps.WorkflowProcessFactory.models:sps/jobs');
            return Promise.resolve(
                new Response(
                    `[{"jobID":"gp-20200910-200646-C2A3A","processID":"sps.WorkflowProcessFactory.models:sps","processTitle":"sps","state":{"formatStartTime":"2020-09-10 20:06:47","errorStackTrace":null,"success":true,"startTime":1599739607043,"formatEndTime":"2020-09-10 20:06:48","endTime":1599739608310,"runState":"CANCELED","errorMsg":null,"elapsedTime":0}},{"jobID":"gp-20200910-200646-17FB5","processID":"sps.WorkflowProcessFactory.models:sps","processTitle":"sps","state":{"formatStartTime":"2020-09-10 20:06:47","errorStackTrace":null,"success":true,"startTime":1599739607043,"formatEndTime":"2020-09-10 20:06:51","endTime":1599739611008,"runState":"FINISHED","errorMsg":null,"elapsedTime":0}}]`
                )
            );
        });
        getJobsService.getJobs(`sps.WorkflowProcessFactory.models:sps`, getJobs);
    });

    // 不传参
    it('getJobs', (done) => {
        const getJobs = (result) => {
            serverResult = result;
            try {
                expect(getJobsService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                let results = serverResult.result;
                for (let i = 0; i < results.length; i++) {
                    expect(results[0].jobID).toBe('gp-20200910-200646-C2A3A');
                    expect(results[1].jobID).toBe('gp-20200910-200646-17FB5');
                    expect(results[0].processID).toBe('sps.WorkflowProcessFactory.models:sps');
                    expect(results[0].processTitle).toBe('sps');
                }
                done();
            } catch (e) {
                console.log("'getJobs'案例失败：");
                expect(false).toBeTruthy();
                done();
            }
        };
        const getJobsService = new GeoprocessingService(serverUrl);
        expect(getJobsService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(serverUrl + '/jobs');
            return Promise.resolve(
                new Response(
                    `[{"jobID":"gp-20200910-200646-C2A3A","processID":"sps.WorkflowProcessFactory.models:sps","processTitle":"sps","state":{"formatStartTime":"2020-09-10 20:06:47","errorStackTrace":null,"success":true,"startTime":1599739607043,"formatEndTime":"2020-09-10 20:06:48","endTime":1599739608310,"runState":"CANCELED","errorMsg":null,"elapsedTime":0}},{"jobID":"gp-20200910-200646-17FB5","processID":"sps.WorkflowProcessFactory.models:sps","processTitle":"sps","state":{"formatStartTime":"2020-09-10 20:06:47","errorStackTrace":null,"success":true,"startTime":1599739607043,"formatEndTime":"2020-09-10 20:06:51","endTime":1599739611008,"runState":"FINISHED","errorMsg":null,"elapsedTime":0}}]`
                )
            );
        });
        getJobsService.getJobs(getJobs);
    });

    it('getResults', (done) => {
        const getResults = (result) => {
            serverResult = result;
            try {
                expect(getResultsService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result['countrdd-resultCount']).toBe('12');
                getResultsService.destroy();
                done();
            } catch (e) {
                console.log("'getResults'案例失败：");
                expect(false).toBeTruthy();
                getResultsService.destroy();
                done();
            }
        };
        const getResultsService = new GeoprocessingService(serverUrl);
        expect(getResultsService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(
                `${serverUrl}/sps.WorkflowProcessFactory.models:sps/jobs/gp-20200910-200646-C2A3A/results`
            );
            return Promise.resolve(new Response(`{"countrdd-resultCount":"12","succeed":true}`));
        });
        getResultsService.getResults('sps.WorkflowProcessFactory.models:sps', 'gp-20200910-200646-C2A3A', getResults);
    });

    it('filterResult', (done) => {
        const filterResult = (result) => {
            serverResult = result;
            try {
                expect(filterResultService).not.toBeNull();
                expect(serverResult).not.toBeNull();
                expect(serverResult.type).toBe('processCompleted');
                expect(serverResult.result).not.toBeNull();
                expect(serverResult.result['countrdd-resultCount']).toBe('12');
                filterResultService.destroy();
                done();
            } catch (e) {
                console.log("'filterResult'案例失败：");
                expect(false).toBeTruthy();
                filterResultService.destroy();
                done();
            }
        };
        const filterResultService = new GeoprocessingService(serverUrl);
        expect(filterResultService).not.toBeNull();
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(
                `${serverUrl}/sps.WorkflowProcessFactory.models:sps/jobs/gp-20200910-200646-C2A3A/results/countrdd-resultCount`
            );
            return Promise.resolve(new Response(`{"countrdd-resultCount":"12","succeed":true}`));
        });
        filterResultService.getResults(
            'sps.WorkflowProcessFactory.models:sps',
            'gp-20200910-200646-C2A3A',
            'countrdd-resultCount',
            filterResult
        );
    });
});
