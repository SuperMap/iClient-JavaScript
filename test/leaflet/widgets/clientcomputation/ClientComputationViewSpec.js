
import { ClientComputationLayer } from '../../../../src/leaflet/widgets/clientcomputation/clientComputationLayer';
import { ClientComputationView } from '../../../../src/leaflet/widgets/clientcomputation/ClientComputationView'
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import { QueryBySQLService } from '../../../../src/common/iServer/QueryBySQLService';
import { QueryBySQLParameters } from '../../../../src/common/iServer/QueryBySQLParameters';
import { FilterParameter } from '../../../../src/common/iServer/FilterParameter';
import { GeometryType } from '../../../../src/common/REST';
import { QueryOption } from '../../../../src/common/REST';
import '../../../../node_modules/leaflet.pm';
import '../../../resources/QueryService.js';

var map, url = GlobeParameter.WorldURL, testDiv, clientComputation;
var dataServiceURL = GlobeParameter.wokerURL;
describe('leaflet_clientcomputation_ClientComputationView', () => {
    var clientComputationLayer;
    var originalTimeout, resultLayer, setLayer;
    var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.id = 'map';
        testDiv.style.margin = "0 auto";
        testDiv.style.width = "800px";
        testDiv.style.height = "800px";
        document.body.appendChild(testDiv);
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: [20, 80],
            maxZoom: 18,
            zoom: 2
        });

        var wokerURL = "../../../base/libs/workers/TurfWorkerForTest.js";
        clientComputation = new ClientComputationView(wokerURL);
        clientComputation.addTo(map);


        var queryUrl = "https://www.supermapol.com/iserver/services/map_ShiLiShuJu/rest/maps/中国历史5级以上地震_1900至2016@自然气候数据";
        spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
            // let param = JSON.parse(queryString.replace(/\'/g, "\""));
            console.log(url);
            if (url.indexOf("/queryResults.json") > -1) {
                var escapedJson = clientComputationViewJson;
                return Promise.resolve(new Response(JSON.stringify(escapedJson)));

            }
            return Promise.resolve();
        });
        var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
        var QueryBySQLFailed = (serviceFailedEventArgs) => {
            queryFailedEventArgs = serviceFailedEventArgs;
        };
        var QueryBySQLCompleted = (queryEventArgs) => {
            serviceSuccessEventArgs = queryEventArgs;
        };
        var options = {
            eventListeners: {
                'processFailed': QueryBySQLFailed,
                'processCompleted': QueryBySQLCompleted
            }
        };
        var queryBySQLService = new QueryBySQLService(queryUrl, options);
        var params = new QueryBySQLParameters({

            expectCount: 2,
            queryOption: QueryOption.ATTRIBUTEANDGEOMETRY,
            queryParams: new Array(new FilterParameter({
                attributeFilter: "SmID>0",
                name: "中国历史5级以上地震_1900至2016@自然气候数据",
            }))
        })
        queryBySQLService.events.on({ 'processCompleted': QueryBySQLCompleted });
        queryBySQLService.processAsync(params);
        document.getElementById('getValueText').style.height = '1px';


        setTimeout(() => {
            try {
                var result = L.Util.transform(serviceSuccessEventArgs.result.recordsets[0].features, L.CRS.EPSG3857, L.CRS.EPSG4326);
                resultLayer = L.geoJSON(result, {
                    style: { fillColor: '#ff7373', color: '#ff7373', opacity: 1, fillOpacity: 0.8 },
                    pointToLayer: function (geoJsonPoint, latLng) {
                        return L.circleMarker(latLng, { radius: 6, color: '#ff7373', fillColor: '#ff7373' })
                    }
                }).addTo(map);
                setLayer = {
                    'layerName': "中国历史5级以上地震数据",
                    'layer': resultLayer,
                    'fields': ['震级', '深度', '经度', '纬度', 'SmID', 'SmX', 'SmY']
                };
                clientComputationLayer = new ClientComputationLayer(setLayer);
                clientComputation.addLayer(clientComputationLayer);
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("clientcomputation" + exception.name + ":" + exception.message);
                queryBySQLService.destroy();
                params.destroy();
                queryFailedEventArgs = null;
                serviceSuccessEventArgs = null;
            }
        }, 500)
    });

    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        map = null;
        document.body.removeChild(testDiv);
    });

    it('addLayer,isoline', (done) => {
        setTimeout(() => {
            try {
                expect(document.getElementById('dropDownTop').getAttribute('data-value')).toBe("isolines");
                clientComputation.viewModel.on('layerloaded', (e) => {
                    try {
                        if (e.name.indexOf("等值线") > -1) {
                            expect(e.layer._layers).not.toBeNull;
                            expect(e.layer._layers).not.toBeUndefined;
                            done();
                        }
                        else if (e.name.indexOf("缓冲区") > -1) {
                            expect(e.layer._layers).not.toBeNull;
                            expect(e.layer._layers).not.toBeUndefined;
                            done();
                        }
                    } catch (exception) {
                        console.log("'isoline'案例失败：" + exception.name + ":" + exception.message);
                        expect(false).toBeTruthy();
                        done();
                    }
                });

                var analysitBtn = document.getElementsByClassName('widget-analysis__analysisbtn--analysis')[0];
                analysitBtn.click();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("clientcomputation" + exception.name + ":" + exception.message);
                done();
            }
        }, 1000)

    });


    it('addLayer,buffer', (done) => {
        setTimeout(() => {
            try {
                document.getElementById('dropDownTop').click();
                document.getElementsByClassName('widget-dropdownbox__item')[2].click();
                clientComputation.viewModel.on('layerloaded', (e) => {
                    try {
                        if (e.name.indexOf("等值线") > -1) {
                            expect(e.name.layer._layers).not.toBeNull;
                            expect(e.layer._layers).not.toBeUndefined;
                            done();
                        }
                        else if (e.name.indexOf("缓冲区") > -1) {

                            expect(e.layer._layers).not.toBeNull;
                            expect(e.layer._layers).not.toBeUndefined;
                            done();
                        }

                    } catch (exception) {
                        console.log("'isoline'案例失败：" + exception.name + ":" + exception.message);
                        expect(false).toBeTruthy();
                        done();
                    }
                });
                expect(document.getElementById('bufferRadiusInput').getAttribute('placeholder')).toContain("10千米");
                var analysitBtn = document.getElementsByClassName('widget-analysis__analysisbtn--analysis')[0];
                analysitBtn.click();

            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("clientcomputation" + exception.name + ":" + exception.message);
                done();
            }
        }, 1000)

    });

    it('clearLayer,cancelAnalysis', (done) => {
        setTimeout(() => {
            try {
                spyOn(clientComputation.viewModel, 'cancelAnalysis').and.callThrough();
                spyOn(clientComputation.viewModel, 'clearLayers').and.callThrough();
                var analysitBtn = document.getElementsByClassName('widget-analysis__analysisbtn--analysis')[0];
                analysitBtn.click();
              
                var cancelBtn = document.getElementsByClassName('widget-analysis__analysisbtn--cancel')[0];
                cancelBtn.click();
                expect(clientComputation.viewModel.cancelAnalysis).toHaveBeenCalled();
                var delBtn = document.getElementsByClassName('widget-analysis__analysisbtn--deletelayers')[0];
                delBtn.click();
                expect(clientComputation.viewModel.clearLayers).toHaveBeenCalled();
                done();
            } catch (exception) {
                expect(false).toBeTruthy();
                console.log("clientcomputation" + exception.name + ":" + exception.message);
                done();
            }
        }, 1000)

    });

})