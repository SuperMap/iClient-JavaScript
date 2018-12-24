import ol from 'openlayers';
import * as oldebug from 'openlayers/dist/ol-debug';
ol.source.VectorTile = oldebug.source.VectorTile;
import {
    VectorTileSuperMapRest
} from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {
    FetchRequest
} from '../../../src/common/util/FetchRequest';

describe('openlayers_VectorTileSuperMapRest', () => {
    var url = GlobeParameter.californiaURL
    var originalTimeout;
    var testDiv, map, vectorLayer;
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new ol.Map({
            target: 'map',
            view: new ol.View({
                center: [-122.228687503369, 38.1364932162598],
                zoom: 10,
                minZoom: 10,
                maxZoom: 14,
                projection: 'EPSG:4326',
            })
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            if (testUrl.indexOf("vectorstyles.json") > 0) {
                expect(testUrl).toBe(url + "/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true");
                return Promise.resolve(new Response(JSON.stringify(vectorstylesEscapedJson)));
            } else if (testUrl.indexOf("sprite.json") > 0) {
                return Promise.resolve(new Response(JSON.stringify(spriteEscapedJson)));
            };
            return null;

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
        window.document.body.removeChild(testDiv);
    });

    it('initialize_styleObject', (done) => {
        var format = new ol.format.MVT({
            featureClass: ol.Feature
        });
        vectorLayer = new ol.layer.VectorTile({
            //设置避让参数
            declutter: true,
            source: new VectorTileSuperMapRest({
                style: vectorstylesEscapedJson,
                projection: 'EPSG:4326',
                source: 'California',
                format: format
            })
        });
        spyOn(vectorLayer.getSource(), 'tileUrlFunction').and.callThrough();
        setTimeout(() => {
            expect(vectorLayer.getSource().tileUrlFunction.calls.count()).toEqual(4)
            done();
        }, 2000);
        map.addLayer(vectorLayer);

    });

});