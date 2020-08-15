
import { tiledMapLayer } from '../../../../src/leaflet/mapping/TiledMapLayer';
import { dataServiceQueryView } from '../../../../src/leaflet/components/dataservicequery/DataServiceQueryView'
import { FetchRequest } from '../../../../src/common/util/FetchRequest';
import { mockCreateTile } from '../../tool/mock_leaflet';
import '@geoman-io/leaflet-geoman-free';
import '@geoman-io/leaflet-geoman-free/dist/leaflet-geoman.css';
var map, url = GlobeParameter.WorldURL, testDiv, dataServiceQuery;
var dataServiceURL = GlobeParameter.dataServiceURL;
describe('leaflet_DataServiceQuery_DataServiceQueryView', () => {
    var serviceResult;
    var originalTimeout;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.id = 'map';
        testDiv.style.margin = "0 auto";
        testDiv.style.width = "800px";
        testDiv.style.height = "800px";
        document.body.appendChild(testDiv);
        mockCreateTile();
        map = L.map('map', {
            preferCanvas: true,
            crs: L.CRS.EPSG4326,
            center: [20, 80],
            maxZoom: 18,
            zoom: 2
        });
        tiledMapLayer(url).addTo(map);

        var dataSetNames = ['World:Countries'];
        dataServiceQuery = dataServiceQueryView(dataServiceURL, dataSetNames);
        dataServiceQuery.addTo(map);
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        serviceResult = null;
    });
    afterEach(() => {
        dataServiceQuery.off("getfeaturessucceeded");
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        dataServiceQuery.messageBox.closeView();
        dataServiceQuery.remove();
        window.document.body.removeChild(testDiv);
    });
    it('getFeatureByID', (done) => {
        expect(dataServiceQuery).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
            let param = JSON.parse(queryString.replace(/\'/g, "\""));
            if (url.indexOf(dataServiceURL + "/featureResults") > -1 && param.getFeatureMode === "ID") {
                var escapedJson = `{"features":[{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":-47.8977476573595,"y":-15.792110943058866},"parts":[1],"style":null,"prjCoordSys":null,"id":1,"type":"POINT","partTopo":null,"points":[{"x":-47.8977476573595,"y":-15.792110943058866}]},"fieldValues":["1","-47.8977476573595","-15.792110943058866","1","0","16","0","2207718.0","Brasília","巴西利亚","巴西","Brasilia","Brazil","巴西","2207718.0","巴西利亚"],"ID":1},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":-171.739493590236,"y":-13.837022952831255},"parts":[1],"style":null,"prjCoordSys":null,"id":2,"type":"POINT","partTopo":null,"points":[{"x":-171.739493590236,"y":-13.837022952831255}]},"fieldValues":["2","-171.739493590236","-13.837022952831255","1","0","16","0","40407.0","Apia","阿皮亚","萨摩亚","Apia","Samoa","萨摩亚","40407.0","阿皮亚"],"ID":2},{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":-175.245650649682,"y":-21.13090205664112},"parts":[1],"style":null,"prjCoordSys":null,"id":3,"type":"POINT","partTopo":null,"points":[{"x":-175.245650649682,"y":-21.13090205664112}]},"fieldValues":["3","-175.245650649682","-21.13090205664112","1","0","16","0","22400.0","Nukuʻalofa","努库阿洛法","汤加","Nuku' alofa","Tonga","汤加","22400.0","努库阿洛法"],"ID":3}],"featureUriList":[],"totalCount":3,"featureCount":3}`;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });

        dataServiceQuery.on('getfeaturessucceeded', (e) => {
            serviceResult = e.result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("FeatureCollection");
                expect(serviceResult.features).not.toBeNull();
                expect(serviceResult.features.length).toBe(3);
                let features = serviceResult.features;
                expect(features[0].id).toBe(1);
                expect(features[1].id).toBe(2);
                expect(features[2].id).toBe(3);
                done();
            } catch (exception) {
                console.log("'getFeatureByID'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })
        var analysitBtn = document.getElementsByClassName('component-analysis__analysisbtn--analysis')[0];
        analysitBtn.click();
    });

    it('getFeatureBySQL', (done) => {

        expect(dataServiceQuery).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
            let param = JSON.parse(queryString.replace(/\'/g, "\""));
            if (url.indexOf(dataServiceURL + "/featureResults") > -1 && param.getFeatureMode === "SQL") {
                var escapedJson = `{"features":[{"fieldNames":["SMID","SMX","SMY","SMLIBTILEID","SMUSERID","SMGEOMETRYSIZE","USERID","POP","CAPITAL_LO","CAPITAL_CH","COUNTRY_CH","CAPITAL_EN","COUNTRY_EN","COUNTRY","CAP_POP","CAPITAL"],"geometry":{"center":{"x":-47.8977476573595,"y":-15.792110943058866},"parts":[1],"style":null,"prjCoordSys":null,"id":1,"type":"POINT","partTopo":null,"points":[{"x":-47.8977476573595,"y":-15.792110943058866}]},"fieldValues":["1","-47.8977476573595","-15.792110943058866","1","0","16","0","2207718.0","Brasília","巴西利亚","巴西","Brasilia","Brazil","巴西","2207718.0","巴西利亚"],"ID":1}],"featureUriList":[],"totalCount":1,"featureCount":1}`;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });

        dataServiceQuery.on('getfeaturessucceeded', (e) => {
            serviceResult = e.result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("FeatureCollection");
                expect(serviceResult.features).not.toBeNull();
                expect(serviceResult.features.length).toBe(1);
                let features = serviceResult.features;
                expect(features[0].id).toBe(1);
                done();
            } catch (exception) {
                console.log("'getFeatureBySQL'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
        var deleteLayersBtn = document.getElementsByClassName('component-analysis__analysisbtn--deletelayers')[0];
        deleteLayersBtn.click();
        expect(dataServiceQuery.viewModel.resultLayers.length === 0);

        var queryModelSelectName = document.getElementById('queryModelSelectName');
        queryModelSelectName.title = 'SQL';
        queryModelSelectName.innerHTML = 'SQL';
        dataServiceQuery.queryModeltOnchange('SQL');

        var maxFeaturesInput = document.getElementsByClassName('max-features-input')[0];
        maxFeaturesInput.value = '1';
        var analysitBtn = document.getElementsByClassName('component-analysis__analysisbtn--analysis')[0];
        analysitBtn.click();

    });

    it('getFeatureByBounds', (done) => {
        expect(dataServiceQuery).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
            let param = JSON.parse(queryString.replace(/\'/g, "\""));
            if (url.indexOf(dataServiceURL + "/featureResults") > -1 && param.getFeatureMode.indexOf("BOUNDS") > -1) {
                var escapedJson = `{"features":[],"featureUriList":[],"totalCount":0,"featureCount":0}`;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });

        dataServiceQuery.on('getfeaturessucceeded', (e) => {
            serviceResult = e.result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("FeatureCollection");
                expect(serviceResult.features).not.toBeNull();
                expect(serviceResult.features.length).toBe(0);
                done();
            } catch (exception) {
                console.log("'getFeatureByBounds'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        });
        var deleteLayersBtn = document.getElementsByClassName('component-analysis__analysisbtn--deletelayers')[0];
        deleteLayersBtn.click();

        var queryModelSelectName = document.getElementById('queryModelSelectName');
        queryModelSelectName.title = 'BOUNDS';
        queryModelSelectName.innerHTML = 'BOUNDS';
        dataServiceQuery.queryModeltOnchange('BOUNDS');


        var queryRangeTextArea = document.getElementsByClassName('component-textarea--rangequery')[0];
        queryRangeTextArea.value = `{"leftBottom":{"x":64.86328125,"y":18.984375},"rightTop":{"x":89.12109375,"y":37.44140625}}`;

        var analysitBtn = document.getElementsByClassName('component-analysis__analysisbtn--analysis')[0];
        analysitBtn.click();
    });

    it('getFeatureByBuffer', (done) => {
        expect(dataServiceQuery).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
            let param = JSON.parse(queryString.replace(/\'/g, "\""));
            if (url.indexOf(dataServiceURL + "/featureResults") > -1 && param.getFeatureMode.indexOf("BUFFER") > -1) {
                var escapedJson = `{"features":[],"featureUriList":[],"totalCount":0,"featureCount":0}`;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });

        dataServiceQuery.on('getfeaturessucceeded', (e) => {

            serviceResult = e.result;
            if (serviceResult.error) {
                expect(serviceResult.error).not.toBeNull();
            }
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("FeatureCollection");
                expect(serviceResult.features).not.toBeNull();
                expect(serviceResult.features.length).toBe(0);
                done();
            } catch (exception) {
                console.log("'getFeatureByBuffer'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })
        var deleteLayersBtn = document.getElementsByClassName('component-analysis__analysisbtn--deletelayers')[0];
        deleteLayersBtn.click();

        var queryModelSelectName = document.getElementById('queryModelSelectName');
        queryModelSelectName.title = 'BUFFER';
        queryModelSelectName.innerHTML = 'BUFFER';
        dataServiceQuery.queryModeltOnchange('BUFFER');

        var queryRangeTextArea = document.getElementsByClassName('component-textarea--rangequery')[0];
        queryRangeTextArea.value = `{"id":0,"style":null,"parts":[1],"points":[{"y":42,"x":21.5}],"type":"POINT"}`;

        var analysitBtn = document.getElementsByClassName('component-analysis__analysisbtn--analysis')[0];
        analysitBtn.click();
    });

    it('getFeatureByGeometry', (done) => {
        expect(dataServiceQuery).not.toBeNull();
        spyOn(FetchRequest, 'post').and.callFake((url, queryString) => {
            let param = JSON.parse(queryString.replace(/\'/g, "\""));
            if (url.indexOf(dataServiceURL + "/featureResults") > -1 && param.getFeatureMode.indexOf("SPATIAL") > -1) {
                var escapedJson = `{"features":[] ,"featureUriList":[],"totalCount":0,"featureCount":0}`;
                return Promise.resolve(new Response(escapedJson));
            }
            return Promise.resolve();
        });

        dataServiceQuery.on('getfeaturessucceeded', (e) => {
            serviceResult = e.result;
            try {
                expect(serviceResult).not.toBeNull();
                expect(serviceResult.type).toBe("FeatureCollection");
                expect(serviceResult.features).not.toBeNull();
                expect(serviceResult.features.length).toBe(0);
                done();
            } catch (exception) {
                console.log("'getFeatureByGeometry'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        })
        var deleteLayersBtn = document.getElementsByClassName('component-analysis__analysisbtn--deletelayers')[0];
        deleteLayersBtn.click();

        var queryModelSelectName = document.getElementById('queryModelSelectName');
        queryModelSelectName.title = 'SPATIAL';
        queryModelSelectName.innerHTML = 'SPATIAL';
        dataServiceQuery.queryModeltOnchange('SPATIAL');

        var queryRangeTextArea = document.getElementsByClassName('component-textarea--rangequery')[0];
        queryRangeTextArea.value = `{"id":0,"style":null,"parts":[1],"points":[{"y":42,"x":21.5}],"type":"POINT"}`;

        var spatialQueryModeSelectName = document.getElementById('spatialQueryModeSelectName');
        spatialQueryModeSelectName.title = 'WITHIN';
        spatialQueryModeSelectName.innerHTML = 'WITHIN';

       
        var queryRangeRecIcon = document.getElementsByClassName('supermapol-icons-polygon-layer')[0];
        queryRangeRecIcon.click();
        let layer = {"type":"Feature","properties":{},"geometry":{"type":"Point","coordinates":[99.2065429688,41.8798828125]}}
        layer = L.geoJSON(layer);
        map.fire('pm:create', {'shape': 'Poly', 'layer': layer.getLayers()[0]});

        var queryRangeLineIcon = document.getElementsByClassName('supermapol-icons-line-layer')[0];
        queryRangeLineIcon.click();
        map.fire('pm:create', {'shape': 'Line', 'layer': layer.getLayers()[0]});

        var queryRangePointIcon = document.getElementsByClassName('supermapol-icons-point-layer')[0];
        queryRangePointIcon.click();
        map.fire('pm:create', {'shape': 'Marker', 'layer': layer.getLayers()[0]});
        let boundsLayer = {"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[97.4157714844,42.7368164063],[100.5908203125,42.7917480469],[98.0529785156,41.484375],[97.4157714844,42.7368164063]]]}};
        boundsLayer = L.geoJSON(boundsLayer);
        map.fire('pm:create', {'shape': 'Rectangle', 'layer': boundsLayer.getLayers()[0]});

        var analysitBtn = document.getElementsByClassName('component-analysis__analysisbtn--analysis')[0];
        analysitBtn.click();

    });

    it('setDataSetNames_String', (done) => {
        dataServiceQuery.setDataSetNames('World:Capitals');
        try {
            expect(dataServiceQuery.dataSetNames + '').toBe('World:Capitals');
            done();
        } catch (exception) {
            console.log("'setDataSetNames_String'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    });

    it('setDataSetNames_Array', (done) => {
        dataServiceQuery.setDataSetNames(['World:Capitals']);
        try {
            expect(dataServiceQuery.dataSetNames + '').toBe('World:Capitals');
            done();
        } catch (exception) {
            console.log("'setDataSetNames_Array'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    });

    it('setGetFeatureMode_string', (done) => {
        dataServiceQuery.setGetFeatureMode('SQL');
        var queryModelSelectName = document.getElementById('queryModelSelectName');
        try{
            expect(queryModelSelectName.title).toBe('SQL');
            done();
        } catch (exception) {
            console.log("'setGetFeatureMode_string'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    })

    it('setGetFeatureMode_Array', (done) => {
        dataServiceQuery.setGetFeatureMode(['SQL']);
        var queryModelSelectName = document.getElementById('queryModelSelectName');
        try{
            expect(queryModelSelectName.title).toBe('SQL');
            done();
        } catch (exception) {
            console.log("'setGetFeatureMode_Array'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    })

    it('setDataServiceUrl', (done) => {
        let url = 'http://localhost:8090/iserver/services/data-world/rest/data';
        dataServiceQuery.setDataServiceUrl(url);
        try{
            expect(dataServiceQuery.dataServiceUrl).toBe(url);
            expect(dataServiceQuery.viewModel.dataserviceUrl).toBe(url);
            done();
        } catch (exception) {
            console.log("'setDataServiceUrl'案例失败：" + exception.name + ":" + exception.message);
            expect(false).toBeTruthy();
            done();
        }
    })
    
});

