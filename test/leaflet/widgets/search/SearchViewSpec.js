import { search } from '../../../../src/leaflet/widgets/search/SearchView'
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import { QueryBySQLService } from '../../../../src/common/iServer/QueryBySQLService';
import { QueryBySQLParameters } from '../../../../src/common/iServer/QueryBySQLParameters';
import { QueryOption } from '../../../../src/common/REST';
import { FilterParameter } from '../../../../src/common/iServer/FilterParameter';

var map, url = GlobeParameter.WorldURL, testDiv;
var poiSearch;
describe('leaflet_search_SearchView', () => {
    var serviceResult, queryBySQLService;
    var originalTimeout, resultLayer;
    var geocodingGeson = [
        {
            "score": 85,
            "address": "北京市西城区槐柏树街9号北京小学",
            "location": {
                "x": 116.360603320322,
                "y": 39.89671784607
            },
            "filters": [
                "北京市",
                "西城区"
            ]
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
        }
    ];

    beforeAll((done) => {

        setTimeout(() => {
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

            poiSearch = L.supermap.widgets.search({
                cityGeoCodingConfig: {
                    addressUrl: "http://test:8090/iserver/services/addressmatch-Address/restjsr/v1/address"
                },
            }).addTo(map);
            var queryUrl = " http://test:8090/iserver/services/map-world/rest/maps/World/queryResults.json?returnContent=true";
            spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
                console.log(url);
                if (url.indexOf("/queryResults.json") > -1) {
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
                    poiSearch.addSearchLayer([L.supermap.widgets.geoJSONLayerWithName("首都", resultLayer)]);
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
            var options = {
                eventListeners: {
                    'processFailed': QueryBySQLFailed,
                    'processCompleted': QueryBySQLCompleted
                }
            };
            var polygon = L.polygon([[90, 180], [90, -180], [-90, -180], [-90, 180], [90, 180]]);
            var params = new QueryBySQLParameters({
                queryParams: { name: "Capitals@World.1" },
                bounds: polygon.getBounds()
            });
            queryBySQLService = new QueryBySQLService(queryUrl, options);
            queryBySQLService.events.on({ 'processCompleted': QueryBySQLCompleted });
            queryBySQLService.processAsync(params);
        }, 4000);
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
        poiSearch.viewModel.on('searchlayersucceed', function (e) {
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

    it('search:searchFromCityGeocodeService', (done) => {

        spyOn(FetchRequest, 'get').and.callFake((url, params, options) => {
            console.log(url);
            if (url.indexOf("geocoding") > -1) {
                var escapedJson = geocodingGeson;
                return Promise.resolve(new Response(JSON.stringify(escapedJson)));
            }
            return Promise.resolve();
        });

        poiSearch.viewModel.on('geocodesucceed', function (e) {
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
            if (url.indexOf("geocoding") > -1) {
                var escapedJson = geocodingGeson;
                return Promise.resolve(new Response(JSON.stringify(escapedJson)));
            }
            return Promise.resolve();
        });
        spyOn(poiSearch.viewModel.map, 'setView').and.callThrough();
        document.getElementsByClassName('widget-search__settings__name')[0].click()
        document.getElementsByClassName('widget-citytabpag__content')[0].childNodes[0].click();
        setTimeout(() => {
            try {
                expect(poiSearch.viewModel.map.setView).toHaveBeenCalled();
                done();
            } catch (exception) {
                console.log("'layerSelectOptions'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 2000);

    })
})