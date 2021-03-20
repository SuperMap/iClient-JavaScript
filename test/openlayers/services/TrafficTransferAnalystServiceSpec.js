import {TrafficTransferAnalystService} from '../../../src/openlayers/services/TrafficTransferAnalystService';
import {StopQueryParameters} from '../../../src/common/iServer/StopQueryParameters';
import {TransferPathParameters} from '../../../src/common/iServer/TransferPathParameters';
import {TransferSolutionParameters} from '../../../src/common/iServer/TransferSolutionParameters';
import { FetchRequest } from '../../../src/common/util/FetchRequest';

var url = GlobeParameter.trafficTransferURL;
var options = {

};
describe('openlayers_TrafficTransferAnalystService', () => {
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

    //站点查询服务 返回坐标
    it('queryStop_returnPosition:true', (done) => {
        var stopQueryParameters = new StopQueryParameters({
            keyWord: "人民",
            //是否返回站点坐标信息
            returnPosition: true
        });
        var service = new TrafficTransferAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/stops/keyword/人民");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":{"x":5308.614037099708,"y":-3935.573639156803}}]`));
        });
        service.queryStop(stopQueryParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result[0].name).toEqual("人民广场");
                expect(serviceResult.result[0].id).toEqual(164);
                expect(serviceResult.result[0].position.x).not.toBeNull();
                expect(serviceResult.result[0].position.y).not.toBeNull();
                expect(serviceResult.result[0].stopID).toEqual(serviceResult.result[0].id);
                done();
            } catch (e) {
                console.log("'queryStop_returnPosition'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //站点查询服务, 不返回坐标
    it('queryStop_returnPosition:false', (done) => {
        var stopQueryParameters = new StopQueryParameters({
            keyWord: "人民",
            //是否返回站点坐标信息
            returnPosition: false
        });
        var service = new TrafficTransferAnalystService(url, options);
        spyOn(FetchRequest, 'commit').and.callFake((method, testUrl) => {
            expect(method).toBe("GET");
            expect(testUrl).toBe(url + "/stops/keyword/人民");
            return Promise.resolve(new Response(`[{"name":"人民广场","alias":null,"stopID":164,"id":164,"position":null}]`));
        });
        service.queryStop(stopQueryParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result[0].name).toEqual("人民广场");
                expect(serviceResult.result[0].id).toEqual(164);
                expect(serviceResult.result[0].position).toBeNull();
                expect(serviceResult.result[0].stopID).toEqual(serviceResult.result[0].id);
                done();
            } catch (e) {
                console.log("'queryStop_returnPosition_false'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //交通换乘线路查询服务  按ID进行查询
    it('analysisTransferPath_ID', (done) => {
        var transferPathParameters = new TransferPathParameters({
            points: [175, 164],
            transferLines: [{"lineID": 27, "startStopIndex": 7, "endStopIndex": 9}]
        });
        var service = new TrafficTransferAnalystService(url, options);
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`{"count":2,"totalDistance":792.8521407250088,"transferCount":0,"items":[{"lastTime":null,"distance":291.00463130468444,"lineName":"","lineAliasName":"","startStopName":"儿童医院","startPosition":{"x":4941.429516095579,"y":-3566.823103168608},"isWalking":true,"firstTime":null,"startIndex":-1,"route":{"center":{"x":4874.480066291473,"y":-3567.7280617670363},"parts":[18],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4941.429516095579,"y":-3566.823103168608},{"x":4949.509600210931,"y":-3551.5203072073978},{"x":4949.509600210931,"y":-3551.5203072073978},{"x":4949.407127903948,"y":-3551.466200437497},{"x":4924.247599450441,"y":-3538.4711534470225},{"x":4924.247599450441,"y":-3538.4711534470225},{"x":4879.17335530819,"y":-3558.5799928023343},{"x":4879.17335530819,"y":-3558.5799928023343},{"x":4874.480066291473,"y":-3567.7280617670363},{"x":4874.480066291473,"y":-3567.7280617670363},{"x":4856.323071256529,"y":-3603.1193283563716},{"x":4856.323071256529,"y":-3603.1193283563716},{"x":4828.885473481026,"y":-3656.600167866157},{"x":4828.885473481026,"y":-3656.600167866157},{"x":4813.649747578237,"y":-3686.297352673989},{"x":4813.649747578237,"y":-3686.297352673989},{"x":4860.528613808599,"y":-3709.63189169167},{"x":4860.528613808599,"y":-3709.63189169167}]},"endPosition":{"x":4860.528613808599,"y":-3709.63189169167},"endIndex":-1,"endStopAliasName":"","lineType":-1,"passStopCount":0,"endStopName":"金都饭店","startStopAliasName":""},{"lastTime":null,"distance":501.84750942032434,"lineName":"22路","lineAliasName":"","startStopName":"金都饭店","startPosition":{"x":4860.528613808599,"y":-3709.63189169167},"isWalking":false,"firstTime":null,"startIndex":7,"route":{"center":{"x":5188.294666306223,"y":-3872.653816371269},"parts":[5],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4860.528613808599,"y":-3709.63189169167},{"x":5046.587544561529,"y":-3801.937705219916},{"x":5188.294666306223,"y":-3872.653816371269},{"x":5188.294666306223,"y":-3872.653816371269},{"x":5308.614037099708,"y":-3935.573639156803}]},"endPosition":{"x":5308.614037099708,"y":-3935.573639156803},"endIndex":9,"endStopAliasName":"","lineType":0,"passStopCount":3,"endStopName":"人民广场","startStopAliasName":""}]}`));
        });
        service.analysisTransferPath(transferPathParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.count).toEqual(2);
                var items = serviceResult.result.items;
                expect(items.length).toEqual(serviceResult.result.count);
                expect(items[0].distance).not.toBeNaN();
                expect(items[0].lineType).toEqual(-1);
                expect(items[0].isWalking).toEqual(true);
                expect(items[0].endStopName).toEqual("金都饭店");
                expect(items[0].startStopName).toEqual("儿童医院");
                expect(items[1].distance).toEqual(501.84750942032434);
                expect(items[1].endStopName).toEqual("人民广场");
                expect(items[1].startStopName).toEqual("金都饭店");
                expect(items[1].lineName).toEqual("22路");
                expect(items[1].lineType).toEqual(0);
                expect(items[1].passStopCount).toEqual(3);
                expect(items[1].startIndex).toEqual(7);
                expect(items[1].endIndex).toEqual(9);
                expect(serviceResult.result.totalDistance).not.toBeNaN();
                expect(serviceResult.result.transferCount).toEqual(0);
                done();
            } catch (e) {
                console.log("'analysisTransferPath_ID'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //交通换乘线路查询服务  按坐标进行查询
    it('analysisTransferPath_position', (done) => {
        var transferPathParameters = new TransferPathParameters({
            points: [{x: 4941, y: -3566}, {x: 5308, y: -3935}],
            transferLines: [{"lineID": 27, "startStopIndex": 7, "endStopIndex": 9}]
        });
        var service = new TrafficTransferAnalystService(url, options);
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`{"count":2,"totalDistance":796.7259786798306,"transferCount":0,"items":[{"lastTime":null,"distance":289.5549539610702,"lineName":"","lineAliasName":"","startStopName":"","startPosition":{"x":4941,"y":-3566},"isWalking":true,"firstTime":null,"startIndex":-1,"route":{"center":{"x":4874.480066291473,"y":-3567.7280617670363},"parts":[17],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4941,"y":-3566},{"x":4948.69640103683,"y":-3551.099105757934},{"x":4948.69640103683,"y":-3551.099105757934},{"x":4924.247599450441,"y":-3538.4711534470225},{"x":4924.247599450441,"y":-3538.4711534470225},{"x":4879.17335530819,"y":-3558.5799928023343},{"x":4879.17335530819,"y":-3558.5799928023343},{"x":4874.480066291473,"y":-3567.7280617670363},{"x":4874.480066291473,"y":-3567.7280617670363},{"x":4856.323071256529,"y":-3603.1193283563716},{"x":4856.323071256529,"y":-3603.1193283563716},{"x":4828.885473481026,"y":-3656.600167866157},{"x":4828.885473481026,"y":-3656.600167866157},{"x":4813.649747578237,"y":-3686.297352673989},{"x":4813.649747578237,"y":-3686.297352673989},{"x":4860.528613808599,"y":-3709.63189169167},{"x":4860.528613808599,"y":-3709.63189169167}]},"endPosition":{"x":4860.528613808599,"y":-3709.63189169167},"endIndex":-1,"endStopAliasName":"","lineType":-1,"passStopCount":0,"endStopName":"金都饭店","startStopAliasName":""},{"lastTime":null,"distance":501.84750942032434,"lineName":"22路","lineAliasName":"","startStopName":"金都饭店","startPosition":{"x":4860.528613808599,"y":-3709.63189169167},"isWalking":false,"firstTime":null,"startIndex":7,"route":{"center":{"x":5188.294666306223,"y":-3872.653816371269},"parts":[5],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4860.528613808599,"y":-3709.63189169167},{"x":5046.587544561529,"y":-3801.937705219916},{"x":5188.294666306223,"y":-3872.653816371269},{"x":5188.294666306223,"y":-3872.653816371269},{"x":5308.614037099708,"y":-3935.573639156803}]},"endPosition":{"x":5308.614037099708,"y":-3935.573639156803},"endIndex":9,"endStopAliasName":"","lineType":0,"passStopCount":3,"endStopName":"人民广场","startStopAliasName":""}]}`));
        });
        service.analysisTransferPath(transferPathParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.count).toEqual(2);
                var items = serviceResult.result.items;
                expect(items.length).toEqual(serviceResult.result.count);
                expect(items[0].distance).not.toBeNaN();
                expect(items[0].lineType).toEqual(-1);
                expect(items[0].isWalking).toEqual(true);
                expect(items[0].endStopName).toEqual("金都饭店");
                expect(items[1].distance).toEqual(501.84750942032434);
                expect(items[1].endStopName).toEqual("人民广场");
                expect(items[1].startStopName).toEqual("金都饭店");
                expect(items[1].lineName).toEqual("22路");
                expect(items[1].lineType).toEqual(0);
                expect(items[1].passStopCount).toEqual(3);
                expect(items[1].startIndex).toEqual(7);
                expect(items[1].endIndex).toEqual(9);
                expect(serviceResult.result.totalDistance).not.toBeNaN();
                expect(serviceResult.result.transferCount).toEqual(0);
                done();
            } catch (e) {
                console.log("'analysisTransferPath_position'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });

    //交通换乘方案查询服务
    it('analysisTransferSolution', (done) => {
        var transferSolutionParameters = new TransferSolutionParameters({
            solutionCount: 3,
            //交通换乘策略类型: 时间最短、距离最短、最少换乘、最少步行:transferTactic
            //乘车偏好枚举:transferPreference
            //步行与公交的消耗权重比
            walkingRatio: 5,
            points: [175, 179]
        });
        var service = new TrafficTransferAnalystService(url, options);
        spyOn(FetchRequest, 'get').and.callFake(() => {
            return Promise.resolve(new Response(`{"solutionItems":[{"transferCount":1,"linesItems":[{"lineItems":[{"endStopAliasName":"","startStopName":"百菊大厦","lineName":"25路","lineAliasName":"","lineID":28,"endStopName":"建设街","startStopAliasName":"","endStopIndex":4,"startStopIndex":3}]},{"lineItems":[{"endStopAliasName":"","startStopName":"西安桥","lineName":"长春轻轨(长春站-长影世纪城)","lineAliasName":"","lineID":29,"endStopName":"亚泰大街","startStopAliasName":"","endStopIndex":18,"startStopIndex":3}]}]},{"transferCount":1,"linesItems":[{"lineItems":[{"endStopAliasName":"","startStopName":"西安大路","lineName":"62路","lineAliasName":"","lineID":15,"endStopName":"南湖","startStopAliasName":"","endStopIndex":10,"startStopIndex":6}]},{"lineItems":[{"endStopAliasName":"","startStopName":"南湖新村","lineName":"20路","lineAliasName":"","lineID":20,"endStopName":"工农广场","startStopAliasName":"","endStopIndex":5,"startStopIndex":4},{"endStopAliasName":"","startStopName":"南湖新村","lineName":"6-28路","lineAliasName":"","lineID":23,"endStopName":"工农广场","startStopAliasName":"","endStopIndex":4,"startStopIndex":3}]}]},{"transferCount":1,"linesItems":[{"lineItems":[{"endStopAliasName":"","startStopName":"西安大路","lineName":"62路","lineAliasName":"","lineID":15,"endStopName":"欧亚商都","startStopAliasName":"","endStopIndex":15,"startStopIndex":6}]},{"lineItems":[{"endStopAliasName":"","startStopName":"解放桥","lineName":"长春轻轨(长春站-长影世纪城)","lineAliasName":"","lineID":29,"endStopName":"亚泰大街","startStopAliasName":"","endStopIndex":18,"startStopIndex":6}]}]}],"defaultGuide":{"count":5,"totalDistance":7953.67659198908,"transferCount":1,"items":[{"lastTime":null,"distance":417.6542951279185,"lineName":"","lineAliasName":"","startStopName":"儿童医院","startPosition":{"x":4941.429516095579,"y":-3566.823103168608},"isWalking":true,"firstTime":null,"startIndex":-1,"route":{"center":{"x":4906.689693593579,"y":-3427.2844237373515},"parts":[21],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4941.429516095579,"y":-3566.823103168608},{"x":4949.509600210931,"y":-3551.5203072073978},{"x":4949.509600210931,"y":-3551.5203072073978},{"x":4949.407127903948,"y":-3551.466200437497},{"x":4924.247599450441,"y":-3538.4711534470225},{"x":4924.247599450441,"y":-3538.4711534470225},{"x":4896.770868497049,"y":-3524.279257500174},{"x":4896.770868497049,"y":-3524.279257500174},{"x":4937.675837271815,"y":-3444.548076654993},{"x":4937.675837271815,"y":-3444.548076654993},{"x":4906.689693593579,"y":-3427.2844237373515},{"x":4906.689693593579,"y":-3427.2844237373515},{"x":4844.7856789874295,"y":-3392.795155454515},{"x":4844.7856789874295,"y":-3392.795155454515},{"x":4854.429319042862,"y":-3373.0770871297345},{"x":4854.429319042862,"y":-3373.0770871297345},{"x":4831.8941978169205,"y":-3382.052940499389},{"x":4779.273966682457,"y":-3320.4210952527596},{"x":4779.273966682457,"y":-3320.4210952527596},{"x":4796.121681673265,"y":-3314.681763772375},{"x":4796.121681673265,"y":-3314.681763772375}]},"endPosition":{"x":4796.121681673265,"y":-3314.681763772375},"endIndex":-1,"endStopAliasName":"","lineType":-1,"passStopCount":0,"endStopName":"百菊大厦","startStopAliasName":""},{"lastTime":null,"distance":354.1977410478687,"lineName":"25路","lineAliasName":"","startStopName":"百菊大厦","startPosition":{"x":4796.121681673265,"y":-3314.681763772375},"isWalking":false,"firstTime":null,"startIndex":3,"route":{"center":{"x":4634.900351361861,"y":-3597.372766694338},"parts":[4],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4796.121681673265,"y":-3314.681763772375},{"x":4779.273966682457,"y":-3320.4210952527596},{"x":4634.900351361861,"y":-3597.372766694338},{"x":4623.016038635845,"y":-3618.3109130572607}]},"endPosition":{"x":4623.016038635845,"y":-3618.3109130572607},"endIndex":4,"endStopAliasName":"","lineType":0,"passStopCount":2,"endStopName":"建设街","startStopAliasName":""},{"lastTime":null,"distance":276.0492253990843,"lineName":"","lineAliasName":"","startStopName":"建设街","startPosition":{"x":4623.016038635845,"y":-3618.3109130572607},"isWalking":true,"firstTime":null,"startIndex":3,"route":{"center":{"x":4505.614206737966,"y":-3532.357191716141},"parts":[18],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4623.016038635845,"y":-3618.3109130572607},{"x":4623.016038635845,"y":-3618.3109130572607},{"x":4634.639927736186,"y":-3597.233315084902},{"x":4634.639927736186,"y":-3597.233315084902},{"x":4571.632384228743,"y":-3565.811623344229},{"x":4571.632384228743,"y":-3565.811623344229},{"x":4559.81106799358,"y":-3559.916364871465},{"x":4526.238298423384,"y":-3542.8445686741716},{"x":4526.238298423384,"y":-3542.8445686741716},{"x":4505.614206737966,"y":-3532.357191716141},{"x":4484.104545778214,"y":-3522.1612736864004},{"x":4484.104545778214,"y":-3522.1612736864004},{"x":4471.53788269508,"y":-3516.2044774847886},{"x":4471.53788269508,"y":-3516.2044774847886},{"x":4424.076591556139,"y":-3493.7070780630224},{"x":4415.048753602755,"y":-3489.3779576409333},{"x":4415.048753602755,"y":-3489.3779576409333},{"x":4418.211016555285,"y":-3482.7834546662034}]},"endPosition":{"x":4418.211016555285,"y":-3482.7834546662034},"endIndex":4,"endStopAliasName":"","lineType":-1,"passStopCount":2,"endStopName":"西安桥","startStopAliasName":""},{"lastTime":null,"distance":6227.4392786751505,"lineName":"长春轻轨(长春站-长影世纪城)","lineAliasName":"","startStopName":"西安桥","startPosition":{"x":4418.211016555285,"y":-3482.7834546662034},"isWalking":false,"firstTime":null,"startIndex":3,"route":{"center":{"x":2899.0347936021903,"y":-5697.124076510769},"parts":[22],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":4418.211016555285,"y":-3482.7834546662034},{"x":4342.783383832161,"y":-3606.63292666546},{"x":4287.147747788968,"y":-3717.904198751845},{"x":4280.3858098153905,"y":-3747.7422439351376},{"x":4142.9138398983805,"y":-4005.3320704093085},{"x":3941.3218017881604,"y":-4382.389670274902},{"x":3710.3959376990533,"y":-4797.6119499336355},{"x":3482.60493037014,"y":-5055.953208356819},{"x":3417.0576779101875,"y":-5135.41251521294},{"x":3191.33284679606,"y":-5359.056933137076},{"x":2914.7943838547853,"y":-5637.680680031864},{"x":2899.0347936021903,"y":-5697.124076510769},{"x":2878.6103784395914,"y":-5785.200086724578},{"x":3070.663945643314,"y":-6027.354584503185},{"x":3446.420924954946,"y":-6609.08205617823},{"x":3512.550810427892,"y":-6646.919381625014},{"x":3975.2640810231683,"y":-6687.979180957802},{"x":4167.880965275359,"y":-6705.170950944788},{"x":4401.927449149453,"y":-6698.9297113748125},{"x":4955.015612265349,"y":-6687.979180957802},{"x":5258.404580746592,"y":-6687.979180957802},{"x":5855.096062358836,"y":-6687.979180957802}]},"endPosition":{"x":5855.096062358836,"y":-6687.979180957802},"endIndex":18,"endStopAliasName":"","lineType":1,"passStopCount":16,"endStopName":"亚泰大街","startStopAliasName":""},{"lastTime":null,"distance":678.336051739058,"lineName":"","lineAliasName":"","startStopName":"亚泰大街","startPosition":{"x":5855.096062358836,"y":-6687.979180957802},"isWalking":true,"firstTime":null,"startIndex":3,"route":{"center":{"x":5772.229769069949,"y":-6202.683141014275},"parts":[23],"style":null,"prjCoordSys":null,"id":0,"type":"LINE","partTopo":null,"points":[{"x":5855.096062358836,"y":-6687.979180957802},{"x":5855.057315519149,"y":-6673.205564511141},{"x":5855.057315519149,"y":-6673.205564511141},{"x":5861.332868217025,"y":-6673.189105586868},{"x":5861.332868217025,"y":-6673.189105586868},{"x":5832.722632688556,"y":-6529.201604465568},{"x":5780.97451773789,"y":-6252.208058256915},{"x":5780.97451773789,"y":-6252.208058256915},{"x":5780.268590850036,"y":-6248.42942415175},{"x":5779.908071087006,"y":-6246.377825098129},{"x":5779.908071087006,"y":-6246.377825098129},{"x":5772.229769069949,"y":-6202.683141014275},{"x":5772.229769069949,"y":-6202.683141014275},{"x":5764.418824293608,"y":-6158.233630739677},{"x":5764.418824293608,"y":-6158.233630739677},{"x":5753.104652254233,"y":-6093.848409653991},{"x":5753.104652254233,"y":-6093.848409653991},{"x":5750.270754425143,"y":-6077.721631872536},{"x":5746.455151549389,"y":-6061.388173948254},{"x":5746.455151549389,"y":-6061.388173948254},{"x":5771.346297787511,"y":-6061.326933614708},{"x":5771.346297787511,"y":-6061.326933614708},{"x":5771.370572784777,"y":-6071.19351127508}]},"endPosition":{"x":5771.370572784777,"y":-6071.19351127508},"endIndex":18,"endStopAliasName":"","lineType":-1,"passStopCount":16,"endStopName":"净水厂","startStopAliasName":""}]},"suggestWalking":false}`));
        });
        service.analysisTransferSolution(transferSolutionParameters, (result) => {
            serviceResult = result;
            try {
                expect(service).not.toBeNull();
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toEqual("processCompleted");
                expect(serviceResult.result.suggestWalking).toEqual(false);
                expect(serviceResult.result.defaultGuide.count).toEqual(5);
                var items = serviceResult.result.defaultGuide.items;
                expect(items.length).toEqual(serviceResult.result.defaultGuide.count);
                expect(items[0].endStopName).toEqual("百菊大厦");
                expect(items[0].startStopName).toEqual("儿童医院");
                expect(items[1].endStopName).toEqual("建设街");
                expect(items[1].startStopName).toEqual(items[0].endStopName);
                expect(items[2].endStopName).toEqual("西安桥");
                expect(items[2].startStopName).toEqual(items[1].endStopName);
                expect(items[3].endStopName).toEqual("亚泰大街");
                expect(items[3].startStopName).toEqual(items[2].endStopName);
                expect(items[4].endStopName).toEqual("净水厂");
                expect(items[4].startStopName).toEqual(items[3].endStopName);
                var solutionItems = serviceResult.result.solutionItems;
                expect(solutionItems.length).toEqual(3);
                expect(solutionItems[0].transferCount).toEqual(1);
                var lineItems = solutionItems[0].linesItems[0].lineItems;
                expect(lineItems[0].endStopIndex).toEqual(4);
                expect(lineItems[0].endStopName).toEqual("建设街");
                expect(lineItems[0].lineName).toEqual("25路");
                expect(lineItems[0].lineID).toEqual(28);
                expect(lineItems[0].startStopIndex).toEqual(3);
                expect(lineItems[0].startStopName).toEqual("百菊大厦");
                expect(serviceResult.result.defaultGuide.totalDistance).not.toBeNaN();
                expect(serviceResult.result.defaultGuide.transferCount).toEqual(1);
                done();
            } catch (e) {
                console.log("'analysisTransferSolution'案例失败" + e.name + ":" + e.message);
                expect(false).toBeTruthy();
                done();
            }
        });
    });
});