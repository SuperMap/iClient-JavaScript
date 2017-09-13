require('../../../src/openlayers/mapping/ImageSuperMapRest');

var url = GlobeParameter.imageURL;
describe('openlayers_ImageSuperMapRestTest', function() {
    var originalTimeout;
    var testDiv, map, imageTileOptions, imageTileSource;
    beforeAll(function () {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);

        //只测了serverType为iserver得情况
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
            imageTileOptions = ol.source.ImageSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            imageTileSource =  new ol.source.ImageSuperMapRest(imageTileOptions);
            var imageLayer = new ol.layer.Tile({
                source: imageTileSource
            });
            map.addLayer(imageLayer);
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
        document.body.removeChild(testDiv);
    });

    it('constructor and static test', function (done) {
        setTimeout(function () {
            try {
                expect(imageTileOptions).not.toBeNull();
                expect(imageTileOptions.serverType).toBe("ISERVER");
                expect(imageTileOptions.crossOrigin).toBe("anonymous");

                expect(imageTileSource).not.toBeNull();
                expect(imageTileSource.urls.length).toBe(1);
                done();
            }catch(exception) {
                console.log("'constructor and static test'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        },6000);

    });

    it('tileUrlFunction test', function () {
        var tempOptions = {
            redirect:true,
            prjCoordSys: {"epsgCode": 4326}
        };
        /*expect(imageLayerObject).not.toBeNull();
        expect(imageLayerObject.options.redirect).toBe(true);
        expect(imageLayerObject.options.prjCoordSys.epsgCode).toBe(4326);*/

        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = imageTileSource.tileUrlFunction(coords, pixelRatio, tempOptions);

        expect(tileUrl).toBe("http://localhost:8090/iserver/services/map-world/rest/maps/%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day/image.png?&transparent=true&cacheEnabled=false&width=256&height=256&viewBounds=%7B%22leftBottom%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D,%22rightTop%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D%7D");
        expect(imageTileSource.tileGrid.tileSize_).toEqual(256);
    });
});