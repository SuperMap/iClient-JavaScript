import {MapvLayer} from '../../../src/mapboxgl/overlay/MapvLayer';
import mapboxgl from 'mapbox-gl';
import {utilCityCenter, DataSet} from 'mapv';

var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';

describe('mapboxgl_MapVLayer', () => {
    var originalTimeout;
    var testDiv, map, mapvLayer;
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
        map.on('load', () => {
            var randomCount = 1000;
            var data = [];
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
            var dataSet = new DataSet(data);
            var options = {
                gradient: {
                    0: 'blue',
                    0.5: 'yellow',
                    1: 'red'
                },
                lineWidth: 0.5,
                max: 30,
                draw: 'intensity'
            };
            mapvLayer = new MapvLayer(map, dataSet, options);
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
        map=null;    });

    it('initialize', (done) => {
        setTimeout(() => {
            expect(mapvLayer).not.toBeNull();
            expect(mapvLayer.canvas).not.toBeNull();
            expect(mapvLayer.map).not.toBeNull();
            expect(mapvLayer.mapContainer).not.toBeNull();
            //判断是否返回期望的maplayer
            expect(mapvLayer.renderer).not.toBeNull();
            expect(mapvLayer.renderer.context).toBe("2d");
            done();
        }, 6000);
    });

    it('getTopLeft', () => {
        var topLeft = mapvLayer.getTopLeft();
        expect(topLeft).not.toBeNull();
    });

    it('show', () => {
        var thisMapvlayer = mapvLayer.show();
        expect(thisMapvlayer).not.toBeNull();
        expect(thisMapvlayer.renderer.canvasLayer.canvas.style.display).toBe('block');
    });

    it('hide', () => {
        var thisMapvlayer = mapvLayer.hide();
        expect(thisMapvlayer).not.toBeNull();
        expect(thisMapvlayer.renderer.canvasLayer.canvas.style.display).toBe('none');
    });
});