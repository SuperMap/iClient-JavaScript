import {
    ChartModel
} from '../../../../src/common/widgets/chart/ChartModel';
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import '../../../resources/LayersInfo';

describe('ChartModel', () => {
    var datasets ={
        type: "iServer",
        url: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data/datasources/Jingjin/datasets/BaseMap_P",
        withCredentials: false,
        queryInfo: {
            attributeFilter: "SmID > 0"
        }
    };
    var chartModel = new ChartModel(datasets);

    it('constructor, getDatasetInfo', (done) => {
        expect(chartModel.datasets.url).toBe(datasets.url);
        expect(chartModel.datasets.queryInfo).toBe(datasets.queryInfo);

        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(datasets.url);
            return Promise.resolve(new Response(JSON.stringify(layerInfo)));
        });

        var succeed = function (results) {
            var datasetInf = results.result;
            expect(results).not.toBeNull();
            expect(datasetInf.dataSourceName).toBe("World");
            expect(datasetInf.datasetName).toBe("continent_T");
            expect(datasetInf.mapName).toBe("continent_T@World.1");
            done();
        }
        chartModel.getDatasetInfo(succeed);
    });
    it('constructor, getDataFeatures', () => {
        var datasetInf = {
            result: {
                dataSourceName: "Jingjin",
                datasetName: "BaseMap_P",
                dataUrl: "http://support.supermap.com:8090/iserver/services/data-jingjin/rest/data"
            }
        }
        var succeed = function (results) {
            expect(results).not.toBeNull();
        }
        chartModel.getDataFeatures(datasetInf, succeed);
    });
    it('constructor, getLayerFeatures', () => {
        var dataset = {
            url: "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World/layers/Rivers@World@@World",
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        }
        var datasetInf = {
            result: {
                dataSourceName: "World",
                datasetName: "Rivers",
                mapName: "Rivers@World",
                dataUrl: "http://support.supermap.com:8090/iserver/services/map-world/rest/maps/World"
            }
        }
        var succeed = function (results) {
            expect(results).not.toBeNull();
        };
        chartModel.datasets = dataset;
        chartModel.getLayerFeatures(datasetInf, succeed);
    });
    it('constructor, getDataInfoByIptl', () => {
        var succeed = function (results) {
            expect(results).not.toBeNull();
        };
        chartModel.getDataInfoByIptl(succeed);
    
    }); 
    it('constructor, getServiceInfo_dataService', () => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1589681486',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(dataset.url);
            return Promise.resolve(new Response(JSON.stringify({"dataMetaInfo":{"firstRowIsHead":false,"previewURL":null,"fileEncoding":"UTF-8","proxiedServiceType":null,"hasScene":false,"xIndex":null,"yField":null,"yIndex":null,"separator":null,"url":null,"baseLayerType":null,"xField":null,"epsgCode":0,"realspaceType":null,"releaseTimeMilli":0,"fieldTypes":null,"bounds":null,"proxiedServiceUrl":null,"providers":null},"lastModfiedTime":1546590400135,"fileName":"sichuan(3).geojson","thumbnail":"http://192.168.12.39:8090/iportal/services/../web/static/portal/img/map/cloud.png","dataItemServices":[{"serviceType":"RESTDATA","accessCount":0,"address":"http://192.168.12.230:8090/iserver/services/data_sichuan-3-/rest","dataID":1589681486,"createTime":null,"serviceStatus":"PUBLISHED","editable":true,"updateTime":null,"serviceNode":"2e7t6p3r","serviceID":"data_sichuan-3-","serviceName":"data_sichuan-3-"}],"dataCheckResult":{"serviceCheckInfos":[{"serviceType":"RESTDATA","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":5,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"},{"serviceType":"RESTMAP","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":4,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}],"dataCheckInfo":{"checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":3,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}},"publishInfo":null,"authorizeSetting":[{"aliasName":"weidapao","entityRoles":null,"entityType":"USER","entityName":"weidapao","dataPermissionType":"DELETE","entityId":null}],"description":null,"userName":"weidapao","type":"GEOJSON","tags":[],"coordType":null,"size":7490,"createTime":1546590400135,"serviceStatus":"PUBLISHED","nickname":"weidapao","id":1589681486,"serviceId":null,"downloadCount":0,"storageId":"zhs4k8s2_pu59nqwi_ee9ea01d_5bd0_4cd6_9c18_e608778a7bd6","status":"OK","MD5":"c1e4a265e355de9a4aa2d5e40612285d"})));
        });
        var succeed = function (results) {
            
            expect(results).not.toBeNull();
           
            expect(chartModel._getDataSource).toHaveBeenCalled();
        }
        chartModel.getServiceInfo(dataset.url, succeed);

    });
    it('constructor, getServiceInfo_mapService', () => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1739577900',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(dataset.url);
            return Promise.resolve(new Response(JSON.stringify({"dataMetaInfo":null,"lastModfiedTime":1546852939455,"fileName":"sichuan(4).geojson","thumbnail":"http://192.168.12.39:8090/iportal/services/../web/static/portal/img/map/cloud.png","dataItemServices":[{"serviceType":"RESTMAP","accessCount":0,"address":"http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest","dataID":1739577900,"createTime":null,"serviceStatus":"PUBLISHED","editable":false,"updateTime":null,"serviceNode":"2e7t6p3r","serviceID":"map_sichuan-4-","serviceName":"map_sichuan-4-"}],"dataCheckResult":{"serviceCheckInfos":[{"serviceType":"RESTDATA","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":5,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"},{"serviceType":"RESTMAP","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":4,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}],"dataCheckInfo":{"checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":3,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}},"publishInfo":null,"authorizeSetting":[{"aliasName":"weidapao","entityRoles":null,"entityType":"USER","entityName":"weidapao","dataPermissionType":"DELETE","entityId":null}],"description":null,"userName":"weidapao","type":"GEOJSON","tags":["用户数据"],"coordType":null,"size":7490,"createTime":1546852939455,"serviceStatus":"PUBLISHED","nickname":"weidapao","id":1739577900,"serviceId":null,"downloadCount":0,"storageId":"zhs4k8s2_pu59nqwi_afe25c7a_2e39_42a9_b56c_89e060f2e171","status":"OK","MD5":"c1e4a265e355de9a4aa2d5e40612285d"})));
        });

        var succeed = function (results) {
            
            expect(results).not.toBeNull();
            expect(results.dataItemServices).toEqual([{
                "serviceType": "RESTMAP",
                "accessCount": 0,
                "address": "http://192.168.12.230:8090/iserver/services/map_sichuan-4-/rest",
                "dataID": 1739577900,
                "createTime": null,
                "serviceStatus": "PUBLISHED",
                "editable": false,
                "updateTime": null,
                "serviceNode": "2e7t6p3r",
                "serviceID": "map_sichuan-4-",
                "serviceName": "map_sichuan-4-"
              }]);
            expect(chartModel._getDataSource).toHaveBeenCalled();
        }
        chartModel.getServiceInfo(dataset.url, succeed);
    });
    it('constructor, getServiceInfo_map&dataService', () => {

        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1386367586',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(dataset.url);
            return Promise.resolve(new Response(JSON.stringify({"dataMetaInfo":{"firstRowIsHead":false,"previewURL":null,"fileEncoding":"UTF-8","proxiedServiceType":null,"hasScene":false,"xIndex":null,"yField":null,"yIndex":null,"separator":null,"url":null,"baseLayerType":null,"xField":null,"epsgCode":0,"realspaceType":null,"releaseTimeMilli":0,"fieldTypes":null,"bounds":null,"proxiedServiceUrl":null,"providers":null},"lastModfiedTime":1546917370780,"fileName":"sichuan(7).geojson","thumbnail":"http://192.168.12.39:8090/iportal/services/../web/static/portal/img/map/cloud.png","dataItemServices":[{"serviceType":"RESTMAP","accessCount":0,"address":"http://192.168.12.230:8090/iserver/services/map_sichuan-7-/rest","dataID":1386367586,"createTime":null,"serviceStatus":"PUBLISHED","editable":false,"updateTime":null,"serviceNode":"2e7t6p3r","serviceID":"map_sichuan-7-","serviceName":"map_sichuan-7-"},{"serviceType":"RESTDATA","accessCount":0,"address":"http://192.168.12.230:8090/iserver/services/data_sichuan-7-/rest","dataID":1386367586,"createTime":null,"serviceStatus":"PUBLISHED","editable":true,"updateTime":null,"serviceNode":"2e7t6p3r","serviceID":"data_sichuan-7-","serviceName":"data_sichuan-7-"}],"dataCheckResult":{"serviceCheckInfos":[{"serviceType":"RESTDATA","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":5,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"},{"serviceType":"RESTMAP","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":4,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}],"dataCheckInfo":{"checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":3,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}},"publishInfo":null,"authorizeSetting":[{"aliasName":"weidapao","entityRoles":null,"entityType":"USER","entityName":"weidapao","dataPermissionType":"DELETE","entityId":null}],"description":null,"userName":"weidapao","type":"GEOJSON","tags":[],"coordType":null,"size":7490,"createTime":1546917370780,"serviceStatus":"PUBLISHED","nickname":"weidapao","id":1386367586,"serviceId":null,"downloadCount":0,"storageId":"zhs4k8s2_pu59nqwi_976c5edc_e372_4c38_b9f0_04f196a7a426","status":"OK","MD5":"c1e4a265e355de9a4aa2d5e40612285d"})));
        });
 
        var succeed = function (results) {
            // expect(chartModel._getDataSource).toHaveBeenCalled();
        }
        chartModel.getServiceInfo(dataset.url, succeed);
    });
    it('constructor, getServiceInfo_noService', () => {

        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1102306300',
            withCredentials: false,
            queryInfo: {
                attributeFilter: "SmID > 0"
            } 
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe(dataset.url);
            
            return Promise.resolve(new Response(JSON.stringify({"dataMetaInfo":{"firstRowIsHead":false,"previewURL":null,"fileEncoding":"UTF-8","proxiedServiceType":null,"hasScene":false,"xIndex":null,"yField":null,"yIndex":null,"separator":null,"url":null,"baseLayerType":null,"xField":null,"epsgCode":0,"realspaceType":null,"releaseTimeMilli":0,"fieldTypes":null,"bounds":null,"proxiedServiceUrl":null,"providers":null},"lastModfiedTime":1546917236055,"fileName":"sichuan(6).geojson","thumbnail":"http://192.168.12.39:8090/iportal/services/../web/static/portal/img/map/cloud.png","dataItemServices":[],"dataCheckResult":{"serviceCheckInfos":[{"serviceType":"RESTDATA","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":5,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"},{"serviceType":"RESTMAP","checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":4,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}],"dataCheckInfo":{"checkStatus":"SUCCESS","checkMsg":null,"dataType":"GEOJSON","id":3,"MD5":"c1e4a265e355de9a4aa2d5e40612285d"}},"publishInfo":null,"authorizeSetting":[{"aliasName":"weidapao","entityRoles":null,"entityType":"USER","entityName":"weidapao","dataPermissionType":"DELETE","entityId":null}],"description":null,"userName":"weidapao","type":"GEOJSON","tags":[],"coordType":null,"size":7490,"createTime":1546917236055,"serviceStatus":"UNPUBLISHED","nickname":"weidapao","id":1102306300,"serviceId":null,"downloadCount":0,"storageId":"zhs4k8s2_pu59nqwi_e5927e9f_8373_4cde_b5f5_5ed4dc27a871","status":"OK","MD5":"c1e4a265e355de9a4aa2d5e40612285d"})));
        });

        chartModel.getServiceInfo(dataset.url, (results) => {
            expect(results).not.toBeNull();
            expect(results.dataItemServices).toEqual([]);
            expect(chartModel.getDatafromURL).toHaveBeenCalled();
        });
            
    });
    it('constructor, getDatafromContent_GEOJSON', () => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1102306300',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            expect(url).toBe( `${dataset.url}/content.json?pageSize=9999999&currentPage=1`);
            return Promise.resolve(new Response(JSON.stringify({"fileName":"sichuan(6).geojson","type":"GEOJSON","lineNumber":null,"content":"﻿{\"type\":\"FeatureCollection\",\"features\":[{\"geometry\":{\"coordinates\":[[[101.8400496800001,26.08599686926592],[101.6459944450001,26.33104981926121],[101.6382949200002,26.36052554426064],[101.6294072150001,26.37111045426046],[101.4559354950001,26.60654462425589],[101.4356364400001,26.74328867925329],[101.3577317150001,26.77492942425268],[101.3195551050001,26.89690842425037],[101.1556653050001,27.13277467424588],[101.0891752950001,27.20295577924454],[101.0449815100001,27.24137308924384],[100.6090615350001,27.87984454923211],[100.5093035100001,27.83949512923287],[100.414438030,27.84317572923285],[100.3058147050001,27.78592244923384],[100.1800329450001,27.90157090423179],[100.1686503550001,27.90528042423176],[100.0939198150001,28.03048598922947],[100.0998035550001,28.20291422922634],[100.1678965300001,28.33183894922416],[99.65223088500011,28.81666207921568],[99.42499795500009,28.42133468922253],[99.39585555500014,28.32327283922424],[99.40124399000014,28.30551019922455],[99.34606256000006,28.20713666922629],[99.13245506000010,28.72632957921718],[99.06578893000005,29.92579289419707],[98.84697362500013,30.85280563918240],[98.63101951500005,31.33230518417520],[98.81372710500011,31.31328031417540],[98.82594635500004,31.44083186417353],[98.42337596500009,31.95299688416607],[98.06762399500006,32.41716359915955],[97.38013112000010,32.79659981915433],[97.45742929500011,32.97326887415193],[97.52718777000007,33.07488311915060],[97.55711855500010,33.21427241414877],[97.68228648500008,33.43409993914595],[97.43272322500013,33.67892997414276],[97.45556429000010,33.88809671914019],[97.70319773000007,34.04709301413818],[97.74393326000006,34.15561819913680],[98.00579079500005,34.15156423913689],[98.43299843000011,33.99705853913882],[98.54568703500014,33.74542216414189],[98.98528561500007,33.09243881915038],[99.26222483000004,32.89631846415293],[99.33031206500004,32.88846651915306],[99.34739280500014,32.88906300915310],[99.76194724000004,32.79428281415437],[99.90806178000014,33.02288003415129],[100.1147921100001,32.70483581915558],[100.1562304750001,32.63484372915651],[100.2313648700001,32.65443778415621],[100.3354353700001,32.71894109915535],[100.3846642250,32.71230691915545],[100.3946874150001,32.70474109415553],[100.4712617350001,32.69267846415576],[100.6607000250001,32.58377762415720],[100.7528452800001,32.65135785915631],[100.7687986500001,32.64728558415635],[101.201341250,32.69755877415565],[101.1321794200001,32.90267756915284],[101.2227899350,33.27096149914803],[101.3951340800001,33.21844382914872],[101.5614994250001,33.15981434914944],[101.6589674100001,33.15341045914953],[101.6638241450,33.30812513914759],[101.7457706250001,33.44470212414572],[101.8901800300001,33.56219790414423],[101.8399858650001,33.29424919914773],[101.812936570,33.21966339914868],[101.8964678900001,33.14104783914970],[102.1614439250001,33.24131668414844],[102.2125049400001,33.27069542414802],[102.3035155300001,33.40718551914626],[102.436454880,33.44377269414581],[102.4574562700001,33.51246327914494],[102.3934567900001,33.59289282414383],[102.2234802600001,33.96366517913926],[102.4238314550001,34.06144516413805],[102.6219673650001,34.13454982413715],[102.6330515050001,34.17086650413662],[102.9589938150001,34.26031190913554],[103.1209305000001,34.04052996913827],[103.1261180350001,34.03562653913829],[103.1578559550001,34.00333558413869],[103.2275175950001,33.79992470414123],[103.3004823050001,33.76074624914179],[103.5484497650001,33.74095814914202],[103.5694395300001,33.70333057414248],[103.6662842300001,33.68683694914263],[103.672657240,33.68889416414265],[103.6791029350001,33.69063396414261],[104.1787900800001,33.58242296914398],[104.3441009200001,33.33804355414721],[104.3959611150001,33.30002886414762],[104.395100540,33.29526031414768],[104.3228340150001,33.25948345914816],[104.3466196800001,32.94139368915234],[104.2780104300001,32.88548407415318],[104.9486048550001,32.62182032915675],[105.4563312400001,32.75402873915490],[105.4626254500001,32.93158497915245],[105.6735426350001,32.72811445915520],[106.0948831850001,32.80643618915423],[106.1210688150001,32.72326757415527],[106.5402450950001,32.67475465415603],[107.0906551500001,32.66583920915609],[107.1749896150001,32.47688322415868],[107.2778439450001,32.45911272415894],[107.4286721700001,32.49792869915845],[107.5867108500002,32.40944231915960],[108.0204316850001,32.20637817416245],[108.5087618450001,32.23138340916208],[108.4163491950001,32.12482593916361],[108.3940919800001,32.06934211916445],[108.3368557300001,32.00860753916527],[108.3322986700001,31.98411290916570],[108.2781892050001,31.95428539916610],[108.5099491700001,31.65791262917033],[108.2084531100001,31.40450852917404],[108.0863819450001,31.20741711417706],[107.8303921450001,30.79970243918319],[107.665280550,30.84695713418245],[107.4429038300001,30.75561133418388],[107.4522026700001,30.70435924918469],[107.4552793950001,30.57379066418672],[106.9855992800001,30.08256291919457],[106.9534736400001,30.06910420919476],[106.8450548500001,30.04576171419507],[106.6971232550001,30.09945977419432],[106.5065768050001,30.29130705919124],[106.1756834400001,30.24304005419193],[105.9448228450001,30.37475194418987],[105.7663947200001,30.37743876418983],[105.6423915700001,30.27596766419142],[105.6174933050,30.23656033919210],[105.6211978850001,30.18904337419286],[105.5940867500001,30.15488777919337],[105.6095834450001,30.11095539919408],[105.7150406700001,29.94382797419679],[105.6465486750001,29.84340074419838],[105.321193770,29.49690214420407],[105.5791881950001,29.27328695920784],[105.7051293600001,29.23400508420847],[105.9099685500002,28.90253416421420],[106.0170823250001,28.95457198421322],[106.0367359550,28.92119067921387],[106.0560925750001,28.91358444921392],[106.0750436750001,28.91566347921388],[106.2454558550001,28.80245013921594],[106.2868178000001,28.54170661422041],[105.9345097300001,28.69415612921779],[105.8967201300001,28.67285128421813],[105.9025306250001,28.61682815921908],[105.8938553650,28.60663775921930],[105.6220462900001,28.49518222922119],[105.7335680100001,28.30301407922454],[105.8296146350001,28.29091872922479],[105.9853844400001,28.12151025922777],[106.2521889450,28.08663249922844],[106.2594429350,27.78212393923401],[105.5471714950,27.73201126923481],[105.3207787650001,27.72332972423504],[105.2882569650001,27.73754407423474],[105.1693947050,28.01753509422969],[105.0997325800001,28.08533321422850],[104.905620050,27.95358326423090],[104.907876210,27.94218674423105],[104.4696709150001,27.91374051423157],[104.3801320650001,28.06057769422896],[104.3972248200001,28.29246068922480],[104.2576279300001,28.45169975422194],[104.3532639350001,28.55875088922009],[104.3614694950001,28.64935077921852],[103.8381367500001,28.59190655921956],[103.8696358400001,28.33509248922404],[103.6933545700001,28.21792502922608],[103.600244790,28.24094737422577],[103.4918890250001,28.03134204922939],[103.5084974950001,27.92392906423133],[103.0087396950002,27.37990095924134],[102.9176780900001,27.36278888424164],[102.9893961500001,26.78107262425256],[102.9561061100001,26.34398943426089],[102.7224044550001,26.24537745426283],[102.6557213000001,26.22781611926318],[102.5287349150001,26.33512435926116],[101.9565442300001,26.08884462426595],[101.8400496800001,26.08599686926592]]],\"type\":\"Polygon\"},\"properties\":{\"GDP_2014\":28536.660,\"NAME\":\"四川省\",\"PAC\":510402.0,\"PINYIN\":\"Sichuan Sheng\",\"per_capita_GDP_2014\":3.505732186732187,\"pop_2014\":8140,\"pop_2014_rural\":4371,\"pop_2014_urban\":3769},\"type\":\"Feature\"}]}"})));
        });

        chartModel.getDatafromContent(dataset.url, (results) => {
            expect(results).not.toBeNull();
        });  
    });
    it('constructor, getDatafromContent_EXCEL', () => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1815044756',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            // expect(url).toBe(dataset.url);
            return Promise.resolve(new Response(JSON.stringify(
                {"fileName":"全国省级行政规划.xlsx","type":"EXCEL","lineNumber":32,"content":{"colTitles":["省名"],"rows":[["北京"],["天津"],["上海"],["重庆"],["河北"],["河南"],["云南"],["辽宁"],["黑龙江"],["湖南"],["安徽"],["山东"],["新疆"],["江苏"],["浙江"],["江西"],["湖北"],["广西"],["甘肃"],["山西"],["内蒙古"],["陕西"],["吉林"],["福建"],["贵州"],["广东"],["青海"],["西藏"],["四川"],["宁夏"],["海南"],["台湾"]]}}
            )));
        });
        chartModel.getDatafromContent(dataset.url, (results) => {
            expect(results).not.toBeNull();
        });
    });
    it('constructor, getDatafromContent_CSV', () => {
        let dataset = {
            type: 'iPortal', //iServer iPortal 
            url: 'http://192.168.12.39:8090/iportal/web/datas/1987252595',
            withCredentials: true,
            queryInfo: {
                attributeFilter: "SmID > 0"
            }
        };
        spyOn(FetchRequest, 'get').and.callFake((url) => {
            // expect(url).toBe(dataset.url);
            return Promise.resolve(new Response(JSON.stringify(
                {"fileName":"全国省级区域人口密度.csv","type":"CSV","lineNumber":34,"content":{"colTitles":["﻿省","人口","面积","人口密度"],"rows":[["广东省","10430","17.98","580"],["山东省","9579","15.71","610"],["河南省","9402","16.7","563"],["四川省","8041","48.5","166"],["江苏省","7865","10.26","767"],["河北省","7185","19","378"],["湖南省","6568","21.19","310"],["安徽省","5950","13.96","426"],["湖北省","5723","18.59","308"],["浙江省","5442","10.18","535"],["广西省","4602","23.63","195"],["云南省","4596","39.4","117"],["江西省","4456","16.69","267"],["辽宁省","4374","14.57","300"],["黑龙江省","3831","45.4","84"],["陕西省","3732","20.56","182"],["福建省","3689","12.14","304"],["山西省","3571","15.6","229"],["贵州省","3474","17.61","197"],["重庆市","2884","8.24","350"],["吉林省","2746","18.74","147"],["甘肃省","2557","45.5","56"],["内蒙古","2470","118.3","21"],["上海市","2301","0.634","3629"],["新疆维吾尔自治区","2181","166","13"],["北京市","1961","1.68","1167"],["天津市","1293","1.13","1145"],["海南省","867","3.5","248"],["宁夏回族自治区","630","6.64","95"],["青海省","562","69.66","8"],["西藏自治区","300","122.84","2.5"],["香港","709","0.1104","6422"],["澳门","55","0.0029","19045"],["台湾省","2316","3.6","643"]]}}
            )));
        });

        var succeed = function (results) { 

            expect(results).not.toBeNull();
        }
        chartModel.getDatafromContent(dataset.url, succeed);
    });
});