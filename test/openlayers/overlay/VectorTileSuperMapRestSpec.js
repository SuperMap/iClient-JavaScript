require('../../../src/openlayers/overlay/VectorTileSuperMapRest');

var url = GlobeParameter.ChinaURL;
describe('openlayers_VectorTileSuperMapRestTest', function () {
    var originalTimeout;
    var testDiv, map, vectorTileOptions, vectorTileSource;
    beforeAll(function () {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);

        new ol.supermap.MapService(url).getMapInfo(function (serviceResult) {
            map = new ol.Map({
                target: 'map',
                controls: ol.control.defaults({attributionOptions: {collapsed: false}})
                    .extend([new ol.supermap.control.Logo()]),
                view: new ol.View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            vectorTileOptions = ol.source.VectorTileSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            vectorTileSource =  new ol.source.VectorTileSuperMapRest(vectorTileOptions);
            var vectorLayer = new ol.layer.VectorTile({
                source: vectorTileSource
            });
            map.addLayer(vectorLayer);
        });
    });
    beforeEach(function () {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(function () {
        window.document.body.removeChild(testDiv);
        map.remove();
    });

    it('constructor and static test', function (done) {

        setTimeout(function () {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.serverType).toBe("ISERVER");
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");

                expect(vectorTileSource).not.toBeNull();
                expect(vectorTileSource.urls.length).toBe(1);
                done();
            }catch(exception) {
                console.log("'constructor and static test'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }
        },6000);

    });

    /*it('serverType of iportal', function () {
        var iportaoUrl = "http://support.supermap.com.cn:8092/web/maps/44";
        var vectorTileOptions,vectorTilesource;

        new ol.supermap.MapService(iportaoUrl).getMapInfo(function (serviceResult) {
            vectorTileOptions = ol.source.VectorTileSuperMapRest.optionsFromMapJSON(iportaoUrl, serviceResult.result);
            vectorTilesource =  new ol.source.VectorTileSuperMapRest(vectorTileOptions);
            var vectorLayer = new ol.layer.VectorTile({
                source: vectorTilesource
            });
            map.addLayer(vectorLayer);
        });

        setTimeout(function () {
            try {
                expect(vectorTileOptions).not.toBeNull();
                expect(vectorTileOptions.serverType).toBe("IPORTAL");
                expect(vectorTileOptions.crossOrigin).toBe("anonymous");

                expect(vectorTilesource).not.toBeNull();
                expect(vectorTilesource.urls.length).toBe(1);
                done();
            }catch(exception) {
                console.log("'constructor and static test'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
            }
        },6000);
    });*/
});