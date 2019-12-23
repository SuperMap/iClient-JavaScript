import { MapvRenderer } from '../../../../src/mapboxgl/overlay/mapv/MapvRenderer';
import { MapvLayer } from '../../../../src/mapboxgl/overlay/MapvLayer';
import mapboxgl from 'mapbox-gl';
import { utilCityCenter, DataSet } from 'mapv';
var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';
var renderer, mapvLayer;

describe('mapboxgl_MapvRenderer', () => {
    var originalTimeout;
    let data = [],
        dataSet;
    var testDiv, map, mapvLayer, mapvRenderLayer;
    var options = {
        gradient: {
            0: 'blue',
            0.5: 'yellow',
            1: 'red'
        },
        lineWidth: 0.5,
        max: 30,
        draw: 'intensity',
        layerID: 'mapv'
    };
    var options1 = {
        fillStyle: 'rgba(55, 50, 250, 0.8)',
        shadowColor: 'rgba(255, 250, 50, 1)',
        shadowBlur: 20,
        max: 100,
        size: 500,
        unit: 'm',
        label: {
            show: true,
            fillStyle: 'white'
        },
        globalAlpha: 0.5,
        gradient: { 0.25: 'rgb(0,0,255)', 0.55: 'rgb(0,255,0)', 0.85: 'yellow', 1.0: 'rgb(255,0,0)' },
        draw: 'honeycomb'
    };
    beforeAll(() => {
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: 'map',
            style: {
                "version": 8,
                "sources": {
                    "raster-tiles": {
                        "type": "raster",
                        "tiles": [url],
                        "tileSize": 256,
                    },
                },
                "layers": [{
                    "id": "simple-tiles",
                    "type": "raster",
                    "source": "raster-tiles",
                    "minzoom": 0,
                    "maxzoom": 22
                }]
            },
            center: [112, 37.94],
            zoom: 3
        });
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        var randomCount = 1;
        var citys = ["北京", "天津", "上海", "重庆", "石家庄", "太原", "呼和浩特", "哈尔滨", "长春", "沈阳", "济南", "南京", "合肥", "杭州", "南昌", "福州", "郑州", "武汉", "长沙", "广州", "南宁", "西安", "银川", "兰州", "西宁", "乌鲁木齐", "成都", "贵阳", "昆明", "拉萨", "海口"];
        // 构造数据
        while (randomCount--) {
            var cityCenter1 = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            var cityCenter2 = utilCityCenter.getCenterByCityName(citys[parseInt(Math.random() * citys.length)]);
            data.push({
                geometry: {
                    type: 'LineString',
                    coordinates: [[cityCenter1.lng - 1 + Math.random() * 1, cityCenter1.lat - 1 + Math.random() * 1],
                    [cityCenter2.lng - 1 + Math.random() * 1, cityCenter2.lat - 1 + Math.random() * 1]
                    ]
                },
                count: 30 * Math.random()
            });
        }
        dataSet = new DataSet(data);

        if (!map.getLayer("mapv")) {
            mapvLayer = new MapvLayer(map, dataSet, options);
            map.addLayer(mapvLayer);
            mapvLayer = map.getLayer('mapv');
        }
        var layer = new MapvLayer(map, dataSet, options1);
        mapvRenderLayer = new MapvRenderer(map, layer, dataSet, options1);
        renderer = map.getLayer('mapv').renderer;
    });

    afterAll(() => {
        if (map.getLayer("mapv")) {
            map.removeLayer("mapv");
        }
        dataSet = null;
        data = [];
        document.body.removeChild(testDiv);
        map = null;
    });

    it('moveStartEvent,moveEndEvent,rotateStartEvent_#22', (done) => {
            expect(renderer).not.toBeNull();

            spyOn(map, 'getPitch').and.callFake(() => {
                return 1;
            });
            renderer._hide();
            spyOn(renderer, '_hide');
            renderer.moveStartEvent();
            // expect(renderer._hide).toHaveBeenCalled();
            // spyOn(renderer, '_show');
            renderer.moveEndEvent();
            // expect(renderer._show).toHaveBeenCalled();
            expect(renderer.canvasLayer.canvas.style.display).toEqual('none');
            done();
    });

    it('_canvasUpdate', () => {
        expect(mapvRenderLayer.options._size).toEqual(0.05110415838546709);
    });
});
