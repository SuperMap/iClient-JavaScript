import {MapvLayer} from '../../../src/mapboxgl/overlay/MapvLayer';
import mapboxgl from 'mapbox-gl';
import {utilCityCenter, DataSet} from 'mapv';
import mbglmap from '../../tool/mock_mapboxgl_map';

var url = GlobeParameter.ChinaURL + '/zxyTileImage.png?z={z}&x={x}&y={y}';

describe('mapboxgl_MapVLayer', () => {
    var originalTimeout;
    let data = [], dataSet;
    var testDiv, map, mapvLayer;
    var options = {
        gradient: {
            0: 'blue',
            0.5: 'yellow',
            1: 'red'
        },
        lineWidth: 0.5,
        max: 30,
        draw: 'intensity',
        layerID: "mapv"
    };
    beforeAll((done) => {
        spyOn(mapboxgl, 'Map').and.callFake(mbglmap);
        testDiv = window.document.createElement("div");
        testDiv.setAttribute("id", "map");
        testDiv.style.styleFloat = "left";
        testDiv.style.marginLeft = "8px";
        testDiv.style.marginTop = "50px";
        testDiv.style.width = "500px";
        testDiv.style.height = "500px";
        window.document.body.appendChild(testDiv);
        map = new mapboxgl.Map({
            container: testDiv,
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
        map.on('load', function() {
          done();
        });
    });
    beforeEach(() => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 50000;
        var randomCount = 1000;
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
        }
    });
    afterEach(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;

        if (map.getLayer("mapv")) {
            map.removeLayer("mapv");
        }
        dataSet = null;
        data = [];
    });
    afterAll(() => {
        document.body.removeChild(testDiv);
        map = null;
    });

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
        }, 0);
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

    it('addData', () => {
        var data = [{
            geometry: {
                type: 'Point',
                coordinates: [109, 32]
            },
            count: 111
        }];
        var dataset = new DataSet(data);
        var tempoption = {
            shadowBlur: 30
        }
        mapvLayer.addData(dataset, tempoption);
        expect(mapvLayer.dataSet).not.toBeNull();
        expect(mapvLayer.dataSet._data[1000].count).toEqual(111);
        expect(mapvLayer.dataSet._data[1000].geometry.coordinates[0]).toEqual(109);
        expect(mapvLayer.dataSet._data[1000].geometry.coordinates[1]).toEqual(32);
        expect(mapvLayer.mapVOptions.shadowBlur).toEqual(30);
    });

    it('getData', () => {
        var dataset = mapvLayer.getData();
        expect(dataset._data.length).toEqual(1000);
    });

    //删除数据
    it('removeData', (done) => {
        var filter = (data) => {
            if (mapvLayer.dataSet._data.indexOf(data) === 2) {
                return true
            }
            return false;
        };
        mapvLayer.removeData(filter);
        setTimeout(() => {
            expect(mapvLayer.dataSet._data.length).toEqual(999);
            done();
        }, 0);
    });

    it('update', () => {
        var data = [{
            geometry: {
                type: 'Point',
                coordinates: [109, 32]
            },
            count: 111
        }];
        var dataset = new DataSet(data);
        var tempoption = {
            shadowBlur: 40
        }
        var opt = {data: dataset, options: tempoption};
        mapvLayer.update(opt);
        expect(mapvLayer.dataSet._data.length).toEqual(1);
        expect(mapvLayer.dataSet._data[0].count).toEqual(111);
        expect(mapvLayer.dataSet._data[0].geometry.coordinates[0]).toEqual(109);
        expect(mapvLayer.dataSet._data[0].geometry.coordinates[1]).toEqual(32);
        expect(mapvLayer.mapVOptions.shadowBlur).toEqual(40);
    });

    it('clearData', () => {
        mapvLayer.clearData();
        expect(mapvLayer.dataSet._data.length).toEqual(0);
    });

    it('setZIndex', () => {
        mapvLayer.setZIndex(2);
        expect(mapvLayer.renderer.canvas.style.zIndex).toEqual('2');
    });

});