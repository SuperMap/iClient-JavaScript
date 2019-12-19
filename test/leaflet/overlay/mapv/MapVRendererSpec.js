import { MapVRenderer } from '../../../../src/leaflet/overlay/mapV/MapVRenderer';
import { mapVLayer } from '../../../../src/leaflet/overlay/MapVLayer';
import { utilCityCenter, DataSet } from 'mapv';

describe('Leaflet_MapVRender', () => {
    var originalTimeout;
    var testDiv, map, layer, mapvLayer, renderer;
    beforeAll(() => {
        testDiv = document.createElement("div");
        testDiv.setAttribute("id", "map1");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        document.body.appendChild(testDiv);
        map = L.map('map1', {
            center: [32, 109],
            zoom: 4,
        });
        var randomCount = 2;
        var data = [];
        var citys = ["北京", "天津"];
        // 构造数据
        while (randomCount--) {
            var cityCenter = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'Point',
                    coordinates: [cityCenter.lng - 2 + Math.random() * 4, cityCenter.lat - 2 + Math.random() * 4]
                },
                count: 30 * Math.random()
            });
        }
        var dataSet = new DataSet(data);
        var options = {
            fillStyle: 'rgba(55, 50, 250, 0.8)',
            shadowColor: 'rgba(255, 250, 50, 1)',
            shadowBlur: 20,
            max: 100,
            size: 500,
            unit: 'm',
            label: {
                show: true,
                fillStyle: 'white',
            },
            globalAlpha: 0.5,
            gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)" },
            // draw: 'honeycomb',
            draw: 'simple',
            animation: {
                type: 'time',
                stepsRange: {
                    start: 0,
                    end: 1
                },
                trails: 1,
                duration: 1,
            }
        };
        //创建MapV图层
        layer = new mapVLayer(dataSet, options).addTo(map);
        mapvLayer = new MapVRenderer(map, layer, dataSet, options);
        renderer = layer.renderer;
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
        layer.remove();
        document.body.removeChild(testDiv);
        map.remove();
    });

    it('initialize,_canvasUpdate_#21', () => {
        expect(renderer).not.toBeNull();
        expect(renderer.canvasLayer).not.toBeNull();
        spyOn(renderer, 'drawContext');
        renderer._canvasUpdate(1);
        var args = renderer.drawContext.calls.mostRecent().args[3];
        expect(args.x).not.toEqual(-1240);
        expect(args.x).toBeCloseTo(-990, 0);
        expect(args.y).not.toEqual(385);
        expect(args.y).toBeCloseTo(635, 2);
    });

    it('_canvasUpdate', () => {
        expect(mapvLayer.options._size).toEqual(0.051104158385466066);
    });
});
