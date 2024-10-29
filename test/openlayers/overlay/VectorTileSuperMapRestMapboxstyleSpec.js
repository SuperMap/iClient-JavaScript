import {
    VectorTileSuperMapRest
} from '../../../src/openlayers/overlay/VectorTileSuperMapRest';
import {
    FetchRequest
} from '@supermapgis/iclient-common/util/FetchRequest';
import Map from 'ol/Map';
import View from 'ol/View';
import MVT from 'ol/format/MVT';
import Feature from 'ol/Feature';
import VectorTileLayer from 'ol/layer/VectorTile';

describe('openlayers_VectorTileSuperMapRest_mapboxStyle', () => {
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
        map = new Map({
            target: 'map',
            view: new View({
                center: [-122.228687503369, 38.1364932162598],
                zoom: 10,
                minZoom: 10,
                maxZoom: 14,
                projection: 'EPSG:4326',
            })
        });
        spyOn(FetchRequest, 'get').and.callFake((testUrl, params, options) => {
            if (testUrl.indexOf("vectorstyles") > 0) {
                expect(testUrl).toBe(url + "/tileFeature/vectorstyles?type=MapBox_GL&styleonly=true");
                return Promise.resolve(new Response(JSON.stringify(vectorstylesEscapedJson)));
            } else if (testUrl.indexOf("sprite.json") > 0) {
                return Promise.resolve(new Response(JSON.stringify(spriteEscapedJson)));
            };
            return null;

        });


    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
    afterAll(() => {
        window.document.body.removeChild(testDiv);
    });

    it('initialize_styleObject', (done) => {
        var format = new MVT({
            featureClass: Feature
        });
        vectorLayer = new VectorTileLayer({
            //设置避让参数
            declutter: true,
            source: new VectorTileSuperMapRest({
                style: vectorstylesEscapedJson,
                projection: 'EPSG:4326',
                source: 'California',
                format: format
            })
        });
        spyOn(vectorLayer.getSource(), 'tileLoadFunction').and.callFake((tile)=>{
            tile.setLoader(()=>{
                tile.setFeatures([])
            })
        });
        let count = 0;
        vectorLayer.getSource().on('tileloadend',()=>{
            count++;
            console.log(count)
            if(count === 4){
                expect(vectorLayer.getSource().tileLoadFunction.calls.count()).toEqual(4);
                done();
            }
            
        })
        map.addLayer(vectorLayer);

    });
    it('initialize_styleObject_nullSource', (done) => {
        var format = new MVT({
            featureClass: Feature
        });
        vectorLayer = new VectorTileLayer({
            //设置避让参数
            declutter: true,
            source: new VectorTileSuperMapRest({
                style: vectorstylesEscapedJson,
                projection: 'EPSG:4326',
                format: format
            })
        });
        spyOn(vectorLayer.getSource(), 'tileLoadFunction').and.callFake((tile)=>{
            tile.setLoader(()=>{
                tile.setFeatures([])
            })
        });
        let count = 0;
        vectorLayer.getSource().on('tileloadend',()=>{
            count++;
            console.log(count)
            if(count === 4){
                expect(vectorLayer.getSource()._tileUrl).toContain("California");
                expect(vectorLayer.getSource().tileLoadFunction.calls.count()).toEqual(4);
                done();
            }
            
        })
        map.addLayer(vectorLayer);

    });
});