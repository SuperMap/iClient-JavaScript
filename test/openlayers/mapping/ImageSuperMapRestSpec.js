import ol from 'openlayers';
import {ImageSuperMapRest} from '../../../src/openlayers/mapping/ImageSuperMapRest';
import {MapService} from '../../../src/openlayers/services/MapService';

var url = GlobeParameter.imageURL;
describe('openlayers_ImageSuperMapRest', () => {
    var originalTimeout;
    var testDiv, map, imageTileOptions, imageTileSource;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        //只测了serverType为iserver得情况
        new MapService(url).getMapInfo((serviceResult) => {
            map = new ol.Map({
                target: 'map',
                view: new ol.View({
                    center: [12957388, 4853991],
                    zoom: 11
                })
            });
            imageTileOptions = ImageSuperMapRest.optionsFromMapJSON(url, serviceResult.result);
            imageTileSource = new ImageSuperMapRest(imageTileOptions);
            var imageLayer = new ol.layer.Tile({
                source: imageTileSource
            });
            map.addLayer(imageLayer);
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
    });

    it('initialize', (done) => {
        setTimeout(() => {
            try {
                expect(imageTileOptions).not.toBeNull();
                expect(imageTileOptions.serverType).toBe("ISERVER");
                expect(imageTileOptions.crossOrigin).toBe("anonymous");
                expect(imageTileSource).not.toBeNull();
                expect(imageTileSource.urls.length).toBe(1);
                done();
            } catch (exception) {
                console.log("'initialize'案例失败：" + exception.name + ":" + exception.message);
                expect(false).toBeTruthy();
                done();
            }
        }, 6000);

    });

    it('tileUrlFunction', () => {
        var tempOptions = {
            redirect: true,
            prjCoordSys: {"epsgCode": 4326}
        };
        /*expect(imageLayerObject).not.toBeNull();
         expect(imageLayerObject.options.redirect).toBe(true);
         expect(imageLayerObject.options.prjCoordSys.epsgCode).toBe(4326);*/
        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = imageTileSource.tileUrlFunction(coords, pixelRatio, tempOptions);
        expect(tileUrl).toBe(GlobeParameter.mapServiceURL + '%E4%B8%96%E7%95%8C%E5%9C%B0%E5%9B%BE_Day/image.png?&transparent=true&cacheEnabled=true&redirect=false&width=256&height=256&viewBounds=%7B%22leftBottom%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D,%22rightTop%22%20:%20%7B%22x%22:NaN,%22y%22:NaN%7D%7D');
        expect(imageTileSource.getTileGrid().getTileSize()).toEqual(256);
    });

    it('tileUrlFunction_tilePoxy', () => {
        imageTileOptions.tileProxy = "tileProxy";
        var imageTileSourcetilePoxy = new ImageSuperMapRest(imageTileOptions);
        var tempOptions = {
            redirect: true,
            prjCoordSys: {"epsgCode": 4326}
        };
        var pixelRatio = "245";
        var coords = new ol.geom.Point(120.14, 30.24);
        var tileUrl = imageTileSourcetilePoxy.tileUrlFunction(coords, pixelRatio, tempOptions);
        // expect(tileUrl).toBe("tileProxyhttp%3A%2F%2Flocalhost%3A8090%2Fiserver%2Fservices%2Fmap-world%2Frest%2Fmaps%2F%25E4%25B8%2596%25E7%2595%258C%25E5%259C%25B0%25E5%259B%25BE_Day%2Fimage.png%3F%26transparent%3Dtrue%26cacheEnabled%3Dfalse%26width%3D256%26height%3D256%26viewBounds%3D%257B%2522leftBottom%2522%2520%3A%2520%257B%2522x%2522%3ANaN%2C%2522y%2522%3ANaN%257D%2C%2522rightTop%2522%2520%3A%2520%257B%2522x%2522%3ANaN%2C%2522y%2522%3ANaN%257D%257D");
        expect(tileUrl).not.toBeNull();
    });
});