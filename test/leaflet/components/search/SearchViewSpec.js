import { SearchView } from '../../../../src/leaflet/components/search/SearchView';
import { GeoJSONLayerWithName } from '../../../../src/leaflet/components/commonmodels/GeoJSONLayerWithName';
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import { QueryBySQLService } from '../../../../src/common/iServer/QueryBySQLService';
import { QueryBySQLParameters } from '../../../../src/common/iServer/QueryBySQLParameters';


var map, url = GlobeParameter.WorldURL, testDiv;
var poiSearch;
describe('leaflet_search_SearchView', () => {
    var serviceResult, queryBySQLService;
    var originalTimeout, resultLayer;
    var geocodingGeson = {
        poiInfos: [
            {
                "score": 85,
                "address": "北京市西城区槐柏树街9号北京小学",
                "location": {
                    "x": 116.360603320322,
                    "y": 39.89671784607
                },

            },

            {
                "score": 77.5,
                "address": "北京市朝阳区水碓东路15号北京城市建设学校",
                "location": {
                    "x": 116.473557329787,
                    "y": 39.9280456866728
                },
                "filters": [
                    "北京市",
                    "朝阳区"
                ]
            }]
    };

    beforeAll((done) => {

        // setTimeout(() => {
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

            poiSearch = new SearchView({
                cityGeoCodingConfig: {
                    addressUrl: "http://test:8090/iserver/services/localsearch/rest/searchdatas/China/poiinfos"
                },
            }).addTo(map);
            var queryUrl = " http://test:8090/iserver/services/map-world/rest/maps/World/queryResults?returnContent=true";
            spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
                console.log(url);
                var paramsObj = JSON.parse(queryString.replace(/'/g, "\""));
                expect(paramsObj.queryMode).toBe("SqlQuery");
                expect(paramsObj.queryParameters.queryOption).toBe("ATTRIBUTEANDGEOMETRY");
                if (url.indexOf("/queryResults") > -1) {
                    var escapedJson = capitals;
                    return Promise.resolve(new Response(JSON.stringify(escapedJson)));

                }
                return Promise.resolve();
            });
            var queryFailedEventArgs = null, serviceSuccessEventArgs = null;
            var QueryBySQLFailed = (serviceFailedEventArgs) => {
                queryFailedEventArgs = serviceFailedEventArgs;
                expect(false).toBeTruthy();
            };
            var QueryBySQLCompleted = (queryEventArgs) => {
                serviceSuccessEventArgs = queryEventArgs;
                try {
                    resultLayer = L.geoJSON(serviceSuccessEventArgs.result.recordsets[0].features, {
                        pointToLayer: (geoJsonPoint, latlng) => {
                            return L.circleMarker(latlng, {
                                fillColor: 'blue',
                                weight: 1,
                                opacity: 1,
                                color: 'blue',
                                fillOpacity: 0.6
                            });
                        },
                    }).addTo(map);
                    poiSearch.addSearchLayer([new GeoJSONLayerWithName("首都", resultLayer)]);
                    done();
                } catch (exception) {
                    expect(false).toBeTruthy();
                    console.log("SearchView" + exception.name + ":" + exception.message);
                    queryBySQLService.destroy();
                    params.destroy();
                    queryFailedEventArgs = null;
                    serviceSuccessEventArgs = null;
                    done();
                }
            };
            var polygon = L.polygon([[90, 180], [90, -180], [-90, -180], [-90, 180], [90, 180]]);
            var params = new QueryBySQLParameters({
                queryParams: { name: "Capitals@World.1" },
                bounds: polygon.getBounds()
            });
            queryBySQLService = new QueryBySQLService(queryUrl);
            queryBySQLService.processAsync(params, QueryBySQLCompleted);
        // }, 4000);
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
        document.body.removeChild(testDiv);
    });

    it('search:searchFromLayer', (done) => {

        expect(poiSearch.viewModel.dataModel.layers).not.toBeUndefined();
        poiSearch.viewModel.on('searchlayersucceeded', function (e) {
            try {
                expect(e.result[0].feature).not.toBeNull();
                expect(e.result[0].feature).not.toBeUndefined();
                done();
            } catch (exception) {
                console.log("'readfile'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })

        poiSearch.viewModel.search("北京", "首都");
    })

    it('search:searchFromCityLocalSearchService', (done) => {

        spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
            console.log(url);
            if (url.indexOf("localsearch") > -1) {
                var escapedJson = geocodingGeson;
                return Promise.resolve(new Response(JSON.stringify(escapedJson)));
            }
            return Promise.resolve();
        });

        poiSearch.viewModel.on('geocodesucceeded', function (e) {
            try {
                expect(e.result[0].geometry.coordinates.length).toBe(2);
                done();
            } catch (exception) {
                console.log("'readfile'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })
        poiSearch.viewModel.search("北京");
    });

    it('panToCity', (done) => {
        spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
            console.log(url);
            if (url.indexOf("localsearch") > -1) {
                var escapedJson = geocodingGeson;
                return Promise.resolve(new Response(JSON.stringify(escapedJson)));
            }
            return Promise.resolve();
        });
        spyOn(poiSearch.viewModel.map, 'setView').and.callThrough();
        poiSearch.viewModel.map.on('zoomend',()=>{
            try {
                expect(poiSearch.viewModel.map.setView).toHaveBeenCalled();
                done();
            } catch (exception) {
                console.log("'layerSelectOptions'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })
        document.getElementsByClassName('component-search__settings__name')[0].click()
        document.getElementsByClassName('component-citytabpag__content')[0].childNodes[0].click();

    })
})
